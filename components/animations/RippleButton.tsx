"use client";

import React, { useRef, useEffect, memo } from "react";

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
  const ripplesRef = useRef<Set<HTMLElement>>(new Set());

  useEffect(() => {
    const button = buttonRef.current || linkRef.current;
    if (!button) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const currentRipples = ripplesRef.current;

    const onPointerDown = (e: Event) => {
      if (prefersReducedMotion) return;

      const mouseEvent = e as PointerEvent;
      const rect = button.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;

      const ripple = document.createElement("span");
      ripple.className = "absolute rounded-full pointer-events-none";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.opacity = "0.45";
      ripple.style.background = "rgba(255, 255, 255, 0.85)";
      ripple.style.transform = "translate(-50%, -50%) scale(0)";
      ripple.style.willChange = "transform, opacity";

      button.appendChild(ripple);
      currentRipples.add(ripple);

      const animation = ripple.animate(
        [
          { transform: "translate(-50%, -50%) scale(0)", opacity: 0.45 },
          { transform: "translate(-50%, -50%) scale(1)", opacity: 0 },
        ],
        {
          duration: 480,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        }
      );

      animation.onfinish = () => {
        ripple.remove();
        currentRipples.delete(ripple);
      };
    };

    button.addEventListener("pointerdown", onPointerDown);
    return () => {
      button.removeEventListener("pointerdown", onPointerDown);
      currentRipples.forEach((ripple) => {
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
