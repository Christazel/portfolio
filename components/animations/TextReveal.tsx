"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export default function TextReveal({ children, className = "", delay = 0 }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create spans for each character
    const text = children;
    container.innerHTML = text
      .split("")
      .map((char) => {
        if (char === " ") return '<span class="inline-block">&nbsp;</span>';
        return `<span class="inline-block overflow-hidden"><span class="inline-block" style="will-change: transform">${char}</span></span>`;
      })
      .join("");

    // Animate characters
    const chars = container.querySelectorAll("span span");
    gsap.set(chars, {
      y: 100,
      opacity: 0,
    });

    gsap.to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.02,
      ease: "back.out",
      delay,
    });
  }, [children, delay]);

  return <div ref={containerRef} className={className} />;
}
