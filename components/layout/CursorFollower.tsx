"use client";

import { memo, useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])';

function CursorFollowerComponent() {
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const trail = trailRef.current;
    if (!ring || !trail) return;

    const finePointer = window.matchMedia("(any-pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) {
      return;
    }

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let trailX = targetX;
    let trailY = targetY;
    let currentScale = 1;
    let targetScale = 1;
    let frameId = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      trailX += (targetX - trailX) * 0.11;
      trailY += (targetY - trailY) * 0.11;
      currentScale += (targetScale - currentScale) * 0.16;

      ring.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${currentScale})`;
      trail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%)`;
      frameId = window.requestAnimationFrame(render);
    };

    const show = () => {
      ring.classList.add("cursor-follower-visible");
      trail.classList.add("cursor-trail-visible");
    };

    const hide = () => {
      ring.classList.remove("cursor-follower-visible", "cursor-follower-active");
      trail.classList.remove("cursor-trail-visible");
      targetScale = 1;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      targetX = event.clientX;
      targetY = event.clientY;
      show();
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest(INTERACTIVE_SELECTOR)) {
        ring.classList.add("cursor-follower-active");
        targetScale = 1.38;
        return;
      }

      ring.classList.remove("cursor-follower-active");
      targetScale = 1;
    };

    const handlePointerDown = () => {
      targetScale = 0.82;
    };

    const handlePointerUp = (event: PointerEvent) => {
      const target = event.target;
      targetScale = target instanceof Element && target.closest(INTERACTIVE_SELECTOR) ? 1.38 : 1;
    };

    frameId = window.requestAnimationFrame(render);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("pointerleave", hide, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("blur", hide);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerleave", hide);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return (
    <>
      <div ref={trailRef} className="cursor-trail" aria-hidden="true" />
      <div ref={ringRef} className="cursor-follower" aria-hidden="true" />
    </>
  );
}

const CursorFollower = memo(CursorFollowerComponent);

export default CursorFollower;
