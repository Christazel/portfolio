"use client";

import { useEffect, useRef, memo } from "react";

export default memo(function ScrollProgress({ lite = false }: { lite?: boolean }) {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const lastProgressRef = useRef<number>(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;

      // Skip tiny updates to avoid excessive style writes.
      if (Math.abs(ratio - lastProgressRef.current) > 0.004) {
        lastProgressRef.current = ratio;

        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${ratio.toFixed(4)})`;
          progressBarRef.current.style.backgroundPosition = `${Math.round(ratio * 100)}% center`;
        }

        if (indicatorRef.current && !lite) {
          indicatorRef.current.style.opacity = ratio < 0.05 ? "1" : "0";
        }
      }
    };

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [lite]);

  return (
    <>
      {/* Animated progress bar */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-size-[200%] z-50 pointer-events-none"
        style={{
          transform: "scaleX(0)",
          transformOrigin: "left center",
          willChange: "transform",
          animation: lite ? "none" : "shimmer 2s infinite",
          boxShadow: lite ? "none" : "0 0 20px rgba(100, 200, 255, 0.8)",
          backgroundPosition: "0% center",
          opacity: lite ? 0.6 : 1,
        }}
      />

      {/* Scroll indicator */}
      {!lite && (
        <div ref={indicatorRef} className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none opacity-100 transition-opacity duration-200">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
      `}</style>
    </>
  );
});
