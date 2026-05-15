"use client";

import { useEffect, useRef, useState, memo } from "react";

const MIN_VISIBLE_MS = 900;

function OpeningLoaderComponent() {
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
      const elapsed = performance.now() - startedAtRef.current;
      const canFinish = loadedRef.current && elapsed >= MIN_VISIBLE_MS;

      if (canFinish) {
        window.clearInterval(timer);
        window.setTimeout(() => {
          setHidden(true);
          delete document.documentElement.dataset.loading;
        }, 220);
      }
    }, 120);

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
      <div className="opening-loader-inner" role="status" aria-label="Loading">
        <div className="opening-spinner segmented" aria-hidden="true" />
        <p className="opening-loader-title">Loading...</p>
      </div>
    </div>
  );
}

const OpeningLoader = memo(OpeningLoaderComponent);

export default OpeningLoader;