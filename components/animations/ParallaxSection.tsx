"use client";

import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    let mounted = true;

    (async () => {
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (!mounted) return;
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(content, {
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: false,
            markers: false,
          },
          y: -100 * speed,
          ease: "none",
        });
      } catch (e) {
        /* fail silently */
      }
    })();

    return () => {
      mounted = false;
      try {
        const st = (globalThis as any).ScrollTrigger;
        if (st && st.getAll) {
          st.getAll().forEach((trigger: any) => {
            if (trigger.trigger === container) trigger.kill();
          });
        }
      } catch (e) {
        /* noop */
      }
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
});
