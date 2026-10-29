import Link from "next/link";
import { projects } from "@/app/data/homeData";
import LaptopMockup from "@/components/ui/LaptopMockup";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function ProjectGrid() {
  return (
    <section className="project-grid-section">
      {/* Header */}
      <ScrollReveal delay={0} duration={0.8} distance={24}>
        <div className="about-new-header text-center flex flex-col items-center justify-center mx-auto max-w-2xl mb-8">
          <h1 className="about-new-heading text-center">My Work</h1>
          <p className="about-new-subheading text-center max-w-xl mx-auto">
            A collection of works and projects I have built in recent years.
          </p>
        </div>
      </ScrollReveal>

      {/* Grid */}
      <div className="project-grid">
        {projects.map((project, i) => (
          <ScrollReveal
            key={project.slug}
            delay={0.1 + i * 0.12}
            duration={0.8}
            distance={28}
            className="h-full flex"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="project-grid-card group w-full flex flex-col"
              aria-label={`View details of ${project.title}`}
            >
              {/* Laptop mockup preview */}
              <div className="project-grid-card-preview">
                <LaptopMockup src={project.image} alt={`${project.title} preview`} />
              </div>

              {/* Card footer */}
              <div className="project-grid-card-footer">
                {/* Grid icon */}
                <svg
                  className="project-grid-icon"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect x="0" y="0" width="7" height="7" rx="1" />
                  <rect x="9" y="0" width="7" height="7" rx="1" />
                  <rect x="0" y="9" width="7" height="7" rx="1" />
                  <rect x="9" y="9" width="7" height="7" rx="1" />
                </svg>

                <h2 className="project-grid-card-title">{project.title}</h2>

                {/* Tech stack tags */}
                <p className="project-grid-card-tech">{project.tech.join(" • ")}</p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
