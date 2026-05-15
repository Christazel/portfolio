"use client";

import { useEffect, useRef, useState, memo } from "react";

const TOTAL_DURATION_MS = 3000;

function OpeningLoaderComponent() {
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");
  const [showError, setShowError] = useState(false);
  const startedAtRef = useRef(0);

  useEffect(() => {
    startedAtRef.current = performance.now();
    document.documentElement.dataset.loading = "1";
    let rafId = 0;

    const animate = () => {
      const elapsed = performance.now() - startedAtRef.current;
      const nextProgress = Math.min(100, Math.round((elapsed / TOTAL_DURATION_MS) * 100));
      setProgress(nextProgress);

      const dotCount = Math.floor(elapsed / 400) % 4;
      setDots(".".repeat(dotCount));

      if (elapsed >= 2000 && elapsed < 2600) {
        setShowError(true);
      }

      if (elapsed < TOTAL_DURATION_MS) {
        rafId = window.requestAnimationFrame(animate);
      } else {
        setShowError(true);
        setProgress(100);
        setTimeout(() => {
          setFading(true);
          setTimeout(() => {
            setHidden(true);
            delete document.documentElement.dataset.loading;
          }, 400);
        }, 500);
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
    <div className={`loader-overlay ${fading ? "loader-fade-out" : ""}`}>
      <div className="loader-terminal">
        <div className="terminal-header">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
          <span className="terminal-title">Terminal</span>
        </div>
        <div className="terminal-body">
          {showError ? (
            <div className="terminal-error">
              <span className="error-icon">!</span>
              <div className="error-text">
                <p className="error-main">ERROR: Cannot read &quot;image.png&quot;</p>
                <p className="error-sub">This model does not support image input.</p>
                <p className="error-info">Inform the user.{dots}</p>
              </div>
            </div>
          ) : (
            <div className="terminal-loading">
              <p className="terminal-line">
                <span className="terminal-prompt">$</span> loading portfolio{dots}
              </p>
              <div className="terminal-progress">
                <div className="terminal-progress-bar" style={{ width: `${progress}%` }} />
              </div>
              <p className="terminal-percent">{progress}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const OpeningLoader = memo(OpeningLoaderComponent);
export default OpeningLoader;