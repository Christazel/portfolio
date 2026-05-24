"use client";

import { type MouseEvent, type ReactNode, useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;
  angle: number;
  startTime: number;
};

type ClickSparkProps = {
  children: ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
};

export default function ClickSpark({
  children,
  sparkColor = "#ffffff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const frameRef = useRef<number | null>(null);
  const drawRef = useRef<(timestamp: number) => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    drawRef.current = (timestamp: number) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        const progress = Math.min(elapsed / duration, 1);
        const opacity = 1 - progress;
        const travel = sparkRadius * progress;
        const lineLength = sparkSize * (1 - progress * 0.35);
        const startX = spark.x + Math.cos(spark.angle) * travel;
        const startY = spark.y + Math.sin(spark.angle) * travel;
        const endX = spark.x + Math.cos(spark.angle) * (travel + lineLength);
        const endY = spark.y + Math.sin(spark.angle) * (travel + lineLength);

        context.globalAlpha = opacity;
        context.strokeStyle = sparkColor;
        context.lineWidth = 2;
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();

        return progress < 1;
      });

      context.globalAlpha = 1;

      if (sparksRef.current.length > 0) {
        frameRef.current = window.requestAnimationFrame(drawRef.current);
      } else {
        frameRef.current = null;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, sparkColor, sparkRadius, sparkSize]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current || sparkCount < 1 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const now = performance.now();
    const angleStep = (Math.PI * 2) / sparkCount;

    sparksRef.current.push(
      ...Array.from({ length: sparkCount }, (_, index) => ({
        x: event.clientX,
        y: event.clientY,
        angle: angleStep * index,
        startTime: now,
      })),
    );

    if (frameRef.current === null) {
      frameRef.current = window.requestAnimationFrame(drawRef.current);
    }
  };

  return (
    <div className="click-spark-root" onClickCapture={handleClick}>
      <canvas ref={canvasRef} className="click-spark-canvas" aria-hidden="true" />
      {children}
    </div>
  );
}
