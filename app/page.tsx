"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import NeonBackground from "../components/NeonBackground";
import Reveal from "../components/Reveal";

// ✅ Icons (react-icons)
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

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yohan-christazel-jeffry" },
  { label: "Email", href: "mailto:yohan.christazel9@gmail.com" },
];

// ✅ skills pakai icon + label
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
  { label: "REST API", Icon: SiSwagger },
  { label: "Flutter", Icon: SiFlutter },
  { label: "GitHub", Icon: SiGithub },
];

const projects = [
  {
    title: "Sistem Magang (Web + Mobile)",
    desc: "Dashboard admin, presensi GPS/QR, laporan harian, feedback, dan rekap data.",
    tech: ["Next.js", "Tailwind", "Express", "MongoDB", "Flutter"],
    links: [
      { label: "Demo", href: "#" },
      { label: "Repo", href: "#" },
    ],
  },
  {
    title: "Dashboard Monitoring",
    desc: "Visualisasi statistik presensi & tugas dengan filter pencarian dan export CSV.",
    tech: ["Next.js", "Chart", "API"],
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
  // year tidak dipakai lagi di footer (footer sekarang di layout)
  useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen">
      <NeonBackground />

      {/* header */}
      <header className="sticky top-0 z-50 border-b border-zinc-900/70 bg-zinc-950/70 backdrop-blur">
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
            <div className="neon-border">
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

                    <div className="mt-6 flex flex-wrap gap-4 text-sm">
                      {socials.map((s) => (
                        <a
                          key={s.label}
                          className="link"
                          href={s.href}
                          target={s.href.startsWith("http") ? "_blank" : undefined}
                          rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* monogram */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="shrink-0"
                  >
                    <div className="neon-card grid h-24 w-24 place-items-center md:h-28 md:w-28">
                      <span className="text-xl font-semibold neon-title">YC</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* about */}
        <section id="about" className="scroll-mt-24 py-10">
          <Reveal>
            <h2 className="text-lg font-semibold tracking-tight">About</h2>
            <p className="mt-1 text-sm text-zinc-500">A quick intro.</p>

            <div className="mt-4 neon-border">
              <div className="neon-card p-6 md:p-8 transition hover:-translate-y-1 duration-300">
                <p className="text-zinc-300 leading-relaxed">
                  I like shipping end-to-end features: clean UI, reliable APIs, and smooth deployment. I enjoy
                  dashboards, management systems, and data-focused workflows.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* skills */}
        <section id="skills" className="scroll-mt-24 py-10">
          <Reveal>
            <h2 className="text-lg font-semibold tracking-tight">Skills</h2>
            <p className="mt-1 text-sm text-zinc-500">Core stack.</p>

            <div className="mt-4 neon-card p-6 md:p-8">
              <div className="flex flex-wrap gap-2">
                {skills.map(({ label, Icon }) => (
                  <Pill key={label}>
                    <span className="inline-flex items-center gap-2">
                      <Icon className="h-4 w-4 opacity-90" />
                      <span className="leading-none">{label}</span>
                    </span>
                  </Pill>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* projects */}
        <section id="projects" className="scroll-mt-24 py-10">
          <Reveal>
            <h2 className="text-lg font-semibold tracking-tight">Projects</h2>
            <p className="mt-1 text-sm text-zinc-500">Selected work.</p>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {projects.map((p, idx) => (
                <Reveal key={p.title} delay={idx * 0.06}>
                  <div className="neon-border">
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
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>

        {/* contact */}
        <section id="contact" className="scroll-mt-24 py-10">
          <Reveal>
            <h2 className="text-lg font-semibold tracking-tight">Contact</h2>
            <p className="mt-1 text-sm text-zinc-500">Let’s work together.</p>

            <div className="mt-4 neon-border">
              <div className="neon-card p-6 md:p-8 transition hover:-translate-y-1 duration-300">
                <div className="grid gap-5 md:grid-cols-3">
                  <div>
                    <p className="text-xs text-zinc-500">Email</p>
                    <p className="mt-1 text-sm text-zinc-200 break-all">yohan.christazel9@gmail.com</p>
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

                <div className="mt-6 flex flex-wrap gap-3">
                  <a className="btn-neon" href="mailto:yohan.christazel9@gmail.com">
                    Email
                  </a>
                  <a
                    className="btn-neon-ghost"
                    href="https://wa.me/6282150754301"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                  <a
                    className="btn-neon-ghost"
                    href="https://www.linkedin.com/in/yohan-christazel-jeffry"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ✅ spacer biar footer global gak mepet */}
        <div className="h-12" />
      </main>
    </div>
  );
}
