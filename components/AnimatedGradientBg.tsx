"use client";

import { useEffect, useState } from "react";

export default function AnimatedGradientBg() {
  const [gradient, setGradient] = useState("0deg");

  useEffect(() => {
    const interval = setInterval(() => {
      setGradient((prev) => {
        const current = parseFloat(prev);
        return `${(current + 0.5) % 360}deg`;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10"
      style={{
        background: `conic-gradient(
          from ${gradient},
          rgba(100, 150, 255, 0.08),
          rgba(150, 100, 255, 0.08),
          rgba(100, 200, 255, 0.08),
          rgba(100, 150, 255, 0.08)
        )`,
        transition: "background 50ms linear",
      }}
    />
  );
}
