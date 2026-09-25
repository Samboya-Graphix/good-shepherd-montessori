import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Directories
const DATA_DIR = path.join(__dirname, 'data');
const BACKUPS_DIR = path.join(DATA_DIR, 'backups');
const CONTENT_FILE = path.join(DATA_DIR, 'siteContent.json');
const APPLICATIONS_FILE = path.join(DATA_DIR, 'applications.json');
const CONFIG_FILE = path.join(DATA_DIR, 'adminConfig.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');
const AUDIT_LOG_FILE = path.join(DATA_DIR, 'auditLog.json');
const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'uploads');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(BACKUPS_DIR)) {
  fs.mkdirSync(BACKUPS_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Serve uploaded and static assets
app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Health Check Route for Hosting Platforms & Cloud Monitors
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Good Shepherd Montessori School CMI Backend',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'production'
  });
});

// Helper: Read JSON safely
function readJSON(file, fallback = {}) {
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf-8'));
    }
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
  }
  return fallback;
}

// Helper: Write JSON atomically
function writeJSON(file, data) {
  const tmpFile = `${file}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tmpFile, file);
}

// ==================== SECURITY & CRYPTOGRAPHY ====================

const HASH_ITERATIONS = 100000;
const KEY_LEN = 64;
const DIGEST = 'sha512';
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_AUDIT_ENTRIES = 200;

// PBKDF2 Password Hashing
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, HASH_ITERATIONS, KEY_LEN, DIGEST).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(inputPassword, storedHash) {
  if (!storedHash) return false;

  // Backward compatibility for initial plaintext values
  if (!storedHash.includes(':')) {
    return inputPassword === storedHash;
  }

  const [salt, originalHash] = storedHash.split(':');
  if (!salt || !originalHash) return false;

  const testHash = crypto.pbkdf2Sync(inputPassword, salt, HASH_ITERATIONS, KEY_LEN, DIGEST).toString('hex');
  const origBuffer = Buffer.from(originalHash, 'hex');
  const testBuffer = Buffer.from(testHash, 'hex');

  if (origBuffer.length !== testBuffer.length) return false;
  return crypto.timingSafeEqual(origBuffer, testBuffer);
}

// Audit Logging
function recordAudit(action, actor, details = {}) {
  try {
    const logs = readJSON(AUDIT_LOG_FILE, []);
    const entry = {
      id: `audit-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
      timestamp: new Date().toISOString(),
      action,
      actor: actor || 'System',
      details
    };
    logs.unshift(entry);
    if (logs.length > MAX_AUDIT_ENTRIES) {
      logs.length = MAX_AUDIT_ENTRIES;
    }
    writeJSON(AUDIT_LOG_FILE, logs);
  } catch (err) {
    console.warn('Failed to record audit log:', err);
  }
}

// Rate Limiting Store (In-Memory)
const failedLoginAttempts = new Map();
const MAX_FAILED_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_DURATION_MS = 60 * 1000; // 60 seconds lockout

function checkRateLimit(ip) {
  const now = Date.now();
  const record = failedLoginAttempts.get(ip);
  if (!record) return { allowed: true };

  if (record.lockedUntil && now < record.lockedUntil) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remainingSeconds };
  }

  if (now - record.firstAttempt > RATE_LIMIT_WINDOW_MS) {
    failedLoginAttempts.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
}

function recordFailedLogin(ip) {
  const now = Date.now();
  const record = failedLoginAttempts.get(ip) || { count: 0, firstAttempt: now, lockedUntil: 0 };

  if (now - record.firstAttempt > RATE_LIMIT_WINDOW_MS) {
    record.count = 1;
    record.firstAttempt = now;
    record.lockedUntil = 0;
  } else {
    record.count += 1;
  }

  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
    failedLoginAttempts.set(ip, record);
    return { locked: true, remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000) };
  }

  failedLoginAttempts.set(ip, record);
  return { locked: false, attemptsRemaining: MAX_FAILED_ATTEMPTS - record.count };
}

function clearFailedLogin(ip) {
  failedLoginAttempts.delete(ip);
}

// Session Store with Automatic Pruning
function getActiveSessions() {
  const now = Date.now();
  const raw = readJSON(SESSIONS_FILE, {});
  const active = {};
  let changed = false;

  if (typeof raw === 'object' && raw !== null && !Array.isArray(raw)) {
    for (const [token, data] of Object.entries(raw)) {
      if (data && data.expiresAt && data.expiresAt > now) {
        active[token] = data;
      } else {
        changed = true;
      }
    }
  }

  if (changed || Array.isArray(raw)) {
    writeJSON(SESSIONS_FILE, active);
  }
  return active;
}

