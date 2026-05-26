"use client";

import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { projects } from "@/app/data/homeData";
import PortfolioPill from "@/components/sections/PortfolioPill";
import CommentBox from "@/components/ui/CommentBox";

export default function ProjectContactStackSection() {
  const featuredProject = projects[0];
  const trackRef = useRef<HTMLDivElement | null>(null);

  const slide = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    const amount = track.clientWidth * 0.82;
    track.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="project-carousel-section relative py-10 text-zinc-100 md:py-24">
      <div className="container-page relative z-10">
        <div className="project-stack-header mx-auto mb-10 max-w-5xl text-center">
          <p className="section-kicker">Selected Work</p>
          <h2 className="section-title mt-3">Projects & Contact</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-zinc-400 md:text-lg">
            Project details and contact touchpoints are arranged in a horizontal card slider.
          </p>
        </div>

        <div className="project-carousel-frame">
          <button
            type="button"
            className="project-carousel-control project-carousel-control-prev"
            onClick={() => slide("prev")}
            aria-label="Previous project card"
          >
            <FiChevronLeft aria-hidden="true" />
          </button>

          <div ref={trackRef} className="project-carousel-track" aria-label="Projects and contact slider">
            <article className="project-carousel-card project-carousel-card-featured">
              {featuredProject ? (
                <div className="project-featured-layout">
                  <div className="project-featured-main">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="section-kicker">Selected Project</p>
                      <PortfolioPill>{featuredProject.year}</PortfolioPill>
                    </div>

                    <h3 className="mt-7 text-4xl font-semibold leading-none text-zinc-50 md:text-6xl">
                      {featuredProject.title}
                    </h3>

                    <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
                      {featuredProject.desc}
                    </p>
                  </div>

                  <div className="project-featured-side">
                    <div>
                      <p className="project-carousel-label">Role</p>
                      <p className="mt-2 text-lg font-semibold text-zinc-100">{featuredProject.role}</p>
                    </div>

                    <div>
                      <p className="project-carousel-label">Highlight</p>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{featuredProject.highlight}</p>
                    </div>

                    <div>
                      <p className="project-carousel-label">Stack</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {featuredProject.tech.map((tech) => (
                          <PortfolioPill key={tech}>{tech}</PortfolioPill>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {featuredProject.links.map((link) => {
                        const isExternal = link.href.startsWith("http");

                        return (
                          <a
                            key={link.label}
                            className="btn-neon-ghost text-xs"
                            href={link.href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                          >
                            {link.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : null}
            </article>

            <article id="contact" className="project-carousel-card">
              <div className="flex h-full flex-col justify-between gap-10">
                <div>
                  <p className="section-kicker">Contact</p>
                  <h3 className="mt-5 text-4xl font-semibold leading-none text-zinc-50 md:text-5xl">
                    Let&apos;s Work Together
                  </h3>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
                    Open for freelance builds, internships, and collaborative product development.
                  </p>
                </div>

                <div className="grid gap-6">
                  <div className="contact-open-item">
                    <p className="contact-open-label">Email</p>
                    <a className="contact-open-link break-all sm:break-normal" href="mailto:yohan.christazel9@gmail.com">
                      yohan.christazel9@gmail.com
                    </a>
                  </div>

                  <div className="contact-open-item">
                    <p className="contact-open-label">LinkedIn</p>
                    <a
                      className="contact-open-link break-all sm:break-normal"
                      href="https://www.linkedin.com/in/yohan-christazel-jeffry"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      linkedin.com/in/yohan-christazel-jeffry
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <PortfolioPill>Remote</PortfolioPill>
                    <PortfolioPill>On-site</PortfolioPill>
                  </div>
                </div>
              </div>
            </article>

            <article className="project-carousel-card project-carousel-card-message">
              <CommentBox compact showRecentNotes={false} />
            </article>
          </div>

          <button
            type="button"
            className="project-carousel-control project-carousel-control-next"
            onClick={() => slide("next")}
            aria-label="Next project card"
          >
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
