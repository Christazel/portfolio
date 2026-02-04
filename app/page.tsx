"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import NeonBackground from "../components/layout/NeonBackground";
import LanyardHolderSingle from "../components/layout/LanyardHolderSingle";
import CommentBox from "../components/ui/CommentBox";
import ScrollReveal from "../components/animations/ScrollReveal";
import ParallaxSection from "../components/animations/ParallaxSection";
import HoverFloat from "../components/animations/HoverFloat";
import GlitchText from "../components/animations/GlitchText";
import RippleButton from "../components/animations/RippleButton";

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
  SiFramer,
  SiLinkedin,
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
  { label: "Framer Motion", Icon: SiFramer },
];

type ProjectItem = {
  title: string;
  desc: string;
  tech: string[];
  role: string;
  year: string;
  highlight: string;
  links: { label: string; href: string }[];
};

const projects: ProjectItem[] = [
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

const heroStats = [
  { value: "3+ Years", label: "Hands-on Learning" },
  { value: "End-to-end", label: "Web, API, Mobile" },
  { value: "DBS 2025", label: "Coding Camp Graduate" },
];

const highlights = [
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

function Pill({ children, strong }: { children: React.ReactNode; strong?: boolean }) {
  return <span className={`pill font-mono ${strong ? "pill-strong" : ""}`}>{children}</span>;
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
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/95 md:bg-zinc-950/90 md:backdrop-blur-sm">
        <div className="container-page flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold tracking-tight neon-title">Yohan • Portfolio</div>
            <span className="hidden text-xs text-zinc-500 font-mono md:inline">Fullstack Developer</span>
          </div>

          <nav className="hidden items-center gap-6 rounded-full px-5 py-2 text-sm text-zinc-300 md:flex nav-glass">
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
        <section className="py-14 md:py-24 relative">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-cyan-500/08 rounded-full filter blur-3xl opacity-30 animate-pulse" />
            <div
              className="absolute bottom-20 right-1/4 w-72 h-72 bg-purple-500/08 rounded-full filter blur-3xl opacity-30 animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <ScrollReveal duration={1.2} delay={0.2}>
            <div className="neon-card p-6 md:p-12 transition hover:-translate-y-1 duration-300 relative overflow-hidden group page-enter">
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/05 via-transparent to-purple-500/05 opacity-0 group-hover:opacity-80 transition duration-500" />

              <div className="grid gap-10 md:grid-cols-[1.1fr,0.9fr] md:items-center relative z-10">
                <div className="max-w-2xl">
                  <ScrollReveal delay={0.3} direction="right" distance={30}>
                    <p className="section-kicker">Fullstack Developer • Yogyakarta</p>
                  </ScrollReveal>

                  <ScrollReveal delay={0.35} direction="right" distance={30}>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Pill strong>Available</Pill>
                      <Pill>Freelance / Internship</Pill>
                      <Pill>Cyber / Neon UI</Pill>
                    </div>
                  </ScrollReveal>

                  <div className="mt-5">
                    <GlitchText className="text-3xl font-semibold tracking-tight md:text-6xl neon-title">
                      Yohan Christazel Jeffry
                    </GlitchText>
                  </div>

                  <ScrollReveal delay={0.4} distance={30}>
                    <p className="mt-4 text-base text-zinc-200/95 md:text-lg leading-relaxed font-medium">
                      Fullstack developer building fast, modern products. Next.js + Tailwind for web, Express/MongoDB
                      for backend, and Flutter for mobile.
                    </p>
                  </ScrollReveal>

                  <ScrollReveal delay={0.5} direction="up" distance={20}>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <RippleButton className="btn-neon" href="#projects">
                        View Projects
                      </RippleButton>
                      <RippleButton className="btn-neon-ghost" href="/cv.pdf" target="_blank" rel="noreferrer">
                        Download CV
                      </RippleButton>
                    </div>
                  </ScrollReveal>

                  <div className="mt-7 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                    <a className="inline-flex items-center gap-2 hover:text-white transition" href="mailto:yohan.christazel9@gmail.com">
                      Email
                    </a>
                    <a
                      className="inline-flex items-center gap-2 hover:text-white transition"
                      href="https://www.linkedin.com/in/yohan-christazel-jeffry"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SiLinkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  </div>

                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {heroStats.map((stat) => (
                      <div key={stat.label} className="stat-card">
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <HoverFloat className="shrink-0">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.45 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/30 to-purple-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition duration-500" />
                      <LanyardHolderSingle imageSrc="/asset/profile.jpeg" alt="Yohan profile" />
                    </motion.div>
                  </HoverFloat>

                  <div className="stat-card">
                    <p className="section-kicker">Now Building</p>
                    <p className="mt-2 text-sm text-zinc-200">
                      Shipping web apps with clean UX, thoughtful systems, and reliable APIs.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Pill>UI Engineering</Pill>
                      <Pill>API Design</Pill>
                      <Pill>Performance</Pill>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* about */}
        <section id="about" className="cv-auto scroll-mt-24 py-10">
          <ScrollReveal direction="left">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="section-kicker">About</p>
                <h2 className="section-title">A quick intro</h2>
                <p className="section-subtitle">Who I am and how I work.</p>
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
              <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr] md:items-start">
                <div>
                  <p className="text-zinc-200/95 leading-relaxed font-medium text-base">
                    {aboutLang === "id" ? aboutText.id : aboutText.en}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Pill>UTY • Informatics</Pill>
                    <Pill>Team Collaboration</Pill>
                    <Pill>Coding Camp 2025 (DBS Foundation)</Pill>
                  </div>
                </div>

                <div className="grid gap-3">
                  {highlights.map((item) => (
                    <div key={item.title} className="stat-card">
                      <p className="text-sm font-semibold text-zinc-100">{item.title}</p>
                      <p className="mt-1 text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* skills */}
        <section id="skills" className="cv-auto scroll-mt-24 py-10">
          <ParallaxSection speed={0.3}>
            <ScrollReveal direction="right">
              <p className="section-kicker">Toolkit</p>
              <h2 className="section-title">Skills</h2>
              <p className="section-subtitle">Core stack and the tools I enjoy shipping with.</p>

              <div className="mt-4 neon-card overflow-hidden">
                <div className="skills-section-wrapper p-5 md:p-7">
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
              </div>
            </ScrollReveal>
          </ParallaxSection>
        </section>

        {/* projects */}
        <section id="projects" className="cv-auto scroll-mt-24 py-10">
          <ScrollReveal direction="left">
            <p className="section-kicker">Selected</p>
            <h2 className="section-title">Projects</h2>
            <p className="section-subtitle">A few builds that show how I work end-to-end.</p>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {projects.map((p, idx) => (
                <ScrollReveal key={p.title} delay={idx * 0.1} distance={40}>
                  <HoverFloat>
                    <div className="neon-card p-6 transition hover:-translate-y-1 duration-300 h-full relative group overflow-hidden">
                      {/* Animated gradient background on hover */}
                      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/05 via-transparent to-purple-500/05 opacity-0 group-hover:opacity-70 transition duration-500 -z-10" />
                      <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/08 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition duration-500 -z-10" />

                      <div className="flex items-center justify-between relative">
                        <p className="section-kicker">Case Study</p>
                        <Pill>{p.year}</Pill>
                      </div>

                      <h3 className="mt-3 text-base font-bold text-zinc-50 relative">{p.title}</h3>
                      <p className="mt-2 text-sm text-zinc-300/90 leading-relaxed relative font-medium">{p.desc}</p>
                      <p className="mt-3 text-xs text-zinc-400 leading-relaxed relative">{p.highlight}</p>
                      <p className="mt-3 text-xs text-zinc-500 font-mono relative">{p.role}</p>

                      <div className="mt-4 flex flex-wrap gap-2 relative">
                        {p.tech.map((t) => (
                          <Pill key={t}>{t}</Pill>
                        ))}
                      </div>

                      <div className="mt-5 flex gap-3 relative">
                        {p.links.map((l) => (
                          <RippleButton key={l.label} className="btn-neon-ghost" href={l.href}>
                            {l.label}
                          </RippleButton>
                        ))}
                      </div>
                    </div>
                  </HoverFloat>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* contact */}
        <section id="contact" className="cv-auto scroll-mt-24 py-10 relative">
          {/* Background glow */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/05 rounded-full filter blur-3xl opacity-25" />
          
          <ScrollReveal direction="left">
            <p className="section-kicker">Get in touch</p>
            <h2 className="section-title">Contact</h2>
            <p className="section-subtitle">Let&apos;s collaborate or leave a comment below.</p>

            <div className="mt-4 neon-card p-6 md:p-8 transition hover:-translate-y-1 duration-300 relative group overflow-hidden">
              {/* Animated border effect */}
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/05 via-transparent to-purple-500/05 opacity-0 group-hover:opacity-70 transition duration-500" />
              
              <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr] relative z-10">
                <div className="grid gap-5 md:grid-cols-3">
                  <ScrollReveal delay={0.1} distance={20}>
                    <div className="group/item">
                      <p className="text-xs text-zinc-400 font-semibold">Email</p>
                      <a
                        className="mt-1 inline-block text-sm text-zinc-100 hover:text-cyan-300 transition break-all relative overflow-hidden font-medium"
                        href="mailto:yohan.christazel9@gmail.com"
                      >
                        <span className="relative">yohan.christazel9@gmail.com</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-400 to-cyan-300 group-hover/item:w-full transition-all duration-300" />
                      </a>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.2} distance={20}>
                    <div className="group/item">
                      <p className="text-xs text-zinc-400 font-semibold">WhatsApp</p>
                      <a
                        className="mt-1 inline-block text-sm text-zinc-100 hover:text-cyan-300 transition relative overflow-hidden font-medium"
                        href="https://wa.me/6282150754301"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="relative">+62 821-5075-4301</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-400 to-cyan-300 group-hover/item:w-full transition-all duration-300" />
                      </a>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.3} distance={20}>
                    <div className="group/item">
                      <p className="text-xs text-zinc-400 font-semibold">LinkedIn</p>
                      <a
                        className="mt-1 inline-block text-sm text-zinc-100 hover:text-purple-300 transition break-all relative overflow-hidden font-medium"
                        href="https://www.linkedin.com/in/yohan-christazel-jeffry"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="relative">linkedin.com/in/yohan-christazel-jeffry</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-purple-400 to-purple-300 group-hover/item:w-full transition-all duration-300" />
                      </a>
                    </div>
                  </ScrollReveal>
                </div>

                <div className="stat-card h-fit">
                  <p className="section-kicker">Availability</p>
                  <p className="mt-2 text-sm text-zinc-200">
                    Open for freelance projects, internships, and collaborative builds.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Pill>Remote</Pill>
                    <Pill>On-site</Pill>
                    <Pill>Part-time</Pill>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <CommentBox />
            </div>

            <p className="mt-3 text-xs text-zinc-500">Komentar akan tersimpan otomatis di database (Supabase).</p>
          </ScrollReveal>
        </section>

        <div className="h-12" />
      </main>
    </div>
  );
}
