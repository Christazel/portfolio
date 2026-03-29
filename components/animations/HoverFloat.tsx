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
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTimeRef = useRef<number>(0);
  const rotationStateRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isHoveringRef = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersReducedMotion || !canHover) return;

    const maxTilt = Math.min(Math.max(strength / 2, 6), 18);
    const THROTTLE_MS = 16;

    const applyTransform = (x: number, y: number) => {
      if (!container) return;
      container.style.transform = `perspective(1000px) rotateX(${x.toFixed(1)}deg) rotateY(${y.toFixed(1)}deg) translate3d(0, 0, 0)`;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isHoveringRef.current) return;

      const now = performance.now();
      if (now - lastTimeRef.current < THROTTLE_MS) {
        return;
      }

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotX = ((centerY - y) / centerY) * maxTilt;
        const rotY = ((x - centerX) / centerX) * maxTilt;

        // Only update if rotation actually changed
        if (rotationStateRef.current.x !== rotX || rotationStateRef.current.y !== rotY) {
          rotationStateRef.current = { x: rotX, y: rotY };
          applyTransform(rotX, rotY);
        }

        lastTimeRef.current = now;
        rafRef.current = null;
      });
    };

    const onMouseEnter = () => {
      isHoveringRef.current = true;
      lastTimeRef.current = performance.now();
    };

    const onMouseLeave = () => {
      isHoveringRef.current = false;

      // Cancel pending RAF
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      // Clear pending transition timeout
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      container.style.transition = "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)";
      applyTransform(0, 0);
      rotationStateRef.current = { x: 0, y: 0 };

      transitionTimeoutRef.current = setTimeout(() => {
        if (container) {
          container.style.transition = "";
        }
        transitionTimeoutRef.current = null;
      }, 300);
    };

    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      isHoveringRef.current = false;
    };
  }, [strength]);

  return (
    <div ref={containerRef} className={className} style={{ transform: "translate3d(0, 0, 0)" }}>
      {children}
    </div>
  );
});
