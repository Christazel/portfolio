"use client";

import React, { useRef, useEffect, memo } from "react";
import gsap from "gsap";

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export default memo(function RippleButton({
  children,
  className = "",
  href,
  target,
  rel,
  onClick,
}: RippleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const ripplesRef = useRef<Set<HTMLDivElement>>(new Set());

  useEffect(() => {
    const button = buttonRef.current || linkRef.current;
    if (!button) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const currentRipples = ripplesRef.current;

    const onMouseDown = (e: Event) => {
      if (prefersReducedMotion) return; // Skip ripple effect on reduced motion
      
      const mouseEvent = e as MouseEvent;
      const rect = button.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;

      // Create ripple element with GPU acceleration
      const ripple = document.createElement("div");
      ripple.className = "absolute rounded-full bg-white pointer-events-none";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.width = "0px";
      ripple.style.height = "0px";
      ripple.style.opacity = "0.5";
      ripple.style.transform = "translate3d(0, 0, 0)"; // GPU acceleration

      button.appendChild(ripple);
      currentRipples.add(ripple);

      // Optimize ripple animation - use faster timing
      gsap.to(ripple, {
        width: Math.max(rect.width, rect.height) * 2,
        height: Math.max(rect.width, rect.height) * 2,
        left: x - (Math.max(rect.width, rect.height) * 2) / 2,
        top: y - (Math.max(rect.width, rect.height) * 2) / 2,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
        onComplete: () => {
          ripple.remove();
          currentRipples.delete(ripple);
        },
      });
    };

    button.addEventListener("mousedown", onMouseDown);
    return () => {
      button.removeEventListener("mousedown", onMouseDown);
      // Cleanup all remaining ripples
      currentRipples.forEach(ripple => {
        ripple.remove();
      });
      currentRipples.clear();
    };
  }, []);

  const baseClass = `relative overflow-hidden ${className}`;

  if (href) {
    return (
      <a
        ref={linkRef}
        href={href}
        target={target}
        rel={rel}
        className={baseClass}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      className={baseClass}
      onClick={onClick}
    >
      {children}
    </button>
  );
});
