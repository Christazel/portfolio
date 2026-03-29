import type { IconType } from "react-icons";
import {
  SiFlutter,
  SiFramer,
  SiGithub,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export type SkillItem = {
  label: string;
  Icon: IconType;
};

export type ProjectItem = {
  title: string;
  desc: string;
  tech: string[];
  role: string;
  year: string;
  highlight: string;
  links: { label: string; href: string }[];
};

export const skills: SkillItem[] = [
  { label: "Next.js", Icon: SiNextdotjs },
  { label: "React", Icon: SiReact },
  { label: "TypeScript", Icon: SiTypescript },
  { label: "Tailwind CSS", Icon: SiTailwindcss },
  { label: "Node.js", Icon: SiNodedotjs },
  { label: "MongoDB", Icon: SiMongodb },
  { label: "Flutter", Icon: SiFlutter },
  { label: "Swagger", Icon: SiSwagger },
  { label: "GitHub", Icon: SiGithub },
  { label: "Framer Motion", Icon: SiFramer },
];

export const projects: ProjectItem[] = [
  {
    title: "Sistem Magang",
    desc: "A web application to manage internship programs, including student registration, company assignments, and progress tracking.",
    tech: ["Next.js", "Tailwind", "Express", "MongoDB"],
    role: "Fullstack • Web + API",
    year: "2025",
    highlight: "Streamlined internship workflows with role-based dashboards and progress tracking.",
    links: [
      { label: "Demo", href: "https://web-magang-melawi.vercel.app/" },
      { label: "Repo", href: "#" },
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
