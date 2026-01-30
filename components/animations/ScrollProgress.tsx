"use client";

import { useEffect, useState, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default memo(function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);
  const lastProgressRef = useRef<number>(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      // Only update if progress changed by at least 0.5%
      if (Math.abs(scrolled - lastProgressRef.current) > 0.5) {
        lastProgressRef.current = scrolled;
        setProgress(scrolled);
      }
    };

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Animated progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-[length:200%] z-50 pointer-events-none" style={{
        width: `${progress}%`,
        animation: "shimmer 2s infinite",
        boxShadow: "0 0 20px rgba(100, 200, 255, 0.8)",
        backgroundPosition: `${progress}% center`,
      }} />

      {/* Scroll indicator */}
      {progress < 5 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
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
