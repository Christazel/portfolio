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
];

export const userCertificationProfile = {
  name: "Yohan Christazel Jeffry",
  institution: "Dicoding Academy",
  status:
    "Telah menyelesaikan dan lulus beberapa kelas kompetensi pemrograman dan pengembangan perangkat lunak.",
  field: "Software Development & Web Development",
  level: "Junior / Fundamental Developer",
  technicalSkills: [
    "HTML5",
    "CSS3",
    "JavaScript ES6 dasar",
    "Fundamental Programming Logic",
    "Algorithm Thinking",
    "Computational Thinking",
    "Git",
    "GitHub",
    "Repository Management",
    "Version Control",
    "Semantic HTML",
    "Responsive Web Layout",
    "Dokumentasi Software",
  ],
  capabilities: [
    "Membaca dan memahami kebutuhan aplikasi",
    "Membuat flow/diagram aplikasi",
    "Membuat struktur website",
    "Melakukan styling website",
    "Mengelola source code menggunakan Git",
    "Berkolaborasi dalam workflow developer",
    "Membuat dokumentasi teknis sederhana",
  ],
  learningPersona:
    "Memiliki fondasi awal sebagai pengembang software dengan pemahaman pemrograman dasar, web development, version control, dan praktik kerja developer modern.",
};
