"use client";

import { useEffect, useRef } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { BsWhatsapp } from "react-icons/bs";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yohan-christazel-jeffry",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "https://github.com/Christazel",
    icon: FaGithub,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6282150754301",
    icon: BsWhatsapp,
  },
  {
    label: "Email",
    href: "mailto:yohan.christazel9@gmail.com",
    icon: HiMail,
  },
];

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [headingRef.current, subtitleRef.current, ctaRef.current];
    const timers = elements.map((el, i) => {
      if (!el) return undefined;
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      return setTimeout(() => {
        if (el) {
          el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      }, 100 + i * 150);
    });
    return () => timers.forEach((t) => t && clearTimeout(t));
  }, []);

  return (
    <section
      className="hero-new-section"
      aria-label="Portfolio introduction"

    >
      {/* Background grid + radial mask */}
      <div className="hero-new-bg" aria-hidden="true">
        <div className="hero-new-grid" />
        <div className="hero-new-radial-mask" />
      </div>

      <div className="hero-new-inner">
        <h1 ref={headingRef} className="hero-new-heading">
          Yohan Christazel Jeffry.
        </h1>

        <p ref={subtitleRef} className="hero-new-subtitle">
          A{" "}
          <span className="hero-new-subtitle-accent">
            Fullstack Developer
          </span>{" "}
          specialized in building high-performance web applications with modern
          aesthetics.
        </p>

        <div ref={ctaRef} className="hero-new-cta-group flex flex-col items-center gap-5 mt-2">
          <a href="/work" className="hero-new-cta-primary" id="hero-view-work-btn">
            View My Work
          </a>

          <div className="hero-new-socials flex items-center justify-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="hero-new-social-btn"
                id={`hero-social-${label.toLowerCase()}`}
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
