"use client";

import { useEffect, useRef, memo } from "react";
import gsap from "gsap";

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

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Use passive event listener for better scroll performance
    let isMoving = false;

    const onMouseMove = (e: MouseEvent) => {
      if (isMoving) return; // Prevent excessive calls
      isMoving = true;

      // Throttle to ~60fps (16ms)
      const now = Date.now();
      if (now - lastTimeRef.current < 16) {
        isMoving = false;
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

        const angleX = (y - centerY) / 5;
        const angleY = (centerX - x) / 5;

        gsap.to(container, {
          rotationX: angleX,
          rotationY: angleY,
          transformPerspective: 1000,
          duration: 0.25, // Faster response
          overwrite: "auto",
          ease: "sine.out",
        });
        isMoving = false;
      });
    };

    const onMouseLeave = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      gsap.to(container, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
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
    <div ref={containerRef} className={className} style={{ perspective: "1000px" }}>
      {children}
    </div>
  );
});
