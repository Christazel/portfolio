"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  delay?: number;
  animateOnScroll?: boolean;
  textAlign?: "left" | "center" | "right";
}

export default function SplitText({
  children,
  className = "",
  staggerDelay = 0.05,
  duration = 0.5,
  delay = 0,
  animateOnScroll = true,
  textAlign = "left",
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      containerRef.current.textContent = children;
      return;
    }

    const words = children.split(" ");
    const container = containerRef.current;
    container.innerHTML = "";

    // Create word spans
    words.forEach((word) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "inline-block mr-1.5";
      wordSpan.style.opacity = "0";

      // Split word into characters and cap very long words to keep animation cost low
      const displayChars = word.length > 15 ? word.substring(0, 15) + "..." : word;
      const chars = displayChars.split("").map((char) => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.className = "inline-block";
        charSpan.style.opacity = "0";
        return charSpan;
      });

      chars.forEach((char) => wordSpan.appendChild(char));
      container.appendChild(wordSpan);
    });

    const charSpans = container.querySelectorAll("span span");

    // Cleanup previous animations
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }

    if (animateOnScroll) {
      gsap.set(charSpans, { opacity: 0, y: 10 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          once: true,
          markers: false,
          // Refresh less frequently
          invalidateOnRefresh: false,
        },
      });
      timelineRef.current = timeline;
      
      // Safely get scrollTrigger if it exists
      if (timeline.scrollTrigger) {
        scrollTriggerRef.current = timeline.scrollTrigger as ScrollTrigger;
      }

      timeline.to(
        charSpans,
        {
          opacity: 1,
          y: 0,
          duration,
          stagger: staggerDelay,
          ease: "power2.out",
        },
        delay
      );
    } else {
      gsap.set(charSpans, { opacity: 0, y: 10 });
      timelineRef.current = gsap.to(charSpans, {
        opacity: 1,
        y: 0,
        duration,
        stagger: staggerDelay,
        ease: "power2.out",
        delay,
      });
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [children, staggerDelay, duration, delay, animateOnScroll]);

  return (
    <div
      ref={containerRef}
      className={`${className}`}
      style={{ textAlign: textAlign as React.CSSProperties['textAlign'] }}
    />
  );
}
