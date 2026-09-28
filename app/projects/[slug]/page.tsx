import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/app/data/homeData";
import LaptopMockup from "@/components/ui/LaptopMockup";
import Footer from "@/components/sections/Footer";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Yohan Christazel`,
    description: project.desc,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 bg-white dark:bg-black text-neutral-900 dark:text-neutral-100">
      <main className="flex-1">
        <div className="page-content pt-20 md:pt-24">
          <div className="pd-page">

            {/* ── Back nav ── */}
            <div className="pd-nav">
              <Link href="/work" className="pd-back">
                <svg className="pd-back-icon" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true">
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Back to Portfolio
              </Link>
            </div>

            {/* ── Hero ── */}
            <div className="pd-hero">
              <p className="pd-kicker">{project.type}</p>
              <h1 className="pd-title">{project.title}</h1>
              <p className="pd-meta">
                {project.role}&nbsp;·&nbsp;{project.year}
              </p>
            </div>

            {/* ── Full-width mockup with gradient fade ── */}
            <div className="pd-mockup-wrap">
              <div className="pd-mockup-inner">
                <LaptopMockup
                  src={project.image}
                  alt={`${project.title} screenshot`}
                />
              </div>
              {/* fade-out gradient at bottom */}
              <div className="pd-mockup-fade" aria-hidden="true" />
            </div>

            {/* ── Content grid ── */}
            <div className="pd-grid">

              {/* Left — About */}
              <div className="pd-about">
                <h2 className="pd-about-title">About Project</h2>
                <p className="pd-about-desc">{project.desc}</p>
                {project.highlight && (
                  <p className="pd-about-highlight">{project.highlight}</p>
                )}
              </div>

              {/* Right — Sidebar */}
              <aside className="pd-sidebar">

                {/* Project details block */}
                <div className="pd-sidebar-card">
                  <p className="pd-sidebar-label">PROJECT DETAILS</p>
                  <div className="pd-sidebar-row">
                    <span className="pd-sidebar-key">Type</span>
                    <span className="pd-sidebar-val">{project.type}</span>
                  </div>
                  <div className="pd-sidebar-row">
                    <span className="pd-sidebar-key">Date</span>
                    <span className="pd-sidebar-val">{project.year}</span>
                  </div>
                </div>

                {/* CTA links */}
                <div className="pd-cta-group">
                  {project.links.map((link) => {
                    const isExternal = link.href.startsWith("http");
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="pd-cta"
                      >
                        <span>{link.label}</span>
                        <svg className="pd-cta-icon" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
                          strokeLinejoin="round" aria-hidden="true">
                          <path d="M7 17 17 7M7 7h10v10" />
                        </svg>
                      </a>
                    );
                  })}
                </div>

                {/* Tech stack */}
                <div className="pd-sidebar-card">
                  <p className="pd-sidebar-label">TECH STACK</p>
                  <div className="pd-tech-wrap">
                    {project.tech.map((t) => (
                      <span key={t} className="pd-tech-badge">{t}</span>
                    ))}
                  </div>
                </div>

              </aside>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
