"use client";

import { useEffect, useRef, memo, useCallback } from "react";

interface GlitchTextProps {
  children: string;
  className?: string;
}

export default memo(function GlitchText({ children, className = "" }: GlitchTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glitchTimeoutRef = useRef<number | undefined>(undefined);
  const lastTickRef = useRef(0);

  const triggerGlitch = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (Math.random() > 0.82) {
      const glitchX = (Math.random() - 0.5) * 10;
      const glitchY = (Math.random() - 0.5) * 10;

      container.animate(
        [
          { transform: "translate3d(0, 0, 0)" },
          { transform: `translate3d(${glitchX.toFixed(2)}px, ${glitchY.toFixed(2)}px, 0)` },
          { transform: "translate3d(0, 0, 0)" },
        ],
        {
          duration: 120,
          easing: "steps(2, end)",
        }
      );
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersReducedMotion || !canHover) return;

    const onPointerMove = () => {
      const now = performance.now();
      if (now - lastTickRef.current < 70) return;
      lastTickRef.current = now;

      if (glitchTimeoutRef.current) {
        window.clearTimeout(glitchTimeoutRef.current);
      }
      glitchTimeoutRef.current = window.setTimeout(() => {
        triggerGlitch();
      }, 60);
    };

    container.addEventListener("pointermove", onPointerMove);

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      if (glitchTimeoutRef.current) {
        window.clearTimeout(glitchTimeoutRef.current);
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
