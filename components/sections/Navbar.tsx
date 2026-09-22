"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "My Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setIsScrolled(scrollY > 25);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="w-full flex justify-center px-3 sm:px-6 md:px-8">
        <nav
          className={[
            "pointer-events-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isScrolled
              ? "mt-3 md:mt-4 w-full max-w-3xl rounded-full border border-white/[0.12] bg-neutral-950/85 px-4 md:px-5 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl"
              : "mt-0 w-full max-w-7xl rounded-none border border-transparent bg-transparent px-3 md:px-6 py-5 md:py-6 shadow-none",
          ].join(" ")}
          aria-label="Primary navigation"
        >
          {/* Brand / Logo */}
          <Link
            href="/"
            onClick={handleClose}
            className="text-base md:text-lg font-bold tracking-tight text-white hover:text-neutral-300 transition shrink-0"
          >
            Christazel
          </Link>

          {/* Center Nav Items (Desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "text-xs md:text-sm font-medium transition-all duration-200 px-3.5 py-1.5 rounded-full",
                    isActive
                      ? "bg-neutral-800 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] font-semibold"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.05]",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right CTA / Mobile toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/contact"
              onClick={handleClose}
              className="hidden sm:inline-flex items-center justify-center bg-white text-black font-bold text-xs md:text-sm px-4 md:px-5 py-1.5 md:py-2 rounded-full transition-all hover:bg-neutral-200 hover:scale-105 active:scale-95 shadow-sm"
            >
              Hire Me
            </Link>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="inline-flex md:hidden items-center justify-center p-1.5 text-neutral-300 hover:text-white rounded-full transition"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mx-4 mt-2 max-w-lg p-3 rounded-2xl border border-white/[0.12] bg-neutral-950/95 backdrop-blur-2xl shadow-2xl flex flex-col gap-1 md:hidden"
          >
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleClose}
                  className={[
                    "text-sm font-medium px-4 py-2.5 rounded-xl transition",
                    isActive
                      ? "bg-neutral-800 text-white font-semibold"
                      : "text-neutral-300 hover:text-white hover:bg-white/[0.06]",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={handleClose}
              className="mt-2 text-center bg-white text-black font-bold text-sm py-2.5 rounded-xl transition hover:bg-neutral-200"
            >
              Hire Me
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
