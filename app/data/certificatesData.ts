export type CertificateCategory =
  | "All"
  | "Fullstack"
  | "Frontend"
  | "Backend"
  | "Tools"
  | "Academic";

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  validUntil: string;
  duration: string;
  score?: string;
  category: CertificateCategory;
  standard?: string;
  skills: string[];
  competencies: string[];
  description: string;
  credentialId: string;
  credentialUrl: string;
  image: string;
}

export const certificateCategories: CertificateCategory[] = [
  "All",
  "Fullstack",
  "Frontend",
  "Backend",
  "Tools",
  "Academic",
];

export const certificates: CertificateItem[] = [
  {
    id: "dicoding-pemrograman-software",
    title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
    issuer: "Dicoding Academy",
    issueDate: "11 Februari 2025",
    validUntil: "11 Februari 2028",
    duration: "9 Jam",
    score: "Nilai: 100/100",
    standard: "KBJI: 2512.03 • Indotask: 2512",
    category: "Fullstack",
    skills: [
      "Software Engineering",
      "HTML5",
      "CSS3",
      "JavaScript ES6",
      "Flowcharts",
      "Pseudocode",
      "KBJI 2512.03",
    ],
    competencies: [
      "Memahami kebutuhan aplikasi dari sisi pengguna dan spesifikasi teknis",
      "Membuat requirement aplikasi dan diagram alur",
      "Memodifikasi aplikasi perangkat lunak menggunakan HTML, CSS, dan JavaScript dasar",
      "Memahami dokumentasi pemrograman dan pengembangan software",
      "Memahami konsep dasar JavaScript ES6 (variabel, tipe data, pseudocode)",
    ],
    description:
      "Standar okupasi Pengembang Software KBJI 2512.03 & Indotask 2512. Memahami requirement teknis, diagram alur sistem, dan modifikasi antarmuka dengan HTML5, CSS3, serta JavaScript ES6 dasar (Nilai Akhir: 100).",
    credentialId: "2VX3KJG9JXYQ",
    credentialUrl: "https://www.dicoding.com/certificates/2VX3KJG9JXYQ",
    image: "/asset/certificates/dicoding-pemrograman-software.png",
  },
  {
    id: "dicoding-logika-pemrograman",
    title: "Pengenalan ke Logika Pemrograman (Programming Logic 101)",
    issuer: "Dicoding Academy",
    issueDate: "11 Februari 2025",
    validUntil: "11 Februari 2028",
    duration: "6 Jam",
    category: "Frontend",
    skills: [
      "Computational Thinking",
      "Algoritma",
      "Logic Gates",
      "Boolean Logic",
      "Problem Solving",
    ],
    competencies: [
      "Memahami konsep dasar logika pemrograman untuk pemecahan masalah software",
      "Computational Thinking: Dekomposisi masalah, Pengenalan pola, Abstraksi, Algoritma, Evaluasi solusi",
      "Implementasi Gerbang Logika lengkap: AND, OR, NOT, NAND, NOR, XOR, XNOR",
    ],
    description:
      "Fondasi logika pemrograman dan pemecahan masalah software development melalui computational thinking (dekomposisi, pola, abstraksi) serta analisis gerbang logika boolean lengkap.",
    credentialId: "QLZ93QJ6EZ5D",
    credentialUrl: "https://www.dicoding.com/certificates/QLZ93QJ6EZ5D",
    image: "/asset/certificates/dicoding-logika-pemrograman.png",
  },
  {
    id: "dicoding-dasar-git",
    title: "Belajar Dasar Git dengan GitHub",
    issuer: "Dicoding Academy",
    issueDate: "13 Februari 2025",
    validUntil: "13 Februari 2028",
    duration: "15 Jam",
    category: "Tools",
    skills: [
      "Git",
      "GitHub",
      "Version Control",
      "Branching & Merging",
      "Conflict Resolution",
      "Pull Requests",
      "Code Review",
    ],
    competencies: [
      "Mengelola kode & repository dengan Git (commit, checkout, branching)",
      "Melakukan branch merging dan resolusi konflik source code",
      "Kolaborasi tim profesional via GitHub: Forking, Squashing changes, Code review, Pull Request",
      "Membangun portofolio developer dan dokumentasi README profesional",
    ],
    description:
      "Pengelolaan source code modern, manajemen repository, branching workflow, conflict resolution, dan praktik kolaborasi tim developer profesional via GitHub (Pull Requests & Code Review).",
    credentialId: "JLX19WJOJP72",
    credentialUrl: "https://www.dicoding.com/certificates/JLX19WJOJP72",
    image: "/asset/certificates/dicoding-dasar-git.png",
  },
  {
    id: "dicoding-dasar-web",
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Academy",
    issueDate: "24 Februari 2025",
    validUntil: "24 Februari 2028",
    duration: "41 Jam",
    category: "Frontend",
    skills: [
      "Semantic HTML5",
      "CSS3",
      "Flexbox",
      "Responsive Layouts",
      "Box Model",
      "Media Queries",
      "Web Architecture",
    ],
    competencies: [
      "Memahami fundamental website, arsitektur client-server, dan tools pengembangan web",
      "Struktur semantik HTML5 (elemen semantik, generic elements, tables, inline & block)",
      "Teknik CSS3 modern (box model, positioning, shadows, layouting, media queries)",
      "Layout responsif multi-device menggunakan CSS Flexbox",
      "Proyek akhir: Membangun website responsif dengan semantic HTML dan teknik layouting murni",
    ],
    description:
      "Fundamental arsitektur web & client-server, penyusunan Semantic HTML5, styling CSS3 mendalam (box model, positioning, media queries), dan pembangunan website responsif dengan CSS Flexbox.",
    credentialId: "1RXYEQQV3ZVM",
    credentialUrl: "https://www.dicoding.com/certificates/1RXYEQQV3ZVM",
    image: "/asset/certificates/dicoding-dasar-web.png",
  },
  {
    id: "dicoding-javascript",
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Academy",
    issueDate: "08 Maret 2025",
    validUntil: "08 Maret 2028",
    duration: "46 Jam",
    category: "Fullstack",
    standard: "Standar Industri divalidasi oleh AWS",
    skills: [
      "JavaScript ES6+",
      "Node.js",
      "OOP",
      "Functional Programming",
      "Async/Await",
      "ECMAScript Modules",
      "AWS Standard",
    ],
    competencies: [
      "Menguasai dasar JavaScript untuk pengembangan web & backend Node.js divalidasi AWS",
      "Runtime Environment: Browser, Node.js, Bun, dan Deno untuk eksekusi kode lokal",
      "Struktur Data modern: Object, Array, Map, dan Set untuk manajemen data aplikasi",
      "Paradigma pemrograman: Object-Oriented Programming (OOP) & Functional Programming",
      "Proses Asynchronous: Callback, Promise, dan Async/Await",
      "Modularisasi kode menggunakan ECMAScript Module (ESM) & standar Code Quality",
    ],
    description:
      "Standar kompetensi industri divalidasi AWS. Menguasai runtime Node.js/Browser, struktur data modern (Map/Set), OOP, Functional Programming, asynchronous process (Promise/async-await), dan modularisasi kode (46 Jam Pembelajaran).",
    credentialId: "JLX19K9NGP72",
    credentialUrl: "https://www.dicoding.com/certificates/JLX19K9NGP72",
    image: "/asset/certificates/dicoding-javascript.png",
  },
  {
    id: "dicoding-frontend-pemula",
    title: "Belajar Membuat Front-End Web untuk Pemula",
    issuer: "Dicoding Academy",
    issueDate: "17 Maret 2025",
    validUntil: "17 Maret 2028",
    duration: "45 Jam",
    category: "Frontend",
    skills: [
      "DOM Manipulation",
      "Web Storage",
      "Event Handling",
      "BOM",
      "Interactive UI",
      "Frontend Development",
    ],
    competencies: [
      "Penerapan Browser Object Model (BOM) dan Document Object Model (DOM) pada web",
      "Teknik pemanipulasian DOM dinamis menggunakan JavaScript",
      "Interaktifitas elemen HTML melalui Event Listener & Event Handling",
      "Penyimpanan data lokal di sisi browser menggunakan Web Storage API (localStorage & sessionStorage)",
      "Proyek akhir: Membangun aplikasi web interaktif dengan manipulasi DOM dan persistence data via Web Storage",
    ],
    description:
      "Membangun aplikasi front-end web interaktif berstandar industri dengan teknik manipulasi DOM dinamis, penanganan Event interaktif, dan persistensi data lokal browser menggunakan Web Storage API (45 Jam Pembelajaran).",
    credentialId: "EYX4GMJ5JZDL",
    credentialUrl: "https://www.dicoding.com/certificates/EYX4GMJ5JZDL",
    image: "/asset/certificates/dicoding-frontend-pemula.png",
  },
  {
    id: "dicoding-fundamental-frontend",
    title: "Belajar Fundamental Front-End Web Development",
    issuer: "Dicoding Academy",
    issueDate: "23 April 2025",
    validUntil: "23 April 2028",
    duration: "80 Jam",
    category: "Frontend",
    standard: "Google Developers Authorized Training Partner",
    skills: [
      "Web Components",
      "Shadow DOM",
      "CSS Grid",
      "Webpack",
      "REST API",
      "Fetch API",
      "NPM",
      "ES6 Modules",
    ],
    competencies: [
      "Kurikulum resmi Google Developers Authorized Training Partner",
      "HTML Form Lanjutan & sintaksis modern JavaScript ES6+ (destructuring, spread/rest, arrow function, classes, promises)",
      "Teknik layouting tingkat lanjut dengan CSS Grid kompleks",
      "Membangun komponen UI kustom, reusable, dan terenkapsulasi dengan Web Component & Shadow DOM",
      "Manajemen dependensi aplikasi web via NPM package manager (dev & prod dependencies)",
      "Module Bundler Webpack sebagai build tool untuk membundel berkas JavaScript menjadi berkas produksi optimal",
      "Integrasi transaksi data asynchronous via Fetch API & REST API (GET, POST, PUT, DELETE)",
      "Proyek Akhir: Membangun web app modular dengan Webpack, Web Component, dan konsumsi REST API",
    ],
    description:
      "Kurikulum Google Developers Partner. Arsitektur front-end modern: Web Components & Shadow DOM, CSS Grid, module bundler Webpack, manajemen NPM dependencies, serta integrasi asynchronous RESTful API via Fetch API (80 Jam Pembelajaran).",
    credentialId: "0LZ0RKLLNP65",
    credentialUrl: "https://www.dicoding.com/certificates/0LZ0RKLLNP65",
    image: "/asset/certificates/dicoding-fundamental-frontend.png",
  },
  {
    id: "dicoding-financial-literacy",
    title: "Financial Literacy 101",
    issuer: "DBS Foundation & Dicoding",
    issueDate: "26 April 2025",
    validUntil: "26 April 2028",
    duration: "5 Jam",
    category: "Tools",
    standard: "Coding Camp powered by DBS Foundation 2025",
    skills: [
      "Financial Literacy",
      "Personal Finance",
      "Financial Planning",
      "Investment Basics",
      "DBS Foundation",
    ],
    competencies: [
      "Prinsip dasar literasi finansial bagi talenta teknologi dalam Coding Camp DBS Foundation",
      "Decoding Your Financial Future: Pengelolaan keuangan harian & perencanaan jangka panjang",
      "Investing for Your Future: Konsep investasi dasar untuk mencapai kemandirian finansial",
      "Pengambilan keputusan finansial strategis untuk profesional developer",
    ],
    description:
      "Coding Camp powered by DBS Foundation 2025. Membangun pemahaman komprehensif literasi finansial, pengelolaan alur kas profesional, perencanaan masa depan, serta strategi investasi fundamental (5 Jam Pembelajaran).",
    credentialId: "GRX53V67KZ0M",
    credentialUrl: "https://www.dicoding.com/certificates/GRX53V67KZ0M",
    image: "/asset/certificates/dicoding-financial-literacy.png",
  },
];

