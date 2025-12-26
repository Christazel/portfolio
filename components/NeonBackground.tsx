"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Particle = { left: string; top: string; size: number; d: number; delay: number; opacity: number };

function prand(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export default function NeonBackground() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 22 }).map((_, i) => {
      const a = prand(i + 1);
      const b = prand(i + 33);
      const c = prand(i + 77);
      const size = 1 + Math.floor(prand(i + 101) * 2); // 1..2
      return {
        left: `${a * 100}%`,
        top: `${b * 100}%`,
        size,
        d: 3.2 + c * 4.8,
        delay: prand(i + 141) * 2.5,
        opacity: 0.15 + prand(i + 171) * 0.35,
      };
    });
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-zinc-950" />

      {/* neon orbs */}
      <motion.div
        className="absolute -top-40 -left-40 h-[560px] w-[560px] rounded-full blur-[110px]"
        style={{ background: "rgba(168,85,247,0.22)" }}
        animate={{ x: [0, 120, -60, 0], y: [0, 60, 140, 0], scale: [1, 1.12, 0.95, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-12 -right-56 h-[700px] w-[700px] rounded-full blur-[120px]"
        style={{ background: "rgba(59,130,246,0.22)" }}
        animate={{ x: [0, -110, 40, 0], y: [0, 90, -50, 0], scale: [1, 0.94, 1.10, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-60 left-1/3 h-[760px] w-[760px] rounded-full blur-[130px]"
        style={{ background: "rgba(34,211,238,0.16)" }}
        animate={{ x: [0, 80, -120, 0], y: [0, -80, 40, 0], scale: [1, 1.06, 0.96, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:84px_84px]" />

      {/* scanlines */}
      <div className="absolute inset-0 opacity-[0.08] [background:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.08),rgba(255,255,255,0.08)_1px,transparent_1px,transparent_5px)]" />
      <div className="absolute inset-0">
        <div className="absolute -top-1/2 left-0 right-0 h-1/2 bg-gradient-to-b from-cyan-400/0 via-cyan-400/15 to-cyan-400/0 blur-md"
             style={{ animation: "scan 6s ease-in-out infinite" }} />
      </div>

      {/* particles (deterministic) */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "rgba(255,255,255,0.7)",
            opacity: p.opacity,
          }}
          animate={{ y: [0, -26, 0], opacity: [p.opacity * 0.6, p.opacity, p.opacity * 0.6] }}
          transition={{ duration: p.d, repeat: Infinity, delay: p.delay }}
        />
      ))}

      {/* vignette */}
      <div className="absolute inset-0 [background:radial-gradient(900px_circle_at_50%_10%,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="absolute inset-0 [background:radial-gradient(1100px_circle_at_50%_120%,rgba(0,0,0,0),rgba(0,0,0,0.55))]" />
    </div>
  );
}
