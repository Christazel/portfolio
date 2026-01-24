"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface GlitchTextProps {
  children: string;
  className?: string;
}

export default function GlitchText({ children, className = "" }: GlitchTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = () => {
      // Random glitch on hover
      if (Math.random() > 0.8) {
        const glitchX = (Math.random() - 0.5) * 10;
        const glitchY = (Math.random() - 0.5) * 10;

        gsap.to(container, {
          x: glitchX,
          y: glitchY,
          duration: 0.05,
          overwrite: "auto",
          onComplete: () => {
            gsap.to(container, {
              x: 0,
              y: 0,
              duration: 0.1,
            });
          },
        });
      }
    };

    container.addEventListener("mousemove", onMouseMove);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{
        textShadow: "0 0 20px rgba(100, 200, 255, 0.5), 0 0 40px rgba(100, 200, 255, 0.3)",
      }}
    >
      {children}
    </div>
  );
}
