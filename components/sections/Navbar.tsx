"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, Layers3, Menu, Send, UserRound, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

type NavItem = {
  label: string;
  href: `#${string}`;
  Icon: LucideIcon;
};

const navItems: NavItem[] = [
  { label: "About Me", href: "#about", Icon: UserRound },
  { label: "Skill Stack", href: "#skills", Icon: Layers3 },
  { label: "Projects", href: "#projects", Icon: BriefcaseBusiness },
  { label: "Contact", href: "#contact", Icon: Send },
];

const sectionIds = navItems.map((item) => item.href.slice(1));

type NavLinkProps = NavItem & {
  isActive: boolean;
  onNavigate: (href: NavItem["href"]) => void;
  variant?: "desktop" | "mobile";
};

function NavLink({ label, href, Icon, isActive, onNavigate, variant = "desktop" }: NavLinkProps) {
  const isMobile = variant === "mobile";

  return (
    <a
      href={href}
      aria-current={isActive ? "page" : undefined}
      onClick={() => onNavigate(href)}
      className={[
        "group inline-flex items-center rounded-full border font-medium leading-none tracking-normal transition-all duration-300 ease-out",
        isMobile
          ? "h-12 w-full justify-start gap-3 px-4 text-sm"
          : "h-10 shrink-0 justify-center gap-2 px-3.5 text-sm lg:px-4",
        isActive
          ? "border-white/[0.08] bg-white/[0.04] text-white"
          : "border-transparent bg-transparent text-white/70",
        "hover:border-white/[0.1] hover:bg-white/[0.1] hover:text-white hover:shadow-[0_0_24px_rgba(255,255,255,0.08)] hover:backdrop-blur-md focus-visible:border-white/[0.12] focus-visible:bg-white/[0.1] focus-visible:text-white focus-visible:outline-none focus-visible:backdrop-blur-md",
      ].join(" ")}
    >
      <Icon
        className={[
          "shrink-0 transition duration-300",
          isMobile ? "h-[1.125rem] w-[1.125rem]" : "h-4 w-4",
          isActive ? "text-white" : "text-white/55 group-hover:text-white",
        ].join(" ")}
        aria-hidden="true"
      />
      <span className="whitespace-nowrap">{label}</span>
    </a>
  );
}

export default function Navbar() {
  const [activeHref, setActiveHref] = useState<NavItem["href"]>("#about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const syncHash = () => {
      const nextHash = window.location.hash as NavItem["href"];

      if (navItems.some((item) => item.href === nextHash)) {
        setActiveHref((currentHref) => (currentHref === nextHash ? currentHref : nextHash));
      }
    };

    syncHash();

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          const nextHref = `#${visibleEntry.target.id}` as NavItem["href"];

          setActiveHref((currentHref) => (currentHref === nextHref ? currentHref : nextHref));
        }
      },
      {
        rootMargin: "-24% 0px -58% 0px",
        threshold: [0.08, 0.24, 0.48, 0.72],
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    window.addEventListener("hashchange", syncHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavigate = (href: NavItem["href"]) => {
    setActiveHref((currentHref) => (currentHref === href ? currentHref : href));
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed right-5 top-5 z-50 w-fit sm:right-6 md:left-1/2 md:right-auto md:w-[calc(100%-2rem)] md:max-w-[116rem] md:-translate-x-1/2 lg:top-6 lg:w-[calc(100%-3rem)]">
      <motion.div
        initial={{ opacity: 0, y: -14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-50 flex min-h-0 w-fit items-center justify-end overflow-hidden rounded-full border border-white/[0.1] bg-black/[0.32] p-1.5 shadow-[0_8px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:min-h-[4.4rem] md:w-full md:justify-center md:rounded-[28px] md:px-8 md:py-3 lg:px-10 supports-[backdrop-filter]:bg-neutral-950/[0.4]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.09),transparent_68%)]"
        />

        <nav
          aria-label="Primary navigation"
          className="relative z-10 hidden w-full items-center justify-center gap-2 md:flex lg:gap-4"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              isActive={activeHref === item.href}
              onNavigate={handleNavigate}
            />
          ))}
        </nav>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((value) => !value)}
          className="relative z-10 inline-flex h-9 items-center justify-center gap-2 rounded-full border border-transparent bg-transparent px-3 text-xs font-medium text-white/75 transition-all duration-300 ease-out hover:border-white/[0.1] hover:bg-white/[0.1] hover:text-white hover:shadow-[0_0_24px_rgba(255,255,255,0.08)] hover:backdrop-blur-md focus-visible:border-white/[0.12] focus-visible:bg-white/[0.1] focus-visible:text-white focus-visible:outline-none md:hidden"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          <span>Menu</span>
        </button>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-black/[0.32] backdrop-blur-lg md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.nav
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-24 w-[calc(100%-1.5rem)] overflow-hidden rounded-[28px] border border-white/[0.1] bg-neutral-950/[0.44] p-2.5 shadow-[0_24px_72px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="grid gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    {...item}
                    variant="mobile"
                    isActive={activeHref === item.href}
                    onNavigate={handleNavigate}
                  />
                ))}
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
