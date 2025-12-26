"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import AnimatedBackground from "../components/AnimatedBackground";
import Reveal from "../components/Reveal";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yohan-christazel-jeffry" },
  { label: "Email", href: "mailto:yohan.christazel9@gmail.com" },
];

const skills = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "REST API", "Flutter"];

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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-800/70 bg-zinc-900/30 px-3 py-1 text-xs text-zinc-300">
      {children}
    </span>
  );
}

export default function Page() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen">
      <AnimatedBackground />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-900/80 bg-zinc-950/70 backdrop-blur">
        <div className="container-page flex items-center justify-between py-4">
          <div className="text-sm font-semibold tracking-tight">Yohan CJ</div>

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

          <a className="btn-ghost" href="#contact">
            Contact
          </a>
        </div>
      </header>

      <main className="container-page">
        {/* Hero */}
        <section className="py-14 md:py-20">
          <Reveal>
            <div className="card p-6 md:p-10">
              <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill>Available</Pill>
                    <Pill>Freelance / Internship</Pill>
                  </div>

                  <h1 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
                    <span className="grad">Yohan Christazel Jeffry</span>
                  </h1>

                  <p className="mt-3 text-base text-zinc-400 md:text-lg leading-relaxed">
                    Fullstack developer focused on building clean interfaces and reliable systems:
                    Next.js + Tailwind for web, Express/MongoDB for backend, and Flutter for mobile.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a className="btn-primary" href="#projects">
                      View Projects
                    </a>
                    <a className="btn-ghost" href="/cv.pdf" target="_blank" rel="noreferrer">
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

                {/* Minimal monogram */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="shrink-0"
                >
                  <div className="card-soft hover-lift grid h-24 w-24 place-items-center md:h-28 md:w-28">
                    <span className="text-xl font-semibold text-zinc-200">YC</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-24 py-10">
          <Reveal>
            <div className="mb-4">
              <h2 className="text-lg font-semibold tracking-tight">About</h2>
              <p className="mt-1 text-sm text-zinc-500">Short and clear.</p>
            </div>

            <div className="card-soft hover-lift p-6 md:p-8">
              <p className="text-zinc-300 leading-relaxed">
                I enjoy building end-to-end products: from UI polish to API integration and deployment.
                I’m comfortable shipping dashboards, management systems, and data-driven features with a
                focus on maintainability and performance.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-24 py-10">
          <Reveal>
            <div className="mb-4">
              <h2 className="text-lg font-semibold tracking-tight">Skills</h2>
              <p className="mt-1 text-sm text-zinc-500">Core stack I use most often.</p>
            </div>

            <div className="card-soft hover-lift p-6 md:p-8">
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-24 py-10">
          <Reveal>
            <div className="mb-4">
              <h2 className="text-lg font-semibold tracking-tight">Projects</h2>
              <p className="mt-1 text-sm text-zinc-500">Selected work.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((p, idx) => (
                <Reveal key={p.title} delay={idx * 0.06}>
                  <div className="card-soft hover-lift p-6">
                    <h3 className="text-base font-semibold text-zinc-100">{p.title}</h3>
                    <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{p.desc}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <Pill key={t}>{t}</Pill>
                      ))}
                    </div>

                    <div className="mt-5 flex gap-3">
                      {p.links.map((l) => (
                        <a key={l.label} className="btn-ghost" href={l.href}>
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

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 py-10">
          <Reveal>
            <div className="mb-4">
              <h2 className="text-lg font-semibold tracking-tight">Contact</h2>
              <p className="mt-1 text-sm text-zinc-500">Let’s build something.</p>
            </div>

            <div className="card-soft hover-lift p-6 md:p-8">
              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <p className="text-xs text-zinc-500">Email</p>
                  <p className="mt-1 text-sm text-zinc-200 break-all">yohan.christazel9@gmail.com</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">WhatsApp</p>
                  <a
                    className="mt-1 inline-block text-sm text-zinc-200 hover:text-white transition"
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
                    className="mt-1 inline-block text-sm text-zinc-200 hover:text-white transition break-all"
                    href="https://www.linkedin.com/in/yohan-christazel-jeffry"
                    target="_blank"
                    rel="noreferrer"
                  >
                    linkedin.com/in/yohan-christazel-jeffry
                  </a>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a className="btn-primary" href="mailto:yohan.christazel9@gmail.com">
                  Email
                </a>
                <a
                  className="btn-ghost"
                  href="https://wa.me/6282150754301"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
                <a
                  className="btn-ghost"
                  href="https://www.linkedin.com/in/yohan-christazel-jeffry"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        <div className="divider my-10" />
      </main>

      <footer className="pb-10">
        <div className="container-page text-sm text-zinc-500">
          © {year} • Minimal portfolio built with Next.js
        </div>
      </footer>
    </div>
  );
}
