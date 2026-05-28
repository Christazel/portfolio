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

    let fadeTimer: number | null = null;
    let hideTimer: number | null = null;

    const finish = () => {
      loadedRef.current = true;
      const elapsed = performance.now() - startedAtRef.current;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

      fadeTimer = window.setTimeout(() => {
        root.classList.add("is-opening-ready");
        setFadingOut(true);
        hideTimer = window.setTimeout(() => {
          setHidden(true);
          root.classList.remove("is-opening-loading");
        }, FADE_OUT_MS);
      }, remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      if (fadeTimer !== null) window.clearTimeout(fadeTimer);
      if (hideTimer !== null) window.clearTimeout(hideTimer);
      window.removeEventListener("load", finish);
      root.classList.remove("is-opening-loading");
    };
  }, []);

  if (hidden) {
    return null;
  }

  return (
    <div
      className={`opening-loader ${fadingOut ? "opacity-0" : "opacity-100"}`}
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
