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
  category: CertificateCategory;
  skills: string[];
  description: string;
  credentialId?: string;
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
    id: "dbs-coding-camp-2025",
    title: "Coding Camp 2025: Front-End & Back-End Developer",
    issuer: "DBS Foundation & Dicoding",
    issueDate: "July 2025",
    category: "Fullstack",
    skills: ["React.js", "Next.js", "Node.js", "REST API", "Git", "Full Stack Development"],
    description:
      "Intensive 910-hour web development cohort covering modern frontend and backend architectures, scalable RESTful APIs, Git workflows, and capstone project delivery with GPA 91.3.",
    credentialId: "DBS-CC25-FEBE-9130",
    credentialUrl: "https://www.dicoding.com/",
    image: "/asset/certificates/dbs-coding-camp.svg",
  },
  {
    id: "dicoding-react-web-app",
    title: "Belajar Membuat Aplikasi Web dengan React",
    issuer: "Dicoding Indonesia",
    issueDate: "June 2025",
    category: "Frontend",
    skills: ["React.js", "Component Architecture", "React Hooks", "SPA Routing", "State Management"],
    description:
      "Mastered modern React principles including declarative component hierarchy, custom hooks, unidirectional data flow, context API, and client-side application routing.",
    credentialId: "DICODING-RCT-5582",
    credentialUrl: "https://www.dicoding.com/certificates/KEXLYEVQRZG2",
    image: "/asset/certificates/dicoding-react.svg",
  },
  {
    id: "dicoding-backend-pemula",
    title: "Belajar Membuat Aplikasi Back-End untuk Pemula",
    issuer: "Dicoding Indonesia",
    issueDate: "May 2025",
    category: "Backend",
    skills: ["Node.js", "RESTful API", "Hapi Framework", "Postman", "HTTP Protocol"],
    description:
      "Engineered robust RESTful backend microservices with Node.js and Hapi, handling routing, payload validation, CORS policies, and automated API endpoint testing via Postman.",
    credentialId: "DICODING-BE-7719",
    credentialUrl: "https://www.dicoding.com/",
    image: "/asset/certificates/dicoding-backend.svg",
  },
  {
    id: "dicoding-javascript-fundamentals",
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    issueDate: "April 2025",
    category: "Frontend",
    skills: ["JavaScript (ES6+)", "Async/Await", "Promises", "OOP", "Functional Programming"],
    description:
      "Deep dive into ECMAScript 6+ standard, concurrency models, event loops, Promises, asynchronous JavaScript patterns, module bundling, and functional programming concepts.",
    credentialId: "DICODING-JS-3391",
    credentialUrl: "https://www.dicoding.com/certificates/53XEQL9MYXRN",
    image: "/asset/certificates/dicoding-javascript.svg",
  },
  {
    id: "dicoding-git-github",
    title: "Belajar Dasar Git dengan GitHub",
    issuer: "Dicoding Indonesia",
    issueDate: "March 2025",
    category: "Tools",
    skills: ["Git", "GitHub", "Version Control", "Branching Strategy", "Merge Conflict Resolution"],
    description:
      "Acquired comprehensive version control competencies including commit conventions, feature branching, remote synchronizations, pull request reviews, and team workflows.",
    credentialId: "DICODING-GIT-1824",
    credentialUrl: "https://www.dicoding.com/certificates/JMZVD98EJZN9",
    image: "/asset/certificates/dicoding-git.svg",
  },
  {
    id: "dicoding-basic-web",
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    issueDate: "February 2025",
    category: "Frontend",
    skills: ["HTML5", "CSS3", "Responsive Layouts", "Flexbox", "Web Accessibility"],
    description:
      "Fundamental web development covering semantic HTML5 architecture, CSS3 styling techniques, responsive mobile-first layouts, Flexbox grids, and cross-browser accessibility.",
    credentialId: "DICODING-WEB-9921",
    credentialUrl: "https://www.dicoding.com/certificates/L4PQQG6MOPO1",
    image: "/asset/certificates/dicoding-web.svg",
  },
  {
    id: "uty-bachelor-informatics",
    title: "Bachelor of Computer Science (Informatics)",
    issuer: "Universitas Teknologi Yogyakarta",
    issueDate: "April 2026",
    category: "Academic",
    skills: ["Informatics", "Software Engineering", "Full Stack Web & Mobile", "GPA 3.69 Cum Laude"],
    description:
      "Graduated with Cum Laude honors in 3.5 years (GPA 3.69/4.00) from Universitas Teknologi Yogyakarta, specializing in software engineering, modern web architectures, and mobile applications.",
    credentialId: "UTY-INF-2026-369",
    credentialUrl: "https://uty.ac.id/",
    image: "/asset/certificates/uty-degree.svg",
  },
  {
    id: "sinta-journal-publication",
    title: "First Author – SINTA 4 Accredited Journal (INTECOM)",
    issuer: "INTECOM Journal of Information Technology & Computer Science",
    issueDate: "January 2026",
    category: "Academic",
    skills: ["Research Publication", "Next.js", "Flutter", "Node.js", "MongoDB", "SINTA 4"],
    description:
      "First Author of published research: 'Pengembangan Sistem Manajemen Kegiatan Mahasiswa Magang Berbasis Web Mobile di Dinas Pendidikan Melawi' in nationally accredited SINTA 4 journal.",
    credentialId: "INTECOM-VOL6-NO1-17317",
    credentialUrl: "https://journal.ipm2kpe.or.id/index.php/INTECOM/article/view/17317",
    image: "/asset/certificates/sinta-journal.svg",
  },
];
