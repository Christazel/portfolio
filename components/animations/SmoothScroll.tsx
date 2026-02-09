"use client";

import { useEffect } from "react";


interface SmoothScrollProps {
  children: React.ReactNode;
  speed?: number;
}

export default function SmoothScroll({ children, speed = 1 }: SmoothScrollProps) {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let mounted = true;
    let smoother: any = null;

    (async () => {
      try {
        const [{ default: gsap }, { ScrollSmoother }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollSmoother"),
        ]);
        if (!mounted) return;
        gsap.registerPlugin(ScrollSmoother);

        // Optimized smooth scroll with ultra-smooth 60fps
        smoother = ScrollSmoother.create({
          smooth: 1 * speed, // Ultra-smooth 60fps scroll
          effects: true,
          smoothTouch: 0.1,
          normalizeScroll: true,
          onUpdate: (self: any) => {
            // Maintain high FPS
            if (self.getVelocity() < 0.5) {
              gsap.ticker.fps(60);
            }
          },
        });
      } catch (e) {
        /* noop */
      }
    })();

    return () => {
      mounted = false;
      try {
        smoother?.kill();
      } catch (e) {
        /* noop */
      }
    };
  }, [speed]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
