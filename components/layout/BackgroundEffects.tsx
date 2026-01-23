"use client";

import dynamic from "next/dynamic";

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
  return (
    <>
      <AnimatedGradientBg />
      <FloatingParticles />
      <ScrollProgress />
    </>
  );
}