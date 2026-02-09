"use client";

import { useEffect, useRef, memo, useCallback } from "react";
import gsap from "gsap";

interface GlitchTextProps {
  children: string;
  className?: string;
}

export default memo(function GlitchText({ children, className = "" }: GlitchTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glitchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const triggerGlitch = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (Math.random() > 0.8) {
      const glitchX = (Math.random() - 0.5) * 10;
      const glitchY = (Math.random() - 0.5) * 10;

      gsap.to(container, {
        x: glitchX,
        y: glitchY,
        duration: 0.05,
        overwrite: "auto",
        onComplete: () => {
          gsap.to(container, {
            x: 0,
            y: 0,
            duration: 0.1,
          });
        },
      });
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let isThrottled = false;

    const onMouseMove = () => {
      if (isThrottled) return;
      isThrottled = true;

      // Throttle with requestAnimationFrame for smooth performance
      if (glitchTimeoutRef.current) {
        clearTimeout(glitchTimeoutRef.current);
      }
      glitchTimeoutRef.current = setTimeout(() => {
        triggerGlitch();
        isThrottled = false;
      }, 60);
    };

    container.addEventListener("mousemove", onMouseMove);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      if (glitchTimeoutRef.current) {
        clearTimeout(glitchTimeoutRef.current);
      }
    };
  }, [triggerGlitch]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{
        textShadow: "0 0 20px rgba(100, 200, 255, 0.5), 0 0 40px rgba(100, 200, 255, 0.3)",
      }}
    >
      {children}
    </div>
  );
});
