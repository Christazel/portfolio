"use client";

import { useEffect, useRef, memo } from "react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default memo(function ParallaxSection({
  children,
  speed = 0.5,
  className = "",
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (prefersReducedMotion || !canHover) {
      content.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    const maxShift = 70 * Math.max(0.2, speed);
    let rafId = 0;
    let ticking = false;
    let inView = true;

    const updateParallax = () => {
      ticking = false;
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;

      if (!inView) return;

      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      const offsetY = (0.5 - clamped) * 2 * maxShift;

      content.style.transform = `translate3d(0, ${offsetY.toFixed(2)}px, 0)`;
      content.style.willChange = "transform";
    };

    const requestTick = () => {
      if (ticking) return;
      ticking = true;
      rafId = window.requestAnimationFrame(updateParallax);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (!inView) {
          content.style.willChange = "auto";
        } else {
          requestTick();
        }
      },
      { rootMargin: "140px 0px" }
    );

    observer.observe(container);
    requestTick();

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
      if (rafId) window.cancelAnimationFrame(rafId);
      content.style.willChange = "auto";
      content.style.transform = "translate3d(0, 0, 0)";
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
});
