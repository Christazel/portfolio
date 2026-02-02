"use client";

import { useEffect, useRef, memo, useCallback } from "react";
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
  const rafRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      // Throttle to ~60fps (16ms)
      const now = Date.now();
      if (now - lastTimeRef.current < 16) return;
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
          duration: 0.3,
          overwrite: "auto",
        });
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