function createSession(username, req) {
  const now = Date.now();
  const token = `gs_sec_${crypto.randomBytes(32).toString('hex')}`;
  const sessions = getActiveSessions();

  sessions[token] = {
    username,
    createdAt: now,
    expiresAt: now + SESSION_DURATION_MS,
    ip: req.ip || req.connection?.remoteAddress || '127.0.0.1',
    userAgent: req.headers['user-agent'] || 'Unknown Browser'
  };

  writeJSON(SESSIONS_FILE, sessions);
  return { token, expiresAt: sessions[token].expiresAt };
}

function validateSession(token) {
  if (!token) return null;
  const sessions = getActiveSessions();
  const session = sessions[token];
  if (!session) return null;
  if (session.expiresAt <= Date.now()) {
    delete sessions[token];
    writeJSON(SESSIONS_FILE, sessions);
    return null;
  }
  return session;
}

function revokeSession(token) {
  if (!token) return;
  const sessions = getActiveSessions();
  if (sessions[token]) {
    delete sessions[token];
    writeJSON(SESSIONS_FILE, sessions);
  }
}

// Middleware: Authenticate Admin Session
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: Missing authorization header.' });
  }
  const token = authHeader.replace('Bearer ', '').trim();
  const session = validateSession(token);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired session token.' });
  }

  req.user = session;
  next();
}

// Initialize Admin Credentials
const DEFAULT_CONFIG = {
  adminEmail: 'admin@goodshepherd.edu.gh',
  adminUsername: 'admin',
  passwordHash: hashPassword('goodshepherd2026'),
  schoolName: 'Good Shepherd Montessori School',
  lastUpdated: new Date().toISOString()
};

if (!fs.existsSync(CONFIG_FILE)) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(DEFAULT_CONFIG, null, 2), 'utf-8');
} else {
  // Check if existing config needs hash upgrade
  const currentConfig = readJSON(CONFIG_FILE, {});
  if (currentConfig.passwordHash && !currentConfig.passwordHash.includes(':')) {
    currentConfig.passwordHash = hashPassword(currentConfig.passwordHash);
    currentConfig.lastUpdated = new Date().toISOString();
    writeJSON(CONFIG_FILE, currentConfig);
  }
}

// Initial Sample Inquiries / Applications
const INITIAL_APPLICATIONS = [
  {
    id: "app-1001",
    type: "application",
    submittedAt: "2026-09-20T09:30:00.000Z",
    childName: "Emmanuel Kofi Mensah",
    childDob: "2024-04-12",
    childAge: "2 Years, 5 Months",
    gender: "Male",
    level: "Day Care & Nursery Community",
    parentName: "Mr. Kwabena Mensah",
    parentPhone: "+233 24 123 4567",
    parentEmail: "kwabena.mensah@gmail.com",
    residentialAddress: "Bechem High Street, near Post Office",
    specialNeeds: "None. Vaccinations up to date.",
    status: "Contacted",
    notes: "Parent inquired about morning drop-off protocols."
  },
  {
    id: "tour-1002",
    type: "tour",
    submittedAt: "2026-09-22T14:15:00.000Z",
    parentName: "Mrs. Evelyn Boateng",
    parentPhone: "+233 54 987 6543",
    parentEmail: "evelyn.boateng@yahoo.com",
    childName: "Serwaa Boateng",
    childAge: "9 Months",
    level: "Creche Community",
    preferredDate: "2026-09-28",
    status: "Pending",
    notes: "Wants to inspect infant sensory room and feeding area."
  }
];

if (!fs.existsSync(APPLICATIONS_FILE)) {
  fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(INITIAL_APPLICATIONS, null, 2), 'utf-8');
}

// Seed siteContent.json from static schoolData if missing
async function initializeContent() {
  if (!fs.existsSync(CONTENT_FILE)) {
    console.log('Seeding initial site content from schoolData.js...');
    try {
      const schoolDataModule = await import('../src/data/schoolData.js');
      const initialContent = {
        schoolInfo: schoolDataModule.schoolInfo || {},
        whyChooseUs: schoolDataModule.whyChooseUs || [],
        programs: schoolDataModule.programs || [],
        expansionNotice: schoolDataModule.expansionNotice || {},
        administrationBoard: schoolDataModule.administrationBoard || [],
        schoolNotices: schoolDataModule.schoolNotices || [],
        academicCalendar: schoolDataModule.academicCalendar || {},
        galleryItems: schoolDataModule.galleryItems || [],
        testimonials: schoolDataModule.testimonials || [],
        faqs: schoolDataModule.faqs || [],
        parentHubData: schoolDataModule.parentHubData || {},
        dayInLifeMoments: schoolDataModule.dayInLifeMoments || [],
        lastUpdated: new Date().toISOString()
      };
      writeJSON(CONTENT_FILE, initialContent);
      console.log('Site content initialized successfully.');
    } catch (err) {
      console.error('Failed to import schoolData.js for seeding:', err);
    }
  }
}

