"use client";

import { useEffect, useMemo, useRef, useState, memo } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  ease?: string;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
  threshold?: number;
}

const ScrollReveal = memo<ScrollRevealProps>(({
  children,
  delay = 0,
  duration = 0.8,
  distance = 50,
  ease = "power3.out",
  direction = "up",
  once = true,
  threshold = 0.3,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const hiddenTransform = useMemo(() => {
    if (direction === "up") return `translate3d(0, ${distance}px, 0)`;
    if (direction === "down") return `translate3d(0, ${-distance}px, 0)`;
    if (direction === "left") return `translate3d(${distance}px, 0, 0)`;
    if (direction === "right") return `translate3d(${-distance}px, 0, 0)`;
    return "translate3d(0, 0, 0)";
  }, [direction, distance]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    if (prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold, prefersReducedMotion]);

  const transitionTiming =
    ease === "power3.out"
      ? "cubic-bezier(0.22, 1, 0.36, 1)"
      : ease === "power2.out"
        ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        : "ease-out";

  const visible = prefersReducedMotion || isVisible;

  return (
    <div
      ref={containerRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0, 0, 0)" : hiddenTransform,
        transitionProperty: "opacity, transform",
        transitionDuration: `${prefersReducedMotion ? 0.2 : duration}s`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: prefersReducedMotion ? "linear" : transitionTiming,
        willChange: visible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
});

ScrollReveal.displayName = "ScrollReveal";

export default ScrollReveal;
