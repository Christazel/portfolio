"use client";

import { useEffect, useRef, useState } from "react";

const TRAIL_DOTS = 14;
const TRAIL_DOT_INDEXES = Array.from({ length: TRAIL_DOTS }, (_, index) => index);

type TrailPoint = {
  x: number;
  y: number;
};

export default function CursorTrailEffect() {
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const cursor = useRef<TrailPoint>({ x: -100, y: -100 });
  const points = useRef<TrailPoint[]>(
    Array.from({ length: TRAIL_DOTS }, () => ({ x: -100, y: -100 })),
  );
  const frameId = useRef<number | null>(null);
  const timeoutIds = useRef<number[]>([]);
  const [bursts, setBursts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const burstId = useRef(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    if (reduceMotion.matches || !finePointer.matches) {
      return;
    }

    const animate = () => {
      points.current.forEach((point, index) => {
        const target = index === 0 ? cursor.current : points.current[index - 1];
        point.x += (target.x - point.x) * 0.35;
        point.y += (target.y - point.y) * 0.35;

        const dot = dotRefs.current[index];
        if (dot) {
          dot.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`;
        }
      });

      frameId.current = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      cursor.current = { x: event.clientX, y: event.clientY };
    };

    const onPointerDown = (event: PointerEvent) => {
      const id = burstId.current;
      burstId.current += 1;
      setBursts((items) => [...items.slice(-5), { id, x: event.clientX, y: event.clientY }]);
      const timeoutId = window.setTimeout(() => {
        setBursts((items) => items.filter((item) => item.id !== id));
      }, 650);
      timeoutIds.current.push(timeoutId);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    frameId.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      if (frameId.current !== null) {
        window.cancelAnimationFrame(frameId.current);
      }
      timeoutIds.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutIds.current = [];
    };
  }, []);

  return (
    <div className="cursor-trail" aria-hidden="true">
      {TRAIL_DOT_INDEXES.map((index) => (
        <span
          key={index}
          ref={(node) => {
            dotRefs.current[index] = node;
          }}
          className="cursor-trail-dot"
          style={{
            height: `${18 - index * 0.85}px`,
            width: `${18 - index * 0.85}px`,
            opacity: Math.max(0.08, 0.45 - index * 0.025),
          }}
        />
      ))}

      {bursts.map((burst) => (
        <span
          key={burst.id}
          className="cursor-click-burst"
          style={{
            left: burst.x,
            top: burst.y,
          }}
        />
      ))}
    </div>
  );
}
