"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.8,
  distance = 50,
  ease = "power3.out",
  direction = "up",
  once = true,
  threshold = 0.3,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;

    // Set initial state
    const initialState: Record<string, any> = {
      opacity: 0,
    };

    if (direction === "up") initialState.y = distance;
    if (direction === "down") initialState.y = -distance;
    if (direction === "left") initialState.x = distance;
    if (direction === "right") initialState.x = -distance;

    gsap.set(element, initialState);

    // Create scroll animation
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

    return () => {
      if (containerRef.current) {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === containerRef.current) {
            trigger.kill();
          }
        });
      }
    };
  }, [delay, duration, distance, ease, direction, once, threshold]);

  return <div ref={containerRef}>{children}</div>;
}