await initializeContent();

// ==================== HEALTH & DIAGNOSTIC ROUTES ====================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Good Shepherd Montessori School CMI Backend',
    timestamp: new Date().toISOString()
  });
});

// ==================== AUTHENTICATION ROUTES ====================

// Admin Login with Rate Limiting & PBKDF2 Verification
app.post('/api/auth/login', (req, res) => {
  const ip = req.ip || req.connection?.remoteAddress || '127.0.0.1';
  const rateLimitStatus = checkRateLimit(ip);

  if (!rateLimitStatus.allowed) {
    recordAudit('LOGIN_BLOCKED_RATE_LIMIT', req.body?.username || 'Unknown', {
      ip,
      remainingSeconds: rateLimitStatus.remainingSeconds
    });
    return res.status(429).json({
      error: `Too many failed attempts. Security cooldown active for ${rateLimitStatus.remainingSeconds} seconds.`,
      locked: true,
      remainingSeconds: rateLimitStatus.remainingSeconds
    });
  }

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const config = readJSON(CONFIG_FILE, DEFAULT_CONFIG);
  const usernameMatch = (username === config.adminUsername || username === config.adminEmail);

  let isMatch = false;
  if (usernameMatch) {
    isMatch = verifyPassword(password, config.passwordHash);
  }

  if (isMatch) {
    // If password was stored in plain text, transparently upgrade to salted PBKDF2
    if (!config.passwordHash.includes(':')) {
      config.passwordHash = hashPassword(password);
      config.lastUpdated = new Date().toISOString();
      writeJSON(CONFIG_FILE, config);
    }

    clearFailedLogin(ip);
    const { token, expiresAt } = createSession(config.adminUsername, req);
    recordAudit('LOGIN_SUCCESS', config.adminUsername, { ip });

    return res.json({
      success: true,
      token,
      expiresAt,
      user: {
        username: config.adminUsername,
        email: config.adminEmail,
        schoolName: config.schoolName
      }
    });
  }

  const rateResult = recordFailedLogin(ip);
  recordAudit('LOGIN_FAILED', username, { ip, attemptsRemaining: rateResult.attemptsRemaining });

  if (rateResult.locked) {
    return res.status(429).json({
      error: `Too many failed login attempts. Temporary security lockout active for ${rateResult.remainingSeconds} seconds.`,
      locked: true,
      remainingSeconds: rateResult.remainingSeconds
    });
  }

  return res.status(401).json({
    error: `Invalid credentials. ${rateResult.attemptsRemaining} attempt(s) remaining before security cooldown.`
  });
});

// Verify Current Session Token
app.get('/api/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ valid: false, error: 'Missing authorization header.' });
  }
  const token = authHeader.replace('Bearer ', '').trim();
  const session = validateSession(token);

  if (!session) {
    return res.status(401).json({ valid: false, error: 'Session is invalid or has expired.' });
  }

  const config = readJSON(CONFIG_FILE, DEFAULT_CONFIG);
  return res.json({
    valid: true,
    expiresAt: session.expiresAt,
    user: {
      username: config.adminUsername,
      email: config.adminEmail,
      schoolName: config.schoolName
    }
  });
});

// Logout and Revoke Session
app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '').trim();
    const session = validateSession(token);
    revokeSession(token);
    recordAudit('LOGOUT', session?.username || 'Admin', { ip: req.ip || '127.0.0.1' });
  }
  res.json({ success: true, message: 'Logged out and session revoked successfully.' });
});

// Update Admin Password & Profile
app.post('/api/auth/settings', requireAuth, (req, res) => {
  const { currentPassword, newPassword, newEmail, newUsername } = req.body;
  const config = readJSON(CONFIG_FILE, DEFAULT_CONFIG);

  if (!verifyPassword(currentPassword, config.passwordHash)) {
    recordAudit('PASSWORD_CHANGE_FAILED', req.user?.username || config.adminUsername, {
      reason: 'Incorrect current password'
    });
    return res.status(400).json({ error: 'Current password verification failed.' });
  }

  if (newPassword) {
    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must contain at least 8 characters.' });
    }
    config.passwordHash = hashPassword(newPassword);
  }
  if (newEmail) config.adminEmail = newEmail;
  if (newUsername) config.adminUsername = newUsername;
  config.lastUpdated = new Date().toISOString();

  writeJSON(CONFIG_FILE, config);
  recordAudit('SECURITY_SETTINGS_UPDATED', req.user?.username || config.adminUsername, {
    passwordUpdated: !!newPassword,
    emailUpdated: !!newEmail,
    usernameUpdated: !!newUsername
  });

  return res.json({ success: true, message: 'Admin security settings updated successfully.' });
});

