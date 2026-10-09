"use client";

import Image from "next/image";
import { ExternalLink, Award, Clock, Calendar } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { certificates } from "@/app/data/certificatesData";

export default function CertificatesSection() {
  return (
    <section className="w-full">
      {/* ── Heading (matching About & My Work header styling) ── */}
      <ScrollReveal delay={0} duration={0.48} distance={20}>
        <div className="about-new-header text-center flex flex-col items-center justify-center mx-auto max-w-2xl mb-8 md:mb-10">
          <h1 className="about-new-heading text-center">Certificates</h1>
          <p className="about-new-subheading text-center max-w-xl mx-auto">
            A verified collection of professional competency certifications and technical credentials issued by Dicoding Academy, AWS, and Google Developers Partners.
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
            {/* Certificate Preview Image (opens official verification page) */}
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-[1684/1191] rounded-xl overflow-hidden mb-4 bg-neutral-100 dark:bg-neutral-800 shrink-0 block relative cursor-pointer border border-neutral-200/50 dark:border-neutral-700/50 shadow-inner group/img"
              aria-label={`Verify credential for ${cert.title}`}
            >
              <Image
                src={cert.image}
                alt={cert.title}
                width={842}
                height={595}
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
                priority={index < 3}
                unoptimized
              />
              <div className="absolute inset-0 bg-neutral-950/0 group-hover/img:bg-neutral-950/30 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100 backdrop-blur-[1px]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-neutral-900/95 text-xs font-semibold text-neutral-900 dark:text-white shadow-lg backdrop-blur-sm transform translate-y-1 group-hover/img:translate-y-0 transition-transform">
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  Verifikasi
                </span>
              </div>
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
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {cert.duration}
                  </span>
                </div>
              </div>

              {/* Standard / Partner Badge if available */}
              {cert.standard && (
                <div className="mb-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/50">
                    <Award className="w-2.5 h-2.5 shrink-0" />
                    {cert.standard}
                  </span>
                </div>
              )}

              {/* Title */}
              <h2 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2 leading-snug line-clamp-2 text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
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
                  <span className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-neutral-400" />
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
                  aria-label={`Verify ${cert.title}`}
                >
                  <span>Verifikasi</span>
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
