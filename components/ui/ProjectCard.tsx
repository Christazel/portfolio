"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/animations/Reveal";

export type Project = {
  title: string;
  desc: string;
  tech: string[];
  links: { label: string; href: string }[];
};

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Throttle to ~60fps (16ms)
    const now = Date.now();
    if (now - lastTimeRef.current < 16) return;
    lastTimeRef.current = now;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    
    rafRef.current = requestAnimationFrame(() => {
      const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      e.currentTarget.style.setProperty("--mx", `${x}px`);
      e.currentTarget.style.setProperty("--my", `${y}px`);
    });
  }, []);

  return (
    <Reveal delay={index * 0.1}>
      <motion.div
        className="relative group"
        onMouseMove={onMouseMove}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.28 }}
      >
        <motion.div
          className="absolute -inset-0.5 bg-linear-to-r from-purple-600 via-blue-600 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"
          animate={{ rotate: hovered ? 360 : 0 }}
          transition={{ duration: 3, ease: "linear", repeat: hovered ? Infinity : 0 }}
        />

        <div className="relative bg-zinc-900/90 backdrop-blur border border-zinc-800 rounded-2xl p-6 overflow-hidden">
          {/* Glow follow cursor */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(139, 92, 246, 0.12), transparent 40%)",
            }}
          />

          <div className="relative z-10">
            <motion.h3
              className="text-xl font-semibold text-zinc-100 mb-2"
              animate={{ x: hovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {project.title}
            </motion.h3>

            <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{project.desc}</p>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="px-3 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-xs text-zinc-300"
                >
                  {t}
                </motion.span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.links.map((l) => {
                const ext = l.href.startsWith("http");
                return (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    target={ext ? "_blank" : undefined}
                    rel={ext ? "noreferrer" : undefined}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-sm text-zinc-200 transition-colors"
                  >
                    {l.label}
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}
