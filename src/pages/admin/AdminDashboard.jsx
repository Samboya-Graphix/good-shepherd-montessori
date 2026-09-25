import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Bell,
  CreditCard,
  Building,
  Users,
  Image,
  Inbox,
  Shield,
  Save,
  Check,
  AlertCircle,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  Clock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  Upload,
  X,
  Images,
  FileText,
  Camera,
  ZoomIn,
  Eye,
  Key,
  Activity,
  History,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

// Predefined Ghanaian Bank & Mobile Money Presets for 1-click configuration
const GHANAIAN_BANK_PRESETS = [
  {
    name: 'GCB Bank Ghana',
    logo: '/images/banks/gcb-bank.svg',
    accentColor: '#F7A800',
    type: 'Bank Branch Deposit / Wire Transfer',
    instruction: "Please use your Child's Full Name and Class as the deposit reference (e.g., 'Kofi Mensah - Creche'). Submit the duplicate deposit slip to the School Bursar."
  },
  {
    name: 'Ecobank Ghana',
    logo: '/images/banks/ecobank.svg',
    accentColor: '#005B82',
    type: 'Bank Direct Deposit / Omni Lite',
    instruction: "Quote the Student ID number or Child's Name on all electronic wire and mobile bank transfers."
  },
  {
    name: 'Consolidated Bank Ghana (CBG)',
    logo: '/images/banks/cbg-bank.svg',
    accentColor: '#004F71',
    type: 'Bank Branch Deposit / CBG Smart',
    instruction: "Deposit into Good Shepherd Montessori account at any CBG branch nationwide. Submit receipt to the school office."
  },
  {
    name: 'Absa Bank Ghana',
    logo: '/images/banks/absa-bank.svg',
    accentColor: '#B3002D',
    type: 'Bank Deposit / Absa Online',
    instruction: "Use Child's Full Name and class level as payment narrative. Present stamped receipt to the Bursar."
  },
  {
    name: 'Stanbic Bank Ghana',
    logo: '/images/banks/stanbic-bank.svg',
    accentColor: '#0033A0',
    type: 'Bank Deposit / Enterprise Online',
    instruction: "Deposit at any Stanbic branch or via mobile app quoting Student Name as reference."
  },
  {
    name: 'Fidelity Bank Ghana',
    logo: '/images/banks/fidelity-bank.svg',
    accentColor: '#F36F21',
    type: 'Bank Direct Deposit / Fidelity Mobile',
    instruction: "Deposit into the school fee account at Fidelity Bank. Bring payment voucher to the bursary."
  },
  {
    name: 'Agricultural Development Bank (ADB)',
    logo: '/images/banks/adb-bank.svg',
    accentColor: '#007A3D',
    type: 'Bank Deposit / ADB Pay',
    instruction: "Pay at ADB Bechem or any branch in Ghana. Reference Child's Name on deposit slip."
  },
  {
    name: 'CalBank',
    logo: '/images/banks/calbank.svg',
    accentColor: '#F47920',
    type: 'Bank Deposit / CalBank App',
    instruction: "Quote Student Name as description when depositing funds."
  },
  {
    name: 'Zenith Bank Ghana',
    logo: '/images/banks/zenith-bank.svg',
    accentColor: '#C4161C',
    type: 'Bank Deposit / ZMobile',
    instruction: "Pay into the Good Shepherd account at Zenith Bank. Keep SMS or receipt as proof of payment."
  },
  {
    name: 'MTN Mobile Money',
    logo: '/images/banks/mtn-momo.svg',
    accentColor: '#FFCC00',
    type: 'MTN MoMo Pay / Merchant Code',
    ussdCode: '*170#',
    momoPayId: '482019',
    instruction: "Dial *170# -> Option 2 (MoMo Pay) -> Merchant ID: 482019. Enter Child's Name as reference. Send SMS confirmation to the Bursar."
  },
  {
    name: 'Telecel Cash',
    logo: '/images/banks/telecel-cash.svg',
    accentColor: '#E60000',
    type: 'Telecel Cash / Merchant Pay',
    ussdCode: '*110#',
    momoPayId: '782104',
    instruction: "Dial *110# -> Option 4 (Make Payment) -> Enter Merchant Number. Enter Child's Name as reference. Submit confirmation SMS to the school office."
  },
  {
    name: 'Custom / Other Institution',
    logo: '/logo.png',
    accentColor: '#181b66',
    type: 'Bank Direct Deposit / Transfer',
    instruction: "Please quote the Student's Full Name as reference on all payment transactions."
  }
];

// Quick logo preset choices for 1-click selection
const AVAILABLE_LOGO_PRESETS = [
  { name: 'GCB Bank', logo: '/images/banks/gcb-bank.svg' },
  { name: 'Ecobank', logo: '/images/banks/ecobank.svg' },
  { name: 'CBG Bank', logo: '/images/banks/cbg-bank.svg' },
  { name: 'Absa Bank', logo: '/images/banks/absa-bank.svg' },
  { name: 'Stanbic Bank', logo: '/images/banks/stanbic-bank.svg' },
  { name: 'Fidelity Bank', logo: '/images/banks/fidelity-bank.svg' },
  { name: 'ADB Bank', logo: '/images/banks/adb-bank.svg' },
  { name: 'CalBank', logo: '/images/banks/calbank.svg' },
  { name: 'Zenith Bank', logo: '/images/banks/zenith-bank.svg' },
  { name: 'MTN MoMo', logo: '/images/banks/mtn-momo.svg' },
  { name: 'Telecel Cash', logo: '/images/banks/telecel-cash.svg' },
  { name: 'School Crest', logo: '/logo.png' }
];

