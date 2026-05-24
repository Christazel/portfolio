"use client";

import dynamic from "next/dynamic";

const FloatingLines = dynamic(() => import("@/components/layout/FloatingLines"), {
  ssr: false,
  loading: () => null,
});

const ENABLED_WAVES = ["top", "middle", "bottom"] as const;

export default function FloatingLinesBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-zinc-950">
      <FloatingLines
        enabledWaves={[...ENABLED_WAVES]}
        lineCount={8}
        lineDistance={8}
        bendRadius={8}
        bendStrength={-2}
        interactive
        parallax
        animationSpeed={1}
        gradientStart="#0061ff"
        gradientMid="#6f6f6f"
        gradientEnd="#6a6a6a"
        style={{ opacity: 0.72 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,0.08),transparent_32%),linear-gradient(to_bottom,rgba(9,9,11,0.08),rgba(9,9,11,0.76)_68%,#09090b)]" />
    </div>
  );
}
