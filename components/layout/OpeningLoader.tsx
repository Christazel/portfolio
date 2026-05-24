"use client";

import { memo, useEffect, useRef, useState } from "react";

const MIN_VISIBLE_MS = 450;
const FADE_OUT_MS = 180;

function OpeningLoaderComponent() {
  const [hidden, setHidden] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const loadedRef = useRef(false);
  const startedAtRef = useRef(0);

  useEffect(() => {
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
        setFadingOut(true);
        window.setTimeout(() => setHidden(true), FADE_OUT_MS);
      }
    }, 120);

    return () => {
      clearInterval(timer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (hidden) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm transition-opacity duration-200 ${
        fadingOut ? "opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-950/60 px-5 py-4 text-sm text-zinc-200">
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300/40 border-t-zinc-200"
          aria-hidden="true"
        />
        <span>Loading...</span>
      </div>
    </div>
  );
}

const OpeningLoader = memo(OpeningLoaderComponent);

export default OpeningLoader;