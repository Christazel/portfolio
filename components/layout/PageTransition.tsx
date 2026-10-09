"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <motion.div
      key={pathname}
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.32,
        ease: [0.16, 1, 0.3, 1],
      }}
      onAnimationStart={() => setIsAnimating(true)}
      onAnimationComplete={() => setIsAnimating(false)}
      style={{
        willChange: isAnimating ? "opacity, transform" : "auto",
      }}
    >
      {children}
    </motion.div>
  );
}
