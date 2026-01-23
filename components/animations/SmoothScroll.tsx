"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother);

interface SmoothScrollProps {
  children: React.ReactNode;
  speed?: number;
}

export default function SmoothScroll({ children, speed = 1 }: SmoothScrollProps) {
  useEffect(() => {
    // Create smooth scroll only once
    const smoother = ScrollSmoother.create({
      smooth: 1.5 * speed,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: true,
    });

    return () => {
      smoother?.kill();
    };
  }, [speed]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
