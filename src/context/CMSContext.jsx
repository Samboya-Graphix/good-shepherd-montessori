import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as staticData from '../data/schoolData';

const CMSContext = createContext(null);

const DEFAULT_STATE = {
  schoolInfo: staticData.schoolInfo,
  whyChooseUs: staticData.whyChooseUs,
  programs: staticData.programs,
  expansionNotice: staticData.expansionNotice,
  administrationBoard: staticData.administrationBoard || [],
  schoolNotices: staticData.schoolNotices,
  academicCalendar: staticData.academicCalendar,
  galleryItems: (staticData.galleryPhotos && staticData.galleryPhotos.length > 0) ? staticData.galleryPhotos : staticData.galleryItems,
  galleryPhotos: staticData.galleryPhotos || staticData.galleryItems,
  testimonials: staticData.testimonials,
  faqs: staticData.faqs,
  parentHubData: staticData.parentHubData,
  dayInLifeMoments: staticData.dayInLifeMoments,
  lastUpdated: new Date().toISOString()
};

export function CMSProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_STATE);
  const [isLoading, setIsLoading] = useState(true);
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
  const [applications, setApplications] = useState([]);
  const [backups, setBackups] = useState([]);
  const [auditLog, setAuditLog] = useState([]);

  // Logout & Cleanup
  const logout = useCallback(async () => {
    const currentToken = token || localStorage.getItem('gs_admin_token');
    if (currentToken) {
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
    setApplications([]);
    setBackups([]);
    setAuditLog([]);
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

    try {
      const res = await fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      const data = await res.json();

      if (res.ok && data.valid) {
        setToken(storedToken);
        setAdminUser(data.user);
        if (data.expiresAt) {
          setSessionExpiresAt(data.expiresAt);
          localStorage.setItem('gs_admin_expires_at', data.expiresAt.toString());
        }
      } else {
        // Token expired or invalid
        logout();
      }
    } catch {
      // Network failure, preserve local token for offline viewing
    }
  }, [logout]);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  // 1. Fetch live site content from backend
  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch(`/api/content?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache'
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.schoolInfo) {
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

          setContent(prev => ({
            ...prev,
            ...data,
            administrationBoard: resolvedStaff,
            staffProfiles: resolvedStaff,
            galleryItems: resolvedGallery,
            galleryPhotos: resolvedGallery
          }));
        }
      }
    } catch (err) {
      console.warn('Backend unavailable, using static fallback:', err);
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
        fetchContent();
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

    // Background polling every 15 seconds
    const pollInterval = setInterval(() => {
      fetchContent();
    }, 15000);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
      clearInterval(pollInterval);
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
      if (res.ok) {
        const data = await res.json();
        setApplications(data);
      }
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    }
  }, [token, logout]);

  // 3. Fetch backups if authenticated
  const fetchBackups = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/backups', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 401) {
        logout();
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setBackups(data);
      }
    } catch (err) {
      console.error('Failed to fetch backups:', err);
    }
  }, [token, logout]);

  // 4. Fetch audit log if authenticated
  const fetchAuditLog = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/audit-log', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 401) {
        logout();
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setAuditLog(data);
      }
    } catch (err) {
      console.error('Failed to fetch audit log:', err);
    }
  }, [token, logout]);

  useEffect(() => {
    if (token) {
      fetchApplications();
      fetchBackups();
      fetchAuditLog();
    }
  }, [token, fetchApplications, fetchBackups, fetchAuditLog]);

  // Login handler
  const login = async (username, password) => {
    setErrorMessage(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          error: data.error || 'Authentication failed',
          locked: data.locked || false,
          remainingSeconds: data.remainingSeconds || null
        };
      }

      setToken(data.token);
      setAdminUser(data.user);
      if (data.expiresAt) {
        setSessionExpiresAt(data.expiresAt);
        localStorage.setItem('gs_admin_expires_at', data.expiresAt.toString());
      }
      localStorage.setItem('gs_admin_token', data.token);
      localStorage.setItem('gs_admin_user', JSON.stringify(data.user));
      return { success: true };
    } catch (err) {
      setErrorMessage(err.message);
      return { success: false, error: err.message };
    }
  };

  // Save content to backend
  const saveContent = async (newContent) => {
    setSaveStatus('saving');
    setErrorMessage(null);
    try {
      const activeToken = token || localStorage.getItem('gs_admin_token');
      if (!activeToken) {
        throw new Error('Authentication session required to save changes.');
      }

      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${activeToken}`
        },
        body: JSON.stringify(newContent)
      });

      if (res.status === 401) {
        logout();
        throw new Error('Your session has expired. Please log in again.');
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to publish changes');
      }

      const resolvedGallery = (newContent.galleryItems && newContent.galleryItems.length > 0)
        ? newContent.galleryItems
        : (newContent.galleryPhotos && newContent.galleryPhotos.length > 0)
          ? newContent.galleryPhotos
          : staticData.galleryPhotos;

      const finalizedContent = {
        ...newContent,
        lastUpdated: data.lastUpdated || new Date().toISOString(),
        galleryItems: resolvedGallery,
        galleryPhotos: resolvedGallery
      };

      setContent(finalizedContent);
      setSaveStatus('saved');
      fetchBackups();
      fetchAuditLog();

      // Broadcast update to other open browser tabs
      if (typeof BroadcastChannel !== 'undefined') {
        try {
          const channel = new BroadcastChannel('good_shepherd_cmi_channel');
          channel.postMessage({ type: 'CONTENT_UPDATED', content: finalizedContent });
          channel.close();
        } catch (bErr) {
          console.warn('Broadcast notice:', bErr);
        }
      }

      // Trigger localStorage cross-tab listener
      try {
        localStorage.setItem('gs_content_timestamp', Date.now().toString());
      } catch (sErr) {}

      setTimeout(() => setSaveStatus('idle'), 3000);
      return { success: true };
    } catch (err) {
      setSaveStatus('error');
      setErrorMessage(err.message);
      setTimeout(() => setSaveStatus('idle'), 5000);
      return { success: false, error: err.message };
    }
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
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to record application');
      }
      if (token) {
        fetchApplications();
        fetchAuditLog();
      }
      return { success: true, referenceNumber: data.referenceNumber };
    } catch (err) {
      return { success: false, error: err.message };
    }
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
      if (res.status === 401) {
        logout();
        return { success: false, error: 'Session expired' };
      }
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update application');
      }
      setApplications(prev => prev.map(app => app.id === id ? data.application : app));
      fetchAuditLog();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Admin: Delete application
  const deleteApplication = async (id) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 401) {
        logout();
        return { success: false, error: 'Session expired' };
      }
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete application');
      }
      setApplications(prev => prev.filter(app => app.id !== id));
      fetchAuditLog();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Admin: Create manual backup
  const createBackup = async () => {
    try {
      const res = await fetch('/api/backups', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 401) {
        logout();
        return { success: false, error: 'Session expired' };
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Backup creation failed');
      fetchBackups();
      fetchAuditLog();
      return { success: true, filename: data.filename };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Admin: Restore from backup
  const restoreBackup = async (filename) => {
    try {
      const res = await fetch('/api/backups/restore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ filename })
      });
      if (res.status === 401) {
        logout();
        return { success: false, error: 'Session expired' };
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Restore failed');
      await fetchContent();
      fetchAuditLog();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
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
