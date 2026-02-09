"use client";

import { useEffect, useRef, memo, useCallback } from "react";

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
  const scrollTriggerRef = useRef<{ trigger: HTMLElement; start: string; once: boolean; markers: boolean; onUpdate: (self: { progress: number }) => void } | null>(null);

  // Memoize initial state to prevent recreations
  const initialState = useMemo(() => {
    const state: Record<string, number> = { opacity: 0 };
    if (direction === "up") state.y = distance;
    if (direction === "down") state.y = -distance;
    if (direction === "left") state.x = distance;
    if (direction === "right") state.x = -distance;
    return state;
  }, [direction, distance]);

  const setupAnimation = useCallback(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;
    let mounted = true;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    (async () => {
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (!mounted) return;
        gsap.registerPlugin(ScrollTrigger);

        gsap.set(element, initialState);

        // Create optimized scroll animation
        const animConfig: { scrollTrigger: { trigger: HTMLElement; start: string; once: boolean; markers: boolean; onUpdate: (self: { progress: number }) => void }; opacity: number; duration: number; delay: number; ease: string | number[]; x?: number; y?: number } = {
          scrollTrigger: {
            trigger: element,
            start: `top ${85 - threshold * 100}%`,
            once,
            markers: false,
            // Throttle updates for better performance
            onUpdate: (self: { progress: number }) => {
              // Use GPU acceleration
              if (self.progress > 0 && self.progress < 1) {
                gsap.ticker.fps(60);
              }
            },
          },
          opacity: 1,
          duration: prefersReducedMotion ? 0.3 : duration,
          delay,
          ease: prefersReducedMotion ? "none" : ease,
          // Use transform instead of x/y for better performance
          x: direction === "left" || direction === "right" ? 0 : undefined,
          y: direction === "up" || direction === "down" ? 0 : undefined,
        };

        scrollTriggerRef.current = animConfig.scrollTrigger;
        gsap.to(element, animConfig);
      } catch {
        // silence failures
      }
    })();

    return () => {
      mounted = false;
      if (containerRef.current) {
        try {
          const st = (globalThis as unknown as { ScrollTrigger?: { getAll: () => { trigger: HTMLElement; kill: () => void }[] } }).ScrollTrigger;
          if (st && st.getAll) {
            st.getAll().forEach((trigger) => {
              if (trigger.trigger === containerRef.current) trigger.kill();
            });
          }
        } catch {
          /* noop */
        }
      }
    };
  }, [delay, duration, ease, direction, once, threshold, initialState]);

  useEffect(setupAnimation, [setupAnimation]);

  return <div ref={containerRef}>{children}</div>;
});

ScrollReveal.displayName = "ScrollReveal";

export default ScrollReveal;
