"use client";

import { useEffect, useRef } from "react";

type MetaBallsProps = {
  color?: string;
  cursorBallColor?: string;
  cursorBallSize?: number;
  ballCount?: number;
  animationSize?: number;
  enableMouseInteraction?: boolean;
  enableTransparency?: boolean;
  hoverSmoothness?: number;
  clumpFactor?: number;
  speed?: number;
  containerMode?: boolean;
};

type BallState = {
  x: number;
  y: number;
  radius: number;
  targetX: number;
  targetY: number;
};

function createBall(width: number, height: number, animationSize: number): BallState {
  const x = Math.random() * width;
  const y = Math.random() * height;

  return {
    x,
    y,
    radius: Math.random() * animationSize + 10,
    targetX: x,
    targetY: y,
  };
}

function updateBall(
  ball: BallState,
  width: number,
  height: number,
  hoverSmoothness: number,
  clumpFactor: number,
) {
  ball.targetX += (Math.random() - 0.5) * clumpFactor;
  ball.targetY += (Math.random() - 0.5) * clumpFactor;

  ball.x += (ball.targetX - ball.x) * hoverSmoothness;
  ball.y += (ball.targetY - ball.y) * hoverSmoothness;

  if (ball.x - ball.radius < 0 || ball.x + ball.radius > width) {
    ball.x = Math.max(ball.radius, Math.min(width - ball.radius, ball.x));
    ball.targetX = ball.x;
  }

  if (ball.y - ball.radius < 0 || ball.y + ball.radius > height) {
    ball.y = Math.max(ball.radius, Math.min(height - ball.radius, ball.y));
    ball.targetY = ball.y;
  }
}

function drawBall(ctx: CanvasRenderingContext2D, ball: BallState, fillStyle: string) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

export default function MetaBalls({
  color = "#ffffff",
  cursorBallColor = "#ffffff",
  cursorBallSize = 2,
  ballCount = 15,
  animationSize = 30,
  enableMouseInteraction = true,
  enableTransparency = true,
  hoverSmoothness = 0.15,
  clumpFactor = 1,
  speed = 0.3,
  containerMode = true,
}: MetaBallsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const canvas: HTMLCanvasElement = canvasEl;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (containerMode && canvas.parentElement) {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (containerMode && canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener("resize", resizeCanvas);

    const balls = Array.from({ length: ballCount }, () => createBall(canvas.width, canvas.height, animationSize));
    const fillStyle = enableTransparency ? `${color}33` : color;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let animationFrameId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouseInteraction || !containerMode) return;
      if (canvas.parentElement) {
        const rect = canvas.parentElement.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      }
    };

    canvas.parentElement?.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach((ball) => {
        updateBall(ball, canvas.width, canvas.height, hoverSmoothness, clumpFactor * speed);
        drawBall(ctx, ball, fillStyle);
      });

      if (enableMouseInteraction && containerMode) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, cursorBallSize, 0, Math.PI * 2);
        ctx.fillStyle = cursorBallColor;
        ctx.fill();

        balls.forEach((ball) => {
          const dx = mouseX - ball.x;
          const dy = mouseY - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 0.5;
            ball.targetX += dx * force;
            ball.targetY += dy * force;
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("resize", resizeCanvas);
      canvas.parentElement?.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
    };
  }, [
    color,
    cursorBallColor,
    cursorBallSize,
    ballCount,
    animationSize,
    enableMouseInteraction,
    enableTransparency,
    hoverSmoothness,
    clumpFactor,
    speed,
    containerMode,
  ]);

  const positionClass = containerMode ? "absolute inset-0 z-0" : "pointer-events-none fixed inset-0 z-0";

  return <canvas ref={canvasRef} className={positionClass} style={{ background: "transparent" }} />;
}
