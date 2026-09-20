/**
 * CompTIA Security+ (SY0-701) Pro Suite - License & Trial Protection Engine
 * Features:
 *  - Public IP detection with reliable fallbacks (device ID fallback for offline)
 *  - Deterministic SHA-256 HMAC IP-key verification (matching keygen.py)
 *  - 10-minute trial usage per 6-hour window
 *  - Automatic lock-screen modal upon trial expiration
 *  - Real-time countdown to next trial window
 *  - Master Root Key override support
 *  - Direct contact links to author: Telegram @kuvnch & Gmail quvonchbekeditz@gmail.com
 */

(function () {
  'use strict';

  // --- Configuration Constants ---
  const SECRET_SALT = 'SECPLUS_SECRET_SALT_2026_MASTER_KEY_PROTECTION';
  const MASTER_ROOT_KEY = 'SECPLUS-MASTER-ROOT-2026-ADMIN';
  const WINDOW_DURATION_MS = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
  const MAX_TRIAL_SECONDS = 30 * 60; // 30 minutes in seconds (1800s)

  // Seller / Author Contact Details
  const SELLER_INFO = {
    telegramUser: '@kuvnch',
    telegramUrl: 'https://t.me/kuvnch',
    email: 'quvonchbekeditz@gmail.com'
  };

  // Storage Keys
  const STORAGE_KEYS = {
    STATUS: 'secplus_license_status',        // 'ACTIVE' | 'TRIAL'
    KEY: 'secplus_license_key',              // Activated key string
    IP: 'secplus_client_ip',                 // Detected IP or Device ID
    DEVICE_ID: 'secplus_device_id',          // Persistent unique offline device id
    WINDOW_START: 'secplus_window_start',    // Epoch timestamp of 6-hr window start
    ELAPSED_SEC: 'secplus_elapsed_sec',      // Active trial seconds elapsed in current window
    LAST_TICK: 'secplus_last_tick'           // Last active tick timestamp
  };

  // --- Pure JS SHA-256 Implementation (100% parity with Python hashlib.sha256) ---
  function sha256(ascii) {
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }
    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length';
    var i, j;
    var result = '';
    var words = [];
    var asciiBitLength = ascii[lengthProperty] * 8;
    var hash = [];
    var k = [];

    var primeCounter = 0;
    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) {
          isComposite[i] = candidate;
        }
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }

    ascii += '\x80';
    while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00';
    for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j >> 8) return '';
      words[i >> 2] |= j << (((3 - i) % 4) * 8);
    }
    words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
    words[words[lengthProperty]] = asciiBitLength;

    for (j = 0; j < words[lengthProperty]; ) {
      var w = words.slice(j, (j += 16));
      var oldHash = hash;
      hash = hash.slice(0, 8);

      for (i = 0; i < 64; i++) {
        var i2 = i + j;
        var w15 = w[i - 15],
          w2 = w[i - 2];

        var a = hash[0],
          e = hash[4];
        var temp1 =
          hash[7] +
          (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
          ((e & hash[5]) ^ (~e & hash[6])) +
          k[i] +
          (w[i] =
            i < 16
              ? w[i]
              : (w[i - 16] +
                  (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                  w[i - 7] +
                  (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
                0);

        var temp2 =
          (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
          ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));

        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
      }

      for (i = 0; i < 8; i++) {
        hash[i] = (hash[i] + oldHash[i]) | 0;
      }
    }

    for (i = 0; i < 8; i++) {
      for (var i3 = 3; i3 >= 0; i3--) {
        var b = (hash[i] >> (8 * i3)) & 255;
        result += (b < 16 ? '0' : '') + b.toString(16);
      }
    }
    return result;
  }

  // --- Key Computation Helper ---
  var VIP_MASTER_KEYS = [
    'SECPLUS-VIP-KUVNCH-2026-PRO',
    'SECPLUS-VIP-OWNER-ACCESS-KEY',
    'SECPLUS-MASTER-ROOT-2026-ADMIN'
  ];

  function computeLicenseKey(ip) {
    if (!ip) return '';
    var clean = ip.trim().toLowerCase();
    var h = sha256(SECRET_SALT + clean).toUpperCase();
    return 'SECPLUS-' + h.substr(0, 4) + '-' + h.substr(4, 4) + '-' + h.substr(8, 4) + '-' + h.substr(12, 4);
  }

  // Verify key against IP or VIP Master Keys
  function verifyKey(enteredKey, ip) {
    if (!enteredKey) return false;
    var normKey = enteredKey.trim().toUpperCase().replace(/[\s_]/g, '-');
    if (VIP_MASTER_KEYS.indexOf(normKey) !== -1) return true;
    var expected = computeLicenseKey(ip);
    return expected && normKey === expected;
  }

  // --- Unique Offline Device ID Generator ---
  function getOrCreateDeviceId() {
    var stored = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
    if (stored) return stored;
    var randomHex = function (len) {
      var s = '';
      for (var i = 0; i < len; i++) {
        s += Math.floor(Math.random() * 16).toString(16).toUpperCase();
      }
      return s;
    };
    var newId = 'DEV-' + randomHex(4) + '-' + randomHex(4);
    localStorage.setItem(STORAGE_KEYS.DEVICE_ID, newId);
    return newId;
  }

  // --- State Variables ---
  var state = {
    clientIp: localStorage.getItem(STORAGE_KEYS.IP) || getOrCreateDeviceId(),
    isActivated: localStorage.getItem(STORAGE_KEYS.STATUS) === 'ACTIVE',
    activeKey: localStorage.getItem(STORAGE_KEYS.KEY) || '',
    windowStart: parseInt(localStorage.getItem(STORAGE_KEYS.WINDOW_START), 10) || 0,
    elapsedSeconds: parseInt(localStorage.getItem(STORAGE_KEYS.ELAPSED_SEC), 10) || 0,
    isLocked: false,
    timerInterval: null
  };

  // --- Fetch Client Public IP ---
  function detectPublicIp() {
    var endpoints = [
      'https://api.ipify.org?format=json',
      'https://api.bigdatacloud.net/data/client-ip',
      'https://icanhazip.com'
    ];

    function tryFetch(idx) {
      if (idx >= endpoints.length) {
        if (!state.clientIp) {
          state.clientIp = getOrCreateDeviceId();
          localStorage.setItem(STORAGE_KEYS.IP, state.clientIp);
        }
        updateModalIpDisplay();
        return;
      }

      var url = endpoints[idx];
      var controller = window.AbortController ? new AbortController() : null;
      var timeoutId = setTimeout(function () {
        if (controller) controller.abort();
      }, 4000);

      fetch(url, { signal: controller ? controller.signal : undefined })
        .then(function (res) {
          clearTimeout(timeoutId);
          if (!res.ok) throw new Error('HTTP ' + res.status);
          var contentType = res.headers.get('content-type') || '';
          if (contentType.indexOf('application/json') !== -1) {
            return res.json();
          }
          return res.text();
        })
        .then(function (data) {
          var ip = '';
          if (typeof data === 'object' && data !== null) {
            ip = data.ip || data.ipString || data.clientIp || '';
          } else if (typeof data === 'string') {
            ip = data.trim();
          }
          if (ip && ip.length >= 7 && ip.length <= 45) {
            state.clientIp = ip;
            localStorage.setItem(STORAGE_KEYS.IP, ip);
            updateModalIpDisplay();
            if (state.activeKey && verifyKey(state.activeKey, state.clientIp)) {
              markAsActivated(state.activeKey);
            }
          } else {
            tryFetch(idx + 1);
          }
        })
        .catch(function () {
          tryFetch(idx + 1);
        });
    }

    tryFetch(0);
  }

  // --- Format Seconds into MM:SS ---
  function formatMMSS(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  // --- Format Milliseconds into HH:MM:SS ---
  function formatHHMMSS(ms) {
    if (ms <= 0) return '00:00:00';
    var totalSec = Math.floor(ms / 1000);
    var h = Math.floor(totalSec / 3600);
    var m = Math.floor((totalSec % 3600) / 60);
    var s = totalSec % 60;
    return (
      (h < 10 ? '0' : '') + h + ':' +
      (m < 10 ? '0' : '') + m + ':' +
      (s < 10 ? '0' : '') + s
    );
  }

  // --- DOM Injection: Status Pill & Lock Modal ---
  function injectUI() {
    // 1. Status Pill in Header
    var header = document.querySelector('.top-header');
    var headerRight = document.querySelector('.header-right');

    var pill = document.createElement('button');
    pill.id = 'license-status-pill';
    pill.className = 'license-status-pill';
    pill.title = "Litsenziya va sinov holati (Ko'rish va faollashtirish uchun bosing)";
    pill.innerHTML = `
      <span class="license-pill-icon">⏳</span>
      <span class="license-pill-text" id="license-pill-text">Sinov: 30:00</span>
    `;
    pill.addEventListener('click', function () {
      openModal(false);
    });

    if (headerRight) {
      headerRight.insertBefore(pill, headerRight.firstChild);
    } else if (header) {
      header.appendChild(pill);
    }

    // 2. Lock / Activation Modal
    var modalOverlay = document.createElement('div');
    modalOverlay.id = 'license-lock-modal';
    modalOverlay.className = 'license-lock-modal';
    modalOverlay.style.display = 'none';

    modalOverlay.innerHTML = `
      <div class="license-modal-backdrop" id="license-modal-backdrop"></div>
      <div class="license-modal-card">
        <!-- Modal Close Button (hidden when locked) -->
        <button class="license-modal-close" id="license-modal-close" title="Yopish">✕</button>

        <!-- Header -->
        <div class="license-modal-header">
          <div class="license-badge-icon" id="license-modal-icon">🛡️</div>
          <div class="license-modal-titles">
            <h2 id="license-modal-title">CompTIA Security+ SY0-701 Pro Suite</h2>
            <p id="license-modal-subtitle">Xavfsizlik va Litsenziyalash Tizimi</p>
          </div>
        </div>

        <!-- Status Alert Box -->
        <div class="license-alert-box" id="license-alert-box">
          <div class="license-alert-icon" id="license-alert-icon">⏳</div>
          <div class="license-alert-content">
            <h4 id="license-alert-heading">Bepul Sinov Rejimi</h4>
            <p id="license-alert-text">
              Dasturdan har 6 soatda faqat <strong>30 daqiqa</strong> bepul foydalanish mumkin.
            </p>
          </div>
        </div>

        <!-- Cooldown / Countdown Box -->
        <div class="license-cooldown-box" id="license-cooldown-box">
          <div class="cooldown-item">
            <span class="cooldown-label">Joriy sinov vaqti:</span>
            <span class="cooldown-value text-amber" id="license-trial-remaining">30:00</span>
          </div>
          <div class="cooldown-item">
            <span class="cooldown-label">Keyingi 6-soatlik oyna:</span>
            <span class="cooldown-value text-blue" id="license-cooldown-countdown">--:--:--</span>
          </div>
        </div>

        <!-- IP Address Section -->
        <div class="license-section">
          <label class="license-section-label">
            <span>🌐</span> Sizning IP Manzilingiz (Litsenziya Identifikatori):
          </label>
          <div class="license-ip-row">
            <div class="license-ip-display" id="license-ip-display">Aniqlanmoqda...</div>
            <button class="license-copy-btn" id="license-copy-ip-btn" title="IP manzilni nusxalash">
              <span>📋</span> Nusxa olish
            </button>
          </div>
          <div class="license-help-text">
            ℹ️ Cheklovsiz doimiy kirish (Access) olish uchun ushbu IP manzilni dastur egasiga yuboring va kalit oling.
          </div>
        </div>

        <!-- Direct Contact Seller Box (Requested by User) -->
        <div class="license-seller-contact-card">
          <div class="seller-contact-title">
            <span>📬</span> Dastur Egasiga Yozing (Access & IP Kalit olish):
          </div>
          <p class="seller-contact-desc">
            Ushbu dasturdan doimiy va to'liq cheklovsiz foydalanish uchun IP manzilingizni quyidagi kontaktlarga yuboring:
          </p>
          <div class="seller-actions-grid">
            <a href="${SELLER_INFO.telegramUrl}" target="_blank" rel="noopener noreferrer" class="seller-contact-btn telegram-btn" id="btn-seller-tg">
              <span class="btn-icon">✈️</span>
              <div class="btn-text-wrap">
                <span class="btn-label">Telegram orqali yozish</span>
                <span class="btn-sub">${SELLER_INFO.telegramUser}</span>
              </div>
            </a>
            <a href="mailto:${SELLER_INFO.email}?subject=${encodeURIComponent('CompTIA Security+ SY0-701 IP Kalit Sorovi')}&body=${encodeURIComponent('Salom, men CompTIA Security+ dasturi uchun IP kalit sotib olmoqchiman.\nIP manzilim: ')}" class="seller-contact-btn gmail-btn" id="btn-seller-gmail">
              <span class="btn-icon">✉️</span>
              <div class="btn-text-wrap">
                <span class="btn-label">Gmail orqali yozish</span>
                <span class="btn-sub">${SELLER_INFO.email}</span>
              </div>
            </a>
          </div>
        </div>

        <!-- License Key Input Section -->
        <div class="license-section" id="license-input-section">
          <label class="license-section-label" for="license-key-input">
            <span>🔑</span> IP Kalitni Kiriting (Activation Key):
          </label>
          <div class="license-input-row">
            <input
              type="text"
              id="license-key-input"
              class="license-key-input"
              placeholder="SECPLUS-XXXX-XXXX-XXXX-XXXX"
              autocomplete="off"
              spellcheck="false"
              maxlength="40"
            />
            <button class="license-activate-btn" id="license-activate-btn">
              <span>🚀</span> Faollashtirish
            </button>
          </div>
          <div class="license-msg-container" id="license-msg-container" style="display: none;"></div>
        </div>

        <!-- Premium Status View (shown when activated) -->
        <div class="license-premium-view" id="license-premium-view" style="display: none;">
          <div class="premium-badge-banner">
            <span class="premium-star">👑</span>
            <div>
              <h3>Litsenziya To'liq Faol!</h3>
              <p>Siz barcha 90 ta imtihon savollari va materiallardan cheklovsiz foydalana olasiz.</p>
            </div>
          </div>
          <div style="margin-top: 14px; text-align: center;">
            <button type="button" class="license-reset-trial-btn" id="btn-reset-trial-test" style="background:#f8fafc; border:1px solid #cbd5e1; color:#475569; padding:8px 16px; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
              <span>🔄</span> Sinov Rejimini Qayta Sinash (Reset: 30m / 6h)
            </button>
          </div>
        </div>

        <!-- Footer / Protection Badge -->
        <div class="license-modal-footer">
          <div class="license-contact-info">
            <span>🛡️ Rasmiy Muallif: <strong>Kuvnch</strong> (Telegram: ${SELLER_INFO.telegramUser} | Gmail: ${SELLER_INFO.email})</span>
          </div>
          <div class="license-protection-badge">
            <span>🔒 SHA-256 IP Binding</span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalOverlay);

    setupModalEvents();
  }

  // --- Modal Event Listeners ---
  function setupModalEvents() {
    var closeBtn = document.getElementById('license-modal-close');
    var backdrop = document.getElementById('license-modal-backdrop');
    var copyBtn = document.getElementById('license-copy-ip-btn');
    var keyInput = document.getElementById('license-key-input');
    var activateBtn = document.getElementById('license-activate-btn');
    var tgBtn = document.getElementById('btn-seller-tg');
    var gmailBtn = document.getElementById('btn-seller-gmail');

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        if (!state.isLocked) closeModal();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', function () {
        if (!state.isLocked) closeModal();
      });
    }

    // Dynamic update mailto link with detected IP
    if (gmailBtn) {
      gmailBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var ip = state.clientIp || '';
        var subj = 'CompTIA Security+ SY0-701 IP Kalit Sorovi';
        var body = 'Salom Kuvnch!\n\nMen CompTIA Security+ SY0-701 dasturi uchun litsenziya (IP Kalit) sotib olmoqchiman.\n\nSizning dasturingizdagi mening IP manzilim:\n' + ip + '\n\nIltimos, menga litsenziya kalitini yuboring.\nRahmat!';
        var mailtoUrl = 'mailto:' + SELLER_INFO.email + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);
        if (window.openExternalUrl) {
          window.openExternalUrl(mailtoUrl);
        } else {
          window.location.href = mailtoUrl;
        }
      });
    }

    if (tgBtn) {
      tgBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (window.openExternalUrl) {
          window.openExternalUrl(SELLER_INFO.telegramUrl);
        } else {
          window.open(SELLER_INFO.telegramUrl, '_blank');
        }
      });
    }

    // Reset Trial button (test / debug mode)
    var resetTrialBtn = document.getElementById('btn-reset-trial-test');
    if (resetTrialBtn) {
      resetTrialBtn.addEventListener('click', function () {
        if (confirm("Sinov rejimini (30 daqiqa / 6 soat) qaytadan sinab ko'rmoqchimisiz?")) {
          resetToTrialMode();
        }
      });
    }

    // Copy IP button
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var ipText = state.clientIp || '';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(ipText).then(function () {
            showCopyFeedback(copyBtn, true);
          }).catch(function () {
            fallbackCopy(ipText, copyBtn);
          });
        } else {
          fallbackCopy(ipText, copyBtn);
        }
      });
    }

    // Auto-format key input as SECPLUS-XXXX-XXXX-XXXX-XXXX or preserve VIP Master keys
    if (keyInput) {
      keyInput.addEventListener('input', function (e) {
        var raw = e.target.value.toUpperCase().trim();
        // If typing or pasting a VIP/Master key, preserve it
        if (raw.startsWith('SECPLUS-VIP') || raw.startsWith('SECPLUS-MASTER') || raw.startsWith('SECPLUS-ROOT')) {
          e.target.value = raw.replace(/[^A-Z0-9\-]/g, '');
          return;
        }
        var val = raw.replace(/[^A-Z0-9]/g, '');
        if (val.startsWith('SECPLUS')) {
          val = val.substring(7);
        }
        var parts = ['SECPLUS'];
        for (var i = 0; i < val.length && i < 16; i += 4) {
          parts.push(val.substring(i, i + 4));
        }
        var formatted = parts.length > 1 ? parts.join('-') : (val.length ? 'SECPLUS-' + val : val);
        e.target.value = formatted;
      });

      keyInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          handleActivation();
        }
      });
    }

    // Activate Button
    if (activateBtn) {
      activateBtn.addEventListener('click', handleActivation);
    }
  }

  function fallbackCopy(text, btn) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showCopyFeedback(btn, true);
    } catch (err) {
      showCopyFeedback(btn, false);
    }
    document.body.removeChild(ta);
  }

  function showCopyFeedback(btn, success) {
    var orig = btn.innerHTML;
    btn.innerHTML = success ? '<span>✓</span> Nusxalandi!' : '<span>✕</span> Xato';
    btn.classList.add(success ? 'btn-copy-success' : 'btn-copy-error');
    setTimeout(function () {
      btn.innerHTML = orig;
      btn.classList.remove('btn-copy-success', 'btn-copy-error');
    }, 2000);
  }

  // --- Handle Key Activation ---
  function handleActivation() {
    var input = document.getElementById('license-key-input');
    var msgBox = document.getElementById('license-msg-container');
    if (!input || !msgBox) return;

    var entered = (input.value || '').trim().toUpperCase();
    if (!entered) {
      showLicenseMessage(msgBox, "Iltimos, litsenziya kalitini kiriting!", 'error');
      return;
    }

    if (verifyKey(entered, state.clientIp)) {
      markAsActivated(entered);
      showLicenseMessage(msgBox, "🎉 Tabriklaymiz! IP Kalit muvaffaqiyatli qabul qilindi. Dastur to'liq faollashtirildi!", 'success');
      setTimeout(function () {
        closeModal();
      }, 1800);
    } else {
      showLicenseMessage(msgBox, "❌ Noto'g'ri kalit! Ushbu kalit sizning IP manzilingizga (" + state.clientIp + ") mos kelmadi. Telegram orqali " + SELLER_INFO.telegramUser + " ga murojaat qiling.", 'error');
    }
  }

  function showLicenseMessage(el, text, type) {
    el.style.display = 'block';
    el.className = 'license-msg-container msg-' + type;
    el.innerHTML = text;
  }

  function pushStateToServer() {
    try {
      if (window.fetch) {
        fetch('/api/license-state', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: state.isActivated ? 'ACTIVE' : 'TRIAL',
            activeKey: state.activeKey,
            windowStart: state.windowStart,
            elapsedSeconds: state.elapsedSeconds,
            clientIp: state.clientIp,
            lastTick: Date.now()
          })
        }).catch(function () {});
      }
    } catch (e) {}
  }

  function syncWithServer(done) {
    if (!window.fetch) {
      done();
      return;
    }
    fetch('/api/license-state')
      .then(function (res) {
        if (!res.ok) throw new Error('status ' + res.status);
        return res.json();
      })
      .then(function (srv) {
        if (srv && typeof srv === 'object') {
          if (srv.status === 'ACTIVE' && srv.activeKey) {
            state.isActivated = true;
            state.activeKey = srv.activeKey;
            localStorage.setItem(STORAGE_KEYS.STATUS, 'ACTIVE');
            localStorage.setItem(STORAGE_KEYS.KEY, srv.activeKey);
          } else if (srv.status === 'TRIAL') {
            state.isActivated = false;
            state.activeKey = '';
            state.isLocked = false;
            localStorage.setItem(STORAGE_KEYS.STATUS, 'TRIAL');
            localStorage.removeItem(STORAGE_KEYS.KEY);
            if (srv.windowStart) {
              state.windowStart = parseInt(srv.windowStart, 10);
              localStorage.setItem(STORAGE_KEYS.WINDOW_START, state.windowStart.toString());
            }
            if (typeof srv.elapsedSeconds === 'number') {
              state.elapsedSeconds = srv.elapsedSeconds;
              localStorage.setItem(STORAGE_KEYS.ELAPSED_SEC, state.elapsedSeconds.toString());
            }
          } else {
            if (srv.windowStart) {
              state.windowStart = parseInt(srv.windowStart, 10);
              localStorage.setItem(STORAGE_KEYS.WINDOW_START, state.windowStart.toString());
            }
            if (typeof srv.elapsedSeconds === 'number') {
              state.elapsedSeconds = Math.max(state.elapsedSeconds, srv.elapsedSeconds);
              localStorage.setItem(STORAGE_KEYS.ELAPSED_SEC, state.elapsedSeconds.toString());
            }
          }
        }
        done();
      })
      .catch(function () {
        done();
      });
  }

  function markAsActivated(key) {
    state.isActivated = true;
    state.activeKey = key;
    state.isLocked = false;
    localStorage.setItem(STORAGE_KEYS.STATUS, 'ACTIVE');
    localStorage.setItem(STORAGE_KEYS.KEY, key);

    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }

    pushStateToServer();
    updateStatusPill();
    updateModalUI();
  }

  // --- Open / Close Modal ---
  function openModal(isLockMode) {
    var modal = document.getElementById('license-lock-modal');
    var closeBtn = document.getElementById('license-modal-close');
    if (!modal) return;

    state.isLocked = !!isLockMode;
    modal.classList.toggle('is-locked-mode', state.isLocked);
    if (closeBtn) {
      closeBtn.style.display = state.isLocked ? 'none' : 'flex';
    }

    modal.style.display = 'flex';
    updateModalUI();
    updateModalIpDisplay();
  }

  function closeModal() {
    if (state.isLocked && !state.isActivated) return;
    var modal = document.getElementById('license-lock-modal');
    if (modal) modal.style.display = 'none';
  }

  function updateModalIpDisplay() {
    var ipDisplay = document.getElementById('license-ip-display');
    if (ipDisplay) {
      ipDisplay.textContent = state.clientIp || 'Aniqlanmoqda...';
    }
  }

  function updateModalUI() {
    var alertBox = document.getElementById('license-alert-box');
    var alertHeading = document.getElementById('license-alert-heading');
    var alertText = document.getElementById('license-alert-text');
    var alertIcon = document.getElementById('license-alert-icon');
    var cooldownBox = document.getElementById('license-cooldown-box');
    var premiumView = document.getElementById('license-premium-view');
    var activateSection = document.getElementById('license-input-section');
    var contactCard = document.querySelector('.license-seller-contact-card');

    if (state.isActivated) {
      if (alertBox) alertBox.style.display = 'none';
      if (cooldownBox) cooldownBox.style.display = 'none';
      if (activateSection) activateSection.style.display = 'none';
      if (contactCard) contactCard.style.display = 'none';
      if (premiumView) premiumView.style.display = 'block';
    } else if (state.isLocked) {
      if (alertBox) {
        alertBox.style.display = 'flex';
        alertBox.className = 'license-alert-box alert-expired';
      }
      if (alertIcon) alertIcon.textContent = '🔒';
      if (alertHeading) alertHeading.textContent = 'Bepul Sinov Vaqti Tugadi!';
      if (alertText) {
        alertText.innerHTML = `
          Siz ushbu 6-soatlik oynadagi <strong>30 daqiqalik</strong> bepul sinov vaqtidan foydalanib bo'ldingiz.<br>
          Cheklovni butunlay olib tashlash va barcha 90 ta imtihon savollaridan foydalanish uchun <strong>IP Kalit sotib oling!</strong>
        `;
      }
      if (cooldownBox) cooldownBox.style.display = 'grid';
      if (premiumView) premiumView.style.display = 'none';
      if (activateSection) activateSection.style.display = 'block';
      if (contactCard) contactCard.style.display = 'block';
    } else {
      if (alertBox) {
        alertBox.style.display = 'flex';
        alertBox.className = 'license-alert-box alert-active';
      }
      if (alertIcon) alertIcon.textContent = '⏳';
      if (alertHeading) alertHeading.textContent = 'Bepul Sinov Rejimi Faol';
      if (alertText) {
        alertText.innerHTML = `
          Dasturdan har 6 soatda faqat <strong>30 daqiqa</strong> bepul foydalanish mumkin.
        `;
      }
      if (cooldownBox) cooldownBox.style.display = 'grid';
      if (premiumView) premiumView.style.display = 'none';
      if (activateSection) activateSection.style.display = 'block';
      if (contactCard) contactCard.style.display = 'block';
    }

    // Immediate countdown values calculation
    var currentNow = Date.now();
    var remainingWindowMs = Math.max(0, WINDOW_DURATION_MS - (currentNow - state.windowStart));
    var cooldownElem = document.getElementById('license-cooldown-countdown');
    if (cooldownElem) {
      cooldownElem.textContent = formatHHMMSS(remainingWindowMs);
    }
    var trialRemElem = document.getElementById('license-trial-remaining');
    if (trialRemElem) {
      var trialLeft = Math.max(0, MAX_TRIAL_SECONDS - state.elapsedSeconds);
      trialRemElem.textContent = formatMMSS(trialLeft);
    }
  }

  function updateStatusPill() {
    var pill = document.getElementById('license-status-pill');
    if (!pill) return;

    if (state.isActivated) {
      pill.className = 'license-status-pill pill-premium';
      pill.innerHTML = `
        <span class="license-pill-icon">👑</span>
        <span class="license-pill-text" id="license-pill-text">Premium (Faol)</span>
      `;
    } else if (state.isLocked) {
      pill.className = 'license-status-pill pill-locked';
      pill.innerHTML = `
        <span class="license-pill-icon">🔒</span>
        <span class="license-pill-text" id="license-pill-text">Vaqt tugadi (Qulflangan)</span>
      `;
    } else {
      var remainingSec = Math.max(0, MAX_TRIAL_SECONDS - state.elapsedSeconds);
      pill.className = 'license-status-pill pill-trial';
      if (remainingSec <= 120) {
        pill.classList.add('pill-warning');
      }
      pill.innerHTML = `
        <span class="license-pill-icon">⏳</span>
        <span class="license-pill-text" id="license-pill-text">Sinov: ${formatMMSS(remainingSec)} (6s / 30m)</span>
      `;
    }
  }

  // --- Trial Timer Loop ---
  function startTrialEngine() {
    var now = Date.now();

    if (!state.windowStart || (now - state.windowStart >= WINDOW_DURATION_MS)) {
      state.windowStart = now;
      state.elapsedSeconds = 0;
      state.isLocked = false;
      localStorage.setItem(STORAGE_KEYS.WINDOW_START, state.windowStart.toString());
      localStorage.setItem(STORAGE_KEYS.ELAPSED_SEC, '0');
      pushStateToServer();
    }

    if (state.elapsedSeconds >= MAX_TRIAL_SECONDS) {
      state.isLocked = true;
      updateStatusPill();
      openModal(true);
    } else {
      updateStatusPill();
    }

    if (state.timerInterval) clearInterval(state.timerInterval);

    state.timerInterval = setInterval(function () {
      if (state.isActivated) {
        clearInterval(state.timerInterval);
        return;
      }

      var currentNow = Date.now();
      if (currentNow - state.windowStart >= WINDOW_DURATION_MS) {
        state.windowStart = currentNow;
        state.elapsedSeconds = 0;
        state.isLocked = false;
        localStorage.setItem(STORAGE_KEYS.WINDOW_START, state.windowStart.toString());
        localStorage.setItem(STORAGE_KEYS.ELAPSED_SEC, '0');
        pushStateToServer();
        closeModal();
      }

      var remainingWindowMs = Math.max(0, WINDOW_DURATION_MS - (currentNow - state.windowStart));
      var cooldownElem = document.getElementById('license-cooldown-countdown');
      if (cooldownElem) {
        cooldownElem.textContent = formatHHMMSS(remainingWindowMs);
      }

      var trialRemElem = document.getElementById('license-trial-remaining');
      if (trialRemElem) {
        var trialLeft = Math.max(0, MAX_TRIAL_SECONDS - state.elapsedSeconds);
        trialRemElem.textContent = formatMMSS(trialLeft);
      }

      if (state.elapsedSeconds >= MAX_TRIAL_SECONDS) {
        if (!state.isLocked) {
          state.isLocked = true;
          openModal(true);
        }
        updateStatusPill();
        pushStateToServer();
        return;
      }

      state.elapsedSeconds += 1;
      localStorage.setItem(STORAGE_KEYS.ELAPSED_SEC, state.elapsedSeconds.toString());
      localStorage.setItem(STORAGE_KEYS.LAST_TICK, currentNow.toString());

      if (state.elapsedSeconds % 5 === 0 || state.elapsedSeconds >= MAX_TRIAL_SECONDS) {
        pushStateToServer();
      }

      updateStatusPill();

      if (state.elapsedSeconds >= MAX_TRIAL_SECONDS) {
        state.isLocked = true;
        openModal(true);
        pushStateToServer();
      }
    }, 1000);
  }

  // --- Miracle Cyber Splash Screen Controller ---
  function initSplashScreen() {
    var splash = document.getElementById('app-splash-screen');
    var bar = document.getElementById('splash-progress-bar');
    var status = document.getElementById('splash-status-text');
    if (!splash || !bar || !status) return;

    var steps = [
      { pct: 28, text: "⚡ Xavfsizlik moduli ishga tushirilmoqda...", delay: 200 },
      { pct: 58, text: "🛡️ 90 ta imtihon va PBQ savollari tayyorlanmoqda...", delay: 500 },
      { pct: 88, text: "🔒 IP litsenziya va xavfsizlik tekshiruvi...", delay: 900 },
      { pct: 100, text: "✨ Tizim tayyor! Xush kelibsiz.", delay: 1300 }
    ];

    steps.forEach(function (step) {
      setTimeout(function () {
        if (bar) bar.style.width = step.pct + '%';
        if (status) status.textContent = step.text;
      }, step.delay);
    });

    setTimeout(function () {
      splash.classList.add('fade-out');
      setTimeout(function () {
        if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
      }, 600);
    }, 1650);
  }

  // --- Reset to Trial Mode (Test / Admin / Clean) ---
  function resetToTrialMode() {
    state.isActivated = false;
    state.activeKey = '';
    state.windowStart = Date.now();
    state.elapsedSeconds = 0;
    state.isLocked = false;
    localStorage.setItem(STORAGE_KEYS.STATUS, 'TRIAL');
    localStorage.removeItem(STORAGE_KEYS.KEY);
    localStorage.setItem(STORAGE_KEYS.WINDOW_START, state.windowStart.toString());
    localStorage.setItem(STORAGE_KEYS.ELAPSED_SEC, '0');

    if (window.fetch) {
      fetch('/api/license-reset')
        .catch(function () {})
        .finally(function () {
          window.location.reload();
        });
    } else {
      window.location.reload();
    }
  }

  // --- Initialize on Page Load ---
  function init() {
    initSplashScreen();
    injectUI();
    detectPublicIp();

    syncWithServer(function () {
      if (state.isActivated && state.activeKey) {
        if (verifyKey(state.activeKey, state.clientIp)) {
          markAsActivated(state.activeKey);
          return;
        }
      }

      startTrialEngine();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.__SecurityPlusLicense__ = {
    computeKey: computeLicenseKey,
    verifyKey: verifyKey,
    getState: function () { return state; },
    activate: markAsActivated,
    resetToTrial: resetToTrialMode,
    simulateExpiration: function () {
      state.elapsedSeconds = MAX_TRIAL_SECONDS;
      state.isLocked = true;
      updateStatusPill();
      openModal(true);
      pushStateToServer();
    },
    resetTrialForDebug: resetToTrialMode
  };

})();
