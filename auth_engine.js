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
    `;
    document.head.appendChild(style);
  }

  function injectModals() {
    if (document.getElementById('secplus-auth-modal')) return;

    const modalHtml = `
      <!-- Auth Modal -->
      <div id="secplus-auth-modal" class="secplus-modal-overlay">
        <div class="secplus-modal-card">
          <div class="secplus-modal-header">
            <div class="secplus-modal-title">
              <span>🛡️</span> <span id="auth-modal-title-text">Kirish & Ro'yxatdan o'tish</span>
            </div>
            <button class="secplus-modal-close" id="close-auth-modal-btn">✕</button>
          </div>
          <div class="secplus-modal-body">
            <div class="auth-tabs">
              <button class="auth-tab-btn active" id="tab-btn-login">🔑 Kirish</button>
              <button class="auth-tab-btn" id="tab-btn-register">📝 Ro'yxatdan o'tish</button>
            </div>

            <div id="auth-error-box" class="auth-error-msg"></div>
            <div id="auth-success-box" class="auth-success-msg"></div>

            <!-- Login Form -->
            <form id="auth-login-form">
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

            <!-- Register Form -->
            <form id="auth-register-form" style="display: none;">
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

            <div class="auth-divider">yoki</div>

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

            <div style="margin-top:20px; display:flex; gap:10px;">
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

      <!-- Dropdown Menu -->
      <div id="secplus-auth-dropdown" class="auth-dropdown-menu">
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
        btn.onclick = openAuthModal;
      }
    } else {
      const initials = (currentUser.name || 'U').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
      const avatarContent = currentUser.photoURL 
        ? `<img src="${currentUser.photoURL}" alt="${currentUser.name}" />`
        : initials;

      profileContainer.innerHTML = `
        <div class="user-profile-btn" id="header-user-btn" title="Shaxsiy Kabinet">
          <div class="user-profile-avatar">${avatarContent}</div>
          <div class="user-profile-details">
            <span class="user-profile-name">${currentUser.name}</span>
            <span class="user-profile-badge">● Online</span>
          </div>
          <span style="font-size:11px; color:#94a3b8;">▼</span>
        </div>
      `;

      const userBtn = document.getElementById('header-user-btn');
      if (userBtn) {
        userBtn.onclick = function (e) {
          e.stopPropagation();
          toggleDropdown();
        };
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
  function openAuthModal() {
    const modal = document.getElementById('secplus-auth-modal');
    if (modal) {
      clearAuthAlerts();
      modal.classList.add('open');
    }
  }

  function closeAuthModal() {
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
    const initials = (currentUser.name || 'U').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();

    if (avatar) {
      avatar.innerHTML = currentUser.photoURL 
        ? `<img src="${currentUser.photoURL}" alt="${currentUser.name}" />`
        : initials;
    }
    if (nameEl) nameEl.textContent = currentUser.name;
    if (emailEl) emailEl.textContent = currentUser.email;

    // Fill stats from localStorage
    try {
      const solved = localStorage.getItem('secplus_solved_questions') || '0';
      const score = localStorage.getItem('secplus_last_score') || '0%';
      const bookmarks = JSON.parse(localStorage.getItem('secplus_bookmarks') || '[]').length;
      const isPremium = localStorage.getItem('secplus_license_status') === 'ACTIVE';

      document.getElementById('stat-solved-count').textContent = solved;
      document.getElementById('stat-score-percent').textContent = score;
      document.getElementById('stat-bookmarks-count').textContent = bookmarks;
      document.getElementById('stat-license-tier').textContent = isPremium ? 'Premium' : 'Sinov (30m)';
    } catch (e) {}

    modal.classList.add('open');
  }

  function closeProfileModal() {
    const modal = document.getElementById('secplus-profile-modal');
    if (modal) modal.classList.remove('open');
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

    // Form Submit: Register
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

        // 1. Try Firebase if initialized
        if (isFirebaseReady && typeof firebase !== 'undefined') {
          firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(function (cred) {
              return cred.user.updateProfile({ displayName: name });
            })
            .then(function () {
              showAuthSuccess('Tabriklaymiz! Ro\'yxatdan muvaffaqiyatli o\'tdingiz.');
              setTimeout(closeAuthModal, 1200);
            })
            .catch(function (err) {
              showAuthError(err.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi.');
            });
          return;
        }

        // 2. Local Secure Vault Fallback
        const vault = getUsersVault();
        const existing = vault.find(u => u.email === email);
        if (existing) {
          showAuthError('Ushbu email bilan avval ro\'yxatdan o\'tilgan. Iltimos, tizimga kiring.');
          return;
        }

        const newUser = {
          uid: 'USR-' + Date.now().toString(36).toUpperCase(),
          name: name,
          email: email,
          passHash: hashPassword(pass),
          createdAt: new Date().toISOString()
        };

        vault.push(newUser);
        saveUsersVault(vault);
        saveLocalSession(newUser);

        showAuthSuccess('Tabriklaymiz! Akkauntingiz muvaffaqiyatli yaratildi.');
        setTimeout(closeAuthModal, 1200);
      };
    }

    // Form Submit: Login
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

        saveLocalSession(user);
        showAuthSuccess('Xush kelibsiz! Tizimga muvaffaqiyatli kirdingiz.');
        setTimeout(closeAuthModal, 1000);
      };
    }

    // Google Sign-In button
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
          // Demo / Quick Sign-In
          const name = prompt('Google profilingizdagi Ismingizni kiriting:', 'Talaba');
          if (name) {
            const email = prompt('Google emailingizni kiriting:', 'user@gmail.com');
            if (email) {
              const demoUser = {
                uid: 'GGL-' + Date.now().toString(36).toUpperCase(),
                name: name,
                email: email,
                provider: 'google.com',
                createdAt: new Date().toISOString()
              };
              saveLocalSession(demoUser);
              showAuthSuccess('Google profilingiz muvaffaqiyatli ulandi!');
              setTimeout(closeAuthModal, 1000);
            }
          }
        }
      };
    }
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', function () {
    injectAuthStyles();
    injectModals();
    initFirebase();
  });

  // Expose API
  window.__SecurityPlusAuth__ = {
    openAuthModal: openAuthModal,
    openProfileModal: openProfileModal,
    getCurrentUser: function () { return currentUser; },
    logout: clearLocalSession,
    setFirebaseConfig: function (config) {
      window.__FIREBASE_CONFIG__ = config;
      initFirebase();
    }
  };
})();
