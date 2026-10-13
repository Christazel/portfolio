import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import ScrollReveal from "@/components/animations/ScrollReveal";

const contactItems = [
  {
    label: "Email",
    value: "yohan.christazel9@gmail.com",
    href: "mailto:yohan.christazel9@gmail.com",
    icon: HiMail,
  },
  {
    label: "WhatsApp",
    value: "+62 821-5075-4301",
    href: "https://wa.me/6282150754301",
    icon: BsWhatsapp,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/yohan-christazel-jeffry",
    href: "https://www.linkedin.com/in/yohan-christazel-jeffry",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    value: "github.com/Christazel",
    href: "https://github.com/Christazel",
    icon: FaGithub,
  },
];

export default function ContactSection() {
  return (
    <section className="contact-new-section">
      <div className="contact-new-inner">
        {/* Header */}
        <ScrollReveal delay={0} duration={0.8} distance={24}>
          <div className="about-new-header text-center flex flex-col items-center justify-center mx-auto max-w-2xl mb-8">
            <h1 className="about-new-heading text-center">Contact</h1>
            <p className="about-new-subheading text-center max-w-xl mx-auto">
              Open for freelance projects, internships, and collaborative builds.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact links list */}
        <div className="contact-new-list">
          {contactItems.map(({ label, value, href, icon: Icon }, i) => (
            <ScrollReveal
              key={label}
              delay={0.08 + i * 0.08}
              duration={0.8}
              distance={24}
              className="h-full w-full"
            >
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="contact-new-item group h-full w-full"
                id={`contact-${label.toLowerCase()}`}
              >
                <span className="contact-new-item-icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="contact-new-item-body">
                  <span className="contact-new-item-label">{label}</span>
                  <span className="contact-new-item-value">{value}</span>
                </span>
                <span className="contact-new-item-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* Availability tags */}
        <ScrollReveal delay={0.4} duration={0.8} distance={20}>
          <div className="contact-new-availability">
            <span className="contact-avail-dot" aria-hidden="true" />
            <span className="contact-avail-text">
              Available for Remote &amp; On-site opportunities
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
