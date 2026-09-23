"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div
        className={`w-8 h-8 md:w-9 md:h-9 rounded-full border border-transparent opacity-0 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={[
        "flex items-center justify-center p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shrink-0",
        isDark
          ? "bg-neutral-800 text-white border border-white/10 hover:bg-neutral-700 shadow-sm"
          : "bg-neutral-100 text-neutral-800 border border-black/10 hover:bg-neutral-200 shadow-sm",
        className,
      ].join(" ")}
      id="theme-toggle-btn"
    >
      {isDark ? (
        <Sun className="h-4 w-4 md:h-4.5 md:w-4.5 text-yellow-300 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 md:h-4.5 md:w-4.5 text-neutral-700 transition-transform duration-300 -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
}
