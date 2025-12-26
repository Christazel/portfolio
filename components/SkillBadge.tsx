"use client";

import { motion } from "framer-motion";

export default function SkillBadge({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.08, y: -2 }}
      className="inline-block px-4 py-2 bg-zinc-800/50 backdrop-blur border border-zinc-700/50 rounded-full text-sm text-zinc-300 hover:bg-zinc-700/50 hover:border-zinc-600 transition-colors cursor-default"
    >
      {skill}
    </motion.span>
  );
}
