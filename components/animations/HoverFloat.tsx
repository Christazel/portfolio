"use client";

import { useEffect, useRef, memo } from "react";

interface HoverFloatProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default memo(function HoverFloat({
  children,
  strength = 20,
  className = "",
}: HoverFloatProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersReducedMotion || !canHover) return;

    const maxTilt = Math.min(Math.max(strength / 2, 6), 18);
    let nextRotationX = 0;
    let nextRotationY = 0;
    let isAnimating = false;

    const applyTransform = () => {
      isAnimating = false;
      container.style.transform = `perspective(1000px) rotateX(${nextRotationX.toFixed(2)}deg) rotateY(${nextRotationY.toFixed(2)}deg) translate3d(0, 0, 0)`;
    };

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTimeRef.current < 16) {
        return;
      }
      lastTimeRef.current = now;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        nextRotationX = ((centerY - y) / centerY) * maxTilt;
        nextRotationY = ((x - centerX) / centerX) * maxTilt;

        if (!isAnimating) {
          isAnimating = true;
          applyTransform();
        }
      });
    };

    const onMouseLeave = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      container.style.transition = "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)";
      container.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)";
      window.setTimeout(() => {
        container.style.transition = "";
      }, 300);
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [strength]);

  return (
    <div ref={containerRef} className={className} style={{ transform: "translate3d(0, 0, 0)" }}>
      {children}
    </div>
  );
});
