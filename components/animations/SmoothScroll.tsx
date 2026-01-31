"use client";

import { useEffect } from "react";


interface SmoothScrollProps {
  children: React.ReactNode;
  speed?: number;
}

export default function SmoothScroll({ children, speed = 1 }: SmoothScrollProps) {
  useEffect(() => {
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

        // Create smooth scroll only once
        smoother = ScrollSmoother.create({
          smooth: 1.2 * speed, // Reduced from 1.5 for better performance
          effects: true,
          smoothTouch: 0.1,
          normalizeScroll: true,
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
