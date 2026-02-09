"use client";

import { useRef, memo } from "react";
import { motion, useInView } from "framer-motion";

export default memo(function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 }); // Reduced from 0.25
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== "undefined" && 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: prefersReducedMotion ? 0.2 : 0.55, 
        delay, 
        ease: prefersReducedMotion ? "linear" : [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
});
