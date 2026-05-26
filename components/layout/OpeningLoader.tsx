"use client";

import { memo, useEffect, useRef, useState } from "react";

const MIN_VISIBLE_MS = 80;
const FADE_OUT_MS = 140;

function OpeningLoaderComponent() {
  const [hidden, setHidden] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const loadedRef = useRef(false);
  const startedAtRef = useRef(0);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.add("is-opening-loading");
    root.classList.remove("is-opening-ready");
    startedAtRef.current = performance.now();

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
        root.classList.add("is-opening-ready");
        setFadingOut(true);
        window.setTimeout(() => {
          setHidden(true);
          root.classList.remove("is-opening-loading");
        }, FADE_OUT_MS);
      }
    }, 120);

    return () => {
      clearInterval(timer);
      window.removeEventListener("load", onLoad);
      root.classList.remove("is-opening-loading");
    };
  }, []);

  if (hidden) {
    return null;
  }

  return (
    <div
      className={`opening-loader ${
        fadingOut ? "opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="opening-spinner" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  );
}

const OpeningLoader = memo(OpeningLoaderComponent);

export default OpeningLoader;