// Get Audit Log
app.get('/api/audit-log', requireAuth, (req, res) => {
  const logs = readJSON(AUDIT_LOG_FILE, []);
  res.json(logs);
});

// ==================== CONTENT ROUTES ====================

// GET: Site Content for Public and CMI
app.get('/api/content', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const content = readJSON(CONTENT_FILE, {});
  res.json(content);
});

// PUT: Save and Publish Content (Requires Auth)
app.put('/api/content', requireAuth, (req, res) => {
  const newContent = req.body;
  if (!newContent || typeof newContent !== 'object') {
    return res.status(400).json({ error: 'Invalid content payload provided.' });
  }

  // Ensure gallery synchronization across properties
  if (newContent.galleryItems && Array.isArray(newContent.galleryItems)) {
    newContent.galleryPhotos = newContent.galleryItems;
  } else if (newContent.galleryPhotos && Array.isArray(newContent.galleryPhotos)) {
    newContent.galleryItems = newContent.galleryPhotos;
  }

  // Auto-backup before saving
  try {
    const current = readJSON(CONTENT_FILE, {});
    const backupFileName = `siteContent-backup-${Date.now()}.json`;
    writeJSON(path.join(BACKUPS_DIR, backupFileName), current);
  } catch (backupErr) {
    console.warn('Backup creation notice:', backupErr);
  }

  newContent.lastUpdated = new Date().toISOString();
  writeJSON(CONTENT_FILE, newContent);
  recordAudit('CONTENT_SAVED_AND_PUBLISHED', req.user?.username || 'Admin', {
    lastUpdated: newContent.lastUpdated
  });

  res.json({
    success: true,
    message: 'Site content updated and published successfully.',
    lastUpdated: newContent.lastUpdated
  });
});

// POST: Upload Single Image (Requires Auth)
app.post('/api/upload', requireAuth, (req, res) => {
  const { filename, data } = req.body;
  if (!filename || !data) {
    return res.status(400).json({ error: 'Image filename and base64 data are required.' });
  }

  try {
    const base64Data = data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const ext = path.extname(filename) || '.jpg';
    const safeName = `photo-${Date.now()}${ext.toLowerCase()}`;
    const filePath = path.join(UPLOADS_DIR, safeName);

    fs.writeFileSync(filePath, buffer);
    recordAudit('IMAGE_UPLOADED', req.user?.username || 'Admin', { filename: safeName });

    const publicUrl = `/uploads/${safeName}`;
    res.json({
      success: true,
      url: publicUrl,
      filename: safeName
    });
  } catch (err) {
    console.error('File upload error:', err);
    res.status(500).json({ error: 'Failed to save uploaded image on server.' });
  }
});

// POST: Batch Upload Multiple Images (Requires Auth)
app.post('/api/upload/batch', requireAuth, (req, res) => {
  const { files } = req.body;
  if (!files || !Array.isArray(files) || files.length === 0) {
    return res.status(400).json({ error: 'Array of files is required for batch upload.' });
  }

  const uploaded = [];
  try {
    for (let i = 0; i < files.length; i++) {
      const item = files[i];
      if (!item.data) continue;

      const base64Data = item.data.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const ext = path.extname(item.filename || '') || '.jpg';
      const safeName = `photo-${Date.now()}-${i + 1}${ext.toLowerCase()}`;
      const filePath = path.join(UPLOADS_DIR, safeName);

      fs.writeFileSync(filePath, buffer);
      uploaded.push({
        originalName: item.filename,
        url: `/uploads/${safeName}`,
        filename: safeName
      });
    }

    recordAudit('BATCH_IMAGES_UPLOADED', req.user?.username || 'Admin', { count: uploaded.length });
    res.json({
      success: true,
      count: uploaded.length,
      uploaded
    });
  } catch (err) {
    console.error('Batch upload error:', err);
    res.status(500).json({ error: 'Failed to process batch photo upload on server.' });
  }
});

// ==================== ADMISSIONS & TOURS ROUTES ====================

