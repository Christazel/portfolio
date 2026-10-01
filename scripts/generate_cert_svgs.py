import os

certs = [
    {
        "filename": "dbs-coding-camp.svg",
        "org": "DBS FOUNDATION × DICODING",
        "type": "CERTIFICATE OF GRADUATION",
        "title": "Coding Camp 2025: Front-End & Back-End Developer",
        "subtitle": "Intensive Web & Backend Development Cohort (910 Hours) • GPA 91.3",
        "date": "JULY 2025",
        "code": "DBS-CC25-FEBE-9130",
        "primary_color": "#FF3366",
        "secondary_color": "#800020",
        "badge_color": "#FF3366",
        "icon_label": "DBS",
    },
    {
        "filename": "dicoding-react.svg",
        "org": "DICODING INDONESIA",
        "type": "SERTIFIKAT KELULUSAN",
        "title": "Belajar Membuat Aplikasi Web dengan React",
        "subtitle": "Building Modern Interactive Web Applications with React.js & Hooks",
        "date": "JUNE 2025",
        "code": "DICODING-RCT-5582",
        "primary_color": "#2D3E50",
        "secondary_color": "#1E293B",
        "badge_color": "#0070F3",
        "icon_label": "REACT",
    },
    {
        "filename": "dicoding-backend.svg",
        "org": "DICODING INDONESIA",
        "type": "SERTIFIKAT KELULUSAN",
        "title": "Belajar Membuat Aplikasi Back-End untuk Pemula",
        "subtitle": "RESTful API Architecture, Node.js, Hapi Framework & Testing with Postman",
        "date": "MAY 2025",
        "code": "DICODING-BE-7719",
        "primary_color": "#1E3A5F",
        "secondary_color": "#0B192C",
        "badge_color": "#10B981",
        "icon_label": "NODE",
    },
    {
        "filename": "dicoding-javascript.svg",
        "org": "DICODING INDONESIA",
        "type": "SERTIFIKAT KELULUSAN",
        "title": "Belajar Dasar Pemrograman JavaScript",
        "subtitle": "Modern ES6+, Asynchronous JavaScript, OOP & Functional Paradigms",
        "date": "APRIL 2025",
        "code": "DICODING-JS-3391",
        "primary_color": "#B45309",
        "secondary_color": "#78350F",
        "badge_color": "#F59E0B",
        "icon_label": "JS",
    },
    {
        "filename": "dicoding-git.svg",
        "org": "DICODING INDONESIA",
        "type": "SERTIFIKAT KELULUSAN",
        "title": "Belajar Dasar Git dengan GitHub",
        "subtitle": "Version Control, Branching Strategy, Pull Requests & Team Collaboration",
        "date": "MARCH 2025",
        "code": "DICODING-GIT-1824",
        "primary_color": "#BE123C",
        "secondary_color": "#881337",
        "badge_color": "#F43F5E",
        "icon_label": "GIT",
    },
    {
        "filename": "dicoding-web.svg",
        "org": "DICODING INDONESIA",
        "type": "SERTIFIKAT KELULUSAN",
        "title": "Belajar Dasar Pemrograman Web",
        "subtitle": "Semantic HTML5, Responsive Modern CSS, Flexbox & Web Standards",
        "date": "FEBRUARY 2025",
        "code": "DICODING-WEB-9921",
        "primary_color": "#0F766E",
        "secondary_color": "#115E59",
        "badge_color": "#14B8A6",
        "icon_label": "HTML",
    },
    {
        "filename": "uty-degree.svg",
        "org": "UNIVERSITAS TEKNOLOGI YOGYAKARTA",
        "type": "IJAZAH & TRANSKRIP AKADEMIK",
        "title": "Bachelor of Computer Science (Informatics)",
        "subtitle": "Cum Laude Honors • GPA 3.69 / 4.00 • Software Engineering Specialization",
        "date": "APRIL 2026",
        "code": "UTY-INF-2026-369",
        "primary_color": "#1E3A8A",
        "secondary_color": "#172554",
        "badge_color": "#3B82F6",
        "icon_label": "UTY",
    },
    {
        "filename": "sinta-journal.svg",
        "org": "INTECOM JOURNAL (SINTA 4 ACCREDITED)",
        "type": "CERTIFICATE OF PUBLICATION",
        "title": "First Author – Web-Mobile Management System Research",
        "subtitle": "Nationally Accredited SINTA 4 Journal of Information Technology & Computer Science",
        "date": "2026",
        "code": "INTECOM-S4-17317",
        "primary_color": "#4338CA",
        "secondary_color": "#312E81",
        "badge_color": "#6366F1",
        "icon_label": "SINTA",
    },
]

out_dir = r"C:\Users\User\.gemini\antigravity-ide\scratch\portfolio\public\asset\certificates"
os.makedirs(out_dir, exist_ok=True)