export default function AdminDashboard() {
  const {
    content,
    updateSection,
    saveStatus,
    errorMessage,
    isAuthenticated,
    adminUser,
    sessionExpiresAt,
    logout,
    applications,
    updateApplication,
    deleteApplication,
    backups,
    createBackup,
    restoreBackup,
    auditLog,
    fetchAuditLog
  } = useCMS();

  const navigate = useNavigate();

  // If not logged in, redirect
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const [activeTab, setActiveTab] = useState('overview');
  const [successToast, setSuccessToast] = useState(null);

  // Helper: Trigger quick toast
  const triggerToast = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // State copies for editing
  const [localSchoolInfo, setLocalSchoolInfo] = useState(content.schoolInfo || {});
  const [localNotices, setLocalNotices] = useState(content.schoolNotices || []);
  const [localPrograms, setLocalPrograms] = useState(content.programs || []);
  const [localStaff, setLocalStaff] = useState(content.administrationBoard || content.staffProfiles || []);
  const [localGallery, setLocalGallery] = useState(content.galleryItems || []);
  const [localParentHub, setLocalParentHub] = useState(content.parentHubData || {});

  // Sync when content updates from server
  React.useEffect(() => {
    setLocalSchoolInfo(content.schoolInfo || {});
    setLocalNotices(content.schoolNotices || []);
    setLocalPrograms(content.programs || []);
    setLocalStaff(content.administrationBoard || content.staffProfiles || []);
    setLocalGallery(content.galleryItems || []);
    setLocalParentHub(content.parentHubData || {});
  }, [content]);

  // Notice Modal / Form state
  const [editingNotice, setEditingNotice] = useState(null);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

  // Staff Modal / Form state
  const [editingStaff, setEditingStaff] = useState(null);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [staffFunctionsText, setStaffFunctionsText] = useState('');
  const [staffTierFilter, setStaffTierFilter] = useState('all');
  const [uploadingChartField, setUploadingChartField] = useState(null);

  // Gallery Modal / Form state
  const [editingGallery, setEditingGallery] = useState(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Batch upload state
  const [batchPhotos, setBatchPhotos] = useState([]);
  const [batchCategory, setBatchCategory] = useState('Sensorial & Practical Life');
  const [batchLevel, setBatchLevel] = useState('Creche & Day Care');
  const [batchPrefix, setBatchPrefix] = useState('');
  const [batchCaption, setBatchCaption] = useState('');

  // Helper: Client-side image resize & compression to ensure ultra-fast saving and lightweight payloads
  const compressImage = (file, maxWidth = 1600, maxHeight = 1200, quality = 0.85) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  };

  // Device file upload handler (Supports multiple photos at a go)
  const handleDeviceImageUpload = async (e) => {
    const fileList = Array.from(e.target.files || []);
    if (fileList.length === 0) return;

    const validFiles = fileList.filter(f => f.type.startsWith('image/'));
    if (validFiles.length === 0) {
      setUploadError('Please select valid image files (JPG, PNG, WEBP).');
      return;
    }

    setUploadError(null);
    setUploadingImage(true);

    // If multiple files selected, automatically enable batch mode
    if (validFiles.length > 1) {
      setIsBatchMode(true);
    }

    if (validFiles.length === 1 && !isBatchMode) {
      const file = validFiles[0];
      const compressedData = await compressImage(file);
      const cleanName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

      setEditingGallery(prev => ({
        ...prev,
        image: compressedData || prev?.image,
        title: (prev && prev.title) ? prev.title : cleanName
      }));

      try {
        const token = localStorage.getItem('gs_admin_token') || 'demo-admin-session-token';
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ filename: file.name, data: compressedData })
        });
        const data = await res.json();
        if (res.ok && data.url) {
          setEditingGallery(prev => ({ ...prev, image: data.url }));
          triggerToast('Photo selected from device and ready to save.');
        }
      } catch (err) {
        console.warn('Upload fallback notice:', err);
      } finally {
        setUploadingImage(false);
      }
      return;
    }

    // Multiple files selected or new batch addition
    setIsBatchMode(true);
    const readPromises = validFiles.map(async (file, idx) => {
      const compressedData = await compressImage(file);
      const cleanName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

      return {
        id: `temp-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 4)}`,
        filename: file.name,
        title: cleanName || `Campus Photo ${idx + 1}`,
        data: compressedData,
        sizeKb: compressedData ? Math.round((compressedData.length * 3) / 4 / 1024) : 0
      };
    });

    const results = await Promise.all(readPromises);
    setBatchPhotos(prev => [...prev, ...results]);
    setUploadingImage(false);
    triggerToast(`${results.length} photo(s) selected from device.`);
  };

  // Remove individual photo from selected batch
  const handleRemoveBatchPhoto = (photoId) => {
    setBatchPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  // Save all batch photos to gallery at a go
  const handleSaveBatchPhotos = async (e) => {
    e.preventDefault();
    if (batchPhotos.length === 0) {
      setUploadError('Please select at least one photo from your device.');
      return;
    }

    setUploadingImage(true);
    setUploadError(null);

    try {
      const payload = {
        files: batchPhotos.map(p => ({
          filename: p.filename,
          data: p.data
        }))
      };

      let serverUrls = [];
      try {
        const token = localStorage.getItem('gs_admin_token') || 'demo-admin-session-token';
        const res = await fetch('/api/upload/batch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        const resData = await res.json();
        if (res.ok && resData.uploaded) {
          serverUrls = resData.uploaded;
        }
      } catch (uploadErr) {
        console.warn('Batch upload notice, local preserved:', uploadErr);
      }

      const newItems = batchPhotos.map((photo, index) => {
        const uploadedUrl = serverUrls[index]?.url || photo.data;
        const itemTitle = batchPrefix.trim() 
          ? `${batchPrefix.trim()} ${index + 1}` 
          : photo.title;

        return {
          id: `gal-${Date.now()}-${index + 1}`,
          title: itemTitle,
          category: batchCategory,
          level: batchLevel,
          image: uploadedUrl,
          caption: batchCaption || photo.title
        };
      });

      const updated = [...newItems, ...localGallery];
      setLocalGallery(updated);
      const saveRes = await updateSection('galleryItems', updated);

      if (saveRes && saveRes.success) {
        setIsGalleryModalOpen(false);
        setIsBatchMode(false);
        setBatchPhotos([]);
        setEditingGallery(null);
        setBatchPrefix('');
        setBatchCaption('');
        triggerToast(`Successfully added and published ${newItems.length} photos!`);
      } else {
        setUploadError(saveRes?.error || 'Failed to save photos to server.');
      }
    } catch (err) {
      setUploadError('Failed to save multiple photos: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // Application detail modal
  const [selectedApp, setSelectedApp] = useState(null);
  const [appFilter, setAppFilter] = useState('all');

  // Security password state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMessage, setPassMessage] = useState(null);

  // Save Handlers
  const handleSaveSchoolInfo = async (e) => {
    e.preventDefault();
    const res = await updateSection('schoolInfo', localSchoolInfo);
    if (res.success) triggerToast('School information updated successfully.');
  };

  const handleSaveTuition = async (e) => {
    e.preventDefault();
    const res1 = await updateSection('programs', localPrograms);
    const res2 = await updateSection('parentHubData', localParentHub);
    if (res1.success && res2.success) {
      triggerToast('Tuition fees & banking payment channels saved successfully.');
    }
  };

  // Bank preset switcher handler
  const handleBankPresetChange = (idx, presetName) => {
    const preset = GHANAIAN_BANK_PRESETS.find(p => p.name === presetName);
    if (!preset) return;

    const updated = { ...localParentHub };
    if (!updated.feePaymentChannels) updated.feePaymentChannels = [];
    const current = updated.feePaymentChannels[idx] || {};

    updated.feePaymentChannels[idx] = {
      ...current,
      institution: preset.name,
      logo: preset.logo,
      accentColor: preset.accentColor,
      type: preset.type || current.type,
      instruction: current.instruction || preset.instruction,
      ussdCode: preset.ussdCode || current.ussdCode || '',
      momoPayId: preset.momoPayId || current.momoPayId || ''
    };

    setLocalParentHub(updated);
    triggerToast(`Switched channel to ${preset.name}.`);
  };

  // Upload logo from device for a specific bank channel
  const handleBankLogoUpload = async (idx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isSvg = file.type === 'image/svg+xml' || file.name.endsWith('.svg');
    let logoUrl;

    if (isSvg) {
      const text = await file.text();
      const base64 = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(text)));
      logoUrl = base64;
    } else {
      logoUrl = await compressImage(file, 400, 200, 0.9);
    }

    try {
      const token = localStorage.getItem('gs_admin_token') || 'demo-admin-session-token';
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ filename: file.name, data: logoUrl })
      });
      const data = await res.json();
      if (res.ok && data.url) {
        logoUrl = data.url;
      }
    } catch (err) {
      console.warn('Upload fallback notice:', err);
    }

    const updated = { ...localParentHub };
    if (!updated.feePaymentChannels) updated.feePaymentChannels = [];
    if (!updated.feePaymentChannels[idx]) updated.feePaymentChannels[idx] = {};
    updated.feePaymentChannels[idx].logo = logoUrl;
    setLocalParentHub(updated);
    triggerToast('New bank logo uploaded successfully.');
  };

  // 1-Click select logo preset
  const handleSelectLogoPreset = (idx, logoPath) => {
    const updated = { ...localParentHub };
    if (!updated.feePaymentChannels) updated.feePaymentChannels = [];
    if (!updated.feePaymentChannels[idx]) updated.feePaymentChannels[idx] = {};
    updated.feePaymentChannels[idx].logo = logoPath;
    setLocalParentHub(updated);
    triggerToast('Logo updated.');
  };

  // Add a new banking channel
  const handleAddPaymentChannel = () => {
    const updated = { ...localParentHub };
    if (!updated.feePaymentChannels) updated.feePaymentChannels = [];
    const newChannel = {
      id: `channel-${Date.now()}`,
      institution: 'Consolidated Bank Ghana (CBG)',
      logo: '/images/banks/cbg-bank.svg',
      branch: 'Bechem Branch',
      accountName: 'Good Shepherd Montessori School',
      accountNumber: '',
      type: 'Bank Branch Deposit / Wire Transfer',
      accentColor: '#004F71',
      instruction: "Please use your Child's Full Name as payment reference. Submit duplicate deposit slip to the School Bursar."
    };
    updated.feePaymentChannels.push(newChannel);
    setLocalParentHub(updated);
    triggerToast('New payment channel added. Please customize details and save.');
  };

  // Remove a payment channel
  const handleRemovePaymentChannel = (idx) => {
    const updated = { ...localParentHub };
    if (!updated.feePaymentChannels) return;
    const removedName = updated.feePaymentChannels[idx]?.institution || 'Channel';
    if (window.confirm(`Are you sure you want to delete ${removedName}?`)) {
      updated.feePaymentChannels = updated.feePaymentChannels.filter((_, i) => i !== idx);
      setLocalParentHub(updated);
      triggerToast(`${removedName} removed.`);
    }
  };

  // Save Notices
  const handleSaveNotice = (e) => {
    e.preventDefault();
    let updated;
    if (editingNotice.id) {
      updated = localNotices.map(n => n.id === editingNotice.id ? editingNotice : n);
    } else {
      const newNotice = {
        ...editingNotice,
        id: `notice-${Date.now()}`
      };
      updated = [newNotice, ...localNotices];
    }
    setLocalNotices(updated);
    updateSection('schoolNotices', updated);
    setIsNoticeModalOpen(false);
    setEditingNotice(null);
    triggerToast('Notice published successfully.');
  };

  const handleDeleteNotice = (id) => {
    if (window.confirm('Are you sure you want to remove this notice?')) {
      const updated = localNotices.filter(n => n.id !== id);
      setLocalNotices(updated);
      updateSection('schoolNotices', updated);
      triggerToast('Notice removed.');
    }
  };

  // Handle uploading/replacing official organogram charts & document images
  const handleUploadOrganogramChart = async (e, fieldName = 'organogramChartUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingChartField(fieldName);
    try {
      const compressedData = await compressImage(file, 2000, 2000, 0.9);
      let finalUrl = compressedData;
      try {
        const token = localStorage.getItem('gs_admin_token') || 'demo-admin-session-token';
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            filename: `${fieldName}-${Date.now()}.jpg`,
            data: compressedData
          })
        });
        const data = await res.json();
        if (res.ok && data.url) {
          finalUrl = data.url;
        }
      } catch (uploadErr) {
        console.warn('Upload fallback to local image:', uploadErr);
      }

      const updatedSchoolInfo = {
        ...localSchoolInfo,
        [fieldName]: finalUrl
      };
      setLocalSchoolInfo(updatedSchoolInfo);
      const saveRes = await updateSection('schoolInfo', updatedSchoolInfo);
      if (saveRes && saveRes.success) {
        triggerToast('Official organogram chart uploaded and saved!');
      } else {
        alert(saveRes?.error || 'Failed to save chart to server.');
      }
    } catch (err) {
      console.error('Chart upload error:', err);
      alert('Failed to upload chart image: ' + err.message);
    } finally {
      setUploadingChartField(null);
    }
  };

  // Save Staff / Leadership Profile
  const handleSaveStaff = async (e) => {
    e.preventDefault();
    if (!editingStaff || !editingStaff.name || !editingStaff.name.trim()) {
      alert('Please enter a valid full name or office title.');
      return;
    }

    setUploadingImage(true);
    let finalImageUrl = editingStaff.image || '';

    // If image is a base64 string, upload to server
    if (finalImageUrl && finalImageUrl.startsWith('data:image/')) {
      try {
        const token = localStorage.getItem('gs_admin_token') || 'demo-admin-session-token';
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ 
            filename: `staff-${(editingStaff.name || 'leader').toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`, 
            data: finalImageUrl 
          })
        });
        const data = await res.json();
        if (res.ok && data.url) {
          finalImageUrl = data.url;
        }
      } catch (uploadErr) {
        console.warn('Staff image upload fallback:', uploadErr);
      }
    }

    // Parse documented functions from text (each line is a responsibility)
    const parsedFunctions = (staffFunctionsText || '')
      .split('\n')
      .map(s => s.trim().replace(/^[-•*]\s*/, ''))
      .filter(Boolean);

    let updated;
    if (editingStaff.id) {
      updated = localStaff.map(s => s.id === editingStaff.id ? { 
        ...editingStaff, 
        functions: parsedFunctions,
        image: finalImageUrl 
      } : s);
    } else {
      const newStaff = {
        ...editingStaff,
        id: `staff-${Date.now()}`,
        functions: parsedFunctions,
        image: finalImageUrl
      };
      updated = [...localStaff, newStaff];
    }

    setLocalStaff(updated);
    const saveRes = await updateSection('administrationBoard', updated);
    setUploadingImage(false);

    if (saveRes && saveRes.success) {
      setIsStaffModalOpen(false);
      setEditingStaff(null);
      setStaffFunctionsText('');
      triggerToast('Leadership profile & responsibilities saved live!');
    } else {
      alert(saveRes?.error || 'Failed to save staff profile to server.');
    }
  };

  const handleDeleteStaff = async (id) => {
    if (window.confirm('Are you sure you want to delete this leadership / staff profile?')) {
      const updated = localStaff.filter(s => s.id !== id);
      setLocalStaff(updated);
      const saveRes = await updateSection('administrationBoard', updated);
      if (saveRes && saveRes.success) {
        triggerToast('Profile removed successfully.');
      }
    }
  };

  // Save Single Gallery Photo
  const handleSaveGallery = async (e) => {
    e.preventDefault();
    if (!editingGallery || !editingGallery.image) {
      setUploadError('Please select a photo from your device.');
      return;
    }

    setUploadingImage(true);
    setUploadError(null);

    let finalImageUrl = editingGallery.image;

    // If image is a base64 string, upload it to the server first
    if (finalImageUrl.startsWith('data:image/')) {
      try {
        const token = localStorage.getItem('gs_admin_token') || 'demo-admin-session-token';
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ 
            filename: `${(editingGallery.title || 'photo').toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`, 
            data: finalImageUrl 
          })
        });
        const data = await res.json();
        if (res.ok && data.url) {
          finalImageUrl = data.url;
        }
      } catch (uploadErr) {
        console.warn('Upload fallback to data url:', uploadErr);
      }
    }

    let updated;
    if (editingGallery.id) {
      updated = localGallery.map(g => g.id === editingGallery.id ? { ...editingGallery, image: finalImageUrl } : g);
    } else {
      const newItem = {
        ...editingGallery,
        id: `gal-${Date.now()}`,
        image: finalImageUrl
      };
      updated = [newItem, ...localGallery];
    }

    setLocalGallery(updated);
    const saveRes = await updateSection('galleryItems', updated);
    setUploadingImage(false);

    if (saveRes && saveRes.success) {
      setIsGalleryModalOpen(false);
      setEditingGallery(null);
      setUploadError(null);
      triggerToast('Photo successfully saved to gallery and published live!');
    } else {
      setUploadError(saveRes?.error || 'Failed to save to server. Please try again.');
    }
  };

  const handleDeleteGallery = async (id) => {
    if (window.confirm('Delete this photo from the gallery?')) {
      const updated = localGallery.filter(g => g.id !== id);
      setLocalGallery(updated);
      const res = await updateSection('galleryItems', updated);
      if (res && res.success) {
        triggerToast('Photo deleted and gallery updated.');
      }
    }
  };

  // Password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPassMessage(null);
    if (!newPass || newPass.length < 8) {
      setPassMessage({ type: 'error', text: 'New password must contain at least 8 characters.' });
      return;
    }
    try {
      const res = await fetch('/api/auth/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('gs_admin_token')}`
        },
        body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update password');
      setPassMessage({ type: 'success', text: data.message });
      setCurrentPass('');
      setNewPass('');
      fetchAuditLog();
    } catch (err) {
      setPassMessage({ type: 'error', text: err.message });
    }
  };

  // Filtered applications
  const filteredApps = applications.filter(app => {
    if (appFilter === 'all') return true;
    return app.status.toLowerCase() === appFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-5 right-5 z-50 bg-[#181b66] text-white px-5 py-3 rounded-2xl shadow-2xl border border-blue-400 flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="bg-[#181b66] text-white sticky top-0 z-40 px-4 sm:px-8 py-3.5 border-b border-blue-900 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Good Shepherd Logo" 
              className="w-9 h-9 rounded-full object-contain bg-white p-0.5"
            />
            <div>
              <div className="text-sm sm:text-base font-bold font-serif leading-none">
                Good Shepherd CMI Editor
              </div>
              <div className="text-[10px] text-blue-200 uppercase tracking-widest font-semibold mt-1">
                Content Management System · Bechem
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* View Live Public Site */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors border border-white/15"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Logout */}
            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-xs font-bold text-red-200 transition-colors border border-red-500/30"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 flex-1 flex flex-col md:flex-row gap-6">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200 sticky top-20 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Editor Modules
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#181b66] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('notices')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'notices'
                  ? 'bg-[#181b66] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4" />
                <span>Notices & News</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-900 font-extrabold">
                {localNotices.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('tuition')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'tuition'
                  ? 'bg-[#181b66] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4" />
                <span>Tuition & Bank Info</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('schoolInfo')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'schoolInfo'
                  ? 'bg-[#181b66] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building className="w-4 h-4" />
                <span>School Info & Timing</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'applications'
                  ? 'bg-[#181b66] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4" />
                <span>Admissions & Tours</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-900 font-extrabold">
                {applications.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('staff')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'staff'
                  ? 'bg-[#181b66] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Organogram & Staff</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-900 font-extrabold">
                {localStaff.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'gallery'
                  ? 'bg-[#181b66] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Image className="w-4 h-4" />
                <span>Photo Gallery</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-900 font-extrabold">
                {localGallery.length}
              </span>
            </button>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => setActiveTab('backups')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'backups'
                    ? 'bg-[#181b66] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4" />
                  <span>Backups & Security</span>
                </div>
              </button>
            </div>
          </div>
        </aside>

        {/* Content Workspace Area */}
        <main className="flex-1 min-w-0">
          
          {/* ================= TAB 1: OVERVIEW ================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      Welcome Back, Administrator
                    </span>
                    <h2 className="text-2xl font-bold font-serif text-[#181b66] mt-1">
                      Good Shepherd Content Management System
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Modify announcements, update school fees and MoMo payment lines, review inbound parent applications, and manage campus profiles in real time.
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('notices')}
                      className="px-4 py-2 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Post New Notice</span>
                    </button>
                  </div>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                  <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-100">
                    <span className="text-xs text-blue-700 font-bold block uppercase tracking-wider">Active Notices</span>
                    <span className="text-2xl font-extrabold text-[#181b66] mt-1 block">{localNotices.length}</span>
                    <span className="text-[11px] text-slate-500">Live on News & Parent Hub</span>
                  </div>

                  <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100">
                    <span className="text-xs text-emerald-700 font-bold block uppercase tracking-wider">Inbound Inquiries</span>
                    <span className="text-2xl font-extrabold text-emerald-900 mt-1 block">{applications.length}</span>
                    <span className="text-[11px] text-slate-500">Applications & Tour visits</span>
                  </div>

                  <div className="bg-purple-50/60 rounded-2xl p-4 border border-purple-100">
                    <span className="text-xs text-purple-700 font-bold block uppercase tracking-wider">Active Programs</span>
                    <span className="text-2xl font-extrabold text-purple-900 mt-1 block">2 Levels</span>
                    <span className="text-[11px] text-slate-500">Creche & Day Care (4m–4y)</span>
                  </div>

                  <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-100">
                    <span className="text-xs text-amber-700 font-bold block uppercase tracking-wider">Campus Faculty</span>
                    <span className="text-2xl font-extrabold text-amber-900 mt-1 block">{localStaff.length} Profiles</span>
                    <span className="text-[11px] text-slate-500">Organogram structure</span>
                  </div>
                </div>
              </div>

              {/* Recent Applications Preview */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-base text-[#181b66] flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-blue-600" />
                    <span>Recent Admissions & Visit Submissions</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('applications')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    View All ({applications.length})
                  </button>
                </div>

                {applications.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No applications recorded yet.</p>
                ) : (
                  <div className="space-y-2.5">
                    {applications.slice(0, 3).map((app) => (
                      <div
                        key={app.id}
                        className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/70 transition-colors flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-bold text-slate-800">
                            {app.childName || 'Applicant'} · <span className="font-semibold text-slate-500">{app.level}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Parent: {app.parentName} ({app.parentPhone})
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                            app.status === 'Accepted'
                              ? 'bg-emerald-100 text-emerald-800'
                              : app.status === 'Contacted'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= TAB 2: NOTICES & ANNOUNCEMENTS ================= */}
          {activeTab === 'notices' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-[#181b66]">
                      School Notices & Announcements
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Publish term dates, assembly circulars, and official parent notices.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingNotice({
                        title: '',
                        category: 'Admissions',
                        date: 'September 2026',
                        priority: 'Normal',
                        summary: '',
                        content: '',
                        author: 'Administration Office, Bechem Campus'
                      });
                      setIsNoticeModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Notice</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {localNotices.map((notice) => (
                    <div
                      key={notice.id}
                      className="border border-slate-200 rounded-2xl p-5 hover:border-blue-400 transition-colors bg-white flex flex-col md:flex-row md:items-start justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            notice.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {notice.priority} Priority
                          </span>
                          <span className="text-[11px] font-bold text-slate-400">· {notice.category}</span>
                          <span className="text-[11px] text-slate-400">· {notice.date}</span>
                        </div>
                        <h4 className="font-bold text-base text-slate-900">{notice.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-light">{notice.summary}</p>
                        <div className="text-[11px] text-slate-400 pt-1">
                          Author: <span className="font-medium text-slate-600">{notice.author}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setEditingNotice(notice);
                            setIsNoticeModalOpen(true);
                          }}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition-colors text-xs font-semibold flex items-center gap-1"
                          title="Edit Notice"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteNotice(notice.id)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 transition-colors text-xs font-semibold flex items-center gap-1"
                          title="Delete Notice"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: TUITION & BANK ACCOUNTS ================= */}
          {activeTab === 'tuition' && (
            <div className="space-y-6">
              <form onSubmit={handleSaveTuition} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-[#181b66]">
                      Tuition Fees & Banking Channels
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Adjust termly and annual fees, mobile money numbers, and official bank accounts.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save All Changes</span>
                  </button>
                </div>

                {/* Program Fees */}
                <div>
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
                    Active Program Fee Rates
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {localPrograms.map((prog, idx) => (
                      <div key={prog.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="font-bold text-sm text-[#181b66]">{prog.name} ({prog.ages})</div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                            Termly Tuition Fee
                          </label>
                          <input
                            type="text"
                            value={prog.tuition?.termlyFee || ''}
                            onChange={(e) => {
                              const updated = [...localPrograms];
                              updated[idx].tuition.termlyFee = e.target.value;
                              setLocalPrograms(updated);
                            }}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#181b66]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                            Annual Tuition Fee
                          </label>
                          <input
                            type="text"
                            value={prog.tuition?.annualFee || ''}
                            onChange={(e) => {
                              const updated = [...localPrograms];
                              updated[idx].tuition.annualFee = e.target.value;
                              setLocalPrograms(updated);
                            }}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#181b66]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Banking & MoMo Channels */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#181b66]" />
                        Official Fee Payment & Banking Channels ({localParentHub.feePaymentChannels?.length || 0})
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Switch banks, customize logos (upload from device or pick presets), configure accounts, or add new channels.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddPaymentChannel}
                      className="px-4 py-2 rounded-xl bg-blue-50 text-[#181b66] hover:bg-blue-100 font-bold text-xs border border-blue-200 transition-all flex items-center gap-2 self-start sm:self-auto shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Bank or Payment Channel</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {localParentHub.feePaymentChannels?.map((ch, idx) => (
                      <div
                        key={idx}
                        className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-5 transition-all hover:border-slate-300"
                      >
                        {/* Channel Header Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                          <div className="flex items-center gap-3">
                            <div
                              className="h-12 w-28 bg-white rounded-xl border border-slate-200 p-2 flex items-center justify-center shadow-xs overflow-hidden"
                              style={{ borderLeft: `4px solid ${ch.accentColor || '#181b66'}` }}
                            >
                              {ch.logo ? (
                                <img
                                  src={ch.logo}
                                  alt={ch.institution}
                                  className="max-h-full max-w-full object-contain"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              ) : (
                                <Building className="w-6 h-6 text-slate-400" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-base text-[#181b66]">
                                  {ch.institution || 'Financial Institution'}
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                                  Channel #{idx + 1}
                                </span>
                              </div>
                              <span className="text-xs text-slate-500 font-medium block mt-0.5">
                                {ch.type || 'Bank Direct Deposit'}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Fast Switch Bank Dropdown */}
                            <div className="flex items-center gap-1.5">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap hidden md:inline">
                                Switch Bank:
                              </label>
                              <select
                                onChange={(e) => {
                                  const selectedPreset = GHANAIAN_BANK_PRESETS.find(p => p.name === e.target.value);
                                  if (selectedPreset) handleBankPresetChange(idx, selectedPreset);
                                }}
                                defaultValue=""
                                className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#181b66] shadow-2xs"
                              >
                                <option value="" disabled>1-Click Bank Switcher...</option>
                                {GHANAIAN_BANK_PRESETS.map((p, pIdx) => (
                                  <option key={pIdx} value={p.name}>{p.name}</option>
                                ))}
                              </select>
                            </div>

                            {/* Delete Channel Button */}
                            <button
                              type="button"
                              onClick={() => handleRemovePaymentChannel(idx)}
                              title="Delete Payment Channel"
                              className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-200 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Institution Name, Type & Brand Color */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                              Institution Name
                            </label>
                            <input
                              type="text"
                              value={ch.institution || ''}
                              onChange={(e) => {
                                const updated = { ...localParentHub };
                                updated.feePaymentChannels[idx].institution = e.target.value;
                                setLocalParentHub(updated);
                              }}
                              placeholder="e.g. Ecobank Ghana"
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-bold focus:outline-none focus:border-[#181b66]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                              Payment Channel Type
                            </label>
                            <input
                              type="text"
                              value={ch.type || ''}
                              onChange={(e) => {
                                const updated = { ...localParentHub };
                                updated.feePaymentChannels[idx].type = e.target.value;
                                setLocalParentHub(updated);
                              }}
                              placeholder="e.g. Bank Direct Deposit / Omni Lite"
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#181b66]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                              Brand Accent Color (Hex)
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={ch.accentColor || '#181b66'}
                                onChange={(e) => {
                                  const updated = { ...localParentHub };
                                  updated.feePaymentChannels[idx].accentColor = e.target.value;
                                  setLocalParentHub(updated);
                                }}
                                className="w-9 h-9 p-0.5 rounded-lg border border-slate-200 cursor-pointer bg-white"
                              />
                              <input
                                type="text"
                                value={ch.accentColor || '#181b66'}
                                onChange={(e) => {
                                  const updated = { ...localParentHub };
                                  updated.feePaymentChannels[idx].accentColor = e.target.value;
                                  setLocalParentHub(updated);
                                }}
                                placeholder="#181b66"
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-[#181b66]"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Account Number, Holder, Branch, MoMo Pay ID */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                              Account Number / Phone
                            </label>
                            <input
                              type="text"
                              value={ch.accountNumber !== undefined ? ch.accountNumber : (ch.merchantNumber || '')}
                              onChange={(e) => {
                                const updated = { ...localParentHub };
                                if (ch.accountNumber !== undefined) {
                                  updated.feePaymentChannels[idx].accountNumber = e.target.value;
                                } else {
                                  updated.feePaymentChannels[idx].merchantNumber = e.target.value;
                                }
                                setLocalParentHub(updated);
                              }}
                              placeholder="e.g. 1441002345678"
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-mono font-bold focus:outline-none focus:border-[#181b66]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                              Account / Merchant Name
                            </label>
                            <input
                              type="text"
                              value={ch.accountName || ch.merchantName || ''}
                              onChange={(e) => {
                                const updated = { ...localParentHub };
                                if (ch.accountName !== undefined) {
                                  updated.feePaymentChannels[idx].accountName = e.target.value;
                                } else {
                                  updated.feePaymentChannels[idx].merchantName = e.target.value;
                                }
                                setLocalParentHub(updated);
                              }}
                              placeholder="e.g. Good Shepherd Montessori School"
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#181b66]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                              Branch / Agency
                            </label>
                            <input
                              type="text"
                              value={ch.branch || ''}
                              onChange={(e) => {
                                const updated = { ...localParentHub };
                                updated.feePaymentChannels[idx].branch = e.target.value;
                                setLocalParentHub(updated);
                              }}
                              placeholder="e.g. Bechem Branch"
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#181b66]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                              MoMo Pay Merchant ID / Code
                            </label>
                            <input
                              type="text"
                              value={ch.momoPayId || ''}
                              onChange={(e) => {
                                const updated = { ...localParentHub };
                                updated.feePaymentChannels[idx].momoPayId = e.target.value;
                                setLocalParentHub(updated);
                              }}
                              placeholder="e.g. 482019 or *170#"
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:border-[#181b66]"
                            />
                          </div>
                        </div>

                        {/* Dedicated Logo Manager Section */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                              <Image className="w-3.5 h-3.5 text-[#181b66]" />
                              Bank Logo Customization
                            </label>
                            <div className="flex items-center gap-2">
                              {/* Device File Upload Button */}
                              <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-300">
                                <Upload className="w-3.5 h-3.5 text-slate-600" />
                                <span>Upload New Logo</span>
                                <input
                                  type="file"
                                  accept="image/png, image/jpeg, image/webp, image/svg+xml, .svg"
                                  className="hidden"
                                  onChange={(e) => handleBankLogoUpload(idx, e)}
                                />
                              </label>
                            </div>
                          </div>

                          {/* 1-Click Ghanaian Logo Presets */}
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                              Or Choose 1-Click Official Ghanaian Brand Logo Preset:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {AVAILABLE_LOGO_PRESETS.map((preset, lIdx) => (
                                <button
                                  key={lIdx}
                                  type="button"
                                  onClick={() => handleSelectLogoPreset(idx, preset.logo)}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                                    ch.logo === preset.logo
                                      ? 'bg-blue-50 border-[#181b66] text-[#181b66] ring-1 ring-[#181b66]'
                                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300'
                                  }`}
                                >
                                  <img
                                    src={preset.logo}
                                    alt={preset.name}
                                    className="w-4 h-4 object-contain"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                  />
                                  <span>{preset.name}</span>
                                  {ch.logo === preset.logo && <Check className="w-3 h-3 text-[#181b66]" />}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Direct Logo URL Input */}
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                              Direct Logo URL / Path:
                            </span>
                            <input
                              type="text"
                              value={ch.logo || ''}
                              onChange={(e) => {
                                const updated = { ...localParentHub };
                                updated.feePaymentChannels[idx].logo = e.target.value;
                                setLocalParentHub(updated);
                              }}
                              placeholder="/images/banks/... or https://..."
                              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-mono focus:bg-white focus:outline-none focus:border-[#181b66]"
                            />
                          </div>
                        </div>

                        {/* Deposit & Payment Instructions */}
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                            Deposit & Payment Instructions
                          </label>
                          <textarea
                            rows={2}
                            value={ch.instruction || ''}
                            onChange={(e) => {
                              const updated = { ...localParentHub };
                              updated.feePaymentChannels[idx].instruction = e.target.value;
                              setLocalParentHub(updated);
                            }}
                            placeholder="Instructions for parents when depositing or transferring fees..."
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#181b66]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* ================= TAB 4: SCHOOL INFO & TIMING ================= */}
          {activeTab === 'schoolInfo' && (
            <div className="space-y-6">
              <form onSubmit={handleSaveSchoolInfo} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-[#181b66]">
                      School Information & Contact Protocols
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Update official telephone lines, email address, physical location, and drop-off/pick-up hours.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Contact Details</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      School Official Name
                    </label>
                    <input
                      type="text"
                      value={localSchoolInfo.name || ''}
                      onChange={(e) => setLocalSchoolInfo({ ...localSchoolInfo, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      School Official Motto
                    </label>
                    <input
                      type="text"
                      value={localSchoolInfo.motto || ''}
                      onChange={(e) => setLocalSchoolInfo({ ...localSchoolInfo, motto: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      value={localSchoolInfo.email || ''}
                      onChange={(e) => setLocalSchoolInfo({ ...localSchoolInfo, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Ages Served
                    </label>
                    <input
                      type="text"
                      value={localSchoolInfo.agesServed || ''}
                      onChange={(e) => setLocalSchoolInfo({ ...localSchoolInfo, agesServed: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Contact Phone Numbers (Combined Display)
                    </label>
                    <input
                      type="text"
                      value={localSchoolInfo.phone || ''}
                      onChange={(e) => setLocalSchoolInfo({ ...localSchoolInfo, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Morning Drop-off Window
                    </label>
                    <input
                      type="text"
                      value={localSchoolInfo.morningDropOff || ''}
                      onChange={(e) => setLocalSchoolInfo({ ...localSchoolInfo, morningDropOff: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Afternoon Pick-up Timing
                    </label>
                    <input
                      type="text"
                      value={localSchoolInfo.pickUpTime || ''}
                      onChange={(e) => setLocalSchoolInfo({ ...localSchoolInfo, pickUpTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Campus Physical Address
                    </label>
                    <input
                      type="text"
                      value={localSchoolInfo.address || ''}
                      onChange={(e) => setLocalSchoolInfo({ ...localSchoolInfo, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white"
                    />
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* ================= TAB 5: ADMISSIONS & INQUIRIES ================= */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-[#181b66]">
                      Inbound Admissions & Tour Bookings
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Real-time submissions from parents on the public website.
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
                    {['all', 'pending', 'contacted', 'accepted'].map((filterKey) => (
                      <button
                        key={filterKey}
                        onClick={() => setAppFilter(filterKey)}
                        className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors ${
                          appFilter === filterKey
                            ? 'bg-[#181b66] text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {filterKey}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredApps.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    No inquiries found matching this filter.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider">
                          <th className="pb-3 font-bold">Applicant / Child</th>
                          <th className="pb-3 font-bold">Level Requested</th>
                          <th className="pb-3 font-bold">Parent & Phone</th>
                          <th className="pb-3 font-bold">Type</th>
                          <th className="pb-3 font-bold">Status</th>
                          <th className="pb-3 font-bold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredApps.map((app) => (
                          <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 pr-3">
                              <span className="font-bold text-slate-900 block">{app.childName || 'N/A'}</span>
                              <span className="text-[11px] text-slate-500">{app.childAge || app.childDob || 'Age not specified'}</span>
                            </td>
                            <td className="py-3.5 pr-3 font-medium text-slate-700">
                              {app.level || 'Creche / Day Care'}
                            </td>
                            <td className="py-3.5 pr-3">
                              <span className="font-semibold text-slate-800 block">{app.parentName}</span>
                              <a href={`tel:${app.parentPhone}`} className="text-blue-600 hover:underline">
                                {app.parentPhone}
                              </a>
                            </td>
                            <td className="py-3.5 pr-3">
                              <span className="px-2 py-0.5 rounded-md font-extrabold uppercase text-[9px] bg-slate-100 text-slate-700">
                                {app.type || 'Application'}
                              </span>
                            </td>
                            <td className="py-3.5 pr-3">
                              <select
                                value={app.status}
                                onChange={(e) => {
                                  updateApplication(app.id, { status: e.target.value });
                                  triggerToast(`Status updated to ${e.target.value}`);
                                }}
                                className="px-2.5 py-1 rounded-lg border border-slate-200 font-bold text-[11px] bg-white focus:outline-none focus:border-[#181b66]"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Assessment Scheduled">Assessment</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Archived">Archived</option>
                              </select>
                            </td>
                            <td className="py-3.5 text-right space-x-1">
                              <button
                                onClick={() => setSelectedApp(app)}
                                className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[11px]"
                              >
                                Details
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm('Delete this inquiry?')) {
                                    deleteApplication(app.id);
                                    triggerToast('Record deleted.');
                                  }
                                }}
                                className="p-1 text-slate-400 hover:text-red-600"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5 inline" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= TAB 6: ORGANOGRAM & STAFF ================= */}
          {activeTab === 'staff' && (
            <div className="space-y-6">
              {/* SECTION 1: OFFICIAL CHARTS & DOCUMENTS UPLOADER */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-[#181b66]">
                      Official Organogram Charts & Documents
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Upload high-resolution flowcharts and document covers displayed in the Leadership page lightbox.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {/* Chart 1: Main Organogram */}
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md">
                          Main Organogram Flowchart
                        </span>
                        <a 
                          href={localSchoolInfo.organogramChartUrl || '/school-organogram.jpg'} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </a>
                      </div>
                      <div className="h-32 bg-slate-200 rounded-xl overflow-hidden border border-slate-300 relative group">
                        <img 
                          src={localSchoolInfo.organogramChartUrl || '/school-organogram.jpg'} 
                          alt="Organogram Chart" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="w-full py-2 px-3 rounded-xl bg-white hover:bg-blue-50 border border-slate-300 hover:border-blue-400 text-slate-700 hover:text-blue-700 text-xs font-bold text-center block cursor-pointer transition-all shadow-2xs">
                        <span>{uploadingChartField === 'organogramChartUrl' ? 'Uploading...' : 'Replace Organogram Chart'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleUploadOrganogramChart(e, 'organogramChartUrl')}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Chart 2: Administrator Functions */}
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-md">
                          Administrator Duties Chart
                        </span>
                        <a 
                          href={localSchoolInfo.administratorChartUrl || '/administrator-functions.jpg'} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </a>
                      </div>
                      <div className="h-32 bg-slate-200 rounded-xl overflow-hidden border border-slate-300 relative group">
                        <img 
                          src={localSchoolInfo.administratorChartUrl || '/administrator-functions.jpg'} 
                          alt="Administrator Functions" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="w-full py-2 px-3 rounded-xl bg-white hover:bg-blue-50 border border-slate-300 hover:border-blue-400 text-slate-700 hover:text-blue-700 text-xs font-bold text-center block cursor-pointer transition-all shadow-2xs">
                        <span>{uploadingChartField === 'administratorChartUrl' ? 'Uploading...' : 'Replace Duties Chart'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleUploadOrganogramChart(e, 'administratorChartUrl')}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Chart 3: Manual Cover */}
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md">
                          Operational Manual Cover
                        </span>
                        <a 
                          href={localSchoolInfo.manualCoverUrl || '/organogram-cover.jpg'} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </a>
                      </div>
                      <div className="h-32 bg-slate-200 rounded-xl overflow-hidden border border-slate-300 relative group">
                        <img 
                          src={localSchoolInfo.manualCoverUrl || '/organogram-cover.jpg'} 
                          alt="Manual Cover" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="w-full py-2 px-3 rounded-xl bg-white hover:bg-blue-50 border border-slate-300 hover:border-blue-400 text-slate-700 hover:text-blue-700 text-xs font-bold text-center block cursor-pointer transition-all shadow-2xs">
                        <span>{uploadingChartField === 'manualCoverUrl' ? 'Uploading...' : 'Replace Manual Cover'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleUploadOrganogramChart(e, 'manualCoverUrl')}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: 5-TIER GOVERNANCE & LEADERSHIP PROFILES */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-[#181b66]">
                      Leadership & Governance Profiles
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Maintain portraits, bios, and documented responsibilities for all 5 governance tiers.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingStaff({
                        name: '',
                        tier: 'Tier 3: Campus Leadership',
                        role: '',
                        department: 'Academic',
                        churchRole: 'Good Shepherd Bechem',
                        bio: '',
                        image: '',
                        functions: []
                      });
                      setStaffFunctionsText('');
                      setIsStaffModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Leadership Profile</span>
                  </button>
                </div>

                {/* Tier Filter Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 mb-6 p-1.5 bg-slate-100 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setStaffTierFilter('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      staffTierFilter === 'all'
                        ? 'bg-white text-[#181b66] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All Tiers ({localStaff.length})
                  </button>
                  {[
                    { id: 'tier-1', name: 'Tier 1: Governing Board' },
                    { id: 'tier-2', name: 'Tier 2: Management Committee' },
                    { id: 'tier-3', name: 'Tier 3: Campus Leadership' },
                    { id: 'tier-4', name: 'Tier 4: Classroom Instruction' },
                    { id: 'tier-5', name: 'Tier 5: Operational Support' }
                  ].map((t) => {
                    const count = localStaff.filter(s => (s.tier || '').startsWith(t.name.split(':')[0])).length;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setStaffTierFilter(t.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          staffTierFilter === t.id
                            ? 'bg-white text-[#181b66] shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {t.name.split(':')[0]} ({count})
                      </button>
                    );
                  })}
                </div>

                {/* Profiles Grid */}
                {(() => {
                  const filtered = localStaff.filter(person => {
                    if (staffTierFilter === 'all') return true;
                    if (staffTierFilter === 'tier-1') return (person.tier || '').startsWith('Tier 1');
                    if (staffTierFilter === 'tier-2') return (person.tier || '').startsWith('Tier 2');
                    if (staffTierFilter === 'tier-3') return (person.tier || '').startsWith('Tier 3');
                    if (staffTierFilter === 'tier-4') return (person.tier || '').startsWith('Tier 4');
                    if (staffTierFilter === 'tier-5') return (person.tier || '').startsWith('Tier 5');
                    return true;
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-xs font-semibold">No leadership profiles found for this tier.</p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filtered.map((person) => (
                        <div
                          key={person.id}
                          className="border border-slate-200 rounded-2xl p-5 hover:border-blue-400 transition-colors bg-white flex flex-col justify-between shadow-2xs"
                        >
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3">
                                {person.image ? (
                                  <img
                                    src={person.image}
                                    alt={person.name}
                                    className="w-14 h-16 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0"
                                  />
                                ) : (
                                  <div className="w-14 h-16 rounded-xl bg-gradient-to-b from-[#181b66] to-[#101344] text-white flex items-center justify-center font-serif font-bold text-lg shrink-0 shadow-2xs">
                                    {person.name?.charAt(0) || 'G'}
                                  </div>
                                )}
                                <div>
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                                    {person.tier}
                                  </span>
                                  <h4 className="font-bold text-sm text-slate-900 leading-snug">{person.name}</h4>
                                  <div className="text-xs font-semibold text-amber-600 mt-0.5">{person.role}</div>
                                </div>
                              </div>

                              <div className="space-x-1 shrink-0">
                                <button
                                  onClick={() => {
                                    setEditingStaff(person);
                                    setStaffFunctionsText((person.functions || []).join('\n'));
                                    setIsStaffModalOpen(true);
                                  }}
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-slate-100 cursor-pointer"
                                  title="Edit Profile"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteStaff(person.id)}
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-700 hover:bg-slate-100 cursor-pointer"
                                  title="Delete Profile"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {person.churchRole && (
                              <div className="text-[11px] text-slate-500 font-medium bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                                Church / Community: <span className="text-slate-800 font-semibold">{person.churchRole}</span>
                              </div>
                            )}

                            <p className="text-xs text-slate-600 font-light leading-relaxed line-clamp-3">
                              {person.bio}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 mt-3 flex items-center justify-between">
                            <span className="font-semibold text-slate-700">
                              {person.functions?.length || 0} Key Responsibilities
                            </span>
                            {person.image ? (
                              <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded-md">
                                Photo Uploaded
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[10px] bg-slate-100 px-2 py-0.5 rounded-md">
                                Monogram Badge
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ================= TAB 7: PHOTO GALLERY ================= */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-[#181b66]">
                      Campus Photo Gallery
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Upload and manage Montessori learning apparatus, classroom photos, and outdoor activities directly from your device.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsBatchMode(true);
                        setBatchPhotos([]);
                        setBatchCategory('Sensorial & Practical Life');
                        setBatchLevel('Creche & Day Care');
                        setBatchPrefix('');
                        setBatchCaption('');
                        setUploadError(null);
                        setEditingGallery({
                          title: '',
                          category: 'Sensorial & Practical Life',
                          image: '',
                          caption: '',
                          level: 'Creche & Day Care'
                        });
                        setIsGalleryModalOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Images className="w-4 h-4" />
                      <span>Upload Multiple Photos</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsBatchMode(false);
                        setBatchPhotos([]);
                        setEditingGallery({
                          title: '',
                          category: 'Sensorial & Practical Life',
                          image: '',
                          caption: '',
                          level: 'Creche & Day Care'
                        });
                        setUploadError(null);
                        setIsGalleryModalOpen(true);
                      }}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-200"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Single Photo</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {localGallery.map((item) => (
                    <div
                      key={item.id}
                      className="border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-400 transition-colors bg-white flex flex-col"
                    >
                      <div className="h-36 bg-slate-100 relative overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{item.title}</h4>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 font-light">{item.caption}</p>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-3">
                          <span className="text-[10px] font-bold text-blue-700">{item.level}</span>
                          <div className="space-x-1">
                            <button
                              onClick={() => {
                                setIsBatchMode(false);
                                setBatchPhotos([]);
                                setEditingGallery(item);
                                setUploadError(null);
                                setIsGalleryModalOpen(true);
                              }}
                              className="p-1 text-slate-500 hover:text-blue-700"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5 inline" />
                            </button>
                            <button
                              onClick={() => handleDeleteGallery(item.id)}
                              className="p-1 text-slate-500 hover:text-red-700"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5 inline" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 8: BACKUPS & SECURITY ================= */}
          {activeTab === 'backups' && (
            <div className="space-y-6">
              {/* Security & Active Session Architecture Overview */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-[#181b66]">
                      Security & Active Session Overview
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Hardware-backed and cryptographic session controls protecting the Montessori CMI Portal.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>PBKDF2 SHA-512 Protected</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Logged-in Administrator
                    </div>
                    <div className="text-sm font-bold text-slate-900 font-mono">
                      {adminUser?.username || 'admin'}
                    </div>
                    <div className="text-xs text-slate-500">
                      {adminUser?.email || 'admin@goodshepherd.edu.gh'}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Session Token Validity
                    </div>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>24 Hours Active</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {sessionExpiresAt ? `Expires: ${new Date(sessionExpiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Session verified'}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Brute-Force Rate Limiting
                    </div>
                    <div className="text-sm font-bold text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Active (5 Tries / 60s Lock)</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Timing-safe comparison enabled
                    </div>
                  </div>
                </div>
              </div>

              {/* Backups Panel */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-[#181b66]">
                      System Snapshots & Backups
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Create point-in-time snapshots stored safely on the server disk.
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      const res = await createBackup();
                      if (res.success) triggerToast('Manual backup snapshot created successfully.');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Create Snapshot Now</span>
                  </button>
                </div>

                <div className="space-y-2 mt-4">
                  {backups.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center">No snapshot backups found on disk.</p>
                  ) : (
                    backups.map((b) => (
                      <div
                        key={b.filename}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-mono font-bold text-slate-800">{b.filename}</div>
                          <div className="text-[11px] text-slate-400">
                            Created: {new Date(b.createdAt).toLocaleString()} · Size: {b.sizeKb} KB
                          </div>
                        </div>
                        <button
                          onClick={async () => {
                            if (window.confirm(`Restore site content from ${b.filename}?`)) {
                              const res = await restoreBackup(b.filename);
                              if (res.success) triggerToast('System restored successfully.');
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 font-bold text-slate-700 hover:text-blue-700 text-xs shadow-2xs cursor-pointer"
                        >
                          Restore
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Security & Password Update */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-[#181b66]" />
                  <h3 className="text-base font-bold text-[#181b66]">
                    Change Administrator Password
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Update credentials. Passwords are automatically hashed with salted PBKDF2 (100,000 iterations).
                </p>

                {passMessage && (
                  <div className={`p-3.5 rounded-xl mb-4 text-xs font-semibold ${
                    passMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {passMessage.text}
                  </div>
                )}

                <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-[#181b66]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      New Password (Minimum 8 characters)
                    </label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Enter strong new password (8+ chars)"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-[#181b66]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              {/* Live Administrative Audit Log Feed */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#181b66] flex items-center justify-center border border-blue-100">
                      <History className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#181b66]">
                        Administrative Audit Log
                      </h3>
                      <p className="text-xs text-slate-500">
                        Real-time immutable log of logins, content modifications, and file operations.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => fetchAuditLog()}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Refresh Audit Log"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh</span>
                  </button>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-72 overflow-y-auto">
                  {auditLog.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">
                      No security audit events recorded yet.
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100 text-xs">
                      {auditLog.map((log) => (
                        <div key={log.id} className="p-3 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/80 transition-colors">
                          <div className="flex items-center gap-2.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              log.action.includes('SUCCESS') || log.action.includes('SAVED') || log.action.includes('RESTORED')
                                ? 'bg-emerald-100 text-emerald-800'
                                : log.action.includes('FAILED') || log.action.includes('BLOCKED') || log.action.includes('DELETED')
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-blue-100 text-blue-800'
                            }`}>
                              {log.action.replace(/_/g, ' ')}
                            </span>
                            <span className="font-semibold text-slate-800">
                              Actor: {log.actor}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                            {log.details && Object.keys(log.details).length > 0 && (
                              <span className="text-slate-500 font-mono text-[10px] truncate max-w-xs">
                                {JSON.stringify(log.details)}
                              </span>
                            )}
                            <span className="shrink-0 font-medium">
                              {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ================= MODAL: EDIT / CREATE NOTICE ================= */}
      {isNoticeModalOpen && editingNotice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-[#181b66] mb-4">
              {editingNotice.id ? 'Edit School Notice' : 'Post New Notice'}
            </h3>

            <form onSubmit={handleSaveNotice} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Notice Title
                </label>
                <input
                  type="text"
                  required
                  value={editingNotice.title}
                  onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                  placeholder="e.g. Term 1 Reopening Guidelines"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={editingNotice.category}
                    onChange={(e) => setEditingNotice({ ...editingNotice, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Academic">Academic</option>
                    <option value="PTA">PTA</option>
                    <option value="Finance">Finance</option>
                    <option value="Health & Welfare">Health & Welfare</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Priority Level
                  </label>
                  <select
                    value={editingNotice.priority}
                    onChange={(e) => setEditingNotice({ ...editingNotice, priority: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Brief Summary (Visible in cards)
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingNotice.summary}
                  onChange={(e) => setEditingNotice({ ...editingNotice, summary: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Announcement Content
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingNotice.content}
                  onChange={(e) => setEditingNotice({ ...editingNotice, content: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNoticeModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs shadow-xs"
                >
                  Save & Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT / CREATE STAFF ================= */}
      {isStaffModalOpen && editingStaff && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold font-serif text-[#181b66]">
                  {editingStaff.id ? 'Edit Leadership Profile' : 'Add Leadership Profile'}
                </h3>
                <p className="text-xs text-slate-500">
                  Configure portrait headshot, institutional role, and expandable responsibilities.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsStaffModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveStaff} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name / Governing Body Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingStaff.name || ''}
                  onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                  placeholder="e.g. Director (District Minister) or Mrs. Grace Mensah"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:bg-white focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Organogram Governance Tier <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={editingStaff.tier || 'Tier 3: Campus Leadership'}
                    onChange={(e) => setEditingStaff({ ...editingStaff, tier: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:bg-white"
                  >
                    <option value="Tier 1: Governing Board">Tier 1: Governing Board (Session Members)</option>
                    <option value="Tier 2: Management Committee">Tier 2: Management Committee (Director, Supervisor, Administrator, Treasurer)</option>
                    <option value="Tier 3: Campus Leadership">Tier 3: Campus Leadership (Head of School)</option>
                    <option value="Tier 4: Classroom Instruction">Tier 4: Classroom Instruction (Facilitators & Guides)</option>
                    <option value="Tier 5: Operational Support">Tier 5: Operational Support (Support Services)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={editingStaff.department || ''}
                    onChange={(e) => setEditingStaff({ ...editingStaff, department: e.target.value })}
                    placeholder="e.g. Academic & Campus Administration"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Designated School Role (Highlighted in Golden Accent) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingStaff.role || ''}
                  onChange={(e) => setEditingStaff({ ...editingStaff, role: e.target.value })}
                  placeholder="e.g. Day-to-Day Operations & Faculty Leadership"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:bg-white"
                />
              </div>

              {/* Profile Photo Upload */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Portrait Headshot Photo (Optional)
                </label>
                <div className="border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/50 hover:bg-blue-50/80 rounded-2xl p-4 transition-all text-center relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          const compressed = await compressImage(file, 1000, 1000, 0.85);
                          setEditingStaff({ ...editingStaff, image: compressed });
                        } catch (err) {
                          const reader = new FileReader();
                          reader.onload = (re) => setEditingStaff({ ...editingStaff, image: re.target?.result });
                          reader.readAsDataURL(file);
                        }
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {editingStaff.image ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={editingStaff.image}
                        alt="Preview"
                        className="w-16 h-20 rounded-xl object-cover border-2 border-white shadow-md bg-white shrink-0"
                      />
                      <div className="text-left flex-1">
                        <div className="font-bold text-xs text-[#181b66]">Photo Selected</div>
                        <p className="text-[11px] text-slate-500 font-light">Click to choose a different portrait from device</p>
                        <button
                          type="button"
                          onClick={(ev) => {
                            ev.stopPropagation();
                            setEditingStaff({ ...editingStaff, image: '' });
                          }}
                          className="mt-1 text-[11px] font-bold text-red-600 hover:text-red-700 relative z-20 cursor-pointer"
                        >
                          Remove Photo
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-3 flex flex-col items-center justify-center gap-1.5">
                      <div className="w-10 h-10 rounded-xl bg-white text-blue-700 flex items-center justify-center shadow-xs border border-blue-100">
                        <Camera className="w-5 h-5" />
                      </div>
                      <div className="font-bold text-xs text-slate-800">
                        Click to Upload Profile Photo from Device
                      </div>
                      <p className="text-[10px] text-slate-500 font-light">
                        Select a JPG or PNG portrait photo up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Presbyterian Church / Community Role
                </label>
                <input
                  type="text"
                  value={editingStaff.churchRole || ''}
                  onChange={(e) => setEditingStaff({ ...editingStaff, churchRole: e.target.value })}
                  placeholder="e.g. Session Members, Presbyterian Church of Ghana"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Profile Biography & Summary
                </label>
                <textarea
                  rows={3}
                  value={editingStaff.bio || ''}
                  onChange={(e) => setEditingStaff({ ...editingStaff, bio: e.target.value })}
                  placeholder="Summary of background, experience, and dedication to early childhood education..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white"
                />
              </div>

              {/* Key Documented Responsibilities Editor */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Key Documented Responsibilities (Read More ▾ Bullet Points)
                  </label>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                    {(staffFunctionsText || '').split('\n').filter(s => s.trim()).length} Items
                  </span>
                </div>
                <textarea
                  rows={6}
                  value={staffFunctionsText}
                  onChange={(e) => setStaffFunctionsText(e.target.value)}
                  placeholder="Enter each responsibility on a separate line, e.g.:&#10;Opens school early at 7:30 AM&#10;Supervises daily classroom operations&#10;Maintains Montessori child protection standards"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:bg-white focus:border-blue-500 leading-relaxed"
                />
                <p className="text-[10px] text-slate-500 font-light mt-1">
                  Type each specific duty on a new line. These will render with golden checkmarks when visitors expand the card on the public Leadership page.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsStaffModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="px-6 py-2.5 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-2"
                >
                  {uploadingImage && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Profile &amp; Responsibilities</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT / CREATE GALLERY ================= */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            {/* Top Switcher (when creating new photos, not editing existing item) */}
            {!editingGallery?.id && (
              <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl mb-5">
                <button
                  type="button"
                  onClick={() => setIsBatchMode(true)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isBatchMode
                      ? 'bg-white text-[#181b66] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Images className="w-3.5 h-3.5" />
                  <span>Upload Multiple Photos</span>
                  {batchPhotos.length > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#181b66] text-white text-[10px]">
                      {batchPhotos.length}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsBatchMode(false)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    !isBatchMode
                      ? 'bg-white text-[#181b66] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Single Photo</span>
                </button>
              </div>
            )}

            {isBatchMode ? (
              /* ================= BATCH MULTIPLE PHOTO UPLOAD ================= */
              <form onSubmit={handleSaveBatchPhotos} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#181b66]">
                    Upload Multiple Photos from Device
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select multiple pictures from your phone or computer to add to the school gallery at once.
                  </p>
                </div>

                {/* Device Multi-File Dropzone */}
                <div className="border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/50 hover:bg-blue-50/80 rounded-2xl p-5 transition-all text-center relative group">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleDeviceImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    title="Click or drag to select multiple photos from device"
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-white text-blue-700 flex items-center justify-center shadow-xs border border-blue-100 group-hover:scale-105 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-slate-800">
                      {uploadingImage ? 'Reading photos from device...' : 'Click to Pick Multiple Photos from Device'}
                    </div>
                    <p className="text-[11px] text-slate-500 font-light max-w-sm">
                      Select several photos at once (JPG, PNG, WEBP). On computers, hold Ctrl or Shift to pick multiple files. On phones, tap to select multiple pictures.
                    </p>
                  </div>
                </div>

                {/* Selected Photos Thumbnails Grid */}
                {batchPhotos.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">
                          Selected Photos ({batchPhotos.length})
                        </span>
                        <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Ready for upload</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="text-[11px] font-bold text-blue-700 hover:text-blue-900 cursor-pointer flex items-center gap-1">
                          <Plus className="w-3 h-3" />
                          <span>Add More</span>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleDeviceImageUpload}
                            className="hidden"
                          />
                        </label>
                        <span className="text-slate-300">|</span>
                        <button
                          type="button"
                          onClick={() => setBatchPhotos([])}
                          className="text-[11px] font-bold text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto p-2.5 bg-slate-50 rounded-2xl border border-slate-200">
                      {batchPhotos.map((photo) => (
                        <div
                          key={photo.id}
                          className="relative group rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xs flex flex-col"
                        >
                          <div className="h-20 w-full bg-slate-100 overflow-hidden relative">
                            <img
                              src={photo.data}
                              alt={photo.title}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveBatchPhoto(photo.id)}
                              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/75 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                              title="Remove photo"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="p-1.5 bg-white">
                            <p className="text-[11px] font-bold text-slate-800 truncate" title={photo.title}>
                              {photo.title}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {photo.sizeKb} KB
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Batch Settings */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Category (All Photos)
                    </label>
                    <select
                      value={batchCategory}
                      onChange={(e) => setBatchCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold"
                    >
                      <option value="Sensorial & Practical Life">Sensorial & Practical Life</option>
                      <option value="Montessori Classrooms">Montessori Classrooms</option>
                      <option value="Outdoor & Sports">Outdoor & Sports</option>
                      <option value="Special Celebrations">Special Celebrations</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Level / Age Group
                    </label>
                    <input
                      type="text"
                      value={batchLevel}
                      onChange={(e) => setBatchLevel(e.target.value)}
                      placeholder="e.g. Creche & Day Care"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Title Prefix (Optional)
                  </label>
                  <input
                    type="text"
                    value={batchPrefix}
                    onChange={(e) => setBatchPrefix(e.target.value)}
                    placeholder="e.g. Campus Activity (leave blank to use clean file names)"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                  />
                  <p className="text-[10px] text-slate-500 mt-1 font-light">
                    Leave blank to use clean file names, or enter a prefix to number them e.g. "Campus Activity 1", "Campus Activity 2".
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Shared Caption / Description (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={batchCaption}
                    onChange={(e) => setBatchCaption(e.target.value)}
                    placeholder="Brief description applied to these uploaded photos..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                  />
                </div>

                {uploadError && (
                  <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{uploadError}</span>
                  </p>
                )}

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setIsGalleryModalOpen(false);
                      setBatchPhotos([]);
                      setUploadError(null);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={batchPhotos.length === 0 || uploadingImage}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs flex items-center gap-2 ${
                      batchPhotos.length === 0 || uploadingImage
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-[#181b66] hover:bg-blue-900 text-white cursor-pointer'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>
                      {uploadingImage
                        ? 'Uploading & Saving...'
                        : `Save All (${batchPhotos.length}) Photos to Gallery`}
                    </span>
                  </button>
                </div>
              </form>
            ) : (
              /* ================= SINGLE PHOTO EDIT / CREATE ================= */
              <form onSubmit={handleSaveGallery} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#181b66]">
                    {editingGallery?.id ? 'Edit Photo Details' : 'Add Single Photo'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {editingGallery?.id
                      ? 'Update this photo title, details, or choose a new picture from your device.'
                      : 'Choose a photo from your device and enter its title and details.'}
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Photo Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingGallery?.title || ''}
                    onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                    placeholder="e.g. Montessori Pink Tower"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={editingGallery?.category || 'Sensorial & Practical Life'}
                      onChange={(e) => setEditingGallery({ ...editingGallery, category: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                    >
                      <option value="Sensorial & Practical Life">Sensorial & Practical Life</option>
                      <option value="Montessori Classrooms">Montessori Classrooms</option>
                      <option value="Outdoor & Sports">Outdoor & Sports</option>
                      <option value="Special Celebrations">Special Celebrations</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Level
                    </label>
                    <input
                      type="text"
                      value={editingGallery?.level || 'Creche & Day Care'}
                      onChange={(e) => setEditingGallery({ ...editingGallery, level: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                    />
                  </div>
                </div>

                {/* Device Photo Upload Component */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Choose Photo from Device
                  </label>

                  <div className="border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/50 hover:bg-blue-50/80 rounded-2xl p-4 transition-all text-center relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleDeviceImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      title="Click to select image file from your device"
                    />

                    {editingGallery?.image ? (
                      <div className="flex flex-col sm:flex-row items-center gap-4 text-left">
                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-sm relative">
                          <img
                            src={editingGallery.image}
                            alt="Device preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Photo Selected from Device</span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-light">
                            Click anywhere on this area to pick a different photo from your computer or phone.
                          </p>
                          <span className="inline-block px-2.5 py-1 rounded-md bg-white border border-slate-200 font-bold text-[10px] text-[#181b66]">
                            {uploadingImage ? 'Uploading & Processing...' : 'Click to Change Selected Picture'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="py-5 flex flex-col items-center justify-center gap-2">
                        <div className="w-12 h-12 rounded-2xl bg-white text-blue-700 flex items-center justify-center shadow-xs border border-blue-100 group-hover:scale-105 transition-transform">
                          <Upload className="w-6 h-6" />
                        </div>
                        <div className="font-bold text-xs text-slate-800">
                          {uploadingImage ? 'Reading photo from device...' : 'Click to Browse & Pick Photo from Device'}
                        </div>
                        <p className="text-[11px] text-slate-500 font-light">
                          Select any photo file (JPG, PNG, WEBP) up to 10MB
                        </p>
                      </div>
                    )}
                  </div>

                  {uploadError && (
                    <p className="text-[11px] text-red-600 mt-2 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{uploadError}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Caption / Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingGallery?.caption || ''}
                    onChange={(e) => setEditingGallery({ ...editingGallery, caption: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setIsGalleryModalOpen(false);
                      setEditingGallery(null);
                      setUploadError(null);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-xs shadow-xs cursor-pointer"
                  >
                    Save Photo
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL: APPLICATION DETAILS ================= */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  Reference: {selectedApp.id}
                </span>
                <h3 className="text-lg font-bold text-[#181b66]">
                  {selectedApp.childName || 'Campus Tour Visit'}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                {selectedApp.status}
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Program Requested:</span>
                  <span className="font-semibold text-slate-900">{selectedApp.level}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Submitted At:</span>
                  <span>{new Date(selectedApp.submittedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Parent / Guardian:</span>
                  <span className="font-semibold text-slate-900">{selectedApp.parentName}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Telephone:</span>
                  <a href={`tel:${selectedApp.parentPhone}`} className="text-blue-600 font-bold hover:underline">
                    {selectedApp.parentPhone}
                  </a>
                </div>
              </div>

              {selectedApp.parentEmail && (
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Email:</span>
                  <span>{selectedApp.parentEmail}</span>
                </div>
              )}

              {selectedApp.residentialAddress && (
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Home Address:</span>
                  <span>{selectedApp.residentialAddress}</span>
                </div>
              )}

              {selectedApp.specialNeeds && (
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Medical / Special Notes:</span>
                  <span className="p-2 rounded-lg bg-slate-50 block mt-1 border border-slate-100">{selectedApp.specialNeeds}</span>
                </div>
              )}

              {selectedApp.notes && (
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Inquiry Details:</span>
                  <span className="p-2 rounded-lg bg-slate-50 block mt-1 border border-slate-100">{selectedApp.notes}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
