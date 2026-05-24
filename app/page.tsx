"use client";

import { useState } from "react";
import Lanyard from "@/components/layout/Lanyard/Lanyard";
import CommentBox from "@/components/ui/CommentBox";
import { aboutText, heroStats, highlights, projects, skills } from "@/app/data/homeData";

function Pill({ children, strong }: { children: React.ReactNode; strong?: boolean }) {
  return <span className={`pill ${strong ? "pill-strong" : ""}`}>{children}</span>;
}

function SkillChip({
  label,
  Icon,
  color,
}: {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  color?: string;
}) {
  return (
    <span className="skill-logo" style={{ color }}>
      <Icon className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
      <span>{label}</span>
    </span>
  );
}

export default function Page() {
  const [aboutLang, setAboutLang] = useState<"id" | "en">("id");
  const skillSlides = skills;

  return (
    <div className="min-h-screen">
      <header className="sticky top-3 z-50 px-3 sm:top-4">
        <div className="container-page max-w-6xl px-0">
          <div className="navbar-glass">
            <nav className="nav-menu" aria-label="Primary navigation">
              <a className="nav-glass-link" href="#about">
                <span>About Me</span>
              </a>
              <a className="nav-glass-link" href="#skills">
                <span>Skill Stack</span>
              </a>
              <a className="nav-glass-link" href="#projects">
                <span>Projects</span>
              </a>
              <a className="nav-glass-link" href="#contact">
                <span>Contact</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container-page">
        <section className="py-16 md:py-24">
          <div className="neon-card p-8 md:p-12 page-enter">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <p className="section-kicker">Fullstack Developer</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill strong>Available</Pill>
                  <Pill>Freelance</Pill>
                </div>

                <h1 className="neon-title mt-4">Yohan Christazel Jeffry</h1>

                <p className="mt-4 text-base text-zinc-400 leading-relaxed">
                  Fullstack developer building fast, modern products. Next.js + Tailwind for web, Express/MongoDB for backend, and Flutter for mobile.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a className="btn-neon" href="#projects">View Projects</a>
                  <a className="btn-neon-ghost" href="/asset/yohan-christazel-jeffry-cv.pdf" target="_blank" rel="noreferrer">Download CV</a>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                  <a className="nav-link" href="mailto:yohan.christazel9@gmail.com">Email</a>
                  <a className="nav-link" href="https://www.linkedin.com/in/yohan-christazel-jeffry" target="_blank" rel="noreferrer">LinkedIn</a>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="stat-card">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="shrink-0">
                  <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
                </div>

                <div className="stat-card">
                  <p className="section-kicker">Now Building</p>
                  <p className="mt-2 text-sm text-zinc-300">
                    Shipping web apps with clean UX, thoughtful systems, and reliable APIs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-10">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="section-kicker">About</p>
              <h2 className="section-title">A quick intro</h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAboutLang("id")}
                className={`rounded-full border px-3 py-1 text-xs transition ${aboutLang === "id" ? "border-zinc-600 bg-zinc-800 text-zinc-100" : "border-zinc-700 text-zinc-400 hover:text-white"}`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setAboutLang("en")}
                className={`rounded-full border px-3 py-1 text-xs transition ${aboutLang === "en" ? "border-zinc-600 bg-zinc-800 text-zinc-100" : "border-zinc-700 text-zinc-400 hover:text-white"}`}
              >
                EN
              </button>
            </div>
          </div>

          <div className="mt-4 neon-card p-6">
            <div className="grid gap-6 md:grid-cols-2 md:items-start">
              <div>
                <p className="text-justify text-zinc-300 leading-relaxed">
                  {aboutLang === "id" ? aboutText.id : aboutText.en}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill>UTY • Informatics</Pill>
                  <Pill>Team Collaboration</Pill>
                </div>
              </div>

              <div className="grid gap-3">
                {highlights.map((item) => (
                  <div key={item.title} className="stat-card">
                    <p className="text-sm font-medium text-zinc-100">{item.title}</p>
                    <p className="mt-1 text-xs text-zinc-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-10">
          <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-zinc-800 bg-zinc-950 py-10">
            <div className="container-page text-center">
              <p className="text-sm font-medium text-zinc-500 sm:text-base">Tools and technologies I work with</p>
            </div>

            <div className="skill-slider" aria-label="Skills slider">
              <div className="skill-track">
                {[0, 1].map((sequence) => (
                  <div key={sequence} className="skill-sequence" aria-hidden={sequence === 1}>
                    {skillSlides.map(({ label, Icon, color }) => (
                      <SkillChip key={`${label}-${sequence}`} label={label} Icon={Icon} color={color} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-10">
          <p className="section-kicker">Selected</p>
          <h2 className="section-title">Projects</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {projects.map((p) => (
              <div key={p.title} className="neon-card p-6">
                <div className="flex items-center justify-between">
                  <p className="section-kicker">Case Study</p>
                  <Pill>{p.year}</Pill>
                </div>

                <h3 className="mt-3 text-base font-semibold text-zinc-100">{p.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
                <p className="mt-2 text-xs text-zinc-500">{p.highlight}</p>
                <p className="mt-2 text-xs text-zinc-600">{p.role}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>

                <div className="mt-4 flex gap-3">
                  {p.links.map((l) => (
                    <a key={l.label} className="btn-neon-ghost text-xs" href={l.href}>{l.label}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-10">
          <p className="section-kicker">Get in touch</p>
          <h2 className="section-title">Contact</h2>

          <div className="mt-4 neon-card p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-4">
                <div>
                  <p className="text-xs text-zinc-500">Email</p>
                  <a className="text-sm text-zinc-300 hover:text-white transition" href="mailto:yohan.christazel9@gmail.com">yohan.christazel9@gmail.com</a>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">WhatsApp</p>
                  <a className="text-sm text-zinc-300 hover:text-white transition" href="https://wa.me/6282150754301" target="_blank" rel="noreferrer">+62 821-5075-4301</a>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">LinkedIn</p>
                  <a className="text-sm text-zinc-300 hover:text-white transition" href="https://www.linkedin.com/in/yohan-christazel-jeffry" target="_blank" rel="noreferrer">linkedin.com/in/yohan-christazel-jeffry</a>
                </div>
              </div>

              <div className="stat-card h-fit">
                <p className="section-kicker">Availability</p>
                <p className="mt-2 text-sm text-zinc-300">Open for freelance projects, internships, and collaborative builds.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>Remote</Pill>
                  <Pill>On-site</Pill>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CommentBox />
          </div>
        </section>

        <div className="h-12" />
      </main>
    </div>
  );
}
