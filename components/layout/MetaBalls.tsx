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
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
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

    // Ball class
    class Ball {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      targetX: number;
      targetY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * speed * 2;
        this.vy = (Math.random() - 0.5) * speed * 2;
        this.radius = Math.random() * animationSize + 10;
        this.targetX = this.x;
        this.targetY = this.y;
      }

      update() {
        this.targetX += (Math.random() - 0.5) * clumpFactor;
        this.targetY += (Math.random() - 0.5) * clumpFactor;

        this.x += (this.targetX - this.x) * hoverSmoothness;
        this.y += (this.targetY - this.y) * hoverSmoothness;

        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
          this.vx *= -1;
          this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
          this.vy *= -1;
          this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = enableTransparency ? `${color}33` : color;
        ctx.fill();
      }
    }

    const balls = Array.from({ length: ballCount }, () => new Ball());
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

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
        ball.update();
        ball.draw();
      });

      if (enableMouseInteraction && containerMode) {
        // Draw cursor ball
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, cursorBallSize, 0, Math.PI * 2);
        ctx.fillStyle = cursorBallColor;
        ctx.fill();

        // Influence balls towards cursor
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

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.parentElement?.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
    };
  }, [color, cursorBallColor, cursorBallSize, ballCount, animationSize, enableMouseInteraction, enableTransparency, hoverSmoothness, clumpFactor, speed, containerMode]);

  const positionClass = containerMode ? "absolute inset-0 z-0" : "pointer-events-none fixed inset-0 z-0";

  return (
    <canvas
      ref={canvasRef}
      className={positionClass}
      style={{ background: "transparent" }}
    />
  );
}
