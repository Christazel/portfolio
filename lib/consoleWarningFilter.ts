const FILTERED_WARNING_PARTS = [
  "THREE.Clock: This module has been deprecated",
  "using deprecated parameters for `initSync()`; pass a single object instead",
  "using deprecated parameters for the initialization function; pass a single object instead",
];

declare global {
  interface Window {
    __portfolioConsoleWarnPatched?: boolean;
  }
}

function shouldFilterWarning(args: unknown[]) {
  const message = args
    .map((arg) => (typeof arg === "string" ? arg : ""))
    .join(" ");

  return (
    FILTERED_WARNING_PARTS.some((part) => message.includes(part)) ||
    (message.includes("THREE.WebGLProgram: Program Info Log") && message.includes("warning X4122"))
  );
}

function isInterruptedPlayError(reason: unknown) {
  if (reason instanceof DOMException) {
    return reason.name === "AbortError" && reason.message.includes("play() request was interrupted");
  }

  if (reason instanceof Error) {
    return reason.name === "AbortError" && reason.message.includes("play() request was interrupted");
  }

  return typeof reason === "string" && reason.includes("play() request was interrupted");
}

if (typeof window !== "undefined" && !window.__portfolioConsoleWarnPatched) {
  const originalWarn = console.warn.bind(console);

  console.warn = (...args: unknown[]) => {
    if (shouldFilterWarning(args)) {
      return;
    }

    originalWarn(...args);
  };

  window.addEventListener("unhandledrejection", (event) => {
    if (isInterruptedPlayError(event.reason)) {
      event.preventDefault();
    }
  });

  window.__portfolioConsoleWarnPatched = true;
}

export {};
