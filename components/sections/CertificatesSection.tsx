"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import {
  ExternalLink,
  Search,
  X,
  Maximize2,
  Award,
  Calendar,
  Building2,
  CheckCircle2,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import {
  certificates,
  certificateCategories,
  type CertificateCategory,
  type CertificateItem,
} from "@/app/data/certificatesData";

export default function CertificatesSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<CertificateCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalCert, setActiveModalCert] =
    useState<CertificateItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveModalCert(null);
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

  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) => {
      const matchesCategory =
        selectedCategory === "All" || cert.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        cert.description.toLowerCase().includes(q) ||
        cert.skills.some((s) => s.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="cert-section">
      <div className="cert-inner">

        {/* ── Header (matches About / Work page pattern) ── */}
        <div className="about-new-header text-center">
          <ScrollReveal delay={0} duration={0.65} distance={20}>
            <h1 className="about-new-heading">Certificates</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1} duration={0.65} distance={20}>
            <p className="about-new-subheading">
              A collection of competency certifications and academic achievements
              that I have earned.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Filter Toolbar ── */}
        <ScrollReveal delay={0.15} duration={0.6} distance={16}>
          <div className="cert-toolbar">
            {/* Category pills (same pill style as Navbar active indicator) */}
            <div className="cert-categories">
              {certificateCategories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    id={`cert-cat-${cat.toLowerCase()}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={["cert-cat-btn", isActive ? "cert-cat-btn--active" : ""].join(" ")}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="cert-search-wrap">
              <Search className="cert-search-icon" aria-hidden="true" />
              <input
                type="text"
                id="cert-search"
                placeholder="Search by title, issuer or skill…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="cert-search-input"
                aria-label="Search certificates"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="cert-search-clear"
                  aria-label="Clear search"
                >
                  <X className="cert-search-clear-icon" />
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* ── Certificate Grid ── */}
        {filteredCertificates.length === 0 ? (
          <div className="cert-empty">
            <Award className="cert-empty-icon" aria-hidden="true" />
            <h3 className="cert-empty-title">No certificates found</h3>
            <p className="cert-empty-desc">
              Try adjusting your search or selecting a different category.
            </p>
            <button
              type="button"
              id="cert-reset-btn"
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="cert-empty-reset"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="cert-grid">
            {filteredCertificates.map((cert, index) => (
              <div key={cert.id} className="cert-card">
                <ScrollReveal delay={index * 0.07} duration={0.6} distance={24}>

                  {/* Image preview */}
                  <button
                    type="button"
                    id={`cert-preview-${cert.id}`}
                    className="cert-card-preview-btn"
                    onClick={() => setActiveModalCert(cert)}
                    aria-label={`Preview ${cert.title}`}
                  >
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      width={800}
                      height={600}
                      className="cert-card-img"
                      priority={index < 3}
                    />
                    <div className="cert-card-overlay" aria-hidden="true">
                      <span className="cert-card-overlay-pill">
                        <Maximize2 className="cert-card-overlay-icon" />
                        Preview
                      </span>
                    </div>
                  </button>

                  {/* Content */}
                  <div className="cert-card-body">
                    <h3 className="cert-card-title">{cert.title}</h3>

                    <p className="cert-card-issuer">
                      <Building2 className="cert-card-issuer-icon" aria-hidden="true" />
                      {cert.issuer}
                    </p>

                    <p className="cert-card-desc">{cert.description}</p>

                    {/* Skills */}
                    <div className="cert-card-skills">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="skills-new-chip">{skill}</span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="cert-card-skills-more">
                          +{cert.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="cert-card-footer">
                    <span className="cert-card-date">
                      <Calendar className="cert-card-date-icon" aria-hidden="true" />
                      {cert.issueDate}
                    </span>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-card-credential-link"
                    >
                      View Credential
                      <ExternalLink className="cert-card-credential-icon" aria-hidden="true" />
                    </a>
                  </div>

                </ScrollReveal>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox Modal ── */}
      {activeModalCert && (
        <div
          className="cert-modal-backdrop"
          onClick={() => setActiveModalCert(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate: ${activeModalCert.title}`}
        >
          <div
            className="cert-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="cert-modal-header">
              <span className="cert-modal-verified">
                <CheckCircle2 className="cert-modal-verified-icon" aria-hidden="true" />
                Verified Certificate
              </span>
              <button
                type="button"
                id="cert-modal-close"
                onClick={() => setActiveModalCert(null)}
                className="cert-modal-close"
                aria-label="Close preview"
              >
                <X className="cert-modal-close-icon" />
              </button>
            </div>

            {/* Modal scrollable body */}
            <div className="cert-modal-body">
              <div className="cert-modal-img-wrap">
                <Image
                  src={activeModalCert.image}
                  alt={activeModalCert.title}
                  width={1200}
                  height={900}
                  className="cert-modal-img"
                  priority
                />
              </div>

              <div className="cert-modal-info">
                <div>
                  <h2 className="cert-modal-title">{activeModalCert.title}</h2>
                  <p className="cert-modal-meta">
                    {activeModalCert.issuer} · {activeModalCert.issueDate}
                  </p>
                </div>

                <p className="cert-modal-desc">{activeModalCert.description}</p>

                <div>
                  <p className="cert-modal-skills-label">Skills Covered</p>
                  <div className="cert-modal-skills">
                    {activeModalCert.skills.map((skill) => (
                      <span key={skill} className="skills-new-chip">{skill}</span>
                    ))}
                  </div>
                </div>

                {activeModalCert.credentialId && (
                  <p className="cert-modal-credential-id">
                    <span className="cert-modal-credential-label">Credential ID:</span>{" "}
                    <code className="cert-modal-credential-code">
                      {activeModalCert.credentialId}
                    </code>
                  </p>
                )}
              </div>
            </div>

            {/* Modal footer */}
            <div className="cert-modal-footer">
              <span className="cert-modal-esc-hint">
                Press <kbd className="cert-modal-kbd">Esc</kbd> to close
              </span>
              <div className="cert-modal-actions">
                <button
                  type="button"
                  onClick={() => setActiveModalCert(null)}
                  className="cert-modal-btn-close"
                >
                  Close
                </button>
                <a
                  href={activeModalCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-modal-btn-verify"
                >
                  Verify Credential
                  <ExternalLink className="cert-card-credential-icon" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
