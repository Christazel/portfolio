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
    image:
      "https://api.microlink.io/?url=https%3A%2F%2Fwww.roomaceritarasa.com&screenshot=true&meta=false&embed=screenshot.url",
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
    image:
      "https://api.microlink.io/?url=https%3A%2F%2Fweb-magang-melawi.vercel.app&screenshot=true&meta=false&embed=screenshot.url",
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
  id: "Saya Yohan Christazel Jeffry, mahasiswa Informatika di Universitas Teknologi Yogyakarta. Saya antusias mempelajari hal-hal baru tentang programming, membangun aplikasi end-to-end, dan terbiasa bekerja kolaboratif dalam tim. Saya sudah menekuni dunia IT sekitar 3 tahun sejak mulai kuliah, serta aktif mengikuti berbagai kegiatan kepanitiaan baik di dalam maupun di luar kampus. Selain itu, saya merupakan lulusan Coding Camp 2025 powered by DBS Foundation.",
  en: "I'm Yohan Christazel Jeffry, an Informatics student at Universitas Teknologi Yogyakarta. I enjoy learning new things in programming, building end-to-end applications, and collaborating effectively in teams. I've been involved in IT for around 3 years since starting university, and I'm active in various committee and organizational activities both on and off campus. I'm also a graduate of Coding Camp 2025 powered by DBS Foundation.",
} as const;
