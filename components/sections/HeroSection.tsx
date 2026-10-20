import Link from "next/link";
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
  return (
    <section className="hero-new-section" aria-label="Portfolio introduction">
      {/* Background grid + radial mask */}
      <div className="hero-new-bg" aria-hidden="true">
        <div className="hero-new-grid" />
        <div className="hero-new-radial-mask" />
      </div>

      <div className="hero-new-inner">
        <h1 className="hero-new-heading animate-hero-1">Yohan Christazel Jeffry.</h1>

        <p className="hero-new-subtitle animate-hero-2">
          A <span className="hero-new-subtitle-accent">Freelance Full Stack Web Developer</span>{" "}
          specializing in building modern web applications, interactive user interfaces, and
          scalable backend systems.
        </p>

        <div className="hero-new-cta-group flex flex-col items-center gap-5 mt-2 animate-hero-3">
          <Link href="/work" className="hero-new-cta-primary" id="hero-view-work-btn">
            View My Work
          </Link>

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
