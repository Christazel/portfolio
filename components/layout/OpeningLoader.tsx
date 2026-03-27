"use client";

import { useEffect, useRef, useState, memo } from "react";

const MIN_VISIBLE_MS = 900;

function OpeningLoaderComponent() {
  const [progress, setProgress] = useState(1);
  const [hidden, setHidden] = useState(false);
  const loadedRef = useRef(false);
  const startedAtRef = useRef(0);

  useEffect(() => {
    startedAtRef.current = performance.now();
    document.documentElement.dataset.loading = "1";

    const onLoad = () => {
      loadedRef.current = true;
    };

    if (document.readyState === "complete") {
      loadedRef.current = true;
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    const timer = window.setInterval(() => {
      setProgress((prev) => {
        const elapsed = performance.now() - startedAtRef.current;
        const canFinish = loadedRef.current && elapsed >= MIN_VISIBLE_MS;

        if (prev >= 100) {
          return 100;
        }

        let next = prev;

        if (!canFinish) {
          // Move quickly at first, then slow down near 90 until the page is ready.
          const step = prev < 60 ? 3 : prev < 85 ? 2 : 1;
          next = Math.min(90, prev + step);
        } else {
          const step = prev < 95 ? 4 : 2;
          next = Math.min(100, prev + step);
        }

        if (next === 100) {
          window.setTimeout(() => {
            setHidden(true);
            delete document.documentElement.dataset.loading;
          }, 220);
        }

        return next;
      });
    }, 28);

    return () => {
      clearInterval(timer);
      window.removeEventListener("load", onLoad);
      delete document.documentElement.dataset.loading;
    };
  }, []);

  if (hidden) {
    return null;
  }

  return (
    <div className="opening-loader" aria-live="polite" aria-label="Loading page">
      <div className="opening-loader-inner">
        <p className="opening-loader-title">Preparing Portfolio</p>
        <p className="opening-loader-value">{progress}%</p>
        <div className="opening-loader-track" aria-hidden="true">
          <div className="opening-loader-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

const OpeningLoader = memo(OpeningLoaderComponent);

export default OpeningLoader;