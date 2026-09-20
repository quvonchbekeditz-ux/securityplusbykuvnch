// CompTIA Security+ (SY0-701) Rasmiy O'quv Dasturi & Darslik Ma'lumotlar Bazasi (Bilingual EN / UZ)
// Asosiy Manbalar:
// 1. CompTIA Security+ Study Guide SY0-701 Ninth Edition (Mike Chapple & David Seidl, Sybex / Wiley, 993 bet)
// 2. CompTIA-SY0-701 2.pdf (CompTIA rasmiy imtihon savollari, real dumps va PBQ tahlillari, 279 bet)

const ROADMAP_DATA = {
  phases: [
    { 
      id: "q1", 
      title_en: "Q1", 
      title_uz: "1-Chorak", 
      subtitle_en: "Weeks 1-3: IT & Networking Foundation", 
      subtitle_uz: "1-3 haftalar: IT va Tarmoq Asoslari", 
      color: "#3b82f6" 
    },
    { 
      id: "q2", 
      title_en: "Q2", 
      title_uz: "2-Chorak", 
      subtitle_en: "Weeks 4-6: Domain 1.0 & 2.0 (Threats)", 
      subtitle_uz: "4-6 haftalar: 1.0 & 2.0 Domenlar (Tahdidlar)", 
      color: "#8b5cf6" 
    },
    { 
      id: "q3", 
      title_en: "Q3", 
      title_uz: "3-Chorak", 
      subtitle_en: "Weeks 7-9: Domain 3.0 & 4.0 (Operations)", 
      subtitle_uz: "7-9 haftalar: 3.0 & 4.0 Domenlar (Operatsiyalar)", 
      color: "#10b981" 
    },
    { 
      id: "q4", 
      title_en: "Q4", 
      title_uz: "4-Chorak", 
      subtitle_en: "Weeks 10-12: Domain 5.0, PBQ & Exam", 
      subtitle_uz: "10-12 haftalar: 5.0 Domen, PBQ va Imtihon", 
      color: "#f59e0b" 
    }
  ],
  milestones: [
    { 
      id: "m1", 
      title_en: "Phase 0 Checkpoint (Network & Linux)", 
      title_uz: "Faza 0 Yakuni (Network & Linux)", 
      week_en: "Week 3", 
      week_uz: "3-Hafta", 
      posPercent: 22, 
      color: "#ef4444" 
    },
    { 
      id: "m2", 
      title_en: "Domain 1 & 2 Checkpoint (80%+ Target)", 
      title_uz: "Domain 1 & 2 Checkpoint (80%+ Me'yor)", 
      week_en: "Week 6", 
      week_uz: "6-Hafta", 
      posPercent: 48, 
      color: "#3b82f6" 
    },
    { 
      id: "m3", 
      title_en: "PBQ & Wireshark Deep-Dive Labs", 
      title_uz: "PBQ & Wireshark Amaliy Laboratoriyalar", 
      week_en: "Week 9", 
      week_uz: "9-Hafta", 
      posPercent: 73, 
      color: "#10b981" 
    },
    { 
      id: "m4", 
      title_en: "OFFICIAL EXAM DAY (750+ PASS SCORE)", 
      title_uz: "RASMIY IMTIHON KUNI (750+ PASS BALL)", 
      week_en: "Week 12", 
      week_uz: "12-Hafta", 
      posPercent: 96, 
      color: "#2563eb" 
    }
  ],
  swimlanes: [
    {
      id: "know-why",
      category_en: "Know-why (Theory & Strategy)",
      category_uz: "Nazariya va Strategiya (Know-why)",
      subcategories: [
        { 
          id: "business", 
          name_en: "Security Governance & Strategy", 
          name_uz: "Xavfsizlik Boshqaruvi va Strategiya", 
          icon: "🛡️" 
        },
        { 
          id: "trends", 
          name_en: "Modern Frameworks & Trends", 
          name_uz: "Zamonaviy Freymvorklar va Tendensiyalar", 
          icon: "📈" 
        }
      ]
    },
    {
      id: "know-what",
      category_en: "Know-what (Exam Domains)",
      category_uz: "Imtihon Domenlari (Know-what)",
      subcategories: [
        { 
          id: "dom1", 
          name_en: "Domain 1.0: General Security Concepts (12%)", 
          name_uz: "1.0 Domen: Umumiy Xavfsizlik Konsepsiyalari (12%)", 
          icon: "🔑" 
        },
        { 
          id: "dom2", 
          name_en: "Domain 2.0: Threats, Attacks & Vulnerabilities (22%)", 
          name_uz: "2.0 Domen: Tahdidlar, Hujumlar & Zaifliklar (22%)", 
          icon: "☣️" 
        },
        { 
          id: "dom3", 
          name_en: "Domain 3.0: Security Architecture & Design (18%)", 
          name_uz: "3.0 Domen: Xavfsizlik Arxitekturasi & Dizayn (18%)", 
          icon: "🏛️" 
        },
        { 
          id: "dom4", 
          name_en: "Domain 4.0: Security Operations & IR (28%)", 
          name_uz: "4.0 Domen: Xavfsizlik Operatsiyalari & IR (28%)", 
          icon: "🔍" 
        },
        { 
          id: "dom5", 
          name_en: "Domain 5.0: Program Management & Oversight (20%)", 
          name_uz: "5.0 Domen: Dastur Boshqaruvi & Nazorat (20%)", 
          icon: "⚖️" 
        }
      ]
    },
    {
      id: "know-how",
      category_en: "Know-how & Tech",
      category_uz: "Amaliyot va Texnologiyalar (Know-how)",
      subcategories: [
        { 
          id: "tools", 
          name_en: "Hands-on Security Tools & CLI", 
          name_uz: "Amaliy Xavfsizlik Asboblari & Buyruqlar", 
          icon: "⚙️" 
        },
        { 
          id: "labs", 
          name_en: "Interactive Packet Labs (TryHackMe/Wireshark)", 
          name_uz: "Interaktiv Paket Laboratoriyalari (Wireshark)", 
          icon: "🧪" 
        }
      ]
    },
    {
      id: "testing",
      category_en: "Assessments & Milestones",
      category_uz: "Baholash va Bosqichlar",
      subcategories: [
        { 
          id: "practice", 
          name_en: "Exam Simulations & PBQ Drills", 
          name_uz: "Imtihon Simulyatsiyasi va PBQ Mashqlari", 
          icon: "🎯" 
        }
      ]
    }
  ],
  topics: 
[
    {
        "id": "net-osi",
        "videoUrl": "https://www.youtube.com/watch?v=CRdL1PcherM",
        "videoTitle": "NetworkChuck: what is TCP/IP and OSI? // FREE CCNA // EP 3",
        "videoChannel": "NetworkChuck",
        "title_en": "OSI Model & TCP/IP Protocol Stack",
        "title_uz": "OSI Modeli va TCP/IP Protokollar Steki",
        "swimlaneId": "know-why",
        "subcategoryId": "business",
        "quarter": "q1",
        "domain_en": "Phase 0: Foundation",
        "domain_uz": "Faza 0: Asosiy Poydevor",
        "duration_en": "1 Week",
        "duration_uz": "1 Hafta",
        "colorTag": "#3b82f6",
        "hasSubLink": true,
        "dependencies": [
            "net-ports"
        ],
        "summary_en": "Data encapsulation across 7 layers, transport protocols (TCP 3-way handshake vs UDP), and device mapping.",
        "summary_uz": "7 qatlamli ma'lumot inkapsulyatsiyasi, transport protokollari (TCP 3-way handshake va UDP) hamda tarmoq qurilmalari.",
        "details_en": "### 📘 Sybex 9th Edition Reference: Chapter 3 - Network Architecture & Encapsulation\n**CompTIA Exam Objective 1.1:** Compare and contrast various types of security controls and network architectures.\n\nUnderstanding the OSI (Open Systems Interconnection) reference model is the cornerstone of cyber defense, packet inspection, and network security appliances placement.\n\n#### The 7 OSI Layers & Defense Mapping:\n1. **Layer 7 - Application:** Interface between human-facing applications and network services (HTTP, HTTPS, SSH, DNS, SMTP). \n   - *Security Defense:* Web Application Firewalls (WAF), API Gateways, Next-Generation Firewalls (NGFW).\n   - *Primary Threats:* SQL Injection (SQLi), Cross-Site Scripting (XSS), CSRF, Zero-Day Web exploits.\n2. **Layer 6 - Presentation:** Data format translation, compression, and cryptographic negotiation (TLS 1.3 / SSL handshakes, ASCII, MIME).\n3. **Layer 5 - Session:** Manages and terminates communication sessions between endpoints (RPC, NetBIOS, PPTP).\n4. **Layer 4 - Transport:** End-to-end communication reliability.\n   - **TCP (Transmission Control Protocol):** Connection-oriented, guaranteed delivery via **SYN -> SYN-ACK -> ACK** (3-way handshake) and sequence numbers.\n   - **UDP (User Datagram Protocol):** Connectionless, lightweight best-effort delivery (DNS queries, VoIP, DHCP, NTP). Susceptible to UDP amplification DDoS attacks.\n5. **Layer 3 - Network:** Logical addressing and routing of **Packets** across subnets using IP addresses (IPv4, IPv6, ICMP, IPsec routers).\n6. **Layer 2 - Data Link:** Physical addressing with **Frames** using MAC addresses (Switches, VLANs, 802.1Q). Threats: ARP Poisoning, MAC Flooding.\n7. **Layer 1 - Physical:** Transmission of raw **Bits** over copper, fiber optics, or radio frequencies (Hubs, Cables, WAPs).\n\n---\n\n### 🎯 Real CompTIA Exam Scenario (CompTIA-SY0-701 Dumps):\n> **Question:** A security engineer is analyzing a network capture following an alert. The packet capture shows an external attacker sending thousands of TCP packets with only the SYN flag set to a company web server, without ever replying with the final ACK. As a result, the server's connection table is exhausted. Which layer of the OSI model does this attack exploit, and what is the remediation?\n> \n> - **A.** Layer 7; deploy an Application Gateway.\n> - **B.** Layer 4; enable SYN flood protection / SYN cookies on the firewall.\n> - **C.** Layer 3; reconfigure the default gateway IP.\n> - **D.** Layer 2; enable 802.1X port security on access switches.\n> \n> **Correct Answer: B**  \n> **Official Explanation:** The attack described is a classic TCP SYN Flood, which exploits the Layer 4 (Transport Layer) 3-way handshake mechanism. Because the client never sends the ACK, the server keeps half-open connections in its backlog queue until exhausted. The standard remediation is enabling SYN Cookies or TCP half-open connection rate limiting on the perimeter firewall (Layer 4).",
        "details_uz": "### 📘 Sybex 9-Nashr Darsligi: 3-Bob - Tarmoq Arxitekturasi va Inkapsulyatsiya\n**CompTIA Imtihon Maqsadi 1.1:** Xavfsizlik nazorat vositalari va tarmoq arxitekturasini taqqoslash va tahlil qilish.\n\nOSI (Open Systems Interconnection) modeli — kiberxavfsizlik mutaxassislari uchun tarmoq trafigini tekshirish, tahdidlarni aniqlash va xavfsizlik devorlarini to'g'ri o'rnatishning bosh poydevoridir.\n\n#### 7 ta Qatlam va Xavfsizlik Vositalari:\n1. **7-Qatlam - Application (Ilova):** Foydalanuvchi dasturlari va tarmoq protokollari interfeysi (HTTP, HTTPS, SSH, DNS).\n   - *Himoya vositasi:* WAF (Web Application Firewall), Next-Gen Firewall (NGFW).\n   - *Tahdidlar:* SQL Injection, XSS, CSRF.\n2. **6-Qatlam - Presentation (Taqdimot):** Ma'lumotlarni shifrlash va formatlash (TLS 1.3, SSL, ma'lumotlarni siqish).\n3. **5-Qatlam - Session (Sessiya):** Seanslarni ochish, boshqarish va tugatish (RPC, NetBIOS).\n4. **4-Qatlam - Transport (Transport):** Segmentlarni uzatish ishonchliligi.\n   - **TCP:** Bog'lanishli, kafolatlangan protokol. **SYN -> SYN-ACK -> ACK** (3 bosqichli salomlashish) orqali ulanadi.\n   - **UDP:** Bog'lanishsiz, tezkor protokol (DNS, DHCP, VoIP). UDP amplifikatsiya DDoS hujumlariga moyil.\n5. **3-Qatlam - Network (Tarmoq):** Paketlarni IP manzillar bo'yicha marshrutlash (Routerlar, IPv4, IPv6, ICMP).\n6. **2-Qatlam - Data Link (Kanal):** Jismoniy MAC manzilli Freymlar (Switchlar). Xavf: ARP poisoning, MAC flooding.\n7. **1-Qatlam - Physical (Jismoniy):** Elektr va optik signallar (Bitlar, kabellar, Wi-Fi radioto'lqinlari).\n\n---\n\n### 🎯 Rasmiy CompTIA Imtihon Vaziyatli Savoli (Real Dumps):\n> **Savol:** Kiberxavfsizlik tahlilchisi tarmoq trafigini tekshirmoqda. Xaker veb-serverga doimiy ravishda faqat SYN bayrog'i qo'yilgan minglab TCP paketlarini jo'natmoqda, ammo hech qachon yakuniy ACK paketini qaytarmayapti. Natijada server yangi ulanishlarni qabul qila olmay qoldi. Ushbu hujum OSI modelining qaysi qatlamiga tegishli va uni qanday bartaraf etish kerak?\n> \n> - **A.** 7-Qatlam; Application Gateway o'rnatish.\n> - **B.** 4-Qatlam; Firewall-da SYN cookie yoki SYN flood himoyasini yoqish.\n> - **C.** 3-Qatlam; Default Gateway IP manzilini o'zgartirish.\n> - **D.** 2-Qatlam; Switch portlarida 802.1X ni sozlash.\n> \n> **To'g'ri Javob: B**  \n> **Rasmiy Tahlil:** Ushbu hujum klassik TCP SYN Flood hujumi bo'lib, u 4-Qatlam (Transport Layer) ning 3 bosqichli ulanish mexanizmini suiiste'mol qiladi. Server ulanishlar navbati to'lib qolmasligi uchun perimetr firewall qurilmasida SYN Flood himoyasi yoki SYN Cookies faollashtiriladi.",
        "examTips_en": "Exam questions often test device placement: Routers operate at Layer 3, standard Switches at Layer 2, and WAFs at Layer 7.",
        "examTips_uz": "Imtihonda qurilmalarning qatlamlari ko'p so'raladi: Router - Layer 3, Switch - Layer 2, WAF - Layer 7.",
        "status": "not_started"
    },
    {
        "id": "net-ports",
        "videoUrl": "https://www.youtube.com/watch?v=g2fT-g9PX9o",
        "videoTitle": "PowerCert Animated Videos: Network Ports Explained",
        "videoChannel": "PowerCert Animated Videos",
        "title_en": "Essential Ports & Protocols Matrix",
        "title_uz": "Asosiy Portlar va Protokollar Matritsasi",
        "swimlaneId": "know-what",
        "subcategoryId": "dom1",
        "quarter": "q1",
        "domain_en": "Domain 1.0 (12%)",
        "domain_uz": "1.0 Domen (12%)",
        "duration_en": "1 Week",
        "duration_uz": "1 Hafta",
        "colorTag": "#2563eb",
        "hasSubLink": true,
        "dependencies": [
            "linux-cli"
        ],
        "summary_en": "Cleartext protocols (FTP 20/21, Telnet 23, HTTP 80) and their cryptographically secure replacements (SSH 22, HTTPS 443, SFTP).",
        "summary_uz": "Ochiq matnli protokollar (FTP 21, Telnet 23, HTTP 80) va ularning xavfsiz shifrlangan alternativlari (SSH 22, HTTPS 443, SFTP).",
        "details_en": "### 📘 Sybex 9th Edition Reference: Chapter 4 - Ports & Network Protocols\n**CompTIA Exam Objective 1.2:** Given a scenario, analyze indicators of malicious activity related to network protocols.\n\nEvery standard TCP/IP network service binds to a well-known port (0-1023) or registered port (1024-49151). Cleartext services leak credentials over network segments and must be replaced with cryptographically hardened alternatives.\n\n#### Comprehensive Secure vs Insecure Ports Matrix:\n- **Port 22 (SSH / SFTP):** Secure Shell & Secure File Transfer. Replaces cleartext Telnet (Port 23) and FTP (Ports 20/21). Employs public-key cryptography and AES/ChaCha20 session encryption.\n- **Port 53 (DNS / DNSSEC):** Domain Name System. Standard UDP 53 is vulnerable to cache poisoning. **DNSSEC** adds cryptographic signatures (RRSIG). **DoH / DoT** encrypts queries over HTTPS (443) or TLS (853).\n- **Port 88 (Kerberos):** Default authentication protocol in Microsoft Active Directory using Ticket Granting Tickets (TGT).\n- **Port 389 vs 636 (LDAP vs LDAPS):** Lightweight Directory Access Protocol. Unencrypted LDAP transmits user credentials in plain text. **LDAPS (Port 636)** mandates TLS encryption.\n- **Port 443 (HTTPS):** Secure HTTP encrypted with TLS 1.2/1.3. Replaces plain HTTP (Port 80).\n- **Port 445 (SMB):** Server Message Block. Used for file sharing. High-risk target for ransomware lateral movement (EternalBlue / WannaCry).\n- **Port 3389 (RDP):** Microsoft Remote Desktop Protocol. Must never be exposed directly to the public internet without a VPN or MFA Jump Box.\n\n---\n\n### 🎯 Real CompTIA Exam Scenario (CompTIA-SY0-701 Dumps):\n> **Question:** A network administrator discovers that a database administrator has been managing remote network equipment using cleartext terminal sessions across an untrusted wireless network. An attacker on the same Wi-Fi network captured authentication credentials. Which protocol should the administrator enforce to prevent this attack?\n> \n> - **A.** TFTP over UDP 69\n> - **B.** SSH over TCP 22\n> - **C.** SNMPv2 over UDP 161\n> - **D.** Telnet over TCP 23\n> \n> **Correct Answer: B**  \n> **Official Explanation:** Telnet communicates in cleartext, making passwords trivial to capture with a packet sniffer. SSH (TCP port 22) encrypts all communication end-to-end, providing confidentiality, integrity, and cryptographic server authentication.",
        "details_uz": "### 📘 Sybex 9-Nashr Darsligi: 4-Bob - Portlar va Tarmoq Protokollari\n**CompTIA Imtihon Maqsadi 1.2:** Tarmoq protokollari bilan bog'liq xavfsizlik ko'rsatkichlarini tahlil qilish.\n\nHar bir TCP/IP tarmog'idagi xizmat ma'lum bir portda ishlaydi. Ochiq matnda ishlovchi eski protokollar parollarni tarmoq orqali ochiq uzatadi va ularni shifrlangan zamonaviy turlari bilan almashtirish shart.\n\n#### Asosiy Portlar va Xavfsiz Alternativlar:\n- **Port 22 (SSH / SFTP):** Xavfsiz terminal va fayl uzatish. Ochiq matnli Telnet (23) va FTP (20/21) o'rniga ishlatiladi.\n- **Port 53 (DNS / DNSSEC):** Domen nomlarini IP ga aylantirish. Oddiy DNS kesh zaharlashga moyil. **DNSSEC** raqamli imzo orqali yaxlitlikni ta'minlaydi.\n- **Port 88 (Kerberos):** Active Directory tizimlarida chiptalar (TGT) orqali markazlashgan autentifikatsiya protokoli.\n- **Port 389 va 636 (LDAP vs LDAPS):** Foydalanuvchilar katalogi. Oddiy LDAP (389) parollarni ochiq uzatadi. **LDAPS (636)** TLS orqali to'liq shifrlaydi.\n- **Port 443 (HTTPS):** Veb-trafikni TLS 1.3 bilan shifrlash. Xavfli HTTP (80) o'rniga qo'llaniladi.\n- **Port 445 (SMB):** Windows fayl ulashish xizmati. WannaCry kabi ransomware viruslarining tarqalishida asosiy nishon bo'lgan.\n- **Port 3389 (RDP):** Masofaviy ish stoli. Hech qachon ochiq internetga VPN yoki MFA'siz chiqarilmasligi kerak.\n\n---\n\n### 🎯 Rasmiy CompTIA Imtihon Vaziyatli Savoli (Real Dumps):\n> **Savol:** Administrator xodimlardan biri umumiy Wi-Fi tarmog'i orqali marshrutizatorlarni ochiq matnli terminal sessiyasi bilan boshqarayotganini va tarmoqdagi xaker uning login-parolini ushlab olganini aniqladi. Ushbu muammoni bartaraf etish uchun qaysi protokol majburiy qilib belgilanishi kerak?\n> \n> - **A.** TFTP (UDP 69)\n> - **B.** SSH (TCP 22)\n> - **C.** SNMPv2 (UDP 161)\n> - **D.** Telnet (TCP 23)\n> \n> **To'g'ri Javob: B**  \n> **Rasmiy Tahlil:** Telnet ma'lumotlarni ochiq matnda jo'natgani sababli parollar Wireshark kabi sniffer dasturlari orqali osongina o'g'irlanadi. SSH (TCP 22) esa sessiyani to'liq asimmetrik va simmetrik kalitlar bilan shifrlab, maxfiylikni kafolatlaydi.",
        "examTips_en": "Always recommend SSH instead of Telnet, HTTPS instead of HTTP, SFTP instead of FTP, and LDAPS instead of LDAP.",
        "examTips_uz": "Imtihonda Telnet o'rniga SSH, HTTP o'rniga HTTPS, FTP o'rniga SFTP va LDAP o'rniga LDAPS tanlanadi.",
        "status": "not_started"
    },
    {
        "id": "linux-cli",
        "videoUrl": "https://www.youtube.com/watch?v=lZAoFs75_cs",
        "videoTitle": "freeCodeCamp.org: Linux for Ethical Hackers (Kali Linux Tutorial)",
        "videoChannel": "freeCodeCamp.org",
        "title_en": "Linux Security CLI & Network Tools",
        "title_uz": "Linux Xavfsizlik Buyruqlari & Tarmoq Asboblari",
        "swimlaneId": "know-how",
        "subcategoryId": "tools",
        "quarter": "q1",
        "domain_en": "Phase 0: Foundation",
        "domain_uz": "Faza 0: Asosiy Poydevor",
        "duration_en": "1 Week",
        "duration_uz": "1 Hafta",
        "colorTag": "#10b981",
        "hasSubLink": true,
        "dependencies": [
            "lab-presec"
        ],
        "summary_en": "Essential Linux commands for incident analysis: chmod/chown, iptables/nftables, tcpdump, grep, netstat/ss, and journalctl.",
        "summary_uz": "Hodisalarni tahlil qilish uchun Linux buyruqlari: chmod/chown, iptables/nftables, tcpdump, grep, netstat/ss va journalctl.",
        "details_en": "### 📘 Sybex 9th Edition Reference: Chapter 10 & 11 - Security Operations & CLI Tools\n**CompTIA Exam Objective 4.1:** Given a scenario, apply common security techniques and tools.\n\nSecurity analysts must be proficient with Linux command-line tools to triage active breaches, inspect listening ports, and filter gigabytes of server logs.\n\n#### Essential Security Commands & Use Cases:\n- `tcpdump -i eth0 -nn -s0 -w capture.pcap`: Captures live raw network packets directly into a PCAP file for subsequent Wireshark inspection.\n- `ss -tulpn` / `netstat -antup`: Lists all active TCP/UDP sockets, listening ports, and corresponding process IDs (PID). Crucial for discovering backdoor listeners.\n- `grep -i \"failed\" /var/log/auth.log`: Searches authentication logs for brute-force login attempts.\n- `tail -f /var/log/syslog`: Continuously streams real-time system events.\n- `journalctl -u ssh.service -n 50`: Displays the latest 50 systemd logs for the OpenSSH daemon.\n- `chmod 600 id_rsa` / `chmod 750 /var/www`: Hardens file permissions (Read=4, Write=2, Execute=1).\n- `chown root:root /etc/shadow`: Restricts ownership of sensitive password hash stores.\n- `iptables -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT`: Restricts SSH ingress to internal management subnets.\n\n---\n\n### 🎯 Real CompTIA Exam Scenario (CompTIA-SY0-701 Dumps):\n> **Question:** During an active incident response investigation, a security analyst suspects a Linux web server is communicating with an external Command & Control (C2) server. The analyst needs to determine which process ID (PID) is maintaining an active outbound connection to IP address 203.0.113.55. Which command should the analyst execute?\n> \n> - **A.** `traceroute 203.0.113.55`\n> - **B.** `ss -tunp | grep 203.0.113.55`\n> - **C.** `chmod 700 /var/log`\n> - **D.** `dig -x 203.0.113.55`\n> \n> **Correct Answer: B**  \n> **Official Explanation:** The `ss` (Socket Statistics) command with flags `-t` (TCP), `-u` (UDP), `-n` (numeric ports/IPs), and `-p` (show process and PID) displays all active network connections along with the responsible program and PID. Piping into `grep` filters specifically for the suspicious external IP.",
        "details_uz": "### 📘 Sybex 9-Nashr Darsligi: 10 & 11-Boblar - Xavfsizlik Operatsiyalari va CLI Asboblari\n**CompTIA Imtihon Maqsadi 4.1:** Kiberxavfsizlik tahlil vositalari va buyruqlarini amalda qo'llash.\n\nSOC tahlilchilari va insidentga javob beruvchilar (IR) serverlardagi hujumni to'xtatish, ochiq portlarni aniqlash va jurnallarni tahlil qilish uchun Linux buyruqlaridan foydalanadilar.\n\n#### Asosiy Xavfsizlik Buyruqlari:\n- `tcpdump -i eth0 -w capture.pcap`: Jonli tarmoq trafigini Wireshark o'qiy oladigan pcap faylga yozib oladi.\n- `ss -tulpn`: Barcha ochiq TCP/UDP portlarni va ularni ushlab turgan jarayon (PID) nomini ko'rsatadi. Xakerning backdoor eshigini topishda eng muhim buyruq.\n- `grep -i \"failed\" /var/log/auth.log`: Tizimga noqonuniy kirish (Brute-force) urinishlarini filtrlaydi.\n- `chmod 600 id_rsa`: SSH shaxsiy kalitini faqat egasi o'qiy oladigan qilib qulflaydi.\n- `iptables -A INPUT -p tcp --dport 22 -s 10.0.0.0/24 -j ACCEPT`: SSH ulanishini faqat ma'muriy tarmoq uchun ochadi.\n\n---\n\n### 🎯 Rasmiy CompTIA Imtihon Vaziyatli Savoli (Real Dumps):\n> **Savol:** Linux serveri tashqi Command & Control (C2) serveriga ma'lumot sizdirayotganlikda gumon qilinmoqda. Tahlilchi qaysi jarayon (PID) 203.0.113.55 manziliga chiqish aloqasini o'rnatganini aniqlashi kerak. Buning uchun qaysi buyruq eng mos keladi?\n> \n> - **A.** `traceroute 203.0.113.55`\n> - **B.** `ss -tunp | grep 203.0.113.55`\n> - **C.** `chmod 700 /var/log`\n> - **D.** `dig -x 203.0.113.55`\n> \n> **To'g'ri Javob: B**  \n> **Rasmiy Tahlil:** `ss -tunp` buyrug'i barcha faol ulanishlarni va ularga egalik qilayotgan dastur PID raqamini ko'rsatadi. `grep` orqali filtrlanganda aynan o'sha shubhali C2 IP ga ulangan jarayon darhol aniqlanadi.",
        "examTips_en": "Remember that `ss -tulpn` or `netstat -ano` displays listening ports and PID numbers. Use `grep` to filter authentication logs for brute force attacks.",
        "examTips_uz": "`ss -tulpn` buyrug'i port va PID raqamini ko'rsatadi. Brute-force urinishlarini aniqlashda `grep` eng ko'p qo'llaniladi.",
        "status": "not_started"
    },
    {
        "id": "lab-presec",
        "videoUrl": "https://www.youtube.com/watch?v=QXfaGOMT7MY",
        "videoTitle": "David Bombal: Free Wireshark and Ethical Hacking Course: Video #0",
        "videoChannel": "David Bombal",
        "title_en": "Interactive Packet Analysis & Wireshark Labs",
        "title_uz": "Interaktiv Paket Tahlili & Wireshark Laboratoriyasi",
        "swimlaneId": "know-how",
        "subcategoryId": "labs",
        "quarter": "q1",
        "domain_en": "Phase 0: Foundation",
        "domain_uz": "Faza 0: Asosiy Poydevor",
        "duration_en": "1 Week",
        "duration_uz": "1 Hafta",
        "colorTag": "#10b981",
        "hasSubLink": true,
        "dependencies": [
            "threat-actors"
        ],
        "summary_en": "Hands-on packet dissection: Wireshark display filters, detecting ARP poisoning, TCP flag anomalies, and unencrypted credentials.",
        "summary_uz": "Amaliy paket tahlili: Wireshark filtrlari, ARP soxtalashtirish, shubhali TCP bayroqlari va shifrlanmagan parollarni tutish.",
        "details_en": "### 📘 Sybex 9th Edition Reference: Chapter 11 - Packet Analysis & Protocol Sniffing\n**CompTIA Exam Objective 4.2:** Analyze potential indicators associated with network attacks.\n\nWireshark is the industry-standard protocol analyzer for packet-level deep inspection. CompTIA PBQs frequently present screenshot captures and ask you to identify the attack type.\n\n#### Key Wireshark Display Filters:\n- `http.request.method == \"POST\"`: Filters for HTTP form submissions, commonly revealing cleartext login parameters (`user=`, `password=`).\n- `tcp.flags.syn == 1 and tcp.flags.ack == 0`: Identifies initial connection requests (used in SYN scans and SYN flood detection).\n- `arp.duplicate-address-frame`: Flags ARP poisoning / Man-in-the-Middle (MITM) attacks where two MAC addresses claim the same IP.\n- `dns.flags.response == 1 and dns.time > 1`: Flags slow or poisoned DNS resolution responses.\n- `tcp.analysis.retransmission`: Detects network congestion, dropped packets, or potential port scanning activity.\n\n---\n\n### 🎯 Real CompTIA Exam Scenario (CompTIA-SY0-701 Dumps):\n> **Question:** A security administrator captures traffic during an internal network security review. The Wireshark packet capture displays the following consecutive entries:\n> `ARP Who has 192.168.1.1? Tell 192.168.1.50`\n> `ARP 192.168.1.1 is at 00:0c:29:11:22:33`\n> `ARP 192.168.1.1 is at aa:bb:cc:dd:ee:ff (gratuitous ARP)`\n> Shortly after, all workstation traffic to the default gateway is redirected to MAC `aa:bb:cc:dd:ee:ff`. Which attack has occurred, and how should it be mitigated on the switch?\n> \n> - **A.** DNS Amplification; enable DNSSEC.\n> - **B.** ARP Poisoning / Spoofing; enable Dynamic ARP Inspection (DAI) and DHCP Snooping.\n> - **C.** Evil Twin Attack; disable 2.4 GHz radio.\n> - **D.** Rogue DHCP; configure IP helper addresses.\n> \n> **Correct Answer: B**  \n> **Official Explanation:** Gratuitous ARP packets mapping the gateway's IP to an attacker's MAC address indicate an ARP Cache Poisoning (On-path / MITM) attack. The standard Layer 2 mitigation implemented on managed enterprise switches is Dynamic ARP Inspection (DAI) combined with DHCP Snooping.",
        "details_uz": "### 📘 Sybex 9-Nashr Darsligi: 11-Bob - Paket Tahlili va Protokol Sniffing\n**CompTIA Imtihon Maqsadi 4.2:** Tarmoq hujumlari bilan bog'liq xavfsizlik ko'rsatkichlarini Wireshark orqali aniqlash.\n\nWireshark — tarmoq paketlarini chuqur o'rganish uchun xalqaro standart dastur. CompTIA imtihonidagi PBQ (amaliy laboratoriya) savollarida pcap fayllar tahlili tez-tez uchraydi.\n\n#### Eng Muhim Wireshark Filtrlari:\n- `http.request.method == \"POST\"`: Foydalanuvchi saytga kiritgan login va parollarni ochiq matnda ko'rsatadi.\n- `tcp.flags.syn == 1 and tcp.flags.ack == 0`: Tarmoqdagi portlarni skanerlash (SYN scan) yoki SYN Flood hujumlarini tutadi.\n- `arp.duplicate-address-frame`: Bitta IP manzilga ikki xil MAC manzil da'vo qilayotgan ARP poisoning (MITM) hujumini fosh qiladi.\n- `dns.flags.response == 1`: DNS javoblarini ko'rib chiqish.\n\n---\n\n### 🎯 Rasmiy CompTIA Imtihon Vaziyatli Savoli (Real Dumps):\n> **Savol:** Tahlilchi Wireshark jurnallarida routerga tegishli 192.168.1.1 IP manzili boshqa bir noma'lum MAC manzilga bog'langanini va barcha ishchi kompyuterlar trafigi o'sha noma'lum qurilma orqali o'tayotganini ko'rdi. Ushbu hujum qanday nomlanadi va uni switchda qanday himoyalash kerak?\n> \n> - **A.** DNS Amplification; DNSSEC orqali.\n> - **B.** ARP Poisoning (Spoofing); Switchda Dynamic ARP Inspection (DAI) va DHCP Snooping yoqish orqali.\n> - **C.** Evil Twin Wi-Fi hujumi.\n> - **D.** Rogue DHCP server hujumi.\n> \n> **To'g'ri Javob: B**  \n> **Rasmiy Tahlil:** Ushbu hujum ARP Cache Poisoning (On-Path / MITM) hujumi hisoblanadi. Switch darajasida uni bartaraf qilish uchun DHCP Snooping bazasi asosida ishlaydigan DAI (Dynamic ARP Inspection) mexanizmi qo'llaniladi.",
        "examTips_en": "Look out for Gratuitous ARP packets in Wireshark logs—they are the primary indicator of ARP Poisoning. Solution is DAI (Dynamic ARP Inspection).",
        "examTips_uz": "Wiresharkda shubhali ARP paketlari — ARP Poisoning belgisidir. Himoyasi — switchda DAI (Dynamic ARP Inspection).",
        "status": "not_started"
    },
    {
        "id": "threat-actors",
        "videoUrl": "https://www.youtube.com/watch?v=6xUH0t6ugIM",
        "videoTitle": "Professor Messer: Threat Actors - CompTIA Security+ SY0-701 - 2.1",
        "videoChannel": "Professor Messer",
        "title_en": "Threat Actors, Motivations & Vectors",
        "title_uz": "Tahdid Soluvchilar, Motivlar & Hujum Vektorlari",
        "swimlaneId": "know-what",
        "subcategoryId": "dom2",
        "quarter": "q2",
        "domain_en": "Domain 2.0 (22%)",
        "domain_uz": "2.0 Domen (22%)",
        "duration_en": "1 Week",
        "duration_uz": "1 Hafta",
        "colorTag": "#8b5cf6",
        "hasSubLink": true,
        "dependencies": [
            "social-eng"
        ],
        "summary_en": "Nation-states (APTs), organized crime, hacktivists, insider threats, and supply chain attack vectors.",
        "summary_uz": "Hukumat guruhlari (APT), uyushgan jinoyatchilik, xaktivistlar, ichki xodimlar va ta'minot zanjiri vektorlari.",
        "details_en": "### 📘 Sybex 9th Edition Reference: Chapter 1 - Security Fundamentals & Threat Actors\n**CompTIA Exam Objective 2.1:** Compare and contrast common threat actors, motivations, and attack vectors.\n\nUnderstanding the classification, funding levels, and operational sophistication of attackers allows organizations to tailor their threat modeling.\n\n#### Threat Actor Classifications:\n1. **Advanced Persistent Threats (APTs) / Nation-States:**\n   - *Characteristics:* Backed by foreign governments, unlimited funding, zero-day exploits, patient long-term espionage campaigns.\n   - *Motivations:* Geopolitical advantage, national security, intellectual property theft, critical infrastructure sabotage.\n2. **Organized Cybercrime Syndicates:**\n   - *Characteristics:* Highly coordinated, profit-driven, utilize Ransomware-as-a-Service (RaaS) models, initial access brokers.\n   - *Motivations:* Financial extortion, banking fraud, data theft.\n3. **Insider Threats:**\n   - *Characteristics:* Legitimate access, knowledge of internal security architecture, highly dangerous due to bypassed perimeter firewalls.\n   - *Mitigations:* Principle of Least Privilege, Mandatory Access Control, Behavioral Analytics (UEBA), separation of duties.\n4. **Hacktivists:** Motivated by philosophical, environmental, or political agendas. Commonly utilize website defacements and volumetric DDoS.\n5. **Script Kiddies:** Low sophistication, rely on public automated tools without understanding underlying mechanics.\n\n---\n\n### 🎯 Real CompTIA Exam Scenario (CompTIA-SY0-701 Dumps):\n> **Question:** A defense contractor discovers that an adversary has maintained stealthy, persistent access inside their weapon-system blueprints repository for over 14 months without encrypting files or demanding ransom. The adversary utilized customized living-off-the-land techniques and previously undiscovered zero-day kernel exploits. Which threat actor type is most likely responsible?\n> \n> - **A.** Script Kiddie\n> - **B.** Advanced Persistent Threat (APT) / Nation-State\n> - **C.** Disgruntled Insider\n> - **D.** Hacktivist group\n> \n> **Correct Answer: B**  \n> **Official Explanation:** The hallmarks of long dwell time (14 months), deep persistence, targeting of defense intellectual property, living-off-the-land stealth, and zero-day usage are definitive indicators of an APT (Nation-State threat actor).",
        "details_uz": "### 📘 Sybex 9-Nashr Darsligi: 1-Bob - Xavfsizlik Asoslari va Tahdid Soluvchilar\n**CompTIA Imtihon Maqsadi 2.1:** Tahdid guruhlari, ularning motivlari va hujum yo'llarini tahlil qilish.\n\nKiberxavfsizlikda dushmanning kimligini va uning nima maqsadda hujum qilayotganini tushunish himoya strategiyasini to'g'ri qurish imkonini beradi.\n\n#### Tahdid Soluvchilar Toifalari:\n1. **APT (Advanced Persistent Threats) / Davlat guruhlari:**\n   - *Xususiyatlari:* Cheksiz moliyaviy resurslar, zero-day (0-kunlik) zaifliklar, yillab sezilmasdan tizimda yashirinish qobiliyati.\n   - *Motiv:* Geosiyosiy ayg'oqchilik, harbiy sirlar va kritik infratuzilmalarga zarba berish.\n2. **Uyushgan Kiberjinoyatchilar:**\n   - *Xususiyatlari:* Professional darajada boshqariladigan guruhlar. Ransomware-as-a-Service (RaaS) modeli orqali ishlaydi.\n   - *Motiv:* Moliyaviy daromad va tovlamachilik.\n3. **Ichki Xodimlar (Insider Threats):**\n   - *Xususiyatlari:* Tizimga rasmiy huquqqa ega bo'lgan xodimlar. Tashqi devorlar ularni to'xtata olmaydi.\n   - *Himoya:* Minimal imtiyoz tamoyili (Least Privilege), UEBA tahlili, 2 kishilik nazorat.\n4. **Xaktivistlar (Hacktivists):** Siyosiy yoki ijtimoiy qarashlarini ifodalash uchun saytlarni buzadigan yoki DDoS qiladigan guruhlar.\n\n---\n\n### 🎯 Rasmiy CompTIA Imtihon Vaziyatli Savoli (Real Dumps):\n> **Savol:** Harbiy pudratchi kompaniya o'z serverlarida noma'lum guruh 14 oydan beri yashirinib kelayotganini, hech qanday faylni shifrlab pul talab qilmaganini, faqat maxfiy chizmalarni o'g'irlayotganini va yangi 0-day zaifliklardan foydalanganini aniqladi. Bu qanday toifadagi hujumchi?\n> \n> - **A.** Script Kiddie\n> - **B.** APT (Advanced Persistent Threat) / Davlat guruhi\n> - **C.** Norozi ichki xodim\n> - **D.** Xaktivist\n> \n> **To'g'ri Javob: B**  \n> **Rasmiy Tahlil:** Uzoq vaqt (14 oy) sezilmasdan yurish, yuqori darajadagi 0-day zaifliklarni qo'llash va harbiy ma'lumotlarni o'g'irlash faqat davlat tomonidan moliyalashtiriladigan APT guruhlariga xosdir.",
        "examTips_en": "APTs are characterized by sophisticated zero-days, massive funding, and long-term stealthy intelligence gathering.",
        "examTips_uz": "APT guruhlari: 0-day zaifliklar, davlat darajasidagi moliyalashtirish va uzoq muddatli josuslik bilan ajralib turadi.",
        "status": "not_started"
    },
    {
        "id": "social-eng",
        "videoUrl": "https://www.youtube.com/watch?v=u6QLuJy1FHw",
        "videoTitle": "John Hammond: Cybersecurity Awareness for Hackers! with Huntress and Just Hacking Training",
        "videoChannel": "John Hammond",
        "title_en": "Social Engineering & Phishing Attacks",
        "title_uz": "Ijtimoiy Muhandislik & Fishing Hujumlari",
        "swimlaneId": "know-what",
        "subcategoryId": "dom2",
        "quarter": "q2",
        "domain_en": "Domain 2.0 (22%)",
        "domain_uz": "2.0 Domen (22%)",
        "duration_en": "1 Week",
        "duration_uz": "1 Hafta",
        "colorTag": "#8b5cf6",
        "hasSubLink": true,
        "dependencies": [
            "malware-types"
        ],
        "summary_en": "Phishing, spear phishing, whaling, vishing, smishing, business email compromise (BEC), and pretexting principles.",
        "summary_uz": "Fishing, nayzali fishing, kashalot ovi (whaling), vishing, smishing, biznes pochta buzilishi (BEC) va aldov psixologiyasi.",
        "details_en": "### 📘 Sybex 9th Edition Reference: Chapter 2 - Social Engineering & Human Vulnerabilities\n**CompTIA Exam Objective 2.2:** Given a scenario, analyze social engineering techniques.\n\nSocial engineering exploits human cognitive psychology (Urgency, Authority, Scarcity, Consensus, Familiarity) rather than technical software flaws.\n\n#### Core Attack Methodologies:\n- **Phishing:** Mass, untargeted fraudulent emails designed to harvest credentials or deliver payloads.\n- **Spear Phishing:** Customized attack targeting a specific individual, department, or company using researched personal details.\n- **Whaling:** Highly tailored spear phishing explicitly targeting high-profile executive leadership (C-suite, CEO, CFO).\n- **Vishing & Smishing:** Voice phishing over phone calls (often utilizing AI voice cloning) and SMS text message phishing.\n- **Business Email Compromise (BEC):** Impersonating executive authority or trusted external suppliers to divert wire transfers.\n- **Watering Hole Attack:** Compromising a third-party website frequently visited by target employees to distribute malware.\n- **Typosquatting / URL Hijacking:** Registering domains with common misspellings (e.g., `g00gle.com` or `paypa1.com`).\n\n---\n\n### 🎯 Real CompTIA Exam Scenario (CompTIA-SY0-701 Dumps):\n> **Question:** A chief financial officer (CFO) receives an email marked 'URGENT & CONFIDENTIAL' apparently sent from the company CEO, who is currently traveling abroad. The email requests an immediate emergency wire transfer of $85,000 to a partner vendor bank account. The sender address is registered on domain `company-corporate.co` instead of `company.com`. Which social engineering technique was utilized?\n> \n> - **A.** Smishing & Shoulder Surfing\n> - **B.** Whaling & Business Email Compromise (BEC) with Typosquatting\n> - **C.** Evil Twin Attack\n> - **D.** Watering Hole Attack\n> \n> **Correct Answer: B**  \n> **Official Explanation:** Whaling specifically targets C-suite executives (the CFO). Pairing this with CEO impersonation for wire diversion constitutes Business Email Compromise (BEC), and using a lookalike domain (`company-corporate.co`) is typosquatting.",
        "details_uz": "### 📘 Sybex 9-Nashr Darsligi: 2-Bob - Ijtimoiy Muhandislik va Inson Omili\n**CompTIA Imtihon Maqsadi 2.2:** Ijtimoiy muhandislik usullari va psixologik tuzoqlarni tahlil qilish.\n\nIjtimoiy muhandislik dasturiy xatolarga emas, inson psixologiyasiga (Shoshilinchlik, Mansabdor shaxs obro'si, Qo'rquv, Qiziqish) asoslanadi.\n\n#### Asosiy Hujum Turlari:\n- **Phishing (Fishing):** Barcha xodimlarga yo'naltirilgan ommaviy soxta xatlar.\n- **Spear Phishing:** Aniq bir xodim yoki bo'limga ataylab o'rganib chiqib yuborilgan shaxsiy xat.\n- **Whaling (Kashalot ovi):** Faqat kompaniya rahbarlari (CEO, CFO, Prezident) ga qarshi qaratilgan nishonli fishing.\n- **BEC (Business Email Compromise):** Rahbariyat nomidan buxgalteriyaga pul o'tkazishni buyurish.\n- **Vishing & Smishing:** Telefon qo'ng'irog'i (ovoz klonlash) va SMS orqali aldash.\n- **Watering Hole:** Kompaniya xodimlari ko'p kiradigan nufuzli saytni buzib, o'sha orqali zararlash.\n- **Typosquatting:** Mashhur domenlarning xato yozilishiga o'xshash soxta saytlar ochish.\n\n---\n\n### 🎯 Rasmiy CompTIA Imtihon Vaziyatli Savoli (Real Dumps):\n> **Savol:** Kompaniya moliya direktoriga (CFO) sayohatda yurgan Bosh direktor (CEO) nomidan 'Shoshilinch' yozuvi bilan xat keldi. Unda hamkor shirkat hisobiga zudlik bilan $85,000 pul o'tkazish so'ralgan. Yuboruvchi pochta manzili esa asl `kompaniya.uz` o'rniga `kompaniya-holding.uz` qilib ochilgan. Bu qanday hujum?\n> \n> - **A.** Smishing\n> - **B.** Whaling va Business Email Compromise (BEC)\n> - **C.** Evil Twin\n> - **D.** Watering Hole\n> \n> **To'g'ri Javob: B**  \n> **Rasmiy Tahlil:** Yuqori martabali rahbarlarga qaratilgan fishing — Whaling deyiladi. Rahbariyat nomidan pul o'g'irlash esa BEC (Business Email Compromise) hisoblanadi.",
        "examTips_en": "Whaling targets executives. BEC diverts wire transfers. Typosquatting relies on domain spelling mistakes.",
        "examTips_uz": "Whaling - rahbarlarga qaratilgan fishing. BEC - buxgalteriyadan pul o'g'irlash. Typosquatting - harflari xato domen.",
        "status": "not_started"
    },
    {
        "id": "malware-types",
        "videoUrl": "https://www.youtube.com/watch?v=bZ7PAzrWyvc",
        "videoTitle": "NetworkChuck: Kids vs. MALWARE!!",
        "videoChannel": "NetworkChuck",
        "title_en": "Malware Analysis & Indicators of Compromise",
        "title_uz": "Zararli Dasturlar Tahlili & Buzilish Ko'rsatkichlari (IoC)",
        "swimlaneId": "know-what",
        "subcategoryId": "dom2",
        "quarter": "q2",
        "domain_en": "Domain 2.0 (22%)",
        "domain_uz": "2.0 Domen (22%)",
        "duration_en": "1 Week",
        "duration_uz": "1 Hafta",
        "colorTag": "#8b5cf6",
        "hasSubLink": true,
        "dependencies": [
            "crypto-found"
        ],
        "summary_en": "Ransomware, fileless malware, rootkits, spyware, trojans, logic bombs, and keyloggers.",
        "summary_uz": "Ransomware, faylsiz zararli dasturlar, rootkitlar, josus dasturlar, troyanlar va klaviatura josuslari.",
        "details_en": "### 📘 Sybex 9th Edition Reference: Chapter 2 - Malware & Malicious Code\n**CompTIA Exam Objective 2.3:** Analyze potential indicators of malicious activity related to malware.\n\nModern threats have evolved from basic executable viruses to fileless memory-resident scripts and double-extortion ransomware operations.\n\n#### Malware Typology:\n- **Ransomware:** Encrypts user files using strong symmetric ciphers (AES-256) and demands cryptocurrency ransom. **Double Extortion:** Attackers exfiltrate sensitive data before encrypting, threatening public leaks if the ransom is unpaid.\n- **Fileless Malware (Living off the Land):** Operates entirely in RAM without writing binaries to disk. Leverages legitimate administrative tools like PowerShell, WMI, or `rundll32.exe` to bypass traditional signature-based antivirus.\n- **Rootkits:** Infiltrates ring 0 (kernel space) or firmware (UEFI). Modifies OS system calls to conceal running processes, network connections, and files. Mitigation: UEFI Secure Boot.\n- **Trojans & Remote Access Trojans (RAT):** Disguises malicious functionality inside benign-looking software. RATs grant attackers full interactive remote GUI/shell control.\n- **Spyware & Keyloggers:** Monitors keystrokes, webcam, clipboard contents, and browser sessions.\n- **Logic Bombs:** Dormant code that triggers destructive actions upon specific conditions (e.g., date, termination of an employee).\n\n---\n\n### 🎯 Real CompTIA Exam Scenario (CompTIA-SY0-701 Dumps):\n> **Question:** A threat hunter observes strange network activity on a domain controller. Traditional antivirus scans report clean files, but endpoint logs reveal PowerShell executing Base64-encoded scripts directly in system RAM, modifying registry run keys without dropping any `.exe` files onto the hard drive. What type of malware is this?\n> \n> - **A.** Boot sector virus\n> - **B.** Fileless Malware utilizing Living-off-the-Land (LotL)\n> - **C.** Macro virus\n> - **D.** Logic bomb\n> \n> **Correct Answer: B**  \n> **Official Explanation:** Fileless malware executes in volatile memory (RAM) and uses built-in administrative binaries (PowerShell) to evade file-system signature scanning. This is known as Living off the Land.",
        "details_uz": "### 📘 Sybex 9-Nashr Darsligi: 2-Bob - Zararli Dasturlar va Kodlar\n**CompTIA Imtihon Maqsadi 2.3:** Zararli dasturlarning faoliyat ko'rsatkichlarini tahlil qilish.\n\nHozirgi viruslar oddiy fayl ko'rinishida emas, diskka yozilmasdan operativ xotirada (RAM) ishlaydigan va tizimning o'z asboblaridan foydalanadigan murakkab ko'rinishga ega.\n\n#### Zararli Dastur Turlari:\n- **Ransomware (Tovlamachi virus):** Ma'lumotlarni kuchli shifr bilan qulflaydi. **Double Extortion:** Shifrlashdan oldin ma'lumotlarni o'g'irlab, to'lanmasa ommaga tarqatish bilan tahdid qiladi.\n- **Faylsiz Zararli Dasturlar (Fileless / Living off the Land):** Qattiq diskka hech qanday `.exe` fayl yozmaydi. Faqat RAM ichida PowerShell yoki WMI orqali ishlaydi. Oddiy antiviruslar ularni ko'ra olmaydi.\n- **Rootkit:** Operatsion tizim yadrosiga (Kernel - Ring 0) yoki UEFI mikrodasturiga o'rnashadi. O'zini antiviruslardan to'liq yashiradi. Himoya: UEFI Secure Boot.\n- **RAT (Remote Access Trojan):** Foydalanuvchiga foydali dastur bo'lib ko'rinadi, lekin xakerga kompyuterni to'liq boshqarish imkonini beradi.\n- **Logic Bomb (Mantiqiy bomba):** Muayyan vaqt kelganda yoki hodisa sodir bo'lganda (masalan, dasturchi ishdan bo'shatilganda) portlaydigan kod.\n\n---\n\n### 🎯 Rasmiy CompTIA Imtihon Vaziyatli Savoli (Real Dumps):\n> **Savol:** Tizim tahlilchisi serverda shubhali buyruqlar bajarilayotganini ko'rdi. Antivirus tekshiruvi fayllarda hech qanday virus topmadi, ammo RAM xotirasida PowerShell orqali shifrlangan Base64 skriptlar ishlayotgani fosh bo'ldi. Bu qanday zararli dastur?\n> \n> - **A.** Boot sektor virusi\n> - **B.** Faylsiz (Fileless) zararli dastur\n> - **C.** Makrovirus\n> - **D.** Mantiqiy bomba\n> \n> **To'g'ri Javob: B**  \n> **Rasmiy Tahlil:** Faylsiz zararli dasturlar diskka fayl yozmasdan to'g'ridan-to'g'ri operativ xotirada (RAM) PowerShell orqali ishlaydi va an'anaviy fayl antiviruslarini chetlab o'tadi.",
        "examTips_en": "Fileless malware resides in RAM and leverages PowerShell or WMI (Living off the Land). Rootkits operate at the kernel level (mitigated by Secure Boot).",
        "examTips_uz": "Faylsiz viruslar faqat RAMda ishlaydi (PowerShell orqali). Rootkitlar esa yadro (kernel) darajasida yashirinadi (Secure Boot bilan himoyalanadi).",
        "status": "not_started"
    },
    {
        "id": "crypto-found",
        "videoUrl": "https://www.youtube.com/watch?v=GSIDS_lvRv4",
        "videoTitle": "Computerphile: Public Key Cryptography - Computerphile",
        "videoChannel": "Computerphile",
        "title_en": "Cryptography, Ciphers & PKI Fundamentals",
        "title_uz": "Kriptografiya, Shifrlar & PKI Asoslari",
        "swimlaneId": "know-what",
        "subcategoryId": "dom1",
        "quarter": "q2",
        "domain_en": "Domain 1.0 (12%)",
        "domain_uz": "1.0 Domen (12%)",
        "duration_en": "1 Week",
        "duration_uz": "1 Hafta",
        "colorTag": "#2563eb",
        "hasSubLink": true,
        "dependencies": [
            "iam-aaa"
        ],
        "summary_en": "Symmetric vs asymmetric ciphers (AES vs RSA/ECC), cryptographic hashing (SHA-256), digital signatures, and Public Key Infrastructure.",
        "summary_uz": "Simmetrik va asimmetrik shifrlash (AES va RSA/ECC), xeshlash (SHA-256), raqamli imzo va Ochiq Kalitlar Infratuzilmasi (PKI).",
        "details_en": "### 📘 Sybex 9th Edition Reference: Chapter 5 & 6 - Cryptography & Public Key Infrastructure\n**CompTIA Exam Objective 1.4:** Explain the key concepts of cryptography and PKI.\n\nCryptography ensures Confidentiality (Encryption), Integrity (Hashing), Authentication, and Non-repudiation (Digital Signatures).\n\n#### Symmetric vs Asymmetric Cryptography:\n- **Symmetric Encryption (One Shared Key):**\n  - Extremely fast, ideal for bulk data at rest and session transport.\n  - Algorithms: **AES (Advanced Encryption Standard - 128/256 bit)**, ChaCha20, 3DES (deprecated).\n- **Asymmetric Encryption (Public / Private Key Pair):**\n  - Slower, solves key distribution. Public key encrypts, private key decrypts.\n  - Algorithms: **RSA (2048+ bit)**, **ECC (Elliptic Curve Cryptography)**. ECC provides equivalent cryptographic strength to RSA with significantly smaller key sizes (256-bit ECC ≈ 3072-bit RSA), making it ideal for mobile/IoT devices.\n  - **Diffie-Hellman (DH / ECDH):** Key exchange protocol enabling two parties to establish a shared secret over an insecure channel. **PFS (Perfect Forward Secrecy)** ensures compromise of long-term keys does not compromise past session keys.\n- **Hashing (One-Way Mathematical Function):**\n  - Guarantees data integrity. Algorithms: **SHA-256**, SHA-3, MD5 (broken/collisions).\n- **Digital Signatures:** Sender encrypts hash with their **Private Key**. Recipient decrypts with sender's **Public Key**. Provides Integrity, Authentication, and Non-repudiation.\n- **Hardware Security:** TPM (Trusted Platform Module - motherboard chip for BitLocker) vs HSM (Hardware Security Module - PCI/network appliance for enterprise CA key protection).\n\n---\n\n### 🎯 Real CompTIA Exam Scenario (CompTIA-SY0-701 Dumps):\n> **Question:** A software developer is designing an authentication mobile app for battery-powered IoT devices. The devices require public-key cryptographic operations for mutual authentication, but possess very limited memory and processing power. Which cryptographic algorithm should the developer select?\n> \n> - **A.** RSA with 4096-bit key\n> - **B.** Elliptic Curve Cryptography (ECC)\n> - **C.** AES-GCM 256-bit\n> - **D.** MD5\n> \n> **Correct Answer: B**  \n> **Official Explanation:** ECC (Elliptic Curve Cryptography) delivers the same cryptographic security as RSA with substantially smaller key sizes and lower computational overhead, making it ideal for resource-constrained IoT and mobile platforms.",
        "details_uz": "### 📘 Sybex 9-Nashr Darsligi: 5 & 6-Boblar - Kriptografiya va PKI\n**CompTIA Imtihon Maqsadi 1.4:** Kriptografik algoritmlar va sertifikatlar tizimini tushunish.\n\nKriptografiya 4 ta asosiy vazifani bajaradi: Maxfiylik (Shifrlash), Butunlik (Xeshlash), Autentifikatsiya va Rad eta olmaslik (Raqamli imzo).\n\n#### Asosiy Algoritmlar:\n- **Simmetrik Shifrlash (Yagona bitta kalit):**\n  - Juda tezkor, katta hajmdagi ma'lumotlarni shifrlash uchun ishlatiladi.\n  - Algoritmlar: **AES-128 / AES-256**, ChaCha20.\n- **Asimmetrik Shifrlash (Ochiq va Maxfiy kalit juftligi):**\n  - Ochiq kalit (Public) shifrlaydi, Maxfiy kalit (Private) esa ochadi.\n  - **RSA (2048+ bit):** Katta hisoblash quvvati talab qiladi.\n  - **ECC (Elliptic Curve Cryptography):** RSA ga teng kuchli himoyani ancha kichik kalit o'lchami bilan beradi (masalan, 256-bit ECC ≈ 3072-bit RSA ga teng). Mobil va IoT qurilmalar uchun eng ma'qul tanlov.\n- **Xeshlash (Bir tomonlama funksiya):**\n  - Ma'lumot o'zgarmaganligini (butunligini) tekshiradi. Algoritm: **SHA-256**.\n- **Raqamli Imzo:** Yuboruvchi ma'lumot xeshini o'zining **Maxfiy kaliti (Private key)** bilan imzolaydi. Qabul qiluvchi uning **Ochiq kaliti (Public key)** bilan tekshiradi.\n\n---\n\n### 🎯 Rasmiy CompTIA Imtihon Vaziyatli Savoli (Real Dumps):\n> **Savol:** Dasturchi quvvati va xotirasi cheklangan IoT (aqlli qurilmalar) uchun asimmetrik ochiq kalitli autentifikatsiya tizimini tanlamoqda. Qurilma protsessori va batareyasini ortiqcha yuklamasdan kuchli xavfsizlikni ta'minlaydigan eng to'g'ri algoritm qaysi?\n> \n> - **A.** RSA 4096-bit\n> - **B.** ECC (Elliptic Curve Cryptography)\n> - **C.** AES-256\n> - **D.** MD5\n> \n> **To'g'ri Javob: B**  \n> **Rasmiy Tahlil:** ECC (Elliptik egri chiziqlar kriptografiyasi) RSA ga qaraganda ancha qisqa kalitlar bilan bir xil darajadagi kuchli himoyani ta'minlaydi va kam quvvat talab qiluvchi IoT / mobil qurilmalar uchun rasmiy CompTIA standartidir.",
        "examTips_en": "ECC provides high security with smaller key sizes—always select ECC for mobile/IoT devices. Digital signatures are created using the sender's PRIVATE key.",
        "examTips_uz": "Mobil/IoT qurilmalar uchun har doim ECC tanlanadi (kam resurs). Raqamli imzo yuboruvchining MAXFIY (Private) kaliti bilan qo'yiladi.",
        "status": "not_started"
    },
    {
        "id": "iam-aaa",
        "videoUrl": "https://www.youtube.com/watch?v=MpIzA4fNWew",
        "videoTitle": "Professor Messer: Multifactor Authentication - CompTIA Security+ SY0-701 - 4.6",
        "videoChannel": "Professor Messer",
        "title_en": "Identity & Access Management (AAA, MFA, Federation)",
        "title_uz": "Shaxsni Boshqarish & Kirish Nazorati (AAA, MFA, Federatsiya)",
        "swimlaneId": "know-what",
        "subcategoryId": "dom1",
        "quarter": "q2",
        "domain_en": "Domain 1.0 (12%)",
        "domain_uz": "1.0 Domen (12%)",
        "duration_en": "1 Week",
        "duration_uz": "1 Hafta",
        "colorTag": "#2563eb",
        "hasSubLink": true,
        "dependencies": [
            "net-sec-arch"
        ],
        "summary_en": "AAA framework (RADIUS/TACACS+), MFA factors, SSO federation (SAML, OAuth 2.0, OIDC), and access control models (RBAC, ABAC).",
        "summary_uz": "AAA tizimi (RADIUS/TACACS+), MFA omillari, SSO federatsiyasi (SAML, OAuth 2.0) va kirish modellari (RBAC, ABAC).",
        "details_en": "### 📘 Sybex 9th Edition Reference: Chapter 7 - Identity & Access Management\n**CompTIA Exam Objective 1.3:** Explain the fundamental concepts of identity and access management.\n\nIdentity is the new security perimeter. Access control relies on the AAA Framework: Authentication, Authorization, and Accounting.\n\n#### The 5 Authentication Factors for MFA:\nMulti-Factor Authentication (MFA) requires two or more **distinct categories**:\n1. **Something You Know:** Password, PIN, passphrase.\n2. **Something You Have:** Hardware token (YubiKey), Smart Card (CAC/PIV), Authenticator TOTP app, SMS code.\n3. **Something You Are (Biometrics):** Fingerprint, facial recognition, retina/iris scan.\n4. **Somewhere You Are (Location):** Geolocation, GPS coordinates, internal corporate IP range.\n5. **Something You Do (Behavioral):** Keystroke dynamics, mouse movement cadence, signature pressure.\n*Note: Entering two passwords or a password + PIN is NOT MFA (both belong to 'Something You Know').*\n\n#### Federation & Access Control Models:\n- **SAML 2.0:** XML-based protocol providing web browser Single Sign-On (SSO) between an Identity Provider (IdP) and Service Provider (SP).\n- **OAuth 2.0 & OIDC:** OAuth handles token-based **Authorization**; OpenID Connect (OIDC) adds JSON Web Token (JWT) **Authentication** on top of OAuth.\n- **RADIUS vs TACACS+:** RADIUS combines authentication and authorization (UDP 1812/1813, encrypts only passwords). **TACACS+** (Cisco, TCP port 49) separates Authentication, Authorization, and Accounting, and encrypts the entire payload.\n- **RBAC (Role-Based):** Permissions assigned based on job title/role.\n- **ABAC (Attribute-Based):** Dynamic policies evaluated based on user, resource, environment, and context attributes (e.g., 'Allow access if employee role=Engineer AND time=09:00-17:00 AND location=USA').\n\n---\n\n### 🎯 Real CompTIA Exam Scenario (CompTIA-SY0-701 Dumps):\n> **Question:** An organization is migrating legacy web applications to cloud services. They require a centralized federated Single Sign-On (SSO) mechanism that allows internal employees to access external SaaS portals using their enterprise Active Directory credentials without sharing passwords with the SaaS providers. Which protocol should the organization implement?\n> \n> - **A.** TACACS+\n> - **B.** SAML 2.0\n> - **C.** RADIUS\n> - **D.** Kerberos v5\n> \n> **Correct Answer: B**  \n> **Official Explanation:** SAML (Security Assertion Markup Language) is the industry standard for cross-domain federated identity and Web Single Sign-On (SSO). It passes cryptographically signed XML assertions between the enterprise IdP and external SaaS Service Providers.",
        "details_uz": "### 📘 Sybex 9-Nashr Darsligi: 7-Bob - Shaxsni Boshqarish va Kirish Nazorati\n**CompTIA Imtihon Maqsadi 1.3:** Autentifikatsiya, ruxsatlar va federatsiya tizimlarini tushunish.\n\nKiberxavfsizlikda kirish huquqi AAA (Authentication, Authorization, Accounting) tamoyiliga tayanadi.\n\n#### MFA (Ko'p omilli autentifikatsiya) ning 5 ta toifasi:\nHaqiqiy MFA bo'lishi uchun quyidagi turli toifalardan kamida 2 tasi bo'lishi shart:\n1. **Siz biladigan narsa (Something You Know):** Parol, PIN-kod.\n2. **Sizda bor narsa (Something You Have):** Smart-karta, YubiKey token, telefondagi Google Authenticator ilovasi.\n3. **Sizning o'zingiz (Something You Are):** Barmoq izi, yuz qiyofasi (Face ID).\n4. **Siz turgan joy (Somewhere You Are):** GPS geolokatsiya, kompaniya ichki IP tarmog'i.\n5. **Sizning harakatingiz (Something You Do):** Klaviatura bosish ritmi, imzo.\n*Eslatma: Parol va PIN kiritish MFA emas (chunki ikkalasi ham \"Siz biladigan narsa\" toifasiga kiradi).*\n\n#### Federatsiya va Ruxsat Modellari:\n- **SAML 2.0:** Turli bulutli saytlarga bitta asosiy hisob orqali kirish (SSO) protokoli.\n- **OAuth 2.0 & OIDC:** OAuth - ruxsat berish (avtorizatsiya), OpenID Connect esa autentifikatsiya uchun ishlatiladi.\n- **RADIUS va TACACS+:** Tarmoq uskunalariga markazlashgan kirish. TACACS+ (TCP 49) butun ma'lumotni shifrlaydi.\n- **RBAC:** Xodimning lavozimi (roli) ga qarab ruxsat berish.\n- **ABAC:** Ko'p parametrli (vaqt, joy, fayl maxfiyligi) ruxsat berish.\n\n---\n\n### 🎯 Rasmiy CompTIA Imtihon Vaziyatli Savoli (Real Dumps):\n> **Savol:** Kompaniya xodimlari bitta korporativ login orqali barcha tashqi bulutli servislar (SaaS) ga qayta-qayta parol kiritmasdan xavfsiz kirishi (SSO) kerak. Bunda tashqi servislar xodimlarning parollarini ko'rmasligi shart. Qaysi federatsiya protokolidan foydalanish zarur?\n> \n> - **A.** TACACS+\n> - **B.** SAML 2.0\n> - **C.** RADIUS\n> - **D.** Kerberos\n> \n> **To'g'ri Javob: B**  \n> **Rasmiy Tahlil:** SAML 2.0 veb-brauzerlar orqali turli tashkilotlar va bulutli xizmatlar o'rtasida xavfsiz SSO (Single Sign-On) federatsiyasini tashkil qilish uchun rasmiy standartdir.",
        "examTips_en": "MFA requires factors from DIFFERENT categories (e.g. Password + Token). Two passwords or Password + PIN is NOT multi-factor.",
        "examTips_uz": "MFA bo'lishi uchun omillar turlicha bo'lishi shart (Parol + Token). Parol va PIN bir xil toifa bo'lgani uchun MFA hisoblanmaydi.",
        "status": "not_started"
    },
    {
        "id": "net-sec-arch",
        "videoUrl": "https://www.youtube.com/watch?v=9okx4cA-wEE",
        "videoTitle": "NetworkChuck: What Is Zero Trust? (And Why Hackers Hate It)",
        "videoChannel": "NetworkChuck",
        "title_en": "Network Security Architecture & Perimeter Defense",
        "title_uz": "Tarmoq Xavfsizligi Arxitekturasi & Perimetr Himoyasi",
        "swimlaneId": "know-what",
        "subcategoryId": "dom3",
        "quarter": "q3",
        "domain_en": "Domain 3.0 (18%)",
        "domain_uz": "3.0 Domen (18%)",
        "duration_en": "1 Week",
        "duration_uz": "1 Hafta",
        "colorTag": "#10b981",
        "hasSubLink": true,
        "dependencies": [
            "cloud-sec"
        ],
        "summary_en": "Zero Trust architecture, network segmentation, DMZ, Next-Gen Firewalls (NGFW), WAF, VPN, SASE, and secure jump boxes.",
        "summary_uz": "Zero Trust (Nol ishonch) arxitekturasi, tarmoq segmentatsiyasi, DMZ, Next-Gen Firewall, WAF, VPN va SASE.",
        "details_en": "### 📘 Sybex 9th Edition Reference: Chapter 8 - Security Architecture & Infrastructure Design\n**CompTIA Exam Objective 3.1 & 3.2:** Explain security architecture models and network infrastructure controls.\n\nPerimeter security has shifted from the traditional 'Castle-and-Moat' paradigm to the **Zero Trust Architecture (ZTA)** model: *'Never Trust, Always Verify'*.\n\n#### Key Architectural Components:\n- **Zero Trust Architecture (NIST SP 800-207):** Assumes breaches are already present inside the network. Access is continuously verified dynamically using context (user identity, device posture, location, time) with microsegmentation.\n- **DMZ (Demilitarized Zone / Screened Subnet):** Subnet situated between the public internet and private internal network hosting public-facing services (Web, Mail, DNS). Internal database servers are NEVER placed in the DMZ.\n- **Firewall Evolutions:**\n  - *Packet Filtering (Layer 3/4):* Inspects source/destination IP and port.\n  - *Stateful Inspection:* Tracks TCP connection states (SYN, ESTABLISHED).\n  - *NGFW (Next-Gen Firewall - Layer 7):* Deep packet inspection, application-level filtering, integrated IPS, and SSL/TLS decryption.\n  - *WAF (Web Application Firewall):* Protects web servers specifically against OWASP Top 10 exploits (SQLi, XSS).\n- **SASE (Secure Access Service Edge):** Converges SD-WAN network capabilities with cloud-delivered security services (CASB, FWaaS, ZTNA) at the service edge.\n- **Jump Boxes (Bastion Hosts):** Hardened server utilized by administrators as a single monitored gateway into secure enclaves.\n\n---\n\n### 🎯 Real CompTIA Exam Scenario (CompTIA-SY0-701 Dumps):\n> **Question:** An organization operates an e-commerce website. A recent external penetration test demonstrated that if an attacker compromises the public web server, they can pivot directly to the internal database server storing customer credit card records. Which architectural change must be implemented to prevent this lateral movement?\n> \n> - **A.** Place both web and database servers in a flat public subnet.\n> - **B.** Relocate the web server to a screened subnet (DMZ) and enforce a firewall ACL allowing only database port 3306 from the DMZ to the private database subnet.\n> - **C.** Replace the perimeter router with an unmanaged switch.\n> - **D.** Disable TLS on the web server.\n> \n> **Correct Answer: B**  \n> **Official Explanation:** Public-facing servers should reside in a Screened Subnet (DMZ). The internal database must remain in an isolated private subnet, with firewall rules permitting strictly necessary database traffic (e.g., MySQL 3306) originating solely from the web server IP.",
        "details_uz": "### 📘 Sybex 9-Nashr Darsligi: 8-Bob - Xavfsizlik Arxitekturasi va Infratuzilma\n**CompTIA Imtihon Maqsadi 3.1 & 3.2:** Xavfsizlik arxitekturasi va perimetr himoyasi vositalarini loyihalash.\n\nEski \"tashqi devor\" xavfsizligi o'rniga zamonaviy **Zero Trust (Nol Ishonch)** tamoyili: *\"Hech kimga ishonma, har doim tekshir\"* joriy etilmoqda.\n\n#### Asosiy Arxitektura Elementlari:\n- **Zero Trust (ZTA):** Tizim ichidagi foydalanuvchilar ham xavfli deb hisoblanadi. Har bir so'rov shaxs, qurilma holati va joylashuv bo'yicha doimiy qayta tekshiriladi (Mikrosegmentatsiya).\n- **DMZ (Demilitarized Zone):** Ochiq internet va ichki tarmoq o'rtasidagi bufer hudud. Unga faqat jamoat uchun ochiq veb-sayt va pochta serverlari qo'yiladi. Ma'lumotlar bazasi HECH QACHON DMZ ga qo'yilmaydi!\n- **WAF (Web Application Firewall):** Veb-saytga kelayotgan so'rovlarni SQL Injection va XSS hujumlaridan himoya qiladi.\n- **Jump Box (Bastion Host):** Ma'murlar ichki maxfiy serverlarga kirishi uchun yagona nazorat qilinadigan maxsus himoyalangan oraliq server.\n- **SASE:** Tarmoq (SD-WAN) va bulut xavfsizligini (CASB, FWaaS) birlashtirgan yangi arxitektura.\n\n---\n\n### 🎯 Rasmiy CompTIA Imtihon Vaziyatli Savoli (Real Dumps):\n> **Savol:** Kompaniyaning veb-sayti buzib kirilgan taqdirda xaker to'g'ridan-to'g'ri mijozlarning plastik kartalari saqlanadigan ma'lumotlar bazasiga o'tib ketmasligi uchun qanday tarmoq arxitekturasini qo'llash kerak?\n> \n> - **A.** Har ikkala serverni ochiq internet tarmog'iga qo'yish.\n> - **B.** Veb-serverni DMZ ga joylashtirish, ma'lumotlar bazasini esa yopiq ichki tarmoqda qoldirib, oradagi firewall orqali faqat baza portiga ruxsat berish.\n> - **C.** Router o'rniga oddiy boshqarilmaydigan switch qo'yish.\n> - **D.** Serverda TLS shifrlashni o'chirish.\n> \n> **To'g'ri Javob: B**  \n> **Rasmiy Tahlil:** Veb-server DMZ (Screened Subnet) bufer hududida bo'lishi, maxfiy baza esa ichki yopiq tarmoqda saqlanishi kerak. O'rtadagi firewall orqali faqat zaruriy port (masalan, 3306) ochiq qoldiriladi.",
        "examTips_en": "Databases NEVER go into the DMZ. Public servers go into the DMZ, and strict ACLs control traffic between the DMZ and the private database network.",
        "examTips_uz": "Ma'lumotlar bazasi HECH QACHON DMZ ga qo'yilmaydi. DMZ ga faqat tashqi veb-serverlar qo'yiladi.",
        "status": "not_started"
    },
    {
        "id": "cloud-sec",
        "videoUrl": "https://www.youtube.com/watch?v=jI8IKpjiCSM",
        "videoTitle": "IBM Technology: What is Cloud Security?",
        "videoChannel": "IBM Technology",
        "title_en": "Cloud Computing Security & CASB Enforcement",
        "title_uz": "Bulut Xavfsizligi & CASB Nazorati",
        "swimlaneId": "know-why",
        "subcategoryId": "trends",
        "quarter": "q3",
        "domain_en": "Domain 3.0 (18%)",
        "domain_uz": "3.0 Domen (18%)",
        "duration_en": "1 Week",
        "duration_uz": "1 Hafta",
        "colorTag": "#3b82f6",
        "hasSubLink": true,
        "dependencies": [
            "sec-ops-siem"
        ],
        "summary_en": "IaaS, PaaS, SaaS service models, Shared Responsibility Model, and Cloud Access Security Brokers (CASB).",
        "summary_uz": "IaaS, PaaS, SaaS bulut modellari, Umumiy Javobgarlik Modeli va CASB himoya vositasi.",
        "details_en": "### 📘 Sybex 9th Edition Reference: Chapter 9 - Cloud Security & Virtualization\n**CompTIA Exam Objective 3.5:** Summarize aspects of cloud computing and security operations.\n\nOrganizations adopting cloud architectures must navigate the division of security obligations under the Cloud Shared Responsibility Model.\n\n#### The Shared Responsibility Model Breakdown:\n- **IaaS (Infrastructure as a Service - AWS EC2, Azure VMs):** Cloud provider manages physical hardware, hypervisors, and data center facilities. **Customer is responsible for OS patching, network firewall rules, middleware, and data.**\n- **PaaS (Platform as a Service - AWS Elastic Beanstalk, Heroku):** Provider manages physical infrastructure and OS. **Customer is responsible for application code and data.**\n- **SaaS (Software as a Service - Microsoft 365, Google Workspace, Salesforce):** Provider manages everything from infrastructure up through the application. **Customer is strictly responsible for Identity, Access Control, and Data Governance.**\n\n#### Critical Cloud Security Solutions:\n- **CASB (Cloud Access Security Broker):** Policy enforcement point between on-premises users and cloud providers. Enforces Data Loss Prevention (DLP), blocks unsanctioned cloud apps (Shadow IT), and detects credential leaks.\n- **CSPM (Cloud Security Posture Management):** Continuously scans cloud infrastructure for misconfigurations (e.g., publicly accessible AWS S3 buckets).\n- **CWPP (Cloud Workload Protection Platform):** Secures containers, VMs, and serverless functions at runtime.\n\n---\n\n### 🎯 Real CompTIA Exam Scenario (CompTIA-SY0-701 Dumps):\n> **Question:** A company's CISO notices employees are using personal unapproved cloud storage services (DropBox, Google Drive) to upload confidential engineering designs. The company needs an automated solution deployed at the network perimeter that can discover Shadow IT usage, block unauthorized cloud uploads, and enforce DLP policies on enterprise SaaS. What should be deployed?\n> \n> - **A.** CASB (Cloud Access Security Broker)\n> - **B.** Host-based IDS (HIDS)\n> - **C.** Dynamic DNS\n> - **D.** Stateful Packet Filter\n> \n> **Correct Answer: A**  \n> **Official Explanation:** A Cloud Access Security Broker (CASB) sits between users and cloud services to discover unsanctioned cloud applications (Shadow IT) and enforce corporate security policies such as encryption and DLP.",
        "details_uz": "### 📘 Sybex 9-Nashr Darsligi: 9-Bob - Bulut Xavfsizligi va Virtualizatsiya\n**CompTIA Imtihon Maqsadi 3.5:** Bulut texnologiyalari va umumiy javobgarlik modelini tahlil qilish.\n\nBulutli xizmatlardan foydalanishda xavfsizlik majburiyatlari xizmat ko'rsatuvchi provayder va mijoz o'rtasida bo'linadi.\n\n#### Umumiy Javobgarlik Modeli (Shared Responsibility):\n- **IaaS (AWS EC2, Azure VM):** Provayder apparat ta'minotni nazorat qiladi. **Mijoz operatsion tizim (OS) xavfsizligi, yangilanishlar va fayllar uchun to'liq javobgar.**\n- **PaaS (AWS Beanstalk):** Provayder apparat va operatsion tizimni boshqaradi. **Mijoz faqat o'z ilovasi kodi va ma'lumotlariga javobgar.**\n- **SaaS (Google Workspace, Office 365):** Provayder barcha dasturlarni boshqaradi. **Mijoz faqat shaxslar (login/parol) va fayllar ruxsatiga javobgar.**\n\n#### Asosiy Bulut Himoyasi Asboblari:\n- **CASB (Cloud Access Security Broker):** Foydalanuvchi va bulut o'rtasidagi darvozabon. Xodimlarning yashirin ruxsatsiz bulutlardan foydalanishini (Shadow IT) aniqlaydi va maxfiy ma'lumotlar chiqib ketishini (DLP) to'xtatadi.\n- **CSPM (Cloud Security Posture Management):** Bulutdagi xatoliklarni (masalan, ochiq qolib ketgan AWS S3 xotiralarni) avtomatik skanerlaydi.\n\n---\n\n### 🎯 Rasmiy CompTIA Imtihon Vaziyatli Savoli (Real Dumps):\n> **Savol:** Kompaniya xodimlari korporativ kompyuterlardan ruxsatsiz shaxsiy bulut xotiralariga (Dropbox, Mega) maxfiy hujjatlarni yuklayotgani ma'lum bo'ldi. Bunday ruxsatsiz bulut xizmatlarini (Shadow IT) aniqlash va ularga fayl yuklanishini bloklash uchun qaysi texnologiya kerak?\n> \n> - **A.** CASB (Cloud Access Security Broker)\n> - **B.** HIDS\n> - **C.** Dinamik DNS\n> - **D.** Oddiy paket filtri\n> \n> **To'g'ri Javob: A**  \n> **Rasmiy Tahlil:** CASB aynan bulut xizmatlari bilan ishlashni nazorat qiluvchi, korxona xodimlarining ruxsatsiz bulutlardan (Shadow IT) foydalanishini cheklovchi maxsus xavfsizlik brokeridir.",
        "examTips_en": "In SaaS, the provider manages the application while the customer manages data and identity. CASB is the primary tool to combat Shadow IT in cloud environments.",
        "examTips_uz": "SaaS da provayder barcha dasturiy ta'minotga javobgar. Shadow IT (ruxsatsiz bulutlar) ga qarshi har doim CASB tanlanadi.",
        "status": "not_started"
    },
    {
        "id": "sec-ops-siem",
        "videoUrl": "https://www.youtube.com/watch?v=9RfsRn7m7OE",
        "videoTitle": "IBM Technology: What Is SIEM?",
        "videoChannel": "IBM Technology",
        "title_en": "Security Operations: SIEM, SOAR & Event Correlation",
        "title_uz": "Xavfsizlik Operatsiyalari: SIEM, SOAR & Hodisalar Korrelyatsiyasi",
        "swimlaneId": "know-what",
        "subcategoryId": "dom4",
        "quarter": "q3",
        "domain_en": "Domain 4.0 (28%)",
        "domain_uz": "4.0 Domen (28%)",
        "duration_en": "1 Week",
        "duration_uz": "1 Hafta",
        "colorTag": "#f59e0b",
        "hasSubLink": true,
        "dependencies": [
            "incident-resp"
        ],
        "summary_en": "Log aggregation, event correlation, SOAR playbooks, EDR alerts, and vulnerability management (CVE/CVSS).",
        "summary_uz": "Jurnallarni yig'ish, hodisalar tahlili, SOAR avtomatlashuvi, EDR ogohlantirishlari va zaifliklarni boshqarish.",
        "details_en": "### 📘 Sybex 9th Edition Reference: Chapter 10 - Security Operations & Monitoring\n**CompTIA Exam Objective 4.1 & 4.3:** Given a scenario, analyze indicators of malicious activity and utilize security monitoring operations.\n\nSecurity Operations Centers (SOC) rely on automation and telemetry correlation to detect intrusions across complex hybrid environments.\n\n#### SIEM vs SOAR vs EDR/XDR:\n- **SIEM (Security Information and Event Management):**\n  - Aggregates logs from firewalls, servers, endpoints, and domain controllers.\n  - Normalizes data formats (Syslog, Windows Event IDs).\n  - Performs **Real-time Event Correlation:** Detects sequences like 5 failed logins across 3 minutes followed immediately by a successful admin elevation.\n- **SOAR (Security Orchestration, Automation, and Response):**\n  - Extends SIEM capabilities by automating incident workflows via executable **Playbooks**.\n  - Example: When SIEM detects high-confidence ransomware, SOAR automatically triggers an API call to isolate the endpoint from the network and revoke user Active Directory tokens within seconds.\n- **EDR / XDR (Endpoint / Extended Detection and Response):** Continuous behavioral monitoring on endpoints capable of memory dumps, process tree inspection, and automated isolation.\n- **CVSS (Common Vulnerability Scoring System):** Scores vulnerabilities from 0.0 to 10.0 (Low, Medium, High, Critical: 9.0-10.0).\n\n---\n\n### 🎯 Real CompTIA Exam Scenario (CompTIA-SY0-701 Dumps):\n> **Question:** A SOC analyst receives hundreds of alerts per day regarding potential credential stuffing and port scanning attacks. The security team wants to reduce analyst fatigue and speed up containment by automatically disabling compromised user accounts and updating firewall blocklists without manual human intervention. Which solution should be implemented?\n> \n> - **A.** Deploy an SNMP trap monitor\n> - **B.** Implement a SOAR solution with automated playbooks\n> - **C.** Install a local HIDS on every computer\n> - **D.** Switch all servers from IPv4 to IPv6\n> \n> **Correct Answer: B**  \n> **Official Explanation:** SOAR (Security Orchestration, Automation, and Response) enables automated incident response playbooks that execute actions like disabling accounts and updating firewall rules via APIs without waiting for human intervention.",
        "details_uz": "### 📘 Sybex 9-Nashr Darsligi: 10-Bob - Xavfsizlik Monitoringi va Operatsiyalar\n**CompTIA Imtihon Maqsadi 4.1 & 4.3:** Xavfsizlik jurnallarini tahlil qilish va SOC operatsiyalarini boshqarish.\n\nSOC (Security Operations Center) markazlari butun tarmoqdagi minglab serverlar va kompyuterlardan ma'lumotlarni yig'ib tahlil qiladi.\n\n#### SIEM va SOAR Farqi:\n- **SIEM (Security Information and Event Management):**\n  - Barcha tarmoq uskunalari va serverlar jurnallarini (log) bitta joyga yig'adi.\n  - **Korrelyatsiya:** Alohida-alohida xavfsiz ko'ringan hodisalarni birlashtirib, hujumni aniqlaydi (masalan: 1 daqiqada 10 marta xato parol va darhol administrator bo'lib kirish).\n- **SOAR (Security Orchestration, Automation, and Response):**\n  - SIEM faqat ogohlantiradi (alert beradi), **SOAR esa avtomatik chora ko'radi (Playbook orqali)**!\n  - Masalan: Virus aniqlangan zahoti kompyuterni avtomatik tarmoqdan uzib qo'yadi va xaker IP sini firewall da bloklaydi.\n- **EDR (Endpoint Detection and Response):** Har bir kompyuter ichidagi shubhali jarayonlarni xotira (RAM) darajasida kuzatuvchi dastur.\n\n---\n\n### 🎯 Rasmiy CompTIA Imtihon Vaziyatli Savoli (Real Dumps):\n> **Savol:** SOC bo'limi har kuni yuzlab xavfsizlik ogohlantirishlarini oladi. Tahlilchilar charchab qolmasligi va xakerlar aniqlanganda ularning parolini inson omilisiz zudlik bilan o'chirish hamda IP sini firewall da avtomatik bloklash uchun qaysi texnologiya kerak?\n> \n> - **A.** SNMP monitoring\n> - **B.** Avtomatlashtirilgan playbook-larga ega SOAR tizimi\n> - **C.** Oddiy HIDS\n> - **D.** IPv6 ga o'tish\n> \n> **To'g'ri Javob: B**  \n> **Rasmiy Tahlil:** SOAR tizimi tahlilchilar o'rniga oldindan tuzilgan ssenariylar (playbooks) bo'yicha hodisalarga soniyalar ichida avtomatik javob qaytaradi va tahdidlarni darhol izolyatsiya qiladi.",
        "examTips_en": "SIEM aggregates and correlates logs; SOAR automates the response using playbooks.",
        "examTips_uz": "SIEM loglarni yig'adi va tahlil qiladi; SOAR esa playbook orqali avtomatik javob qaytaradi va bloklaydi.",
        "status": "not_started"
    },
    {
        "id": "incident-resp",
        "videoUrl": "https://www.youtube.com/watch?v=X2UiMLxRdhE",
        "videoTitle": "Professor Messer: Incident Response - CompTIA Security+ SY0-701 - 4.8",
        "videoChannel": "Professor Messer",
        "title_en": "Incident Response Lifecycle (NIST SP 800-61)",
        "title_uz": "Kiberxodisalarga Javob Berish Bosqichlari (NIST SP 800-61)",
        "swimlaneId": "know-what",
        "subcategoryId": "dom4",
        "quarter": "q3",
        "domain_en": "Domain 4.0 (28%)",
        "domain_uz": "4.0 Domen (28%)",
        "duration_en": "1 Week",
        "duration_uz": "1 Hafta",
        "colorTag": "#f59e0b",
        "hasSubLink": true,
        "dependencies": [
            "forensics"
        ],
        "summary_en": "NIST SP 800-61 6-step lifecycle: Preparation, Detection & Analysis, Containment, Eradication, Recovery, Lessons Learned.",
        "summary_uz": "NIST SP 800-61 bo'yicha 6 bosqich: Tayyorgarlik, Aniqlash, Qamrab olish, Yo'q qilish, Qayta tiklash va Xulosalar.",
        "details_en": "### 📘 Sybex 9th Edition Reference: Chapter 12 - Incident Response & Management\n**CompTIA Exam Objective 4.4:** Given a scenario, apply the appropriate incident response procedure.\n\nThe National Institute of Standards and Technology (NIST SP 800-61 Rev. 2) defines the gold-standard 6-step Incident Response Lifecycle.\n\n#### The 6 NIST Incident Response Phases:\n1. **Preparation:** Developing IR playbooks, establishing an Incident Response Team (CSIRT), training personnel via tabletop exercises, and acquiring forensic analysis tools.\n2. **Detection & Analysis:** Identifying Indicators of Compromise (IoCs), triaging SIEM alerts, determining the scope and severity of the incident.\n3. **Containment:** Preventing the spread of damage:\n   - *Short-term:* Disconnecting compromised hosts from the network (VLAN isolation or pulling ethernet cords) while preserving volatile RAM.\n   - *Long-term:* Applying temporary firewall ACL blocks.\n4. **Eradication:** Completely eliminating root causes, malware binaries, persistence mechanisms, and compromised credentials.\n5. **Recovery:** Restoring systems to clean production operations from trusted backups, validating integrity, and monitoring for re-infection.\n6. **Post-Incident Activity (Lessons Learned):** Mandatory retrospective meeting held within 2 weeks to document root causes, update playbooks, and prevent recurrence.\n\n---\n\n### 🎯 Real CompTIA Exam Scenario (CompTIA-SY0-701 Dumps):\n> **Question:** An incident response team identifies a ransomware infection on a file server. The responders immediately isolate the server into a quarantined VLAN to halt lateral propagation across the corporate network, but they intentionally leave the server running to capture RAM. Which phase of the NIST Incident Response lifecycle is being executed?\n> \n> - **A.** Preparation\n> - **B.** Containment\n> - **C.** Eradication\n> - **D.** Post-Incident Activity\n> \n> **Correct Answer: B**  \n> **Official Explanation:** The Containment phase focuses on limiting the impact and preventing lateral spread of an active attack before eradication begins. Isolating the server into a quarantine VLAN is a standard containment procedure.",
        "details_uz": "### 📘 Sybex 9-Nashr Darsligi: 12-Bob - Kiberxodisalarni Boshqarish va Javob Qaytarmaslik\n**CompTIA Imtihon Maqsadi 4.4:** Kiberxodisalarga javob berish bo'yicha rasmiy tartib-qoidalarni qo'llash.\n\nNIST SP 800-61 standarti kiberxodisa yuz berganda professional harakat qilishning 6 ta qat'iy bosqichini belgilaydi.\n\n#### 6 ta Bosqich:\n1. **Tayyorgarlik (Preparation):** Jamoani (CSIRT) tuzish, asboblar va zaxira rejalarini tayyorlab qo'yish.\n2. **Aniqlash va Tahlil (Detection & Analysis):** Hujumni fosh qilish, zararlanish ko'lamini o'rganish.\n3. **Qamrab olish (Containment):** Virus boshqa kompyuterlarga tarqalmasligi uchun zararlangan serverni tarmoqdan uzish (kabelni sug'urish yoki karantin VLAN ga olish).\n4. **Yo'q qilish (Eradication):** Virusni to'liq o'chirish, troyanlarni tozalash, parollarni yangilash.\n5. **Qayta tiklash (Recovery):** Tizimni toza zaxira nusxadan qayta ishga tushirish va monitoring qilish.\n6. **Olingan saboqlar (Lessons Learned):** Hujum tugagach, nima sababdan sodir bo'lganini tahlil qilish va kelgusida qaytarilmasligi uchun choralarni ko'rish.\n\n---\n\n### 🎯 Rasmiy CompTIA Imtihon Vaziyatli Savoli (Real Dumps):\n> **Savol:** Kompaniya serverida xakerlar ransomware virusini ishga tushirgani aniqlandi. Xavfsizlik xodimlari virus ichki tarmoqdagi boshqa shaxsiy kompyuterlarga tarqalmasligi uchun serverni darhol maxsus izolyatsiyalangan karantin VLAN tarmog'iga o'tkazdilar. Bu NIST bo'yicha qaysi bosqich?\n> \n> - **A.** Preparation (Tayyorgarlik)\n> - **B.** Containment (Qamrab olish / Izolyatsiya)\n> - **C.** Eradication (Yo'q qilish)\n> - **D.** Lessons Learned\n> \n> **To'g'ri Javob: B**  \n> **Rasmiy Tahlil:** Hujumni butun tarmoqqa yoyilishining oldini olish uchun serverni alohida karantinga olish — Containment (Qamrab olish) bosqichining asosiy vazifasidir.",
        "examTips_en": "Containment limits damage (e.g. network isolation). Eradication removes the malware. Lessons Learned happens AFTER the incident.",
        "examTips_uz": "Containment - tarqalishni to'xtatish (izolyatsiya). Eradication - virusni yo'q qilish. Lessons Learned - hodisadan so'ng xulosa chiqarish.",
        "status": "not_started"
    },
    {
        "id": "forensics",
        "videoUrl": "https://www.youtube.com/watch?v=UtDWApdO8Zk",
        "videoTitle": "Professor Messer: Digital Forensics - CompTIA Security+ SY0-701 - 4.8",
        "videoChannel": "Professor Messer",
        "title_en": "Digital Forensics & Order of Volatility",
        "title_uz": "Raqamli Kriminalistika & O'zgaruvchanlik Ketma-ketligi",
        "swimlaneId": "know-what",
        "subcategoryId": "dom4",
        "quarter": "q3",
        "domain_en": "Domain 4.0 (28%)",
        "domain_uz": "4.0 Domen (28%)",
        "duration_en": "1 Week",
        "duration_uz": "1 Hafta",
        "colorTag": "#f59e0b",
        "hasSubLink": true,
        "dependencies": [
            "risk-gov"
        ],
        "summary_en": "Order of Volatility (CPU cache -> RAM -> Swap -> Disk -> Remote logs), Chain of Custody, write blockers, and bit-stream disk imaging.",
        "summary_uz": "O'zgaruvchanlik ketma-ketligi (Kesh -> RAM -> Swap -> Disk -> Jurnallar), Dalillar zanjiri va bitma-bit nusxa olish.",
        "details_en": "### 📘 Sybex 9th Edition Reference: Chapter 13 - Digital Forensics & Evidence Preservation\n**CompTIA Exam Objective 4.5:** Explain the key aspects of digital forensics.\n\nDigital forensics ensures that cyber incident evidence collected from digital media is legally admissible in a court of law.\n\n#### The Order of Volatility (RFC 3227):\nEvidence must be captured from the **most volatile** (disappears first if powered down) to the **least volatile**:\n1. **CPU Registers & Cache:** Disappears within nanoseconds.\n2. **Routing Tables, ARP Cache, Process Table, Kernel Statistics.**\n3. **Volatile System Memory (RAM):** Disappears immediately when power is lost. Holds running processes, unencrypted passwords, and active network connections.\n4. **Temporary File Systems & Swap / Pagefile.**\n5. **Non-volatile Magnetic / Solid-State Disks (HDDs/SSDs).**\n6. **Remote Logging Data & Network Telemetry.**\n7. **Physical Configuration & Network Topology.**\n8. **Archival Backup Media & Optical Discs.**\n\n#### Evidence Integrity Principles:\n- **Write Blockers:** Hardware or software bridges that prevent any write modifications to the original physical suspect drive during imaging.\n- **Bit-Stream Disk Image (Forensic Clone):** Raw exact sector-by-sector clone (`dd if=/dev/sda of=image.raw bs=4096`). Forensics is NEVER performed on original drives.\n- **Hashing (Integrity Verification):** Pre-acquisition hash must match post-acquisition hash (SHA-256).\n- **Chain of Custody:** Detailed chronological audit log of who collected, handled, transferred, and secured the evidence.\n\n---\n\n### 🎯 Real CompTIA Exam Scenario (CompTIA-SY0-701 Dumps):\n> **Question:** A digital forensics investigator arrives at an office where a running laptop was used in unauthorized espionage. The laptop is currently unlocked and powered on. According to the standard Order of Volatility, which action should the investigator take FIRST?\n> \n> - **A.** Pull the power cord to prevent remote wiping.\n> - **B.** Capture a live image of the volatile memory (RAM).\n> - **C.** Remove the hard drive and image it using a write blocker.\n> - **D.** Review the Windows Event Viewer security logs.\n> \n> **Correct Answer: B**  \n> **Official Explanation:** Volatile RAM contains critical artifacts (in-memory encryption keys, active C2 connections, fileless malware) that are instantly lost if power is interrupted. RAM must always be imaged before non-volatile storage.",
        "details_uz": "### 📘 Sybex 9-Nashr Darsligi: 13-Bob - Raqamli Kriminalistika va Dalillarni Saqlash\n**CompTIA Imtihon Maqsadi 4.5:** Raqamli dalillarni qonuniy to'plash va kriminalistika tamoyillari.\n\nKriminalistik tahlilda dalillar sudda qonuniy kuchga ega bo'lishi uchun maxsus qoidalarga rioya qilinishi shart.\n\n#### O'zgaruvchanlik Ketma-ketligi (Order of Volatility - RFC 3227):\nDalillar eng tez yo'qolib ketadiganidan boshlab saqlanadi:\n1. **CPU Registrlari va Kesh:** Bir necha nanosoniyada o'chadi.\n2. **Marshrutlash jadvali, ARP keshi va faol ulanishlar.**\n3. **Operativ Xotira (RAM):** Kompyuter o'chsa, bir lahzada yo'qoladi! Unda ochiq qolgan parollar, shifrlash kalitlari va faylsiz viruslar saqlanadi.\n4. **Swap fayllar va Vaqtinchalik fayllar.**\n5. **Qattiq disklar (HDD / SSD).**\n6. **Masofaviy jurnallar (Remote logs).**\n7. **Zaxira arxivlari.**\n\n#### Asosiy Qoidalar:\n- **Write Blocker:** Asl diskka tasodifiy o'zgartirish kirmasligi uchun yozishni to'suvchi maxsus apparat.\n- **Bit-Stream Nusxa:** Diskning har bir sektori (bitma-bit) nusxalanadi (`dd` buyrug'i). Hech qachon asl disk ustida tahlil olib borilmaydi!\n- **Chain of Custody (Dalillar zanjiri):** Dalilni kim, qachon, qayerdan olgani va kimga topshirgani haqidagi qat'iy bayonnoma.\n\n---\n\n### 🎯 Rasmiy CompTIA Imtihon Vaziyatli Savoli (Real Dumps):\n> **Savol:** Kriminalist kiberjinoyat sodir etilgan joyga kelganda jinoyatchining noutbuki yoniq va ishlab turgan holatda ekanligini ko'rdi. O'zgaruvchanlik qoidasiga (Order of Volatility) ko'ra, kriminalist ENG BIRINCHI qaysi ishni qilishi shart?\n> \n> - **A.** Noutbuk tokini uzib darhol o'chirish.\n> - **B.** Jonli tizimning operativ xotirasidan (RAM) nusxa olish (Memory Dump).\n> - **C.** Qattiq diskni chiqarib olish.\n> - **D.** Windows hodisalar jurnalini o'qish.\n> \n> **To'g'ri Javob: B**  \n> **Rasmiy Tahlil:** RAM xotiradagi ma'lumotlar elektr o'chsa butunlay yo'qoladi. Unda shifrlash kalitlari va xakerning faol ulanishlari borligi sababli dastlab RAM xotirasi saqlab olinadi.",
        "examTips_en": "RAM is more volatile than hard drives. Never reboot or power off a compromised system before capturing memory!",
        "examTips_uz": "RAM qattiq diskdan ko'ra tez o'chib ketadi. Xotiradan nusxa olmasdan turib kompyuterni o'chirmang!",
        "status": "not_started"
    },
    {
        "id": "risk-gov",
        "videoUrl": "https://www.youtube.com/watch?v=cLhUMoQS1a8",
        "videoTitle": "Professor Messer: Risk Management - CompTIA Security+ SY0-701 - 5.2",
        "videoChannel": "Professor Messer",
        "title_en": "Risk Management, Compliance & Frameworks",
        "title_uz": "Xatarlarni Boshqarish, Muvofiqlik & Standartlar",
        "swimlaneId": "know-why",
        "subcategoryId": "business",
        "quarter": "q4",
        "domain_en": "Domain 5.0 (20%)",
        "domain_uz": "5.0 Domen (20%)",
        "duration_en": "1 Week",
        "duration_uz": "1 Hafta",
        "colorTag": "#f59e0b",
        "hasSubLink": true,
        "dependencies": [
            "bcp-drp"
        ],
        "summary_en": "Quantitative risk formulas (SLE, ALE, ARO), risk response strategies (mitigate, transfer, accept, avoid), and compliance frameworks (GDPR, PCI-DSS, NIST).",
        "summary_uz": "Miqdoriy xatar formulalari (SLE, ALE, ARO), xatarga javob strategiyalari va qonuniy standartlar (GDPR, PCI-DSS, NIST).",
        "details_en": "### 📘 Sybex 9th Edition Reference: Chapter 14 - Risk Management & Compliance\n**CompTIA Exam Objective 5.1 & 5.2:** Explain risk management processes and concepts.\n\nRisk represents the probability of a threat source exploiting a vulnerability and causing negative organizational impact.\n\n#### Quantitative Risk Calculations:\n- **AV (Asset Value):** Monetary worth of an asset.\n- **EF (Exposure Factor):** Percentage of asset lost when an incident occurs.\n- **SLE (Single Loss Expectancy):** `SLE = AV * EF` (Monetary loss from a single event).\n- **ARO (Annualized Rate of Occurrence):** Number of times the event is expected to occur in one year.\n- **ALE (Annualized Loss Expectancy):** `ALE = SLE * ARO` (Total projected yearly monetary loss).\n*Decision Rule:* A security control should never cost more than the ALE it mitigates!\n\n#### The 4 Risk Response Strategies:\n1. **Mitigation (Reduction):** Implementing controls to reduce vulnerability likelihood or impact (firewalls, patching, training).\n2. **Transference (Sharing):** Shifting financial risk to an external third party (Purchasing Cyber Insurance, outsourcing hosting to AWS).\n3. **Acceptance:** Acknowledging the risk because the cost of countermeasures outweighs potential damage.\n4. **Avoidance:** Completely eliminating the risk by terminating the risky activity or business operation.\n\n---\n\n### 🎯 Real CompTIA Exam Scenario (CompTIA-SY0-701 Dumps):\n> **Question:** An e-commerce company determines that a distributed denial-of-service (DDoS) attack would cost $100,000 in lost sales per incident, and expects 2 such attacks per year. To protect against this financial exposure, the company purchases a comprehensive cyber liability insurance policy with an annual premium of $15,000. Which risk management strategy is being utilized?\n> \n> - **A.** Risk Avoidance\n> - **B.** Risk Transference\n> - **C.** Risk Acceptance\n> - **D.** Risk Mitigation\n> \n> **Correct Answer: B**  \n> **Official Explanation:** Purchasing cyber insurance or warranty agreements shifts financial liability to a third party, which is the textbook definition of Risk Transference.",
        "details_uz": "### 📘 Sybex 9-Nashr Darsligi: 14-Bob - Xatarlarni Boshqarish va Muvofiqlik\n**CompTIA Imtihon Maqsadi 5.1 & 5.2:** Kiberxatarlarni hisoblash formulalari va boshqarish strategiyalari.\n\nXatar (Risk) — zaiflikdan foydalanib tizimga moddiy yoki ma'naviy zarar yetkazish ehtimolidir.\n\n#### Miqdoriy Xatarni Hisoblash Formulalari:\n- **AV (Aktiv Qiymati):** Server yoki ma'lumotning puldagi qiymati.\n- **EF (Zararlanish Foizi):** Falokat yuz berganda aktivning necha foizi yo'qolishi (0% dan 100% gacha).\n- **SLE (Bir martalik yo'qotish):** `SLE = AV * EF`\n- **ARO (Yillik takrorlanish soni):** Bir yilda bu hodisa necha marta sodir bo'lishi mumkinligi.\n- **ALE (Yillik kutilayotgan zarar):** `ALE = SLE * ARO`\n*Oltin Qoida:* Xavfsizlik uskunasining yillik narxi ALE miqdoridan oshmasligi kerak!\n\n#### 4 ta Xatar Strategiyasi:\n1. **Mitigation (Kamaytirish):** Antivirus, firewall yoki o'quv mashg'ulotlari orqali xavfni kamaytirish.\n2. **Transference (Boshqaga o'tkazish):** Moliyaviy zararni sug'urta kompaniyasiga o'tkazish (Kiber sug'urta sotib olish).\n3. **Acceptance (Qabul qilish):** Xavfni bilgan holda shunday qoldirish (chunki uni tuzatish juda qimmat).\n4. **Avoidance (To'xtatish):** Xavfli faoliyatni butunlay to'xtatish (masalan, xavfli xizmatni o'chirib tashlash).\n\n---\n\n### 🎯 Rasmiy CompTIA Imtihon Vaziyatli Savoli (Real Dumps):\n> **Savol:** Kompaniya har bir DDoS hujumi $100,000 zarar keltirishini va bunday hujum yiliga 2 marta bo'lishi mumkinligini hisoblab chiqdi. Moliyaviy yo'qotishlarni qoplash uchun kompaniya yiliga $15,000 ga Kiber Sug'urta shartnomasini imzoladi. Bu xatarni boshqarishning qaysi strategiyasi?\n> \n> - **A.** Risk Avoidance (To'xtatish)\n> - **B.** Risk Transference (Xatarni o'tkazish / Sug'urta)\n> - **C.** Risk Acceptance (Qabul qilish)\n> - **D.** Risk Mitigation (Kamaytirish)\n> \n> **To'g'ri Javob: B**  \n> **Rasmiy Tahlil:** Kiber sug'urta sotib olish yoki autsorsing qilish orqali moddiy javobgarlikni boshqa tashkilotga o'tkazish — Risk Transference deb ataladi.",
        "examTips_en": "Cyber insurance = Risk Transference. Implementing firewalls/patches = Risk Mitigation. Discontinuing an activity = Risk Avoidance.",
        "examTips_uz": "Kiber sug'urta = Risk Transference. Xavfsizlik vositalari = Risk Mitigation. Faoliyatni to'xtatish = Risk Avoidance.",
        "status": "not_started"
    },
    {
        "id": "bcp-drp",
        "videoUrl": "https://www.youtube.com/watch?v=KiEptGbnEBc",
        "videoTitle": "Professor Messer: How to Pass Your SY0-701 Security+ Exam in 2026",
        "videoChannel": "Professor Messer",
        "title_en": "Business Continuity, RTO, RPO & Backups",
        "title_uz": "Biznes Davomiyligi, RTO, RPO & Zaxiralash",
        "swimlaneId": "know-why",
        "subcategoryId": "business",
        "quarter": "q4",
        "domain_en": "Domain 5.0 (20%)",
        "domain_uz": "5.0 Domen (20%)",
        "duration_en": "1 Week",
        "duration_uz": "1 Hafta",
        "colorTag": "#f59e0b",
        "hasSubLink": true,
        "dependencies": [
            "pbq-sim"
        ],
        "summary_en": "BIA metrics (RTO vs RPO, MTBF, MTTR), backup strategies (3-2-1 rule, Full/Diff/Incr), and site recovery (Hot, Warm, Cold).",
        "summary_uz": "BIA ko'rsatkichlari (RTO va RPO farqi), 3-2-1 zaxira qoidasi va tiklash markazlari (Hot, Warm, Cold saytlar).",
        "details_en": "### 📘 Sybex 9th Edition Reference: Chapter 15 - Business Continuity & Disaster Recovery\n**CompTIA Exam Objective 5.3:** Explain the importance of business continuity and disaster recovery.\n\nBusiness Continuity Planning (BCP) ensures essential operational functions continue during and immediately following a disaster.\n\n#### Critical Business Impact Analysis (BIA) Metrics:\n- **RTO (Recovery Time Objective):** The maximum tolerable duration of system downtime before unacceptable damage occurs. (*'How fast must we be back up?'*)\n- **RPO (Recovery Point Objective):** The maximum acceptable data loss measured in time. (*'How much data can we afford to lose?'* E.g., if backups occur every 4 hours, the RPO is 4 hours).\n- **MTBF (Mean Time Between Failures):** Expected operational lifespan of a hardware component.\n- **MTTR (Mean Time to Repair):** Average time required to repair or replace a failed device.\n\n#### Backup Methodologies & The 3-2-1 Rule:\n- **3-2-1 Rule:** 3 copies of data, across 2 different physical media types, with at least 1 copy stored securely off-site or in the cloud.\n- **Full Backup:** Archives all files. Slowest to back up, fastest to restore.\n- **Differential Backup:** Archives all changes made since the last **Full backup**. Fast recovery (Full + latest Differential).\n- **Incremental Backup:** Archives all changes made since the last backup (Full or Incremental). Fastest to back up, slowest to recover (Full + all sequential Incrementals).\n\n#### Recovery Site Classifications:\n- **Hot Site:** Fully operational clone with synchronized live data. Near-zero RTO. Most expensive.\n- **Warm Site:** Has power and hardware pre-installed, but requires restoring recent backups before go-live. RTO: Hours to days.\n- **Cold Site:** Empty facility with power and HVAC, no hardware or data. RTO: Weeks. Least expensive.\n\n---\n\n### 🎯 Real CompTIA Exam Scenario (CompTIA-SY0-701 Dumps):\n> **Question:** A banking application processes financial transactions around the clock. The board of directors mandates that in the event of a total data center catastrophe, the system cannot tolerate losing more than 15 minutes worth of transaction data. Which metric has the board established?\n> \n> - **A.** RTO (Recovery Time Objective)\n> - **B.** RPO (Recovery Point Objective)\n> - **C.** MTBF (Mean Time Between Failures)\n> - **D.** SLE (Single Loss Expectancy)\n> \n> **Correct Answer: B**  \n> **Official Explanation:** The Recovery Point Objective (RPO) defines the maximum allowable amount of data loss expressed as a measurement of time. Here, 15 minutes of permissible data loss establishes an RPO of 15 minutes.",
        "details_uz": "### 📘 Sybex 9-Nashr Darsligi: 15-Bob - Biznes Davomiyligi va Falokatdan Tiklash\n**CompTIA Imtihon Maqsadi 5.3:** Biznes uzluksizligi va zaxira nusxalarni rejalashtirish.\n\nFalokat ro'y berganda kompaniya faoliyati to'xtab qolmasligi uchun BCP (Business Continuity Plan) va DRP (Disaster Recovery Plan) ishlab chiqiladi.\n\n#### BIA ning Asosiy Ko'rsatkichlari:\n- **RTO (Recovery Time Objective):** Tizimni qayta ishga tushirish uchun ruxsat etilgan maksimal vaqt (*\"Qanchalik tez tiklanishimiz kerak?\"*).\n- **RPO (Recovery Point Objective):** Yo'qotish mumkin bo'lgan ma'lumotlarning vaqtdagi chegarasi (*\"Qancha ma'lumot yo'qotsak bo'ladi?\"* Masalan, har 1 soatda nusxa olinsa, RPO = 1 soat).\n- **MTTR (Mean Time to Repair):** Buzilgan uskunani tuzatishga ketadigan o'rtacha vaqt.\n\n#### 3-2-1 Zaxira Qoidasi:\n- Ma'lumotlarning **3 ta nusxasi**, **2 xil saqlash vositasida** (masalan, SSD va lenta) va kamida **1 tasi boshqa binoda yoki bulutda** saqlanishi kerak.\n\n#### Tiklash Markazlari:\n- **Hot Site:** Jonli ishlayotgan nusxa. Dastur bir necha soniyada o'sha joyda davom etadi. Eng qimmat.\n- **Warm Site:** Uskunalar tayyor, lekin zaxira nusxani yuklash uchun bir necha soat vaqt oladi.\n- **Cold Site:** Bo'sh bino. Serverlarni sotib olib o'rnatish kerak. Haftalab vaqt ketadi.\n\n---\n\n### 🎯 Rasmiy CompTIA Imtihon Vaziyatli Savoli (Real Dumps):\n> **Savol:** Bank rahbariyati server xonasida yong'in yoki falokat yuz berganda yo'qotilishi mumkin bo'lgan maksimal tranzaksiyalar vaqti 15 daqiqadan oshmasligi kerakligi haqida qat'iy talab qo'ydi. Rahbariyat qaysi parametrni belgilab berdi?\n> \n> - **A.** RTO\n> - **B.** RPO (Recovery Point Objective)\n> - **C.** MTBF\n> - **D.** SLE\n> \n> **To'g'ri Javob: B**  \n> **Rasmiy Tahlil:** Yo'qotilishi mumkin bo'lgan ma'lumotlarning vaqt ko'rinishidagi o'lchovi — RPO (Recovery Point Objective) deyiladi (bu holda RPO = 15 daqiqa).",
        "examTips_en": "RPO measures data loss in time. RTO measures downtime until system restoration. Hot Site = instant recovery; Cold Site = empty shell.",
        "examTips_uz": "RPO - ma'lumot yo'qotish vaqti. RTO - tizimni tiklash vaqti. Hot Site - darhol ishga tushadi; Cold Site - bo'sh xona.",
        "status": "not_started"
    },
    {
        "id": "pbq-sim",
        "videoUrl": "https://www.youtube.com/watch?v=ODrEjR-DsR0",
        "videoTitle": "Cyberkraft: Security Controls, Types and Application - CompTIA Security+ Performance Based Question",
        "videoChannel": "Cyberkraft",
        "title_en": "PBQ Simulation Drills & ACL Matrix",
        "title_uz": "PBQ Mashqlari & ACL Matritsasi",
        "swimlaneId": "testing",
        "subcategoryId": "practice",
        "quarter": "q4",
        "domain_en": "Exam Practice Labs",
        "domain_uz": "Imtihon Amaliyot Laboratoriyasi",
        "duration_en": "1 Week",
        "duration_uz": "1 Hafta",
        "colorTag": "#f59e0b",
        "hasSubLink": true,
        "dependencies": [
            "mock-exams"
        ],
        "summary_en": "Hands-on Performance-Based Questions: Configuring firewall ACL rules, RADIUS servers, WPA3-Enterprise, and remediation.",
        "summary_uz": "Amaliy PBQ masalalari: Firewall ACL qoidalarini sozlash, RADIUS server, WPA3 va tarmoqni to'g'ri izolyatsiya qilish.",
        "details_en": "### 📘 Sybex & Official CompTIA Dumps: Performance-Based Questions (PBQs) Mastery\nPBQs appear at the very beginning of the CompTIA Security+ examination (typically 3 to 5 questions). They are hands-on simulations that test configuration, log analysis, and drag-and-drop network design.\n\n#### Essential PBQ Archetypes:\n1. **Firewall Access Control Lists (ACLs):**\n   - Rules are evaluated from top to bottom; the first matching rule triggers.\n   - Always place specific exception rules above broader catch-all rules.\n   - The final rule is always an implicit **DENY ANY ANY**.\n2. **Wireless Network Hardening (WPA3-Enterprise):**\n   - Requires 802.1X authentication backed by a **RADIUS server (UDP 1812/1813)** and EAP-TLS with mutual certificate validation.\n3. **Remediation & Incident Drag-and-Drop:**\n   - Identifying infected endpoints from SIEM alerts and matching them with appropriate remediation actions (VLAN Quarantine, Password Reset, AV Full Scan).\n\n---\n\n### 🎯 Real CompTIA Exam PBQ Scenario (CompTIA Dumps):\n> **Scenario:** Configure a perimeter firewall rulebase to permit external internet users to access an internal corporate web server (10.0.0.10) over encrypted HTTPS, while blocking cleartext HTTP and prohibiting all other inbound traffic.\n> \n> **Optimal ACL Configuration:**\n> 1. `ALLOW Source: Any, Dest: 10.0.0.10, Port: 443, Protocol: TCP, Action: PERMIT`\n> 2. `BLOCK Source: Any, Dest: 10.0.0.10, Port: 80, Protocol: TCP, Action: DENY`\n> 3. `DEFAULT Source: Any, Dest: Any, Port: Any, Protocol: Any, Action: DENY (Implicit Deny)`",
        "details_uz": "### 📘 Sybex & Rasmiy CompTIA Dumps: Amaliy PBQ Masalalarini Yechish\nPBQ (Performance-Based Questions) imtihonning eng boshida chiqadi (3-5 ta masala). Ular interaktiv trenajorlar bo'lib, firewall ACL qoidalarini tuzish va simsiz tarmoqlarni sozlashni talab qiladi.\n\n#### Asosiy PBQ Turlari:\n1. **Firewall ACL Qoidalari:**\n   - Qoidalar yuqoridan pastga qarab o'qiladi; birinchi to'g'ri kelgan qoida ishlaydi.\n   - Aniq qoidalar yuqoriga, umumiy qoidalar esa pastga qo'yiladi.\n   - Eng oxirgi qoida har doim **DENY ANY ANY** (Implicit Deny) bo'lishi shart.\n2. **WPA3-Enterprise Sozlash:**\n   - 802.1X va RADIUS serveri (Port 1812/1813) orqali markazlashgan sertifikatli kirish.\n\n---\n\n### 🎯 Rasmiy CompTIA Imtihon PBQ Vaziyati:\n> **Masala:** Firewall qoidalarini shunday tahrirlangki, tashqi foydalanuvchilar veb-serverga (10.0.0.10) faqat HTTPS (443) orqali kira olsin, ochiq HTTP (80) bloklansin va qolgan barcha trafik yopilsin.\n> \n> **To'g'ri ACL Qoidalari:**\n> 1. `ALLOW Source: Any, Dest: 10.0.0.10, Port: 443, Action: PERMIT`\n> 2. `DENY Source: Any, Dest: 10.0.0.10, Port: 80, Action: DENY`\n> 3. `DENY Source: Any, Dest: Any, Port: Any, Action: DENY (Implicit Deny)`",
        "examTips_en": "Do not spend more than 15 minutes total on the opening PBQs. Flag challenging ones and return to them after completing multiple-choice questions.",
        "examTips_uz": "Boshidagi PBQ larga 15 daqiqadan ko'p vaqt sarflamang. Qiyin bo'lsa 'Flag' qilib, testlarni yechgach qaytib yeching.",
        "status": "not_started"
    },
    {
        "id": "mock-exams",
        "videoUrl": "https://www.youtube.com/watch?v=kNQp1Tda_TQ",
        "videoTitle": "Certification Cynergy: CompTIA Security+ (SY0-701) | Practice Exam | Questions 1-5",
        "videoChannel": "Certification Cynergy",
        "title_en": "Official 90-Question Mock Exam & Real Dumps",
        "title_uz": "Rasmiy 90-Savolli Imtihon & Real Dumps",
        "swimlaneId": "testing",
        "subcategoryId": "practice",
        "quarter": "q4",
        "domain_en": "Full Exam Simulator",
        "domain_uz": "To'liq Imtihon Trenajyori",
        "duration_en": "1 Week",
        "duration_uz": "1 Hafta",
        "colorTag": "#f59e0b",
        "hasSubLink": true,
        "dependencies": [],
        "summary_en": "Full Pearson VUE 90-minute timed exam simulation, scoring 750+ on a 100-900 scale, and reviewing full dumps explanations.",
        "summary_uz": "90 daqiqalik rasmiy Pearson VUE imtihon simulyatsiyasi, 750+ ball olish strategiyasi va tahlillar.",
        "details_en": "### 📘 Sybex 9th Edition Reference: Exam Strategies & Real Dumps Review\n**Passing Standard:** Score of **750 or higher** on a scale of 100-900 (roughly 83%+ correct).\n\nThe official CompTIA Security+ (SY0-701) exam contains up to 90 questions within a strict 90-minute time limit.\n\n#### Golden Rules for Passing on the First Attempt:\n1. **Time Management (1 Minute per Question):** You have exactly 90 minutes for up to 90 questions. Never get stuck on a single question.\n2. **Flag & Move On:** If a scenario is wordy or confusing, select your best initial guess, click **Flag for Review**, and keep moving.\n3. **Read the Last Sentence First:** CompTIA questions often provide long introductory fluff. The last sentence contains the actual question (e.g., *'Which of the following is the BEST solution to maintain confidentiality?'*).\n4. **Acronym Elimination:** Eliminate options that contain irrelevant or nonexistent protocols.\n\nUse the built-in **90-Question Exam Simulator** and **Official Dumps** tabs in this application to practice under real timed conditions!",
        "details_uz": "### 📘 Sybex 9-Nashr Darsligi: Imtihon Strategiyalari va Dumps Tahlili\n**O'tish Balli:** 100-900 balllik shkalada **750 ball** (taxminan 83%+ to'g'ri javob).\n\nRasmiy imtihonda 90 daqiqa ichida 90 tagacha savolga javob berish talab etiladi.\n\n#### Birinchi Urinishda O'tishning 4 Oltin Qoidasi:\n1. **Vaqt Taqsimoti (Har bir savolga 1 daqiqa):** Bitta savol ustida uzoq to'xtab qolmang.\n2. **Flag (Belgilash):** Ikkilangan savolingizga taxminiy javobni belgilab, 'Flag' tugmasini bosing va oldinga yuring. Vaqt ortsa, oxirida qaytib tekshirasiz.\n3. **Oxirgi Jumlani O'qing:** CompTIA savollari uzun hikoya bilan boshlanadi. Asl savol esa har doim eng oxirgi gapda yozilgan bo'ladi!\n4. **Mantiqsiz Variantlarni Chiqarib Tashlash:** Mos kelmaydigan 2 ta noto'g'ri variantni darhol o'chirib, qolgan 2 tasi orasidan to'g'risini tanlang.\n\nIlovadagi **90 Savolli Imtihon** va **Real Dumps** bo'limlarida bilimingizni to'liq sinab ko'ring!",
        "examTips_en": "Score 85%+ consistently on mock exams before scheduling your official test. Target 750+ to earn your Security+ credential!",
        "examTips_uz": "Rasmiy imtihonga kirishdan oldin ilovadagi simulyatorda muntazam 85%+ ball to'plashga erishing. O'tish balli: 750.",
        "status": "not_started"
    }
],
  ports: [
    { 
      port: 20, 
      proto: "TCP", 
      name: "FTP Data", 
      secure: false, 
      alt: "SFTP (22)", 
      desc_en: "File Transfer Protocol data channel. Unencrypted cleartext transmission.",
      desc_uz: "Fayl uzatish ma'lumotlar kanali. Shifrlanmagan ochiq matn." 
    },
    { 
      port: 21, 
      proto: "TCP", 
      name: "FTP Control", 
      secure: false, 
      alt: "SFTP (22)", 
      desc_en: "File Transfer Protocol command channel. Credentials transmitted in cleartext.",
      desc_uz: "Fayl uzatish buyruqlar kanali. Login va parollar ochiq uzatiladi." 
    },
    { 
      port: 22, 
      proto: "TCP", 
      name: "SSH / SFTP", 
      secure: true, 
      alt: "Standard", 
      desc_en: "Secure Shell & Secure FTP. Strongly encrypted remote administration and file transfer.",
      desc_uz: "Xavfsiz shifrlangan terminal va xavfsiz fayl uzatish protokoli." 
    },
    { 
      port: 23, 
      proto: "TCP", 
      name: "Telnet", 
      secure: false, 
      alt: "SSH (22)", 
      desc_en: "Remote terminal access. Completely insecure cleartext, vulnerable to packet sniffing.",
      desc_uz: "Masofaviy terminal ulanishi. Mutlaqo xavfsiz emas, parollar ochiq ketadi." 
    },
    { 
      port: 25, 
      proto: "TCP", 
      name: "SMTP", 
      secure: false, 
      alt: "SMTPS (465/587)", 
      desc_en: "Simple Mail Transfer Protocol. Unencrypted email transmission between MTAs.",
      desc_uz: "Email yuborish protokoli. Standart holatda shifrlanmagan." 
    },
    { 
      port: 53, 
      proto: "TCP/UDP", 
      name: "DNS", 
      secure: false, 
      alt: "DNSSEC / DoH", 
      desc_en: "Domain Name System. Translates domain names to IP addresses (Zone transfers on TCP).",
      desc_uz: "Domen nomlarini IP manzillarga aylantirish xizmati." 
    },
    { 
      port: 67, 
      proto: "UDP", 
      name: "DHCP Server", 
      secure: false, 
      alt: "DHCP Snooping", 
      desc_en: "Dynamic Host Configuration Protocol server listening port. Vulnerable to rogue servers.",
      desc_uz: "Tarmoqdagi qurilmalarga avtomatik IP berish serveri." 
    },
    { 
      port: 68, 
      proto: "UDP", 
      name: "DHCP Client", 
      secure: false, 
      alt: "DHCP Snooping", 
      desc_en: "Dynamic Host Configuration Protocol client port for receiving IP lease offers.",
      desc_uz: "Tarmoqdagi qurilmalarga avtomatik IP olish klienti." 
    },
    { 
      port: 69, 
      proto: "UDP", 
      name: "TFTP", 
      secure: false, 
      alt: "SFTP (22)", 
      desc_en: "Trivial File Transfer Protocol. UDP-based, lacks both encryption and authentication.",
      desc_uz: "Oddiy fayl uzatish protokoli. Autentifikatsiyasiz va shifrsiz ishlaydi." 
    },
    { 
      port: 80, 
      proto: "TCP", 
      name: "HTTP", 
      secure: false, 
      alt: "HTTPS (443)", 
      desc_en: "Hypertext Transfer Protocol. Standard plaintext web browsing, easily intercepted.",
      desc_uz: "Veb-saytlar uchun ochiq, shifrlanmagan protokol." 
    },
    { 
      port: 88, 
      proto: "TCP/UDP", 
      name: "Kerberos", 
      secure: true, 
      alt: "Standard", 
      desc_en: "Ticket-based network authentication service in Windows Active Directory.",
      desc_uz: "Windows Active Directory da chiptalar orqali o'zaro autentifikatsiya." 
    },
    { 
      port: 110, 
      proto: "TCP", 
      name: "POP3", 
      secure: false, 
      alt: "POP3S (995)", 
      desc_en: "Post Office Protocol v3. Retrieves email from servers without encryption.",
      desc_uz: "Elektron pochtani serverdan qabul qilib olish (shifrlanmagan)." 
    },
    { 
      port: 123, 
      proto: "UDP", 
      name: "NTP", 
      secure: false, 
      alt: "NTPsec", 
      desc_en: "Network Time Protocol. Synchronizes device clocks across network environments.",
      desc_uz: "Tarmoqdagi barcha qurilmalar vaqtini sinxronlash." 
    },
    { 
      port: 143, 
      proto: "TCP", 
      name: "IMAP", 
      secure: false, 
      alt: "IMAPS (993)", 
      desc_en: "Internet Message Access Protocol. Manages email stored on remote mail servers.",
      desc_uz: "Elektron pochtani serverda saqlagan holda o'qish (shifrsiz)." 
    },
    { 
      port: 161, 
      proto: "UDP", 
      name: "SNMP Queries", 
      secure: false, 
      alt: "SNMPv3", 
      desc_en: "Simple Network Management Protocol queries. Versions 1/2 use cleartext community strings.",
      desc_uz: "Tarmoq qurilmalari holatini so'rash va monitoring qilish." 
    },
    { 
      port: 162, 
      proto: "UDP", 
      name: "SNMP Traps", 
      secure: false, 
      alt: "SNMPv3", 
      desc_en: "Unsolicited event notification traps sent by network devices to the management station.",
      desc_uz: "Tarmoq qurilmalari tomonidan xavf haqida bildirishnoma yuborish." 
    },
    { 
      port: 389, 
      proto: "TCP", 
      name: "LDAP", 
      secure: false, 
      alt: "LDAPS (636)", 
      desc_en: "Lightweight Directory Access Protocol. Unencrypted directory queries vulnerable to sniffing.",
      desc_uz: "Katalog xizmati (Directory Services) orqali foydalanuvchilarni qidirish." 
    },
    { 
      port: 443, 
      proto: "TCP", 
      name: "HTTPS", 
      secure: true, 
      alt: "Standard", 
      desc_en: "Hypertext Transfer Protocol Secure. Uses TLS encryption to secure web communications.",
      desc_uz: "TLS/SSL orqali to'liq shifrlangan xavfsiz veb-trafik." 
    },
    { 
      port: 445, 
      proto: "TCP", 
      name: "SMB", 
      secure: false, 
      alt: "SMB signing / VPN", 
      desc_en: "Server Message Block. File and printer sharing on Windows networks (WannaCry vector).",
      desc_uz: "Windows fayllar va printerlarni tarmoqda ulashish (WannaCry nishoni)." 
    },
    { 
      port: 636, 
      proto: "TCP", 
      name: "LDAPS", 
      secure: true, 
      alt: "Standard", 
      desc_en: "Lightweight Directory Access Protocol Secure. Encrypted directory access via TLS.",
      desc_uz: "TLS orqali shifrlangan xavfsiz LDAP katalog xizmati." 
    },
    { 
      port: 3389, 
      proto: "TCP", 
      name: "RDP", 
      secure: false, 
      alt: "VPN + NLA", 
      desc_en: "Remote Desktop Protocol. Graphical remote management on Windows (requires NLA/VPN).",
      desc_uz: "Windows Remote Desktop masofaviy ish stoli boshqaruvi." 
    }
  ],
  quizQuestions: [
        {
            "q_en": "A network administrator needs to replace legacy, unencrypted Telnet sessions (Port 23) with a cryptographically secure alternative that provides encrypted remote terminal management. Which protocol should be deployed?",
            "q_uz": "Tarmoq administratori xavfli va shifrlanmagan Telnet (Port 23) o'rniga masofaviy boshqaruv uchun qaysi xavfsiz va shifrlangan protokolni joriy etishi kerak?",
            "options_en": [
                "SSH (Secure Shell - TCP Port 22)",
                "HTTP (Hypertext Transfer - TCP Port 80)",
                "SNMPv1 (Network Management - UDP Port 161)",
                "TFTP (Trivial FTP - UDP Port 69)"
            ],
            "options_uz": [
                "SSH (Secure Shell - TCP Port 22)",
                "HTTP (Hypertext Transfer - TCP Port 80)",
                "SNMPv1 (Network Management - UDP Port 161)",
                "TFTP (Trivial FTP - UDP Port 69)"
            ],
            "correct": 0,
            "explanation_en": "SSH (Secure Shell) runs on TCP Port 22 and provides strong asymmetric and symmetric encryption for remote command-line access, completely replacing insecure plaintext Telnet (Port 23).",
            "explanation_uz": "SSH protokoli TCP 22-portda ishlaydi va masofaviy boshqaruvda barcha parollar va ma'lumotlarni kuchli shifrlaydi. Telnet (Port 23) esa barchasini ochiq matnda uzatadi."
        },
        {
            "q_en": "Which cryptographic mechanism is specifically utilized to guarantee data Integrity (verifying that digital data or downloaded files were not altered or tampered with in transit)?",
            "q_uz": "Ma'lumotlar uzatish jarayonida o'zgartirilmaganligi yoki buzilmaganligini (Integrity - Butunlik) tasdiqlash uchun qaysi kriptografik mexanizm qo'llaniladi?",
            "options_en": [
                "Diffie-Hellman Key Exchange",
                "AES-256 Symmetric Block Cipher",
                "SHA-256 Cryptographic Hash Function",
                "RSA Public Key Encryption"
            ],
            "options_uz": [
                "Diffie-Hellman kalit almashinuvi",
                "AES-256 simmetrik blokli shifrlash",
                "SHA-256 kriptografik xesh-funksiyasi",
                "RSA ochiq kalitli shifrlash"
            ],
            "correct": 2,
            "explanation_en": "Cryptographic hash functions (such as SHA-256) compute a unique, fixed-size mathematical digest. Even a single changed bit completely alters the digest (the avalanche effect), verifying data integrity without providing confidentiality.",
            "explanation_uz": "Kriptografik xesh-funksiyalar (masalan, SHA-256) ma'lumotning takrorlanmas raqamli izini (digest) hosil qiladi. Hatto 1 bit o'zgarsa ham xesh tubdan o'zgaradi va butunlik buzilganini bildiradi."
        },
        {
            "q_en": "An enterprise security analyst discovers that user credentials sent to Microsoft Active Directory via LDAP (Port 389) are readable in network packet captures. Which secure protocol and port must be enforced?",
            "q_uz": "Xavfsizlik mutaxassisi Active Directory ga LDAP (Port 389) orqali yuborilayotgan parollar ochiq holda ushlanayotganini aniqladi. Qaysi xavfsiz protokol va portga o'tish shart?",
            "options_en": [
                "Kerberos over UDP Port 88",
                "LDAPS (Secure LDAP) over TCP Port 636",
                "RADIUS over UDP Port 1812",
                "DNSSEC over UDP Port 53"
            ],
            "options_uz": [
                "UDP 88-portdagi Kerberos",
                "TCP 636-portdagi LDAPS (Secure LDAP)",
                "UDP 1812-portdagi RADIUS",
                "UDP 53-portdagi DNSSEC"
            ],
            "correct": 1,
            "explanation_en": "LDAPS (Lightweight Directory Access Protocol Secure) encapsulates directory communication inside a TLS encrypted tunnel over TCP Port 636, preventing credential eavesdropping on the network.",
            "explanation_uz": "LDAPS (TCP Port 636) TLS shifrlash tuneli orqali katalog (Active Directory) so'rovlarini to'liq shifrlaydi va parollar ushlanib qolishining oldini oladi."
        },
        {
            "q_en": "In a Windows Active Directory domain, which authentication protocol relies on Key Distribution Centers (KDCs), Ticket-Granting Tickets (TGTs), and timestamps on Port 88 to prevent replay attacks?",
            "q_uz": "Windows Active Directory domenida qaysi autentifikatsiya protokoli takroriy hujumlarning (replay attack) oldini olish uchun 88-portda KDC, TGT chiptalari va vaqt tamg'alaridan foydalanadi?",
            "options_en": [
                "NTLMv2 Challenge-Response",
                "PAP (Password Authentication Protocol)",
                "SAML 2.0 Web Federation",
                "Kerberos Authentication Protocol (Port 88)"
            ],
            "options_uz": [
                "NTLMv2 so'rov-javob mexanizmi",
                "PAP (Ochiq parolli protokol)",
                "SAML 2.0 veb federatsiyasi",
                "Kerberos autentifikatsiya protokoli (Port 88)"
            ],
            "correct": 3,
            "explanation_en": "Kerberos operates on TCP/UDP Port 88. It uses symmetric cryptography, KDC ticketing (AS and TGS), and synchronized system clocks (±5 minutes) to eliminate credential transmission and thwart replay attacks.",
            "explanation_uz": "Kerberos TCP/UDP 88-portda ishlaydi. U KDC chiptalari (TGT) va sinxron vaqt tamg'alari orqali parollarni tarmoqqa chiqarmaydi va takroriy hujumlardan himoya qiladi."
        },
        {
            "q_en": "Which transport layer protocol and default port encrypts web client-server communications using TLS 1.3 to protect online financial transactions and passwords?",
            "q_uz": "Internetda bank to'lovlari va maxfiy parollarni himoya qilish uchun veb-mijoz va server o'rtasidagi trafigi qaysi protokol va port orqali TLS bilan shifrlanadi?",
            "options_en": [
                "HTTPS (Hypertext Transfer Protocol Secure - TCP Port 443)",
                "HTTP with Basic Authentication (TCP Port 80)",
                "FTP over SSL (TCP Port 21)",
                "SMTPS Mail Routing (TCP Port 465)"
            ],
            "options_uz": [
                "HTTPS (Hypertext Transfer Protocol Secure - TCP Port 443)",
                "HTTP ochiq veb protokoli (TCP Port 80)",
                "SSL orqali FTP (TCP Port 21)",
                "SMTPS pochta yo'naltirish (TCP Port 465)"
            ],
            "correct": 0,
            "explanation_en": "HTTPS runs on TCP Port 443, securing standard HTTP traffic via Transport Layer Security (TLS), guaranteeing data confidentiality, server authentication, and message integrity.",
            "explanation_uz": "HTTPS TCP 443-portda ishlaydi va TLS 1.3 orqali ma'lumotlar maxfiyligi (Confidentiality), server haqiqiyligi (Authentication) va butunligini (Integrity) ta'minlaydi."
        },
        {
            "q_en": "A systems engineer needs to securely transfer firmware images to remote servers through firewalls. Which protocol runs entirely inside an encrypted SSH session over a single port?",
            "q_uz": "Tizim muhandisi fayrlarni fayrvol orqali xavfsiz uzatishi kerak. Qaysi fayl uzatish protokoli bitta TCP 22-portdagi SSH shifrlangan seansi ichida ishlaydi?",
            "options_en": [
                "FTPS Implicit Mode (Port 990)",
                "FTP Active Mode (Port 20 and 21)",
                "SFTP (SSH File Transfer Protocol - Port 22)",
                "TFTP (Trivial File Transfer - UDP Port 69)"
            ],
            "options_uz": [
                "FTPS yashirin rejimi (Port 990)",
                "FTP faol rejimi (Port 20 va 21)",
                "SFTP (SSH File Transfer Protocol - Port 22)",
                "TFTP (UDP 69-port)"
            ],
            "correct": 2,
            "explanation_en": "SFTP is an extension of SSH running entirely over TCP Port 22. Unlike FTPS (which requires multiple data and control ports over SSL/TLS), SFTP requires only port 22 open on the firewall.",
            "explanation_uz": "SFTP protokoli to'liq SSH ichida, faqat TCP 22-portda ishlaydi. FTPS kabi ko'plab portlarni ochishni talab qilmaydi, shu sababli fayrvollardan oson va xavfsiz o'tadi."
        },
        {
            "q_en": "Which protocol extension protects DNS servers (Port 53) from cache poisoning, DNS hijacking, and spoofed address lookups by digitally signing DNS records?",
            "q_uz": "DNS serverlarini (Port 53) keshni zaharlash (cache poisoning) va soxta manzillarni kiritishdan himoya qilish uchun qaysi raqamli imzolash kengaytmasi ishlatiladi?",
            "options_en": [
                "DoH (DNS over HTTPS on Port 443)",
                "DNSSEC (Domain Name System Security Extensions - Port 53)",
                "SNMPv3 Trap Notifications (Port 162)",
                "NTP Authentication (Port 123)"
            ],
            "options_uz": [
                "DoH (Port 443 dagi DNS over HTTPS)",
                "DNSSEC (DNS Xavfsizlik Kengaytmalari - Port 53)",
                "SNMPv3 Trap bildirishnomalari (Port 162)",
                "NTP autentifikatsiyasi (Port 123)"
            ],
            "correct": 1,
            "explanation_en": "DNSSEC adds cryptographic digital signatures to DNS query responses. This allows client resolvers to verify origin authenticity and integrity, preventing DNS cache poisoning.",
            "explanation_uz": "DNSSEC barcha DNS yozuvlariga kriptografik raqamli imzo qo'yadi. Bu mijozga javob haqiqatan ham rasmiy DNS serverdan kelganini va yo'lda o'zgartirilmaganini tekshirish imkonini beradi."
        },
        {
            "q_en": "When investigating a multi-stage cyber attack across firewalls, servers, and endpoints in a SIEM, which protocol and port is vital for ensuring accurate temporal correlation of log events?",
            "q_uz": "SIEM tizimida turli serverlar va fayrvollardan kelgan loglarni vaqt bo'yicha to'g'ri taqqoslash va kiberhujum xronologiyasini tuzish uchun qaysi protokol va port zarur?",
            "options_en": [
                "Syslog over UDP Port 514",
                "SNMP over UDP Port 161",
                "DHCP over UDP Port 67",
                "NTP (Network Time Protocol) over UDP Port 123"
            ],
            "options_uz": [
                "UDP 514-portdagi Syslog",
                "UDP 161-portdagi SNMP",
                "UDP 67-portdagi DHCP",
                "NTP (Network Time Protocol) over UDP Port 123"
            ],
            "correct": 3,
            "explanation_en": "NTP (Network Time Protocol) operates over UDP Port 123. Uniform clock synchronization across all infrastructure hosts is essential for forensic timeline reconstruction and SIEM rule correlation.",
            "explanation_uz": "NTP (UDP 123-port) barcha server va qurilmalarning soatini millisekundgacha sinxronlaydi. Busiz kiberhodisani tergov qilishda qaysi voqea avval sodir bo'lganini aniqlab bo'lmaydi."
        },
        {
            "q_en": "A network administrator must configure routers and switches for remote health monitoring without exposing community strings in cleartext. Which version of SNMP provides both authentication and AES encryption?",
            "q_uz": "Administrator marshrutizatorlarni masofadan nazorat qilishda parollar ochiq uzatilmasligi uchun SNMP protokolining qaysi xavfsiz versiyasidan foydalanishi lozim?",
            "options_en": [
                "SNMPv3 (Simple Network Management Protocol v3 - UDP Port 161)",
                "SNMPv1 with Read-Only Community String",
                "SNMPv2c with 64-bit Counters",
                "Telnet with Enable Secret Password"
            ],
            "options_uz": [
                "SNMPv3 (Xavfsiz tarmoq monitoringi - UDP Port 161)",
                "SNMPv1 ochiq matnli versiyasi",
                "SNMPv2c kengaytirilgan hisoblagichlari",
                "Telnet maxfiy paroli"
            ],
            "correct": 0,
            "explanation_en": "SNMPv3 (UDP Port 161) incorporates the User-based Security Model (USM), offering Message Integrity (HMAC-SHA), Authentication, and Privacy (AES-128/256 payload encryption).",
            "explanation_uz": "SNMPv3 UDP 161-portda ishlaydi va oldingi versiyalardan (v1/v2c) farqli o'laroq, foydalanuvchi hisobi, SHA autentifikatsiyasi va AES shifrlash orqali to'liq maxfiylikni ta'minlaydi."
        },
        {
            "q_en": "An enterprise uses Microsoft Remote Desktop Protocol (RDP) on TCP Port 3389. To prevent unauthorized attackers from establishing a pre-authentication session connection, which feature must be enabled?",
            "q_uz": "Korxona TCP 3389-portdagi RDP orqali ishlaydi. Hujumchilar to'liq seans ochmasdan oldin foydalanuvchini autentifikatsiya qilish uchun qaysi funksiya yoqilishi shart?",
            "options_en": [
                "Telnet Fallback Mode",
                "Anonymous Session Brokering",
                "NLA (Network Level Authentication)",
                "VNC Compatibility Layer"
            ],
            "options_uz": [
                "Telnet zaxira rejimi",
                "Anonim seanslar vositachisi",
                "NLA (Network Level Authentication)",
                "VNC moslik qatlami"
            ],
            "correct": 2,
            "explanation_en": "Network Level Authentication (NLA) forces client authentication via CredSSP prior to launching the full RDP session and GUI, drastically reducing vulnerability to RDP-based exploits (such as BlueKeep) and DoS attacks.",
            "explanation_uz": "NLA (Network Level Authentication) foydalanuvchi RDP oynasini ochishidan oldinroq uning shaxsini tekshiradi (CredSSP). Bu serverni BlueKeep kabi xavfli zaifliklar va DoS hujumlardan asraydi."
        },
        {
            "q_en": "A mobile workforce needs to retrieve corporate email across multiple devices while keeping mail messages synchronized on the central mail server. Which encrypted protocol should be deployed?",
            "q_uz": "Xodimlar turli xil smartfon va noutbuklarda o'z korporativ pochtalarini markaziy server bilan to'liq sinxron holatda o'qishlari uchun qaysi shifrlangan protokol qo'llaniladi?",
            "options_en": [
                "POP3S over TCP Port 995",
                "IMAPS over TCP Port 993",
                "SMTPS over TCP Port 465",
                "SMTP STARTTLS over TCP Port 587"
            ],
            "options_uz": [
                "TCP 995-portdagi POP3S",
                "TCP 993-portdagi IMAPS",
                "TCP 465-portdagi SMTPS",
                "TCP 587-portdagi SMTP STARTTLS"
            ],
            "correct": 1,
            "explanation_en": "IMAPS (Internet Message Access Protocol Secure) operates on TCP Port 993 over TLS. Unlike POP3 (which downloads and removes mail), IMAP keeps mail stored and organized in server folders for multi-device sync.",
            "explanation_uz": "IMAPS TCP 993-portda TLS orqali ishlaydi. U xatlarni serverda saqlaydi, bu esa foydalanuvchiga telefonida ham, kompyuterida ham bir xil papkalar va xatlarni ko'rish imkonini beradi."
        },
        {
            "q_en": "Upon detecting an active ransomware outbreak spreading from a financial analyst workstation, what is the FIRST action the Security Operations Center (SOC) incident response team must execute?",
            "q_uz": "Xodimning kompyuterida faol ransomware (tovlamachi virus) aniqlanganda, SOC hodisani bartaraf etish guruhi birinchi navbatda qanday harakat qilishi lozim?",
            "options_en": [
                "Immediately format the infected hard drive",
                "Shut down and power off the machine",
                "Email the entire organization warning them of the file name",
                "Containment: Disconnect the host from the network without powering off"
            ],
            "options_uz": [
                "Zararlangan qattiq diskni darhol formatlash",
                "Kompyuterni elektrdan uzib darhol o'chirib qo'yish",
                "Barcha xodimlarga ogohlantirish xati yozish",
                "Containment: Kompyuterni o'chirmasdan, faqat tarmoqdan uzish (izolyatsiya)"
            ],
            "correct": 3,
            "explanation_en": "Under NIST SP 800-61, Containment halts lateral movement immediately. Disconnecting network cables or disabling Wi-Fi isolates the host while preserving volatile RAM memory, encryption keys, and active process forensic evidence.",
            "explanation_uz": "NIST SP 800-61 bo'yicha birinchi chora — Containment (Izolyatsiya). Kompyuterni o'chirish mumkin emas, chunki o'chganda operativ xotiradagi (RAM) barcha virus dalillari va shifrlash kalitlari yo'qoladi."
        },
        {
            "q_en": "In digital forensics, when investigating a compromised database server, which data source must be acquired FIRST according to the Order of Volatility (RFC 3227)?",
            "q_uz": "Kiber-kriminalistika (forensics) sohasida RFC 3227 Order of Volatility bo'yicha eng birinchi navbatda qaysi dalil nusxasi olinishi shart?",
            "options_en": [
                "CPU registers, cache, and system memory (RAM)",
                "Solid State Disk (SSD) and Hard Drives (HDD)",
                "Remote system logging servers",
                "Archival backup tapes and optical media"
            ],
            "options_uz": [
                "CPU registrlari, kesh va operativ xotira (RAM)",
                "SSD va qattiq disklar (HDD)",
                "Tashqi Syslog serveridagi loglar",
                "Arxiv zaxira lentalari va CD/DVD disklar"
            ],
            "correct": 0,
            "explanation_en": "RFC 3227 defines the Order of Volatility: CPU registers and cache are most volatile, followed by system RAM, temporary file systems, hard disks, and archival media. Powering down causes irreversible data loss.",
            "explanation_uz": "RFC 3227 bo'yicha eng tez yo'qoladigan ma'lumotlar bu — CPU registrlari, kesh va RAM xotiradir. Ular elektr ta'minotiga bog'liq bo'lib, o'chirilganda butunlay o'chib ketadi."
        },
        {
            "q_en": "A risk assessor calculates that a distributed denial-of-service (DDoS) incident costs $50,000 per occurrence (SLE) and expects it to occur twice every year (ARO = 2). What is the formula and resulting Annualized Loss Expectancy (ALE)?",
            "q_uz": "Kompaniya hisob-kitoblariga ko'ra, bitta DDoS hujumi 50,000 dollar zarar keltiradi (SLE) va yiliga 2 marta sodir bo'lishi mumkin (ARO = 2). ALE formulasi va uning yillik qiymati qanday?",
            "options_en": [
                "ALE = SLE / ARO ($25,000)",
                "ALE = Asset Value x Exposure Factor ($50,000)",
                "ALE = SLE x ARO ($100,000)",
                "ALE = ARO + SLE ($50,002)"
            ],
            "options_uz": [
                "ALE = SLE / ARO ($25,000)",
                "ALE = Asset Value x Exposure Factor ($50,000)",
                "ALE = SLE x ARO ($100,000)",
                "ALE = ARO + SLE ($50,002)"
            ],
            "correct": 2,
            "explanation_en": "ALE = Single Loss Expectancy (SLE) x Annualized Rate of Occurrence (ARO). In this scenario, $50,000 x 2 = $100,000 expected annualized risk exposure.",
            "explanation_uz": "Kompaniyaning yillik kutilgan zarari: ALE = SLE x ARO. Ya'ni 50,000$ x 2 = yiliga 100,000$ kutilgan zarar. Xavfsizlik byudjeti ushbu summadan oshmasligi kerak."
        },
        {
            "q_en": "An architect is selecting an encryption algorithm to protect terabytes of customer database records stored on disk arrays (data at rest). Which cipher is best suited for fast, secure bulk encryption?",
            "q_uz": "Ma'lumotlar omboridagi terabaytlab mijozlar bazasini diskda (data at rest) tezkor va ishonchli shifrlash uchun qaysi algoritm eng mos keladi?",
            "options_en": [
                "RSA-4096 Asymmetric Encryption",
                "AES-256 (Advanced Encryption Standard - Symmetric)",
                "Diffie-Hellman Ephemeral (DHE)",
                "SHA-3 Cryptographic Hash"
            ],
            "options_uz": [
                "RSA-4096 asimmetrik shifrlash",
                "AES-256 (Advanced Encryption Standard - Simmetrik)",
                "Diffie-Hellman Ephemeral (DHE)",
                "SHA-3 kriptografik xeshlash"
            ],
            "correct": 1,
            "explanation_en": "AES (Advanced Encryption Standard) is a symmetric block cipher specifically engineered for massive computational efficiency and hardware acceleration, making it the industry standard for bulk storage and drive encryption.",
            "explanation_uz": "AES-256 simmetrik blokli shifrlash algoritmi bo'lib, juda katta hajmdagi ma'lumotlarni protsessor apparat tezlatkichlari orqali bir necha barobar tez va buzilmas darajada shifrlaydi."
        },
        {
            "q_en": "A network administrator needs to manage administrator logins across hundreds of Cisco core switches. Which AAA protocol separates authentication and authorization while encrypting the ENTIRE packet payload over TCP Port 49?",
            "q_uz": "Tarmoq administratori barcha asosiy sviychelarga kirishni markazlashtirishi lozim. Qaysi AAA protokoli autentifikatsiya va avtorizatsiyani ajratadi hamda TCP 49-portda paketning butun tanasini shifrlaydi?",
            "options_en": [
                "RADIUS over UDP Port 1812",
                "Diameter over TCP Port 3868",
                "LDAP over TCP Port 389",
                "TACACS+ over TCP Port 49"
            ],
            "options_uz": [
                "UDP 1812-portdagi RADIUS",
                "TCP 3868-portdagi Diameter",
                "TCP 389-portdagi LDAP",
                "TCP 49-portdagi TACACS+"
            ],
            "correct": 3,
            "explanation_en": "TACACS+ (Terminal Access Controller Access-Control System Plus) operates over reliable TCP Port 49, separates Authentication from Authorization (fine-grained per-command control), and encrypts the entire packet payload (unlike RADIUS, which only encrypts passwords).",
            "explanation_uz": "TACACS+ ishonchli TCP 49-portda ishlaydi. RADIUS dan farqli o'laroq, u butun tarmoq paketini shifrlaydi va har bir alohida buyruq uchun ruxsatlarni (Authorization) cheklash imkonini beradi."
        },
        {
            "q_en": "When a web browser connects to an HTTPS server, which protocol allows the browser to query the Certificate Authority (CA) in real time to immediately determine if a specific SSL/TLS certificate has been revoked?",
            "q_uz": "Veb brauzer serverga ulanganda, ushbu SSL/TLS sertifikati bekor qilingan (revoked) yoki yo'qligini darhol real vaqt rejimida tekshirish uchun qaysi protokol ishlatiladi?",
            "options_en": [
                "OCSP (Online Certificate Status Protocol)",
                "CRL (Certificate Revocation List)",
                "CSR (Certificate Signing Request)",
                "SAN (Subject Alternative Name)"
            ],
            "options_uz": [
                "OCSP (Online Certificate Status Protocol)",
                "CRL (Bekor qilingan sertifikatlar ro'yxati)",
                "CSR (Sertifikatga ariza berish)",
                "SAN (Qo'shimcha domenlar nomi)"
            ],
            "correct": 0,
            "explanation_en": "OCSP (Online Certificate Status Protocol) queries the CA revocation database in real time for a single certificate serial number. This avoids the latency, bandwidth overhead, and caching delays of downloading massive Certificate Revocation Lists (CRLs).",
            "explanation_uz": "OCSP real vaqt rejimida aynan o'sha bitta sertifikat holatini tekshiradi. Bu butun boshli katta CRL ro'yxatini yuklab olish va eskirib qolish muammolarini bartaraf qiladi."
        },
        {
            "q_en": "An organization deploys enterprise VoIP telephony and video conferencing. While SIP handles call setup on Port 5060/5061, which protocol encrypts the actual real-time audio and video conversation packets?",
            "q_uz": "Korxona VoIP telefoniyani joriy qildi. Qo'ng'iroqni ulashni SIP (5060/5061) bajarsa, suhbatning ovoz va video oqimini tarmoqda ushlab eshitib olmasliklari uchun qaysi protokol shifrlaydi?",
            "options_en": [
                "RTP (Real-time Transport Protocol)",
                "H.323 Video Standard",
                "SRTP (Secure Real-time Transport Protocol)",
                "SNMPv3 Management Protocol"
            ],
            "options_uz": [
                "RTP (shifrlanmagan audio oqim)",
                "H.323 video standarti",
                "SRTP (Xavfsiz audio va video oqim protokoli)",
                "SNMPv3 monitoring protokoli"
            ],
            "correct": 2,
            "explanation_en": "SRTP (Secure Real-time Transport Protocol) encrypts the underlying voice and video payloads using AES, providing confidentiality, message authentication, and replay protection for real-time media streams.",
            "explanation_uz": "SRTP protokoli real vaqtdagi ovoz va videoni AES yordamida shifrlaydi. Busiz tajovuzkorlar Wireshark orqali korxona rahbarlarining telefon suhbatlarini yozib olishi mumkin bo'ladi."
        },
        {
            "q_en": "An enterprise hosts external-facing eCommerce web servers and public mail gateways. In network architecture design, where should these internet-exposed assets be located to safeguard the internal LAN?",
            "q_uz": "Kompaniyaning tashqi dunyoga ochiq bo'lgan veb-sayti va pochta serverlari ichki korporativ tarmoqni (LAN) himoya qilish maqsadida arxitekturaning qaysi qismiga joylashtirilishi shart?",
            "options_en": [
                "Internal Active Directory Core Subnet",
                "DMZ (Demilitarized Zone) Screened Subnet",
                "Air-Gapped Secure Vault",
                "Management VLAN 1"
            ],
            "options_uz": [
                "Ichki Active Directory asosiy tarmog'i",
                "DMZ (Demilitarized Zone - Demilitarizatsiyalangan zona)",
                "Tarmoqdan to'liq uzilgan maxfiy xona",
                "Boshqaruv VLAN 1"
            ],
            "correct": 1,
            "explanation_en": "A DMZ (Demilitarized Zone or perimeter network) places internet-facing systems between external and internal firewalls. If a web server is compromised, the attacker is blocked from directly penetrating the private corporate LAN.",
            "explanation_uz": "DMZ tashqi va ichki fayrvollar o'rtasidagi bufer hududdir. Agar tashqi veb server buzilsa ham, xaker ichki korporativ kompyuterlar va ma'lumotlar bazasiga to'g'ridan-to'g'ri o'ta olmaydi."
        },
        {
            "q_en": "A cybersecurity analyst needs a centralized security operations solution that aggregates event logs from firewalls, servers, routers, and EDR agents to detect multi-stage attack patterns using automated correlation rules. What tool is this?",
            "q_uz": "Turli fayrvollar, serverlar va antivirus agentlarining millionlab loglarini bir joyga yig'ib, tahlil qilib, murakkab kiberhujumlarni real vaqtda aniqlovchi xavfsizlik platformasi nima deyiladi?",
            "options_en": [
                "Wireshark Packet Sniffer",
                "Vulnerability Scanner (Nessus)",
                "Honeypot Decoy System",
                "SIEM (Security Information and Event Management)"
            ],
            "options_uz": [
                "Wireshark paket analizatori",
                "Nessus zaifliklarni skanerlovchi",
                "Honeypot aldovchi qopqoni",
                "SIEM (Security Information and Event Management)"
            ],
            "correct": 3,
            "explanation_en": "A SIEM (such as Splunk, Microsoft Sentinel, or QRadar) aggregates, normalizes, and correlates log data from across the enterprise, alerting analysts when disparate log events together indicate an active threat.",
            "explanation_uz": "SIEM (Security Information and Event Management) butun korxona bo'ylab loglarni birlashtiradi, korrelyatsiya qiladi va turli xil shubhali harakatlar yig'indisidan xavfli hujumni aniqlab, xabar beradi."
        },
        {
            "q_en": "The Chief Financial Officer (CFO) receives an urgent, highly customized email appearing to originate from the CEO, requesting an immediate $250,000 wire transfer for an acquisition. What specific social engineering attack is this?",
            "q_uz": "Kompaniya moliya direktoriga (CFO) go'yoki bosh direktor (CEO) nomidan shoshilinch ravishda 250,000 dollar o'tkazishni talab qiluvchi juda puxta tuzilgan xat keldi. Bu qanday hujum turi?",
            "options_en": [
                "Whaling (Executive-targeted Phishing)",
                "Broad Spray Phishing",
                "Watering Hole Attack",
                "Vishing Phone Scam"
            ],
            "options_uz": [
                "Whaling (Rahbarlarga qaratilgan maxsus fishing)",
                "Ommaviy oddiy fishing",
                "Watering Hole hujumi",
                "Vishing (telefon firibgarligi)"
            ],
            "correct": 0,
            "explanation_en": "Whaling is a specialized spear phishing attack directed specifically against high-profile executives ('whales' such as the CEO, CFO, or Board Members) with the aim of authorizing large wire transfers or disclosing confidential IP.",
            "explanation_uz": "Whaling — yuqori lavozimli rahbarlarni (CEO, CFO) nishonga olgan maxsus nayrangli fishing hujumidir. U ko'pincha katta pul mablag'larini o'g'irlash uchun puxta o'rganilib amalga oshiriladi."
        },
        {
            "q_en": "Which foundational security philosophy assumes that threats already exist inside the enterprise network perimeter and requires explicit, continuous verification of every user, device, and transaction?",
            "q_uz": "Qaysi zamonaviy xavfsizlik arxitekturasi 'Hujumchi allaqachon ichki tarmoqda bo'lishi mumkin' degan qoidaga tayanadi va har bir foydalanuvchi hamda qurilmani doimiy tekshirishni talab qiladi?",
            "options_en": [
                "Castle-and-Moat Perimeter Security",
                "Single-Sign-On Open Trust",
                "Zero Trust Architecture ('Never trust, always verify')",
                "Implicit Network Trust Model"
            ],
            "options_uz": [
                "Qal'a va xandaq an'anaviy mudofaasi",
                "Bir martalik kirish ochiq ishonchi",
                "Zero Trust Arxitekturasi ('Hech qachon ishonma, doim tekshir')",
                "Odatiy ichki tarmoq ishonch modeli"
            ],
            "correct": 2,
            "explanation_en": "Zero Trust operates on the guiding principle: 'Never trust, always verify'. Rather than trusting internal IP addresses implicitly, it requires strict identity verification, least privilege, and microsegmentation for all access requests.",
            "explanation_uz": "Zero Trust arxitekturasi 'Hech qachon ishonma, har doim tekshir' shioriga asoslanadi. Ichki tarmoqdagi hech bir kompyuterga avtomatik ishonch berilmaydi, har bir ulanish qayta tekshiriladi."
        },
        {
            "q_en": "In business continuity and disaster recovery planning, which metric defines the maximum acceptable amount of data loss measured in time (e.g., maximum 4 hours of database transactions lost since the last backup)?",
            "q_uz": "Biznesning uzluksizligi va falokatdan tiklash rejasida (BC/DR) oxirgi zaxira nusxadan boshlab yo'qotilishi mumkin bo'lgan maksimal ma'lumotlar vaqti qaysi ko'rsatkich bilan belgilanadi?",
            "options_en": [
                "RTO (Recovery Time Objective)",
                "RPO (Recovery Point Objective)",
                "MTBF (Mean Time Between Failures)",
                "MTTR (Mean Time to Repair)"
            ],
            "options_uz": [
                "RTO (Tiklash uchun ketadigan vaqt)",
                "RPO (Maksimal yo'qotishga ruxsat etilgan ma'lumot vaqti)",
                "MTBF (Ishdan chiqishlar orasidagi o'rtacha vaqt)",
                "MTTR (Ta'mirlash uchun ketadigan vaqt)"
            ],
            "correct": 1,
            "explanation_en": "RPO (Recovery Point Objective) defines the maximum allowable data loss measured backward in time from the moment of disruption. RTO (Recovery Time Objective) defines how long systems can remain offline before restoration.",
            "explanation_uz": "RPO (Recovery Point Objective) ma'lumotlar yo'qotilishi mumkin bo'lgan maksimal vaqtni (masalan, so'nggi 4 soatlik ma'lumot) ko'rsatadi. RTO esa tizimni qancha vaqt ichida qayta ishga tushirish kerakligini bildiradi."
        },
        {
            "q_en": "Under the Cloud Computing Shared Responsibility Model, in which service deployment model is the customer solely responsible for configuring, updating, and patching the guest operating system?",
            "q_uz": "Bulutli hisoblashning Birgalikdagi Mas'uliyat Modelida (Shared Responsibility Model) qaysi turida mijoz virtual mashinaning Operatsion Tizimini (OS) o'zi yangilashi va yamoqlar qo'yishi shart?",
            "options_en": [
                "SaaS (Software as a Service)",
                "PaaS (Platform as a Service)",
                "FaaS (Function as a Service / Serverless)",
                "IaaS (Infrastructure as a Service)"
            ],
            "options_uz": [
                "SaaS (Dasturiy ta'minot xizmati)",
                "PaaS (Platforma xizmati)",
                "FaaS (Serverless funksiyalar)",
                "IaaS (Infratuzilma xizmati)"
            ],
            "correct": 3,
            "explanation_en": "In Infrastructure as a Service (IaaS, like AWS EC2 or Azure VMs), the cloud provider manages hardware and hypervisors, while the customer retains full responsibility for the guest OS, patches, middleware, and applications.",
            "explanation_uz": "IaaS (Infrastructure as a Service) modelida bulut provayderi faqat apparat ta'minotiga javob beradi. Virtual mashinadagi Windows/Linux operatsion tizimi va uning xavfsizlik yangilanishlariga mijozning o'zi javobgar bo'ladi."
        }
    ]
};
