"use client";

import { memo } from "react";

export default memo(function AnimatedGradientBg({ animated = true }: { animated?: boolean }) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none -z-10 ${animated ? "animate-spin-slow" : ""}`}
      style={{
        background: `conic-gradient(
          from 0deg,
          rgba(100, 150, 255, 0.01),
          rgba(150, 100, 255, 0.01),
          rgba(100, 200, 255, 0.01),
          rgba(100, 150, 255, 0.01)
        )`,
      }}
    />
  );
});