for c in certs:
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" style="background:#0a0a0c; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141418"/>
      <stop offset="50%" stop-color="#0e0e12"/>
      <stop offset="100%" stop-color="#08080a"/>
    </linearGradient>
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{c['primary_color']}"/>
      <stop offset="100%" stop-color="{c['secondary_color']}"/>
    </linearGradient>
    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{c['badge_color']}"/>
      <stop offset="100%" stop-color="{c['secondary_color']}"/>
    </linearGradient>
    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>
    </pattern>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="rgba(0,0,0,0.5)"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="800" height="600" fill="url(#bgGrad)"/>
  <rect width="800" height="600" fill="url(#gridPattern)"/>

  <!-- Certificate Paper Frame -->
  <rect x="28" y="28" width="744" height="544" rx="20" fill="#121216" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" filter="url(#cardShadow)"/>
  
  <!-- Inner Border Frame with Corner Accents -->
  <rect x="42" y="42" width="716" height="516" rx="14" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <rect x="48" y="48" width="704" height="504" rx="10" fill="none" stroke="{c['badge_color']}" stroke-opacity="0.25" stroke-width="1.2" stroke-dasharray="6 4"/>

  <!-- Corner Geometric Ornaments -->
  <path d="M 42 70 L 42 42 L 70 42" fill="none" stroke="{c['badge_color']}" stroke-width="2.5"/>
  <path d="M 758 70 L 758 42 L 730 42" fill="none" stroke="{c['badge_color']}" stroke-width="2.5"/>
  <path d="M 42 530 L 42 558 L 70 558" fill="none" stroke="{c['badge_color']}" stroke-width="2.5"/>
  <path d="M 758 530 L 758 558 L 730 558" fill="none" stroke="{c['badge_color']}" stroke-width="2.5"/>

  <!-- Top Ribbon Badge (dicoding/institution ribbon style) -->
  <g transform="translate(640, 42)">
    <path d="M 0 0 L 56 0 L 56 95 L 28 80 L 0 95 Z" fill="url(#badgeGrad)"/>
    <circle cx="28" cy="40" r="18" fill="rgba(255,255,255,0.15)"/>
    <circle cx="28" cy="40" r="15" fill="#ffffff" fill-opacity="0.1"/>
    <text x="28" y="45" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">✓</text>
  </g>

  <!-- Organization Header -->
  <g transform="translate(70, 95)">
    <rect x="0" y="0" width="38" height="38" rx="8" fill="url(#primaryGrad)"/>
    <text x="19" y="24" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">{c['icon_label']}</text>
    <text x="50" y="18" font-size="14" font-weight="800" fill="#ffffff" letter-spacing="1.5">{c['org']}</text>
    <text x="50" y="34" font-size="10.5" font-weight="600" fill="{c['badge_color']}" letter-spacing="2">{c['type']}</text>
  </g>

  <!-- Divider Line -->
  <line x1="70" y1="155" x2="620" y2="155" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

  <!-- Recipient Presentation -->
  <text x="400" y="200" font-size="12" font-weight="500" fill="#9ca3af" text-anchor="middle" letter-spacing="2">THIS IS PROUDLY PRESENTED TO</text>
  <text x="400" y="245" font-size="28" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">YOHAN CHRISTAZEL JEFFRY</text>
  <line x1="220" y1="265" x2="580" y2="265" stroke="{c['badge_color']}" stroke-width="2" stroke-linecap="round"/>

  <!-- Course / Degree Title -->
  <text x="400" y="315" font-size="18" font-weight="700" fill="#f3f4f6" text-anchor="middle">{c['title']}</text>
  <text x="400" y="345" font-size="12.5" font-weight="400" fill="#9ca3af" text-anchor="middle">{c['subtitle']}</text>

  <!-- Bottom Verification Footer -->
  <line x1="70" y1="465" x2="730" y2="465" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

  <g transform="translate(70, 485)">
    <!-- QR Mockup -->
    <rect x="0" y="0" width="46" height="46" rx="6" fill="#1e1e24" stroke="rgba(255,255,255,0.1)"/>
    <rect x="6" y="6" width="12" height="12" fill="#ffffff"/>
    <rect x="28" y="6" width="12" height="12" fill="#ffffff"/>
    <rect x="6" y="28" width="12" height="12" fill="#ffffff"/>
    <rect x="24" y="24" width="6" height="6" fill="#ffffff"/>
    <rect x="32" y="32" width="6" height="6" fill="#ffffff"/>

    <text x="58" y="18" font-size="9" font-weight="600" fill="#71717a" letter-spacing="1">VERIFICATION CODE</text>
    <text x="58" y="35" font-size="12" font-weight="700" fill="#e4e4e7" letter-spacing="0.5">{c['code']}</text>
  </g>

  <!-- Issue Date -->
  <g transform="translate(620, 502)">
    <text x="110" y="0" font-size="9" font-weight="600" fill="#71717a" text-anchor="end" letter-spacing="1">ISSUE DATE</text>
    <text x="110" y="17" font-size="12" font-weight="700" fill="#e4e4e7" text-anchor="end">{c['date']}</text>
  </g>

  <!-- Signature Seal -->
  <g transform="translate(400, 505)">
    <circle cx="0" cy="0" r="18" fill="none" stroke="{c['badge_color']}" stroke-width="1.5" stroke-dasharray="3 2"/>
    <text x="0" y="4" font-size="9" font-weight="800" fill="{c['badge_color']}" text-anchor="middle" letter-spacing="1">VERIFIED</text>
  </g>
</svg>
"""
    filepath = os.path.join(out_dir, c["filename"])
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(svg.strip())
    print(f"Generated: {filepath}")
