export type ProjectItem = {
  title: string;
  slug: string;
  desc: string;
  tech: string[];
  role: string;
  type: string;
  year: string;
  highlight: string;
  image: string;
  links: { label: string; href: string }[];
};

export const projects: ProjectItem[] = [
  {
    title: "Rooma Ceritarasa",
    slug: "rooma-ceritarasa",
    desc: "A full-featured restaurant web platform for an intimate casual dining restaurant in Yogyakarta, featuring an online table reservation system, private event booking with Midtrans payment integration, digital menu showcase, gallery, and career portal.",
    tech: ["Next.js", "React", "Tailwind CSS", "Midtrans"],
    role: "Fullstack • Web + Payment Integration",
    type: "Web",
    year: "2025",
    highlight: "Built a tiered deposit reservation system with interactive seat selection and private event flow integrated with Midtrans payment gateway.",
    image: "/asset/rooma-ceritarasa.webp",
    links: [{ label: "Live Site", href: "https://www.roomaceritarasa.com/" }],
  },
  {
    title: "Sistem Magang",
    slug: "sistem-magang",
    desc: "A web application to manage internship programs, including student registration, company assignments, and progress tracking with role-based access control.",
    tech: ["Next.js", "Tailwind CSS", "Express", "MongoDB"],
    role: "Fullstack • Web + API",
    type: "Web",
    year: "2025",
    highlight: "Streamlined internship workflows with role-based dashboards and progress tracking.",
    image: "/asset/sistem-magang.webp",
    links: [
      { label: "Live Demo", href: "https://web-magang-melawi.vercel.app/" },
      { label: "GitHub", href: "https://github.com/Christazel" },
    ],
  },
];

export const heroStats = [
  { value: "3+ Years", label: "Hands-on Learning" },
  { value: "End-to-end", label: "Web, API, Mobile" },
  { value: "DBS 2025", label: "Coding Camp Graduate" },
];

export const highlights = [
  {
    title: "Product-minded delivery",
    desc: "I focus on clean UX, fast pages, and measurable performance in every build.",
  },
  {
    title: "Fullstack workflow",
    desc: "From UI to API and database, I enjoy shipping complete, real-world features.",
  },
  {
    title: "Team collaboration",
    desc: "Experienced in committees and campus orgs with clear communication and ownership.",
  },
];

export const aboutText = {
  id: "Halo! Saya Yohan, lulusan Informatika dari Universitas Teknologi Yogyakarta dan seorang Freelance Full Stack Web Developer yang berspesialisasi dalam membangun aplikasi web modern, antarmuka pengguna interaktif, dan sistem backend yang terukur. Dengan latar belakang yang kuat dalam pengembangan web full stack, saya memiliki pengalaman merancang dan mengembangkan solusi berbasis web menggunakan teknologi modern di lingkungan frontend dan backend. Saya telah membangun aplikasi seperti sistem manajemen dan platform digital dengan menerapkan praktik terbaik dalam pengembangan perangkat lunak, pemecahan masalah, dan kolaborasi.",
  en: "Hello! I'm Yohan, an Informatics graduate from Universitas Teknologi Yogyakarta and a Full Stack Web Developer specializing in building modern web applications, interactive user interfaces, and scalable backend systems. With a strong background in full stack web development, I have experience designing and developing web-based solutions using modern technologies across frontend and backend environments. I have built applications such as management systems and digital platforms while applying best practices in software development, problem-solving, and collaboration.",
} as const;
