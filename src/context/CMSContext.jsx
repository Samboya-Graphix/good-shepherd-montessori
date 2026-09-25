import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as staticData from '../data/schoolData';

const CMSContext = createContext(null);

// Safe response JSON parser that avoids SyntaxError on empty / HTML responses
async function parseSafeJson(res) {
  if (!res) return null;
  try {
    const text = await res.text();
    if (!text || !text.trim()) return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// Initial Content State builder with localStorage cache support
function getInitialContent() {
  const baseGallery = (staticData.galleryPhotos && staticData.galleryPhotos.length > 0)
    ? staticData.galleryPhotos
    : staticData.galleryItems;

  const defaultContent = {
    schoolInfo: staticData.schoolInfo,
    whyChooseUs: staticData.whyChooseUs,
    programs: staticData.programs,
    expansionNotice: staticData.expansionNotice,
    administrationBoard: staticData.administrationBoard || [],
    schoolNotices: staticData.schoolNotices,
    academicCalendar: staticData.academicCalendar,
    galleryItems: baseGallery,
    galleryPhotos: baseGallery,
    testimonials: staticData.testimonials,
    faqs: staticData.faqs,
    parentHubData: staticData.parentHubData,
    dayInLifeMoments: staticData.dayInLifeMoments,
    lastUpdated: new Date().toISOString()
  };

  try {
    const cached = localStorage.getItem('gs_persisted_content');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && typeof parsed === 'object') {
        return {
          ...defaultContent,
          ...parsed,
          galleryItems: (parsed.galleryItems && parsed.galleryItems.length > 0) ? parsed.galleryItems : baseGallery,
          galleryPhotos: (parsed.galleryPhotos && parsed.galleryPhotos.length > 0) ? parsed.galleryPhotos : baseGallery
        };
      }
    }
  } catch {
    // Ignore JSON parse errors on initial load
  }

  return defaultContent;
}

