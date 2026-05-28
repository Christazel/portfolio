"use client";

import { useEffect, useMemo, useRef, memo } from "react";

type RevealMeta = {
  once: boolean;
  applyVisible: () => void;
  applyHidden: () => void;
};

type ObserverEntry = {
  observer: IntersectionObserver;
  elements: Map<Element, RevealMeta>;
};

const observerPool = new Map<string, ObserverEntry>();

const getObserverEntry = (threshold: number) => {
  const key = `${threshold}`;
  const existing = observerPool.get(key);
  if (existing) return existing;

  const elements = new Map<Element, RevealMeta>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const meta = elements.get(entry.target);
        if (!meta) continue;

        if (entry.isIntersecting) {
          meta.applyVisible();
          if (meta.once) {
            observer.unobserve(entry.target);
            elements.delete(entry.target);
          }
        } else if (!meta.once) {
          meta.applyHidden();
        }
      }
    },
    { threshold }
  );

  const created = { observer, elements };
  observerPool.set(key, created);
  return created;
};

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  ease?: string;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
  scale?: number;
  threshold?: number;
}

const ScrollReveal = memo<ScrollRevealProps>(
  ({
    children,
    delay = 0,
    duration = 0.8,
    distance = 50,
    ease = "power3.out",
    direction = "up",
    once = true,
    scale = 1,
    threshold = 0.3,
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const hiddenTransform = useMemo(() => {
      const scaleTransform = scale === 1 ? "" : ` scale(${scale})`;

      if (direction === "up") return `translate3d(0, ${distance}px, 0)${scaleTransform}`;
      if (direction === "down") return `translate3d(0, ${-distance}px, 0)${scaleTransform}`;
      if (direction === "left") return `translate3d(${distance}px, 0, 0)${scaleTransform}`;
      if (direction === "right") return `translate3d(${-distance}px, 0, 0)${scaleTransform}`;
      return `translate3d(0, 0, 0)${scaleTransform}`;
    }, [direction, distance, scale]);

    useEffect(() => {
      const element = containerRef.current;
      if (!element) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const applyVisible = () => {
        element.style.opacity = "1";
        element.style.transform = "translate3d(0, 0, 0) scale(1)";
        element.style.willChange = "auto";
      };

      const applyHidden = () => {
        element.style.opacity = "0";
        element.style.transform = hiddenTransform;
        element.style.willChange = "opacity, transform";
      };

      if (prefersReducedMotion) {
        applyVisible();
        return;
      }

      applyHidden();

      const entry = getObserverEntry(threshold);
      entry.elements.set(element, { once, applyVisible, applyHidden });
      entry.observer.observe(element);

      return () => {
        entry.observer.unobserve(element);
        entry.elements.delete(element);
        if (entry.elements.size === 0) {
          entry.observer.disconnect();
          observerPool.delete(`${threshold}`);
        }
      };
    }, [once, threshold, hiddenTransform]);

    const transitionTiming =
      ease === "power3.out"
        ? "cubic-bezier(0.22, 1, 0.36, 1)"
        : ease === "power2.out"
          ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          : "ease-out";

    return (
      <div
        ref={containerRef}
        style={{
          opacity: 0,
          transform: hiddenTransform,
          transitionProperty: "opacity, transform",
          transitionDuration: `${duration}s`,
          transitionDelay: `${delay}s`,
          transitionTimingFunction: transitionTiming,
          willChange: "auto",
        }}
      >
        {children}
      </div>
    );
  }
);

ScrollReveal.displayName = "ScrollReveal";

export default ScrollReveal;
