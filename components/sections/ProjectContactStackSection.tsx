"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { projects } from "@/app/data/homeData";
import PortfolioPill from "@/components/sections/PortfolioPill";
import CommentBox from "@/components/ui/CommentBox";
import StackCard, { type StackingCardItem } from "@/components/ui/StackCard";

const stackMeta: StackingCardItem[] = [
  {
    title: "Selected Project",
    description: "A focused look at shipped work, role, stack, and the real problem each build solves.",
    accentColor: "#60a5fa",
    footer: "Projects stack into the contact flow",
  },
  {
    title: "Build Approach",
    description: "How I think through product flow, API design, interface polish, and maintainability.",
    accentColor: "#a78bfa",
    footer: "Process details stay close to the work",
  },
  {
    title: "Let’s Work Together",
    description: "Open for freelance builds, internships, and collaborative product development.",
    accentColor: "#22d3ee",
    footer: "Contact details appear as the next layer",
  },
  {
    title: "Send a Message",
    description: "Leave a note directly from the site so we can start with context.",
    accentColor: "#84cc16",
    footer: "Final card holds the contact form",
  },
];

export default function ProjectContactStackSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const featuredProject = projects[0];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.25,
  });

  const headerY = useTransform(smoothProgress, [0, 0.22], [0, -48]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.22], [1, 0.35]);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative py-16 text-zinc-100 md:py-24"
    >
      <div className="container-page relative z-10">
      <motion.div className="sticky top-28 z-0 mx-auto mb-10 max-w-5xl text-center" style={{ y: headerY, opacity: headerOpacity }}>
        <p className="section-kicker">Selected Work</p>
        <h2 className="section-title mt-3">Projects & Contact</h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-zinc-400 md:text-lg">
          Project details and contact touchpoints now stack into each other with a smooth sticky scroll experience.
        </p>
      </motion.div>

      <div className="relative">
        <StackCard card={stackMeta[0]} index={0} total={stackMeta.length} progress={smoothProgress}>
          {featuredProject ? (
            <div className="flex h-full flex-col justify-between gap-8">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <p className="section-kicker">Case Study</p>
                  <PortfolioPill>{featuredProject.year}</PortfolioPill>
                </div>

                <h3 className="mt-5 text-3xl font-semibold leading-tight text-zinc-50 md:text-5xl">
                  {featuredProject.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-zinc-300 md:text-lg">{featuredProject.desc}</p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-500">{featuredProject.highlight}</p>
                <p className="mt-4 text-sm text-zinc-600">{featuredProject.role}</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  {featuredProject.tech.map((tech) => (
                    <PortfolioPill key={tech}>{tech}</PortfolioPill>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {featuredProject.links.map((link) => (
                    <a key={link.label} className="btn-neon-ghost text-xs" href={link.href}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </StackCard>

        <StackCard card={stackMeta[1]} index={1} total={stackMeta.length} progress={smoothProgress}>
          <div className="grid h-full gap-4 content-center">
            {[
              ["Discovery", "Clarify goals, users, features, and technical boundaries before building."],
              ["Interface", "Create responsive layouts with calm motion, clear hierarchy, and reusable components."],
              ["Backend", "Connect data, API routes, authentication patterns, and deployment concerns."],
              ["Polish", "Check performance, interaction details, and maintainability before handoff."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-[#242424] p-5">
                <p className="text-lg font-semibold text-zinc-100">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{description}</p>
              </div>
            ))}
          </div>
        </StackCard>

        <StackCard card={stackMeta[2]} index={2} total={stackMeta.length} progress={smoothProgress}>
          <div id="contact" className="grid h-full content-center gap-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#242424] p-5">
                <p className="text-xs text-zinc-500">Email</p>
                <a className="mt-2 block text-base text-zinc-200 transition hover:text-white" href="mailto:yohan.christazel9@gmail.com">
                  yohan.christazel9@gmail.com
                </a>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#242424] p-5">
                <p className="text-xs text-zinc-500">WhatsApp</p>
                <a
                  className="mt-2 block text-base text-zinc-200 transition hover:text-white"
                  href="https://wa.me/6282150754301"
                  target="_blank"
                  rel="noreferrer"
                >
                  +62 821-5075-4301
                </a>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#242424] p-5 md:col-span-2">
                <p className="text-xs text-zinc-500">LinkedIn</p>
                <a
                  className="mt-2 block text-base text-zinc-200 transition hover:text-white"
                  href="https://www.linkedin.com/in/yohan-christazel-jeffry"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/yohan-christazel-jeffry
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#242424] p-5">
              <p className="section-kicker">Availability</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                Open for freelance projects, internships, and collaborative builds.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <PortfolioPill>Remote</PortfolioPill>
                <PortfolioPill>On-site</PortfolioPill>
              </div>
            </div>
          </div>
        </StackCard>

        <StackCard card={stackMeta[3]} index={3} total={stackMeta.length} progress={smoothProgress}>
          <div className="h-full overflow-y-auto pr-1">
            <CommentBox maxVisible={4} compact />
          </div>
        </StackCard>
      </div>
      </div>
    </section>
  );
}