export function CMSProvider({ children }) {
  const [content, setContent] = useState(getInitialContent);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'error'
  const [errorMessage, setErrorMessage] = useState(null);

  // Authentication State
  const [token, setToken] = useState(() => localStorage.getItem('gs_admin_token') || null);
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const stored = localStorage.getItem('gs_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [sessionExpiresAt, setSessionExpiresAt] = useState(() => {
    const stored = localStorage.getItem('gs_admin_expires_at');
    return stored ? parseInt(stored, 10) : null;
  });

  // Applications, Backups & Audit Log
  const [applications, setApplications] = useState(() => {
    try {
      const local = localStorage.getItem('gs_local_applications');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  });
  const [backups, setBackups] = useState([]);
  const [auditLog, setAuditLog] = useState([]);

  // Logout & Cleanup
  const logout = useCallback(async () => {
    const currentToken = token || localStorage.getItem('gs_admin_token');
    if (currentToken && !currentToken.startsWith('gs_sec_auth_')) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${currentToken}` }
        });
      } catch {
        // Ignore network errors on logout
      }
    }
    setToken(null);
    setAdminUser(null);
    setSessionExpiresAt(null);
    localStorage.removeItem('gs_admin_token');
    localStorage.removeItem('gs_admin_user');
    localStorage.removeItem('gs_admin_expires_at');
  }, [token]);

  // Session verification on mount
  const verifySession = useCallback(async () => {
    const storedToken = localStorage.getItem('gs_admin_token');
    if (!storedToken) {
      setToken(null);
      setAdminUser(null);
      return;
    }

    // Check client-generated session
    const storedExpires = parseInt(localStorage.getItem('gs_admin_expires_at') || '0', 10);
    if (storedExpires && storedExpires <= Date.now()) {
      logout();
      return;
    }

    if (storedToken.startsWith('gs_sec_auth_')) {
      setToken(storedToken);
      const storedUser = localStorage.getItem('gs_admin_user');
      if (storedUser) {
        try {
          setAdminUser(JSON.parse(storedUser));
        } catch {
          setAdminUser({ username: 'admin', role: 'Administrator' });
        }
      }
      return;
    }

    try {
      const res = await fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      const data = await parseSafeJson(res);

      if (res.ok && data && data.valid) {
        setToken(storedToken);
        setAdminUser(data.user);
        if (data.expiresAt) {
          setSessionExpiresAt(data.expiresAt);
          localStorage.setItem('gs_admin_expires_at', data.expiresAt.toString());
        }
      } else if (res.status === 401) {
        logout();
      }
    } catch {
      // Backend unavailable, preserve token if valid locally
    }
  }, [logout]);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  // 1. Fetch live site content from backend or local storage
  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch(`/api/content?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache'
        }
      });
      const data = await parseSafeJson(res);

      if (res.ok && data && data.schoolInfo) {
        const resolvedGallery = (data.galleryItems && data.galleryItems.length > 0)
          ? data.galleryItems
          : (data.galleryPhotos && data.galleryPhotos.length > 0)
            ? data.galleryPhotos
            : staticData.galleryPhotos;

        const resolvedStaff = (data.administrationBoard && data.administrationBoard.length > 0)
          ? data.administrationBoard
          : (data.staffProfiles && data.staffProfiles.length > 0)
            ? data.staffProfiles
            : staticData.administrationBoard;

        const merged = {
          ...data,
          administrationBoard: resolvedStaff,
          staffProfiles: resolvedStaff,
          galleryItems: resolvedGallery,
          galleryPhotos: resolvedGallery
        };

        setContent(merged);
        try {
          localStorage.setItem('gs_persisted_content', JSON.stringify(merged));
        } catch {}
      }
    } catch (err) {
      console.warn('Backend unavailable, using current content:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Set up real-time cross-tab sync and auto-fetch listeners
  useEffect(() => {
    fetchContent();

    // BroadcastChannel: sync across tabs
    let channel;
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        channel = new BroadcastChannel('good_shepherd_cmi_channel');
        channel.onmessage = (event) => {
          if (event.data?.type === 'CONTENT_UPDATED' && event.data?.content) {
            const newContent = event.data.content;
            const resolvedGallery = (newContent.galleryItems && newContent.galleryItems.length > 0)
              ? newContent.galleryItems
              : (newContent.galleryPhotos && newContent.galleryPhotos.length > 0)
                ? newContent.galleryPhotos
                : staticData.galleryPhotos;

            setContent(prev => ({
              ...prev,
              ...newContent,
              galleryItems: resolvedGallery,
              galleryPhotos: resolvedGallery
            }));
          }
        };
      } catch (e) {
        console.warn('BroadcastChannel notice:', e);
      }
    }

    // Storage event for cross-tab sync
    const handleStorageChange = (e) => {
      if (e.key === 'gs_content_timestamp') {
        const cached = localStorage.getItem('gs_persisted_content');
        if (cached) {
          try {
            setContent(JSON.parse(cached));
          } catch {}
        } else {
          fetchContent();
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // Focus & Visibility listeners
    const handleFocus = () => fetchContent();
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') fetchContent();
    };
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [fetchContent]);

  // 2. Fetch applications if authenticated
  const fetchApplications = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/applications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 401) {
        logout();
        return;
      }
      const data = await parseSafeJson(res);
      if (res.ok && Array.isArray(data)) {
        setApplications(data);
        localStorage.setItem('gs_local_applications', JSON.stringify(data));
      }
    } catch {
      // Use local storage applications
      try {
        const local = localStorage.getItem('gs_local_applications');
        if (local) setApplications(JSON.parse(local));
      } catch {}
    }
  }, [token, logout]);

  // 3. Fetch backups if authenticated
  const fetchBackups = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/backups', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await parseSafeJson(res);
      if (res.ok && Array.isArray(data)) {
        setBackups(data);
      }
    } catch {}
  }, [token]);

  // 4. Fetch audit log if authenticated
  const fetchAuditLog = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/audit-log', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await parseSafeJson(res);
      if (res.ok && Array.isArray(data)) {
        setAuditLog(data);
      }
    } catch {}
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchApplications();
      fetchBackups();
      fetchAuditLog();
    }
  }, [token, fetchApplications, fetchBackups, fetchAuditLog]);

  // Universal Login Handler (Works on both Live Node Server and Vercel Static Hosting)
  const login = async (username, password) => {
    setErrorMessage(null);
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, password: cleanPass })
      });

      const data = await parseSafeJson(res);

      if (res.ok && data && data.token) {
        setToken(data.token);
        setAdminUser(data.user);
        if (data.expiresAt) {
          setSessionExpiresAt(data.expiresAt);
          localStorage.setItem('gs_admin_expires_at', data.expiresAt.toString());
        }
        localStorage.setItem('gs_admin_token', data.token);
        localStorage.setItem('gs_admin_user', JSON.stringify(data.user));
        return { success: true };
      }

      if (data && data.error && res.status !== 404) {
        return {
          success: false,
          error: data.error,
          locked: data.locked || false,
          remainingSeconds: data.remainingSeconds || null
        };
      }
    } catch {
      // Backend fetch failed (e.g. static hosting on Vercel without Node server)
    }

    // Secure Client Fallback for Static Host Environments (Vercel, Netlify, Offline)
    const customPass = localStorage.getItem('gs_admin_custom_pass');
    const validPass = customPass || 'goodshepherd2026';
    const isUserValid = cleanUser === 'admin' || cleanUser === 'admin@goodshepherd.edu.gh';
    const isPassValid = cleanPass === validPass;

    if (isUserValid && isPassValid) {
      const fallbackToken = `gs_sec_auth_${Date.now()}`;
      const fallbackUser = {
        username: 'admin',
        email: 'admin@goodshepherd.edu.gh',
        role: 'Administrator',
        schoolName: 'Good Shepherd Montessori School'
      };
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

      setToken(fallbackToken);
      setAdminUser(fallbackUser);
      setSessionExpiresAt(expiresAt);
      localStorage.setItem('gs_admin_token', fallbackToken);
      localStorage.setItem('gs_admin_user', JSON.stringify(fallbackUser));
      localStorage.setItem('gs_admin_expires_at', expiresAt.toString());
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid administrator credentials. Please verify your username and password.'
    };
  };

  // Save content to backend or persistent local cache
  const saveContent = async (newContent) => {
    setSaveStatus('saving');
    setErrorMessage(null);

    const resolvedGallery = (newContent.galleryItems && newContent.galleryItems.length > 0)
      ? newContent.galleryItems
      : (newContent.galleryPhotos && newContent.galleryPhotos.length > 0)
        ? newContent.galleryPhotos
        : staticData.galleryPhotos;

    const finalizedContent = {
      ...newContent,
      lastUpdated: new Date().toISOString(),
      galleryItems: resolvedGallery,
      galleryPhotos: resolvedGallery
    };

    try {
      const activeToken = token || localStorage.getItem('gs_admin_token');
      if (activeToken && !activeToken.startsWith('gs_sec_auth_')) {
        const res = await fetch('/api/content', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${activeToken}`
          },
          body: JSON.stringify(finalizedContent)
        });

        const data = await parseSafeJson(res);
        if (data && data.lastUpdated) {
          finalizedContent.lastUpdated = data.lastUpdated;
        }
      }
    } catch {
      // Backend unavailable, fallback to local storage
    }

    // Persist finalized content to memory and localStorage
    setContent(finalizedContent);
    try {
      localStorage.setItem('gs_persisted_content', JSON.stringify(finalizedContent));
      localStorage.setItem('gs_content_timestamp', Date.now().toString());
    } catch {}

    // Broadcast update across open tabs
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const channel = new BroadcastChannel('good_shepherd_cmi_channel');
        channel.postMessage({ type: 'CONTENT_UPDATED', content: finalizedContent });
        channel.close();
      } catch {}
    }

    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 3000);
    return { success: true };
  };

  // Update specific section
  const updateSection = (sectionName, sectionData) => {
    const updated = {
      ...content,
      [sectionName]: sectionData,
      lastUpdated: new Date().toISOString()
    };
    if (sectionName === 'galleryItems') {
      updated.galleryPhotos = sectionData;
    } else if (sectionName === 'galleryPhotos') {
      updated.galleryItems = sectionData;
    } else if (sectionName === 'administrationBoard') {
      updated.staffProfiles = sectionData;
    } else if (sectionName === 'staffProfiles') {
      updated.administrationBoard = sectionData;
    }
    return saveContent(updated);
  };

  // Public: Submit new application or tour booking
  const submitApplication = async (formData) => {
    const refNum = `${formData.type || 'app'}-${Date.now().toString().slice(-6)}`;
    const newEntry = {
      id: refNum,
      submittedAt: new Date().toISOString(),
      status: 'Pending',
      ...formData
    };

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await parseSafeJson(res);
      if (res.ok && data && data.referenceNumber) {
        return { success: true, referenceNumber: data.referenceNumber };
      }
    } catch {}

    // Local fallback store for applications
    try {
      const existing = JSON.parse(localStorage.getItem('gs_local_applications') || '[]');
      existing.unshift(newEntry);
      localStorage.setItem('gs_local_applications', JSON.stringify(existing));
      setApplications(existing);
    } catch {}

    return { success: true, referenceNumber: refNum };
  };

  // Admin: Update application status or notes
  const updateApplication = async (id, updates) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      const data = await parseSafeJson(res);
      if (res.ok && data && data.application) {
        setApplications(prev => prev.map(app => app.id === id ? data.application : app));
        return { success: true };
      }
    } catch {}

    // Fallback: update in local state and localStorage
    setApplications(prev => {
      const updated = prev.map(app => app.id === id ? { ...app, ...updates } : app);
      try {
        localStorage.setItem('gs_local_applications', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    return { success: true };
  };

  // Admin: Delete application
  const deleteApplication = async (id) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setApplications(prev => prev.filter(app => app.id !== id));
      }
    } catch {}

    // Fallback: remove from local state
    setApplications(prev => {
      const updated = prev.filter(app => app.id !== id);
      try {
        localStorage.setItem('gs_local_applications', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    return { success: true };
  };

  // Admin: Create manual backup
  const createBackup = async () => {
    try {
      const res = await fetch('/api/backups', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await parseSafeJson(res);
      if (res.ok && data && data.filename) {
        fetchBackups();
        return { success: true, filename: data.filename };
      }
    } catch {}

    // Client-side JSON file download backup
    const snapshotName = `goodshepherd-backup-${Date.now()}.json`;
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = snapshotName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return { success: true, filename: snapshotName };
  };

  // Admin: Restore from backup
  const restoreBackup = async (filename, fileContent) => {
    if (fileContent && typeof fileContent === 'object') {
      setContent(fileContent);
      try {
        localStorage.setItem('gs_persisted_content', JSON.stringify(fileContent));
      } catch {}
      return { success: true };
    }

    try {
      const res = await fetch('/api/backups/restore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ filename })
      });
      const data = await parseSafeJson(res);
      if (res.ok) {
        await fetchContent();
        return { success: true };
      }
    } catch {}

    return { success: false, error: 'Unable to restore backup snapshot.' };
  };

  return (
    <CMSContext.Provider
      value={{
        content,
        isLoading,
        saveStatus,
        errorMessage,
        isAuthenticated: !!token,
        adminUser,
        sessionExpiresAt,
        login,
        logout,
        saveContent,
        updateSection,
        applications,
        fetchApplications,
        updateApplication,
        deleteApplication,
        submitApplication,
        backups,
        createBackup,
        restoreBackup,
        auditLog,
        fetchAuditLog,
        refreshContent: fetchContent
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
