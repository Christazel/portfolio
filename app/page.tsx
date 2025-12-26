import Section from "@/components/Section";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yohan-christazel-jeffry" },
  { label: "Email", href: "mailto:yohan.christazel9@gmail.com" },
];

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "MongoDB",
  "REST API",
  "Flutter",
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

export default function Home() {
  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-zinc-900/80 bg-zinc-950/70 backdrop-blur">
        <div className="container-page flex items-center justify-between py-4">
          <div className="font-semibold tracking-tight">Portfolio</div>
          <nav className="hidden gap-6 text-sm text-zinc-300 md:flex">
            <a className="hover:text-white" href="#about">
              About
            </a>
            <a className="hover:text-white" href="#skills">
              Skills
            </a>
            <a className="hover:text-white" href="#projects">
              Projects
            </a>
            <a className="hover:text-white" href="#contact">
              Contact
            </a>
          </nav>
          <a className="btn" href="#contact">
            Hire me
          </a>
        </div>
      </header>

      {/* Hero */}
      <main className="container-page">
        <div className="py-12 md:py-16">
          <div className="card p-6 md:p-10">
            <p className="badge">Available for freelance / internship</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Halo, saya <span className="text-zinc-200">Yohan Christazel Jeffry</span>.
              <br />
              Saya membangun web & mobile app yang cepat dan rapi.
            </h1>
            <p className="mt-4 max-w-2xl text-zinc-400">
              Fokus pada Next.js + Tailwind untuk web, Express/MongoDB untuk backend, dan Flutter untuk
              mobile. Suka bikin dashboard, sistem manajemen, dan integrasi API.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn" href="#projects">
                Lihat Project
              </a>
              <a className="btn" href="/cv.pdf" target="_blank" rel="noreferrer">
                Download CV
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  className="text-sm text-zinc-400 hover:text-white underline-offset-4 hover:underline"
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <Section
          id="about"
          title="About"
          subtitle="Ringkas, jelas, dan menunjukkan value kamu."
        >
          <div className="card p-6 md:p-8">
            <p className="text-zinc-300 leading-relaxed">
              Saya adalah developer yang suka membangun aplikasi end-to-end: dari UI/UX, integrasi API,
              sampai deployment. Saat ini banyak mengerjakan sistem berbasis web & mobile, termasuk fitur
              rekap laporan, presensi, export data, dan dashboard admin.
            </p>
          </div>
        </Section>

        <Section id="skills" title="Skills" subtitle="Skill utama yang sering kamu pakai (bukan semua).">
          <div className="card p-6 md:p-8">
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="badge">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Section>

        <Section
          id="projects"
          title="Projects"
          subtitle="Pilih 2–6 project terbaik. Kasih link demo/repo."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((p) => (
              <div key={p.title} className="card p-6">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{p.desc}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="badge">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex gap-3">
                  {p.links.map((l) => (
                    <a
                      key={l.label}
                      className="btn"
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact" subtitle="Biar orang gampang hubungi kamu.">
          <div className="card p-6 md:p-8">
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <p className="text-sm text-zinc-400">Email</p>
                <p className="mt-1 text-zinc-200">yohan.christazel9@gmail.com</p>
              </div>
              <div>
                <p className="text-sm text-zinc-400">WhatsApp / No HP</p>
                <p className="mt-1 text-zinc-200">
                  <a
                    className="hover:underline underline-offset-4"
                    href="https://wa.me/6282150754301"
                    target="_blank"
                    rel="noreferrer"
                  >
                    +62 821-5075-4301
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-400">LinkedIn</p>
                <p className="mt-1 text-zinc-200">
                  <a
                    className="hover:underline underline-offset-4"
                    href="https://www.linkedin.com/in/yohan-christazel-jeffry"
                    target="_blank"
                    rel="noreferrer"
                  >
                    www.linkedin.com/in/yohan-christazel-jeffry
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn" href="mailto:yohan.christazel9@gmail.com">
                Kirim Email
              </a>
              <a
                className="btn"
                href="https://wa.me/6282150754301"
                target="_blank"
                rel="noreferrer"
              >
                Chat WhatsApp
              </a>
              <a
                className="btn"
                href="https://www.linkedin.com/in/yohan-christazel-jeffry"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