export const userCertificationProfile = {
  name: "Yohan Christazel Jeffry",
  institution: "Dicoding Academy & DBS Foundation (Google Developers Partner)",
  status:
    "Telah menyelesaikan dan lulus 8 kelas kompetensi pemrograman, frontend engineering modern, dan pengembangan perangkat lunak.",
  field: "Software Development & Modern Front-End Web Development",
  level: "Associate Front-End & Software Developer",
  technicalSkills: [
    "HTML5",
    "CSS3",
    "JavaScript ES6+",
    "Web Components & Shadow DOM",
    "CSS Grid & Flexbox",
    "Webpack & Module Bundlers",
    "NPM Package Manager",
    "DOM & BOM Manipulation",
    "Web Storage API",
    "RESTful API & Fetch API",
    "Node.js Runtime",
    "Git & GitHub Version Control",
    "Object-Oriented Programming (OOP)",
    "Functional Programming",
    "Asynchronous Programming",
    "Computational Thinking & Algorithms",
    "Financial Literacy",
  ],
  capabilities: [
    "Membangun antarmuka web interaktif berbasis Web Components dan Shadow DOM",
    "Menyusun tata letak responsif modern menggunakan CSS Grid dan Flexbox",
    "Mengonfigurasi module bundler Webpack dan dependensi NPM untuk produksi",
    "Mengonsumsi dan mengintegrasikan REST API menggunakan Fetch API asynchronous",
    "Mengelola persistensi data client-side dengan Web Storage (localStorage/sessionStorage)",
    "Mengelola version control, branching, conflict resolution, dan kolaborasi tim via GitHub",
    "Membaca spesifikasi teknis dan menyusun diagram alur/flowchart sistem",
  ],
  learningPersona:
    "Developer bertalenta dengan fondasi komprehensif mulai dari dasar pemrograman, penguasaan JavaScript modern mendalam, manipulasi DOM, hingga arsitektur front-end mutakhir berstandar Google Developers dan AWS.",
};
