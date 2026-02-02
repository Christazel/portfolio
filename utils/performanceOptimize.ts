/**
 * Performance Optimization Utilities
 * Helps reduce lag and improve responsiveness across the portfolio
 */

/**
 * Debounce function - delays execution of callback until specified ms have passed
 */
export function debounce<T extends (...args: any[]) => any>(
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
export function throttle<T extends (...args: any[]) => any>(
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
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let frameId: number | null = null;
  let lastArgs: any[] = [];

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
