"use client";

import { useEffect, useState } from "react";

export default function AnimatedGradientBg() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 animate-spin-slow"
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
}