// GET: List Applications (Requires Auth)
app.get('/api/applications', requireAuth, (req, res) => {
  const applications = readJSON(APPLICATIONS_FILE, []);
  res.json(applications);
});

// POST: Submit Application or Tour Request (Public)
app.post('/api/applications', (req, res) => {
  const entry = req.body;
  if (!entry || !entry.parentName || !entry.parentPhone) {
    return res.status(400).json({ error: 'Parent name and phone number are required.' });
  }

  const applications = readJSON(APPLICATIONS_FILE, []);
  const newEntry = {
    id: `${entry.type || 'app'}-${Date.now().toString().slice(-6)}`,
    submittedAt: new Date().toISOString(),
    status: 'Pending',
    ...entry
  };

  applications.unshift(newEntry);
  writeJSON(APPLICATIONS_FILE, applications);
  recordAudit('APPLICATION_SUBMITTED', 'Public Visitor', {
    referenceId: newEntry.id,
    type: newEntry.type,
    level: newEntry.level
  });

  res.status(201).json({
    success: true,
    message: 'Application recorded successfully.',
    referenceNumber: newEntry.id
  });
});

// PATCH: Update Application (Requires Auth)
app.patch('/api/applications/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const applications = readJSON(APPLICATIONS_FILE, []);

  const index = applications.findIndex(app => app.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Application record not found.' });
  }

  if (status) applications[index].status = status;
  if (notes !== undefined) applications[index].notes = notes;
  applications[index].updatedAt = new Date().toISOString();

  writeJSON(APPLICATIONS_FILE, applications);
  recordAudit('APPLICATION_UPDATED', req.user?.username || 'Admin', { id, status });

  res.json({ success: true, application: applications[index] });
});

// DELETE: Remove Application (Requires Auth)
app.delete('/api/applications/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  let applications = readJSON(APPLICATIONS_FILE, []);
  const initialLength = applications.length;

  applications = applications.filter(app => app.id !== id);
  if (applications.length === initialLength) {
    return res.status(404).json({ error: 'Application record not found.' });
  }

  writeJSON(APPLICATIONS_FILE, applications);
  recordAudit('APPLICATION_DELETED', req.user?.username || 'Admin', { id });

  res.json({ success: true, message: 'Application record deleted successfully.' });
});

// ==================== BACKUP & RESTORE ROUTES ====================

// GET: List Backups (Requires Auth)
app.get('/api/backups', requireAuth, (req, res) => {
  try {
    const files = fs.readdirSync(BACKUPS_DIR)
      .filter(f => f.endsWith('.json'))
      .map(file => {
        const stats = fs.statSync(path.join(BACKUPS_DIR, file));
        return {
          filename: file,
          createdAt: stats.birthtime,
          sizeKb: (stats.size / 1024).toFixed(1)
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve backups list.' });
  }
});

// POST: Create Manual Backup (Requires Auth)
app.post('/api/backups', requireAuth, (req, res) => {
  try {
    const current = readJSON(CONTENT_FILE, {});
    const filename = `manual-backup-${Date.now()}.json`;
    writeJSON(path.join(BACKUPS_DIR, filename), current);
    recordAudit('BACKUP_CREATED', req.user?.username || 'Admin', { filename });
    res.json({ success: true, message: 'Manual snapshot backup created.', filename });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create manual backup snapshot.' });
  }
});

// POST: Restore from Backup (Requires Auth)
app.post('/api/backups/restore', requireAuth, (req, res) => {
  const { filename } = req.body;
  if (!filename) {
    return res.status(400).json({ error: 'Backup filename is required.' });
  }

  const backupPath = path.join(BACKUPS_DIR, path.basename(filename));
  if (!fs.existsSync(backupPath)) {
    return res.status(404).json({ error: 'Specified backup file does not exist.' });
  }

  try {
    const backupContent = readJSON(backupPath, null);
    if (!backupContent) {
      return res.status(400).json({ error: 'Corrupt or empty backup file.' });
    }
    writeJSON(CONTENT_FILE, backupContent);
    recordAudit('BACKUP_RESTORED', req.user?.username || 'Admin', { filename });
    res.json({ success: true, message: `System restored from ${filename} successfully.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to restore backup snapshot.' });
  }
});

// Serve built frontend assets in production
const DIST_DIR = path.join(__dirname, '..', 'dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      return res.sendFile(path.join(DIST_DIR, 'index.html'));
    }
    next();
  });
}

// Start Express Server
app.listen(PORT, () => {
  console.log(`Good Shepherd CMI Backend Server running on port ${PORT}`);
  console.log(`API Base: http://localhost:${PORT}/api`);
});
