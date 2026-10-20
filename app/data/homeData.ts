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
    highlight:
      "Built a tiered deposit reservation system with interactive seat selection and private event flow integrated with Midtrans payment gateway.",
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
