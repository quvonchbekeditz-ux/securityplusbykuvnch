// CompTIA Security+ (SY0-701) Strategic Roadmap & 90-Question Exam Engine

// Universal External Browser Link Launcher (opens YouTube, Telegram, etc. in Default OS Browser)
window.openExternalUrl = function(url) {
  if (!url) return;
  try {
    if (window.pywebview && window.pywebview.api && window.pywebview.api.open_external_url) {
      window.pywebview.api.open_external_url(url);
      return;
    }
  } catch (e) {}

  fetch('/api/open-external?url=' + encodeURIComponent(url))
    .then(r => r.json())
    .catch(() => {
      window.open(url, '_blank');
    });
};

// Global link interception to open all external links in user's default browser
document.addEventListener('click', function(e) {
  const link = e.target.closest('a');
  if (!link) return;
  const href = link.getAttribute('href');
  if (href && (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:'))) {
    e.preventDefault();
    e.stopPropagation();
    window.openExternalUrl(href);
  }
}, true);

document.addEventListener('DOMContentLoaded', () => {
  try {
    // LocalStorage keys
  const STORAGE_KEY_PROGRESS = 'comptia_secplus_progress_v2';
  const STORAGE_KEY_NOTES = 'comptia_secplus_notes_v2';
  const STORAGE_KEY_LANG = 'comptia_secplus_lang_v2';
  const STORAGE_KEY_THEME = 'comptia_secplus_theme_v2';
  const STORAGE_KEY_EXAM = 'comptia_secplus_exam_v2';
  const STORAGE_KEY_PBQ = 'comptia_secplus_pbq_v2';

  let userProgress = JSON.parse(localStorage.getItem(STORAGE_KEY_PROGRESS) || '{}');
  let userNotes = JSON.parse(localStorage.getItem(STORAGE_KEY_NOTES) || '{}');
  let currentLang = localStorage.getItem(STORAGE_KEY_LANG) || 'en';
  let currentTheme = localStorage.getItem(STORAGE_KEY_THEME) || 'light';

  let currentSelectedTopicId = null;
  let connectorsVisible = true;
  let currentZoom = 1.0;

  // --- EXAM STATE MANAGEMENT (Dual Mode: Mock 90 vs Dumps 144) ---
  const STORAGE_KEY_EXAM_MOCK = 'comptia_secplus_exam_mock_v3';
  const STORAGE_KEY_EXAM_DUMPS = 'comptia_secplus_exam_dumps_v3';
  const STORAGE_KEY_ACTIVE_MODE = 'comptia_secplus_active_exam_mode';

  try {
    const legacyExam = localStorage.getItem('comptia_secplus_exam_v2');
    if (legacyExam && !localStorage.getItem(STORAGE_KEY_EXAM_MOCK)) {
      localStorage.setItem(STORAGE_KEY_EXAM_MOCK, legacyExam);
    }
  } catch (e) {}

  let currentExamMode = localStorage.getItem(STORAGE_KEY_ACTIVE_MODE) || 'mock'; // 'mock' or 'dumps'

  function getExamStorageKey(mode) {
    return mode === 'dumps' ? STORAGE_KEY_EXAM_DUMPS : STORAGE_KEY_EXAM_MOCK;
  }

  function getExamState(mode) {
    try {
      return JSON.parse(localStorage.getItem(getExamStorageKey(mode)) || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveExamStateForMode(mode, stateObj) {
    try {
      localStorage.setItem(getExamStorageKey(mode), JSON.stringify(stateObj));
    } catch (e) {
      console.error('Error saving exam state:', e);
    }
  }

  let examAnswers = {};
  let examFlags = {};
  let currentExamQIndex = 0;
  let examTimeRemaining = 90 * 60;
  let examTimerInterval = null;
  let examSubmitted = false;

  function loadExamStateForMode(mode) {
    currentExamMode = (mode === 'dumps') ? 'dumps' : 'mock';
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_MODE, currentExamMode);
    } catch (e) {}

    const data = getExamState(currentExamMode);
    examAnswers = data.answers || {};
    examFlags = data.flags || {};
    currentExamQIndex = (typeof data.currentIndex === 'number') ? data.currentIndex : 0;
    const defaultTime = (currentExamMode === 'dumps') ? (150 * 60) : (90 * 60);
    examTimeRemaining = (typeof data.timeRemaining === 'number') ? data.timeRemaining : defaultTime;
    examSubmitted = !!data.submitted;
  }

  loadExamStateForMode(currentExamMode);

  function saveExamState() {
    saveExamStateForMode(currentExamMode, {
      answers: examAnswers,
      flags: examFlags,
      currentIndex: currentExamQIndex,
      timeRemaining: examTimeRemaining,
      submitted: examSubmitted
    });
  }

  function getActiveQuestions() {
    if (currentExamMode === "dumps" && typeof REAL_EXAM_DUMPS !== "undefined") {
      return REAL_EXAM_DUMPS;
    }
    return EXAM_QUESTIONS;
  }

  // Current Port Trainer filter & search state
  let currentPortFilter = 'all';
  let currentPortSearch = '';

  // Current Port Mini Quiz State
  let currentQuizIndex = 0;
  let quizScore = { correct: 0, total: 0 };

  // --- BILINGUAL DICTIONARIES ---
  const DOMAINS_DATA = [
    {
      code: "Domain 1.0 (12%)",
      color: "#3b82f6",
      title_en: "General Security Concepts",
      title_uz: "Umumiy Xavfsizlik Konsepsiyalari",
      desc_en: "CIA Triad, AAA Framework, Security Control Types (Technical, Managerial, Operational), Cryptographic fundamentals (AES, RSA, ECC, SHA-256), PKI, and Zero Trust Architecture.",
      desc_uz: "CIA uchligi (Maxfiylik, Butunlik, Foydalana olishlik), AAA tizimi, Xavfsizlik nazorat turlari, Kriptografiya asoslari (AES, RSA, ECC, SHA-256), PKI va Zero Trust (Nol Ishonch) arxitekturasi."
    },
    {
      code: "Domain 2.0 (22%)",
      color: "#8b5cf6",
      title_en: "Threats, Vulnerabilities & Mitigations",
      title_uz: "Tahdidlar, Zaifliklar & Zararsizlantirish",
      desc_en: "Threat actors (APTs, Hacktivists, Insiders), Social Engineering (Phishing, Whaling, Vishing), Malware types (Ransomware, Worms, Rootkits), and Web attacks (SQLi, XSS, DDoS).",
      desc_uz: "Hujumchilar toifalari (APT guruhlar, Xaktivistlar, Ichki xodimlar), Ijtimoiy muhandislik (Fishing, Vishing), Zararli dasturlar (Ransomware, Worm, Rootkit) va Veb hujumlari (SQLi, XSS, DDoS)."
    },
    {
      code: "Domain 3.0 (18%)",
      color: "#10b981",
      title_en: "Security Architecture",
      title_uz: "Xavfsizlik Arxitekturasi",
      desc_en: "DMZ architecture, VLAN segmentation, Next-Gen Firewalls, IDS vs IPS, WAF, VPN tunneling, Cloud deployment models (IaaS, PaaS, SaaS), and CASB enforcement.",
      desc_uz: "DMZ hududi, VLAN segmentatsiyasi, Keyingi avlod fayrvollari (NGFW), IDS va IPS farqi, WAF, VPN tunnellari, Bulutli modellar (IaaS, PaaS, SaaS) va CASB nazorati."
    },
    {
      code: "Domain 4.0 (28% - LARGEST DOMAIN)",
      color: "#ef4444",
      title_en: "Security Operations",
      title_uz: "Xavfsizlik Operatsiyalari (Eng katta domen)",
      desc_en: "SIEM (Splunk) log correlation, SOAR playbooks, Wireshark packet capture analysis, Incident Response (NIST 4-step lifecycle), and Digital Forensics (Order of Volatility, Chain of Custody).",
      desc_uz: "SIEM log korrelyatsiyasi, SOAR playbooklari, Wireshark paketlar tahlili, Hodisalarni bartaraf etish (NIST 4 bosqichli tsikl) va Raqamli kriminalistika (Kritiklik ketma-ketligi, Saqlash zanjiri)."
    },
    {
      code: "Domain 5.0 (20%)",
      color: "#f59e0b",
      title_en: "Program Management & Oversight",
      title_uz: "Dastur Boshqaruvi va Nazorat",
      desc_en: "Risk calculation metrics (ALE = SLE x ARO), Business Continuity (RTO, RPO, Backup strategies), and Regulatory compliance (NIST CSF, ISO 27001, GDPR, HIPAA, PCI-DSS).",
      desc_uz: "Xavfni hisoblash metrikalari (ALE = SLE x ARO), Biznes barqarorligi (RTO, RPO, Zaxira strategiyalari) va Xalqaro standartlar hamda qonunlar (NIST CSF, ISO 27001, GDPR, HIPAA, PCI-DSS)."
    }
  ];

  const PBQ_DATA = {
    scenario_en: `<strong>Scenario:</strong> Your organization has a public Web Server (<code>192.168.1.50</code>) residing in a DMZ. External internet users must access the web server exclusively via encrypted HTTPS (Port 443). Insecure remote Telnet traffic must be strictly blocked, and all other unspecified traffic must be dropped by default.`,
    scenario_uz: `<strong>Stsenariy:</strong> Tashkilotingiz DMZ hududida ommaviy Web Server (<code>192.168.1.50</code>) joylashgan. Tashqi internet foydalanuvchilari ushbu serverga faqat shifrlangan HTTPS (Port 443) orqali ulanishi lozim. Xavfsiz bo'lmagan masofaviy Telnet trafigi qat'iy to'silishi, va boshqa barcha ko'rsatilmagan begona trafiklar avtomatik rad etilishi (Implicit Deny) kerak.`,
    tips_en: `
      <ul style="padding-left:20px; font-size:13px; line-height:1.6; color:#334155;">
        <li><strong>DO NOT solve PBQs at the start of the exam!</strong> When the test begins, questions 1 to 5 will be PBQs. They take 5–8 minutes each and can cause panic. Click <strong>"Flag for Review"</strong> and jump immediately to multiple-choice.</li>
        <li>Finish all multiple-choice questions in 45–50 minutes, leaving a full 40 minutes to comfortably work through PBQs.</li>
        <li>In firewall tables, the final rule must always be <code>DENY ANY ANY</code> (Implicit Deny).</li>
        <li>In Wi-Fi scenarios, always select <strong>WPA3-Enterprise</strong> or <strong>WPA3-Personal</strong>; WEP or WPA-TKIP are never correct modern solutions.</li>
      </ul>
    `,
    tips_uz: `
      <ul style="padding-left:20px; font-size:13px; line-height:1.6; color:#334155;">
        <li><strong>Imtihon boshida PBQ savollariga vaqt sarflamang!</strong> Imtihon boshlanganda 1-dan 5-gacha savollar PBQ (amaliy) bo'ladi. Ular har biri 5–8 daqiqa vaqt olib, asabiylashishga olib kelishi mumkin. Darhol <strong>"Flag for Review"</strong> tugmasini bosib, test savollariga o'ting.</li>
        <li>Barcha ko'p variantli savollarni 45–50 daqiqada tugatib, qolgan to'liq 40 daqiqani bemalol PBQ savollariga bag'ishlang.</li>
        <li>Fayrvol jadvallarida har doim eng oxirgi qoida <code>DENY ANY ANY</code> (Implicit Deny - Barcha qolganini to'sish) bo'lishi shart!</li>
        <li>Wi-Fi stsenariylarida doimo <strong>WPA3-Enterprise</strong> yoki <strong>WPA3-Personal</strong> tanlang; WEP yoki WPA-TKIP hech qachon to'g'ri zamonaviy yechim bo'lmaydi.</li>
      </ul>
    `,
    table_en: {
      rule: "Rule #",
      action: "Action",
      source: "Source",
      dest: "Destination",
      port: "Port / Protocol",
      desc: "Description",
      desc1: "Public Web Traffic",
      desc2: "Insecure Remote Access",
      desc3: "All Other Traffic (Implicit Deny)",
      btn: "Verify Rules ➜"
    },
    table_uz: {
      rule: "Qoida #",
      action: "Harakat (Action)",
      source: "Manba (Source)",
      dest: "Manzil (Destination)",
      port: "Port / Protokol",
      desc: "Tavsifi (Description)",
      desc1: "Ommaviy Veb Trafik",
      desc2: "Xavfli Masofaviy Ulanish",
      desc3: "Barcha Boshqa Trafik (Implicit Deny)",
      btn: "Qoidalarni Tekshirish ➜"
    }
  };

  const PORTS_UI_DATA = {
    en: {
      title: "Essential Ports and Protocols (SY0-701)",
      desc: "CompTIA Security+ requires you to know common ports for configuring firewalls, interpreting access logs, and identifying plaintext protocols.",
      filterAll: "All Ports (21)",
      filterSecure: "Secure / Encrypted",
      filterInsecure: "Insecure / Plaintext",
      searchPlaceholder: "Search port number or name (e.g., 443, SSH, DNS)...",
      quizHeading: "Interactive Knowledge & Port Quiz",
      quizNext: "Next Question ➜",
      quizRestart: "↺ Restart Quiz"
    },
    uz: {
      title: "Asosiy Portlar va Protokollar (SY0-701)",
      desc: "CompTIA Security+ imtihoni uchun fayrvollarni sozlash, xavfsizlik loglarini tahlil qilish va ochiq matnli protokollarni aniqlashda portlarni yoddan bilish shart.",
      filterAll: "Barcha Portlar (21)",
      filterSecure: "Xavfsiz / Shifrlangan",
      filterInsecure: "Xavfli / Ochiq Matn",
      searchPlaceholder: "Port raqami yoki nomini qidiring (masalan, 443, SSH, DNS)...",
      quizHeading: "Interaktiv Bilim va Portlar Viktorinasi",
      quizNext: "Keyingi Savol ➜",
      quizRestart: "↺ Qayta boshlash"
    }
  };

  const EXAM_UI_DATA = {
    en: {
      hubTitle: "CompTIA Security+ (SY0-701) Exam & Practice Center",
      hubDesc: "Select your desired test mode below. All answers, timers, and progress are independently saved for each mode.",
      mockTitle: "90-Question Official Mock Exam",
      mockDesc: "Complete simulation of the official international certification test. Includes 5 Performance-Based Questions (PBQ) + 85 scenario-based multiple choice.",
      mockSpecTime: "90 Minutes (Strict Timer)",
      mockSpecQ: "90 Questions (5 PBQ + 85 MCQ)",
      mockSpecPass: "Passing Score: 750 / 900 (83%)",
      dumpsTitle: "144 Real Exam Dumps Practice",
      dumpsDesc: "Authentic high-frequency exam questions extracted from CompTIA-SY0-701 2.pdf and Sybex 9th Edition Study Guide, featuring complete explanations and references.",
      dumpsSpecTime: "150 Minutes (2.5 Hours)",
      dumpsSpecQ: "144 Real Dumps Questions",
      dumpsSpecPass: "In-Depth Explanations for All Options",
      startMockBtn: "🚀 Start 90-Question Exam",
      startDumpsBtn: "📖 Practice 144 Real Exam Dumps",
      resultsTitle: "CompTIA Security+ SY0-701 Examination Score Report",
      reviewAnswersBtn: "Review All Answers & Explanations",
      retakeBtn: "Retake Exam",
      flagBtn: "Flag for Review",
      prevBtn: "◀ Previous",
      nextBtn: "Next ▶",
      reviewAllBtn: "Review All Questions",
      submitBtn: "Submit Exam ➜",
      backToHubBtn: "Main Menu (Menu)",
      resultBackToHub: "Main Menu / Select Exam"
    },
    uz: {
      hubTitle: "CompTIA Security+ (SY0-701) Imtihon va Test Markazi",
      hubDesc: "O'zingizga ma'qul bo'lgan test rejimini tanlang. Har ikkala rejimdagi natijalaringiz va javoblaringiz mustaqil saqlanadi.",
      mockTitle: "90 Savolli Rasmiy Sinov Imtihoni",
      mockDesc: "Xalqaro CompTIA Security+ imtihoni muhitini to'liq aks ettiruvchi rasmiy test. 5 ta amaliy PBQ moslashtirish va 85 ta vaziyatli testlar.",
      mockSpecTime: "90 Daqiqa (Qat'iy Taymer)",
      mockSpecQ: "90 ta Savol (5 PBQ + 85 MCQ)",
      mockSpecPass: "O'tish bali: 750 / 900 (83%)",
      dumpsTitle: "144 ta Real Exam Dumps Amaliyoti",
      dumpsDesc: "CompTIA-SY0-701 2.pdf hamda Sybex Study Guide kitobidan olingan 144 ta dolzarb va haqiqiy imtihon tushgan savollari bazasi.",
      dumpsSpecTime: "150 Daqiqa (2.5 Soat)",
      dumpsSpecQ: "144 ta Real Dumps Savollari",
      dumpsSpecPass: "Har bir variantga to'liq tahlil & izohlar",
      startMockBtn: "🚀 90 Savolli Imtihonni Boshlash",
      startDumpsBtn: "📖 144 ta Real Dumps Savollarini Ishlash",
      resultsTitle: "CompTIA Security+ SY0-701 Imtihon Natijalari Hisoboti",
      reviewAnswersBtn: "Barcha Savol & Javob Tahlilini Ko'rish",
      retakeBtn: "Imtihonni Qaytadan Topshirish",
      flagBtn: "Ko'rib chiqish uchun belgilash",
      prevBtn: "◀ Oldingi",
      nextBtn: "Keyingi ▶",
      reviewAllBtn: "Barcha Savollarni Ko'rish",
      submitBtn: "Imtihonni Yakunlash ➜",
      backToHubBtn: "Bosh menyu (Menu)",
      resultBackToHub: "Bosh menyu / Testni almashtirish"
    }
  };

  const NAV_UI_DATA = {
    en: {
      tabRoadmap: "Strategic Roadmap",
      tabExam: "Exam & Dumps Center (SY0-701)",
      tabPorts: "Ports & Protocols Trainer",
      tabPbq: "PBQ Simulator",
      tabDomains: "5 Exam Domains",
      tabPdf: "Official PDF Library",
      lanesTitle: "Lanes & Categories",
      targetBtn: "Set Target",
      drawerStatusHeading: "Learning Status:",
      btnStatusNotStarted: "Not Started",
      btnStatusInProgress: "In Progress",
      btnStatusMastered: "Mastered ✓",
      notesLabel: "📝 Personal Study Notes:",
      notesPlaceholder: "Type your personal notes for this topic (automatically saved)..."
    },
    uz: {
      tabRoadmap: "Strategik Yo'l Xaritasi",
      tabExam: "Imtihon & Dumps Markazi (SY0-701)",
      tabPorts: "Portlar & Protokollar Trenajyori",
      tabPbq: "PBQ Simulyatori",
      tabDomains: "5 Imtihon Domeni",
      tabPdf: "Rasmiy PDF Kutubxona",
      lanesTitle: "Yo'nalishlar & Qavatlar",
      targetBtn: "Maqsad Belgilash",
      drawerStatusHeading: "O'zlashtirish Holati:",
      btnStatusNotStarted: "Boshlanmagan",
      btnStatusInProgress: "O'rganilmoqda",
      btnStatusMastered: "O'zlashtirildi ✓",
      notesLabel: "📝 Shaxsiy O'quv Qaydlari:",
      notesPlaceholder: "Ushbu mavzu bo'yicha shaxsiy qaydlaringizni yozing (avtomatik saqlanadi)..."
    }
  };

  // --- INITIALIZE ENGINES ---
  initTheme();
  initLanguage();
  initNavigation();
  renderRoadmap();
  renderMilestones();
  updateProgressUI();
  initDetailDrawer();
  initPortTrainer();
  initPBQSimulator();
  renderDomains();
  initExamSimulator();
  initPDFLibrary();
  initFloatingToolbar();
  initRoadmapPhysics();

  // Initial draw of SVG connector physics lines after DOM layout stabilizes
  setTimeout(() => {
    renderConnectors();
  }, 250);

  window.addEventListener('resize', () => {
    renderMilestones();
    renderConnectors();
  });

  // --- THEME SYSTEM (DAY / NIGHT) ---
  function initTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }
    applyTheme(currentTheme);
  }

  function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem(STORAGE_KEY_THEME, currentTheme);

    const isDark = (currentTheme === 'dark');
    document.body.classList.toggle('dark-theme', isDark);

    const themeIcon = document.getElementById('theme-icon');
    const themeLabel = document.getElementById('theme-label');
    const toolbarThemeBtn = document.getElementById('btn-toolbar-theme');

    if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
    if (themeLabel) {
      themeLabel.textContent = isDark
        ? (currentLang === 'en' ? 'Light' : 'Kun')
        : (currentLang === 'en' ? 'Dark' : 'Tun');
    }
    if (toolbarThemeBtn) toolbarThemeBtn.textContent = isDark ? '☀️' : '🌙';

    setTimeout(renderConnectors, 80);
  }

  function toggleTheme() {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }

  function updateThemeLanguageUI() {
    const themeLabel = document.getElementById('theme-label');
    const isDark = (currentTheme === 'dark');
    if (themeLabel) {
      themeLabel.textContent = isDark
        ? (currentLang === 'en' ? 'Light' : 'Kun')
        : (currentLang === 'en' ? 'Dark' : 'Tun');
    }
  }

  // --- 1. UNIFIED BILINGUAL SYSTEM ---
  function initLanguage() {
    const btnEn = document.getElementById('lang-btn-en');
    const btnUz = document.getElementById('lang-btn-uz');
    if (btnEn) btnEn.addEventListener('click', () => setAppLanguage('en'));
    if (btnUz) btnUz.addEventListener('click', () => setAppLanguage('uz'));

    // Connect all section-level soft-uz buttons
    const sectionButtons = [
      'roadmap-lang-btn',
      'btn-toolbar-lang',
      'locked-exam-lang-btn',
      'exam-toggle-uz-btn',
      'results-exam-lang-btn',
      'port-translate-header-btn',
      'quiz-soft-uz-btn',
      'pbq-header-lang-btn',
      'pbq-soft-uz-btn',
      'pbq-tips-lang-btn',
      'domains-header-lang-btn',
      'drawer-soft-uz-btn',
      'pdf-header-lang-btn'
    ];

    sectionButtons.forEach(btnId => {
      const el = document.getElementById(btnId);
      if (el) {
        el.addEventListener('click', toggleAppLanguage);
      }
    });

    // Apply initial language state
    setAppLanguage(currentLang);
  }

  function setAppLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY_LANG, currentLang);

    // 1. Sync Header pills
    const btnEn = document.getElementById('lang-btn-en');
    const btnUz = document.getElementById('lang-btn-uz');
    if (btnEn) btnEn.classList.toggle('active', currentLang === 'en');
    if (btnUz) btnUz.classList.toggle('active', currentLang === 'uz');

    // 2. Sync all section-level soft-uz buttons
    const softUzButtons = [
      { btnId: 'roadmap-lang-btn', labelId: 'roadmap-lang-btn-label' },
      { btnId: 'locked-exam-lang-btn', labelId: 'locked-exam-lang-label' },
      { btnId: 'results-exam-lang-btn', labelId: 'results-exam-lang-label' },
      { btnId: 'port-translate-header-btn', labelId: 'port-header-lang-label' },
      { btnId: 'quiz-soft-uz-btn', labelId: 'quiz-soft-uz-label' },
      { btnId: 'pbq-header-lang-btn', labelId: 'pbq-header-lang-label' },
      { btnId: 'pbq-soft-uz-btn', labelId: 'pbq-soft-uz-label' },
      { btnId: 'pbq-tips-lang-btn', labelId: 'pbq-tips-lang-label' },
      { btnId: 'domains-header-lang-btn', labelId: 'domains-header-lang-label' },
      { btnId: 'drawer-soft-uz-btn', labelId: 'drawer-soft-uz-label' },
      { btnId: 'pdf-header-lang-btn', labelId: 'pdf-header-lang-label' }
    ];

    softUzButtons.forEach(item => {
      const btn = document.getElementById(item.btnId);
      const lbl = document.getElementById(item.labelId);
      if (btn) {
        btn.classList.toggle('active', currentLang === 'uz');
      }
      if (lbl) {
        lbl.textContent = currentLang === 'en' ? 'Soft UZ' : 'English';
      }
    });

    // Exam status bar button
    const examSoftUzBtn = document.getElementById('exam-toggle-uz-btn');
    const examTranslateLabel = document.getElementById('exam-translate-label');
    if (examSoftUzBtn && examTranslateLabel) {
      examSoftUzBtn.classList.toggle('active', currentLang === 'uz');
      examSoftUzBtn.style.background = currentLang === 'uz' ? '#0284c7' : '#334155';
      examTranslateLabel.textContent = currentLang === 'uz' ? 'English Only' : 'Soft UZ Translation';
    }

    // 3. Update Header & Navigation
    updateGlobalLanguageUI();
    updateTabsLanguageUI();

    // 4. Update Roadmap
    renderRoadmap();
    renderMilestones();
    setTimeout(renderConnectors, 100);

    // 5. Update Ports Trainer
    updatePortsLanguageUI();

    // 6. Update PBQ
    updatePBQLanguageUI();

    // 7. Update Domains
    renderDomains();

    // 8. Update Exam UI
    updateExamLanguageUI();

    // 8.1 Update PDF UI
    updatePDFLanguageUI();

    // 9. Update Drawer if open
    if (currentSelectedTopicId) {
      const topic = ROADMAP_DATA.topics.find(t => t.id === currentSelectedTopicId);
      if (topic) renderDrawerBody(topic);
    }

    // 10. Update Theme label language
    updateThemeLanguageUI();
  }

  function toggleAppLanguage() {
    setAppLanguage(currentLang === 'en' ? 'uz' : 'en');
  }

  function updateGlobalLanguageUI() {
    const mainTitle = document.getElementById('header-main-title');
    const subTitle = document.getElementById('header-sub-title');
    const lanesTitle = document.getElementById('label-lanes-title');

    if (currentLang === 'en') {
      if (mainTitle) mainTitle.textContent = 'Strategic Cybersecurity Roadmap';
      if (subTitle) subTitle.textContent = 'From Zero to Certified Cybersecurity Professional (SY0-701)';
      if (lanesTitle) lanesTitle.textContent = 'Lanes & Categories';
    } else {
      if (mainTitle) mainTitle.textContent = 'Strategik Kiberxavfsizlik Yo\'l Xaritasi';
      if (subTitle) subTitle.textContent = 'Noldan Professional Kiberxavfsizlik Mutaxassisligiga Qadar (SY0-701)';
      if (lanesTitle) lanesTitle.textContent = 'Yo\'nalishlar & Qavatlar';
    }

    updateProgressUI();
  }

  function updateTabsLanguageUI() {
    const d = NAV_UI_DATA[currentLang];
    const tabRoadmap = document.getElementById('tab-roadmap');
    const tabExam = document.getElementById('tab-exam');
    const tabPorts = document.getElementById('tab-ports');
    const tabPbq = document.getElementById('tab-pbq');
    const tabDomains = document.getElementById('tab-domains');
    const targetBtn = document.getElementById('btn-floating-target');

    if (tabRoadmap) tabRoadmap.textContent = d.tabRoadmap;
    if (tabExam) tabExam.textContent = d.tabExam;
    if (tabPorts) tabPorts.textContent = d.tabPorts;
    if (tabPbq) tabPbq.textContent = d.tabPbq;
    if (tabDomains) tabDomains.textContent = d.tabDomains;
    const tabPdf = document.getElementById('tab-pdf');
    if (tabPdf) tabPdf.textContent = d.tabPdf;
    if (targetBtn) targetBtn.innerHTML = `<span>+</span> ${d.targetBtn}`;

    // Splash subtitle
    const splashSub = document.getElementById('splash-subtitle');
    if (splashSub) {
      splashSub.textContent = currentLang === 'en'
        ? "Comprehensive 90-Question Exam, Real Dumps & PBQ Practice Suite"
        : "Barcha 90 ta rasmiy imtihon, real dumps va PBQ amaliyot tizimi";
    }

    // Quarters Headers
    const q1N = document.getElementById('quarter-name-q1');
    const q1D = document.getElementById('quarter-desc-q1');
    const q2N = document.getElementById('quarter-name-q2');
    const q2D = document.getElementById('quarter-desc-q2');
    const q3N = document.getElementById('quarter-name-q3');
    const q3D = document.getElementById('quarter-desc-q3');
    const q4N = document.getElementById('quarter-name-q4');
    const q4D = document.getElementById('quarter-desc-q4');

    if (currentLang === 'en') {
      if (q1N) q1N.textContent = "Q1 (Weeks 1-3)";
      if (q1D) q1D.textContent = "IT & Networking Foundation";
      if (q2N) q2N.textContent = "Q2 (Weeks 4-6)";
      if (q2D) q2D.textContent = "Domain 1.0 & 2.0 (Threats)";
      if (q3N) q3N.textContent = "Q3 (Weeks 7-9)";
      if (q3D) q3D.textContent = "Domain 3.0 & 4.0 (Operations)";
      if (q4N) q4N.textContent = "Q4 (Weeks 10-12)";
      if (q4D) q4D.textContent = "Domain 5.0, PBQ & Exam";
    } else {
      if (q1N) q1N.textContent = "1-Chorak (1-3 haftalar)";
      if (q1D) q1D.textContent = "IT va Tarmoq Asoslari";
      if (q2N) q2N.textContent = "2-Chorak (4-6 haftalar)";
      if (q2D) q2D.textContent = "1.0 & 2.0 Domenlar (Tahdidlar)";
      if (q3N) q3N.textContent = "3-Chorak (7-9 haftalar)";
      if (q3D) q3D.textContent = "3.0 & 4.0 Domenlar (Operatsiyalar)";
      if (q4N) q4N.textContent = "4-Chorak (10-12 haftalar)";
      if (q4D) q4D.textContent = "5.0 Domen, PBQ va Imtihon";
    }

    // Drawer labels
    const drawerStatusHeading = document.getElementById('drawer-status-heading');
    const btnStatusNotStarted = document.getElementById('btn-status-not_started');
    const btnStatusInProgress = document.getElementById('btn-status-in_progress');
    const btnStatusMastered = document.getElementById('btn-status-mastered');
    const drawerNotesLabel = document.getElementById('drawer-notes-label');
    const drawerNotesInput = document.getElementById('drawer-notes-input');

    if (drawerStatusHeading) drawerStatusHeading.textContent = d.drawerStatusHeading;
    if (btnStatusNotStarted) btnStatusNotStarted.textContent = d.btnStatusNotStarted;
    if (btnStatusInProgress) btnStatusInProgress.textContent = d.btnStatusInProgress;
    if (btnStatusMastered) btnStatusMastered.textContent = d.btnStatusMastered;
    if (drawerNotesLabel) drawerNotesLabel.textContent = d.notesLabel;
    if (drawerNotesInput) drawerNotesInput.placeholder = d.notesPlaceholder;
  }

  // --- 2. NAVIGATION TABS ---
  function initNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.getAttribute('data-target');
        document.querySelectorAll('.view-section').forEach(view => {
          view.style.display = 'none';
        });

        const activeView = document.getElementById(target);
        if (activeView) {
          activeView.style.display = 'flex';
          if (target === 'exam-view') {
            checkExamAccessState();
          } else if (target === 'roadmap-view') {
            setTimeout(() => {
              renderMilestones();
              renderConnectors();
            }, 100);
          }
        }
      });
    });
  }

  // --- 3. ROADMAP & MILESTONES RENDERING ---
  function renderMilestones() {
    const track = document.getElementById('milestones-track');
    const board = document.getElementById('roadmap-board');
    if (!track || !board) return;

    track.innerHTML = '';
    board.querySelectorAll('.milestone-guide-line').forEach(el => el.remove());

    const boardWidth = board.offsetWidth || 1250;
    const leftWidth = 270;
    const trackWidth = boardWidth - leftWidth;

    ROADMAP_DATA.milestones.forEach(m => {
      const pill = document.createElement('div');
      pill.className = 'milestone-pill';
      pill.style.left = `${m.posPercent}%`;
      pill.style.backgroundColor = m.color;
      const mTitle = currentLang === 'en' ? (m.title_en || m.title) : (m.title_uz || m.title);
      const mWeek = currentLang === 'en' ? (m.week_en || m.week) : (m.week_uz || m.week);
      pill.innerHTML = `<span>🚩</span> <strong>${mWeek}:</strong> ${mTitle}`;
      pill.title = mTitle;
      pill.style.cursor = 'pointer';

      // Vertical guide line across all swimlanes
      const line = document.createElement('div');
      line.className = 'milestone-guide-line';
      const lineLeft = leftWidth + (trackWidth * (m.posPercent / 100));
      line.style.left = `${lineLeft}px`;
      line.style.borderColor = m.color;
      board.appendChild(line);

      // Smooth scroll to milestone on click
      pill.addEventListener('click', () => {
        const scrollWrapper = document.getElementById('roadmap-scroll-wrapper');
        if (scrollWrapper) {
          scrollWrapper.scrollTo({
            left: Math.max(0, lineLeft - scrollWrapper.clientWidth / 2),
            behavior: 'smooth'
          });
          line.classList.add('milestone-pulse');
          setTimeout(() => line.classList.remove('milestone-pulse'), 1200);
        }
      });

      track.appendChild(pill);
    });
  }

  function renderRoadmap() {
    const container = document.getElementById('swimlanes-container');
    if (!container) return;

    container.innerHTML = '';

    ROADMAP_DATA.swimlanes.forEach(group => {
      const groupDiv = document.createElement('div');
      groupDiv.className = 'swimlane-group';

      const groupHeader = document.createElement('div');
      groupHeader.className = 'swimlane-category-header';
      groupHeader.textContent = currentLang === "en" ? (group.category_en || group.category) : (group.category_uz || group.category);
      groupDiv.appendChild(groupHeader);

      group.subcategories.forEach(sub => {
        const row = document.createElement('div');
        row.className = 'swimlane-row';

        const label = document.createElement('div');
        label.className = 'swimlane-label';
        const subName = currentLang === "en" ? (sub.name_en || sub.name) : (sub.name_uz || sub.name);
        label.innerHTML = `<span>${sub.icon || '📁'}</span> <span>${subName}</span>`;
        row.appendChild(label);

        const track = document.createElement('div');
        track.className = 'swimlane-track';

        ['q1', 'q2', 'q3', 'q4'].forEach(qid => {
          const slot = document.createElement('div');
          slot.className = 'track-quarter-slot';
          slot.id = `slot-${sub.id}-${qid}`;

          const matchingTopics = ROADMAP_DATA.topics.filter(
            t => t.subcategoryId === sub.id && t.quarter === qid
          );

          matchingTopics.forEach(topic => {
            const card = createTopicCard(topic);
            slot.appendChild(card);
          });

          track.appendChild(slot);
        });

        row.appendChild(track);
        groupDiv.appendChild(row);
      });

      container.appendChild(groupDiv);
    });
  }

  function createTopicCard(topic) {
    const card = document.createElement('div');
    const status = userProgress[topic.id] || topic.status || 'not_started';

    card.className = `topic-card status-${status}`;
    card.id = `card-${topic.id}`;
    card.setAttribute('data-topic-id', topic.id);

    const statusBadgeClass = `badge-${status}`;
    const statusText = status === 'mastered' ? (currentLang === 'en' ? 'Mastered' : 'O\'zlashtirildi') :
                       status === 'in_progress' ? (currentLang === 'en' ? 'In Progress' : 'O\'rganilmoqda') :
                       (currentLang === 'en' ? 'Not Started' : 'Boshlanmagan');

    const videoBtnHtml = topic.videoUrl ? `
      <a href="${topic.videoUrl}" target="_blank" rel="noopener noreferrer" class="card-video-btn" title="${topic.videoTitle || 'Watch Video'}" onclick="event.stopPropagation(); window.openExternalUrl && window.openExternalUrl('${topic.videoUrl}'); return false;">
        <span>▶️</span> Video
      </a>
    ` : '';

      const cardTitle = currentLang === 'en' ? (topic.title_en || topic.title) : (topic.title_uz || topic.title);
      const cardSummary = currentLang === 'en' ? (topic.summary_en || topic.summary) : (topic.summary_uz || topic.summary);
      card.innerHTML = `
      <div class="card-color-tag" style="background-color: ${topic.colorTag || '#3b82f6'};"></div>
      <div class="card-title-row">
        <span class="card-title">
          ${cardTitle}
          ${topic.hasSubLink ? '<span class="card-sub-arrow">↗</span>' : ''}
        </span>
      </div>
      <div class="card-summary">${cardSummary}</div>
      <div class="card-footer-row">
        <div class="card-footer-left">
          ${videoBtnHtml}
        </div>
        <div class="card-footer-right">
          <span class="card-status-badge ${statusBadgeClass}" id="badge-${topic.id}">${statusText}</span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      openDetailDrawer(topic);
    });

    // Hover highlighting of connected lines
    card.addEventListener('mouseenter', () => highlightConnectedPaths(topic.id, true));
    card.addEventListener('mouseleave', () => highlightConnectedPaths(topic.id, false));

    return card;
  }

  // --- 4. DYNAMIC SVG CONNECTOR LINES (PHYSICS / GRAPH) ---
  function renderConnectors() {
    const svg = document.getElementById('roadmap-connectors-svg');
    const board = document.getElementById('roadmap-board');
    if (!svg || !board || !connectorsVisible) {
      if (svg) svg.innerHTML = '';
      return;
    }

    const defs = svg.querySelector('defs');
    svg.innerHTML = '';
    if (defs) svg.appendChild(defs);

    const boardRect = board.getBoundingClientRect();
    svg.setAttribute('width', board.offsetWidth);
    svg.setAttribute('height', board.offsetHeight);

    const zoom = currentZoom || 1.0;
    ROADMAP_DATA.topics.forEach(sourceTopic => {
      if (!sourceTopic.dependencies || sourceTopic.dependencies.length === 0) return;

      const cardA = document.getElementById(`card-${sourceTopic.id}`);
      if (!cardA) return;

      const rectA = cardA.getBoundingClientRect();
      const x1 = (rectA.right - boardRect.left) / zoom;
      const y1 = (rectA.top + (rectA.height / 2) - boardRect.top) / zoom;

      sourceTopic.dependencies.forEach(targetId => {
        const cardB = document.getElementById(`card-${targetId}`);
        if (!cardB) return;

        const rectB = cardB.getBoundingClientRect();
        const x2 = (rectB.left - boardRect.left) / zoom;
        const y2 = (rectB.top + (rectB.height / 2) - boardRect.top) / zoom;

        // Smooth S-curve Bezier control points
        const deltaX = Math.abs(x2 - x1);
        const controlOffset = Math.max(30, deltaX * 0.45);
        const cx1 = x1 + controlOffset;
        const cy1 = y1;
        const cx2 = x2 - controlOffset;
        const cy2 = y2;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`);
        path.setAttribute('class', 'connector-path');
        path.setAttribute('id', `conn-${sourceTopic.id}-${targetId}`);
        path.setAttribute('data-source', sourceTopic.id);
        path.setAttribute('data-target', targetId);

        const strokeColor = sourceTopic.colorTag || '#2563eb';
        path.setAttribute('stroke', strokeColor);

        if (strokeColor.includes('10b981') || strokeColor.includes('059669')) {
          path.setAttribute('marker-end', 'url(#arrow-green)');
        } else if (strokeColor.includes('f59e0b') || strokeColor.includes('f97316')) {
          path.setAttribute('marker-end', 'url(#arrow-orange)');
        } else if (strokeColor.includes('8b5cf6') || strokeColor.includes('6366f1')) {
          path.setAttribute('marker-end', 'url(#arrow-purple)');
        } else {
          path.setAttribute('marker-end', 'url(#arrow-blue)');
        }

        svg.appendChild(path);
      });
    });
  }

  function highlightConnectedPaths(topicId, highlight) {
    const paths = document.querySelectorAll(`.connector-path[data-source="${topicId}"], .connector-path[data-target="${topicId}"]`);
    paths.forEach(p => {
      p.classList.toggle('highlighted', highlight);
      const sId = p.getAttribute('data-source');
      const tId = p.getAttribute('data-target');
      const sCard = document.getElementById(`card-${sId}`);
      const tCard = document.getElementById(`card-${tId}`);
      if (sCard && sId !== topicId) sCard.classList.toggle('card-connected-highlight', highlight);
      if (tCard && tId !== topicId) tCard.classList.toggle('card-connected-highlight', highlight);
    });
  }

  // --- 5. FLOATING TOOLBAR CONTROLS ---
  function initFloatingToolbar() {
    const toggleConnectorsBtn = document.getElementById('btn-toggle-connectors');
    const toggleCompactBtn = document.getElementById('btn-toggle-compact');
    const zoomInBtn = document.getElementById('btn-zoom-in');
    const zoomOutBtn = document.getElementById('btn-zoom-out');
    const snapBtn = document.getElementById('btn-snap-grid');
    const targetBtn = document.getElementById('btn-floating-target');
    const board = document.getElementById('roadmap-board');
    const scrollWrapper = document.getElementById('roadmap-scroll-wrapper');

    if (toggleConnectorsBtn) {
      toggleConnectorsBtn.addEventListener('click', () => {
        connectorsVisible = !connectorsVisible;
        toggleConnectorsBtn.classList.toggle('active', connectorsVisible);
        renderConnectors();
      });
    }

    if (toggleCompactBtn) {
      toggleCompactBtn.addEventListener('click', () => {
        const isCompact = board.classList.toggle('compact-view');
        toggleCompactBtn.classList.toggle('active', isCompact);
        document.querySelectorAll('.card-summary').forEach(el => {
          el.style.display = isCompact ? 'none' : '-webkit-box';
        });
        setTimeout(renderConnectors, 100);
      });
    }

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        if (currentZoom < 1.25) {
          currentZoom += 0.1;
          board.style.transform = `scale(${currentZoom})`;
          board.style.transformOrigin = 'top left';
          setTimeout(renderConnectors, 150);
        }
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        if (currentZoom > 0.8) {
          currentZoom -= 0.1;
          board.style.transform = `scale(${currentZoom})`;
          board.style.transformOrigin = 'top left';
          setTimeout(renderConnectors, 150);
        }
      });
    }

    if (snapBtn && scrollWrapper) {
      snapBtn.addEventListener('click', () => {
        const firstUnfinished = ROADMAP_DATA.topics.find(t => userProgress[t.id] !== 'mastered');
        if (firstUnfinished) {
          const slot = document.getElementById(`slot-${firstUnfinished.subcategoryId}-${firstUnfinished.quarter}`);
          if (slot) {
            slot.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          }
        }
      });
    }

    if (targetBtn) {
      targetBtn.addEventListener('click', () => {
        const promptMsg = currentLang === 'en'
          ? 'Daily Study Goal: How many topics do you plan to master today?'
          : 'Bugungi maqsad: nechta mavzuni o\'zlashtirmoqchisiz?';
        const goal = prompt(promptMsg, '2');
        if (goal) {
          const alertMsg = currentLang === 'en'
            ? `Goal accepted! Master ${goal} topics today and move one step closer to your CompTIA Security+ certification! 🚀`
            : `Maqsad qabul qilindi! Bugun ${goal} ta mavzuni o'zlashtirib, CompTIA Security+ sertifikatiga yanada yaqinlashing! 🚀`;
          alert(alertMsg);
        }
      });
    }

    const themeBtn = document.getElementById('btn-toolbar-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }
  }

  // --- ROADMAP PHYSICS & INTERACTIVE SCRUBBER ---
  function initRoadmapPhysics() {
    const scrollWrapper = document.getElementById('roadmap-scroll-wrapper');
    const board = document.getElementById('roadmap-board');
    const scrubTrack = document.querySelector('.scrub-track');
    const scrubSegment = document.getElementById('scrub-segment');
    const scrubHandleStart = document.getElementById('scrub-handle-start');
    const scrubHandleEnd = document.getElementById('scrub-handle-end');

    if (!scrollWrapper || !board) return;

    // 1. Dynamic sync of Scrubber position with Board horizontal scroll
    function updateScrubberFromScroll() {
      if (!scrubSegment) return;
      const maxScroll = scrollWrapper.scrollWidth - scrollWrapper.clientWidth;
      if (maxScroll <= 0) {
        scrubSegment.style.left = '0%';
        scrubSegment.style.width = '100%';
        if (scrubHandleStart) scrubHandleStart.style.left = '0%';
        if (scrubHandleEnd) scrubHandleEnd.style.left = '100%';
        return;
      }

      const ratio = scrollWrapper.scrollLeft / maxScroll;
      const visibleRatio = Math.min(1, Math.max(0.1, scrollWrapper.clientWidth / scrollWrapper.scrollWidth));
      const leftPercent = ratio * (1 - visibleRatio) * 100;
      const widthPercent = visibleRatio * 100;

      scrubSegment.style.left = `${leftPercent}%`;
      scrubSegment.style.width = `${widthPercent}%`;
      if (scrubHandleStart) scrubHandleStart.style.left = `${leftPercent}%`;
      if (scrubHandleEnd) scrubHandleEnd.style.left = `${leftPercent + widthPercent}%`;
    }

    scrollWrapper.addEventListener('scroll', updateScrubberFromScroll, { passive: true });
    setTimeout(updateScrubberFromScroll, 250);

    // 2. Click on scrubber track to smoothly scroll
    if (scrubTrack) {
      scrubTrack.style.cursor = 'pointer';
      scrubTrack.addEventListener('click', (e) => {
        const rect = scrubTrack.getBoundingClientRect();
        const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const maxScroll = scrollWrapper.scrollWidth - scrollWrapper.clientWidth;
        scrollWrapper.scrollTo({
          left: clickRatio * maxScroll,
          behavior: 'smooth'
        });
      });
    }

    // 3. Smooth Grab-to-Pan Physics on the Roadmap Board
    let isPanning = false;
    let startX = 0;
    let startY = 0;
    let scrollLeftStart = 0;
    let scrollTopStart = 0;
    let velocityX = 0;
    let velocityY = 0;
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    let momentumFrame = null;

    scrollWrapper.addEventListener('mousedown', (e) => {
      if (e.target.closest('.topic-card, button, a, input, select, textarea, .card-video-btn, .milestone-pill')) {
        return;
      }
      isPanning = true;
      scrollWrapper.style.cursor = 'grabbing';
      scrollWrapper.style.userSelect = 'none';

      if (momentumFrame) cancelAnimationFrame(momentumFrame);

      startX = e.pageX;
      startY = e.pageY;
      lastX = e.pageX;
      lastY = e.pageY;
      lastTime = performance.now();
      scrollLeftStart = scrollWrapper.scrollLeft;
      scrollTopStart = scrollWrapper.scrollTop;
      velocityX = 0;
      velocityY = 0;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isPanning) return;
      const dx = e.pageX - startX;
      const dy = e.pageY - startY;

      scrollWrapper.scrollLeft = scrollLeftStart - dx;
      scrollWrapper.scrollTop = scrollTopStart - dy;

      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      velocityX = (e.pageX - lastX) / dt;
      velocityY = (e.pageY - lastY) / dt;
      lastX = e.pageX;
      lastY = e.pageY;
      lastTime = now;
    });

    window.addEventListener('mouseup', () => {
      if (!isPanning) return;
      isPanning = false;
      scrollWrapper.style.cursor = 'grab';
      scrollWrapper.style.removeProperty('user-select');

      function applyMomentum() {
        if (Math.abs(velocityX) > 0.04 || Math.abs(velocityY) > 0.04) {
          scrollWrapper.scrollLeft -= velocityX * 12;
          scrollWrapper.scrollTop -= velocityY * 12;
          velocityX *= 0.88;
          velocityY *= 0.88;
          momentumFrame = requestAnimationFrame(applyMomentum);
        }
      }
      applyMomentum();
    });

    scrollWrapper.style.cursor = 'grab';
  }

  // --- 6. DETAIL DRAWER ---
  function initDetailDrawer() {
    const closeBtn = document.getElementById('close-drawer-btn');
    const backdrop = document.getElementById('drawer-backdrop');
    const notesInput = document.getElementById('drawer-notes-input');

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    ['not_started', 'in_progress', 'mastered'].forEach(st => {
      const btn = document.getElementById(`btn-status-${st}`);
      if (btn) {
        btn.addEventListener('click', () => {
          if (!currentSelectedTopicId) return;
          setTopicStatus(currentSelectedTopicId, st);
          updateStatusButtonsUI(st);
        });
      }
    });

    if (notesInput) {
      notesInput.addEventListener('input', (e) => {
        if (!currentSelectedTopicId) return;
        userNotes[currentSelectedTopicId] = e.target.value;
        localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(userNotes));
      });
    }
  }

  function openDetailDrawer(topic) {
    currentSelectedTopicId = topic.id;
    const drawer = document.getElementById('detail-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    const title = document.getElementById('drawer-title');
    const notesInput = document.getElementById('drawer-notes-input');

    if (!drawer || !title) return;

    title.textContent = currentLang === "en" ? (topic.title_en || topic.title) : (topic.title_uz || topic.title);
    renderDrawerBody(topic);
    updateStatusButtonsUI(userProgress[topic.id] || 'not_started');

    if (notesInput) {
      notesInput.value = userNotes[topic.id] || '';
    }

    drawer.classList.add('open');
    backdrop.classList.add('open');
  }

  function renderDrawerBody(topic) {
    const body = document.getElementById('drawer-content-area');
    const title = document.getElementById('drawer-title');
    if (title) {
      title.textContent = currentLang === 'en' ? (topic.title_en || topic.title) : (topic.title_uz || topic.title);
    }
    if (!body) return;

    const rawContent = currentLang === 'en' ? (topic.details_en || topic.details) : (topic.details_uz || topic.details);
    const formattedContent = formatSimpleMarkdown(rawContent);
    const tipTitle = currentLang === 'en' ? "💡 CompTIA Exam Pro Tip:" : "💡 CompTIA Imtihon Maslahati:";
    const tipText = (currentLang === 'en') ? (topic.examTips_en || topic.examTips) : (topic.examTips_uz || topic.examTips);

    const domainText = currentLang === 'en' ? (topic.domain_en || 'Security Domain') : (topic.domain_uz || 'Xavfsizlik Domeni');
    const durationText = currentLang === 'en' ? (topic.duration_en || '1 Week') : (topic.duration_uz || '1 Hafta');
    const quarterText = topic.quarter ? topic.quarter.toUpperCase() : 'Q1';
    const summaryText = currentLang === 'en' ? (topic.summary_en || topic.summary || '') : (topic.summary_uz || topic.summary || '');

    const videoBannerHtml = topic.videoUrl ? `
      <div class="drawer-video-banner">
        <div class="drawer-video-info">
          <span class="drawer-video-channel">📺 ${topic.videoChannel || 'YouTube Video Darslik'}</span>
          <span class="drawer-video-title">${topic.videoTitle || topic.title}</span>
        </div>
        <a href="${topic.videoUrl}" target="_blank" rel="noopener noreferrer" class="drawer-video-action-btn" onclick="event.stopPropagation(); window.openExternalUrl && window.openExternalUrl('${topic.videoUrl}'); return false;">
          <span>▶️</span> ${currentLang === 'en' ? 'Watch on YouTube' : "YouTube'da Ko'rish"}
        </a>
      </div>
    ` : '';

    const bookLinkHtml = `
      <div class="drawer-book-link-box">
        <div style="font-size:24px;line-height:1;">📚</div>
        <div style="flex:1;">
          <div style="font-weight:700;font-size:13px;color:#0369a1;margin-bottom:2px;">
            ${currentLang === 'en' ? 'Official Reference Books & Practice Dumps:' : "Rasmiy Darslik va Imtihon Testlari:"}
          </div>
          <div style="font-size:11.5px;color:#0c4a6e;line-height:1.4;">
            ${currentLang === 'en' 
              ? 'Read detailed chapters in the built-in PDF reader directly inside this app.' 
              : "Dastur ichidagi qulay PDF o'quvchida kitoblarni ochib, chuqurroq o'rganing."}
          </div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button type="button" class="drawer-book-btn" onclick="window.openEmbeddedPdfReader && window.openEmbeddedPdfReader('guide')">
            📖 ${currentLang === 'en' ? 'Sybex 9th Ed (993 p)' : 'Sybex Kitob (993 b)'}
          </button>
          <button type="button" class="drawer-book-btn" style="background:#4f46e5;" onclick="window.openEmbeddedPdfReader && window.openEmbeddedPdfReader('dumps')">
            🎯 ${currentLang === 'en' ? 'Exam Dumps (279 p)' : 'Testlar (279 b)'}
          </button>
        </div>
      </div>
    `;

    const summaryHtml = summaryText ? `
      <div class="drawer-summary-box">
        ${summaryText}
      </div>
    ` : '';

    const tipHtml = tipText ? `
      <div class="exam-tip-box" style="margin-top:20px;">
        <strong>${tipTitle}</strong>
        <p>${tipText}</p>
      </div>
    ` : '';

    body.innerHTML = `
      <div class="drawer-content">
        <div class="drawer-meta-pills">
          <span class="drawer-pill quarter">📅 ${quarterText}</span>
          <span class="drawer-pill domain">🛡️ ${domainText}</span>
          <span class="drawer-pill duration">⏱️ ${durationText}</span>
        </div>
        ${summaryHtml}
        ${bookLinkHtml}
        ${videoBannerHtml}
        <div class="drawer-markdown-body">
          ${formattedContent}
        </div>
        ${tipHtml}
      </div>
    `;
  }

  function closeDrawer() {
    const drawer = document.getElementById('detail-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  }

  function updateStatusButtonsUI(status) {
    ['not_started', 'in_progress', 'mastered'].forEach(st => {
      const btn = document.getElementById(`btn-status-${st}`);
      if (!btn) return;
      btn.className = 'status-btn';
      if (st === status) {
        btn.classList.add(`active-${st}`);
      }
    });
  }

  function setTopicStatus(topicId, status) {
    userProgress[topicId] = status;
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(userProgress));

    const card = document.getElementById(`card-${topicId}`);
    const badge = document.getElementById(`badge-${topicId}`);

    if (card) card.className = `topic-card status-${status}`;
    if (badge) {
      badge.className = `card-status-badge badge-${status}`;
      badge.textContent = status === 'mastered' ? (currentLang === 'en' ? 'Mastered' : 'O\'zlashtirildi') : 
                          status === 'in_progress' ? (currentLang === 'en' ? 'In Progress' : 'O\'rganilmoqda') : 
                          (currentLang === 'en' ? 'Not Started' : 'Boshlanmagan');
    }

    updateProgressUI();
  }

  function updateProgressUI() {
    const total = ROADMAP_DATA.topics.length;
    let score = 0;
    let masteredCount = 0;

    ROADMAP_DATA.topics.forEach(t => {
      const st = userProgress[t.id] || 'not_started';
      if (st === 'mastered') {
        score += 1;
        masteredCount += 1;
      } else if (st === 'in_progress') {
        score += 0.5;
      }
    });

    const percent = Math.round((score / total) * 100);
    const fill = document.getElementById('progress-bar-fill');
    const percentLabel = document.getElementById('progress-percent-label');
    const countLabel = document.getElementById('progress-count-label');

    if (fill) fill.style.width = `${percent}%`;
    if (percentLabel) percentLabel.textContent = `${percent}%`;
    if (countLabel) {
      countLabel.textContent = currentLang === 'en' 
        ? `${masteredCount}/${total} topics mastered`
        : `${masteredCount}/${total} mavzu o'zlashtirildi`;
    }
  }

  function formatSimpleMarkdown(text) {
    if (!text) return '';
    let html = text.replace(/\r\n/g, '\n');

    // Code blocks ``` ... ```
    html = html.replace(/```([a-z]*)\n([\s\S]*?)```/gim, '<pre style="background:#1e293b;color:#f8fafc;padding:12px;border-radius:6px;overflow-x:auto;font-family:monospace;font-size:12.5px;margin:12px 0;"><code>$2</code></pre>');

    // Inline code `...`
    html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');

    // Headers
    html = html.replace(/^#### (.*$)/gim, '<h4 class="drawer-h4">$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3 class="drawer-h3">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="drawer-h2">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="drawer-h1">$1</h1>');

    // Horizontal rule
    html = html.replace(/^---$/gim, '<hr class="drawer-divider">');

    // Blockquotes: group consecutive lines starting with >
    html = html.replace(/(?:^>.*(?:\n|$))+/gim, function(match) {
      const lines = match.split('\n')
        .map(l => l.replace(/^>\s?/, '').trim())
        .filter(l => l.length > 0)
        .join('<br>');
      return `<blockquote class="drawer-quote">${lines}</blockquote>`;
    });

    // Bold and Italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // Lists: - or * or 1.
    html = html.replace(/^[\*\-]\s+(.*$)/gim, '<li class="drawer-li">$1</li>');
    html = html.replace(/^\d+\.\s+(.*$)/gim, '<li class="drawer-li">$1</li>');
    html = html.replace(/((?:<li class="drawer-li">.*?<\/li>\s*)+)/gims, '<ul class="drawer-ul">$1</ul>');

    // Paragraph breaks
    html = html.replace(/\n\n+/g, '<br><br>');
    html = html.replace(/\n/g, '<br>');

    // Clean up excessive <br> before or after block elements
    html = html.replace(/<br>\s*<(h[1-4]|ul|ol|blockquote|hr|pre)/gim, '<$1');
    html = html.replace(/<\/(h[1-4]|ul|ol|blockquote|hr|pre)>\s*<br>/gim, '</$1>');

    return html;
  }

  // --- 7. EXAM SIMULATOR & HUB ENGINE (SY0-701) ---
  function initExamSimulator() {
    const startMockBtn = document.getElementById('start-exam-now-btn');
    const startDumpsBtn = document.getElementById('start-dumps-exam-btn');
    const viewMockResultBtn = document.getElementById('hub-view-mock-result-btn');
    const viewDumpsResultBtn = document.getElementById('hub-view-dumps-result-btn');
    const resetMockBtn = document.getElementById('hub-reset-mock-btn');
    const resetDumpsBtn = document.getElementById('hub-reset-dumps-btn');

    const backToHubBtn = document.getElementById('exam-back-to-hub-btn');
    const resultBackToHubBtn = document.getElementById('result-back-to-hub-btn');

    const prevBtn = document.getElementById('exam-prev-btn');
    const nextBtn = document.getElementById('exam-next-btn');
    const flagBtn = document.getElementById('current-q-flag-btn');
    const finishBtn = document.getElementById('exam-finish-btn');
    const reviewBtn = document.getElementById('exam-review-btn');
    const retakeBtn = document.getElementById('result-retake-btn');
    const reviewAnswersBtn = document.getElementById('result-review-answers-btn');

    if (startMockBtn) {
      startMockBtn.addEventListener('click', () => {
        startActiveExam('mock');
      });
    }

    if (startDumpsBtn) {
      startDumpsBtn.addEventListener('click', () => {
        startActiveExam('dumps');
      });
    }

    if (viewMockResultBtn) {
      viewMockResultBtn.addEventListener('click', () => {
        viewExamResultsForMode('mock');
      });
    }

    if (viewDumpsResultBtn) {
      viewDumpsResultBtn.addEventListener('click', () => {
        viewExamResultsForMode('dumps');
      });
    }

    if (resetMockBtn) {
      resetMockBtn.addEventListener('click', () => {
        resetExamForMode('mock');
      });
    }

    if (resetDumpsBtn) {
      resetDumpsBtn.addEventListener('click', () => {
        resetExamForMode('dumps');
      });
    }

    if (backToHubBtn) {
      backToHubBtn.addEventListener('click', () => {
        if (!examSubmitted) {
          const confirmMsg = currentLang === 'en'
            ? 'Exam timer will be paused and all your answers will be saved.\n\nDo you want to return to the Exam Center Menu?'
            : 'Test vaqti to\'xtatiladi va barcha javoblaringiz saqlanadi.\n\nBosh menyuga (test rejimini tanlashga) qaytishni xohlaysizmi?';
          if (confirm(confirmMsg)) {
            showExamHub();
          }
        } else {
          showExamHub();
        }
      });
    }

    if (resultBackToHubBtn) {
      resultBackToHubBtn.addEventListener('click', () => {
        showExamHub();
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => navigateExamQuestion(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateExamQuestion(1));
    if (flagBtn) flagBtn.addEventListener('click', toggleCurrentQuestionFlag);
    if (finishBtn) finishBtn.addEventListener('click', submitExamConfirmation);
    if (reviewBtn) reviewBtn.addEventListener('click', jumpToFirstUnansweredOrFlagged);

    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        const confirmMsg = currentLang === 'en'
          ? 'Are you sure you want to retake this exam from the beginning?'
          : 'Haqiqatdan ham ushbu testni boshidan qaytadan topshirmoqchimisiz?';
        if (confirm(confirmMsg)) {
          examAnswers = {};
          examFlags = {};
          currentExamQIndex = 0;
          examTimeRemaining = currentExamMode === 'dumps' ? (150 * 60) : (90 * 60);
          examSubmitted = false;
          saveExamState();
          startActiveExam(currentExamMode);
        }
      });
    }

    if (reviewAnswersBtn) {
      reviewAnswersBtn.addEventListener('click', renderFullAnswersReview);
    }
  }

  function showExamHub() {
    if (examTimerInterval) {
      clearInterval(examTimerInterval);
      examTimerInterval = null;
      saveExamState();
    }

    const hubScreen = document.getElementById('exam-locked-screen');
    const activeScreen = document.getElementById('exam-active-screen');
    const resultsScreen = document.getElementById('exam-results-screen');

    if (activeScreen) activeScreen.style.display = 'none';
    if (resultsScreen) resultsScreen.style.display = 'none';
    if (hubScreen) hubScreen.style.display = 'flex';

    updateExamHubUI();
  }

  function viewExamResultsForMode(mode) {
    loadExamStateForMode(mode);
    const hubScreen = document.getElementById('exam-locked-screen');
    const activeScreen = document.getElementById('exam-active-screen');
    const resultsScreen = document.getElementById('exam-results-screen');
    if (hubScreen) hubScreen.style.display = 'none';
    if (activeScreen) activeScreen.style.display = 'none';
    if (resultsScreen) resultsScreen.style.display = 'block';
    submitExam(true);
  }

  function resetExamForMode(mode) {
    const isUz = (currentLang === 'uz');
    const modeName = mode === 'dumps' ? (isUz ? '144 ta Real Dumps' : '144 Real Dumps') : (isUz ? '90 talik Rasmiy Imtihon' : '90-Question Mock');
    const confirmMsg = isUz
      ? `Haqiqatdan ham ${modeName} testining barcha javoblarini tozalab, qaytadan boshlamoqchimisiz?`
      : `Are you sure you want to reset all answers and timer for the ${modeName} exam?`;

    if (!confirm(confirmMsg)) return;

    saveExamStateForMode(mode, {
      answers: {},
      flags: {},
      currentIndex: 0,
      timeRemaining: mode === 'dumps' ? (150 * 60) : (90 * 60),
      submitted: false
    });

    if (currentExamMode === mode) {
      examAnswers = {};
      examFlags = {};
      currentExamQIndex = 0;
      examTimeRemaining = mode === 'dumps' ? (150 * 60) : (90 * 60);
      examSubmitted = false;
    }

    updateExamHubUI();
  }

  function updateExamHubUI() {
    const isUz = (currentLang === 'uz');
    const d = EXAM_UI_DATA[currentLang];

    // Card 1: Mock State
    const mockData = getExamState('mock');
    const mockAnsCount = Object.keys(mockData.answers || {}).length;
    const mockSubmitted = !!mockData.submitted;

    const mockBox = document.getElementById('hub-mock-status-box');
    const mockLabel = document.getElementById('hub-mock-status-label');
    const mockDetail = document.getElementById('hub-mock-status-detail');
    const startMockBtn = document.getElementById('start-exam-now-btn');
    const viewMockResultBtn = document.getElementById('hub-view-mock-result-btn');
    const resetMockBtn = document.getElementById('hub-reset-mock-btn');

    if (mockBox && mockLabel && mockDetail && startMockBtn) {
      if (mockSubmitted) {
        mockBox.className = 'hub-status-box completed';
        mockLabel.textContent = isUz ? 'Holat: Tugallangan (Completed)' : 'Status: Completed';
        mockDetail.textContent = isUz ? 'Rasmiy natijalar hisoboti mavjud' : 'Official score report is ready';
        startMockBtn.textContent = isUz ? '🔄 Testni Qaytadan Topshirish' : '🔄 Retake 90-Question Exam';
        if (viewMockResultBtn) {
          viewMockResultBtn.style.display = 'inline-block';
          viewMockResultBtn.textContent = isUz ? '📊 Natijani Ko\'rish' : '📊 View Score Report';
        }
        if (resetMockBtn) {
          resetMockBtn.style.display = 'inline-block';
          resetMockBtn.textContent = isUz ? '🗑️ Qayta O\'rnatish' : '🗑️ Reset';
        }
      } else if (mockAnsCount > 0) {
        mockBox.className = 'hub-status-box active';
        mockLabel.textContent = isUz ? 'Holat: Jarayonda (In Progress)' : 'Status: In Progress';
        const qIdx = (mockData.currentIndex || 0) + 1;
        mockDetail.textContent = isUz 
          ? `${mockAnsCount} / 90 javob berildi • Savol ${qIdx}` 
          : `${mockAnsCount} / 90 answered • Question ${qIdx}`;
        startMockBtn.textContent = isUz ? `▶ Davom Ettirish (Savol ${qIdx}) ➜` : `▶ Resume Exam (Question ${qIdx}) ➜`;
        if (viewMockResultBtn) viewMockResultBtn.style.display = 'none';
        if (resetMockBtn) {
          resetMockBtn.style.display = 'inline-block';
          resetMockBtn.textContent = isUz ? '🗑️ Tozalash' : '🗑️ Reset';
        }
      } else {
        mockBox.className = 'hub-status-box';
        mockLabel.textContent = isUz ? 'Holat: Boshlashga Tayyor' : 'Status: Ready to Start';
        mockDetail.textContent = isUz ? 'Hali boshlanmagan' : 'Not started yet';
        startMockBtn.textContent = d.startMockBtn;
        if (viewMockResultBtn) viewMockResultBtn.style.display = 'none';
        if (resetMockBtn) resetMockBtn.style.display = 'none';
      }
    }

    // Card 2: Dumps State
    const dumpsData = getExamState('dumps');
    const dumpsAnsCount = Object.keys(dumpsData.answers || {}).length;
    const dumpsSubmitted = !!dumpsData.submitted;

    const dumpsBox = document.getElementById('hub-dumps-status-box');
    const dumpsLabel = document.getElementById('hub-dumps-status-label');
    const dumpsDetail = document.getElementById('hub-dumps-status-detail');
    const startDumpsBtn = document.getElementById('start-dumps-exam-btn');
    const viewDumpsResultBtn = document.getElementById('hub-view-dumps-result-btn');
    const resetDumpsBtn = document.getElementById('hub-reset-dumps-btn');

    if (dumpsBox && dumpsLabel && dumpsDetail && startDumpsBtn) {
      if (dumpsSubmitted) {
        dumpsBox.className = 'hub-status-box dumps completed';
        dumpsLabel.textContent = isUz ? 'Holat: Tugallangan (Completed)' : 'Status: Completed';
        dumpsDetail.textContent = isUz ? '144 Dumps natijalar hisoboti mavjud' : '144 Dumps score report is ready';
        startDumpsBtn.textContent = isUz ? '🔄 Dumps Testini Qayta Topshirish' : '🔄 Retake 144 Dumps Practice';
        if (viewDumpsResultBtn) {
          viewDumpsResultBtn.style.display = 'inline-block';
          viewDumpsResultBtn.textContent = isUz ? '📊 Natijani Ko\'rish' : '📊 View Score Report';
        }
        if (resetDumpsBtn) {
          resetDumpsBtn.style.display = 'inline-block';
          resetDumpsBtn.textContent = isUz ? '🗑️ Qayta O\'rnatish' : '🗑️ Reset';
        }
      } else if (dumpsAnsCount > 0) {
        dumpsBox.className = 'hub-status-box dumps active';
        dumpsLabel.textContent = isUz ? 'Holat: Jarayonda (In Progress)' : 'Status: In Progress';
        const qIdx = (dumpsData.currentIndex || 0) + 1;
        dumpsDetail.textContent = isUz 
          ? `${dumpsAnsCount} / 144 javob berildi • Savol ${qIdx}` 
          : `${dumpsAnsCount} / 144 answered • Question ${qIdx}`;
        startDumpsBtn.textContent = isUz ? `▶ Davom Ettirish (Savol ${qIdx}) ➜` : `▶ Resume Dumps (Question ${qIdx}) ➜`;
        if (viewDumpsResultBtn) viewDumpsResultBtn.style.display = 'none';
        if (resetDumpsBtn) {
          resetDumpsBtn.style.display = 'inline-block';
          resetDumpsBtn.textContent = isUz ? '🗑️ Tozalash' : '🗑️ Reset';
        }
      } else {
        dumpsBox.className = 'hub-status-box dumps';
        dumpsLabel.textContent = isUz ? 'Holat: Boshlashga Tayyor' : 'Status: Ready to Practice';
        dumpsDetail.textContent = isUz ? 'Hali boshlanmagan' : 'Not started yet';
        startDumpsBtn.textContent = d.startDumpsBtn;
        if (viewDumpsResultBtn) viewDumpsResultBtn.style.display = 'none';
        if (resetDumpsBtn) resetDumpsBtn.style.display = 'none';
      }
    }
  }

  function updateExamLanguageUI() {
    const d = EXAM_UI_DATA[currentLang];
    
    // Hub screen texts
    const lockedTitle = document.getElementById('locked-exam-title');
    const lockedDesc = document.getElementById('locked-exam-desc');
    if (lockedTitle) lockedTitle.textContent = d.hubTitle;
    if (lockedDesc) lockedDesc.innerHTML = d.hubDesc;

    const mockTitle = document.getElementById('hub-mock-title');
    const mockDesc = document.getElementById('hub-mock-desc');
    const mockTime = document.getElementById('hub-mock-spec-time');
    const mockQ = document.getElementById('hub-mock-spec-q');
    const mockPass = document.getElementById('hub-mock-spec-pass');
    if (mockTitle) mockTitle.textContent = d.mockTitle;
    if (mockDesc) mockDesc.textContent = d.mockDesc;
    if (mockTime) mockTime.textContent = d.mockSpecTime;
    if (mockQ) mockQ.textContent = d.mockSpecQ;
    if (mockPass) mockPass.textContent = d.mockSpecPass;

    const dumpsTitle = document.getElementById('hub-dumps-title');
    const dumpsDesc = document.getElementById('hub-dumps-desc');
    const dumpsTime = document.getElementById('hub-dumps-spec-time');
    const dumpsQ = document.getElementById('hub-dumps-spec-q');
    const dumpsPass = document.getElementById('hub-dumps-spec-pass');
    if (dumpsTitle) dumpsTitle.textContent = d.dumpsTitle;
    if (dumpsDesc) dumpsDesc.textContent = d.dumpsDesc;
    if (dumpsTime) dumpsTime.textContent = d.dumpsSpecTime;
    if (dumpsQ) dumpsQ.textContent = d.dumpsSpecQ;
    if (dumpsPass) dumpsPass.textContent = d.dumpsSpecPass;

    updateExamHubUI();

    // Active screen navigation
    const backBtn = document.getElementById('exam-back-hub-label');
    const prevBtn = document.getElementById('exam-prev-btn');
    const nextBtn = document.getElementById('exam-next-btn');
    const reviewBtn = document.getElementById('exam-review-btn');
    const finishBtn = document.getElementById('exam-finish-btn');
    const flagBtn = document.getElementById('current-q-flag-btn');

    if (backBtn) backBtn.textContent = d.backToHubBtn;
    if (prevBtn) prevBtn.textContent = d.prevBtn;
    if (nextBtn) nextBtn.textContent = d.nextBtn;
    if (reviewBtn) reviewBtn.textContent = d.reviewAllBtn;
    if (finishBtn) finishBtn.textContent = d.submitBtn;

    const activeQs = getActiveQuestions();
    if (flagBtn && activeQs[currentExamQIndex]) {
      const isFlagged = !!examFlags[activeQs[currentExamQIndex].id];
      flagBtn.innerHTML = `<span>🚩</span> ${d.flagBtn}`;
      flagBtn.classList.toggle('flagged', isFlagged);
    }

    // Active top bar title badge
    const titleBadge = document.getElementById('active-exam-title-text');
    if (titleBadge) {
      if (currentExamMode === 'dumps') {
        titleBadge.textContent = currentLang === 'en' 
          ? 'CompTIA Security+ SY0-701 Real Exam Dumps (144 Questions)' 
          : 'CompTIA Security+ SY0-701 Real Dumps Amaliyoti (144 ta Savol)';
      } else {
        titleBadge.textContent = currentLang === 'en' 
          ? 'CompTIA Security+ SY0-701 Official Mock Exam (90 Questions)' 
          : 'CompTIA Security+ SY0-701 Rasmiy Sinov Imtihoni (90 ta Savol)';
      }
    }

    // Results screen
    const resultsTitle = document.getElementById('results-exam-title');
    const resultBackLabel = document.getElementById('result-back-hub-label');
    const reviewAnswersBtn = document.getElementById('result-review-answers-btn');
    const retakeBtn = document.getElementById('result-retake-btn');

    if (resultsTitle) resultsTitle.textContent = d.resultsTitle;
    if (resultBackLabel) resultBackLabel.textContent = d.resultBackToHub;
    if (reviewAnswersBtn) reviewAnswersBtn.textContent = `${d.reviewAnswersBtn} (${activeQs.length})`;
    if (retakeBtn) retakeBtn.textContent = d.retakeBtn;

    // Re-render active question if active
    const activeScreen = document.getElementById('exam-active-screen');
    if (activeScreen && activeScreen.style.display !== 'none') {
      renderActiveExamQuestion(currentExamQIndex);
    }
  }

  function checkExamAccessState() {
    // If timer is currently running in active exam, keep user in active exam
    if (examTimerInterval !== null) {
      const hubScreen = document.getElementById('exam-locked-screen');
      const activeScreen = document.getElementById('exam-active-screen');
      const resultsScreen = document.getElementById('exam-results-screen');
      if (hubScreen) hubScreen.style.display = 'none';
      if (resultsScreen) resultsScreen.style.display = 'none';
      if (activeScreen) activeScreen.style.display = 'flex';
      return;
    }

    // Otherwise always show Hub so user can pick between the two tests or view status
    showExamHub();
  }

  function startActiveExam(mode) {
    if (mode) {
      loadExamStateForMode(mode);
    }

    const hubScreen = document.getElementById('exam-locked-screen');
    const activeScreen = document.getElementById('exam-active-screen');
    const resultsScreen = document.getElementById('exam-results-screen');

    if (hubScreen) hubScreen.style.display = 'none';
    if (resultsScreen) resultsScreen.style.display = 'none';
    if (activeScreen) activeScreen.style.display = 'flex';

    // Update active top bar title badge
    const titleBadge = document.getElementById('active-exam-title-text');
    if (titleBadge) {
      if (currentExamMode === 'dumps') {
        titleBadge.textContent = currentLang === 'en' 
          ? 'CompTIA Security+ SY0-701 Real Exam Dumps (144 Questions)' 
          : 'CompTIA Security+ SY0-701 Real Dumps Amaliyoti (144 ta Savol)';
      } else {
        titleBadge.textContent = currentLang === 'en' 
          ? 'CompTIA Security+ SY0-701 Official Mock Exam (90 Questions)' 
          : 'CompTIA Security+ SY0-701 Rasmiy Sinov Imtihoni (90 ta Savol)';
      }
    }

    renderQuestionPalette();
    renderActiveExamQuestion(currentExamQIndex);

    if (!examTimerInterval) {
      startExamTimer();
    }
  }

  function startExamTimer() {
    clearInterval(examTimerInterval);
    updateTimerDisplay();
    examTimerInterval = setInterval(() => {
      examTimeRemaining--;
      updateTimerDisplay();

      if (examTimeRemaining % 10 === 0) {
        saveExamState();
      }

      if (examTimeRemaining <= 0) {
        clearInterval(examTimerInterval);
        alert(currentLang === 'en' 
          ? 'Time is up! Your exam will now be submitted automatically.' 
          : 'Vaqt tugadi! Imtihoningiz avtomatik tarzda topshiriladi.');
        submitExam();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const timerText = document.getElementById('timer-text');
    const timerBox = document.getElementById('exam-timer-display');
    if (!timerText) return;

    const hours = Math.floor(examTimeRemaining / 3600);
    const minutes = Math.floor((examTimeRemaining % 3600) / 60);
    const seconds = examTimeRemaining % 60;

    const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timerText.textContent = formatted;

    if (examTimeRemaining < 600 && timerBox) {
      timerBox.classList.add('warning');
    }
  }

  function renderQuestionPalette() {
    const grid = document.getElementById('question-palette-grid');
    const badge = document.getElementById('answered-count-badge');
    if (!grid) return;

    grid.innerHTML = '';
    let answeredCount = 0;
    getActiveQuestions().forEach(q => {
      if (isQuestionAnswered(q)) answeredCount++;
    });
    const totalQCount = getActiveQuestions().length;
    if (badge) badge.textContent = `${answeredCount} / ${totalQCount}`;
    const paletteTitle = document.getElementById('palette-title-text');
    if (paletteTitle) {
      paletteTitle.textContent = currentLang === 'en'
        ? `Questions (1 - ${totalQCount})`
        : `Savollar (1 - ${totalQCount})`;
    }

    const qs = getActiveQuestions();
    for (let i = 0; i < qs.length; i++) {
      const q = qs[i];
      const btn = document.createElement('button');
      btn.className = 'palette-btn';
      btn.id = `palette-btn-${q.id}`;

      if (q.isPBQ || q.type === 'matching') {
        btn.classList.add('pbq-btn');
        btn.innerHTML = `<span class="pbq-badge-label">PBQ</span>${i + 1}`;
        btn.title = `Question ${i + 1} (Performance-Based Matching)`;
      } else if (q.type === 'multi_choice') {
        btn.classList.add('multi-btn');
        btn.innerHTML = `<span class="multi-badge-label">Multi</span>${i + 1}`;
        btn.title = `Question ${i + 1} (Choose ${q.selectCount || 2})`;
      } else {
        btn.textContent = i + 1;
      }

      if (isQuestionAnswered(q)) btn.classList.add('answered');
      if (examFlags[q.id]) btn.classList.add('flagged');
      if (i === currentExamQIndex) btn.classList.add('current');

      btn.addEventListener('click', () => {
        currentExamQIndex = i;
        renderActiveExamQuestion(currentExamQIndex);
      });

      grid.appendChild(btn);
    }
  }

  function isQuestionAnswered(q) {
    const ans = examAnswers[q.id];
    if (ans === undefined || ans === null) return false;
    if (q.type === 'matching') {
      return typeof ans === 'object' && Object.keys(ans).length === q.prompts_en.length;
    }
    if (q.type === 'multi_choice') {
      return Array.isArray(ans) && ans.length === (q.selectCount || 2);
    }
    return true;
  }

  function renderActiveExamQuestion(index) {
    const q = getActiveQuestions()[index];
    if (!q) return;

    document.querySelectorAll('.palette-btn').forEach((b, idx) => {
      b.classList.toggle('current', idx === index);
    });

    const qNumBadge = document.getElementById('current-q-num-badge');
    const domainBadge = document.getElementById('current-q-domain-badge');
    const flagBtn = document.getElementById('current-q-flag-btn');
    const qTextEn = document.getElementById('current-q-text-en');
    const qTextUz = document.getElementById('current-q-text-uz');
    const optionsContainer = document.getElementById('current-q-options-container');

    const showUz = (currentLang === 'uz');

    if (qNumBadge) {
      const typeLabel = (q.type === 'matching' || q.isPBQ) 
        ? ' [PBQ Matching]' 
        : (q.type === 'multi_choice' ? ` [Choose ${q.selectCount || 2}]` : '');
      const totalQs = getActiveQuestions().length;
      qNumBadge.textContent = currentLang === 'en'
        ? `Question ${index + 1} of ${totalQs}${typeLabel}`
        : `Savol ${index + 1} / ${totalQs}${typeLabel}`;
    }

    if (domainBadge) domainBadge.textContent = `Domain ${q.domain}: ${q.domainName}`;

    if (flagBtn) {
      flagBtn.classList.toggle('flagged', !!examFlags[q.id]);
    }

    if (qTextEn) qTextEn.textContent = q.q_en;
    if (qTextUz) {
      qTextUz.textContent = q.q_uz;
      qTextUz.classList.toggle('visible', showUz);
    }

    if (!optionsContainer) return;
    optionsContainer.innerHTML = '';

    // RENDER BY QUESTION TYPE
    if (q.type === 'matching') {
      renderMatchingQuestionUI(q, optionsContainer, showUz);
    } else if (q.type === 'multi_choice') {
      renderMultiChoiceQuestionUI(q, optionsContainer, showUz);
    } else {
      renderSingleChoiceQuestionUI(q, optionsContainer, showUz);
    }

    const prevBtn = document.getElementById('exam-prev-btn');
    const nextBtn = document.getElementById('exam-next-btn');

    if (prevBtn) prevBtn.disabled = (index === 0);
    if (nextBtn) nextBtn.disabled = (index === getActiveQuestions().length - 1);
  }

  function renderMatchingQuestionUI(q, container, showUz) {
    if (!examAnswers[q.id] || typeof examAnswers[q.id] !== 'object') {
      examAnswers[q.id] = {};
    }
    const currentMatches = examAnswers[q.id];

    const matchingWrap = document.createElement('div');
    matchingWrap.className = 'matching-container';

    const headerNotice = document.createElement('div');
    headerNotice.className = 'matching-notice-banner';
    const totalPrompts = q.prompts_en.length;
    const answeredPrompts = Object.keys(currentMatches).length;
    const isAllMatched = (answeredPrompts === totalPrompts);
    headerNotice.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <span>🧩 <strong>CompTIA PBQ (Matching):</strong> ${currentLang === 'en' ? 'Select the correct match for each item below:' : 'Quyidagi har bir band uchun o\'ng tarafdan mos variantni tanlang:'}</span>
        <span class="matching-status-pill ${isAllMatched ? 'complete' : ''}">${answeredPrompts} / ${totalPrompts} ${currentLang === 'en' ? 'Matched' : 'Moslashtirildi'}</span>
      </div>
    `;
    matchingWrap.appendChild(headerNotice);

    const table = document.createElement('div');
    table.className = 'matching-table';

    q.prompts_en.forEach((promptEn, pIdx) => {
      const row = document.createElement('div');
      const isItemMatched = (currentMatches[pIdx] !== undefined && currentMatches[pIdx] !== '');
      row.className = `matching-row ${isItemMatched ? 'matched' : ''}`;

      const promptCol = document.createElement('div');
      promptCol.className = 'matching-prompt-col';
      promptCol.innerHTML = `
        <div class="matching-prompt-en">${promptEn}</div>
        <div class="matching-prompt-uz ${showUz ? 'visible' : ''}"><em>Tarjima:</em> ${q.prompts_uz[pIdx]}</div>
      `;

      const targetCol = document.createElement('div');
      targetCol.className = 'matching-target-col';

      const select = document.createElement('select');
      select.className = 'matching-select';
      
      const defaultOpt = document.createElement('option');
      defaultOpt.value = '';
      defaultOpt.textContent = currentLang === 'en' ? '-- Select Match / Tanlang --' : '-- Mos variantni tanlang --';
      select.appendChild(defaultOpt);

      q.targets_en.forEach((targetEn, tIdx) => {
        const opt = document.createElement('option');
        opt.value = tIdx;
        const targetText = showUz ? `${q.targets_uz[tIdx]} (${targetEn})` : targetEn;
        opt.textContent = `${String.fromCharCode(65 + tIdx)}. ${targetText}`;
        if (currentMatches[pIdx] === tIdx) {
          opt.selected = true;
        }
        select.appendChild(opt);
      });

      select.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val === '') {
          delete examAnswers[q.id][pIdx];
        } else {
          examAnswers[q.id][pIdx] = parseInt(val, 10);
        }
        saveExamState();
        renderActiveExamQuestion(currentExamQIndex);
        renderQuestionPalette();
      });

      targetCol.appendChild(select);
      row.appendChild(promptCol);
      row.appendChild(targetCol);
      table.appendChild(row);
    });

    matchingWrap.appendChild(table);
    container.appendChild(matchingWrap);
  }

  function renderMultiChoiceQuestionUI(q, container, showUz) {
    if (!Array.isArray(examAnswers[q.id])) {
      examAnswers[q.id] = [];
    }
    const selectedList = examAnswers[q.id];
    const selectCount = q.selectCount || 2;

    const banner = document.createElement('div');
    banner.className = 'multi-select-badge-banner';
    const isComplete = selectedList.length === selectCount;
    banner.innerHTML = `
      <span>☑️ <strong>${currentLang === 'en' ? `Select EXACTLY ${selectCount} options:` : `Aynan ${selectCount} ta to'g'ri variantni tanlang:`}</strong></span>
      <span class="multi-count-pill ${isComplete ? 'complete' : ''}">
        ${selectedList.length} / ${selectCount} ${currentLang === 'en' ? 'Selected' : 'Tanlandi'}
      </span>
    `;
    container.appendChild(banner);

    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    q.options_en.forEach((optEn, optIdx) => {
      const isSelected = selectedList.includes(optIdx);
      const item = document.createElement('div');
      item.className = `exam-option-item multi-item ${isSelected ? 'selected' : ''}`;

      item.innerHTML = `
        <input type="checkbox" class="option-checkbox" ${isSelected ? 'checked' : ''}>
        <div class="option-text-wrap">
          <div class="option-text-en"><strong>${letters[optIdx]}.</strong> ${optEn}</div>
          <div class="option-text-uz ${showUz ? 'visible' : ''}"><em>Tarjima:</em> ${q.options_uz[optIdx]}</div>
        </div>
      `;

      item.addEventListener('click', () => {
        let currentArr = Array.isArray(examAnswers[q.id]) ? [...examAnswers[q.id]] : [];
        if (currentArr.includes(optIdx)) {
          currentArr = currentArr.filter(x => x !== optIdx);
        } else {
          if (currentArr.length < selectCount) {
            currentArr.push(optIdx);
          } else {
            // Reached limit: rotate oldest selection
            currentArr.shift();
            currentArr.push(optIdx);
          }
        }
        examAnswers[q.id] = currentArr;
        saveExamState();
        renderActiveExamQuestion(currentExamQIndex);
        renderQuestionPalette();
      });

      container.appendChild(item);
    });
  }

  function renderSingleChoiceQuestionUI(q, container, showUz) {
    const letters = ['A', 'B', 'C', 'D'];

    q.options_en.forEach((optEn, optIdx) => {
      const item = document.createElement('div');
      const isSelected = examAnswers[q.id] === optIdx;
      item.className = `exam-option-item ${isSelected ? 'selected' : ''}`;

      item.innerHTML = `
        <input type="radio" class="option-radio" name="exam-q-${q.id}" ${isSelected ? 'checked' : ''}>
        <div class="option-text-wrap">
          <div class="option-text-en"><strong>${letters[optIdx]}.</strong> ${optEn}</div>
          <div class="option-text-uz ${showUz ? 'visible' : ''}"><em>Tarjima:</em> ${q.options_uz[optIdx]}</div>
        </div>
      `;

      item.addEventListener('click', () => {
        examAnswers[q.id] = optIdx;
        saveExamState();
        renderActiveExamQuestion(currentExamQIndex);
        renderQuestionPalette();
      });

      container.appendChild(item);
    });
  }

  function navigateExamQuestion(delta) {
    const nextIndex = currentExamQIndex + delta;
    if (nextIndex >= 0 && nextIndex < getActiveQuestions().length) {
      currentExamQIndex = nextIndex;
      saveExamState();
      renderActiveExamQuestion(currentExamQIndex);
    }
  }

  function toggleCurrentQuestionFlag() {
    const q = getActiveQuestions()[currentExamQIndex];
    if (!q) return;

    examFlags[q.id] = !examFlags[q.id];
    saveExamState();
    renderActiveExamQuestion(currentExamQIndex);
    renderQuestionPalette();
  }

  function jumpToFirstUnansweredOrFlagged() {
    const qs = getActiveQuestions();
    for (let i = 0; i < qs.length; i++) {
      const q = qs[i];
      if (examFlags[q.id] || !isQuestionAnswered(q)) {
        currentExamQIndex = i;
        renderActiveExamQuestion(currentExamQIndex);
        return;
      }
    }
    const totalCount = qs.length;
    alert(currentLang === 'en'
      ? `All ${totalCount} questions have been answered and no questions are flagged!`
      : `Barcha ${totalCount} ta savolga javob berilgan va bayroqcha bilan belgilangan savollar qolmagan!`);
  }

  function submitExamConfirmation() {
    let answeredCount = 0;
    getActiveQuestions().forEach(q => {
      if (isQuestionAnswered(q)) answeredCount++;
    });
    const totalCount = getActiveQuestions().length;
    const unansweredCount = totalCount - answeredCount;
    const flaggedCount = Object.values(examFlags).filter(f => f).length;

    let msg = currentLang === 'en'
      ? `Are you sure you want to finish and submit your exam?\n\n• Total Questions: ${totalCount}\n• Answered: ${answeredCount}\n• Unanswered: ${unansweredCount}\n• Flagged for Review: ${flaggedCount}\n\nClick OK to receive your final score report.`
      : `Haqiqatdan ham imtihonni yakunlab, natijalarni ko'rmoqchimisiz?\n\n• Jami savollar: ${totalCount}\n• Javob berildi: ${answeredCount}\n• Javobsiz: ${unansweredCount}\n• Belgilangan: ${flaggedCount}\n\nOK tugmasini bosib, rasmiy ball va tahlilni oling.`;

    if (confirm(msg)) {
      submitExam();
    }
  }

  function submitExam(fromHistory = false) {
    if (!fromHistory) {
      clearInterval(examTimerInterval);
      examTimerInterval = null;
      examSubmitted = true;
    }

    let correctCount = 0;
    let domainScores = {
      "1.0": { name: "1.0 General Security Concepts (12%)", total: 0, correct: 0 },
      "2.0": { name: "2.0 Threats, Vulnerabilities & Mitigations (22%)", total: 0, correct: 0 },
      "3.0": { name: "3.0 Security Architecture (18%)", total: 0, correct: 0 },
      "4.0": { name: "4.0 Security Operations (28%)", total: 0, correct: 0 },
      "5.0": { name: "5.0 Program Management & Oversight (20%)", total: 0, correct: 0 }
    };

    getActiveQuestions().forEach(q => {
      const selected = examAnswers[q.id];
      let isCorrect = false;

      if (q.type === 'matching') {
        if (selected && typeof selected === 'object') {
          const keys = Object.keys(q.correct);
          isCorrect = keys.every(k => selected[k] === q.correct[k]);
        }
      } else if (q.type === 'multi_choice') {
        if (Array.isArray(selected) && selected.length === q.correct.length) {
          const sortedSel = [...selected].sort().join(',');
          const sortedCor = [...q.correct].sort().join(',');
          isCorrect = (sortedSel === sortedCor);
        }
      } else {
        isCorrect = (selected === q.correct);
      }

      if (domainScores[q.domain]) {
        domainScores[q.domain].total++;
        if (isCorrect) domainScores[q.domain].correct++;
      }

      if (isCorrect) correctCount++;
    });

    const totalCount = getActiveQuestions().length;
    const scaledScore = Math.round(100 + (correctCount / totalCount) * 800);
    const passed = scaledScore >= 750;

    const activeScreen = document.getElementById('exam-active-screen');
    const resultsScreen = document.getElementById('exam-results-screen');

    if (activeScreen) activeScreen.style.display = 'none';
    if (resultsScreen) resultsScreen.style.display = 'block';

    const scoreNum = document.getElementById('result-score-number');
    const passBadge = document.getElementById('result-pass-fail-badge');
    const summaryText = document.getElementById('result-summary-text');
    const domainBreakdown = document.getElementById('result-domain-breakdown');
    const reviewAnswersBtn = document.getElementById('result-review-answers-btn');

    if (scoreNum) scoreNum.textContent = `${scaledScore} / 900`;
    if (passBadge) {
      passBadge.className = `pass-badge ${passed ? 'pass' : 'fail'}`;
      passBadge.textContent = passed ? 'PASSED (O\'tdingiz) ✓' : 'NOT PASSED (O\'tmadingiz)';
    }

    if (summaryText) {
      const pct = Math.round((correctCount / totalCount) * 100);
      summaryText.innerHTML = passed
        ? (currentLang === 'en'
            ? `<strong>Congratulations!</strong> You correctly answered ${correctCount} out of ${totalCount} questions (${pct}%), passing the CompTIA 750 point threshold.`
            : `<strong>Tabriklaymiz!</strong> Siz ${totalCount} ta savoldan ${correctCount} tasiga to'g'ri javob berdingiz (${pct}%) va CompTIA 750 ballik sertifikat me'yoridan muvaffaqiyatli o'tdingiz.`)
        : (currentLang === 'en'
            ? `<strong>Keep Practicing!</strong> You scored ${correctCount} out of ${totalCount} (${pct}%). A score of 750 or higher (approx 83%) is required to pass the official CompTIA Security+ examination.`
            : `<strong>Harakat qilishda davom eting!</strong> Siz ${totalCount} tadan ${correctCount} ta to'g'ri javob berdingiz (${pct}%). CompTIA Security+ xalqaro sertifikatini olish uchun kamida 750 ball (taxminan 83%) to'plash talab etiladi.`);
    }

    if (reviewAnswersBtn) {
      reviewAnswersBtn.textContent = currentLang === 'en'
        ? `Review All ${totalCount} Answers & Explanations`
        : `Barcha ${totalCount} ta Savol & Javob Tahlilini Ko'rish`;
    }

    if (domainBreakdown) {
      domainBreakdown.innerHTML = currentLang === 'en' 
        ? '<h3>Domain-by-Domain Performance:</h3>' 
        : '<h3>Domenlar bo\'yicha Ko\'rsatkichlar:</h3>';

      Object.keys(domainScores).forEach(key => {
        const d = domainScores[key];
        const pct = d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0;
        const color = pct >= 80 ? '#10b981' : pct >= 65 ? '#f59e0b' : '#ef4444';

        const row = document.createElement('div');
        row.className = 'domain-score-row';
        row.innerHTML = `
          <div class="domain-score-label">
            <span>${d.name}</span>
            <span style="color:${color};">${d.correct} / ${d.total} (${pct}%)</span>
          </div>
          <div style="height:6px; background:#e2e8f0; border-radius:3px; overflow:hidden;">
            <div style="height:100%; width:${pct}%; background:${color};"></div>
          </div>
        `;
        domainBreakdown.appendChild(row);
      });
    }

    saveExamState();
  }

  function renderFullAnswersReview() {
    const container = document.getElementById('result-full-review-container');
    if (!container) return;

    container.style.display = 'block';
    const totalCount = getActiveQuestions().length;
    container.innerHTML = currentLang === 'en'
      ? `<h3>Comprehensive Question Review (${totalCount} Questions):</h3>`
      : `<h3>Barcha ${totalCount} ta Savolning To'liq Tahlili:</h3>`;

    getActiveQuestions().forEach((q, idx) => {
      const userChoice = examAnswers[q.id];
      let isCorrect = false;

      if (q.type === 'matching') {
        if (userChoice && typeof userChoice === 'object') {
          const keys = Object.keys(q.correct);
          isCorrect = keys.every(k => userChoice[k] === q.correct[k]);
        }
      } else if (q.type === 'multi_choice') {
        if (Array.isArray(userChoice) && userChoice.length === q.correct.length) {
          isCorrect = ([...userChoice].sort().join(',') === [...q.correct].sort().join(','));
        }
      } else {
        isCorrect = (userChoice === q.correct);
      }

      const div = document.createElement('div');
      div.className = 'review-question-item';
      div.style.borderLeft = isCorrect ? '4px solid #10b981' : '4px solid #ef4444';

      let answerBreakdownHtml = '';

      if (q.type === 'matching') {
        let tableRows = '';
        q.prompts_en.forEach((pEn, pIdx) => {
          const uTgtIdx = userChoice ? userChoice[pIdx] : undefined;
          const cTgtIdx = q.correct[pIdx];
          const isRowCorrect = (uTgtIdx === cTgtIdx);

          const uText = uTgtIdx !== undefined ? `${String.fromCharCode(65 + uTgtIdx)}. ${q.targets_en[uTgtIdx]}` : '<span style="color:#ef4444;">Not matched / Tanlanmagan</span>';
          const cText = `${String.fromCharCode(65 + cTgtIdx)}. ${q.targets_en[cTgtIdx]}`;

          tableRows += `
            <tr style="border-bottom:1px solid rgba(148, 163, 184, 0.2);">
              <td style="padding:8px; font-weight:600; vertical-align:top; border-right:1px solid rgba(148,163,184,0.15);">${pEn}</td>
              <td style="padding:8px; vertical-align:top; color:${isRowCorrect ? '#10b981' : '#ef4444'}; border-right:1px solid rgba(148,163,184,0.15);">${isRowCorrect ? '✓ ' : '✗ '}${uText}</td>
              <td style="padding:8px; vertical-align:top; color:#10b981; font-weight:600;">✓ ${cText}</td>
            </tr>
          `;
        });

        answerBreakdownHtml = `
          <div class="matching-review-table-wrap">
            <table class="matching-review-table">
              <thead>
                <tr>
                  <th>Prompt / Scenario</th>
                  <th>Your Match</th>
                  <th>Correct Match</th>
                </tr>
              </thead>
              <tbody>${tableRows}</tbody>
            </table>
          </div>
        `;
      } else if (q.type === 'multi_choice') {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
        const uLetters = Array.isArray(userChoice) && userChoice.length > 0 
          ? userChoice.map(i => letters[i]).sort().join(', ') 
          : '<span style="color:#ef4444;">None selected</span>';
        const cLetters = q.correct.map(i => letters[i]).sort().join(', ');

        let optionsList = q.options_en.map((opt, oIdx) => {
          const isUserSel = Array.isArray(userChoice) && userChoice.includes(oIdx);
          const isCor = q.correct.includes(oIdx);
          let badge = '';
          if (isCor) badge = ' <strong style="color:#10b981;">[Correct Answer]</strong>';
          if (isUserSel && !isCor) badge = ' <strong style="color:#ef4444;">[Your Choice - Incorrect]</strong>';
          return `<div style="margin:4px 0; font-size:12.5px;"><strong>${letters[oIdx]}.</strong> ${opt}${badge}</div>`;
        }).join('');

        answerBreakdownHtml = `
          <div style="font-size:13px; margin-bottom:10px;">
            <div><strong>Your Choices:</strong> ${uLetters}</div>
            <div><strong style="color:#10b981;">Correct Answers:</strong> ${cLetters}</div>
            <div style="margin-top:8px; padding:8px 12px; background:rgba(148,163,184,0.08); border-radius:6px;">${optionsList}</div>
          </div>
        `;
      } else {
        const letters = ['A', 'B', 'C', 'D'];
        answerBreakdownHtml = `
          <div style="font-size:13px; margin-bottom:10px;">
            <div><strong>Your Choice:</strong> ${userChoice !== undefined ? `${letters[userChoice]}. ${q.options_en[userChoice]}` : '<span style="color:#ef4444;">No answer selected</span>'}</div>
            <div><strong style="color:#10b981;">Correct Answer:</strong> ${letters[q.correct]}. ${q.options_en[q.correct]}</div>
          </div>
        `;
      }

      const qTypeBadge = (q.type === 'matching' || q.isPBQ)
        ? '<span class="review-type-badge pbq">PBQ Matching</span>'
        : (q.type === 'multi_choice' ? '<span class="review-type-badge multi">Choose 2</span>' : '');

      div.innerHTML = `
        <div class="review-header">
          <span>Question ${idx + 1} (${q.domainName}) ${qTypeBadge}</span>
          <span style="color:${isCorrect ? '#10b981' : '#ef4444'}; font-weight:700;">
            ${isCorrect ? '✅ Correct' : '❌ Incorrect / Incomplete'}
          </span>
        </div>
        <p style="font-weight:600; font-size:14px; margin-bottom:8px;">${q.q_en}</p>
        <p style="font-size:13px; opacity:0.8; margin-bottom:12px;"><em>O'zbekcha:</em> ${q.q_uz}</p>
        
        ${answerBreakdownHtml}

        <div class="review-explanation-box">
          <strong>Explanation:</strong> ${q.explanation_en}<br>
          <span style="display:block; margin-top:4px; opacity:0.9;"><em>O'zbekcha tushuntirish:</em> ${q.explanation_uz}</span>
        </div>
      `;

      container.appendChild(div);
    });

    container.scrollIntoView({ behavior: 'smooth' });
  }

  // --- 8. PORT TRAINER & MINI QUIZ ---
  function initPortTrainer() {
    const searchInput = document.getElementById('port-search-input');
    const filterBtns = document.querySelectorAll('.port-filter-btn');

    renderPorts();

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentPortSearch = e.target.value;
        renderPorts(currentPortFilter, currentPortSearch);
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPortFilter = btn.getAttribute('data-filter');
        renderPorts(currentPortFilter, currentPortSearch);
      });
    });

    initMiniQuiz();
  }

  function updatePortsLanguageUI() {
    const d = PORTS_UI_DATA[currentLang];
    const headerTitle = document.getElementById('ports-header-title');
    const headerDesc = document.getElementById('ports-header-desc');
    const btnAll = document.getElementById('btn-port-filter-all');
    const btnSecure = document.getElementById('btn-port-filter-secure');
    const btnInsecure = document.getElementById('btn-port-filter-insecure');
    const searchInput = document.getElementById('port-search-input');
    const quizHeading = document.getElementById('quiz-box-heading');
    const quizNext = document.getElementById('quiz-next-btn');
    const quizRestart = document.getElementById('quiz-restart-btn');

    if (headerTitle) headerTitle.textContent = d.title;
    if (headerDesc) headerDesc.textContent = d.desc;
    if (btnAll) btnAll.textContent = d.filterAll;
    if (btnSecure) btnSecure.textContent = d.filterSecure;
    if (btnInsecure) btnInsecure.textContent = d.filterInsecure;
    if (searchInput) searchInput.placeholder = d.searchPlaceholder;
    if (quizHeading) quizHeading.textContent = d.quizHeading;
    if (quizNext) quizNext.textContent = d.quizNext;
    if (quizRestart) quizRestart.textContent = d.quizRestart;

    renderPorts(currentPortFilter, currentPortSearch);
    loadMiniQuestion(currentQuizIndex);
  }

  function renderPorts(filter = 'all', query = '') {
    const container = document.getElementById('ports-grid');
    if (!container) return;

    container.innerHTML = '';
    const portsList = (ROADMAP_DATA && Array.isArray(ROADMAP_DATA.ports)) ? ROADMAP_DATA.ports : [];
    const filtered = portsList.filter(p => {
      const matchesFilter = filter === 'all' || 
        (filter === 'secure' && p.secure) || 
        (filter === 'insecure' && !p.secure);
      
      const q = (query || '').toLowerCase();
      const matchesQuery = (p.port || '').toString().includes(q) || 
                           (p.name || '').toLowerCase().includes(q) || 
                           (p.desc_en || p.desc || '').toLowerCase().includes(q) ||
                           (p.desc_uz || '').toLowerCase().includes(q);

      return matchesFilter && matchesQuery;
    });

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'port-card';
      const statusText = p.secure
        ? (currentLang === 'en' ? '✅ Secure (Encrypted)' : '✅ Xavfsiz (Shifrlangan)')
        : (currentLang === 'en' ? `❌ Insecure (${p.alt})` : `❌ Xavfli (${p.alt})`);
      const portDesc = currentLang === 'en' ? (p.desc_en || p.desc) : (p.desc_uz || p.desc);

      card.innerHTML = `
        <div>
          <span class="port-number">${p.port}</span>
          <span class="port-proto">${p.proto}</span>
        </div>
        <div class="port-name">${p.name}</div>
        <div class="port-desc">${portDesc}</div>
        <div class="port-status-tag ${p.secure ? 'status-secure' : 'status-insecure'}">
          ${statusText}
        </div>
      `;
      container.appendChild(card);
    });
  }


  function updateQuizScoreUI() {
    const scoreBadge = document.getElementById('quiz-score-badge');
    if (!scoreBadge) return;
    if (quizScore.total === 0) {
      scoreBadge.textContent = currentLang === 'en' ? 'Score: 0/0 (0%)' : 'Natija: 0/0 (0%)';
    } else {
      const pct = Math.round((quizScore.correct / quizScore.total) * 100);
      scoreBadge.textContent = currentLang === 'en'
        ? `Score: ${quizScore.correct}/${quizScore.total} (${pct}%)`
        : `Natija: ${quizScore.correct}/${quizScore.total} (${pct}%)`;
    }
  }

  function initMiniQuiz() {
    const nextBtn = document.getElementById('quiz-next-btn');
    const restartBtn = document.getElementById('quiz-restart-btn');
    const softUzBtn = document.getElementById('quiz-soft-uz-btn');

    loadMiniQuestion(0);

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const quizList = (ROADMAP_DATA && Array.isArray(ROADMAP_DATA.quizQuestions)) ? ROADMAP_DATA.quizQuestions : [];
        if (quizList.length > 0) {
          currentQuizIndex = (currentQuizIndex + 1) % quizList.length;
          loadMiniQuestion(currentQuizIndex);
        }
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        currentQuizIndex = 0;
        quizScore = { correct: 0, total: 0 };
        updateQuizScoreUI();
        loadMiniQuestion(0);
      });
    }

    if (softUzBtn) {
      softUzBtn.addEventListener('click', () => {
        toggleSoftLanguage();
        loadMiniQuestion(currentQuizIndex);
      });
    }
  }

  function loadMiniQuestion(index) {
    const qText = document.getElementById('quiz-question-text');
    const optContainer = document.getElementById('quiz-options-container');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('quiz-next-btn');
    const progressBadge = document.getElementById('quiz-progress-badge');

    if (!qText || !optContainer) return;

    const quizList = (ROADMAP_DATA && Array.isArray(ROADMAP_DATA.quizQuestions)) ? ROADMAP_DATA.quizQuestions : [];
    if (quizList.length === 0) return;

    if (index >= quizList.length) {
      currentQuizIndex = 0;
      index = 0;
    }

    const q = quizList[index];
    if (!q) return;

    if (progressBadge) {
      progressBadge.textContent = `${index + 1} / ${quizList.length}`;
    }
    updateQuizScoreUI();

    const qStem = currentLang === 'en' ? (q.q_en || q.q) : (q.q_uz || q.q);
    const qPrefix = currentLang === 'en' ? 'Question' : 'Savol';
    qText.innerHTML = `<strong>${qPrefix} ${index + 1} of ${quizList.length}:</strong> ${qStem}`;

    optContainer.innerHTML = '';
    if (feedback) {
      feedback.style.display = 'none';
      feedback.className = 'quiz-feedback';
      feedback.innerHTML = '';
    }
    if (nextBtn) {
      nextBtn.style.display = 'none';
      nextBtn.textContent = currentLang === 'en' ? 'Next Question ➜' : 'Keyingi savol ➜';
    }

    const opts = currentLang === 'en' ? (q.options_en || q.options) : (q.options_uz || q.options);
    const expl = currentLang === 'en' ? (q.explanation_en || q.explanation) : (q.explanation_uz || q.explanation);
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    opts.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      const letter = letters[idx] || (idx + 1);
      btn.innerHTML = `<span class="quiz-opt-letter">${letter}</span><span class="quiz-opt-text">${opt}</span>`;

      btn.addEventListener('click', () => {
        const allBtns = optContainer.querySelectorAll('.quiz-opt-btn');
        allBtns.forEach(b => b.disabled = true);

        quizScore.total++;
        if (idx === q.correct) {
          quizScore.correct++;
          btn.classList.add('correct');
          if (feedback) {
            feedback.className = 'quiz-feedback feedback-correct';
            feedback.innerHTML = `<strong>${currentLang === 'en' ? 'Correct! 🎉' : "To'g'ri! 🎉"}</strong> ${expl}`;
            feedback.style.display = 'block';
          }
        } else {
          btn.classList.add('wrong');
          if (allBtns[q.correct]) allBtns[q.correct].classList.add('correct');
          if (feedback) {
            feedback.className = 'quiz-feedback feedback-wrong';
            feedback.innerHTML = `<strong>${currentLang === 'en' ? 'Incorrect! ⚠️' : "Noto'g'ri! ⚠️"}</strong> ${expl}`;
            feedback.style.display = 'block';
          }
        }

        updateQuizScoreUI();
        if (nextBtn) nextBtn.style.display = 'inline-block';
      });

      optContainer.appendChild(btn);
    });
  }

  // --- 9. PBQ SIMULATOR ---
  function initPBQSimulator() {
    const checkBtn = document.getElementById('pbq-check-btn');
    const resultBox = document.getElementById('pbq-result-box');

    // Restore saved PBQ state from LocalStorage
    const savedPBQ = JSON.parse(localStorage.getItem(STORAGE_KEY_PBQ) || '{}');
    if (savedPBQ.r1 && document.getElementById('pbq-r1')) document.getElementById('pbq-r1').value = savedPBQ.r1;
    if (savedPBQ.r2 && document.getElementById('pbq-r2')) document.getElementById('pbq-r2').value = savedPBQ.r2;
    if (savedPBQ.r3 && document.getElementById('pbq-r3')) document.getElementById('pbq-r3').value = savedPBQ.r3;

    ['pbq-r1', 'pbq-r2', 'pbq-r3'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', () => {
          const pbqData = {
            r1: document.getElementById('pbq-r1')?.value,
            r2: document.getElementById('pbq-r2')?.value,
            r3: document.getElementById('pbq-r3')?.value
          };
          localStorage.setItem(STORAGE_KEY_PBQ, JSON.stringify(pbqData));
        });
      }
    });

    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        const r1 = document.getElementById('pbq-r1').value;
        const r2 = document.getElementById('pbq-r2').value;
        const r3 = document.getElementById('pbq-r3').value;

        let isCorrect = (r1 === 'ALLOW' && r2 === 'DENY' && r3 === 'DENY');

        resultBox.style.display = 'block';
        if (isCorrect) {
          resultBox.style.background = '#dcfce7';
          resultBox.style.color = '#15803d';
          resultBox.style.border = '1px solid #86efac';
          resultBox.innerHTML = currentLang === 'en' ? `
            <strong>Correct Configuration! (100%)</strong><br>
            1. DMZ Web server (HTTPS 443) allowed from Internet.<br>
            2. Plaintext Telnet (Port 23) explicitly blocked.<br>
            3. Final "Implicit Deny" (DENY ANY ANY) safely terminates rule list.
          ` : `
            <strong>To'g'ri Sozlama! (100%)</strong><br>
            1. DMZ Veb serverga (HTTPS 443) internetdan ruxsat berildi (ALLOW).<br>
            2. Xavfsiz bo'lmagan Telnet (Port 23) qat'iy to'sildi (DENY).<br>
            3. Eng oxirgi "Implicit Deny" (DENY ANY ANY) qolgan barcha begona trafikni to'xtatadi.
          `;
        } else {
          resultBox.style.background = '#fee2e2';
          resultBox.style.color = '#b91c1c';
          resultBox.style.border = '1px solid #fca5a5';
          resultBox.innerHTML = currentLang === 'en' ? `
            <strong>Configuration Error:</strong><br>
            * Web Server (HTTPS 443) should be ALLOW.<br>
            * Insecure Telnet (Port 23) must be DENY.<br>
            * Bottom row must be DENY ANY ANY.
          ` : `
            <strong>Sozlamada Xatolik Mavjud:</strong><br>
            * Veb server (HTTPS 443) uchun ALLOW bo'lishi kerak.<br>
            * Telnet (Port 23) uchun DENY bo'lishi shart.<br>
            * Oxirgi qatorda DENY ANY ANY bo'lishi zarur.
          `;
        }
      });
    }

    updatePBQLanguageUI();
  }

  function updatePBQLanguageUI() {
    const headerTitle = document.getElementById('pbq-header-title');
    const headerDesc = document.getElementById('pbq-header-desc');
    const scenarioTitle = document.getElementById('pbq-scenario1-title');
    const descText = document.getElementById('pbq-desc-text');
    const tipsTitle = document.getElementById('pbq-tips-title');
    const tipsContent = document.getElementById('pbq-tips-content');
    const checkBtn = document.getElementById('pbq-check-btn');

    // Table Headers & Row Descs
    const thRule = document.getElementById('th-rule');
    const thAction = document.getElementById('th-action');
    const thSource = document.getElementById('th-source');
    const thDest = document.getElementById('th-destination');
    const thPort = document.getElementById('th-port');
    const thDesc = document.getElementById('th-desc');
    const descRule1 = document.getElementById('desc-rule1');
    const descRule2 = document.getElementById('desc-rule2');
    const descRule3 = document.getElementById('desc-rule3');

    const tbl = (currentLang === 'en') ? PBQ_DATA.table_en : PBQ_DATA.table_uz;

    if (headerTitle) headerTitle.textContent = currentLang === 'en' ? "PBQ (Performance-Based Questions) Simulator" : "PBQ (Amaliy Vaziyatli Savollar) Simulyatori";
    if (headerDesc) headerDesc.textContent = currentLang === 'en' ? "Hands-on simulation scenarios representing the practical items found at the beginning of the Security+ exam." : "CompTIA Security+ imtihonining boshlanishida uchraydigan interaktiv amaliy vazifalar simulyatsiyasi.";
    if (scenarioTitle) scenarioTitle.textContent = currentLang === 'en' ? "Scenario 1: Enterprise Firewall ACL Configuration" : "1-Stsenariy: Korporativ Fayrvol ACL Qoidalarini Sozlash";
    if (descText) descText.innerHTML = (currentLang === 'en') ? PBQ_DATA.scenario_en : PBQ_DATA.scenario_uz;
    if (tipsTitle) tipsTitle.textContent = currentLang === 'en' ? "💡 Pro Tip: PBQ Time-Management Strategy" : "💡 Muhim Maslahat: PBQ Vaqtni Boshqarish Strategiyasi";
    if (tipsContent) tipsContent.innerHTML = (currentLang === 'en') ? PBQ_DATA.tips_en : PBQ_DATA.tips_uz;
    if (checkBtn) checkBtn.textContent = tbl.btn;

    if (thRule) thRule.textContent = tbl.rule;
    if (thAction) thAction.textContent = tbl.action;
    if (thSource) thSource.textContent = tbl.source;
    if (thDest) thDest.textContent = tbl.dest;
    if (thPort) thPort.textContent = tbl.port;
    if (thDesc) thDesc.textContent = tbl.desc;
    if (descRule1) descRule1.textContent = tbl.desc1;
    if (descRule2) descRule2.textContent = tbl.desc2;
    if (descRule3) descRule3.textContent = tbl.desc3;
  }

  // --- 10. 5 DOMAINS OVERVIEW ---
  function renderDomains() {
    const container = document.getElementById('domains-cards-grid');
    const headerTitle = document.getElementById('domains-header-title');
    const headerDesc = document.getElementById('domains-header-desc');

    if (headerTitle) {
      headerTitle.textContent = currentLang === 'en'
        ? "CompTIA Security+ SY0-701: 5 Core Exam Domains"
        : "CompTIA Security+ SY0-701: 5 Asosiy Imtihon Domeni";
    }

    if (headerDesc) {
      headerDesc.textContent = currentLang === 'en'
        ? "Official curriculum weighting and subject breakdowns."
        : "Rasmiy o'quv dasturi vaznlari va mavzular taqsimoti.";
    }

    if (!container) return;

    container.innerHTML = '';

    DOMAINS_DATA.forEach(d => {
      const card = document.createElement('div');
      card.className = 'pbq-card';
      card.style.borderTop = `4px solid ${d.color}`;

      const title = (currentLang === 'en') ? d.title_en : d.title_uz;
      const desc = (currentLang === 'en') ? d.desc_en : d.desc_uz;

      card.innerHTML = `
        <h4 style="color:${d.color}; font-size:14px; text-transform:uppercase; font-weight:800;">${d.code}</h4>
        <h3 class="domain-card-title" style="font-size:16px; margin: 6px 0;">${title}</h3>
        <p class="domain-card-desc" style="font-size:13px; line-height:1.5;">${desc}</p>
      `;

      container.appendChild(card);
    });
  }

  function showPdfMissingAlert(filename) {
    const uzMsg = "📁 PDF Darslik Fayli Topilmadi!\n\nQidirilgan fayl: " + filename + "\n\nKitobni dastur orqali ochish uchun:\n1. Dastur (.exe) joylashgan papkada 'books' nomli jild oching.\n2. PDF faylni o'sha 'books' jildiga nusxalang.\n(Yoki kitobni 'D:\\comptia\\' papkasiga joylashtiring).\n\nEslatma: Dasturdagi barcha 16 ta interaktiv dars mavzulari, 144 ta dumps savollari va portlar trenajyori mutlaqo kitobsiz ham to'liq ishlaydi!";
    const enMsg = "📁 PDF Book File Not Found!\n\nRequested file: " + filename + "\n\nTo view this book:\n1. Create a folder named 'books' next to the application .exe.\n2. Copy this PDF file into that 'books' folder.\n(Or place it in 'D:\\comptia\\').\n\nNote: All 16 interactive lessons, 144 authentic dumps questions, and port trainers work completely offline without this file!";
    alert(currentLang === 'en' ? enMsg : uzMsg);
  }

  // --- 11. PDF LIBRARY & STUDY MATERIALS ---
  function initPDFLibrary() {
    const btnGuide = document.getElementById('btn-open-study-guide');
    const btnDumps = document.getElementById('btn-open-dumps-pdf');

    if (btnGuide) {
      btnGuide.addEventListener('click', () => {
        if (typeof window.openEmbeddedPdfReader === 'function') {
          window.openEmbeddedPdfReader('guide');
        } else {
          fetch('/api/open-study-guide').catch(() => {});
        }
      });
    }

    if (btnDumps) {
      btnDumps.addEventListener('click', () => {
        if (typeof window.openEmbeddedPdfReader === 'function') {
          window.openEmbeddedPdfReader('dumps');
        } else {
          fetch('/api/open-dumps-pdf').catch(() => {});
        }
      });
    }

    const pdfLangBtn = document.getElementById('pdf-header-lang-btn');
    if (pdfLangBtn) {
      pdfLangBtn.addEventListener('click', toggleAppLanguage);
    }
  }

  function updatePDFLanguageUI() {
    const title = document.getElementById('pdf-header-title');
    const desc = document.getElementById('pdf-header-desc');
    const card1Title = document.getElementById('pdf-card1-title');
    const card1Desc = document.getElementById('pdf-card1-desc');
    const btnGuide = document.getElementById('btn-open-study-guide');
    const card2Title = document.getElementById('pdf-card2-title');
    const card2Desc = document.getElementById('pdf-card2-desc');
    const btnDumps = document.getElementById('btn-open-dumps-pdf');
    const pdfLangLabel = document.getElementById('pdf-header-lang-label');

    // Embedded Reader Labels
    const lblBack = document.getElementById('pdf-lbl-back');
    const lblExternal = document.getElementById('pdf-lbl-external');
    const lblFullscreen = document.getElementById('pdf-lbl-fullscreen');
    const lblPage = document.getElementById('pdf-lbl-page');
    const btnFit = document.getElementById('pdf-btn-fit-width');

    if (pdfLangLabel) pdfLangLabel.textContent = currentLang === 'en' ? 'Soft UZ' : 'English';

    if (currentLang === 'en') {
      if (title) title.textContent = "CompTIA Security+ SY0-701: Official Study Materials & PDF Library";
      if (desc) desc.textContent = "993-page official Sybex 9th Edition study guide and 279-page practice test dumps from D:\\comptia.";
      if (card1Title) card1Title.textContent = "CompTIA Security+ Study Guide (Exam SY0-701)";
      if (card1Desc) card1Desc.textContent = "The world's most acclaimed 993-page official Sybex guide covering all 5 domains, labs, and exam standards.";
      if (btnGuide) btnGuide.textContent = "📖 Open Book (In-App PDF Reader)";
      if (card2Title) card2Title.textContent = "CompTIA SY0-701 Practice Test Dumps";
      if (card2Desc) card2Desc.textContent = "279-page authentic exam questions with detailed answers, analysis, and Sybex references.";
      if (btnDumps) btnDumps.textContent = "📝 Open Exam Dumps (In-App PDF Reader)";
      if (lblBack) lblBack.textContent = "Library";
      if (lblExternal) lblExternal.textContent = "External App";
      if (lblFullscreen) lblFullscreen.textContent = "Fullscreen";
      if (lblPage) lblPage.textContent = "Page:";
      if (btnFit) btnFit.textContent = "↔ Fit Width";
    } else {
      if (title) title.textContent = "CompTIA Security+ SY0-701: Rasmiy Darsliklar & PDF Kutubxona";
      if (desc) desc.textContent = "D:\\comptia papkasidagi 993 betlik to'liq rasmiy Sybex darslik kitobi va 279 betlik Practice Test Dumps to'plami.";
      if (card1Title) card1Title.textContent = "CompTIA Security+ Study Guide (Exam SY0-701)";
      if (card1Desc) card1Desc.textContent = "CompTIA Security+ bo'yicha dunyodagi eng nufuzli, 993 betlik to'liq rasmiy qo'llanma. Barcha 5 ta domen va amaliy stsenariylarni o'z ichiga oladi.";
      if (btnGuide) btnGuide.textContent = "📖 Kitobni Ochish (Ichki PDF Reader)";
      if (card2Title) card2Title.textContent = "CompTIA SY0-701 Practice Test Dumps";
      if (card2Desc) card2Desc.textContent = "279 betlik haqiqiy imtihon savollari to'plami. Har bir savolning to'g'ri javoblari va chuqur tahlillari bilan.";
      if (btnDumps) btnDumps.textContent = "📝 Savollar To'plamini Ochish (Ichki PDF Reader)";
      if (lblBack) lblBack.textContent = "Kutubxona";
      if (lblExternal) lblExternal.textContent = "Tashqi dastur";
      if (lblFullscreen) lblFullscreen.textContent = "Katta ekran";
      if (lblPage) lblPage.textContent = "Sahifa:";
      if (btnFit) btnFit.textContent = "↔ Moslash";
    }
  }

  } catch (err) {
    console.error("FATAL ERROR IN DOMContentLoaded:", err);
    window.__FATAL_ERROR = err.toString() + "\n" + (err.stack || '');
  }
});