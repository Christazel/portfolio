"use client";

import { useEffect, useRef, memo } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const FloatingParticles = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const isRunningRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles - reduced count for better performance
    const particleCount = window.innerWidth < 1024 ? 10 : 14;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3, // Slower movement
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5, // Smaller particles
      opacity: Math.random() * 0.3 + 0.2,
    }));

    const animate = (currentTime: number) => {
      if (!isRunningRef.current) return;

      // Throttle to ~20fps on mobile and ~24fps on desktop.
      const minFrameGap = window.innerWidth < 1024 ? 50 : 42;
      if (currentTime - lastTimeRef.current < minFrameGap) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = currentTime;

      // Early exit if canvas is not visible.
      if (!canvas.offsetHeight || !canvas.offsetParent) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const isScrolling = document.documentElement.dataset.scrolling === "1";
      const drawConnections = !isScrolling;

      ctx.fillStyle = "rgba(10, 10, 20, 0.05)"; // More transparent trail
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x - particle.radius < 0 || particle.x + particle.radius > window.innerWidth) {
          particle.vx *= -1;
          particle.x = Math.max(particle.radius, Math.min(window.innerWidth - particle.radius, particle.x));
        }
        if (particle.y - particle.radius < 0 || particle.y + particle.radius > window.innerHeight) {
          particle.vy *= -1;
          particle.y = Math.max(particle.radius, Math.min(window.innerHeight - particle.radius, particle.y));
        }

        // Draw particle with glow - simplified
        ctx.fillStyle = `rgba(100, 200, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      if (drawConnections) {
        // Simplified connections - only check nearby particles.
        for (let i = 0; i < particlesRef.current.length; i++) {
          for (let j = i + 1; j < Math.min(i + 4, particlesRef.current.length); j++) {
            const dx = particlesRef.current[i].x - particlesRef.current[j].x;
            const dy = particlesRef.current[i].y - particlesRef.current[j].y;
            const distanceSq = dx * dx + dy * dy;
            const threshold = 110;

            if (distanceSq < threshold * threshold) {
              const distance = Math.sqrt(distanceSq);
              ctx.strokeStyle = `rgba(100, 200, 255, ${(1 - distance / threshold) * 0.2})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
              ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
              ctx.stroke();
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        isRunningRef.current = false;
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = undefined;
        }
      } else if (!isRunningRef.current) {
        isRunningRef.current = true;
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      isRunningRef.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 0.08 }}
    />
  );
});

FloatingParticles.displayName = "FloatingParticles";

export default FloatingParticles;
