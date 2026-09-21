import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { HiMail } from "react-icons/hi";

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
        <div className="contact-new-header">
          <p className="section-kicker">Get in touch</p>
          <h2 className="contact-new-heading">Contact</h2>
          <p className="contact-new-sub">
            Open for freelance projects, internships, and collaborative builds.
          </p>
        </div>

        {/* Contact links list */}
        <div className="contact-new-list">
          {contactItems.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="contact-new-item group"
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
          ))}
        </div>

        {/* Availability tags */}
        <div className="contact-new-availability">
          <span className="contact-avail-dot" aria-hidden="true" />
          <span className="contact-avail-text">
            Available for Remote &amp; On-site opportunities
          </span>
        </div>
      </div>
    </section>
  );
}
