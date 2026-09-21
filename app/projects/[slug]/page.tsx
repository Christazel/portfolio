import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/app/data/homeData";
import LaptopMockup from "@/components/ui/LaptopMockup";
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
    <div className="project-detail-page min-h-dvh">
      {/* Nav back */}
      <div className="project-detail-nav container-page">
        <Link href="/work" className="project-detail-back">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Portfolio
        </Link>
      </div>

      {/* Hero */}
      <div className="project-detail-hero container-page">
        <p className="section-kicker mb-3">{project.type}</p>
        <h1 className="project-detail-title">{project.title}</h1>
        <p className="project-detail-meta">
          {project.role} &nbsp;·&nbsp; {project.year}
        </p>
      </div>

      {/* Laptop mockup — full-width showcase */}
      <div className="project-detail-mockup-wrapper container-page">
        <div className="project-detail-mockup">
          <LaptopMockup src={project.image} alt={`${project.title} screenshot`} />
        </div>
      </div>

      {/* Content grid */}
      <div className="project-detail-content container-page">
        {/* Left — About */}
        <div className="project-detail-about">
          <h2 className="project-detail-section-title">About Project</h2>
          <p className="project-detail-desc">{project.desc}</p>
          <p className="project-detail-highlight">{project.highlight}</p>
        </div>

        {/* Right — Sidebar */}
        <aside className="project-detail-sidebar">
          {/* Project details */}
          <div className="project-detail-sidebar-block">
            <p className="project-detail-sidebar-label">PROJECT DETAILS</p>
            <div className="project-detail-sidebar-row">
              <span className="project-detail-sidebar-key">Type</span>
              <span className="project-detail-sidebar-val">{project.type}</span>
            </div>
            <div className="project-detail-sidebar-row">
              <span className="project-detail-sidebar-key">Date</span>
              <span className="project-detail-sidebar-val">{project.year}</span>
            </div>
          </div>

          {/* CTA links */}
          <div className="project-detail-sidebar-links">
            {project.links.map((link) => {
              const isExternal = link.href.startsWith("http");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="project-detail-cta"
                >
                  {link.label}
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </a>
              );
            })}
          </div>

          {/* Tech stack */}
          <div className="project-detail-sidebar-block">
            <p className="project-detail-sidebar-label">TECH STACK</p>
            <div className="project-detail-tech-badges">
              {project.tech.map((t) => (
                <span key={t} className="project-detail-badge">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
