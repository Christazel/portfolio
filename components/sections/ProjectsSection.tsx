import { projects } from "@/app/data/homeData";
import PortfolioPill from "@/components/sections/PortfolioPill";
import SectionSurface from "@/components/sections/SectionSurface";

export default function ProjectsSection() {
  return (
    <SectionSurface id="projects">
      <div className="p-8 md:p-12 xl:p-16">
        <p className="section-kicker">Selected</p>
        <h2 className="section-title">Projects</h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <div key={project.title} className="neon-card p-6">
              <div className="flex items-center justify-between">
                <p className="section-kicker">Case Study</p>
                <PortfolioPill>{project.year}</PortfolioPill>
              </div>

              <h3 className="mt-3 text-base font-semibold text-zinc-100">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.desc}</p>
              <p className="mt-2 text-xs text-zinc-500">{project.highlight}</p>
              <p className="mt-2 text-xs text-zinc-600">{project.role}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <PortfolioPill key={tech}>{tech}</PortfolioPill>
                ))}
              </div>

              <div className="mt-4 flex gap-3">
                {project.links.map((link) => (
                  <a key={link.label} className="btn-neon-ghost text-xs" href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionSurface>
  );
}
