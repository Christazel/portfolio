"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  ExternalLink,
  X,
  CheckCircle2,
  Copy,
  Check,
  Award,
  Clock,
  Calendar,
  Maximize2,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import {
  certificates,
  type CertificateItem,
  type CertificateCategory,
} from "@/app/data/certificatesData";

const filterTabs: { label: string; value: CertificateCategory | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Frontend", value: "Frontend" },
  { label: "Fullstack", value: "Fullstack" },
  { label: "Tools", value: "Tools" },
];

export default function CertificatesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalCert, setActiveModalCert] = useState<CertificateItem | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Filtered certificates
  const filteredCertificates = useMemo(() => {
    if (selectedCategory === "All") return certificates;
    return certificates.filter((cert) => cert.category === selectedCategory);
  }, [selectedCategory]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: certificates.length };
    certificates.forEach((cert) => {
      counts[cert.category] = (counts[cert.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Handle ESC key and scroll locking for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalCert(null);
      }
    };

    if (activeModalCert) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModalCert]);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <section className="w-full">
      {/* ── Heading (matching About & My Work header styling) ── */}
      <ScrollReveal delay={0} duration={0.7} distance={30}>
        <div className="about-new-header text-center flex flex-col items-center justify-center mx-auto max-w-2xl mb-8 md:mb-10">
          <h1 className="about-new-heading text-center">Certificates</h1>
          <p className="about-new-subheading text-center max-w-xl mx-auto">
            A verified collection of professional competency certifications and technical credentials issued by Dicoding Academy, AWS, and Google Developers Partners.
          </p>
        </div>
      </ScrollReveal>

      {/* ── Category Filter Tabs ── */}
      <div className="flex items-center justify-center gap-2 mb-8 md:mb-10 overflow-x-auto pb-2 px-2 scrollbar-none">
        {filterTabs.map((tab) => {
          const count = categoryCounts[tab.value] || 0;
          const isActive = selectedCategory === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setSelectedCategory(tab.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer shrink-0 flex items-center gap-2 ${
                isActive
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md scale-105"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 dark:bg-neutral-800/80 dark:text-neutral-300 dark:hover:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? "bg-white/20 text-white dark:bg-neutral-900/20 dark:text-neutral-900"
                    : "bg-neutral-200/80 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Certificates Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
        {filteredCertificates.map((cert, index) => (
          <article
            key={cert.id}
            className="group relative rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/70 backdrop-blur-sm p-4 sm:p-5 overflow-hidden shadow-sm hover:shadow-xl dark:hover:border-neutral-700 transition-all duration-300 h-full flex flex-col hover:-translate-y-1"
          >
            {/* Certificate Preview Image (clicking opens detail modal) */}
            <div
              onClick={() => setActiveModalCert(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveModalCert(cert);
                }
              }}
              className="aspect-[1684/1191] rounded-xl overflow-hidden mb-4 bg-neutral-100 dark:bg-neutral-800 shrink-0 block relative cursor-pointer border border-neutral-200/50 dark:border-neutral-700/50 shadow-inner group/img"
              aria-label={`Preview credential for ${cert.title}`}
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
                  <Maximize2 className="w-3.5 h-3.5" />
                  Lihat Detail
                </span>
              </div>
            </div>

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
                <button
                  type="button"
                  onClick={() => setActiveModalCert(cert)}
                  className="text-left hover:underline cursor-pointer"
                >
                  {cert.title}
                </button>
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
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveModalCert(cert)}
                    className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/70 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                  >
                    Detail
                  </button>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline inline-flex items-center gap-1 transition-colors"
                    aria-label={`Verify ${cert.title} at Dicoding`}
                  >
                    <span>Verifikasi</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── High-Resolution Certificate Detail & Competencies Lightbox Modal ── */}
      {activeModalCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveModalCert(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-cert-title"
        >
          <div
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-5 sm:p-6 md:p-7 flex flex-col gap-5 text-neutral-900 dark:text-neutral-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalCert(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors z-10 cursor-pointer"
              aria-label="Close certificate modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Certificate Image */}
            <div className="aspect-[1684/1191] w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/80 shadow-md relative">
              <Image
                src={activeModalCert.image}
                alt={activeModalCert.title}
                width={1684}
                height={1191}
                className="w-full h-full object-contain"
                unoptimized
              />
            </div>

            {/* Modal Body Info */}
            <div className="flex flex-col gap-4">
              {/* Header Badges & Issuer */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-neutral-600 dark:text-neutral-300">
                    {activeModalCert.issuer}
                  </span>
                  {activeModalCert.standard && (
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/50">
                      {activeModalCert.standard}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {activeModalCert.score && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Nilai 100/100
                    </span>
                  )}
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activeModalCert.duration}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 id="modal-cert-title" className="text-lg sm:text-xl font-bold mb-2">
                  {activeModalCert.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {activeModalCert.description}
                </p>
              </div>

              {/* Competencies Section */}
              <div className="rounded-xl p-4 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Materi & Kompetensi Terverifikasi:
                </h4>
                <ul className="grid grid-cols-1 gap-2">
                  {activeModalCert.competencies.map((comp, idx) => (
                    <li key={idx} className="text-xs text-neutral-700 dark:text-neutral-200 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skill Pills */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                  Skills:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalCert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Meta & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    ID Sertifikat: <code className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">{activeModalCert.credentialId}</code>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyId(activeModalCert.credentialId)}
                    className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                    title="Copy Credential ID"
                    aria-label="Copy credential ID"
                  >
                    {copiedId ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  {copiedId && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold animate-in fade-in">
                      Tersalin!
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={activeModalCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>Verifikasi Resmi di Dicoding</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
