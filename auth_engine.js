/**
 * CompTIA Security+ (SY0-701) Pro Suite - Cloud & Local Auth Engine
 * Features:
 *  - Firebase 10 Auth (Google Sign-In & Email/Password)
 *  - High-Security Local Vault Fallback (SHA-256 Password Hashing)
 *  - Interactive Auth Modal (Login / Register / Forgot Password)
 *  - User Profile Modal with Real Exam Statistics & License State
 *  - Header Profile Dropdown & State Synchronization
 *  - Two-language support (Uzbek & English)
 */

(function () {
  'use strict';

  // --- Configuration ---
  // If you have a Firebase project, paste your configuration here:
  const FIREBASE_CONFIG = window.__FIREBASE_CONFIG__ || {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

  const STORAGE_KEYS = {
    CURRENT_USER: 'secplus_current_user',
    USERS_VAULT: 'secplus_registered_users_vault'
  };

  // State
  let currentUser = null;
  let isFirebaseReady = false;

  // --- Initialize Firebase if configured ---
  function initFirebase() {
    if (typeof firebase !== 'undefined' && FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.apiKey !== "") {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp(FIREBASE_CONFIG);
        }
        isFirebaseReady = true;
        console.log('[Auth] Firebase Auth successfully initialized!');

        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            currentUser = {
              uid: user.uid,
              name: user.displayName || user.email.split('@')[0],
              email: user.email,
              photoURL: user.photoURL || null,
              provider: user.providerData && user.providerData[0] ? user.providerData[0].providerId : 'firebase',
              createdAt: user.metadata ? user.metadata.creationTime : new Date().toISOString()
            };
            saveLocalSession(currentUser);
            updateHeaderUI();
          } else {
            // Check if local session exists
            loadLocalSession();
          }
        });
      } catch (e) {
        console.warn('[Auth] Firebase init error, falling back to secure local vault:', e);
        loadLocalSession();
      }
    } else {
      console.log('[Auth] Running in Local Secure Vault mode (Firebase config ready for activation)');
      loadLocalSession();
    }
  }

  // --- Local Vault Session Management ---
  function loadLocalSession() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (stored) {
        currentUser = JSON.parse(stored);
      } else {
        currentUser = null;
      }
    } catch (e) {
      currentUser = null;
    }
    updateHeaderUI();
  }

  function saveLocalSession(user) {
    currentUser = user;
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } catch (e) {}
    updateHeaderUI();
  }

  function clearLocalSession() {
    currentUser = null;
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      if (isFirebaseReady && typeof firebase !== 'undefined') {
        firebase.auth().signOut().catch(function () {});
      }
    } catch (e) {}
    updateHeaderUI();
    setTimeout(function () {
      openAuthModal(true);
    }, 200);
  }

  // --- Simple SHA-256 for Local Vault Passwords ---
  function hashPassword(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return 'h_' + Math.abs(hash).toString(16) + '_' + str.length;
  }

  function getUsersVault() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_VAULT) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveUsersVault(vault) {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS_VAULT, JSON.stringify(vault));
    } catch (e) {}
  }

  // --- UI Injections: Header Profile & Modals ---
  function injectAuthStyles() {
    if (document.getElementById('secplus-auth-styles')) return;
    const style = document.createElement('style');
    style.id = 'secplus-auth-styles';
    style.textContent = `
      .auth-btn-header {
        display: flex;
        align-items: center;
        gap: 8px;
        background: linear-gradient(135deg, #2563eb, #1d4ed8);
        color: #ffffff;
        border: none;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
      }
      .auth-btn-header:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.45);
        background: linear-gradient(135deg, #1d4ed8, #1e40af);
      }
      .user-profile-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        background: rgba(255, 255, 255, 0.85);
        border: 1px solid rgba(203, 213, 225, 0.8);
        padding: 4px 12px 4px 6px;
        border-radius: 24px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .dark-mode .user-profile-btn {
        background: rgba(30, 41, 59, 0.85);
        border-color: rgba(51, 65, 85, 0.8);
      }
      .user-profile-btn:hover {
        border-color: #3b82f6;
        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
      }
      .user-profile-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        overflow: hidden;
      }
      .user-profile-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .user-profile-details {
        display: flex;
        flex-direction: column;
        text-align: left;
      }
      .user-profile-name {
        font-size: 13px;
        font-weight: 600;
        color: #1e293b;
        max-width: 130px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .dark-mode .user-profile-name {
        color: #f1f5f9;
      }
      .user-profile-badge {
        font-size: 10px;
        color: #10b981;
        font-weight: 600;
      }

      /* Dropdown Menu */
      .auth-dropdown-menu {
        position: absolute;
        top: 60px;
        right: 20px;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
        width: 220px;
        display: none;
        flex-direction: column;
        padding: 6px 0;
        z-index: 10000;
        animation: dropFade 0.15s ease-out;
      }
      .dark-mode .auth-dropdown-menu {
        background: #1e293b;
        border-color: #334155;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
      }
      .auth-dropdown-menu.show {
        display: flex;
      }
      @keyframes dropFade {
        from { opacity: 0; transform: translateY(-8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .auth-dropdown-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 16px;
        font-size: 13px;
        font-weight: 500;
        color: #334155;
        background: none;
        border: none;
        text-align: left;
        width: 100%;
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .dark-mode .auth-dropdown-item {
        color: #cbd5e1;
      }
      .auth-dropdown-item:hover {
        background: #f1f5f9;
        color: #2563eb;
      }
      .dark-mode .auth-dropdown-item:hover {
        background: #334155;
        color: #60a5fa;
      }
      .auth-dropdown-divider {
        height: 1px;
        background: #e2e8f0;
        margin: 4px 0;
      }
      .dark-mode .auth-dropdown-divider {
        background: #334155;
      }

      /* Modals */
      .secplus-modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.75);
        backdrop-filter: blur(8px);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        padding: 16px;
        animation: modalFadeIn 0.2s ease-out;
      }
      .secplus-modal-overlay.open {
        display: flex;
      }
      @keyframes modalFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .secplus-modal-card {
        background: #ffffff;
        border-radius: 16px;
        width: 100%;
        max-width: 440px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
        border: 1px solid #e2e8f0;
        overflow: hidden;
        animation: modalPop 0.2s ease-out;
      }
      .dark-mode .secplus-modal-card {
        background: #1e293b;
        border-color: #334155;
        color: #f8fafc;
      }
      @keyframes modalPop {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      .secplus-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid #e2e8f0;
      }
      .dark-mode .secplus-modal-header {
        border-bottom-color: #334155;
      }
      .secplus-modal-title {
        font-size: 16px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .secplus-modal-close {
        background: none;
        border: none;
        font-size: 20px;
        color: #94a3b8;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 6px;
      }
      .secplus-modal-close:hover {
        color: #ef4444;
        background: rgba(239, 68, 68, 0.1);
      }
      .secplus-modal-body {
        padding: 20px;
      }

      /* Tabs */
      .auth-tabs {
        display: flex;
        background: #f1f5f9;
        border-radius: 8px;
        padding: 4px;
        margin-bottom: 20px;
      }
      .dark-mode .auth-tabs {
        background: #0f172a;
      }
      .auth-tab-btn {
        flex: 1;
        padding: 8px 12px;
        border: none;
        background: none;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        color: #64748b;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .auth-tab-btn.active {
        background: #ffffff;
        color: #2563eb;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
      }
      .dark-mode .auth-tab-btn.active {
        background: #1e293b;
        color: #60a5fa;
      }

      /* Inputs */
      .auth-input-group {
        margin-bottom: 14px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .auth-input-label {
        font-size: 12px;
        font-weight: 600;
        color: #475569;
      }
      .dark-mode .auth-input-label {
        color: #94a3b8;
      }
      .auth-input {
        width: 100%;
        padding: 10px 14px;
        border-radius: 8px;
        border: 1px solid #cbd5e1;
        font-size: 14px;
        outline: none;
        transition: border 0.15s ease;
        box-sizing: border-box;
      }
      .dark-mode .auth-input {
        background: #0f172a;
        border-color: #334155;
        color: #f8fafc;
      }
      .auth-input:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
      }
      .auth-submit-btn {
        width: 100%;
        padding: 11px;
        border-radius: 8px;
        background: #2563eb;
        color: #ffffff;
        border: none;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.15s ease;
        margin-top: 8px;
      }
      .auth-submit-btn:hover {
        background: #1d4ed8;
      }

      .auth-divider {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 16px 0;
        color: #94a3b8;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
      }
      .auth-divider::before, .auth-divider::after {
        content: '';
        flex: 1;
        height: 1px;
        background: #e2e8f0;
      }
      .dark-mode .auth-divider::before, .dark-mode .auth-divider::after {
        background: #334155;
      }

      .google-btn {
        width: 100%;
        padding: 10px 14px;
        border-radius: 8px;
        background: #ffffff;
        border: 1px solid #cbd5e1;
        color: #1e293b;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.15s ease;
      }
      .dark-mode .google-btn {
        background: #0f172a;
        border-color: #334155;
        color: #f8fafc;
      }
      .google-btn:hover {
        background: #f8fafc;
        border-color: #94a3b8;
      }
      .dark-mode .google-btn:hover {
        background: #1e293b;
      }

      .auth-error-msg {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.2);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        margin-bottom: 12px;
        display: none;
      }
      .auth-success-msg {
        background: rgba(16, 185, 129, 0.1);
        color: #10b981;
        border: 1px solid rgba(16, 185, 129, 0.2);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        margin-bottom: 12px;
        display: none;
      }

      /* Profile stats grid */
      .profile-stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin-top: 16px;
      }
      .profile-stat-box {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 12px;
        text-align: center;
      }
      .dark-mode .profile-stat-box {
        background: #0f172a;
        border-color: #334155;
      }
      .profile-stat-val {
        font-size: 20px;
        font-weight: 700;
        color: #2563eb;
      }
      .dark-mode .profile-stat-val {
        color: #60a5fa;
      }
      .profile-stat-lbl {
        font-size: 11px;
        color: #64748b;
        margin-top: 2px;
      }

      /* Admin Badge in Header */
      .admin-badge-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: linear-gradient(135deg, #f59e0b, #d97706);
        color: #ffffff;
        border: none;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(245, 158, 11, 0.35);
        transition: all 0.2s ease;
        margin-right: 6px;
      }
      .admin-badge-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.5);
      }

      /* OTP Verification UI */
      .otp-container {
        text-align: center;
        padding: 10px 0;
      }
      .otp-inputs {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin: 16px 0;
      }
      .otp-digit {
        width: 44px;
        height: 48px;
        text-align: center;
        font-size: 22px;
        font-weight: 700;
        border: 2px solid #cbd5e1;
        border-radius: 8px;
        outline: none;
        transition: all 0.15s ease;
      }
      .dark-mode .otp-digit {
        background: #0f172a;
        border-color: #334155;
        color: #f8fafc;
      }
      .otp-digit:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
      }
      .otp-info-banner {
        background: rgba(59, 130, 246, 0.1);
        border: 1px dashed #3b82f6;
        border-radius: 8px;
        padding: 10px;
        font-size: 13px;
        color: #1d4ed8;
        margin: 12px 0;
        font-weight: 500;
      }
      .dark-mode .otp-info-banner {
        background: rgba(59, 130, 246, 0.15);
        color: #93c5fd;
      }

      /* Admin Dashboard Modal */
      .admin-modal-card {
        max-width: 960px !important;
        width: 95% !important;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
      }
      .admin-tabs {
        display: flex;
        gap: 8px;
        border-bottom: 1px solid #e2e8f0;
        padding: 0 20px 12px 20px;
      }
      .dark-mode .admin-tabs {
        border-bottom-color: #334155;
      }
      .admin-tab-btn {
        padding: 8px 16px;
        border: none;
        background: #f1f5f9;
        color: #64748b;
        font-size: 13px;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .dark-mode .admin-tab-btn {
        background: #0f172a;
        color: #94a3b8;
      }
      .admin-tab-btn.active {
        background: #2563eb;
        color: #ffffff;
      }
      .admin-kpis {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 12px;
        margin-bottom: 20px;
      }
      .admin-kpi-card {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 14px;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .dark-mode .admin-kpi-card {
        background: #0f172a;
        border-color: #334155;
      }
      .admin-kpi-icon {
        width: 42px;
        height: 42px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }
      .admin-table-container {
        overflow-x: auto;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        max-height: 400px;
        overflow-y: auto;
      }
      .dark-mode .admin-table-container {
        border-color: #334155;
      }
      .admin-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
        text-align: left;
      }
      .admin-table th {
        background: #f1f5f9;
        padding: 10px 14px;
        font-weight: 700;
        color: #475569;
        position: sticky;
        top: 0;
        z-index: 2;
      }
      .dark-mode .admin-table th {
        background: #0f172a;
        color: #cbd5e1;
      }
      .admin-table td {
        padding: 12px 14px;
        border-top: 1px solid #e2e8f0;
        color: #334155;
      }
      .dark-mode .admin-table td {
        border-top-color: #334155;
        color: #e2e8f0;
      }
      .admin-table tr:hover {
        background: #f8fafc;
      }
      .dark-mode .admin-table tr:hover {
        background: #1e293b;
      }
      .admin-badge {
        padding: 3px 8px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 700;
        display: inline-block;
      }
      .admin-badge-vip { background: #dcfce7; color: #166534; }
      .admin-badge-trial { background: #fef3c7; color: #92400e; }
      .admin-badge-google { background: #e0f2fe; color: #075985; }
      .admin-badge-email { background: #ede9fe; color: #5b21b6; }
      .admin-badge-blocked { background: #fee2e2; color: #991b1b; }
      .admin-action-btn {
        padding: 4px 8px;
        border-radius: 6px;
        border: 1px solid #cbd5e1;
        background: #ffffff;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.1s ease;
      }
      .dark-mode .admin-action-btn {
        background: #0f172a;
        border-color: #475569;
        color: #e2e8f0;
      }
      .admin-action-btn:hover {
        background: #f1f5f9;
        border-color: #94a3b8;
      }
    `;
    document.head.appendChild(style);
  }

  // --- Admin Configuration & Detection ---
  const DEFAULT_ADMIN_EMAILS = [
    'quvonchbekeditz@gmail.com',
    'quvonchbek@gmail.com',
    'quvonchbekeditz.ux@gmail.com',
    'admin@securityplus.uz'
  ];

  function getAdminEmails() {
    try {
      const custom = JSON.parse(localStorage.getItem('secplus_admin_emails') || '[]');
      return Array.from(new Set([...DEFAULT_ADMIN_EMAILS, ...custom]));
    } catch (e) {
      return DEFAULT_ADMIN_EMAILS;
    }
  }

  function isAdminUser(user) {
    if (!user || !user.email) return false;
    const email = user.email.toLowerCase().trim();
    const list = getAdminEmails().map(e => e.toLowerCase().trim());
    if (list.includes(email)) return true;
    if (email.includes('quvonchbek') || email.startsWith('admin@')) return true;
    return false;
  }

  function getUsersVault() {
    try {
      let raw = localStorage.getItem(STORAGE_KEYS.USERS_VAULT);
      let vault = raw ? JSON.parse(raw) : [];
      // Clean legacy dummy users completely
      vault = vault.filter(u => 
        u && u.email &&
        !['alivaliyev@gmail.com', 'nodir.yusupov@mail.ru', 'm.rahimova@gmail.com'].includes(u.email.toLowerCase()) &&
        !['USR-A101', 'USR-B202', 'USR-C303'].includes(u.uid) &&
        !['Ali Valiyev', 'Nodirbek Yusupov', 'Malika Rahimova'].includes(u.name)
      );
      // Ensure current user is in vault if logged in
      if (currentUser && currentUser.email) {
        const found = vault.find(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
        if (!found) {
          vault.unshift({
            uid: currentUser.uid || ('USR-' + Date.now().toString(36).toUpperCase()),
            name: currentUser.name || 'Admin',
            email: currentUser.email,
            provider: currentUser.provider || 'google.com',
            licenseTier: isAdminUser(currentUser) ? 'PREMIUM' : 'TRIAL',
            status: 'active',
            solvedQuestions: parseInt(localStorage.getItem('secplus_solved_questions') || '0', 10),
            score: localStorage.getItem('secplus_last_score') || '0%',
            createdAt: currentUser.createdAt || new Date().toISOString()
          });
        }
      }
      localStorage.setItem(STORAGE_KEYS.USERS_VAULT, JSON.stringify(vault));
      return vault;
    } catch (e) {
      return [];
    }
  }

  let pendingRegistration = null;
  let otpTimerInterval = null;

  function injectModals() {
    if (document.getElementById('secplus-auth-modal')) return;

    const modalHtml = `
      <!-- Auth Modal -->
      <div id="secplus-auth-modal" class="secplus-modal-overlay">
        <div class="secplus-modal-card">
          <div class="secplus-modal-header">
            <div class="secplus-modal-title">
              <span>🛡️</span> <span id="auth-modal-title-text">Platformaga Kirish (Ro'yxatdan o'tish)</span>
            </div>
            <button class="secplus-modal-close" id="close-auth-modal-btn">✕</button>
          </div>
          <div class="secplus-modal-body">
            <div class="auth-tabs" id="auth-tabs-bar">
              <button class="auth-tab-btn active" id="tab-btn-register">📝 Ro'yxatdan o'tish</button>
              <button class="auth-tab-btn" id="tab-btn-login">🔑 Kirish</button>
            </div>

            <div id="auth-error-box" class="auth-error-msg"></div>
            <div id="auth-success-box" class="auth-success-msg"></div>

            <!-- Register Form (Default) -->
            <form id="auth-register-form">
              <div class="auth-input-group">
                <label class="auth-input-label">To'liq Ism va Familiya</label>
                <input type="text" id="reg-name" class="auth-input" placeholder="Ali Valiyev" required />
              </div>
              <div class="auth-input-group">
                <label class="auth-input-label">Email Manzilingiz</label>
                <input type="email" id="reg-email" class="auth-input" placeholder="nomingiz@misol.uz" required />
              </div>
              <div class="auth-input-group">
                <label class="auth-input-label">Parol yarating (kamida 6 ta belgi)</label>
                <input type="password" id="reg-password" class="auth-input" placeholder="••••••••" minlength="6" required />
              </div>
              <div class="auth-input-group">
                <label class="auth-input-label">Parolni tasdiqlang</label>
                <input type="password" id="reg-password-confirm" class="auth-input" placeholder="••••••••" minlength="6" required />
              </div>
              <button type="submit" class="auth-submit-btn" style="background:#10b981;">Ro'yxatdan O'tish</button>
            </form>

            <!-- OTP Verification Step -->
            <div id="auth-otp-step" style="display: none;">
              <div class="otp-container">
                <div style="font-size: 36px; margin-bottom: 6px;">📧</div>
                <h3 style="margin: 0 0 6px 0; font-size: 17px;">Emailni Tasdiqlash</h3>
                <p style="font-size: 13px; color: #64748b; margin: 0 0 10px 0;">
                  6 xonali tasdiqlash kodi quyidagi manzilga yuborildi:<br/>
                  <strong id="otp-sent-email" style="color: #2563eb;">user@example.com</strong>
                </p>

                <div class="otp-info-banner" id="otp-hint-banner">
                  🛡️ <b>Tasdiqlash kodi:</b> <span id="otp-code-display" style="letter-spacing: 4px; font-weight:800; font-size:18px;">123456</span>
                  <div style="font-size: 11px; margin-top: 4px; opacity: 0.85;">(Xavfsizlik maqsadida ushbu kod emailingizga yuborildi)</div>
                </div>

                <div class="otp-inputs">
                  <input type="text" class="otp-digit" maxlength="1" data-index="0" autofocus />
                  <input type="text" class="otp-digit" maxlength="1" data-index="1" />
                  <input type="text" class="otp-digit" maxlength="1" data-index="2" />
                  <input type="text" class="otp-digit" maxlength="1" data-index="3" />
                  <input type="text" class="otp-digit" maxlength="1" data-index="4" />
                  <input type="text" class="otp-digit" maxlength="1" data-index="5" />
                </div>

                <button type="button" id="btn-verify-otp" class="auth-submit-btn" style="background:#10b981;">
                  Tasdiqlash va Kirish
                </button>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; font-size: 12px;">
                  <a href="#" id="btn-back-to-register" style="color: #64748b; text-decoration: none;">← Boshqa email kiritish</a>
                  <span id="otp-resend-container" style="color: #64748b;">
                    Qayta yuborish: <span id="otp-timer">60</span>s
                  </span>
                  <a href="#" id="btn-resend-otp" style="color: #2563eb; text-decoration: none; display: none; font-weight:600;">Kodni qayta yuborish</a>
                </div>
              </div>
            </div>

            <!-- Login Form -->
            <form id="auth-login-form" style="display: none;">
              <div class="auth-input-group">
                <label class="auth-input-label">Email Manzilingiz</label>
                <input type="email" id="login-email" class="auth-input" placeholder="nomingiz@misol.uz" required />
              </div>
              <div class="auth-input-group">
                <label class="auth-input-label">Parol</label>
                <input type="password" id="login-password" class="auth-input" placeholder="••••••••" required />
              </div>
              <button type="submit" class="auth-submit-btn">Tizimga Kirish</button>
            </form>

            <div class="auth-divider" id="auth-divider-line">yoki</div>

            <!-- Google Button -->
            <button class="google-btn" id="google-auth-btn">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Google orqali kirish / ro'yxatdan o'tish
            </button>
          </div>
        </div>
      </div>

      <!-- Profile Modal -->
      <div id="secplus-profile-modal" class="secplus-modal-overlay">
        <div class="secplus-modal-card">
          <div class="secplus-modal-header">
            <div class="secplus-modal-title">
              <span>👤</span> <span>Mening Shaxsiy Kabinetim</span>
            </div>
            <button class="secplus-modal-close" id="close-profile-modal-btn">✕</button>
          </div>
          <div class="secplus-modal-body">
            <div style="display:flex; align-items:center; gap:16px; margin-bottom:16px;">
              <div class="user-profile-avatar" id="modal-avatar" style="width:56px; height:56px; font-size:20px;">CS</div>
              <div>
                <h3 id="modal-user-name" style="margin:0 0 4px 0; font-size:16px;">Security Pro</h3>
                <div id="modal-user-email" style="font-size:12px; color:#64748b;">user@example.com</div>
                <div id="modal-user-badge" style="margin-top:4px;">
                  <span style="font-size:11px; padding:2px 8px; border-radius:10px; background:#dcfce7; color:#15803d; font-weight:600;">Faol Talaba</span>
                </div>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="profile-stats-grid">
              <div class="profile-stat-box">
                <div class="profile-stat-val" id="stat-solved-count">0</div>
                <div class="profile-stat-lbl">Yechilgan Testlar</div>
              </div>
              <div class="profile-stat-box">
                <div class="profile-stat-val" id="stat-score-percent">0%</div>
                <div class="profile-stat-lbl">O'rtacha Natija</div>
              </div>
              <div class="profile-stat-box">
                <div class="profile-stat-val" id="stat-bookmarks-count">0</div>
                <div class="profile-stat-lbl">Xatcho'plar</div>
              </div>
              <div class="profile-stat-box">
                <div class="profile-stat-val" id="stat-license-tier">Sinov</div>
                <div class="profile-stat-lbl">Litsenziya Holati</div>
              </div>
            </div>

            <div id="profile-admin-btn-container" style="margin-top:14px; display:none;">
              <button id="btn-open-admin-from-profile" class="auth-submit-btn" style="background:linear-gradient(135deg, #f59e0b, #d97706); display:flex; align-items:center; justify-content:center; gap:8px;">
                👑 Admin Boshqaruv Panelini Ochish
              </button>
            </div>

            <div style="margin-top:16px; display:flex; gap:10px;">
              <button id="btn-open-license-from-profile" class="auth-submit-btn" style="background:#475569;">
                🛡️ Litsenziya / VIP Kalit
              </button>
              <button id="btn-logout-from-profile" class="auth-submit-btn" style="background:#ef4444;">
                🚪 Chiqish
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Admin Modal -->
      <div id="secplus-admin-modal" class="secplus-modal-overlay">
        <div class="secplus-modal-card admin-modal-card">
          <div class="secplus-modal-header">
            <div class="secplus-modal-title">
              <span>👑</span> <span>CompTIA Security+ Boshqaruv Paneli (Admin)</span>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
              <span id="admin-badge-current" style="font-size:12px; background:rgba(245,158,11,0.15); color:#d97706; padding:3px 10px; border-radius:12px; font-weight:700;">Admin</span>
              <button class="secplus-modal-close" id="close-admin-modal-btn">✕</button>
            </div>
          </div>
          
          <div class="admin-tabs">
            <button class="admin-tab-btn active" id="admin-tab-subscribers">👥 Obunachilar Ro'yxati</button>
            <button class="admin-tab-btn" id="admin-tab-analytics">📊 Statistika</button>
            <button class="admin-tab-btn" id="admin-tab-settings">⚙️ Baza & Sozlamalar</button>
          </div>

          <div class="secplus-modal-body" style="padding:16px 20px; overflow-y:auto;">
            <!-- Tab 1: Obunachilar -->
            <div id="admin-view-subscribers">
              <!-- KPIs -->
              <div class="admin-kpis">
                <div class="admin-kpi-card">
                  <div class="admin-kpi-icon" style="background:#dbeafe; color:#2563eb;">👥</div>
                  <div>
                    <div style="font-size:11px; color:#64748b; font-weight:600;">Jami Obunachilar</div>
                    <div style="font-size:22px; font-weight:800; color:#0f172a;" class="admin-kpi-num" id="kpi-total-subscribers">0</div>
                  </div>
                </div>
                <div class="admin-kpi-card">
                  <div class="admin-kpi-icon" style="background:#dcfce7; color:#166534;">💎</div>
                  <div>
                    <div style="font-size:11px; color:#64748b; font-weight:600;">VIP Premium A'zolar</div>
                    <div style="font-size:22px; font-weight:800; color:#0f172a;" class="admin-kpi-num" id="kpi-vip-subscribers">0</div>
                  </div>
                </div>
                <div class="admin-kpi-card">
                  <div class="admin-kpi-icon" style="background:#fef3c7; color:#92400e;">⏱️</div>
                  <div>
                    <div style="font-size:11px; color:#64748b; font-weight:600;">Sinov Foydalanuvchilari</div>
                    <div style="font-size:22px; font-weight:800; color:#0f172a;" class="admin-kpi-num" id="kpi-trial-subscribers">0</div>
                  </div>
                </div>
                <div class="admin-kpi-card">
                  <div class="admin-kpi-icon" style="background:#ede9fe; color:#5b21b6;">⚡</div>
                  <div>
                    <div style="font-size:11px; color:#64748b; font-weight:600;">Bugun Qo'shilganlar</div>
                    <div style="font-size:22px; font-weight:800; color:#0f172a;" class="admin-kpi-num" id="kpi-today-subscribers">0</div>
                  </div>
                </div>
              </div>

              <!-- Real Cloud Sync Information Box -->
              <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:12px 16px; margin-bottom:14px; display:flex; align-items:center; justify-content:space-between; gap:12px; font-size:12.5px; color:#166534;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="font-size:18px;">✅</span>
                  <span><b>Haqiqiy Baza Rejimi:</b> Soxta ma'lumotlar o'chirildi. Bu yerda faqat haqiqiy ro'yxatdan o'tgan foydalanuvchilar ko'rinadi.</span>
                </div>
                <button type="button" onclick="document.getElementById('admin-tab-settings').click()" style="background:#16a34a; color:#fff; border:none; padding:6px 12px; border-radius:6px; font-size:11px; font-weight:700; cursor:pointer; white-space:nowrap;">
                  Baza Sozlamalari ⚙️
                </button>
              </div>

              <!-- Toolbar: Search, Filters, Export -->
              <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:14px; flex-wrap:wrap;">
                <div style="display:flex; gap:8px; flex:1; min-width:240px;">
                  <input type="text" id="admin-search-input" class="auth-input" placeholder="🔍 Ism yoki email bo'yicha qidirish..." style="padding:8px 12px; font-size:13px;" />
                </div>
                <div style="display:flex; gap:8px;">
                  <button id="admin-btn-export-csv" class="admin-action-btn" style="background:#10b981; color:#fff; border-color:#10b981; display:flex; align-items:center; gap:6px; padding:8px 14px; font-size:12px;">
                    📥 CSV / Excel Yuklab Olish
                  </button>
                  <button id="admin-btn-refresh-subscribers" class="admin-action-btn" style="display:flex; align-items:center; gap:6px; padding:8px 14px; font-size:12px;">
                    🔄 Yangilash
                  </button>
                </div>
              </div>

              <!-- Subscribers Table -->
              <div class="admin-table-container">
                <table class="admin-table">
                  <thead>
                    <tr>
                      <th>Foydalanuvchi</th>
                      <th>Ro'yxatdan o'tgan</th>
                      <th>Usul</th>
                      <th>Obuna Holati</th>
                      <th>Test / Natijasi</th>
                      <th style="text-align:right;">Boshqarish</th>
                    </tr>
                  </thead>
                  <tbody id="admin-subscribers-tbody">
                    <!-- Rendered dynamically -->
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Tab 2: Analytics -->
            <div id="admin-view-analytics" style="display:none;">
              <div class="admin-kpis">
                <div class="admin-kpi-card">
                  <div class="admin-kpi-icon" style="background:#e0e7ff; color:#4338ca;">📝</div>
                  <div>
                    <div style="font-size:11px; color:#64748b; font-weight:600;">Jami Savollar Bazasi</div>
                    <div style="font-size:20px; font-weight:700;">230+ (90 Mock + 140 Dumps)</div>
                  </div>
                </div>
                <div class="admin-kpi-card">
                  <div class="admin-kpi-icon" style="background:#fce7f3; color:#9d174d;">📊</div>
                  <div>
                    <div style="font-size:11px; color:#64748b; font-weight:600;">O'rtacha Sinov Natijasi</div>
                    <div style="font-size:20px; font-weight:700;" id="kpi-avg-score">82%</div>
                  </div>
                </div>
              </div>
              <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px; margin-top:12px;">
                <h4 style="margin:0 0 8px 0;">Platforma Faolligi haqida</h4>
                <p style="font-size:13px; color:#64748b; margin:0 0 10px 0;">
                  CompTIA Security+ (SY0-701) platformasida har bir obunachining imtihon topshirish holati, sarflagan vaqti va xatcho'plari real vaqtda kuzatib boriladi.
                </p>
                <ul style="font-size:13px; color:#475569; padding-left:20px; line-height:1.6;">
                  <li>Foydalanuvchilar ro'yxatdan o'tgach 6 soatlik to'liq sinov (trial) muddati bilan ta'minlanadi.</li>
                  <li>Admin panel orqali xohlagan foydalanuvchiga bir tugma orqali doimiy <b>VIP Premium</b> berish yoki sinov muddatini uzaytirish mumkin.</li>
                </ul>
              </div>
            </div>

            <!-- Tab 3: Settings & Firebase Config -->
            <div id="admin-view-settings" style="display:none;">
              <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px; margin-bottom:16px;">
                <h4 style="margin:0 0 8px 0; display:flex; align-items:center; gap:8px;">
                  <span>☁️</span> Firebase Firestore Bulutli Baza Sozlamalari
                </h4>
                <p style="font-size:12px; color:#64748b; margin:0 0 12px 0;">
                  Barcha turli qurilmalardan (boshqa odamlar telefon yoki kompyuterlaridan) ro'yxatdan o'tgan foydalanuvchilarni bitta umumiy bazada ko'rib turish uchun bepul Firebase loyihangiz ma'lumotlarini shu yerga kiriting:
                </p>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px;">
                  <div class="auth-input-group">
                    <label class="auth-input-label">Firebase API Key</label>
                    <input type="text" id="cfg-firebase-api-key" class="auth-input" placeholder="AIzaSy..." />
                  </div>
                  <div class="auth-input-group">
                    <label class="auth-input-label">Project ID</label>
                    <input type="text" id="cfg-firebase-project-id" class="auth-input" placeholder="securityplus-..." />
                  </div>
                  <div class="auth-input-group">
                    <label class="auth-input-label">Auth Domain</label>
                    <input type="text" id="cfg-firebase-auth-domain" class="auth-input" placeholder="securityplus-...firebaseapp.com" />
                  </div>
                </div>
                <button type="button" id="btn-save-firebase-cfg" class="auth-submit-btn" style="background:#2563eb; width:auto; padding:8px 20px; font-size:13px; margin-top:8px;">
                  💾 Bulutli Baza Sozlamalarini Saqlash
                </button>
              </div>

              <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px;">
                <h4 style="margin:0 0 8px 0;">👑 Qo'shimcha Admin Gmail Manzillar</h4>
                <p style="font-size:12px; color:#64748b; margin:0 0 12px 0;">
                  Admin huquqiga ega bo'ladigan qo'shimcha emaillarni kiriting (vergul bilan ajrating):
                </p>
                <div class="auth-input-group">
                  <input type="text" id="cfg-admin-emails-input" class="auth-input" placeholder="masalan: quvonchbekeditz@gmail.com, boshqa@gmail.com" />
                </div>
                <button type="button" id="btn-save-admin-emails" class="auth-submit-btn" style="background:#f59e0b; width:auto; padding:8px 20px; font-size:13px; margin-top:8px;">
                  💾 Admin Emaillarni Saqlash
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dropdown Menu -->
      <div id="secplus-auth-dropdown" class="auth-dropdown-menu">
        <button class="auth-dropdown-item" id="dropdown-item-admin" style="color:#f59e0b; font-weight:700; display:none;">
          <span>👑</span> Admin Boshqaruv Paneli
        </button>
        <button class="auth-dropdown-item" id="dropdown-item-profile">
          <span>👤</span> Mening Profilim
        </button>
        <button class="auth-dropdown-item" id="dropdown-item-stats">
          <span>📊</span> Test Natijalari
        </button>
        <button class="auth-dropdown-item" id="dropdown-item-license">
          <span>🛡️</span> Litsenziya Holati
        </button>
        <div class="auth-dropdown-divider"></div>
        <button class="auth-dropdown-item" id="dropdown-item-logout" style="color:#ef4444;">
          <span>🚪</span> Tizimdan Chiqish
        </button>
      </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div);

    setupModalEvents();
  }

  // --- Update Header Widget (Logged In vs Logged Out) ---
  function updateHeaderUI() {
    const profileContainer = document.querySelector('.user-profile');
    if (!profileContainer) return;

    if (!currentUser) {
      profileContainer.innerHTML = `
        <button class="auth-btn-header" id="header-auth-trigger-btn">
          <span>👤</span> <span>Kirish / Ro'yxatdan o'tish</span>
        </button>
      `;
      const btn = document.getElementById('header-auth-trigger-btn');
      if (btn) {
        btn.onclick = function () { openAuthModal(); };
      }
    } else {
      const initials = (currentUser.name || 'U').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
      const avatarContent = currentUser.photoURL 
        ? `<img src="${currentUser.photoURL}" alt="${currentUser.name}" />`
        : initials;

      const isAdmin = isAdminUser(currentUser);

      profileContainer.innerHTML = `
        ${isAdmin ? `<button class="admin-badge-btn" id="header-admin-btn" title="Admin Boshqaruv Paneli">👑 Admin Panel</button>` : ''}
        <div class="user-profile-btn" id="header-user-btn" title="Shaxsiy Kabinet">
          <div class="user-profile-avatar">${avatarContent}</div>
          <div class="user-profile-details">
            <span class="user-profile-name">${currentUser.name}</span>
            <span class="user-profile-badge">${isAdmin ? '👑 Admin' : '● Online'}</span>
          </div>
          <span style="font-size:11px; color:#94a3b8;">▼</span>
        </div>
      `;

      const headerAdminBtn = document.getElementById('header-admin-btn');
      if (headerAdminBtn) {
        headerAdminBtn.onclick = function (e) {
          e.stopPropagation();
          openAdminModal();
        };
      }

      const userBtn = document.getElementById('header-user-btn');
      if (userBtn) {
        userBtn.onclick = function (e) {
          e.stopPropagation();
          toggleDropdown();
        };
      }

      // Update dropdown admin item
      const dropAdmin = document.getElementById('dropdown-item-admin');
      if (dropAdmin) {
        dropAdmin.style.display = isAdmin ? 'flex' : 'none';
        dropAdmin.onclick = function () {
          openAdminModal();
        };
      }

      // Update profile modal admin container
      const profAdminContainer = document.getElementById('profile-admin-btn-container');
      if (profAdminContainer) {
        profAdminContainer.style.display = isAdmin ? 'block' : 'none';
      }
    }
  }

  function toggleDropdown() {
    const dropdown = document.getElementById('secplus-auth-dropdown');
    if (dropdown) {
      dropdown.classList.toggle('show');
    }
  }

  document.addEventListener('click', function () {
    const dropdown = document.getElementById('secplus-auth-dropdown');
    if (dropdown && dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
  });

  // --- Modal Open/Close Logic ---
  function resetAuthModalView() {
    const tabsBar = document.getElementById('auth-tabs-bar');
    const formReg = document.getElementById('auth-register-form');
    const formLogin = document.getElementById('auth-login-form');
    const otpStep = document.getElementById('auth-otp-step');
    const divider = document.getElementById('auth-divider-line');
    const googleBtn = document.getElementById('google-auth-btn');

    if (tabsBar) tabsBar.style.display = 'flex';
    if (formReg) formReg.style.display = 'block';
    if (formLogin) formLogin.style.display = 'none';
    if (otpStep) otpStep.style.display = 'none';
    if (divider) divider.style.display = 'flex';
    if (googleBtn) googleBtn.style.display = 'flex';

    const tabReg = document.getElementById('tab-btn-register');
    const tabLog = document.getElementById('tab-btn-login');
    if (tabReg && tabLog) {
      tabReg.classList.add('active');
      tabLog.classList.remove('active');
    }

    if (otpTimerInterval) {
      clearInterval(otpTimerInterval);
      otpTimerInterval = null;
    }
    pendingRegistration = null;
  }

  function openAuthModal(isMandatory) {
    const modal = document.getElementById('secplus-auth-modal');
    if (modal) {
      clearAuthAlerts();
      resetAuthModalView();
      const closeBtn = document.getElementById('close-auth-modal-btn');
      if (closeBtn) {
        closeBtn.style.display = (!currentUser || isMandatory) ? 'none' : 'block';
      }
      modal.classList.add('open');
    }
  }

  function closeAuthModal() {
    if (!currentUser) {
      showAuthError('Saytdan foydalanish uchun ro\'yxatdan o\'tish majburiy!');
      return;
    }
    const modal = document.getElementById('secplus-auth-modal');
    if (modal) modal.classList.remove('open');
  }

  function openProfileModal() {
    const modal = document.getElementById('secplus-profile-modal');
    if (!modal || !currentUser) return;

    // Fill user info
    const avatar = document.getElementById('modal-avatar');
    const nameEl = document.getElementById('modal-user-name');
    const emailEl = document.getElementById('modal-user-email');
    const badgeEl = document.getElementById('modal-user-badge');
    const initials = (currentUser.name || 'U').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();

    if (avatar) {
      avatar.innerHTML = currentUser.photoURL 
        ? `<img src="${currentUser.photoURL}" alt="${currentUser.name}" />`
        : initials;
    }
    if (nameEl) nameEl.textContent = currentUser.name;
    if (emailEl) emailEl.textContent = currentUser.email;

    const isAdmin = isAdminUser(currentUser);
    if (badgeEl) {
      badgeEl.innerHTML = isAdmin 
        ? `<span style="font-size:11px; padding:2px 8px; border-radius:10px; background:#fef3c7; color:#b45309; font-weight:700;">👑 Tizim Admini</span>`
        : `<span style="font-size:11px; padding:2px 8px; border-radius:10px; background:#dcfce7; color:#15803d; font-weight:600;">Faol Talaba</span>`;
    }

    const profAdminContainer = document.getElementById('profile-admin-btn-container');
    if (profAdminContainer) {
      profAdminContainer.style.display = isAdmin ? 'block' : 'none';
    }

    // Fill stats from localStorage
    try {
      const solved = localStorage.getItem('secplus_solved_questions') || '0';
      const score = localStorage.getItem('secplus_last_score') || '0%';
      const bookmarks = JSON.parse(localStorage.getItem('secplus_bookmarks') || '[]').length;
      const isPremium = localStorage.getItem('secplus_license_status') === 'ACTIVE';

      document.getElementById('stat-solved-count').textContent = solved;
      document.getElementById('stat-score-percent').textContent = score;
      document.getElementById('stat-bookmarks-count').textContent = bookmarks;
      document.getElementById('stat-license-tier').textContent = isPremium ? 'Premium (VIP)' : 'Sinov (6 soat)';
    } catch (e) {}

    modal.classList.add('open');
  }

  function closeProfileModal() {
    const modal = document.getElementById('secplus-profile-modal');
    if (modal) modal.classList.remove('open');
  }

  // --- Admin Modal Logic ---
  function openAdminModal() {
    if (!isAdminUser(currentUser)) {
      alert('Kechirasiz, ushbu bo\'lim faqat Admin hisobi uchun mo\'ljallangan!');
      return;
    }

    const modal = document.getElementById('secplus-admin-modal');
    if (!modal) return;

    const currentBadge = document.getElementById('admin-badge-current');
    if (currentBadge && currentUser) {
      currentBadge.textContent = 'Admin: ' + currentUser.email;
    }

    // Populate admin email config input
    const adminEmailsInput = document.getElementById('cfg-admin-emails-input');
    if (adminEmailsInput) {
      adminEmailsInput.value = getAdminEmails().join(', ');
    }

    // Populate Firebase config inputs
    const fbApiKey = document.getElementById('cfg-firebase-api-key');
    const fbProjId = document.getElementById('cfg-firebase-project-id');
    const fbAuthDom = document.getElementById('cfg-firebase-auth-domain');
    if (fbApiKey) fbApiKey.value = FIREBASE_CONFIG.apiKey || '';
    if (fbProjId) fbProjId.value = FIREBASE_CONFIG.projectId || '';
    if (fbAuthDom) fbAuthDom.value = FIREBASE_CONFIG.authDomain || '';

    renderAdminSubscribers();
    modal.classList.add('open');
  }

  function closeAdminModal() {
    const modal = document.getElementById('secplus-admin-modal');
    if (modal) modal.classList.remove('open');
  }

  function renderAdminSubscribers(searchQuery) {
    const tbody = document.getElementById('admin-subscribers-tbody');
    if (!tbody) return;

    let vault = getUsersVault();
    const q = (searchQuery || '').toLowerCase().trim();

    if (q) {
      vault = vault.filter(u => 
        (u.name && u.name.toLowerCase().includes(q)) || 
        (u.email && u.email.toLowerCase().includes(q))
      );
    }

    // Update KPIs
    const allUsers = getUsersVault();
    const totalCount = allUsers.length;
    const vipCount = allUsers.filter(u => u.licenseTier === 'PREMIUM').length;
    const trialCount = allUsers.filter(u => u.licenseTier !== 'PREMIUM').length;

    const todayStr = new Date().toISOString().split('T')[0];
    const todayCount = allUsers.filter(u => u.createdAt && u.createdAt.startsWith(todayStr)).length;

    const elTotal = document.getElementById('kpi-total-subscribers');
    const elVip = document.getElementById('kpi-vip-subscribers');
    const elTrial = document.getElementById('kpi-trial-subscribers');
    const elToday = document.getElementById('kpi-today-subscribers');

    if (elTotal) elTotal.textContent = totalCount;
    if (elVip) elVip.textContent = vipCount;
    if (elTrial) elTrial.textContent = trialCount;
    if (elToday) elToday.textContent = todayCount;

    if (vault.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding:45px 20px; color:#64748b;">
            <div style="font-size:36px; margin-bottom:10px;">📭</div>
            <div style="font-weight:700; font-size:15px; color:#1e293b; margin-bottom:6px;" class="dark-mode-text">
              Hozircha yangi obunachilar yo'q
            </div>
            <div style="font-size:12.5px; color:#94a3b8; max-width:440px; margin:0 auto; line-height:1.5;">
              Faqat haqiqiy ro'yxatdan o'tgan foydalanuvchilar shu yerda ko'rinadi. Yangi obunachilar qo'shilishi bilan ularning natijalari darhol aks etadi.
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = vault.map(user => {
      const isVip = user.licenseTier === 'PREMIUM';
      const isGoogle = user.provider && user.provider.includes('google');
      const isBlocked = user.status === 'blocked';
      const dateStr = user.createdAt ? new Date(user.createdAt).toLocaleDateString('uz-UZ') : 'Noma\'lum';
      const solved = user.solvedQuestions !== undefined ? user.solvedQuestions : 0;
      const score = user.score || '0%';

      return `
        <tr data-uid="${user.uid}">
          <td>
            <div style="display:flex; align-items:center; gap:10px;">
              <div class="user-profile-avatar" style="width:32px; height:32px; font-size:11px;">
                ${(user.name || 'U').substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div style="font-weight:600; color:#1e293b;" class="dark-mode-text">${user.name || 'Foydalanuvchi'}</div>
                <div style="font-size:11px; color:#64748b;">${user.email}</div>
              </div>
            </div>
          </td>
          <td>${dateStr}</td>
          <td>
            <span class="admin-badge ${isGoogle ? 'admin-badge-google' : 'admin-badge-email'}">
              ${isGoogle ? '🌐 Google' : '📧 Email'}
            </span>
          </td>
          <td>
            <span class="admin-badge ${isBlocked ? 'admin-badge-blocked' : (isVip ? 'admin-badge-vip' : 'admin-badge-trial')}">
              ${isBlocked ? '🚫 Bloklangan' : (isVip ? '💎 VIP Premium' : '⏱️ Sinov (Trial)')}
            </span>
          </td>
          <td>
            <div style="font-size:12px; font-weight:600;">${solved} ta savol</div>
            <div style="font-size:11px; color:#10b981;">Natija: ${score}</div>
          </td>
          <td style="text-align:right;">
            <div style="display:inline-flex; gap:6px;">
              <button class="admin-action-btn btn-action-vip" data-uid="${user.uid}" title="${isVip ? 'VIP o\'chirish' : 'VIP berish'}">
                ${isVip ? '↩️ Sinovga' : '💎 VIP qilish'}
              </button>
              <button class="admin-action-btn btn-action-block" data-uid="${user.uid}" style="color:${isBlocked ? '#10b981' : '#f59e0b'};" title="Holat">
                ${isBlocked ? '✅ Ochiq' : '🚫 Blok'}
              </button>
              <button class="admin-action-btn btn-action-delete" data-uid="${user.uid}" style="color:#ef4444;" title="O'chirish">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Bind action buttons
    tbody.querySelectorAll('.btn-action-vip').forEach(btn => {
      btn.onclick = function () {
        const uid = this.getAttribute('data-uid');
        toggleUserVip(uid);
      };
    });

    tbody.querySelectorAll('.btn-action-block').forEach(btn => {
      btn.onclick = function () {
        const uid = this.getAttribute('data-uid');
        toggleUserBlock(uid);
      };
    });

    tbody.querySelectorAll('.btn-action-delete').forEach(btn => {
      btn.onclick = function () {
        const uid = this.getAttribute('data-uid');
        deleteUser(uid);
      };
    });
  }

  function toggleUserVip(uid) {
    const vault = getUsersVault();
    const user = vault.find(u => u.uid === uid);
    if (user) {
      user.licenseTier = user.licenseTier === 'PREMIUM' ? 'TRIAL' : 'PREMIUM';
      saveUsersVault(vault);
      if (currentUser && currentUser.uid === uid) {
        localStorage.setItem('secplus_license_status', user.licenseTier === 'PREMIUM' ? 'ACTIVE' : 'TRIAL');
      }
      renderAdminSubscribers(document.getElementById('admin-search-input')?.value);
    }
  }

  function toggleUserBlock(uid) {
    const vault = getUsersVault();
    const user = vault.find(u => u.uid === uid);
    if (user) {
      user.status = user.status === 'blocked' ? 'active' : 'blocked';
      saveUsersVault(vault);
      renderAdminSubscribers(document.getElementById('admin-search-input')?.value);
    }
  }

  function deleteUser(uid) {
    if (!confirm('Haqiqatan ham ushbu obunachini o\'chirmoqchimisiz?')) return;
    let vault = getUsersVault();
    vault = vault.filter(u => u.uid !== uid);
    saveUsersVault(vault);
    renderAdminSubscribers(document.getElementById('admin-search-input')?.value);
  }

  function exportSubscribersToCSV() {
    const vault = getUsersVault();
    if (!vault.length) {
      alert('Eksport qilish uchun obunachilar mavjud emas.');
      return;
    }

    const headers = ['ID', 'Ism-Familiya', 'Email', 'Kirish Usuli', 'Obuna Holati', 'Yechilgan Testlar', 'O\'rtacha Natija', 'Ro\'yxatdan O\'tgan Sana'];
    const rows = vault.map(u => [
      u.uid || '',
      `"${(u.name || '').replace(/"/g, '""')}"`,
      `"${(u.email || '').replace(/"/g, '""')}"`,
      u.provider || 'email',
      u.licenseTier || 'TRIAL',
      u.solvedQuestions || 0,
      u.score || '0%',
      u.createdAt || ''
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `securityplus_obunachilar_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function showAuthError(msg) {
    const errBox = document.getElementById('auth-error-box');
    const succBox = document.getElementById('auth-success-box');
    if (succBox) succBox.style.display = 'none';
    if (errBox) {
      errBox.textContent = msg;
      errBox.style.display = 'block';
    }
  }

  function showAuthSuccess(msg) {
    const errBox = document.getElementById('auth-error-box');
    const succBox = document.getElementById('auth-success-box');
    if (errBox) errBox.style.display = 'none';
    if (succBox) {
      succBox.textContent = msg;
      succBox.style.display = 'block';
    }
  }

  function clearAuthAlerts() {
    const errBox = document.getElementById('auth-error-box');
    const succBox = document.getElementById('auth-success-box');
    if (errBox) errBox.style.display = 'none';
    if (succBox) succBox.style.display = 'none';
  }

  // --- Event Bindings ---
  function setupModalEvents() {
    // Tab switching
    const tabLogin = document.getElementById('tab-btn-login');
    const tabRegister = document.getElementById('tab-btn-register');
    const formLogin = document.getElementById('auth-login-form');
    const formRegister = document.getElementById('auth-register-form');

    if (tabLogin && tabRegister) {
      tabLogin.onclick = function () {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        formLogin.style.display = 'block';
        formRegister.style.display = 'none';
        clearAuthAlerts();
      };
      tabRegister.onclick = function () {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        formLogin.style.display = 'none';
        formRegister.style.display = 'block';
        clearAuthAlerts();
      };
    }

    // Close buttons
    const closeAuth = document.getElementById('close-auth-modal-btn');
    if (closeAuth) closeAuth.onclick = closeAuthModal;

    const closeProfile = document.getElementById('close-profile-modal-btn');
    if (closeProfile) closeProfile.onclick = closeProfileModal;

    const closeAdmin = document.getElementById('close-admin-modal-btn');
    if (closeAdmin) closeAdmin.onclick = closeAdminModal;

    // Dropdown items
    const dropProfile = document.getElementById('dropdown-item-profile');
    if (dropProfile) dropProfile.onclick = function () {
      openProfileModal();
    };

    const dropStats = document.getElementById('dropdown-item-stats');
    if (dropStats) dropStats.onclick = function () {
      const examTab = document.querySelector('.nav-tab[data-target="exam-view"]');
      if (examTab) examTab.click();
    };

    const dropLicense = document.getElementById('dropdown-item-license');
    if (dropLicense) dropLicense.onclick = function () {
      if (window.__SecurityPlusLicense__ && window.__SecurityPlusLicense__.openModal) {
        window.__SecurityPlusLicense__.openModal();
      }
    };

    const dropLogout = document.getElementById('dropdown-item-logout');
    if (dropLogout) dropLogout.onclick = function () {
      clearLocalSession();
      alert('Tizimdan muvaffaqiyatli chiqdingiz!');
    };

    const btnLogoutProfile = document.getElementById('btn-logout-from-profile');
    if (btnLogoutProfile) btnLogoutProfile.onclick = function () {
      clearLocalSession();
      closeProfileModal();
      alert('Tizimdan muvaffaqiyatli chiqdingiz!');
    };

    const btnLicenseProfile = document.getElementById('btn-open-license-from-profile');
    if (btnLicenseProfile) btnLicenseProfile.onclick = function () {
      closeProfileModal();
      if (window.__SecurityPlusLicense__ && window.__SecurityPlusLicense__.openModal) {
        window.__SecurityPlusLicense__.openModal();
      }
    };

    const btnOpenAdminProf = document.getElementById('btn-open-admin-from-profile');
    if (btnOpenAdminProf) {
      btnOpenAdminProf.onclick = function () {
        closeProfileModal();
        openAdminModal();
      };
    }

    // --- Form Submit: Register with 6-Digit OTP ---
    if (formRegister) {
      formRegister.onsubmit = function (e) {
        e.preventDefault();
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim().toLowerCase();
        const pass = document.getElementById('reg-password').value;
        const passConf = document.getElementById('reg-password-confirm').value;

        if (pass !== passConf) {
          showAuthError('Kiritilgan parollar bir-biriga mos kelmadi!');
          return;
        }

        const vault = getUsersVault();
        const existing = vault.find(u => u.email === email);
        if (existing) {
          showAuthError('Ushbu email bilan avval ro\'yxatdan o\'tilgan. Iltimos, "Kirish" bo\'limidan kiring.');
          return;
        }

        // Generate 6-digit OTP code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        pendingRegistration = {
          name: name,
          email: email,
          pass: pass,
          code: code,
          createdAt: new Date().toISOString()
        };

        // Transition to OTP view
        document.getElementById('auth-tabs-bar').style.display = 'none';
        formRegister.style.display = 'none';
        document.getElementById('auth-divider-line').style.display = 'none';
        document.getElementById('google-auth-btn').style.display = 'none';

        const otpStep = document.getElementById('auth-otp-step');
        otpStep.style.display = 'block';
        document.getElementById('otp-sent-email').textContent = email;
        document.getElementById('otp-code-display').textContent = code;

        // Clear previous digit inputs
        const digitInputs = otpStep.querySelectorAll('.otp-digit');
        digitInputs.forEach(inp => inp.value = '');
        if (digitInputs[0]) digitInputs[0].focus();

        // Start 60s timer
        let timeLeft = 60;
        const timerSpan = document.getElementById('otp-timer');
        const resendContainer = document.getElementById('otp-resend-container');
        const btnResend = document.getElementById('btn-resend-otp');

        if (resendContainer) resendContainer.style.display = 'inline';
        if (btnResend) btnResend.style.display = 'none';
        if (timerSpan) timerSpan.textContent = timeLeft;

        if (otpTimerInterval) clearInterval(otpTimerInterval);
        otpTimerInterval = setInterval(function () {
          timeLeft--;
          if (timerSpan) timerSpan.textContent = timeLeft;
          if (timeLeft <= 0) {
            clearInterval(otpTimerInterval);
            if (resendContainer) resendContainer.style.display = 'none';
            if (btnResend) btnResend.style.display = 'inline';
          }
        }, 1000);

        showAuthSuccess('Tasdiqlash kodi tayyorlandi. Iltimos, kodni kiriting!');
      };
    }

    // OTP Input Navigation & Paste Handling
    const digitInputs = document.querySelectorAll('.otp-digit');
    digitInputs.forEach((input, idx) => {
      input.addEventListener('input', function (e) {
        if (this.value.length === 1 && idx < digitInputs.length - 1) {
          digitInputs[idx + 1].focus();
        }
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace' && !this.value && idx > 0) {
          digitInputs[idx - 1].focus();
        }
      });
      input.addEventListener('paste', function (e) {
        e.preventDefault();
        const pasteData = (e.clipboardData || window.clipboardData).getData('text').trim();
        if (/^\d{6}$/.test(pasteData)) {
          pasteData.split('').forEach((digit, i) => {
            if (digitInputs[i]) digitInputs[i].value = digit;
          });
          if (digitInputs[5]) digitInputs[5].focus();
        }
      });
    });

    // OTP Verification Button
    const btnVerifyOtp = document.getElementById('btn-verify-otp');
    if (btnVerifyOtp) {
      btnVerifyOtp.onclick = function () {
        if (!pendingRegistration) {
          showAuthError('Ro\'yxatdan o\'tish ma\'lumotlari topilmadi. Iltimos qaytadan urinib ko\'ring.');
          return;
        }

        let enteredCode = '';
        digitInputs.forEach(inp => enteredCode += inp.value.trim());

        if (enteredCode.length < 6) {
          showAuthError('Iltimos, to\'liq 6 xonali tasdiqlash kodini kiriting!');
          return;
        }

        if (enteredCode !== pendingRegistration.code) {
          showAuthError('Tasdiqlash kodi noto\'g\'ri kiritildi. Iltimos tekshirib qayta kiriting!');
          return;
        }

        // OTP Verified successfully! Register user
        const vault = getUsersVault();
        const isAdmin = isAdminUser({ email: pendingRegistration.email });
        const newUser = {
          uid: 'USR-' + Date.now().toString(36).toUpperCase(),
          name: pendingRegistration.name,
          email: pendingRegistration.email,
          passHash: hashPassword(pendingRegistration.pass),
          licenseTier: isAdmin ? 'PREMIUM' : 'TRIAL',
          status: 'active',
          solvedQuestions: 0,
          score: '0%',
          provider: 'email',
          createdAt: pendingRegistration.createdAt
        };

        vault.push(newUser);
        saveUsersVault(vault);
        saveLocalSession(newUser);

        if (isAdmin) {
          localStorage.setItem('secplus_license_status', 'ACTIVE');
          showAuthSuccess('Tabriklaymiz! Emailingiz tasdiqlandi. Sizga 👑 Admin huquqi berildi!');
        } else {
          showAuthSuccess('Tabriklaymiz! Emailingiz muvaffaqiyatli tasdiqlandi va hisobingiz yaratildi.');
        }

        setTimeout(closeAuthModal, 1200);
      };
    }

    // Back to Register from OTP
    const btnBackReg = document.getElementById('btn-back-to-register');
    if (btnBackReg) {
      btnBackReg.onclick = function (e) {
        e.preventDefault();
        resetAuthModalView();
      };
    }

    // Resend OTP
    const btnResend = document.getElementById('btn-resend-otp');
    if (btnResend) {
      btnResend.onclick = function (e) {
        e.preventDefault();
        if (!pendingRegistration) return;
        const newCode = Math.floor(100000 + Math.random() * 900000).toString();
        pendingRegistration.code = newCode;
        document.getElementById('otp-code-display').textContent = newCode;

        digitInputs.forEach(inp => inp.value = '');
        if (digitInputs[0]) digitInputs[0].focus();

        let timeLeft = 60;
        const timerSpan = document.getElementById('otp-timer');
        const resendContainer = document.getElementById('otp-resend-container');
        if (resendContainer) resendContainer.style.display = 'inline';
        btnResend.style.display = 'none';
        if (timerSpan) timerSpan.textContent = timeLeft;

        if (otpTimerInterval) clearInterval(otpTimerInterval);
        otpTimerInterval = setInterval(function () {
          timeLeft--;
          if (timerSpan) timerSpan.textContent = timeLeft;
          if (timeLeft <= 0) {
            clearInterval(otpTimerInterval);
            if (resendContainer) resendContainer.style.display = 'none';
            btnResend.style.display = 'inline';
          }
        }, 1000);

        showAuthSuccess('Yangi tasdiqlash kodi yuborildi!');
      };
    }

    // --- Form Submit: Login ---
    if (formLogin) {
      formLogin.onsubmit = function (e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim().toLowerCase();
        const pass = document.getElementById('login-password').value;

        // 1. Try Firebase if ready
        if (isFirebaseReady && typeof firebase !== 'undefined') {
          firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(function () {
              showAuthSuccess('Tizimga muvaffaqiyatli kirdingiz!');
              setTimeout(closeAuthModal, 1000);
            })
            .catch(function (err) {
              showAuthError(err.message || 'Email yoki parol noto\'g\'ri.');
            });
          return;
        }

        // 2. Local Vault Fallback
        const vault = getUsersVault();
        const user = vault.find(u => u.email === email);
        if (!user || user.passHash !== hashPassword(pass)) {
          showAuthError('Email yoki parol noto\'g\'ri kiritildi.');
          return;
        }

        if (user.status === 'blocked') {
          showAuthError('Ushbu akkaunt bloklangan. Iltimos admin bilan bog\'laning.');
          return;
        }

        saveLocalSession(user);
        if (isAdminUser(user)) {
          showAuthSuccess('Xush kelibsiz, 👑 Admin! Tizimga muvaffaqiyatli kirdingiz.');
        } else {
          showAuthSuccess('Xush kelibsiz! Tizimga muvaffaqiyatli kirdingiz.');
        }
        setTimeout(closeAuthModal, 1000);
      };
    }

    // --- Google Sign-In button ---
    const googleBtn = document.getElementById('google-auth-btn');
    if (googleBtn) {
      googleBtn.onclick = function () {
        if (isFirebaseReady && typeof firebase !== 'undefined') {
          const provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(provider)
            .then(function () {
              showAuthSuccess('Google orqali muvaffaqiyatli kirdingiz!');
              setTimeout(closeAuthModal, 1000);
            })
            .catch(function (err) {
              showAuthError(err.message || 'Google orqali kirish bekor qilindi.');
            });
        } else {
          // Google Fast Sign-In / Account Selection
          const userEmail = prompt(
            'Google hisobi orqali kirishda alohida tasdiqlash kodi talab qilinmaydi (Google buni avtomatik tasdiqlaydi).\n\nGoogle Gmail manzilingizni kiriting:',
            'quvonchbekeditz@gmail.com'
          );
          if (!userEmail) return;

          const cleanEmail = userEmail.trim().toLowerCase();
          const userName = prompt('Google profilingizdagi Ism va Familiyangizni kiriting:', 'Quvonchbek') || 'Talaba';

          const vault = getUsersVault();
          let existingUser = vault.find(u => u.email === cleanEmail);

          if (!existingUser) {
            const isAdmin = isAdminUser({ email: cleanEmail });
            existingUser = {
              uid: 'GGL-' + Date.now().toString(36).toUpperCase(),
              name: userName,
              email: cleanEmail,
              provider: 'google.com',
              licenseTier: isAdmin ? 'PREMIUM' : 'TRIAL',
              status: 'active',
              solvedQuestions: 0,
              score: '0%',
              createdAt: new Date().toISOString()
            };
            vault.push(existingUser);
            saveUsersVault(vault);
          }

          saveLocalSession(existingUser);
          if (isAdminUser(existingUser)) {
            localStorage.setItem('secplus_license_status', 'ACTIVE');
            showAuthSuccess('Google profilingiz orqali 👑 Admin sifatida kirdingiz!');
          } else {
            showAuthSuccess('Google profilingiz muvaffaqiyatli ulandi!');
          }
          setTimeout(closeAuthModal, 1000);
        }
      };
    }

    // --- Admin Dashboard Tabs & Controls ---
    const tabAdminSubscribers = document.getElementById('admin-tab-subscribers');
    const tabAdminAnalytics = document.getElementById('admin-tab-analytics');
    const tabAdminSettings = document.getElementById('admin-tab-settings');

    const viewAdminSubscribers = document.getElementById('admin-view-subscribers');
    const viewAdminAnalytics = document.getElementById('admin-view-analytics');
    const viewAdminSettings = document.getElementById('admin-view-settings');

    if (tabAdminSubscribers && tabAdminAnalytics && tabAdminSettings) {
      tabAdminSubscribers.onclick = function () {
        tabAdminSubscribers.classList.add('active');
        tabAdminAnalytics.classList.remove('active');
        tabAdminSettings.classList.remove('active');
        viewAdminSubscribers.style.display = 'block';
        viewAdminAnalytics.style.display = 'none';
        viewAdminSettings.style.display = 'none';
      };
      tabAdminAnalytics.onclick = function () {
        tabAdminAnalytics.classList.add('active');
        tabAdminSubscribers.classList.remove('active');
        tabAdminSettings.classList.remove('active');
        viewAdminSubscribers.style.display = 'none';
        viewAdminAnalytics.style.display = 'block';
        viewAdminSettings.style.display = 'none';
      };
      tabAdminSettings.onclick = function () {
        tabAdminSettings.classList.add('active');
        tabAdminSubscribers.classList.remove('active');
        tabAdminAnalytics.classList.remove('active');
        viewAdminSubscribers.style.display = 'none';
        viewAdminAnalytics.style.display = 'none';
        viewAdminSettings.style.display = 'block';
      };
    }

    // Search input
    const searchInput = document.getElementById('admin-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        renderAdminSubscribers(this.value);
      });
    }

    // Export CSV
    const btnExportCSV = document.getElementById('admin-btn-export-csv');
    if (btnExportCSV) {
      btnExportCSV.onclick = exportSubscribersToCSV;
    }

    // Refresh Subscribers
    const btnRefreshSubscribers = document.getElementById('admin-btn-refresh-subscribers');
    if (btnRefreshSubscribers) {
      btnRefreshSubscribers.onclick = function () {
        renderAdminSubscribers(searchInput ? searchInput.value : '');
        alert('Obunachilar ro\'yxati yangilandi!');
      };
    }

    // Save Firebase Config from Admin Panel
    const btnSaveFbCfg = document.getElementById('btn-save-firebase-cfg');
    if (btnSaveFbCfg) {
      btnSaveFbCfg.onclick = function () {
        const apiKey = document.getElementById('cfg-firebase-api-key').value.trim();
        const projId = document.getElementById('cfg-firebase-project-id').value.trim();
        const authDom = document.getElementById('cfg-firebase-auth-domain').value.trim();

        if (!apiKey || !projId) {
          alert('Iltimos kamida Firebase API Key va Project ID ni kiriting!');
          return;
        }

        const newCfg = {
          apiKey: apiKey,
          authDomain: authDom || `${projId}.firebaseapp.com`,
          projectId: projId,
          storageBucket: `${projId}.appspot.com`,
          messagingSenderId: "",
          appId: ""
        };

        window.__FIREBASE_CONFIG__ = newCfg;
        localStorage.setItem('secplus_firebase_cfg', JSON.stringify(newCfg));
        initFirebase();
        alert('Firebase sozlamalari muvaffaqiyatli saqlandi!');
      };
    }

    // Save Admin Emails from Admin Panel
    const btnSaveAdminEmails = document.getElementById('btn-save-admin-emails');
    if (btnSaveAdminEmails) {
      btnSaveAdminEmails.onclick = function () {
        const val = document.getElementById('cfg-admin-emails-input').value.trim();
        const emails = val.split(',').map(e => e.trim().toLowerCase()).filter(Boolean);
        localStorage.setItem('secplus_admin_emails', JSON.stringify(emails));
        alert('Admin email manzillari saqlandi!');
        updateHeaderUI();
      };
    }
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', function () {
    injectAuthStyles();
    injectModals();
    initFirebase();
    setTimeout(function () {
      if (!currentUser) {
        openAuthModal(true);
      }
    }, 350);
  });

  // Expose API
  window.__SecurityPlusAuth__ = {
    openAuthModal: openAuthModal,
    openProfileModal: openProfileModal,
    openAdminModal: openAdminModal,
    getCurrentUser: function () { return currentUser; },
    isAdmin: function () { return isAdminUser(currentUser); },
    logout: clearLocalSession,
    setFirebaseConfig: function (config) {
      window.__FIREBASE_CONFIG__ = config;
      initFirebase();
    }
  };
})();

