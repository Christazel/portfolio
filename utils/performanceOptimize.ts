/**
 * Performance Optimization Utilities
 * Helps reduce lag and improve responsiveness across the portfolio
 */

/**
 * Debounce function - delays execution of callback until specified ms have passed
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function - limits execution to once per specified ms interval
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Request Animation Frame throttle - efficient for smooth animations
 */
export function rafThrottle<T extends (...args: unknown[]) => unknown>(
  func: T
): (...args: Parameters<T>) => void {
  let frameId: number | null = null;
  let lastArgs: unknown[] = [];

  return function executedFunction(...args: Parameters<T>) {
    lastArgs = args;

    if (frameId === null) {
      frameId = requestAnimationFrame(() => {
        func(...lastArgs);
        frameId = null;
      });
    }
  };
}

/**
 * Intersection Observer hook for lazy rendering
 */
export function useIntersectionObserver(
  element: HTMLElement | null,
  callback: (isVisible: boolean) => void,
  options: IntersectionObserverInit = { threshold: 0.1 }
): (() => void) | void {
  if (typeof window === "undefined" || !element) return;

  const observer = new IntersectionObserver(([entry]) => {
    callback(entry.isIntersecting);
  }, options);

  observer.observe(element);

  return () => observer.unobserve(element);
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Batch DOM reads to avoid layout thrashing
 */
export function batchDOMRead(
  callback: () => void,
  priority = "normal"
): void {
  if (priority === "high") {
    callback();
  } else {
    requestAnimationFrame(callback);
  }
}

/**
 * Memory-efficient particle animation with throttling
 */
export interface AnimationConfig {
  fps?: number; // Target frames per second
  enableGPU?: boolean;
  reduceMotion?: boolean;
}

export function getAnimationConfig(userConfig?: Partial<AnimationConfig>): AnimationConfig {
  const reduce = prefersReducedMotion();
  
  return {
    fps: reduce ? 24 : userConfig?.fps ?? 30,
    enableGPU: !reduce && (userConfig?.enableGPU ?? true),
    reduceMotion: reduce,
    ...userConfig,
  };
}

/**
 * Calculate throttle interval from target FPS
 */
export function fpsToMs(fps: number): number {
  return 1000 / fps;
}

/**
 * Advanced RAFThrottle with memory efficient cleanup
 * Prevents memory leaks from multiple RAF requests
 */
export function createRafThrottle<T extends (...args: unknown[]) => unknown>(
  func: T,
  options: { minInterval?: number } = {}
): {
  execute: (...args: Parameters<T>) => void;
  cleanup: () => void;
} {
  let frameId: number | null = null;
  let lastArgs: unknown[] = [];
  let lastExecuteTime = 0;
  const { minInterval = 0 } = options;

  const execute = (...args: Parameters<T>) => {
    lastArgs = args;
    const now = performance.now();

    if (now - lastExecuteTime < minInterval) {
      return;
    }

    if (frameId === null) {
      frameId = requestAnimationFrame(() => {
        lastExecuteTime = performance.now();
        func(...lastArgs);
        frameId = null;
      });
    }
  };

  const cleanup = () => {
    if (frameId !== null) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
    lastArgs = [];
    lastExecuteTime = 0;
  };

  return { execute, cleanup };
}

/**
 * Idle callback for non-critical operations
 * Falls back to setTimeout if requestIdleCallback not supported
 */
export function scheduleIdleCallback(callback: IdleRequestCallback): number {
  if (typeof requestIdleCallback !== "undefined") {
    return requestIdleCallback(callback);
  }
  return window.setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining: () => 0,
    } as IdleDeadline);
  }, 0);
}

/**
 * Cancel idle callback with fallback
 */
export function cancelIdleCallback(id: number): void {
  if (typeof cancelIdleCallback !== "undefined") {
    cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}

/**
 * Check if page is visible to user
 */
export function isPageVisible(): boolean {
  if (typeof document === "undefined") return true;
  return !document.hidden;
}

/**
 * Schedule a callback when page becomes visible
 */
export function onPageVisible(callback: () => void): () => void {
  if (typeof document === "undefined") return () => {};

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      callback();
    }
  });

  return () => {
    document.removeEventListener("visibilitychange", callback);
  };
}

/**
 * Performance monitoring and metrics
 */
export class PerformanceMonitor {
  private marks: Map<string, number> = new Map();
  private measures: Map<string, number[]> = new Map();

  mark(label: string): void {
    this.marks.set(label, performance.now());
  }

  measure(label: string, startMark: string): number {
    const startTime = this.marks.get(startMark);
    if (!startTime) {
      console.warn(`Start mark "${startMark}" not found`);
      return 0;
    }

    const duration = performance.now() - startTime;

    if (!this.measures.has(label)) {
      this.measures.set(label, []);
    }
    this.measures.get(label)!.push(duration);

    return duration;
  }

  getStats(label: string): { avg: number; min: number; max: number } | null {
    const measurements = this.measures.get(label);
    if (!measurements || measurements.length === 0) {
      return null;
    }

    const avg = measurements.reduce((a, b) => a + b, 0) / measurements.length;
    const min = Math.min(...measurements);
    const max = Math.max(...measurements);

    return { avg, min, max };
  }

  clear(): void {
    this.marks.clear();
    this.measures.clear();
  }
}
