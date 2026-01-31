"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FloatingParticles = dynamic(() => import("@/components/animations/FloatingParticles"), {
  ssr: false,
  loading: () => null,
});

const AnimatedGradientBg = dynamic(() => import("@/components/animations/AnimatedGradientBg"), {
  ssr: false,
  loading: () => null,
});

const ScrollProgress = dynamic(() => import("@/components/animations/ScrollProgress"), {
  ssr: false,
  loading: () => null,
});

export function BackgroundEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Prefer requestIdleCallback, fall back to setTimeout
    const id = (window as any).requestIdleCallback
      ? (window as any).requestIdleCallback(() => setMounted(true))
      : window.setTimeout(() => setMounted(true), 200);

    return () => {
      try {
        if ((window as any).cancelIdleCallback) (window as any).cancelIdleCallback(id);
        else clearTimeout(id as number);
      } catch (e) {
        /* noop */
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnimatedGradientBg />
      <FloatingParticles />
      <ScrollProgress />
    </>
  );
}