"use client";

import { useEffect, useMemo, useRef, memo } from "react";

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

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const applyVisible = () => {
      element.style.opacity = "1";
      element.style.transform = "translate3d(0, 0, 0)";
      element.style.willChange = "auto";
    };

    const applyHidden = () => {
      element.style.opacity = "0";
      element.style.transform = hiddenTransform;
      element.style.willChange = "opacity, transform";
    };

    if (prefersReducedMotion) {
      applyVisible();
      return;
    }

    applyHidden();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          applyVisible();
          if (once) observer.disconnect();
        } else if (!once) {
          applyHidden();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold, hiddenTransform]);

  const transitionTiming =
    ease === "power3.out"
      ? "cubic-bezier(0.22, 1, 0.36, 1)"
      : ease === "power2.out"
        ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        : "ease-out";

  return (
    <div
      ref={containerRef}
      style={{
        opacity: 0,
        transform: hiddenTransform,
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: transitionTiming,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
});

ScrollReveal.displayName = "ScrollReveal";

export default ScrollReveal;
