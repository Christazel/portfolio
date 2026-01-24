"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export default function RippleButton({
  children,
  className = "",
  href,
  target,
  rel,
  onClick,
}: RippleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const button = buttonRef.current || linkRef.current;
    if (!button) return;

    const onMouseDown = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = button.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;

      // Create ripple element
      const ripple = document.createElement("div");
      ripple.className = "absolute rounded-full bg-white pointer-events-none";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.width = "0px";
      ripple.style.height = "0px";
      ripple.style.opacity = "0.5";

      button.appendChild(ripple);

      // Animate ripple
      gsap.to(ripple, {
        width: Math.max(rect.width, rect.height) * 2,
        height: Math.max(rect.width, rect.height) * 2,
        left: x - (Math.max(rect.width, rect.height) * 2) / 2,
        top: y - (Math.max(rect.width, rect.height) * 2) / 2,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      });
    };

    button.addEventListener("mousedown", onMouseDown);
    return () => button.removeEventListener("mousedown", onMouseDown);
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
}
