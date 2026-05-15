"use client";

import { useEffect, useRef, useState, memo } from "react";

const TOTAL_DURATION_MS = 3000;

function OpeningLoaderComponent() {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const startedAtRef = useRef(0);

  useEffect(() => {
    startedAtRef.current = performance.now();
    document.documentElement.dataset.loading = "1";
    let rafId = 0;

    const animate = () => {
      const elapsed = performance.now() - startedAtRef.current;
      const nextProgress = Math.min(100, Math.round((elapsed / TOTAL_DURATION_MS) * 100));
      setProgress(nextProgress);

      if (elapsed < TOTAL_DURATION_MS) {
        rafId = window.requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setHidden(true);
          delete document.documentElement.dataset.loading;
        }, 200);
      }
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      delete document.documentElement.dataset.loading;
    };
  }, []);

  if (hidden) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="loader-ring">
          <svg viewBox="0 0 100 100" className="loader-svg">
            <circle cx="50" cy="50" r="45" className="loader-track" />
            <circle
              cx="50"
              cy="50"
              r="45"
              className="loader-progress"
              style={{
                strokeDashoffset: 283 - (283 * progress) / 100,
              }}
            />
          </svg>
          <div className="loader-percent">{progress}%</div>
        </div>
        <div className="loader-bar-container">
          <div className="loader-bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="loader-text">Loading</p>
      </div>
    </div>
  );
}

const OpeningLoader = memo(OpeningLoaderComponent);
export default OpeningLoader;