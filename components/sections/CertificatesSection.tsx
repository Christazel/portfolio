"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { certificates } from "@/app/data/certificatesData";

export default function CertificatesSection() {
  return (
    <section className="w-full">
      {/* ── Heading (matching About & My Work header styling) ── */}
      <ScrollReveal delay={0} duration={0.7} distance={30}>
        <div className="about-new-header text-center flex flex-col items-center justify-center mx-auto max-w-2xl mb-10 md:mb-14">
          <h1 className="about-new-heading text-center">Certificates</h1>
          <p className="about-new-subheading text-center max-w-xl mx-auto">
            A collection of competency certifications and technical achievements that I have earned.
          </p>
        </div>
      </ScrollReveal>

      {/* ── Certificates Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
        {certificates.map((cert, index) => (
          <article
            key={cert.id}
            className="group relative rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/70 backdrop-blur-sm p-4 sm:p-5 overflow-hidden shadow-sm hover:shadow-xl dark:hover:border-neutral-700 transition-all duration-300 h-full flex flex-col hover:-translate-y-1"
          >
              {/* Certificate Preview Image (directly opens credential on click) */}
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-[29/20] rounded-xl overflow-hidden mb-4 bg-neutral-100 dark:bg-neutral-800 shrink-0 block relative cursor-pointer border border-neutral-200/50 dark:border-neutral-700/50 shadow-inner"
                aria-label={`View credential for ${cert.title}`}
              >
                <Image
                  src={cert.image}
                  alt={cert.title}
                  width={870}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  priority={index < 3}
                  unoptimized
                />
              </a>

              {/* Card Body */}
              <div className="flex flex-col flex-grow">
                {/* Header Meta: Issuer, Score, Duration */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 tracking-wide">
                    {cert.issuer}
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {cert.score && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Nilai 100
                      </span>
                    )}
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60">
                      {cert.duration}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2 leading-snug line-clamp-2 text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {cert.title}
                  </a>
                </h2>

                {/* Description */}
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-3 leading-relaxed">
                  {cert.description}
                </p>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-neutral-100/90 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-700/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer with Date, Validity, and Direct Link */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">
                      {cert.issueDate}
                    </span>
                    <span className="text-[9px] text-neutral-400 dark:text-neutral-500">
                      Berlaku s.d. {cert.validUntil}
                    </span>
                  </div>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
        ))}
      </div>
    </section>
  );
}
