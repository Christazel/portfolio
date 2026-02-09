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
    const id = (window as unknown as Record<string, unknown>).requestIdleCallback
      ? ((window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => setMounted(true)))
      : window.setTimeout(() => setMounted(true), 200);

    return () => {
      try {
        if ((window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id as number);
        } else {
          clearTimeout(id as number);
        }
      } catch {
        /* noop */
      }
    };
  }, []);

  useEffect(() => {
    const getMode = () => {
      const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const connection = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      const saveData = Boolean(connection?.saveData);
      const effectiveType = String(connection?.effectiveType || "");
      const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8;
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
