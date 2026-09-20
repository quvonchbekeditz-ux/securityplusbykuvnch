// CompTIA Security+ (SY0-701) Rasmiy 90 Ta Imtihon Savollari Bazasi
// Taqsimot:
// Domain 1.0 General Security Concepts: Savollar 1-11 (12%)
// Domain 2.0 Threats, Vulnerabilities, and Mitigations: Savollar 12-31 (22%)
// Domain 3.0 Security Architecture: Savollar 32-47 (18%)
// Domain 4.0 Security Operations: Savollar 48-72 (28%)
// Domain 5.0 Security Program Management and Oversight: Savollar 73-90 (20%)

const EXAM_QUESTIONS = [
    // --- DOMAIN 1.0: PBQ & GENERAL SECURITY CONCEPTS (1-11) ---
  {
    id: 1,
    type: "matching",
    domain: "1.0",
    domainName: "General Security Concepts",
    isPBQ: true,
    q_en: "PBQ 1 (Performance-Based Matching): You are evaluating recent enterprise security incident logs. Match each identified Attack / Threat Scenario on the left with its MOST effective primary mitigation or security control on the right.",
    q_uz: "PBQ 1 (Amaliy Moslashtirish): Siz kompaniya xavfsizlik hodisalari jurnalini o'rganmoqdasiz. Chap tarafdagi har bir hujum yoki tahdid stsenariysini o'ng tarafdagi unga eng samarali asosiy himoya chorasi (mitigation) bilan to'g'ri moslashtiring.",
    prompts_en: [
      "1. Users receiving urgent emails requesting wire-transfers pretending to be from the CEO",
      "2. Automated credential-stuffing and brute-force attacks against user cloud portals",
      "3. Malicious SQL queries injected into unvalidated web search inputs to dump the database",
      "4. Rogue access point broadcasting corporate SSID to intercept wireless traffic (Evil Twin)",
      "5. Ransomware encrypting network shares via compromised endpoint credentials"
    ],
    prompts_uz: [
      "1. Bosh direktor nomidan soxta shoshilinch pul o'tkazish xatlarini olgan xodimlar",
      "2. Bulut portaliga qarshi avtomatlashtirilgan parollarni terish (credential-stuffing) hujumi",
      "3. Veb-sayt qidiruv maydoniga kiritilayotgan zararli SQL so'rovlari",
      "4. Kompaniya tarmog'i nomidan trafikni tutib olish uchun o'rnatilgan soxta Wi-Fi nuqtasi (Evil Twin)",
      "5. Tarmoq papkalarini shifrlab tovlamachilik qilayotgan Ransomware dasturi"
    ],
    targets_en: [
      "Executive anti-phishing training & dual-authorization wire transfer policy",
      "Mandatory Multi-Factor Authentication (MFA) & CAPTCHA rate-limiting",
      "Enforce Parameterized Queries (Prepared Statements) & Web Application Firewall (WAF)",
      "Deploy Wireless Intrusion Prevention System (WIPS) & 802.1X EAP-TLS certificates",
      "Immutable offline backups, network segmentation & EDR automated isolation"
    ],
    targets_uz: [
      "Rahbariyat uchun fishingga qarshi trening va ikki bosqichli tasdiqlash siyosati",
      "Majburiy ko'p omilli autentifikatsiya (MFA) va CAPTCHA so'rov cheklovi",
      "Parametrlangan so'rovlar (Prepared Statements) va WAF himoyasi",
      "WIPS (Simsiz tarmoq hujumlarini aniqlash) va 802.1X EAP-TLS sertifikatli ulanish",
      "O'zgartirib bo'lmas oflayn zaxira nusxalar, tarmoq segmentatsiyasi va EDR izolyatsiyasi"
    ],
    correct: { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 },
    explanation_en: "1->Executive Training & Dual Authorization mitigates whaling/BEC. 2->MFA stops credential stuffing. 3->Prepared statements prevent SQL injection. 4->WIPS & 802.1X detect rogue APs/Evil Twins. 5->Immutable backups & EDR mitigate ransomware.",
    explanation_uz: "1->Rahbariyat treningi va 2 bosqichli tasdiq whaling/BEC hujumini to'xtatadi. 2->MFA parollarni terishdan himoyalaydi. 3->Prepared statements SQL injectionni yo'q qiladi. 4->WIPS va 802.1X Evil Twin nuqtalarini fosh qiladi. 5->Oflayn nusxa va EDR ransomware'dan qutqaradi."
  },
  {
    id: 2,
    type: "matching",
    domain: "1.0",
    domainName: "General Security Concepts",
    isPBQ: true,
    q_en: "PBQ 2 (Performance-Based Matching): An administrator is hardening a border Next-Gen Firewall (NGFW) protecting an enterprise DMZ and internal domain. Match each Network Port and Protocol on the left with its correct primary security role and standard on the right.",
    q_uz: "PBQ 2 (Amaliy Moslashtirish): Administrator korporativ DMZ va ichki domenni himoya qiluvchi fayrvolda (NGFW) qoidalarni sozlamoqda. Chap tarafdagi har bir tarmoq porti va protokolini o'ng tarafdagi uning to'g'ri xavfsizlik roli va standarti bilan moslashtiring.",
    prompts_en: [
      "1. Port 22 (SSH)",
      "2. Port 443 (HTTPS / TLS 1.3)",
      "3. Port 88 (Kerberos)",
      "4. Port 636 (LDAPS)",
      "5. Port 53 (DNS / DNSSEC)"
    ],
    prompts_uz: [
      "1. Port 22 (SSH)",
      "2. Port 443 (HTTPS / TLS 1.3)",
      "3. Port 88 (Kerberos)",
      "4. Port 636 (LDAPS)",
      "5. Port 53 (DNS / DNSSEC)"
    ],
    targets_en: [
      "Encrypted remote terminal administration replacing unencrypted Telnet",
      "Secure public web applications using symmetric encryption with asymmetric handshake",
      "Active Directory authentication service issuing Ticket Granting Tickets (TGT)",
      "Directory queries encrypted with SSL/TLS preventing cleartext credential sniffing",
      "Domain name resolution with cryptographic signatures validating record authenticity"
    ],
    targets_uz: [
      "Ochiq Telnet o'rnini bosuvchi shifrlangan masofaviy terminal boshqaruvi",
      "Ommaviy veb-ilovalarni asimmetrik kalit almashinuvi va simmetrik ma'lumot shifrlash bilan himoyalash",
      "Active Directory domenida o'zaro autentifikatsiya uchun TGT biletlarini berish",
      "Foydalanuvchi ma'lumotlarini ochiq uzatilishini oldini oluvchi shifrlangan katalog so'rovlari",
      "Domen nomlarini xeshlangan raqamli imzolar orqali soxtalashtirishdan himoyalangan tarzda aniqlash"
    ],
    correct: { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 },
    explanation_en: "SSH (22) provides encrypted CLI admin. HTTPS (443) secures web traffic. Kerberos (88) handles AD ticket authentication. LDAPS (636) encrypts directory queries over TLS. DNSSEC (53) cryptographically validates DNS query responses.",
    explanation_uz: "SSH (22) shifrlangan CLI boshqaruvini beradi. HTTPS (443) veb trafigini shifrlaydi. Kerberos (88) AD domenida chiptalar bilan autentifikatsiya qiladi. LDAPS (636) TLS orqali katalog so'rovlarini himoyalaydi. DNSSEC (53) DNS so'rovlarining haqiqiyligini raqamli imzo bilan tekshiradi."
  },
  {
    id: 3,
    type: "matching",
    domain: "1.0",
    domainName: "General Security Concepts",
    isPBQ: true,
    q_en: "PBQ 3 (Performance-Based Matching): Match each Cryptographic Primitive or Algorithm on the left with its correct architectural classification and enterprise purpose on the right.",
    q_uz: "PBQ 3 (Amaliy Moslashtirish): Chap tarafdagi har bir kriptografik primitiv yoki algoritmni o'ng tarafdagi uning to'g'ri arxitektura toifasi va asosiy qo'llanish maqsadi bilan moslashtiring.",
    prompts_en: [
      "1. AES-256 (Galois/Counter Mode - GCM)",
      "2. RSA-4096",
      "3. SHA-256",
      "4. Elliptic Curve Diffie-Hellman (ECDH)",
      "5. HMAC-SHA256"
    ],
    prompts_uz: [
      "1. AES-256 (Galois/Counter Mode - GCM)",
      "2. RSA-4096",
      "3. SHA-256",
      "4. Elliptik egri chiziqli Diffie-Hellman (ECDH)",
      "5. HMAC-SHA256"
    ],
    targets_en: [
      "Symmetric Block Cipher providing high-throughput confidentiality and built-in authenticated integrity",
      "Asymmetric Algorithm used for digital signatures and PKI server certificate identity verification",
      "One-way cryptographic hash function producing a 256-bit digest for software integrity validation",
      "Asymmetric Key Exchange protocol generating shared symmetric keys over untrusted channels",
      "Keyed-Hash Message Authentication Code validating both message integrity and sender authenticity"
    ],
    targets_uz: [
      "Ham yuqori tezlikdagi maxfiylik, ham butunlikni ta'minlovchi simmetrik blokli shifr (GCM)",
      "Raqamli imzo va PKI server sertifikatlarini tekshirishda ishlatiladigan asimmetrik algoritm",
      "Dasturiy ta'minot butunligini tekshirish uchun 256-bitli dayjest yaratuvchi bir tomonlama xesh",
      "Ochiq tarmoq orqali umumiy simmetrik maxfiy kalit hosil qiluvchi kalit almashish protokoli",
      "Maxfiy kalit bilan xabar butunligi va yuboruvchining haqiqiyligini birgalikda tekshiruvchi kod"
    ],
    correct: { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 },
    explanation_en: "AES-GCM is symmetric authenticated encryption. RSA is asymmetric for PKI/signatures. SHA-256 is a hashing algorithm. ECDH is key exchange. HMAC provides keyed authentication.",
    explanation_uz: "AES-GCM simmetrik shifrlash va butunlik beradi. RSA asimmetrik PKI algoritmi. SHA-256 xesh funksiyasi. ECDH kalit almashish usuli. HMAC kalitli xabar haqiqiyligini tekshiradi."
  },
  {
    id: 4,
    type: "matching",
    domain: "1.0",
    domainName: "General Security Concepts",
    isPBQ: true,
    q_en: "PBQ 4 (Performance-Based Matching): An incident response team is responding to a critical ransomware intrusion. Match each Incident Response action on the left to its proper phase in the NIST SP 800-61 / CompTIA PICERL framework on the right.",
    q_uz: "PBQ 4 (Amaliy Moslashtirish): Hodisalarga javob berish jamoasi (IR) xavfli ransomware hujumini bartaraf etmoqda. Chap tarafdagi har bir harakatni o'ng tarafdagi NIST / CompTIA PICERL bosqichlariga to'g'ri moslashtiring.",
    prompts_en: [
      "1. Disconnecting affected subnets from the WAN and revoking compromised Active Directory Kerberos tickets",
      "2. Correlating SIEM alerts, validating abnormal beaconing, and declaring a confirmed security incident",
      "3. Re-imaging infected endpoints with verified gold images and deleting persistence registry run keys",
      "4. Restoring production databases from validated immutable offline backups and testing user connectivity",
      "5. Conducting an executive debriefing meeting to update playbooks and close identified security gaps"
    ],
    prompts_uz: [
      "1. Zararlangan tarmoq segmentlarini WAN'dan uzish va buzilgan domen hisoblarini bloklash",
      "2. SIEM ogohlantirishlarini tekshirish, noodatiy trafikni tasdiqlash va kiberhodisa deb e'lon qilish",
      "3. Zararlangan kompyuterlarni toza tasvir bilan qayta o'rnatish va reestrga kiritilgan kalitlarni tozalash",
      "4. Tizimni oflayn zaxiradan to'liq qayta tiklash va foydalanuvchilar ulanishini sinovdan o'tkazish",
      "5. Rahbariyat bilan xulosalar yig'ilishini o'tkazish, zaifliklarni bartaraf etish va yo'riqnomani yangilash"
    ],
    targets_en: [
      "Phase 3: Containment (Stopping the spread and limiting blast radius)",
      "Phase 2: Identification (Detecting, verifying, and determining scope)",
      "Phase 4: Eradication (Completely eliminating malware artifacts and persistence)",
      "Phase 5: Recovery (Restoring systems to normal operational state safely)",
      "Phase 6: Lessons Learned (Post-incident review and process improvement)"
    ],
    targets_uz: [
      "3-bosqich: Containment (Hujum tarqalishini to'xtatish va izolyatsiya qilish)",
      "2-bosqich: Identification (Hujumni aniqlash, tasdiqlash va ko'lamini baholash)",
      "4-bosqich: Eradication (Zararli dastur qoldiqlarini butunlay tozalash va yo'q qilish)",
      "5-bosqich: Recovery (Tizimlarni xavfsiz holatda normal ishlashga qaytarish)",
      "6-bosqich: Lessons Learned (Xatolardan xulosa chiqarish va himoyani kuchaytirish)"
    ],
    correct: { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 },
    explanation_en: "PICERL lifecycle: 1->Containment (isolation), 2->Identification (detection), 3->Eradication (removal), 4->Recovery (restoring services), 5->Lessons Learned (post-mortem).",
    explanation_uz: "PICERL bosqichlari: 1->Containment (izolyatsiya), 2->Identification (aniqlash), 3->Eradication (tozalash), 4->Recovery (tiklash), 5->Lessons Learned (xulosa chiqarish)."
  },
  {
    id: 5,
    type: "matching",
    domain: "1.0",
    domainName: "General Security Concepts",
    isPBQ: true,
    q_en: "PBQ 5 (Performance-Based Matching): Security controls are classified by their implementation mechanism (Technical, Managerial/Administrative, Operational, Physical) and function. Match each enterprise security measure on the left with its primary control category on the right.",
    q_uz: "PBQ 5 (Amaliy Moslashtirish): Xavfsizlik nazorati mexanizmlari tatbiq etilish usuliga qarab (Texnik, Boshqaruv/Ma'muriy, Operatsion, Jismoniy) toifalarga bo'linadi. Chap tarafdagi har bir xavfsizlik chorasini o'ng tarafdagi toifasi bilan moslashtiring.",
    prompts_en: [
      "1. Next-Generation Firewall (NGFW) ingress rule blocking inbound SMB (Port 445)",
      "2. Corporate Acceptable Use Policy (AUP) and mandatory background checks during onboarding",
      "3. Biometric iris scanners, mantraps, and crash-rated anti-ram bollards around the data center",
      "4. Mandatory quarterly phishing simulation training drills and incident response tabletop exercises",
      "5. Implementing centralized SIEM syslog aggregation to identify suspicious off-hours logons"
    ],
    prompts_uz: [
      "1. Next-Generation Firewall (NGFW) orqali tashqaridan kiruvchi SMB (Port 445) trafigini to'sish",
      "2. Qabul qilingan foydalanish siyosati (AUP) va xodimlarni ishga olishdagi tekshiruvlar",
      "3. Ma'lumotlar markazi atrofidagi biometrik skaner, mantrap shlyuzi va to'siqlar",
      "4. Har choraklik amaliy fishing simulyatsiyalari va stoli usti mashg'ulotlari",
      "5. Ish vaqtidan tashqaridagi shubhali kirishlarni aniqlash uchun markaziy SIEM log monitoringi"
    ],
    targets_en: [
      "Technical / Logical Control (Implemented via hardware, software, or firmware logic)",
      "Managerial / Administrative Control (Governance policies, procedures, and legal guidelines)",
      "Physical Control (Physical barriers protecting real-world perimeter and equipment)",
      "Operational Control (Practices and procedures executed on an ongoing basis by personnel)",
      "Detective Technical Control (Monitoring tools designed to alert upon security anomalies)"
    ],
    targets_uz: [
      "Texnik / Mantiqiy nazorat (Dasturiy yoki apparat vositalari orqali avtomatlashtirilgan)",
      "Boshqaruv / Ma'muriy nazorat (Siyosatlar, yo'riqnomalar va qoidalar)",
      "Jismoniy nazorat (Jismoniy to'siqlar, kameralar va eshik qulflari)",
      "Operatsion nazorat (Insonlar tomonidan doimiy bajariladigan o'quv va tekshiruv amallari)",
      "Aniqlovchi texnik nazorat (Anomaliya va buzilishlarni fosh qiluvchi monitoring tizimi)"
    ],
    correct: { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 },
    explanation_en: "1->Technical (Firewall logic). 2->Managerial (AUP policy). 3->Physical (barriers/scanners). 4->Operational (human training drills). 5->Detective/Technical (SIEM alerting).",
    explanation_uz: "1->Texnik (Fayrvol qoidasi). 2->Boshqaruv (AUP siyosati). 3->Jismoniy (to'siqlar). 4->Operatsion (xodimlar mashg'uloti). 5->Aniqlovchi texnik (SIEM log tahlili)."
  },
  {
    id: 6,
    domain: "1.0",
    domainName: "General Security Concepts",
    q_en: "A security guard stationed at the front entrance of a corporate data center represents which type of security control?",
    q_uz: "Korporativ ma'lumotlar markazining asosiy kirish joyida turgan qorovul qaysi turdagi xavfsizlik nazoratini ifodalaydi?",
    options_en: [
      "Technical / Logical",
      "Corrective",
      "Compensating / Detective only",
      "Physical / Operational"
    ],
    options_uz: [
      "Texnik / Mantiqiy",
      "Tuzatuvchi (Corrective)",
      "Faqat kompensatsion / aniqlovchi",
      "Jismoniy / Operatsion (Physical / Operational)"
    ],
    correct: 3,
    explanation_en: "A security guard is both a physical control (physically controlling access) and an operational control (implemented and carried out by people).",
    explanation_uz: "Xavfsizlik qorovuli jismoniy to'siq (Physical) va inson tomonidan bajariladigan jarayon (Operational) nazorati hisoblanadi."
  },
  {
    id: 7,
    domain: "1.0",
    domainName: "General Security Concepts",
    q_en: "Which of the following protocols allows a web browser to verify the revocation status of an SSL/TLS digital certificate in real time without downloading an entire list?",
    q_uz: "Quyidagi protokollardan qaysi biri veb-brauzerga SSL/TLS raqamli sertifikatining bekor qilinganlik holatini to'liq ro'yxatni yuklab olmasdan real vaqtda tekshirish imkonini beradi?",
    options_en: [
      "CRL (Certificate Revocation List)",
      "CSR (Certificate Signing Request)",
      "OCSP (Online Certificate Status Protocol)",
      "CA (Certificate Authority)"
    ],
    options_uz: [
      "CRL (Sertifikatlarni bekor qilish ro'yxati)",
      "CSR (Sertifikat imzolash so'rovi)",
      "OCSP (Onlayn sertifikat holati protokoli)",
      "CA (Sertifikat beruvchi organ)"
    ],
    correct: 2,
    explanation_en: "OCSP provides real-time verification of an individual certificate's revocation status, which is faster and more efficient than downloading large Certificate Revocation Lists (CRLs).",
    explanation_uz: "OCSP (Online Certificate Status Protocol) butun CRL ro'yxatini yuklab olmasdan, bitta sertifikatning bekor qilingan yoki yo'qligini darhol real vaqtda tekshirish imkonini beradi."
  },
  {
    id: 8,
    domain: "1.0",
    domainName: "General Security Concepts",
    q_en: "What is the PRIMARY purpose of adding a cryptographic 'salt' to user passwords before hashing them?",
    q_uz: "Foydalanuvchi parollarini xeshlashdan oldin ularga kriptografik 'tuz' (salt) qo'shishning ASOSIY maqsadi nima?",
    options_en: [
      "To allow administrators to recover plain text passwords if forgotten",
      "To prevent rainbow table and precomputed hash attacks",
      "To compress the password so it fits into database columns",
      "To encrypt passwords using symmetric private keys"
    ],
    options_uz: [
      "Administratorlarga unutilgan ochiq parollarni tiklash imkonini berish",
      "Rainbow table va oldindan hisoblangan xesh hujumlarining oldini olish",
      "Parolni ma'lumotlar bazasi ustunlariga sig'ishi uchun siqish",
      "Parollarni simmetrik maxfiy kalitlar bilan shifrlash"
    ],
    correct: 1,
    explanation_en: "Salting adds random data to the password before hashing, ensuring that two users with identical passwords will produce completely different hashes, thus defeating rainbow table attacks.",
    explanation_uz: "Salting (tuz qo'shish) bir xil parol kiritgan ikki foydalanuvchining xeshlari butunlay boshqacha chiqishini ta'minlaydi va Rainbow Table (tayyor xeshlar jadvallari) orqali parolni buzishni imkonsiz qiladi."
  },
  {
    id: 9,
    domain: "1.0",
    domainName: "General Security Concepts",
    q_en: "A security analyst discovers that an employee was able to approve their own purchase requests because their role possessed excessive administrative permissions. Which principle was violated?",
    q_uz: "Xavfsizlik tahlilchisi xodim o'zining xarid so'rovlarini o'zi tasdiqlay olganini aniqladi, chunki uning roli haddan tashqari ko'p ruxsatlarga ega bo'lgan. Qaysi xavfsizlik tamoyili buzilgan?",
    options_en: [
      "Separation of Duties",
      "Job Rotation",
      "Mandatory Vacations",
      "Clean Desk Policy"
    ],
    options_uz: [
      "Majburiyatlarni taqsimlash (Separation of Duties)",
      "Vazifalarni almashtirib turish (Job Rotation)",
      "Majburiy ta'til (Mandatory Vacations)",
      "Toza stol siyosati (Clean Desk Policy)"
    ],
    correct: 0,
    explanation_en: "Separation of Duties requires critical tasks to be divided among multiple individuals to prevent fraud, unauthorized actions, or single points of human failure.",
    explanation_uz: "Separation of Duties (majburiyatlarni ajratish) firibgarlikning oldini olish uchun so'rov yuboruvchi va uni tasdiqlovchi shaxs turli xil odamlar bo'lishini talab qiladi."
  },
  {
    id: 10,
    domain: "1.0",
    domainName: "General Security Concepts",
    q_en: "Which of the following security controls is explicitly designed to discourage an adversary from attempting an attack by making the risk appear greater than the reward?",
    q_uz: "Quyidagi xavfsizlik nazoratlaridan qaysi biri xavfni mukofotdan ko'ra kattaroq ko'rsatish orqali hujumchini hujum qilish fikridan qaytarish (discourage) uchun mo'ljallangan?",
    options_en: [
      "Corrective control",
      "Compensating control",
      "Detective control",
      "Deterrent control"
    ],
    options_uz: [
      "Tuzatuvchi nazorat (Corrective)",
      "Kompensatsion nazorat (Compensating)",
      "Aniqlashtiruvchi nazorat (Detective)",
      "Qo'rqituvchi / Qaytaruvchi nazorat (Deterrent)"
    ],
    correct: 3,
    explanation_en: "Deterrent controls are designed to dissuade potential attackers. Examples include prominent warning signs, guard dogs, and visible security patrols.",
    explanation_uz: "Deterrent (cho'chituvchi/qaytaruvchi) nazorat turlari hujumchining ko'ziga ko'rinib, uni bu niyatidan qaytarish uchun xizmat qiladi (ogohlantiruvchi belgilar, kameralar, qorovullar)."
  },
  {
    id: 11,
    domain: "1.0",
    domainName: "General Security Concepts",
    q_en: "When an asymmetric key pair is used to establish secure communications, which key is used by the recipient to decrypt a message that was encrypted by the sender?",
    q_uz: "Xavfsiz aloqani o'rnatish uchun asimmetrik kalitlar juftligi ishlatilganda, jo'natuvchi tomonidan shifrlangan xabarni ochish (decrypt) uchun qabul qiluvchi qaysi kalitdan foydalanadi?",
    options_en: [
      "The sender's public key",
      "The recipient's public key",
      "The recipient's private key",
      "The CA's root key"
    ],
    options_uz: [
      "Jo'natuvchining ochiq kaliti (Sender's public key)",
      "Qabul qiluvchining ochiq kaliti (Recipient's public key)",
      "Qabul qiluvchining maxfiy kaliti (Recipient's private key)",
      "CA ning ildiz kaliti"
    ],
    correct: 2,
    explanation_en: "In asymmetric encryption for confidentiality, the sender encrypts the message with the recipient's public key, and only the recipient's private key can decrypt it.",
    explanation_uz: "Maxfiylikni ta'minlashda jo'natuvchi xabarni qabul qiluvchining ochiq kaliti (Public key) bilan shifrlaydi. Uni faqat qabul qiluvchining o'z maxfiy kaliti (Private key) ocha oladi."
  },

  // --- DOMAIN 2.0: THREATS, VULNERABILITIES, AND MITIGATIONS (12-31) ---
  {
    id: 12,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "An attacker sends an urgent email to the CFO, impersonating the CEO and requesting an immediate wire transfer to a vendor account. What specific attack is occurring?",
    q_uz: "Hujumchi kompaniya bosh direktori (CEO) nomidan moliya direktoriga (CFO) zudlik bilan begona hisob raqamga pul o'tkazishni talab qilib shoshilinch xat yubordi. Bu qanday aniq hujum turi?",
    options_en: [
      "Vishing",
      "Whaling",
      "Watering Hole Attack",
      "Smishing"
    ],
    options_uz: [
      "Vishing (Telefon aldovi)",
      "Whaling (Katta baliq ovi)",
      "Watering Hole Attack (Suv havzasi hujumi)",
      "Smishing (SMS aldovi)"
    ],
    correct: 1,
    explanation_en: "Whaling is a highly targeted phishing attack directed specifically at high-profile executives like the CEO or CFO, often for financial gain or sensitive corporate data.",
    explanation_uz: "Whaling — kompaniyaning yuqori martabali rahbarlariga (CEO, CFO) qaratilgan maxsus firibgarlik (phishing) hujumidir."
  },
  {
    id: 13,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "An employee observed an unknown person holding coffee cups walking closely behind an authorized worker to enter a secured building without badging in. What attack is this?",
    q_uz: "Xodim notanish shaxs qahva stakanlarini ushlab olib, ruxsatnomali ishchining orqasidan kartochkasini urmasdan bino eshigidan kirib olganini ko'rdi. Bu qanday hujum?",
    options_en: [
      "Tailgating / Piggybacking",
      "Shoulder Surfing",
      "Pretexting",
      "Dumpster Diving"
    ],
    options_uz: [
      "Orqadan suqilib kirish (Tailgating / Piggybacking)",
      "Yelkadan qarash (Shoulder Surfing)",
      "Oldindan to'qilgan hikoya (Pretexting)",
      "Chiqindilarni titkilash (Dumpster Diving)"
    ],
    correct: 0,
    explanation_en: "Tailgating (or piggybacking) involves an unauthorized individual following closely behind an authorized employee to bypass physical access control barriers.",
    explanation_uz: "Tailgating (yoki Piggybacking) ruxsatsiz shaxsning eshikdan ruxsatnomasi bor xodimning orqasidan jismonan ergashib kirib olishi hisoblanadi."
  },
  {
    id: 14,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "A worm infects workstations on a corporate LAN by scanning for and exploiting unpatched SMB vulnerabilities without any user interaction. Which characteristic distinguishes a worm from a virus?",
    q_uz: "Qurt (Worm) korporativ tarmoqdagi kompyuterlarni foydalanuvchi aralashuvisiz patch qilinmagan SMB zaifliklari orqali zararlaydi. Qurtni virusdan ajratib turuvchi asosiy xususiyat nima?",
    options_en: [
      "Worms require a host file to execute",
      "Worms operate exclusively in CPU registers",
      "Worms only encrypt hard drives for ransom",
      "Worms can self-replicate and spread across networks independently"
    ],
    options_uz: [
      "Qurtlar ishga tushishi uchun mezbon fayl (host file) kerak",
      "Qurtlar faqat CPU registrlarida ishlaydi",
      "Qurtlar faqat to'lov uchun disklarni shifrlaydi",
      "Qurtlar o'z-o'zini nusxalab, tarmoq bo'ylab mustaqil ravishda tarqala oladi"
    ],
    correct: 3,
    explanation_en: "Unlike a computer virus, which requires human action and a host file to attach to, a worm can self-replicate and propagate across network connections autonomously.",
    explanation_uz: "Virus inson harakati (faylni ochish) orqali tarqalsa, Qurt (Worm) esa inson aralashuvisiz tarmoq orqali mustaqil ko'payib tarqaladi."
  },
  {
    id: 15,
    type: "multi_choice",
    selectCount: 2,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "Which TWO of the following indicators most strongly suggest that an incoming email is a targeted spear phishing attempt rather than a generic mass spam message? (Choose TWO)",
    q_uz: "Quyidagi belgilardan qaysi IKKITASI kelgan elektron xatning ommaviy spam emas, balki maqsadli 'Spear Phishing' hujumi ekanligini eng kuchli darajada ko'rsatadi? (IKKITASINI tanlang)",
    options_en: [
      "The message contains personalized details referencing the recipient's internal department and actual manager's name",
      "The email originates from a high-reputation domain like github.com",
      "The sender's domain has a subtle typographic variation (typosquatting) mimicking the company's external accounting vendor",
      "The email includes a standard commercial unsubscribe link at the bottom",
      "The message is sent simultaneously to thousands of unrelated random consumer email addresses"
    ],
    options_uz: [
      "Xatda qabul qiluvchining kompaniyadagi bo'limi va haqiqiy rahbari ismi kabi shaxsiy aniq ma'lumotlar keltirilgan",
      "Xat github.com kabi obro'li ommaviy domendan kelgan",
      "Jo'natuvchi domeni kompaniyaning haqiqiy buxgalteriya hamkori domeniga juda o'xshash qilib yozilgan (Typosquatting)",
      "Xatning pastki qismida standart obunani bekor qilish (Unsubscribe) havolasi mavjud",
      "Xat bir vaqtning o'zida minglab tasodifiy notanish manzillarga jo'natilgan"
    ],
    correct: [0, 2],
    explanation_en: "Spear phishing relies on reconnaissance to personalize emails (internal names/projects) and frequently leverages look-alike domains (typosquatting) to establish false trust.",
    explanation_uz: "Spear Phishing nishonga olingan shaxs haqidagi ma'lumotlardan foydalanadi (rahbar ismi, bo'lim) va ishonch qozonish uchun soxta o'xshash domenlardan (typosquatting) foydalanadi."
  },
  {
    id: 16,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "An attacker inputs the following text into a login form username field: `' OR '1'='1' --`. Which type of attack is being executed?",
    q_uz: "Hujumchi tizimga kirish formasining foydalanuvchi nomi maydoniga quyidagi matnni kiritdi: `' OR '1'='1' --`. Qaysi turdagi hujum amalga oshirilmoqda?",
    options_en: [
      "Cross-Site Scripting (XSS)",
      "SQL Injection (SQLi)",
      "Cross-Site Request Forgery (CSRF)",
      "Buffer Overflow"
    ],
    options_uz: [
      "Cross-Site Scripting (XSS)",
      "SQL Injection (SQLi)",
      "Cross-Site Request Forgery (CSRF)",
      "Buffer Overflow"
    ],
    correct: 1,
    explanation_en: "The syntax `' OR '1'='1' --` is a classic SQL Injection payload designed to make the SQL query evaluate to true, bypassing authentication controls.",
    explanation_uz: "Ushbu sintaksis klassik SQL Injection hujumi bo'lib, SQL so'rovini doim rost (True) holatga keltirib, parolsiz tizimga kirishga urinadi."
  },
  {
    id: 17,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "What is the MOST effective coding practice to prevent SQL Injection attacks on web applications?",
    q_uz: "Veb-ilovalarda SQL Injection hujumlarining oldini olish uchun ENG SAMARALI dasturlash amaliyoti qaysi?",
    options_en: [
      "Utilizing Parameterized Queries (Prepared Statements)",
      "Employing client-side JavaScript character length limits",
      "Encrypting database tables with AES-128",
      "Disabling error logging on the production database"
    ],
    options_uz: [
      "Parametrlangan so'rovlar (Prepared Statements) dan foydalanish",
      "Klient tomonidagi JavaScript belgilar uzunligi chegarasini qo'llash",
      "Ma'lumotlar bazasi jadvallarini AES-128 bilan shifrlash",
      "Ishchi ma'lumotlar bazasida xatolar logini o'chirib qo'yish"
    ],
    correct: 0,
    explanation_en: "Parameterized queries (prepared statements) ensure that user input is treated strictly as data, never as executable code, completely neutralizing SQL injection.",
    explanation_uz: "Parametrlangan so'rovlar (Prepared Statements / Parameterized Queries) foydalanuvchi kiritgan ma'lumotni hech qachon kod sifatida emas, faqat oddiy matn sifatida qabul qiladi va SQLi ni to'xtatadi."
  },
  {
    id: 18,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "An attacker injects malicious JavaScript into a public forum comment section. When other users view the thread, their session cookies are stolen. What attack is this?",
    q_uz: "Hujumchi ommaviy forum izohlari bo'limiga zararli JavaScript kod joyladi. Boshqa foydalanuvchilar ushbu sahifani ko'rganida, ularning sessiya cookie fayllari o'g'irlanadi. Bu qanday hujum?",
    options_en: [
      "Server-Side Request Forgery (SSRF)",
      "Reflected Cross-Site Scripting (Reflected XSS)",
      "Directory Traversal",
      "Stored Cross-Site Scripting (Stored XSS)"
    ],
    options_uz: [
      "Server tomonidagi so'rovni soxtalashtirish (SSRF)",
      "Aks etuvchi XSS (Reflected Cross-Site Scripting)",
      "Kataloglar bo'ylab o'tish (Directory Traversal)",
      "Saqlanadigan XSS (Stored Cross-Site Scripting)"
    ],
    correct: 3,
    explanation_en: "Stored (persistent) XSS occurs when malicious code is permanently stored on the target server (e.g. in a database comment), affecting every user who visits that page.",
    explanation_uz: "Stored XSS da zararli script ma'lumotlar bazasida saqlanadi va ushbu sahifani ochgan har bir foydalanuvchining brauzerida ishga tushib, cookie'larni o'g'irlaydi."
  },
  {
    id: 19,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "A state-sponsored group infiltrates a defense contractor's network and remains undetected for over 18 months, quietly extracting intellectual property. Which threat actor type is this?",
    q_uz: "Davlat tomonidan qo'llab-quvvatlanuvchi xakerlar guruhi mudofaa korxonasining tarmog'iga kirib, 18 oydan ko'proq vaqt davomida sezilmasdan intellektual mulkni o'g'irlab yurdi. Bu qaysi tahdid manbai turi?",
    options_en: [
      "Script Kiddie",
      "Hacktivist",
      "Advanced Persistent Threat (APT)",
      "Disgruntled Insider"
    ],
    options_uz: [
      "Script Kiddie",
      "Hacktivist",
      "Ilg'or doimiy tahdid (Advanced Persistent Threat - APT)",
      "Norozi ichki xodim (Disgruntled Insider)"
    ],
    correct: 2,
    explanation_en: "An Advanced Persistent Threat (APT) is typically a well-funded, highly skilled nation-state actor that establishes stealthy, long-term persistence within targeted critical networks.",
    explanation_uz: "APT (Advanced Persistent Threat) davlat tomonidan moliyalashtiriluvchi, yuqori malakali guruh bo'lib, nishon tarmoqda oylab yashirinib, ma'lumotlarni o'g'irlash bilan shug'ullanadi."
  },
  {
    id: 20,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "An attacker floods a target web server with a massive volume of ICMP echo requests using thousands of compromised IoT devices. What type of attack is taking place?",
    q_uz: "Hujumchi minglab buzib kirilgan IoT qurilmalari (Botnet) yordamida nishon veb-serverga ulkan hajmdagi ICMP paketlarini yuborib uni to'xtatib qo'ydi. Bu qanday hujum?",
    options_en: [
      "Man-in-the-Middle Attack",
      "Distributed Denial of Service (DDoS)",
      "Bluejacking",
      "Replay Attack"
    ],
    options_uz: [
      "O'rtadagi odam hujumi (MitM)",
      "Taqsimlangan xizmat ko'rsatishni rad etish (DDoS)",
      "Bluejacking",
      "Qayta takrorlash hujumi (Replay Attack)"
    ],
    correct: 1,
    explanation_en: "A Distributed Denial of Service (DDoS) attack leverages multiple distributed machines (a botnet) to overwhelm target server bandwidth and resources.",
    explanation_uz: "DDoS (Distributed Denial of Service) bir nechta taqsimlangan kompyuterlar yoki botnet orqali serverga haddan ortiq so'rov yuborib, uning xizmatini to'xtatib qo'yishdir."
  },
  {
    id: 21,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "An attacker on a local network broadcasts fraudulent ARP replies associating the default gateway IP address with their own MAC address. What attack is this?",
    q_uz: "Lokal tarmoqdagi hujumchi standart shlyuz (default gateway) IP manzilini o'zining MAC manziliga bog'lab, soxta ARP javoblarini tarqatmoqda. Bu qanday hujum?",
    options_en: [
      "ARP Poisoning / Spoofing",
      "DNS Sinkholing",
      "BGP Hijacking",
      "MAC Filtering"
    ],
    options_uz: [
      "ARP Poisoning / Spoofing",
      "DNS Sinkholing",
      "BGP Hijacking",
      "MAC Filtering"
    ],
    correct: 0,
    explanation_en: "ARP Poisoning corrupts the ARP caches of local hosts, redirecting outbound traffic to the attacker's system to perform an on-path (MitM) eavesdropping attack.",
    explanation_uz: "ARP Poisoning tarmoqdagi kompyuterlarning ARP keshini soxtalashtirib, butun trafikni hujumchining mashinasi orqali o'tkazish (On-Path/MitM) imkonini beradi."
  },
  {
    id: 22,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "Which of the following vulnerability scanning concepts describes a scenario where a scanner reports that an Apache server is vulnerable, but in reality, the vulnerability does not exist?",
    q_uz: "Zaifliklarni skaner qilishda skaner dasturi Apache serverda zaiflik bor deb xabar berdi, ammo haqiqatda bu zaiflik mavjud emas. Bu qanday holat?",
    options_en: [
      "True Positive",
      "True Negative",
      "False Negative",
      "False Positive"
    ],
    options_uz: [
      "To'g'ri ijobiy (True Positive)",
      "To'g'ri salbiy (True Negative)",
      "Soxta salbiy (False Negative)",
      "Soxta ijobiy (False Positive)"
    ],
    correct: 3,
    explanation_en: "A False Positive occurs when an alert indicates a security vulnerability or incident that does not actually exist.",
    explanation_uz: "False Positive (soxta signal) — tizimda xavf yoki zaiflik bo'lmasa ham, xavfsizlik skaneri noto'g'ri signal berishi holatidir."
  },
  {
    id: 23,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "A security analyst discovers that an attacker was able to force a user's web browser to execute an unauthorized financial transfer while the user was logged into their online bank. What attack is this?",
    q_uz: "Xavfsizlik tahlilchisi foydalanuvchi o'zining onlayn bankiga kirib turgan paytida, hujumchi uning brauzerini foydalanuvchi nomidan pul o'tkazmasini bajarishga majbur qilganini aniqladi. Bu qanday hujum?",
    options_en: [
      "SQL Injection",
      "Buffer Overflow",
      "Cross-Site Request Forgery (CSRF)",
      "Session Splicing"
    ],
    options_uz: [
      "SQL Injection",
      "Bufer toshishi (Buffer Overflow)",
      "Saytlararo so'rovlarni soxtalashtirish (CSRF)",
      "Sessiyani birlashtirish"
    ],
    correct: 2,
    explanation_en: "CSRF exploits the existing trust a web application has in an authenticated user's browser, submitting unauthorized requests on their behalf.",
    explanation_uz: "CSRF (Cross-Site Request Forgery) foydalanuvchi tizimda avtorizatsiyadan o'tganligidan foydalanib, uning nomidan yashirincha zararli so'rov yuborishdir."
  },
  {
    id: 24,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "An attacker creates a malicious wireless access point named 'CoffeeShop_Free_WiFi' right outside a café to intercept customer login credentials. What is this attack called?",
    q_uz: "Hujumchi mijozlarning parollarini o'g'irlash uchun qahvaxona yonida 'CoffeeShop_Free_WiFi' nomli soxta simsiz ulanish nuqtasini yaratdi. Bu hujum qanday ataladi?",
    options_en: [
      "Jamming",
      "Evil Twin",
      "War Driving",
      "NFC Sniffing"
    ],
    options_uz: [
      "Signallarni bostirish (Jamming)",
      "Yovuz egizak (Evil Twin)",
      "War Driving",
      "NFC Sniffing"
    ],
    correct: 1,
    explanation_en: "An Evil Twin is a rogue wireless access point masquerading as a legitimate network by cloning its SSID to eavesdrop on user traffic.",
    explanation_uz: "Evil Twin — qonuniy Wi-Fi tarmog'ining nomini (SSID) nusxalab, foydalanuvchilar unga ulanganda ularning trafigini o'g'irlashga mo'ljallangan soxta Wi-Fi nuqtasidir."
  },
  {
    id: 25,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "Which social engineering attack relies on creating an elaborate fabricated scenario to trick an employee into divulging sensitive data or resetting a password?",
    q_uz: "Xodimni aldab maxfiy ma'lumotlarni berishga yoki parolni yangilashga majbur qilish uchun to'qilgan murakkab stsenariyga tayanuvchi ijtimoiy muhandislik hujumi nima?",
    options_en: [
      "Pretexting",
      "Shoulder Surfing",
      "Dumpster Diving",
      "Baiting"
    ],
    options_uz: [
      "Pretexting (Soxta bahona / stsenariy)",
      "Shoulder Surfing",
      "Chiqindilarni titkilash",
      "Baiting (Qarmoqqa ilintirish)"
    ],
    correct: 0,
    explanation_en: "Pretexting involves establishing a believable false pretext (e.g. pretending to be an auditor, IT helpdesk, or corporate officer) to manipulate a victim into releasing info.",
    explanation_uz: "Pretexting — hujumchi o'zini IT xodimi, auditor yoki rahbar sifatida ko'rsatib, to'qima hikoya orqali qurbonni aldashidir."
  },
  {
    id: 26,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "A vulnerability has been discovered in a major web framework, and proof-of-concept exploit code is actively being used by hackers before the vendor has issued a patch. What type of vulnerability is this?",
    q_uz: "Yirik veb-freymvorkda zaiflik aniqlandi va ishlab chiqaruvchi hali xavfsizlik patchini chiqarmasdan oldin xakerlar undan hujum uchun foydalanishmoqda. Bu qanday zaiflik?",
    options_en: [
      "Legacy software vulnerability",
      "Firmware downgrade vulnerability",
      "Side-channel vulnerability",
      "Zero-day vulnerability"
    ],
    options_uz: [
      "Eski dasturiy ta'minot zaifligi",
      "Mikrodasturni pasaytirish zaifligi",
      "Yon kanal zaifligi",
      "Nol kunlik zaiflik (Zero-day vulnerability)"
    ],
    correct: 3,
    explanation_en: "A Zero-Day vulnerability is an undisclosed flaw unknown to the software developer, or known but without an official patch available, leaving systems vulnerable to active exploitation.",
    explanation_uz: "Zero-day — ishlab chiqaruvchi hali xabardor bo'lmagan yoki unga qarshi hali hech qanday tuzatish (patch) chiqarilmagan yangi zaiflikdir."
  },
  {
    id: 27,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "Which of the following describes a hardware or software attack where malicious code writes data beyond the allocated memory boundaries, corrupting adjacent memory?",
    q_uz: "Zararli kod ajratilgan xotira chegarasidan tashqariga ma'lumot yozib, qo'shni xotira kataklarini buzadigan apparat yoki dasturiy hujum qanday ataladi?",
    options_en: [
      "Race Condition",
      "Integer Underflow",
      "Buffer Overflow",
      "Memory Leak"
    ],
    options_uz: [
      "Poyga holati (Race Condition)",
      "Butun son yetishmovchiligi",
      "Bufer toshishi (Buffer Overflow)",
      "Xotira oqishi (Memory Leak)"
    ],
    correct: 2,
    explanation_en: "A buffer overflow occurs when a program puts more data into a memory buffer than it can hold, overwriting adjacent memory spaces to execute malicious code.",
    explanation_uz: "Buffer Overflow (bufer toshishi) dastur bufer sig'imidan ortiq ma'lumot qabul qilib, xotiraning boshqa qismidagi ma'lumotlarni buzishi yoki begona kodni ishga tushirishidir."
  },
  {
    id: 28,
    type: "multi_choice",
    selectCount: 2,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "A security engineer is hardening a mission-critical web application against both Stored Cross-Site Scripting (XSS) and SQL Injection (SQLi). Which TWO of the following secure coding and architectural techniques provide the STRONGEST defense? (Choose TWO)",
    q_uz: "Xavfsizlik muhandisi veb-ilovani ham doimiy (Stored) XSS, ham SQL Injection hujumlaridan himoyalamoqda. Quyidagi xavfsiz dasturlash va arxitektura usullaridan qaysi IKKITASI ENG KUCHLI himoyani ta'minlaydi? (IKKITASINI tanlang)",
    options_en: [
      "Use client-side JavaScript validation exclusively to sanitize form fields",
      "Implement Parameterized Queries (Prepared Statements) for all database transactions",
      "Enforce Context-Aware Output Encoding on all untrusted user-supplied data rendered in the browser",
      "Increase the web server session timeout limit to 24 hours",
      "Disable HTTPS and rely entirely on server-side symmetric cookies"
    ],
    options_uz: [
      "Formalarni tozalash uchun faqat brauzer (client-side) JavaScript tekshiruviga tayanish",
      "Barcha ma'lumotlar bazasi so'rovlari uchun Parametrlangan so'rovlar (Prepared Statements) dan foydalanish",
      "Brauzerda aks etadigan barcha kiritilgan ma'lumotlar uchun kontekstga mos Chiqish Kodlashini (Output Encoding) qo'llash",
      "Veb-server sessiyasi muddatini 24 soatgacha uzaytirish",
      "HTTPS ni o'chirib, to'liq serverdagi simmetrik kukilarga tayanish"
    ],
    correct: [1, 2],
    explanation_en: "Prepared Statements prevent SQLi by treating user inputs strictly as parameters, never executable code. Context-aware Output Encoding neutralizes XSS scripts by rendering them as benign text.",
    explanation_uz: "Prepared Statements foydalanuvchi ma'lumotini SQL kodi sifatida bajarilishiga yo'l qo'ymaydi. Chiqish kodlashi (Output Encoding) esa brauzerda skriptlarning bajarilishini to'xtatib, XSS hujumini bartaraf etadi."
  },
  {
    id: 29,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "Which of the following attacks involves corrupting a DNS cache to cause a DNS server to return an incorrect IP address, diverting users to a malicious site?",
    q_uz: "Quyidagi hujumlardan qaysi biri DNS server keshini buzib, foydalanuvchilarni soxta zararli saytlarga yo'naltirishga sabab bo'ladi?",
    options_en: [
      "DNS Poisoning / Spoofing",
      "Domain Hijacking",
      "Typosquatting",
      "DNS Amplification"
    ],
    options_uz: [
      "DNS Poisoning / Spoofing",
      "Domen nomini o'g'irlash (Domain Hijacking)",
      "Typosquatting (Yozuvdagi xatolikdan foydalanish)",
      "DNS Amplification"
    ],
    correct: 0,
    explanation_en: "DNS Cache Poisoning alters resolved addresses in a recursive DNS resolver cache, redirecting valid requests to an attacker-controlled server.",
    explanation_uz: "DNS Poisoning — DNS serverning kesh xotirasiga soxta IP yozuvini kiritib qo'yish orqali haqiqiy sayt o'rniga soxta saytni ochish hujumidir."
  },
  {
    id: 30,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "A developer registers the domain name 'paypa1.com' to intercept traffic meant for 'paypal.com'. What type of attack is this?",
    q_uz: "Hujumchi 'paypal.com' saytiga mo'ljallangan trafikni tutib olish maqsadida 'paypa1.com' domenini ro'yxatdan o'tkazdi. Bu qanday hujum?",
    options_en: [
      "Clickjacking",
      "Replay Attack",
      "DNS Tunneling",
      "Typosquatting (URL Hijacking)"
    ],
    options_uz: [
      "Clickjacking",
      "Replay Attack",
      "DNS Tunneling",
      "Typosquatting (URL Hijacking)"
    ],
    correct: 3,
    explanation_en: "Typosquatting (URL Hijacking) relies on users mistyping common domain names in their browsers to direct them to look-alike malicious sites.",
    explanation_uz: "Typosquatting — foydalanuvchilar klaviaturada xato yozishi mumkin bo'lgan o'xshash domen nomlarini ataylab ro'yxatdan o'tkazib aldash usulidir."
  },
  {
    id: 31,
    domain: "2.0",
    domainName: "Threats, Vulnerabilities & Mitigations",
    q_en: "An attacker monitors encrypted traffic between a client and a web application, records the session cookie authentication token, and resends it to authenticate without a password. What attack is this?",
    q_uz: "Hujumchi klient va veb-ilova o'rtasidagi autentifikatsiya tokenini yozib oldi va keyinchalik parolsiz tizimga kirish uchun ushbu tokenni serverga qayta yubordi. Bu qanday hujum?",
    options_en: [
      "Brute-Force Attack",
      "DDoS Attack",
      "Replay Attack",
      "XSS Attack"
    ],
    options_uz: [
      "Brute-Force hujumi",
      "DDoS hujumi",
      "Qayta takrorlash hujumi (Replay Attack)",
      "XSS hujumi"
    ],
    correct: 2,
    explanation_en: "A Replay Attack intercepts valid data transmission (such as authentication sessions or tokens) and retransmits it to fraudulently gain access.",
    explanation_uz: "Replay Attack — ushlangan qonuniy ma'lumot yoki tokenni o'zgartirmasdan serverga qayta yuborib, tizimni aldash hujumidir."
  },

  // --- DOMAIN 3.0: SECURITY ARCHITECTURE (32-47) ---
  {
    id: 32,
    domain: "3.0",
    domainName: "Security Architecture",
    q_en: "An organization hosts an e-commerce website. Where should the publicly accessible web servers be placed to prevent external attackers from directly reaching internal database servers?",
    q_uz: "Tashkilot elektron tijorat veb-saytiga ega. Tashqi xakerlar ichki ma'lumotlar bazasi serverlariga to'g'ridan-to'g'ri o'ta olmasligi uchun ommaviy veb-serverlar qayerga joylashtirilishi kerak?",
    options_en: [
      "Directly in the Internal LAN",
      "In a Demilitarized Zone (DMZ)",
      "On an isolated guest Wi-Fi network",
      "Inside the Core Switch Management VLAN"
    ],
    options_uz: [
      "To'g'ridan-to'g'ri ichki LAN tarmog'ida",
      "Demilitarizatsiya qilingan hududda (DMZ)",
      "Alohida mehmonlar Wi-Fi tarmog'ida",
      "Switch boshqaruv VLAN tarmog'ida"
    ],
    correct: 1,
    explanation_en: "A DMZ (screened subnet) is a perimeter network that holds public-facing services (web, mail) while shielding internal databases and private workstations behind an inner firewall.",
    explanation_uz: "DMZ (Demilitarized Zone) tashqi internet va ichki tarmoq o'rtasidagi bufer hudud bo'lib, ommaviy serverlar shu yerda turadi va ichki tarmoqni himoya qiladi."
  },
  {
    id: 33,
    domain: "3.0",
    domainName: "Security Architecture",
    q_en: "Which of the following devices is capable of inspecting Layer 7 application traffic, enforcing URL filtering, and decrypting TLS traffic for deep packet inspection?",
    q_uz: "Quyidagi qurilmalardan qaysi biri 7-qavat (Application) trafigini tekshirish, URL filtrlash va paketlarni chuqur tekshirish (DPI) uchun TLS trafigini shifrdan ochish qobiliyatiga ega?",
    options_en: [
      "Next-Generation Firewall (NGFW)",
      "Stateless Packet Filter",
      "Layer 2 Switch",
      "Network Hub"
    ],
    options_uz: [
      "Yangi avlod brandmauer (Next-Generation Firewall - NGFW)",
      "Stateless paket filtri",
      "2-qavat Switch",
      "Tarmoq Hubi"
    ],
    correct: 0,
    explanation_en: "Next-Generation Firewalls (NGFWs) provide deep packet inspection (DPI), Layer 7 application awareness, TLS decryption, and integrated intrusion prevention.",
    explanation_uz: "Next-Gen Firewall (NGFW) an'anaviy port filtrlaridan farqli ravishda 7-qavat ilovalarini, veb-saytlarni va shifrlangan TLS paketlar ichini tekshira oladi."
  },
  {
    id: 34,
    domain: "3.0",
    domainName: "Security Architecture",
    q_en: "What is the PRIMARY operational difference between an Intrusion Detection System (IDS) and an Intrusion Prevention System (IPS)?",
    q_uz: "Hujumni aniqlash tizimi (IDS) va Hujumning oldini olish tizimi (IPS) o'rtasidagi ASOSIY farq nima?",
    options_en: [
      "An IDS uses signatures, while an IPS only uses behavioral heuristics",
      "An IDS is hardware-based, while an IPS is exclusively cloud software",
      "An IDS inspects encrypted traffic, while an IPS can only inspect plaintext",
      "An IDS sits out-of-band and alerts, while an IPS sits inline and actively blocks traffic"
    ],
    options_uz: [
      "IDS faqat signaturalarni ishlatadi, IPS esa faqat xatti-harakatlarni",
      "IDS doim apparat qurilma, IPS esa faqat bulut dasturi",
      "IDS shifrlangan trafikni ko'radi, IPS esa faqat ochiq matnni",
      "IDS passiv kuzatib ogohlantiradi, IPS esa tarmoq yo'lida (inline) turib trafikni to'xtatadi"
    ],
    correct: 3,
    explanation_en: "An IDS operates out-of-band to monitor traffic copies and issue alerts. An IPS sits inline directly in the traffic flow and can actively drop packets to prevent attacks.",
    explanation_uz: "IDS tarmoq trafigining nusxasini olib faqat ogohlantirish (Alert) beradi. IPS esa tarmoq o'rtasida turib, hujumkor paketlarni darhol yo'q qiladi (Drop/Block)."
  },
  {
    id: 35,
    domain: "3.0",
    domainName: "Security Architecture",
    q_en: "A company wants to prevent unauthorized transmission of proprietary code and credit card numbers outside the corporate network via email or web uploads. Which solution should be deployed?",
    q_uz: "Kompaniya maxfiy dastur kodlari va kredit karta raqamlarining email yoki veb orqali tarmoqdan tashqariga sizib chiqishini to'xtatmoqchi. Qaysi xavfsizlik vositasi o'rnatilishi kerak?",
    options_en: [
      "Forward Proxy",
      "Network Address Translation (NAT)",
      "Data Loss Prevention (DLP)",
      "Dynamic Host Configuration Protocol (DHCP)"
    ],
    options_uz: [
      "Forward Proxy",
      "Tarmoq manzillarini tarjima qilish (NAT)",
      "Ma'lumotlar sizishini oldini olish (Data Loss Prevention - DLP)",
      "DHCP protokoli"
    ],
    correct: 2,
    explanation_en: "DLP systems detect and prevent unauthorized transmission of sensitive or proprietary data both in-transit (network DLP) and at-rest/in-use (endpoint DLP).",
    explanation_uz: "DLP (Data Loss Prevention) tizimi maxfiy ma'lumotlarni (karta raqamlari, fayllar) doimiy nazorat qilib, ularning tashqariga chiqib ketishini to'sadi."
  },
  {
    id: 36,
    domain: "3.0",
    domainName: "Security Architecture",
    q_en: "In a cloud shared responsibility model for Software-as-a-Service (SaaS), which of the following remains the sole responsibility of the customer?",
    q_uz: "SaaS (Software-as-a-Service) bulut xizmatida birgalikdagi javobgarlik modeliga ko'ra, quyidagilardan qaysi biri to'liq MIJOZNING javobgarligida qoladi?",
    options_en: [
      "Physical data center cooling and power",
      "Data classification and access permissions",
      "Operating system security patching",
      "Hypervisor virtualization security"
    ],
    options_uz: [
      "Jismoniy ma'lumotlar markazini sovutish va elektr ta'minoti",
      "Ma'lumotlar tasnifi va ularga kirish huquqlari (Data & Access Management)",
      "Operatsion tizimga xavfsizlik patchlarini o'rnatish",
      "Gipervizor va virtualizatsiya xavfsizligi"
    ],
    correct: 1,
    explanation_en: "Under the SaaS model (e.g. Microsoft 365, Google Workspace), the CSP manages the infrastructure, OS, and software, but the customer is always responsible for their own data and user access.",
    explanation_uz: "SaaS modelida (masalan, Gmail yoki Office 365) provayder hamma narsani boshqaradi, ammo ma'lumotlar va kimga qanday ruxsat berish har doim MIJOZNING o'z zimmasida bo'ladi."
  },
  {
    id: 37,
    domain: "3.0",
    domainName: "Security Architecture",
    q_en: "An administrator wants to secure remote administrative access to servers over an untrusted public internet connection. Which protocol should be used instead of Telnet?",
    q_uz: "Administrator ishonchsiz ochiq internet orqali serverlarni masofadan xavfsiz boshqarishni xohlaydi. Telnet o'rniga qaysi protokol ishlatilishi shart?",
    options_en: [
      "SSH (Port 22)",
      "FTP (Port 21)",
      "HTTP (Port 80)",
      "SNMPv1 (Port 161)"
    ],
    options_uz: [
      "SSH (Port 22)",
      "FTP (Port 21)",
      "HTTP (Port 80)",
      "SNMPv1 (Port 161)"
    ],
    correct: 0,
    explanation_en: "SSH (Secure Shell) runs on Port 22 and provides strong cryptographic encryption for remote terminal sessions, replacing the plaintext Telnet protocol.",
    explanation_uz: "SSH (Port 22) masofaviy boshqaruv uchun barcha trafik va parollarni shifrlaydi va xavfli Telnet o'rniga yagona xavfsiz standart hisoblanadi."
  },
  {
    id: 38,
    domain: "3.0",
    domainName: "Security Architecture",
    q_en: "Which cloud security tool sits between on-premises users and cloud-based applications to enforce security, compliance, and governance policies across cloud traffic?",
    q_uz: "Kompaniya xodimlari va bulutli ilovalar o'rtasida turib, bulut trafigi bo'yicha xavfsizlik va muvofiqlik siyosatini nazorat qiluvchi vosita qaysi?",
    options_en: [
      "RADIUS Server",
      "Load Balancer",
      "Network Interface Card (NIC)",
      "Cloud Access Security Broker (CASB)"
    ],
    options_uz: [
      "RADIUS Server",
      "Yuklama taqsimlagich (Load Balancer)",
      "Tarmoq kartasi (NIC)",
      "Cloud Access Security Broker (CASB)"
    ],
    correct: 3,
    explanation_en: "A Cloud Access Security Broker (CASB) enforces organizational security policies between on-premises infrastructure and cloud service providers.",
    explanation_uz: "CASB (Cloud Access Security Broker) xodimlar bulutli dasturlardan (OneDrive, Salesforce) foydalanganda xavfsizlik siyosatini nazorat qiluvchi filtrdir."
  },
  {
    id: 39,
    domain: "3.0",
    domainName: "Security Architecture",
    q_en: "An isolated, highly sensitive nuclear power plant SCADA network is completely disconnected from any physical cable or wireless connection to the internet. This design is called:",
    q_uz: "O'ta maxfiy atom elektr stantsiyasi boshqaruv tarmog'i internetdan yoki tashqi simsiz aloqalardan jismonan to'liq uzilgan. Bu arxitektura dizayni nima deb ataladi?",
    options_en: [
      "VLAN Trunking",
      "Port Mirroring",
      "Air-Gapping",
      "Split Tunneling"
    ],
    options_uz: [
      "VLAN Trunking",
      "Port Mirroring",
      "Havo to'sig'i (Air-Gapping)",
      "Split Tunneling"
    ],
    correct: 2,
    explanation_en: "An air-gap is a physical security measure where a computer or network is completely isolated and disconnected from all external networks and the internet.",
    explanation_uz: "Air-Gapping — kompyuter yoki tizimni hech qanday tarmoqqa yoki internetga jismonan ulamasdan to'liq ajratib qo'yishdir."
  },
  {
    id: 40,
    domain: "3.0",
    domainName: "Security Architecture",
    q_en: "An engineer is configuring a VPN for remote teleworkers. Which VPN configuration routes all corporate traffic through the VPN while sending personal internet browsing directly to the local ISP?",
    q_uz: "Muhandis masofaviy xodimlar uchun VPN sozlamoqda. Faqat ishga tegishli trafikni VPN orqali yuborib, shaxsiy internet saytlarni to'g'ridan-to'g'ri provayder orqali ochuvchi VPN turi qaysi?",
    options_en: [
      "Full Tunnel VPN",
      "Split Tunnel VPN",
      "Site-to-Site VPN",
      "Always-On VPN"
    ],
    options_uz: [
      "To'liq tunnel (Full Tunnel VPN)",
      "Ajratilgan tunnel (Split Tunnel VPN)",
      "Site-to-Site VPN",
      "Always-On VPN"
    ],
    correct: 1,
    explanation_en: "Split Tunneling encrypts and routes only corporate-bound traffic through the VPN tunnel, allowing general internet traffic to use the local user ISP connection.",
    explanation_uz: "Split Tunnel VPN faqat kompaniya ichki resurslariga bo'lgan so'rovlarni shifrlab VPN orqali o'tkazadi, boshqa saytlarni esa odatiy internetdan ochaveradi."
  },
  {
    id: 41,
    domain: "3.0",
    domainName: "Security Architecture",
    q_en: "Which of the following wireless authentication protocols is considered the MOST secure for enterprise deployments using 802.1X and individualized credentials?",
    q_uz: "802.1X va individual foydalanuvchi hisoblari yordamida korporativ Wi-Fi tarmoqlari uchun quyidagilardan qaysi biri ENG XAVFSIZ hisoblanadi?",
    options_en: [
      "WPA3-Enterprise",
      "WPA-TKIP",
      "WPA2-Personal (PSK)",
      "WEP-128"
    ],
    options_uz: [
      "WPA3-Enterprise",
      "WPA-TKIP",
      "WPA2-Personal (PSK)",
      "WEP-128"
    ],
    correct: 0,
    explanation_en: "WPA3-Enterprise utilizes 192-bit cryptographic algorithms, individualized credentials via 802.1X and RADIUS, and protected management frames, providing enterprise-grade security.",
    explanation_uz: "WPA3-Enterprise 192-bitli zamonaviy shifrlash va 802.1X RADIUS server orqali har bir xodimga individual autentifikatsiyani ta'minlaydi."
  },
  {
    id: 42,
    type: "multi_choice",
    selectCount: 2,
    domain: "3.0",
    domainName: "Security Architecture",
    q_en: "An enterprise is transitioning its legacy flat network to a modern Zero Trust Architecture (ZTA). Which TWO of the following principles and controls are core pillars of Zero Trust? (Choose TWO)",
    q_uz: "Kompaniya o'zining eski bir sathli tarmog'idan zamonaviy Zero Trust (Nol Ishonch) arxitekturasi ga o'tmoqda. Quyidagi tamoyil va choralardan qaysi IKKITASI Zero Trust arxitekturasining asosiy ustunlari hisoblanadi? (IKKITASINI tanlang)",
    options_en: [
      "Assume breach and eliminate implicit trust based on network physical location",
      "Implement Microsegmentation to isolate workloads and enforce per-session dynamic authorization",
      "Allow unrestricted east-west traffic for all authenticated intranet endpoints",
      "Rely solely on single-factor passwords for internal corporate services",
      "Disable multi-factor authentication for employees working inside headquarters"
    ],
    options_uz: [
      "Xavfsizlik buzilgan deb faraz qilish (Assume breach) va tarmoq joylashuviga asoslangan yashirin ishonchni bekor qilish",
      "Ishchi yuklamalarni mikrosegmentatsiya qilish va har bir sessiya uchun dinamik ruxsatni tekshirish",
      "Korporativ tarmoq ichidagi barcha qurilmalar o'rtasida erkin (east-west) trafikka ruxsat berish",
      "Ichki tizimlarga kirishda faqat bitta oddiy parolga tayanish",
      "Bosh ofis ichida ishlayotgan xodimlar uchun ko'p omilli autentifikatsiyani (MFA) o'chirib qo'yish"
    ],
    correct: [0, 1],
    explanation_en: "Zero Trust explicitly assumes breach, requires continuous verification regardless of network location, and uses microsegmentation to restrict lateral movement.",
    explanation_uz: "Zero Trust doim tizim buzilgan deb hisoblaydi, ichki tarmoqqa asossiz ishonch bildirmaydi va lateral (yon tomonga) harakatlanishni to'sish uchun mikrosegmentatsiyadan foydalanadi."
  },
  {
    id: 43,
    domain: "3.0",
    domainName: "Security Architecture",
    q_en: "Which network architecture model logically segments departments (e.g. Accounting, HR, Engineering) on the same physical switch into separate broadcast domains?",
    q_uz: "Bitta jismoniy switch ichida turli bo'limlarni (buxgalteriya, kadrlar) mantiqiy ravishda alohida tarmoqlarga ajratuvchi texnologiya nima?",
    options_en: [
      "Storage Area Network (SAN)",
      "Wide Area Network (WAN)",
      "Virtual Local Area Network (VLAN)",
      "Demilitarized Zone (DMZ)"
    ],
    options_uz: [
      "Ma'lumotlar saqlash tarmog'i (SAN)",
      "Keng qamrovli tarmoq (WAN)",
      "Virtual lokal tarmoq (VLAN)",
      "DMZ hududi"
    ],
    correct: 2,
    explanation_en: "VLANs segment a single physical switch into multiple isolated logical broadcast domains at Layer 2 to improve network performance and security.",
    explanation_uz: "VLAN (Virtual LAN) bitta switch ichida tarmoqni mantiqiy bo'laklarga ajratib, bo'limlar o'rtasidagi xavfsizlikni ta'minlaydi."
  },
  {
    id: 44,
    domain: "3.0",
    domainName: "Security Architecture",
    q_en: "Which of the following describes the security practice of disabling unnecessary services, removing default accounts, and updating firmware before deploying a server?",
    q_uz: "Serverni ishga tushirishdan oldin keraksiz servislarni o'chirish, standart parollarni almashtirish va xavfsizlik sozlamalarini kuchaytirish amaliyoti nima deyiladi?",
    options_en: [
      "Penetration Testing",
      "System Hardening",
      "Fuzzing",
      "Network Tapping"
    ],
    options_uz: [
      "Penetratsion test (Pen Testing)",
      "Tizimni mustahkamlash (System Hardening)",
      "Fuzzing",
      "Tarmoqni tinglash (Network Tapping)"
    ],
    correct: 1,
    explanation_en: "System hardening involves reducing the attack surface by closing unused ports, removing default credentials, turning off superfluous services, and applying security patches.",
    explanation_uz: "System Hardening (tizimni chiniqtirish/mustahkamlash) — ortiqcha portlarni yopish va tizimni xakerlar uchun hujum maydonini qisqartirish jarayonidir."
  },
  {
    id: 45,
    domain: "3.0",
    domainName: "Security Architecture",
    q_en: "A security engineer must implement a firewall rule that implicitly drops any packet that does not match an explicit allow rule. What is this security principle called?",
    q_uz: "Xavfsizlik muhandisi ochiq ruxsat berilmagan har qanday trafikni avtomatik ravishda bloklaydigan firewall qoidasini kiritishi kerak. Bu qanday nomlanadi?",
    options_en: [
      "Implicit Deny",
      "Port Forwarding",
      "Dynamic Routing",
      "Source NAT"
    ],
    options_uz: [
      "Odatiy rad etish (Implicit Deny / Deny All)",
      "Port Forwarding",
      "Dinamik marshrutlash",
      "Manba NAT"
    ],
    correct: 0,
    explanation_en: "Implicit Deny is a foundational security concept where any access not explicitly permitted by a rule is denied by default at the end of the ACL.",
    explanation_uz: "Implicit Deny (qoidalar oxiridagi 'DENY ANY ANY') — ruxsat berilmagan barcha qolgan paketlarni rad etish prinsipidir."
  },
  {
    id: 46,
    domain: "3.0",
    domainName: "Security Architecture",
    q_en: "An administrator needs to enforce security on smartphones used by employees for corporate email, including remote wipe and screen lock enforcement. Which solution should be implemented?",
    q_uz: "Administrator xodimlarning korporativ pochtasiga ulangan smartfonlarida ekran qulflanishini va kerak bo'lsa masofadan o'chirib yuborishni (remote wipe) ta'minlamoqchi. Qaysi tizim kerak?",
    options_en: [
      "Network Access Control (NAC)",
      "Web Application Firewall (WAF)",
      "Unified Threat Management (UTM)",
      "Mobile Device Management (MDM)"
    ],
    options_uz: [
      "Tarmoqqa kirishni nazorat qilish (NAC)",
      "Veb-ilova brandmaueri (WAF)",
      "UTM qurilmasi",
      "Mobil qurilmalarni boshqarish (Mobile Device Management - MDM)"
    ],
    correct: 3,
    explanation_en: "Mobile Device Management (MDM) software allows administrators to monitor, manage, and enforce security policies (PINs, encryption, remote wipe) on mobile endpoints.",
    explanation_uz: "MDM (Mobile Device Management) korxona xodimlarining smartfon va planshetlariga xavfsizlik siyosatlarini qo'llash va ma'lumotlarni masofadan tozalash uchun xizmat qiladi."
  },
  {
    id: 47,
    domain: "3.0",
    domainName: "Security Architecture",
    q_en: "Which of the following is a network security device specifically designed to protect web applications by inspecting HTTP/HTTPS traffic for attacks like Cross-Site Scripting and SQL Injection?",
    q_uz: "Quyidagilardan qaysi biri veb-ilovalarni SQL Injection va XSS kabi hujumlardan himoya qilish uchun HTTP/HTTPS trafigini tahlil qiluvchi maxsus xavfsizlik qurilmasi hisoblanadi?",
    options_en: [
      "Dynamic DNS Server",
      "VPN Gateway",
      "Web Application Firewall (WAF)",
      "Network Bridge"
    ],
    options_uz: [
      "Dinamik DNS serveri",
      "VPN shlyuzi",
      "Veb-ilova brandmaueri (Web Application Firewall - WAF)",
      "Tarmoq ko'prigi"
    ],
    correct: 2,
    explanation_en: "A WAF inspects Layer 7 web traffic, filtering out malicious inputs such as SQL injection, XSS payloads, and malformed HTTP headers before they reach the web server.",
    explanation_uz: "WAF (Web Application Firewall) faqat veb-saytlarga kelayotgan HTTP/HTTPS trafigini tekshirib, veb-hujumlarni (SQLi, XSS) to'xtatuvchi 7-qavat filtridir."
  },

  // --- DOMAIN 4.0: SECURITY OPERATIONS (48-72) ---
  {
    id: 48,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "A centralized platform that aggregates event logs from routers, switches, firewalls, and servers, performing real-time correlation and alerting for security analysts is known as:",
    q_uz: "Barcha router, switch, firewall va serverlardan xavfsizlik loglarini bitta joyga to'plab, ularni o'zaro bog'laydigan (korrelyatsiya) va tahlilchiga xabar beruvchi tizim qanday ataladi?",
    options_en: [
      "DHCP Server",
      "SIEM (Security Information and Event Management)",
      "Network Time Protocol daemon",
      "DNS Resolver"
    ],
    options_uz: [
      "DHCP Server",
      "SIEM (Security Information and Event Management)",
      "NTP vaqt serveri",
      "DNS Resolver"
    ],
    correct: 1,
    explanation_en: "A SIEM centralizes log aggregation, normalizes disparate log formats, provides real-time event correlation, and generates security alerts for SOC analysts.",
    explanation_uz: "SIEM (masalan, Splunk yoki QRadar) butun tashkilot loglarini bitta markazga to'plab, shubhali harakatlarni tahlil qiluvchi asosiy SOC vositasidir."
  },
  {
    id: 49,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "Which technology enhances a SOC by executing automated security workflows (playbooks) to isolate an infected host without requiring manual human intervention?",
    q_uz: "Inson aralashuvisiz, avtomatik skriptlar (playbooks) orqali zararlangan kompyuterni tarmoqdan uzish imkonini beruvchi SOC texnologiyasi qaysi?",
    options_en: [
      "SOAR (Security Orchestration, Automation, and Response)",
      "Simple Network Management Protocol (SNMP)",
      "Network Address Translation (NAT)",
      "Secure Copy Protocol (SCP)"
    ],
    options_uz: [
      "SOAR (Security Orchestration, Automation, and Response)",
      "SNMP protokoli",
      "NAT",
      "SCP protokoli"
    ],
    correct: 0,
    explanation_en: "SOAR platforms automate threat response playbooks, allowing automated containment actions (e.g. blocking an IP, disabling a compromised account) at machine speed.",
    explanation_uz: "SOAR xavfsizlik hodisalariga avtomatik ravishda javob qaytarish (Playbook) orqali vaqtni tejaydi va hujumni tezkorlik bilan to'xtatadi."
  },
  {
    id: 50,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "An analyst suspects that an employee's computer is infected with ransomware communicating with an external Command and Control (C2) server. What should the analyst do FIRST?",
    q_uz: "Tahlilchi xodimning kompyuteri ransomware bilan zararlanib, xakerning C2 serveri bilan aloqa qilayotganidan shubhalanmoqda. Tahlilchi BIRINCHI bo'lib nima qilishi kerak?",
    options_en: [
      "Immediately format the hard drive",
      "Email the company board of directors",
      "Reboot the operating system into safe mode",
      "Isolate the system by disconnecting it from the network (Containment)"
    ],
    options_uz: [
      "Zudlik bilan qattiq diskni format qilish",
      "Kompaniya direktorlar kengashiga email yozish",
      "Kompyuterni xavfsiz rejimda (safe mode) qayta ishga tushirish",
      "Tizimni tarmoqdan uzish orqali izolyatsiya qilish (Containment)"
    ],
    correct: 3,
    explanation_en: "The first action in incident containment is to sever network connectivity (unplug the network cable or disconnect Wi-Fi) to halt malware spread and stop C2 communication.",
    explanation_uz: "Hodisaga javob berishda eng birinchi qadam — kompyuterni tarmoqdan uzish (Containment), bu virusning boshqa mashinalarga tarqalishi va ma'lumot sizishini to'xtatadi."
  },
  {
    id: 51,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "According to the Order of Volatility in digital forensics, which of the following evidence sources must be captured FIRST before powering down a machine?",
    q_uz: "Raqamli ekspertizada (Digital Forensics) o'zgaruvchanlik tartibiga (Order of Volatility) ko'ra, kompyuterni o'chirishdan oldin BIRINCHI bo'lib qaysi dalil saqlab olinishi shart?",
    options_en: [
      "Hard disk drive (HDD/SSD)",
      "Archival backup tapes",
      "System memory (RAM) and CPU registers",
      "Remote optical media"
    ],
    options_uz: [
      "Qattiq disk (HDD/SSD)",
      "Arxiv zaxira lentalari",
      "Tizim xotirasi (RAM) va CPU registrlari",
      "Masofaviy optik disklar"
    ],
    correct: 2,
    explanation_en: "CPU registers and system RAM are volatile memory that is permanently lost when the computer loses power. They must be collected first.",
    explanation_uz: "CPU registrlari va RAM xotira kompyuter o'chganda darhol yo'qolib ketadi (uchuvchan xotira). Shuning uchun ekspertlar birinchi bo'lib RAM nusxasini oladi."
  },
  {
    id: 52,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "A forensic investigator generates a SHA-256 hash of a seized hard drive immediately after creating a bit-stream image, and verifies it matches the original drive hash. What is being ensured?",
    q_uz: "Kriminalist tahlilchi dalil sifatida olingan qattiq diskning bitma-bit nusxasini yaratgach, darhol SHA-256 xeshini hisoblab chiqdi va asl nusxa bilan solishtirdi. Bu nima uchun qilinadi?",
    options_en: [
      "Chain of custody",
      "Integrity of forensic evidence",
      "Non-repudiation of the suspect",
      "Confidentiality of the victim"
    ],
    options_uz: [
      "Dalillar zanjiri (Chain of Custody)",
      "Sud dalilining butunligi (Integrity of evidence)",
      "Gumonlanuvchining tonib bo'lmasligi",
      "Qurbonning maxfiyligi"
    ],
    correct: 1,
    explanation_en: "Cryptographic hashing proves that forensic evidence was not altered, modified, or tampered with during collection and analysis, verifying its legal integrity.",
    explanation_uz: "SHA-256 xesh qiymati disk nusxasi olinayotganda va tergov paytida ma'lumotlar zarracha ham o'zgarmaganligini (Butunlik - Integrity) sudda isbotlash uchun kerak."
  },
  {
    id: 53,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "Which legal document tracks the continuous possession, transfer, and analysis of physical and electronic evidence from collection to court presentation?",
    q_uz: "Jismoniy va elektron dalillarning kim tomonidan olingani, kimga topshirilgani va qanday saqlanayotganini sudda isbotlash uchun yuritiladigan qat'iy hujjat nima?",
    options_en: [
      "Chain of Custody",
      "Service Level Agreement (SLA)",
      "Non-Disclosure Agreement (NDA)",
      "Memorandum of Understanding (MOU)"
    ],
    options_uz: [
      "Dalillar zanjiri (Chain of Custody)",
      "Xizmat ko'rsatish darajasi kelishuvi (SLA)",
      "Maxfiylik to'g'risidagi kelishuv (NDA)",
      "O'zaro anglashuv memorandumi (MOU)"
    ],
    correct: 0,
    explanation_en: "Chain of custody is the chronological documentation showing custody, control, transfer, and disposition of evidence to ensure it is admissible in a court of law.",
    explanation_uz: "Chain of Custody — dalilning tergov boshidan sudgacha bo'lgan harakatini tasdiqlovchi hujjat bo'lib, uning qonuniyligini ta'minlaydi."
  },
  {
    id: 54,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "An analyst uses a network sniffer to capture live packets and notices plaintext passwords passing through port 21. Which protocol is being captured?",
    q_uz: "Tahlilchi tarmoq trafigini Wireshark orqali tekshirganda 21-port orqali parollar ochiq matn holatida uzatilayotganini ko'rdi. Qaysi protokol tutilgan?",
    options_en: [
      "SFTP",
      "SSH",
      "HTTPS",
      "FTP"
    ],
    options_uz: [
      "SFTP",
      "SSH",
      "HTTPS",
      "FTP"
    ],
    correct: 3,
    explanation_en: "FTP uses port 21 for command/control and transmits all credentials and data unencrypted in cleartext. SFTP (Port 22) should be used instead.",
    explanation_uz: "FTP (Port 21) parollarni hech qanday shifrlashsiz uzatadi. Xavfsiz fayl uzatish uchun SFTP (Port 22) ishlatilishi kerak."
  },
  {
    id: 55,
    type: "multi_choice",
    selectCount: 2,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "A SOC analyst detects that an unauthorized, obfuscated PowerShell script is communicating with an external Command and Control (C2) IP address from an employee laptop. Which TWO initial containment actions should the analyst take? (Choose TWO)",
    q_uz: "SOC tahlilchisi xodim noutbukida ruxsatsiz yashirin PowerShell skripti tashqi C2 (boshqaruv serveri) IP manzili bilan bog'lanayotganini aniqladi. Tahlilchi dastlabki izolyatsiya uchun qaysi IKKITA harakatni darhol bajarishi kerak? (IKKITASINI tanlang)",
    options_en: [
      "Immediately wipe and reformat the laptop hard drive without capturing memory",
      "Isolate the endpoint from the network via EDR while maintaining live forensic connection",
      "Block the identified malicious C2 IP address at the perimeter firewall",
      "Send an unencrypted email to all employees warning them about the incident",
      "Restart the domain controller to reset active Kerberos sessions"
    ],
    options_uz: [
      "Tezkor xotirani saqlamasdan noutbuk qattiq diskini darhol tozalab tashlash",
      "EDR vositasi orqali noutbukni tarmoqdan izolyatsiya qilish (tahlil aloqasini saqlagan holda)",
      "Aniqlangan zararli C2 IP manzilini tashqi perimetr fayrvolda darhol bloklash",
      "Barcha xodimlarga hodisa haqida ochiq elektron xat tarqatish",
      "Barcha Kerberos sessiyalarini bekor qilish uchun asosiy domen kontrollerini qayta yoqish"
    ],
    correct: [1, 2],
    explanation_en: "Isolating the endpoint stops lateral spread while preserving forensic evidence in RAM. Blocking the C2 IP prevents data exfiltration and further instructions from the attacker.",
    explanation_uz: "Qurilmani EDR orqali izolyatsiya qilish hujumning tarqalishini to'xtatadi va xotiradagi (RAM) dalillarni saqlaydi. C2 IP sini bloklash esa ma'lumotlar o'g'irlanishini to'xtatadi."
  },
  {
    id: 56,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "A security analyst is conducting vulnerability scanning and wants to run a scan that uses valid administrative credentials to inspect registry keys and patch levels. What scan type is this?",
    q_uz: "Xavfsizlik tahlilchisi kompyuterning reestri va o'rnatilgan patchlarini chuqur tekshirish uchun administrator login va parolidan foydalanib skaner qildi. Bu qaysi skanerlash turi?",
    options_en: [
      "Non-credentialed Scan",
      "Credentialed (Authenticated) Scan",
      "Passive Sniffing Scan",
      "War Driving Scan"
    ],
    options_uz: [
      "Hisob ma'lumotsiz (Non-credentialed) skanerlash",
      "Hisob ma'lumotli (Credentialed / Authenticated) skanerlash",
      "Passiv kuzatuv skaneri",
      "War Driving"
    ],
    correct: 1,
    explanation_en: "A credentialed scan logs directly into the target machine using administrative credentials, enabling a comprehensive inspection of installed software, registry, and configurations.",
    explanation_uz: "Credentialed (avtorizatsiyali) skanerlash parollar orqali tizim ichiga kirib, yashirin zaifliklar va patchlarni to'liq tahlil qiladi."
  },
  {
    id: 57,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "What is the final stage of the NIST Computer Security Incident Handling Guide (SP 800-61) incident response lifecycle?",
    q_uz: "NIST SP 800-61 bo'yicha kiberxavfsizlik hodisalariga javob berish hayotiy tsiklining ENG OXIRGI bosqichi nima?",
    options_en: [
      "Post-Incident Activity / Lessons Learned",
      "Eradication",
      "Detection and Analysis",
      "Containment"
    ],
    options_uz: [
      "Hodisadan keyingi faoliyat / Olingan saboqlar (Lessons Learned)",
      "Yo'q qilish (Eradication)",
      "Aniqlash va Tahlil (Detection)",
      "Izolyatsiya (Containment)"
    ],
    correct: 0,
    explanation_en: "The Post-Incident Activity (Lessons Learned) phase reviews how the incident occurred, what went well, and what must be improved to prevent future occurrences.",
    explanation_uz: "Eng oxirgi bosqich — Lessons Learned (olingan saboqlar) bo'lib, unda yuz bergan hodisa tahlil qilinadi va kelgusida qaytarilmasligi uchun xulosalar chiqariladi."
  },
  {
    id: 58,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "Which of the following endpoint tools continuously records system behavior, file modifications, and process executions to detect sophisticated advanced threats?",
    q_uz: "Murakkab xakerlik tahdidlarini aniqlash uchun kompyuterdagi har bir jarayon, fayl o'zgarishi va xatti-harakatlarni uzluksiz yozib boruvchi vosita qaysi?",
    options_en: [
      "Hardware Random Number Generator",
      "Basic Signature-only Antivirus",
      "Stateless Packet Filter",
      "Endpoint Detection and Response (EDR)"
    ],
    options_uz: [
      "Tasodifiy sonlar generatori",
      "Oddiy signaturali antivirus",
      "Stateless paket filtri",
      "Endpoint Detection and Response (EDR)"
    ],
    correct: 3,
    explanation_en: "EDR tools monitor endpoints in real time, aggregating telemetry and behavioral analytics to identify, investigate, and remediate stealthy attacks.",
    explanation_uz: "EDR (Endpoint Detection and Response) har bir kompyuterga o'rnatilib, an'anaviy antivirus sezmagan murakkab harakatlarni aniqlaydi."
  },
  {
    id: 59,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "During an incident, a technician creates an exact, forensic bit-by-bit copy of a compromised SSD. Which command utility is commonly used on Linux for this purpose?",
    q_uz: "Hodisani tekshirish paytida mutaxassis zararlangan diskning bitma-bit to'liq nusxasini yaratmoqchi. Linux da ushbu vazifa uchun ko'p ishlatiladigan buyruq qaysi?",
    options_en: [
      "grep -i",
      "rm -rf",
      "dd (or dcfldd)",
      "ls -la"
    ],
    options_uz: [
      "grep -i",
      "rm -rf",
      "dd (yoki dcfldd)",
      "ls -la"
    ],
    correct: 2,
    explanation_en: "The `dd` command (or its forensic variant `dcfldd`) copies raw blocks byte-for-byte from one storage device to an image file without modifying metadata.",
    explanation_uz: "`dd` (yoki dcfldd) buyrug'i qattiq diskning bitma-bit xom nusxasini (raw forensic image) olish uchun ishlatiladigan standart vositadir."
  },
  {
    id: 60,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "Which diagnostic tool can an administrator use to trace the Layer 3 network hops taken by packets between a client workstation and a remote web server?",
    q_uz: "Administrator klient va masofadagi veb-server o'rtasida paketlar qaysi oraliq routerlar (hops) orqali o'tayotganini aniqlash uchun qaysi vositadan foydalanadi?",
    options_en: [
      "netstat",
      "traceroute (tracert on Windows)",
      "chmod",
      "ipconfig /release"
    ],
    options_uz: [
      "netstat",
      "traceroute (Windows tizimida tracert)",
      "chmod",
      "ipconfig /release"
    ],
    correct: 1,
    explanation_en: "`traceroute` uses increasing TTL values in ICMP/UDP packets to identify each Layer 3 router hop along the path to the destination.",
    explanation_uz: "`traceroute` (yoki `tracert`) paketning manzilga yetib borishida bosib o'tgan barcha routerlar ro'yxatini va kechikish vaqtini ko'rsatadi."
  },
  {
    id: 61,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "A security analyst needs to review web server access logs to search for instances of the string 'union select' indicating SQL injection attempts. Which Linux command is MOST appropriate?",
    q_uz: "Xavfsizlik tahlilchisi log fayllari ichidan SQL injection alomatlarini ('union select' qatori) qidirib topishi kerak. Qaysi Linux buyrug'i eng mos keladi?",
    options_en: [
      "grep -i 'union select' access.log",
      "chmod 777 access.log",
      "ping access.log",
      "kill -9 access.log"
    ],
    options_uz: [
      "grep -i 'union select' access.log",
      "chmod 777 access.log",
      "ping access.log",
      "kill -9 access.log"
    ],
    correct: 0,
    explanation_en: "The `grep -i` command searches files for specified text patterns case-insensitively, making it the primary command-line tool for log file searching.",
    explanation_uz: "`grep -i 'matn' fayl` buyrug'i matnli loglar ichidan kerakli xakerlik alomatlarini qidirib topish uchun eng asosiy vositadir."
  },
  {
    id: 62,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "An analyst discovers that a network service is rejecting legitimate authentication requests because the system clock on the Kerberos server has drifted by 15 minutes. What protocol resolves this issue?",
    q_uz: "Kerberos serveridagi vaqt 15 daqiqaga orqada qolgani sababli xodimlarning autentifikatsiyasi rad etilmoqda. Ushbu muammoni bartaraf etuvchi protokol qaysi?",
    options_en: [
      "Simple Mail Transfer Protocol (SMTP, Port 25)",
      "File Transfer Protocol (FTP, Port 21)",
      "Telnet (Port 23)",
      "Network Time Protocol (NTP, Port 123)"
    ],
    options_uz: [
      "SMTP (Port 25)",
      "FTP (Port 21)",
      "Telnet (Port 23)",
      "Vaqtni sinxronlash protokoli (NTP, Port 123)"
    ],
    correct: 3,
    explanation_en: "NTP (Port 123) synchronizes clocks across all network systems. Kerberos strictly requires synchronized time (typically within 5 minutes) to prevent replay attacks.",
    explanation_uz: "NTP (Port 123) barcha qurilmalar vaqtini bir xil sinxronlashtiradi. Kerberos xavfsizlik protokoli vaqt farqi 5 daqiqadan oshsa, autentifikatsiyani to'xtatadi."
  },
  {
    id: 63,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "Which of the following security practices involves intentionally leaving an attractive, isolated server with deliberate vulnerabilities to lure attackers and observe their techniques?",
    q_uz: "Xakerlarni jalb qilish va ularning hujum usullarini o'rganish maqsadida ataylab zaifliklar bilan yaratilgan aldamchi server nima deb ataladi?",
    options_en: [
      "Load Balancer",
      "Proxy Server",
      "Honeypot",
      "NAT Gateway"
    ],
    options_uz: [
      "Yuklama taqsimlagich",
      "Proksi server",
      "Honeypot (Asal ko'zasi)",
      "NAT shlyuzi"
    ],
    correct: 2,
    explanation_en: "A honeypot is a decoy system designed to lure attackers, detect unauthorized activity, and study adversarial tactics, techniques, and procedures (TTPs).",
    explanation_uz: "Honeypot — xakerlarni o'ziga jalb qiluvchi tuzoq tizim bo'lib, unga qilingan hujumlar xavfsizlik tahlilchilariga xaker haqida ma'lumot to'plashga yordam beradi."
  },
  {
    id: 64,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "Which of the following describes the security technique of replacing real customer credit card numbers with non-sensitive surrogate reference tokens before database storage?",
    q_uz: "Ma'lumotlar bazasida saqlashdan oldin mijozlarning haqiqiy kredit karta raqamlarini tasodifiy tokenlar bilan almashtirish usuli qanday ataladi?",
    options_en: [
      "Hashing",
      "Tokenization",
      "Steganography",
      "Compression"
    ],
    options_uz: [
      "Xeshlash",
      "Tokenizatsiya (Tokenization)",
      "Steganografiya",
      "Siqish (Compression)"
    ],
    correct: 1,
    explanation_en: "Tokenization substitutes sensitive data (like primary account numbers) with a non-sensitive equivalent (token) that has no exploitable mathematical meaning.",
    explanation_uz: "Tokenizatsiya (Tokenization) haqiqiy maxfiy ma'lumot o'rniga soxta tokenni saqlash orqali baza buzilganda ham xakerlarga hech narsa bermaslikni ta'minlaydi."
  },
  {
    id: 65,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "When analyzing a suspected malicious email, which email header field reveals the actual IP address of the mail server that originated the message?",
    q_uz: "Shubhali emailni tahlil qilishda xatni yuborgan asl pochta serverining IP manzilini qaysi sarlavha (header) qatori ko'rsatadi?",
    options_en: [
      "Received: from",
      "Subject:",
      "To:",
      "MIME-Version:"
    ],
    options_uz: [
      "Received: from",
      "Subject:",
      "To:",
      "MIME-Version:"
    ],
    correct: 0,
    explanation_en: "The `Received:` header lines are added sequentially by each mail transfer agent (MTA) handling the message. The bottom-most `Received:` line shows the true origin server IP.",
    explanation_uz: "`Received: from` qatori xat qaysi serverlar orqali o'tganini va dastlabki haqiqiy jo'natuvchi server IP manzilini ko'rsatuvchi eng ishonchli maydondir."
  },
  {
    id: 66,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "An analyst discovers an internal workstation continuously sending outbound beacon signals to a known malicious IP address every 60 seconds. What is this host infected with?",
    q_uz: "Tahlilchi ichki kompyuter har 60 soniyada ma'lum bir zararli IP manzilga signal (beacon) yuborayotganini aniqladi. Ushbu kompyuter nima bilan zararlangan?",
    options_en: [
      "Standard NTP clock drift correction",
      "Harmless browser cookie syncing",
      "Local ARP cache resolution",
      "Botnet malware communicating with a Command & Control (C2) server"
    ],
    options_uz: [
      "Standart NTP vaqt tuzatishi",
      "Xavfsiz brauzer cookie sinxronizatsiyasi",
      "Mahalliy ARP keshini aniqlash",
      "C2 server bilan aloqaga chiqayotgan Botnet zararli dasturi"
    ],
    correct: 3,
    explanation_en: "Periodic outbound communication (beaconing) at regular intervals is a classic indicator of a botnet client maintaining contact with its Command and Control (C2) server.",
    explanation_uz: "Doimiy vaqt oralig'ida begona serverga signal yuborish (beaconing) — kompyuter zombiga (Botnet) aylanib, xaker serveridan buyruq kutayotganligining yaqqol belgisidir."
  },
  {
    id: 67,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "Which protocol provides a secure, encrypted alternative to the unencrypted Simple Network Management Protocol versions 1 and 2 (SNMPv1/v2)?",
    q_uz: "Shifrlanmagan SNMPv1 va SNMPv2 protokollarining xavfsiz, shifrlangan va autentifikatsiyaga ega zamonaviy versiyasi qaysi?",
    options_en: [
      "TFTP",
      "Telnet",
      "SNMPv3",
      "HTTP"
    ],
    options_uz: [
      "TFTP",
      "Telnet",
      "SNMPv3",
      "HTTP"
    ],
    correct: 2,
    explanation_en: "SNMPv3 adds cryptographic confidentiality (encryption), message integrity, and user authentication to the network management protocol.",
    explanation_uz: "SNMPv3 tarmoq qurilmalarini monitoring qilishda ma'lumotlarni shifrlash va foydalanuvchini autentifikatsiya qilish imkoniyatini beruvchi yagona xavfsiz versiyadir."
  },
  {
    id: 68,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "A penetration tester uses Nmap to perform a stealth port scan using half-open TCP connections. What flag is used for this SYN scan?",
    q_uz: "Penetratsion tester Nmap yordamida to'liq ulanmasdan (half-open) yashirin SYN port skanerlashini o'tkazmoqchi. Buning uchun qaysi flag ishlatiladi?",
    options_en: [
      "nmap -sU",
      "nmap -sS",
      "nmap -sT",
      "nmap -sP"
    ],
    options_uz: [
      "nmap -sU",
      "nmap -sS",
      "nmap -sT",
      "nmap -sP"
    ],
    correct: 1,
    explanation_en: "The `-sS` flag in Nmap performs a TCP SYN scan (half-open scan), sending a SYN packet and responding with RST instead of ACK to avoid establishing a full connection.",
    explanation_uz: "`nmap -sS` — TCP SYN skaneri bo'lib, to'liq 3 tomonlama salomlashuvni bajarmasdan ochiq portlarni bildirmasdan aniqlaydi."
  },
  {
    id: 69,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "An analyst discovers that an attacker gained unauthorized access to an administrative interface because default credentials were never modified after initial deployment. What vulnerability is this?",
    q_uz: "Tahlilchi hujumchi qurilma o'rnatilgandan so'ng zavod standart login va paroli o'zgartirilmagani tufayli admin panelga kirib olganini aniqladi. Bu qanday zaiflik?",
    options_en: [
      "Default / Weak Credentials",
      "Zero-Day vulnerability",
      "Memory Leak",
      "Buffer Overflow"
    ],
    options_uz: [
      "Standart / Zaif login va parollar (Default Credentials)",
      "Zero-Day zaifligi",
      "Xotira oqishi",
      "Bufer toshishi"
    ],
    correct: 0,
    explanation_en: "Failing to change manufacturer default usernames and passwords (e.g. admin/admin) is a critical security misconfiguration easily exploited by threat actors.",
    explanation_uz: "Qurilmalarning standart parollarini (masalan, admin/admin) o'zgartirmaslik — eng ko'p uchraydigan va oson buziladigan xavfsizlik xatosidir."
  },
  {
    id: 70,
    type: "multi_choice",
    selectCount: 2,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "During a digital forensics investigation following a corporate espionage breach, which TWO of the following procedures are MOST critical to guarantee evidence remains admissible in a court of law? (Choose TWO)",
    q_uz: "Sanoat josusligi bilan bog'liq kiberhodisa yuzasidan o'tkazilayotgan raqamli kriminalistika (forensics) tekshiruvida dalillarning sudda qonuniy kuchga ega bo'lishini ta'minlash uchun qaysi IKKITA tartib ENG MUHIM hisoblanadi? (IKKITASINI tanlang)",
    options_en: [
      "Rigorous maintenance of a Chain of Custody tracking who handled the evidence, when, and why",
      "Generating cryptographic hashes (SHA-256) of forensic disk images immediately upon acquisition and verifying them regularly",
      "Conducting all investigative analyses directly on the original live hard disk drive",
      "Sharing raw forensic images publicly on social media to ensure community transparency",
      "Deleting log files once analyzed to free up storage on the analysis workstation"
    ],
    options_uz: [
      "Dalillarni kim, qachon va nima uchun olganini hujjatlashtiruvchi 'Chain of Custody' dalillar zanjirini qat'iy yuritish",
      "Olingan disk nusxasi (image) uchun darhol SHA-256 kriptografik xeshini olish va butunlikni doimiy tekshirish",
      "Barcha tahlillarni to'g'ridan-to'g'ri asl (original) qattiq diskning o'zida amalga oshirish",
      "Shaffoflik uchun xom kriminalistik fayllarni ijtimoiy tarmoqlarda ochiq e'lon qilish",
      "Joy bo'shatish uchun tahlil qilib bo'lingan log fayllarni darhol o'chirib yuborish"
    ],
    correct: [0, 1],
    explanation_en: "Chain of custody documents evidence integrity from collection to trial. Cryptographic hashing proves mathematically that the forensic image was never altered or contaminated.",
    explanation_uz: "Chain of Custody (dalillar zanjiri) dalilning qonuniyligini isbotlaydi. Kriptografik xesh (SHA-256) esa olingan nusxa zarracha o'zgarmaganini matematik kafolatlaydi."
  },
  {
    id: 71,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "An administrator needs to secure directory service queries against eavesdropping on port 389. What encrypted port and protocol should be used instead?",
    q_uz: "Administrator 389-portdagi katalog xizmati (LDAP) so'rovlarini shifrlab himoyalamoqchi. Qaysi xavfsiz protokol va port ishlatilishi kerak?",
    options_en: [
      "HTTP on Port 80",
      "Telnet on Port 23",
      "LDAPS on Port 636",
      "TFTP on Port 69"
    ],
    options_uz: [
      "HTTP (Port 80)",
      "Telnet (Port 23)",
      "LDAPS (Port 636)",
      "TFTP (Port 69)"
    ],
    correct: 2,
    explanation_en: "LDAP over SSL/TLS (LDAPS) runs on port 636, providing confidentiality and encryption for Active Directory and directory queries.",
    explanation_uz: "LDAPS (Port 636) TLS orqali shifrlangan bo'lib, ochiq LDAP (Port 389) o'rniga ishlatiladi."
  },
  {
    id: 72,
    domain: "4.0",
    domainName: "Security Operations",
    q_en: "Which framework published by MITRE catalogs adversarial tactics, techniques, and common knowledge based on real-world cyber attack observations?",
    q_uz: "Haqiqiy kiberhujumlar asosida xakerlarning taktikasi va usullarini kataloglashtirgan MITRE xalqaro tizimi qanday ataladi?",
    options_en: [
      "PCI-DSS Standards",
      "MITRE ATT&CK Framework",
      "OSI Model",
      "HIPAA Compliance Guide"
    ],
    options_uz: [
      "PCI-DSS standartlari",
      "MITRE ATT&CK Framework",
      "OSI Modeli",
      "HIPAA qo'llanmasi"
    ],
    correct: 1,
    explanation_en: "The MITRE ATT&CK framework provides an authoritative, structured matrix of cyber adversary behavior, tactics, techniques, and procedures (TTPs).",
    explanation_uz: "MITRE ATT&CK — kiberhujumchilarning barcha taktikasi va usullarini (TTPs) o'z ichiga olgan jahondagi eng mashhur ma'lumotlar bazasidir."
  },

  // --- DOMAIN 5.0: SECURITY PROGRAM MANAGEMENT AND OVERSIGHT (73-90) ---
  {
    id: 73,
    domain: "5.0",
    domainName: "Security Program Management",
    q_en: "An organization determines that a database server has an Asset Value of $100,000. If a fire occurs, the Exposure Factor (EF) is estimated at 50%. The fire has an Annualized Rate of Occurrence (ARO) of 0.1 (once every 10 years). What is the Annualized Loss Expectancy (ALE)?",
    q_uz: "Tashkilot ma'lumotlar bazasi serverining qiymati $100,000 ga teng. Yong'in sodir bo'lsa, zarar koeffitsiyenti (EF) 50% ni tashkil qiladi. Ushbu yong'in sodir bo'lish chastotasi (ARO) har 10 yilda 1 marta (0.1). Yillik kutilayotgan yo'qotish (ALE) qancha bo'ladi?",
    options_en: [
      "$5,000",
      "$50,000",
      "$10,000",
      "$500"
    ],
    options_uz: [
      "$5,000",
      "$50,000",
      "$10,000",
      "$500"
    ],
    correct: 0,
    explanation_en: "SLE = Asset Value ($100,000) * EF (0.50) = $50,000. ALE = SLE ($50,000) * ARO (0.10) = $5,000 per year.",
    explanation_uz: "SLE = $100,000 x 0.50 = $50,000. ALE = SLE x ARO = $50,000 x 0.1 = $5,000. Yillik o'rtacha xatar zarari $5,000 ni tashkil etadi."
  },
  {
    id: 74,
    domain: "5.0",
    domainName: "Security Program Management",
    q_en: "A company purchases a comprehensive cyber-insurance policy to cover financial liabilities resulting from potential data breaches. Which risk response strategy is this?",
    q_uz: "Kompaniya ma'lumotlar sizishi oqibatida ko'riladigan moliyaviy zararlarni qoplash uchun kiber-sug'urta (cyber-insurance) polisini sotib oldi. Bu qaysi xatarga javob berish strategiyasi?",
    options_en: [
      "Risk Acceptance",
      "Risk Mitigation",
      "Risk Avoidance",
      "Risk Transfer (Transference)"
    ],
    options_uz: [
      "Xatarni qabul qilish (Risk Acceptance)",
      "Xatarni kamaytirish (Risk Mitigation)",
      "Xatardan qochish (Risk Avoidance)",
      "Xatarni boshqa tomonga o'tkazish (Risk Transfer)"
    ],
    correct: 3,
    explanation_en: "Purchasing insurance or outsourcing security operations transfers the financial risk or responsibility to a third party.",
    explanation_uz: "Sug'urta sotib olish — xatarning moliyaviy yukini boshqa tashkilotga (sug'urta kompaniyasiga) o'tkazish (Risk Transfer) strategiyasidir."
  },
  {
    id: 75,
    domain: "5.0",
    domainName: "Security Program Management",
    q_en: "A business continuity plan specifies that critical customer databases must be restored and operational within 4 hours of an outage. What metric does this represent?",
    q_uz: "Biznes uzluksizligi rejasida muhim ma'lumotlar bazasi ishdan chiqqanidan so'ng maksimal 4 soat ichida qayta tiklanishi va ishga tushirilishi shart deb belgilandi. Ushbu ko'rsatkich nima deb ataladi?",
    options_en: [
      "Mean Time Between Failures (MTBF)",
      "Recovery Point Objective (RPO)",
      "Recovery Time Objective (RTO)",
      "Annualized Rate of Occurrence (ARO)"
    ],
    options_uz: [
      "Nosozliklar orasidagi o'rtacha vaqt (MTBF)",
      "Ma'lumotlarni yo'qotish nuqtasi (Recovery Point Objective - RPO)",
      "Qayta tiklanish vaqti maqsadi (Recovery Time Objective - RTO)",
      "Yillik takrorlanish koeffitsiyenti (ARO)"
    ],
    correct: 2,
    explanation_en: "Recovery Time Objective (RTO) is the targeted maximum acceptable duration of time that a system or application can be offline following an incident.",
    explanation_uz: "RTO (Recovery Time Objective) — tizim ishdan chiqqach, uni qayta oyoqqa turg'azish uchun ruxsat berilgan maksimal vaqt chegarasidir."
  },
  {
    id: 76,
    domain: "5.0",
    domainName: "Security Program Management",
    q_en: "An organization requires that in the event of a disaster, data loss must not exceed 1 hour worth of transactions. Which metric defines this threshold?",
    q_uz: "Tashkilot falokat yuz berganda yo'qotilgan ma'lumotlar hajmi oxirgi 1 soatlik tranzaksiyalardan oshmasligi kerakligini belgiladi. Bu ko'rsatkich qaysi?",
    options_en: [
      "Recovery Time Objective (RTO)",
      "Recovery Point Objective (RPO)",
      "Single Loss Expectancy (SLE)",
      "Exposure Factor (EF)"
    ],
    options_uz: [
      "Qayta tiklanish vaqti (RTO)",
      "Ma'lumotlarni yo'qotish nuqtasi (Recovery Point Objective - RPO)",
      "Bitta yo'qotish zarari (SLE)",
      "Zarar koeffitsiyenti (EF)"
    ],
    correct: 1,
    explanation_en: "Recovery Point Objective (RPO) dictates the maximum acceptable age of data files that must be recovered from backup for normal operations to resume (i.e. maximum data loss).",
    explanation_uz: "RPO (Recovery Point Objective) — tashkilot qancha vaqtlik ma'lumotni yo'qotishga chidashi mumkinligini ko'rsatadi (masalan, har 1 soatda zaxira nusxa olish)."
  },
  {
    id: 77,
    domain: "5.0",
    domainName: "Security Program Management",
    q_en: "Which backup strategy requires the MOST time to restore data because it requires restoring the last full backup followed by every subsequent incremental backup in chronological order?",
    q_uz: "Qaysi zaxira (backup) strategiyasi ma'lumotlarni tiklashda ENG KO'P vaqt talab qiladi, chunki u to'liq zaxira va undan keyingi barcha oraliq zaxiralarni ketma-ket tiklashni talab etadi?",
    options_en: [
      "Incremental Backup Strategy",
      "Differential Backup Strategy",
      "Full Backup Strategy only",
      "Mirroring only"
    ],
    options_uz: [
      "Incremental zaxiralash strategiyasi",
      "Differential zaxiralash strategiyasi",
      "Faqat Full Backup strategiyasi",
      "Faqat ko'zgulash (Mirroring)"
    ],
    correct: 0,
    explanation_en: "Restoring an Incremental backup requires restoring the last Full backup plus EVERY single incremental backup made since, making restoration the slowest of all options.",
    explanation_uz: "Incremental backup zaxira olishda eng tez bo'lsa-da, tizimni tiklashda eng uzoq vaqt oladi, chunki oxirgi Full va uning ustiga olingan barcha Incremental qismlar kerak."
  },
  {
    id: 78,
    domain: "5.0",
    domainName: "Security Program Management",
    q_en: "Which international data privacy law grants European Union citizens the 'Right to be Forgotten' (data erasure) and mandates 72-hour breach reporting?",
    q_uz: "Yevropa Ittifoqi fuqarolariga 'unutilish huquqi' (ma'lumotlarni o'chirish) va 72 soat ichida buzilishlar haqida xabar berishni majburiy qiluvchi qonun qaysi?",
    options_en: [
      "Sarbanes-Oxley Act (SOX)",
      "Health Insurance Portability and Accountability Act (HIPAA)",
      "Payment Card Industry Data Security Standard (PCI-DSS)",
      "General Data Protection Regulation (GDPR)"
    ],
    options_uz: [
      "SOX qonuni",
      "HIPAA qonuni",
      "PCI-DSS standarti",
      "GDPR (General Data Protection Regulation)"
    ],
    correct: 3,
    explanation_en: "GDPR regulates personal data privacy for EU individuals, enforcing severe non-compliance penalties, strict consent guidelines, and the right to erasure.",
    explanation_uz: "GDPR — Yevropa Ittifoqining shaxsiy ma'lumotlarni himoya qilish bo'yicha eng qat'iy qonunidir."
  },
  {
    id: 79,
    domain: "5.0",
    domainName: "Security Program Management",
    q_en: "Which mandatory standard applies to any merchant or service provider that stores, processes, or transmits credit cardholder information?",
    q_uz: "Kredit karta egalarining ma'lumotlarini saqlovchi, qayta ishlovchi yoki uzatuvchi har qanday tashkilot uchun majburiy xalqaro xavfsizlik standarti qaysi?",
    options_en: [
      "Family Educational Rights and Privacy Act (FERPA)",
      "Federal Information Security Modernization Act (FISMA)",
      "Payment Card Industry Data Security Standard (PCI-DSS)",
      "ISO 9001"
    ],
    options_uz: [
      "FERPA",
      "FISMA",
      "PCI-DSS (Payment Card Industry Data Security Standard)",
      "ISO 9001"
    ],
    correct: 2,
    explanation_en: "PCI-DSS is the technical and operational standard required for entities that handle branded credit cards (Visa, MasterCard, Amex) to protect cardholder data.",
    explanation_uz: "PCI-DSS — bank kartalari orqali to'lovlarni qabul qiluvchi va saqlovchi barcha tizimlar uchun majburiy bo'lgan xalqaro xavfsizlik standartidir."
  },
  {
    id: 80,
    domain: "5.0",
    domainName: "Security Program Management",
    q_en: "Which regulation establishes legal national privacy safeguards for Protected Health Information (PHI) held by covered medical entities in the United States?",
    q_uz: "AQShda tibbiyot tashkilotlari tomonidan saqlanadigan bemorlarning sog'lig'i haqidagi ma'lumotlarni (PHI) himoya qilishni talab qiluvchi qonun qaysi?",
    options_en: [
      "GDPR",
      "HIPAA",
      "PCI-DSS",
      "DMCA"
    ],
    options_uz: [
      "GDPR",
      "HIPAA",
      "PCI-DSS",
      "DMCA"
    ],
    correct: 1,
    explanation_en: "HIPAA (Health Insurance Portability and Accountability Act) sets strict standards for protecting sensitive patient health records (PHI).",
    explanation_uz: "HIPAA — sog'liqni saqlash sohasidagi tibbiy ma'lumotlar (bemorlar tarixi, kasalliklari) maxfiyligini ta'minlovchi qonun."
  },
  {
    id: 81,
    domain: "5.0",
    domainName: "Security Program Management",
    q_en: "What are the five core continuous functions of the National Institute of Standards and Technology Cybersecurity Framework (NIST CSF)?",
    q_uz: "NIST Kiberxavfsizlik Frameworkining (CSF) 5 ta asosiy funksiyasi to'g'ri ketma-ketlikda qaysi javobda ko'rsatilgan?",
    options_en: [
      "Identify, Protect, Detect, Respond, Recover",
      "Plan, Do, Check, Act, Report",
      "Encrypt, Hash, Sign, Verify, Audit",
      "Authenticate, Authorize, Account, Audit, Assess"
    ],
    options_uz: [
      "Identify, Protect, Detect, Respond, Recover (Aniqlash, Himoya qilish, Payqash, Javob berish, Tiklash)",
      "Plan, Do, Check, Act, Report",
      "Encrypt, Hash, Sign, Verify, Audit",
      "Authenticate, Authorize, Account, Audit, Assess"
    ],
    correct: 0,
    explanation_en: "NIST CSF comprises five core concurrent functions: Identify assets and risks, Protect through controls, Detect threats, Respond to incidents, and Recover operations.",
    explanation_uz: "NIST CSF 5 ta asosiy ustunga ega: Identify (Aniqlash) -> Protect (Himoyalash) -> Detect (Sezish) -> Respond (Javob berish) -> Recover (Tiklash)."
  },
  {
    id: 82,
    domain: "5.0",
    domainName: "Security Program Management",
    q_en: "An organization conducts unannounced mock phishing campaigns against its employees every month. What is the PRIMARY goal of this exercise?",
    q_uz: "Tashkilot har oy xodimlarga ogohlantirmasdan soxta sinov phishing xatlarini yuboradi. Ushbu mashg'ulotning ASOSIY maqsadi nima?",
    options_en: [
      "To bypass DNS caching protocols",
      "To identify employees who should be terminated immediately",
      "To test corporate spam filter hardware throughput",
      "To test and improve employee security awareness and vigilance"
    ],
    options_uz: [
      "DNS keshini chetlab o'tish",
      "Zudlik bilan ishdan bo'shatilishi kerak bo'lgan xodimlarni topish",
      "Spam filtrining tarmoq o'tkazuvchanligini sinash",
      "Xodimlarning xavfsizlik madaniyatini va hushyorligini oshirish"
    ],
    correct: 3,
    explanation_en: "Security awareness training and phishing simulations train human users (often the weakest link) to identify, avoid, and report social engineering attacks.",
    explanation_uz: "Soxta phishing sinovlari xodimlarni real xakerlik xatlarini taniy olishga va hushyor bo'lishga o'rgatish (Security Awareness) uchun o'tkaziladi."
  },
  {
    id: 83,
    domain: "5.0",
    domainName: "Security Program Management",
    q_en: "Which formal document specifies performance metrics, expected uptime (e.g. 99.999%), and penalty clauses agreed upon between a service provider and a client?",
    q_uz: "Xizmat ko'rsatuvchi provayder va mijoz o'rtasida tizimning uzluksiz ishlash vaqti (masalan, 99.999%) va shartlari belgilangan rasmiy shartnoma nima deyiladi?",
    options_en: [
      "Acceptable Use Policy (AUP)",
      "Non-Disclosure Agreement (NDA)",
      "Service Level Agreement (SLA)",
      "Business Impact Analysis (BIA)"
    ],
    options_uz: [
      "To'g'ri foydalanish siyosati (AUP)",
      "Maxfiylik kelishuvi (NDA)",
      "Xizmat darajasi kelishuvi (Service Level Agreement - SLA)",
      "Biznesga ta'sir tahlili (BIA)"
    ],
    correct: 2,
    explanation_en: "A Service Level Agreement (SLA) defines measurable service expectations (availability, response time, latency) and contractual consequences if they are not met.",
    explanation_uz: "SLA (Service Level Agreement) bulut yoki xizmat ko'rsatuvchi provayder tizimning qanchalik uzluksiz ishlashini kafolatlovchi rasmiy shartnomadir."
  },
  {
    id: 84,
    domain: "5.0",
    domainName: "Security Program Management",
    q_en: "Which policy explicitly outlines what employees can and cannot do using company computers, networks, and internet access during work hours?",
    q_uz: "Xodimlar ish vaqtida kompaniya kompyuteri va internetidan nimalar qila olishi va nimalar taqiqlanishini belgilab beruvchi siyosat nima deb ataladi?",
    options_en: [
      "Disaster Recovery Plan (DRP)",
      "Acceptable Use Policy (AUP)",
      "Data Retention Policy",
      "Privacy Impact Assessment (PIA)"
    ],
    options_uz: [
      "Falokatdan tiklanish rejasi (DRP)",
      "Qabul qilinadigan foydalanish siyosati (Acceptable Use Policy - AUP)",
      "Ma'lumotlarni saqlash siyosati",
      "Maxfiylik ta'siri tahlili"
    ],
    correct: 1,
    explanation_en: "An Acceptable Use Policy (AUP) defines the permissible and forbidden uses of organizational IT assets, hardware, software, and communication systems.",
    explanation_uz: "AUP (Acceptable Use Policy) xodimlarga kompaniya texnikasidan qanday maqsadlarda foydalanish mumkinligini belgilovchi qoidalar to'plamidir."
  },
  {
    id: 85,
    type: "multi_choice",
    selectCount: 2,
    domain: "5.0",
    domainName: "Program Management & Oversight",
    q_en: "A Chief Information Security Officer (CISO) is establishing business continuity and disaster recovery service level agreements (SLAs). Which TWO metrics define the maximum tolerable data loss and the maximum tolerable system downtime? (Choose TWO)",
    q_uz: "Axborot xavfsizligi bo'yicha bosh direktor (CISO) biznesning uzluksizligi va falokatdan keyin tiklash (DR) bo'yicha reglamentlarni belgilamoqda. Qaysi IKKITA ko'rsatkich mos ravishda yo'qotilishi mumkin bo'lgan maksimal ma'lumot miqdori va tizimning to'xtab turishining maksimal ruxsat etilgan vaqtini belgilaydi? (IKKITASINI tanlang)",
    options_en: [
      "Recovery Point Objective (RPO) - defining acceptable data loss measured in time between backups",
      "Recovery Time Objective (RTO) - defining acceptable system downtime duration before restoration",
      "Mean Time Between Failures (MTBF) - measuring component manufacturing lifespan",
      "Annualized Rate of Occurrence (ARO) - tracking historical frequency of lightning strikes",
      "Single Loss Expectancy (SLE) - estimating monetary impact of a single laptop theft"
    ],
    options_uz: [
      "Recovery Point Objective (RPO) — zaxira nusxalar orasidagi vaqt bilan o'lchanadigan, yo'qotilishi mumkin bo'lgan maksimal ma'lumot ko'lami",
      "Recovery Time Objective (RTO) — falokatdan keyin tizimni ishchi holatga qaytarish uchun ruxsat etilgan maksimal vaqt",
      "Mean Time Between Failures (MTBF) — texnik qurilmaning ikki nosozlik orasidagi o'rtacha ishlash vaqti",
      "Annualized Rate of Occurrence (ARO) — xavfning yil davomida sodir bo'lish chastotasi",
      "Single Loss Expectancy (SLE) — bitta noxush hodisadan ko'riladigan taxminiy moliyaviy zarar"
    ],
    correct: [0, 1],
    explanation_en: "RPO determines how much data (in time) a business can afford to lose. RTO dictates the maximum amount of time systems can remain offline during a disaster.",
    explanation_uz: "RPO — qancha vaqtlik ma'lumotni yo'qotishga korxona bardosh bera olishini (zaxira vaqti), RTO esa tizimning qancha vaqt o'chiq turishi mumkinligini (tiklanish muddati) belgilaydi."
  },
  {
    id: 86,
    domain: "5.0",
    domainName: "Security Program Management",
    q_en: "A cybersecurity team is evaluating risk by assigning numerical dollar values to assets and potential losses using formulas. What type of risk assessment is being performed?",
    q_uz: "Kiberxavfsizlik jamoasi xatarlarni baholashda aniq formulalar va aktivlarning dollar qiymatlaridan foydalanib hisob-kitob qildi. Bu qaysi turdagi risk tahlili?",
    options_en: [
      "Penetration Testing",
      "Qualitative Risk Assessment",
      "Vulnerability Scan",
      "Quantitative Risk Assessment"
    ],
    options_uz: [
      "Penetratsion test",
      "Sifatli xatarlarni baholash (Qualitative Risk Assessment)",
      "Zaifliklarni skanerlash",
      "Miqdoriy xatarlarni baholash (Quantitative Risk Assessment)"
    ],
    correct: 3,
    explanation_en: "Quantitative risk assessments assign concrete dollar values and objective numerical metrics (SLE, ARO, ALE) to calculate financial risk.",
    explanation_uz: "Quantitative (miqdoriy) tahlil aniq raqamlar, formulalar va dollar qiymatiga asoslanadi. Qualitative (sifatli) esa shunchaki 'Yuqori, O'rta, Past' deb baholaydi."
  },
  {
    id: 87,
    domain: "5.0",
    domainName: "Security Program Management",
    q_en: "An organization decides to cancel a planned software development project because the security risks of hosting the service outweigh any potential revenue. Which risk strategy is this?",
    q_uz: "Tashkilot rejalashtirilgan dasturiy loyihani bekor qilishga qaror qildi, chunki uning xavfsizlik xatarlari keltirishi mumkin bo'lgan daromaddan ancha yuqori deb topildi. Bu qaysi xatar strategiyasi?",
    options_en: [
      "Risk Transference",
      "Risk Acceptance",
      "Risk Avoidance",
      "Risk Mitigation"
    ],
    options_uz: [
      "Xatarni o'tkazish (Risk Transference)",
      "Xatarni qabul qilish (Risk Acceptance)",
      "Xatardan qochish (Risk Avoidance)",
      "Xatarni yumshatish (Risk Mitigation)"
    ],
    correct: 2,
    explanation_en: "Risk Avoidance eliminates risk completely by withdrawing from or choosing not to participate in the risky activity.",
    explanation_uz: "Risk Avoidance (xatardan qochish) — xavfli faoliyatni yoki loyihani butunlay to'xtatish orqali xatarni yo'q qilishdir."
  },
  {
    id: 88,
    domain: "5.0",
    domainName: "Security Program Management",
    q_en: "Which assessment is conducted prior to implementing a new IT system to identify, evaluate, and mitigate potential privacy risks associated with processing personally identifiable information (PII)?",
    q_uz: "Yangi IT tizimini o'rnatishdan oldin shaxsiy ma'lumotlar (PII) bilan bog'liq maxfiylik xatarlarini aniqlash va baholash uchun qanday tahlil o'tkaziladi?",
    options_en: [
      "Disaster Recovery Exercise",
      "Privacy Impact Assessment (PIA)",
      "Network Penetration Test",
      "Port Scan"
    ],
    options_uz: [
      "Falokatdan tiklanish mashqi",
      "Maxfiylik ta'siri bahosi (Privacy Impact Assessment - PIA)",
      "Tarmoq penetratsion testi",
      "Port skanerlash"
    ],
    correct: 1,
    explanation_en: "A Privacy Impact Assessment (PIA) evaluates how personally identifiable information (PII) is collected, stored, protected, and shared across systems to maintain compliance.",
    explanation_uz: "PIA (Privacy Impact Assessment) fuqarolarning shaxsiy ma'lumotlari tizimda qanchalik xavfsiz saqlanishini tekshiruvchi maxsus tahlildir."
  },
  {
    id: 89,
    domain: "5.0",
    domainName: "Security Program Management",
    q_en: "A decommissioned server containing confidential financial records is to be disposed of. Which data sanitization method renders magnetic hard drives unreadable using a high-powered magnetic field?",
    q_uz: "Maxfiy moliyaviy ma'lumotlarga ega eski server yo'q qilinmoqda. Magnitli qattiq disklarni yuqori quvvatli magnit maydoni orqali to'liq yaroqsiz holga keltirish usuli nima?",
    options_en: [
      "Degaussing",
      "Standard OS formatting",
      "Renaming partition volumes",
      "Overclocking"
    ],
    options_uz: [
      "Degaussing (Magnitsizlantirish)",
      "Operatsion tizimda oddiy format qilish",
      "Bo'lim nomlarini o'zgartirish",
      "Overclocking"
    ],
    correct: 0,
    explanation_en: "Degaussing exposes magnetic media (HDDs, tapes) to a powerful magnetic field, permanently destroying the recorded magnetic domains and rendering the drive completely unusable.",
    explanation_uz: "Degaussing — qattiq diskdagi barcha magnit maydonlarni yuqori quvvatli magnit orqali to'liq buzib tashlash va ma'lumotlarni qaytarib bo'lmas holga keltirish usulidir."
  },
  {
    id: 90,
    domain: "5.0",
    domainName: "Security Program Management",
    q_en: "Before signing a contract with a third-party cloud vendor, which audit report should an enterprise request to verify that the vendor has verified internal controls for security, availability, and confidentiality?",
    q_uz: "Uchinchi tomon bulut provayderi bilan shartnoma imzolashdan oldin, korxona provayderning xavfsizlik va maxfiylik nazoratlari tekshirilganligini tasdiqlovchi qaysi mustaqil audit hisobotini talab qilishi kerak?",
    options_en: [
      "Single-user software license",
      "Non-Disclosure Agreement only",
      "Acceptable Use Policy",
      "SOC 2 Type II Report"
    ],
    options_uz: [
      "Bir foydalanuvchili dastur litsenziyasi",
      "Faqat maxfiylik kelishuvi (NDA)",
      "Qabul qilinadigan foydalanish siyosati (AUP)",
      "SOC 2 Type II Hisoboti"
    ],
    correct: 3,
    explanation_en: "A SOC 2 Type II report provides an independent audit certifying the operational effectiveness of a service provider's security controls over an extended period (typically 6-12 months).",
    explanation_uz: "SOC 2 Type II — bulut provayderining axborot xavfsizligi standartlariga 6-12 oy davomida to'liq amal qilganini tasdiqlovchi eng nufuzli mustaqil audit hisobotidir."
  }
];
