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

  const setupAnimation = useCallback(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;
    let mounted = true;

    (async () => {
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (!mounted) return;
        gsap.registerPlugin(ScrollTrigger);

        // Set initial state
        const initialState: Record<string, number> = { opacity: 0 };
        if (direction === "up") initialState.y = distance;
        if (direction === "down") initialState.y = -distance;
        if (direction === "left") initialState.x = distance;
        if (direction === "right") initialState.x = -distance;

        gsap.set(element, initialState);

        // Create scroll animation with reduced motion support
        gsap.to(element, {
          scrollTrigger: {
            trigger: element,
            start: `top ${85 - threshold * 100}%`,
            once,
            markers: false,
          },
          opacity: 1,
          y: direction === "up" || direction === "down" ? 0 : undefined,
          x: direction === "left" || direction === "right" ? 0 : undefined,
          duration,
          delay,
          ease,
        });
      } catch (e) {
        // silence failures
      }
    })();

    return () => {
      mounted = false;
      if (containerRef.current) {
        try {
          const st = (globalThis as any).ScrollTrigger;
          if (st && st.getAll) {
            st.getAll().forEach((trigger: any) => {
              if (trigger.trigger === containerRef.current) trigger.kill();
            });
          }
        } catch (e) {
          /* noop */
        }
      }
    };
  }, [delay, duration, distance, ease, direction, once, threshold]);

  useEffect(setupAnimation, [setupAnimation]);

  return <div ref={containerRef}>{children}</div>;
});

ScrollReveal.displayName = "ScrollReveal";

export default ScrollReveal;
