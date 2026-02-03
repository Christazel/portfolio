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

type EffectsMode = "full" | "lite";

export function BackgroundEffects() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<EffectsMode>("full");

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

  useEffect(() => {
    const getMode = () => {
      const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const connection = (navigator as any).connection;
      const saveData = Boolean(connection?.saveData);
      const effectiveType = String(connection?.effectiveType || "");
      const deviceMemory = (navigator as any).deviceMemory || 8;
      const cores = navigator.hardwareConcurrency || 8;
      const smallScreen = window.innerWidth < 768;

      const lowPower =
        prefersReduce ||
        saveData ||
        /2g/.test(effectiveType) ||
        deviceMemory <= 4 ||
        cores <= 4 ||
        smallScreen;

      return lowPower ? "lite" : "full";
    };

    const applyMode = () => {
      const nextMode = getMode();
      setMode(nextMode);
      document.documentElement.dataset.perf = nextMode;
    };

    applyMode();
    window.addEventListener("resize", applyMode, { passive: true });
    return () => window.removeEventListener("resize", applyMode);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnimatedGradientBg animated={mode === "full"} />
      {mode === "full" && <FloatingParticles />}
      <ScrollProgress lite={mode === "lite"} />
    </>
  );
}
