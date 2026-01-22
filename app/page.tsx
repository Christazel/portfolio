"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import NeonBackground from "../components/NeonBackground";
import Reveal from "../components/Reveal";
import LanyardHolderSingle from "../components/LanyardHolderSingle";
import CommentBox from "../components/CommentBox";

import {
  SiGithub,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiFlutter,
  SiSwagger,
} from "react-icons/si";

type SkillItem = {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const skills: SkillItem[] = [
  { label: "Next.js", Icon: SiNextdotjs },
  { label: "React", Icon: SiReact },
  { label: "TypeScript", Icon: SiTypescript },
  { label: "Tailwind CSS", Icon: SiTailwindcss },
  { label: "Node.js", Icon: SiNodedotjs },
  { label: "MongoDB", Icon: SiMongodb },
  { label: "Flutter", Icon: SiFlutter },
  { label: "Swagger", Icon: SiSwagger },
  { label: "GitHub", Icon: SiGithub },
];

type ProjectItem = {
  title: string;
  desc: string;
  tech: string[];
  links: { label: string; href: string }[];
};

const projects: ProjectItem[] = [
  {
    title: "Sistem Magang (Web + Mobile)",
    desc: "Dashboard admin, presensi, rekap laporan, feedback & evaluasi, dan realtime sync.",
    tech: ["Next.js", "Tailwind", "Express", "MongoDB", "Flutter"],
    links: [
      { label: "Demo", href: "#" },
      { label: "Repo", href: "#" },
    ],
  },
  {
    title: "AR Navigation + Realtime Target",
    desc: "AR target per site_id dengan endpoint admin + Socket.IO realtime update ke client.",
    tech: ["Fastify", "Socket.IO", "Unity"],
    links: [
      { label: "Demo", href: "#" },
      { label: "Repo", href: "#" },
    ],
  },
];

function Pill({ children, strong }: { children: React.ReactNode; strong?: boolean }) {
  return <span className={`pill ${strong ? "pill-strong" : ""}`}>{children}</span>;
}

export default function Page() {
  // ✅ WAJIB 2x DUPLICATE supaya -50% seamless
  const skillsLoop = useMemo(() => [...skills, ...skills], []);

  const [aboutLang, setAboutLang] = useState<"id" | "en">("id");

  // ✅ pause animasi saat user sedang scroll (biar scroll ke #about lebih mulus)
  useEffect(() => {
    let t: number | undefined;

    const onScroll = () => {
      document.documentElement.setAttribute("data-scrolling", "1");
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        document.documentElement.removeAttribute("data-scrolling");
      }, 140);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const aboutText = useMemo(
    () => ({
      id: "Saya Yohan Christazel Jeffry, mahasiswa Informatika di Universitas Teknologi Yogyakarta. Saya antusias mempelajari hal-hal baru tentang programming, membangun aplikasi end-to-end, dan terbiasa bekerja kolaboratif dalam tim. Saya sudah menekuni dunia IT sekitar 3 tahun sejak mulai kuliah, serta aktif mengikuti berbagai kegiatan kepanitiaan baik di dalam maupun di luar kampus. Selain itu, saya merupakan lulusan Coding Camp 2025 powered by DBS Foundation.",
      en: "I'm Yohan Christazel Jeffry, an Informatics student at Universitas Teknologi Yogyakarta. I enjoy learning new things in programming, building end-to-end applications, and collaborating effectively in teams. I’ve been involved in IT for around 3 years since starting university, and I’m active in various committee and organizational activities both on and off campus. I’m also a graduate of Coding Camp 2025 powered by DBS Foundation.",
    }),
    []
  );

  return (
    <div className="min-h-screen">
      <NeonBackground />

      {/* ✅ blur hanya md+ supaya scroll mobile lebih smooth */}
      <header className="sticky top-0 z-50 border-b border-zinc-900/70 bg-zinc-950/90 md:bg-zinc-950/70 md:backdrop-blur">
        <div className="container-page flex items-center justify-between py-4">
          <div className="text-sm font-semibold tracking-tight neon-title">Yohan • Portfolio</div>

          <nav className="hidden gap-6 text-sm text-zinc-400 md:flex">
            <a className="hover:text-white transition" href="#about">
              About
            </a>
            <a className="hover:text-white transition" href="#skills">
              Skills
            </a>
            <a className="hover:text-white transition" href="#projects">
              Projects
            </a>
            <a className="hover:text-white transition" href="#contact">
              Contact
            </a>
          </nav>

          <a className="btn-neon-ghost" href="#contact">
            Contact
          </a>
        </div>
      </header>

      <main className="container-page">
        {/* hero */}
        <section className="py-14 md:py-20">
          <Reveal>
            <div className="neon-card p-6 md:p-10 transition hover:-translate-y-1 duration-300">
              <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill strong>Available</Pill>
                    <Pill>Freelance / Internship</Pill>
                    <Pill>Cyber / Neon UI</Pill>
                  </div>

                  <h1 className="mt-5 text-3xl font-semibold tracking-tight md:text-6xl">
                    <span className="neon-title animate-shimmer">Yohan Christazel Jeffry</span>
                  </h1>

                  <p className="mt-4 text-base text-zinc-300/90 md:text-lg leading-relaxed">
                    Fullstack developer building fast, modern products. Next.js + Tailwind for web, Express/MongoDB
                    for backend, and Flutter for mobile.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a className="btn-neon" href="#projects">
                      View Projects
                    </a>
                    <a className="btn-neon-ghost" href="/cv.pdf" target="_blank" rel="noreferrer">
                      Download CV
                    </a>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45 }}
                  className="shrink-0"
                >
                  <LanyardHolderSingle imageSrc="/asset/profile.jpeg" alt="Yohan profile" />
                </motion.div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* about */}
        <section id="about" className="cv-auto scroll-mt-24 py-10">
          <Reveal>
            <div className="flex items-end justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">About</h2>
                <p className="mt-1 text-sm text-zinc-500">A quick intro.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAboutLang("id")}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    aboutLang === "id"
                      ? "border-indigo-400/60 bg-indigo-500/10 text-zinc-100"
                      : "border-zinc-700/80 bg-zinc-900/30 text-zinc-300 hover:text-white hover:border-zinc-500/80"
                  }`}
                >
                  ID
                </button>
                <button
                  type="button"
                  onClick={() => setAboutLang("en")}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    aboutLang === "en"
                      ? "border-cyan-300/60 bg-cyan-500/10 text-zinc-100"
                      : "border-zinc-700/80 bg-zinc-900/30 text-zinc-300 hover:text-white hover:border-zinc-500/80"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            <div className="mt-4 neon-card p-6 md:p-8 transition hover:-translate-y-1 duration-300">
              <p className="text-zinc-300 leading-relaxed">{aboutLang === "id" ? aboutText.id : aboutText.en}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Pill>UTY • Informatics</Pill>
                <Pill>Team Collaboration</Pill>
                <Pill>Coding Camp 2025 (DBS Foundation)</Pill>
              </div>
            </div>
          </Reveal>
        </section>

        {/* skills */}
        <section id="skills" className="cv-auto scroll-mt-24 py-10">
          <Reveal>
            <h2 className="text-lg font-semibold tracking-tight">Skills</h2>
            <p className="mt-1 text-sm text-zinc-500">Core stack.</p>

            <div className="mt-4 neon-card p-5 md:p-7 overflow-hidden">
              <div className="skills-marquee">
                <div className="skills-track">
                  {skillsLoop.map(({ label, Icon }, idx) => (
                    <Pill key={`${label}-${idx}`}>
                      <span className="inline-flex items-center gap-2">
                        <Icon className="h-4 w-4 opacity-90" />
                        <span className="leading-none">{label}</span>
                      </span>
                    </Pill>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-xs text-zinc-500">Hover untuk pause.</p>
            </div>
          </Reveal>
        </section>

        {/* projects */}
        <section id="projects" className="cv-auto scroll-mt-24 py-10">
          <Reveal>
            <h2 className="text-lg font-semibold tracking-tight">Projects</h2>
            <p className="mt-1 text-sm text-zinc-500">Selected work.</p>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {projects.map((p, idx) => (
                <Reveal key={p.title} delay={idx * 0.06}>
                  <div className="neon-card p-6 transition hover:-translate-y-1 duration-300">
                    <h3 className="text-base font-semibold text-zinc-100">{p.title}</h3>
                    <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{p.desc}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <Pill key={t}>{t}</Pill>
                      ))}
                    </div>

                    <div className="mt-5 flex gap-3">
                      {p.links.map((l) => (
                        <a key={l.label} className="btn-neon-ghost" href={l.href}>
                          {l.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>

        {/* contact */}
        <section id="contact" className="cv-auto scroll-mt-24 py-10">
          <Reveal>
            <h2 className="text-lg font-semibold tracking-tight">Contact</h2>
            <p className="mt-1 text-sm text-zinc-500">Let’s work together or leave a comment below.</p>

            <div className="mt-4 neon-card p-6 md:p-8 transition hover:-translate-y-1 duration-300">
              <div className="grid gap-5 md:grid-cols-3">
                  <div>
                    <p className="text-xs text-zinc-500">Email</p>
                    <a
                      className="mt-1 inline-block text-sm text-zinc-200 hover:text-cyan-300 transition break-all"
                      href="mailto:yohan.christazel9@gmail.com"
                    >
                      yohan.christazel9@gmail.com
                    </a>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500">WhatsApp</p>
                    <a
                      className="mt-1 inline-block text-sm text-zinc-200 hover:text-cyan-300 transition"
                      href="https://wa.me/6282150754301"
                      target="_blank"
                      rel="noreferrer"
                    >
                      +62 821-5075-4301
                    </a>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500">LinkedIn</p>
                    <a
                      className="mt-1 inline-block text-sm text-zinc-200 hover:text-purple-300 transition break-all"
                      href="https://www.linkedin.com/in/yohan-christazel-jeffry"
                      target="_blank"
                      rel="noreferrer"
                    >
                      linkedin.com/in/yohan-christazel-jeffry
                    </a>
                  </div>
              </div>
            </div>

            <div className="mt-6">
              <CommentBox />
            </div>

            <p className="mt-3 text-xs text-zinc-500">Komentar akan tersimpan otomatis di database (Supabase).</p>
          </Reveal>
        </section>

        <div className="h-12" />
      </main>
    </div>
  );
}
