import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const footerColumns = [
  {
    title: "Portfolio",
    links: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "#projects" },
      { label: "UI/UX Design", href: "#projects" },
      { label: "Collaboration", href: "#contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Email", href: "mailto:yohan.christazel9@gmail.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/yohan-christazel-jeffry" },
      { label: "GitHub", href: "https://github.com/Christazel" },
    ],
  },
];

const socialLinks = [
  { label: "X", href: "https://x.com", icon: FaXTwitter },
  { label: "GitHub", href: "https://github.com/Christazel", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yohan-christazel-jeffry", icon: FaLinkedinIn },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-zinc-100 text-zinc-950">
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] bg-[radial-gradient(circle_at_1px_1px,#09090b_1px,transparent_0)] bg-size-[18px_18px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-zinc-950/15" />

      <div className="relative z-10 flex flex-col">
        <div className="px-5 py-10 sm:px-8 md:px-12 md:py-12 lg:px-16">
          <div className="grid gap-8 sm:grid-cols-3 md:ml-auto md:max-w-4xl">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="text-sm font-semibold text-zinc-500">{column.title}</p>
                <div className="mt-6 grid gap-4">
                  {column.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-lg font-medium text-zinc-950 transition hover:text-zinc-500"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </nav>
            ))}
          </div>
        </div>

        <div className="select-none px-5 sm:px-8 md:px-12 lg:px-16">
          <p className="footer-giant-text">christazel</p>
        </div>

        <div className="border-y border-zinc-950/10 px-5 py-6 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-medium lowercase text-zinc-600">christazel © 2026</p>

            <div className="flex flex-wrap items-center gap-5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-xl text-zinc-700 transition hover:-translate-y-0.5 hover:text-zinc-950"
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
              <span className="hidden h-5 w-px bg-zinc-950/15 sm:block" />
              <span className="text-sm font-medium text-zinc-700">English</span>
              <span className="text-sm font-medium text-zinc-700">Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
