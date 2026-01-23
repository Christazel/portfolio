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

  useEffect(() => {
    if (!containerRef.current) return;

    const words = children.split(" ");
    const container = containerRef.current;
    container.innerHTML = "";

    // Create word spans
    words.forEach((word, i) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "inline-block mr-1.5";
      wordSpan.style.opacity = "0";

      // Split word into characters
      const chars = word.split("").map((char, j) => {
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

    if (animateOnScroll) {
      gsap.set(charSpans, { opacity: 0, y: 10 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          once: true,
        },
      });

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
      gsap.to(charSpans, {
        opacity: 1,
        y: 0,
        duration,
        stagger: staggerDelay,
        ease: "power2.out",
        delay,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [children, staggerDelay, duration, delay, animateOnScroll]);

  return (
    <div
      ref={containerRef}
      className={`${className}`}
      style={{ textAlign: textAlign as any }}
    />
  );
}
