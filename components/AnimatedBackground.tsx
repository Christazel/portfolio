"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base glow */}
      <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_20%_10%,rgba(120,119,198,0.20),transparent_55%),radial-gradient(900px_circle_at_80%_20%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(900px_circle_at_50%_90%,rgba(16,185,129,0.12),transparent_55%)]" />

      {/* animated blobs */}
      <motion.div
        className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-white/6 blur-3xl"
        animate={{ x: [0, 60, -20, 0], y: [0, 30, 70, 0], scale: [1, 1.08, 0.98, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-10 -right-40 h-[520px] w-[520px] rounded-full bg-white/6 blur-3xl"
        animate={{ x: [0, -70, 10, 0], y: [0, 50, -20, 0], scale: [1, 0.98, 1.06, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-52 left-1/3 h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl"
        animate={{ x: [0, 30, -60, 0], y: [0, -40, 20, 0], scale: [1, 1.05, 0.98, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:72px_72px]" />
    </div>
  );
}
