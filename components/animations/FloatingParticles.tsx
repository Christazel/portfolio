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
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let canvasWidth = 0;
    let canvasHeight = 0;
    let dpr = 1;

    // Optimized resize handler with debounce
    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Only update if size actually changed
      if (canvasWidth === width && canvasHeight === height) return;

      canvasWidth = width;
      canvasHeight = height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const debouncedResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(resizeCanvas, 150);
    };

    resizeCanvas();
    window.addEventListener("resize", debouncedResize);

    // Initialize particles - adjusted for better performance
    const isMobile = window.innerWidth < 1024;
    const particleCount = isMobile ? 8 : 12;

    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.2 + 0.5,
      opacity: Math.random() * 0.25 + 0.15,
    }));

    const THROTTLE_MS = isMobile ? 50 : 40;
    const CONNECTION_DISTANCE = 120;
    const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
    const TRAIL_OPACITY = "rgba(10, 10, 20, 0.04)";
    const PARTICLE_COLOR = "rgba(100, 200, 255,";
    const CONNECTION_COLOR = "rgba(100, 200, 255,";

    const animate = (currentTime: number) => {
      if (!isRunningRef.current) return;

      // Efficient throttling
      const timeDiff = currentTime - lastTimeRef.current;
      if (timeDiff < THROTTLE_MS) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = currentTime;

      // Skip rendering if not visible
      if (!canvas.offsetHeight || !canvas.offsetParent) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const isScrolling = document.documentElement.dataset.scrolling === "1";

      // Clear canvas with trail effect
      ctx.fillStyle = TRAIL_OPACITY;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      const particles = particlesRef.current;
      const particleCount = particles.length;

      // Update and draw particles
      for (let i = 0; i < particleCount; i++) {
        const particle = particles[i];

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls (optimized)
        const minX = particle.radius;
        const maxX = canvasWidth - particle.radius;
        const minY = particle.radius;
        const maxY = canvasHeight - particle.radius;

        if (particle.x < minX || particle.x > maxX) {
          particle.vx *= -1;
          particle.x = particle.x < minX ? minX : maxX;
        }
        if (particle.y < minY || particle.y > maxY) {
          particle.vy *= -1;
          particle.y = particle.y < minY ? minY : maxY;
        }

        // Draw particle
        ctx.fillStyle = `${PARTICLE_COLOR} ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, 6.28);
        ctx.fill();
      }

      // Draw connections only when not scrolling
      if (!isScrolling && particleCount > 1) {
        // Use a spatial partition approach for faster lookup
        const cellSize = 200;
        const grid = new Map<string, number[]>();

        // Populate grid
        for (let i = 0; i < particleCount; i++) {
          const cell = `${Math.floor(particles[i].x / cellSize)},${Math.floor(particles[i].y / cellSize)}`;
          if (!grid.has(cell)) grid.set(cell, []);
          grid.get(cell)!.push(i);
        }

        // Check connections in adjacent cells only
        ctx.strokeStyle = `${CONNECTION_COLOR} 0.15)`;
        ctx.lineWidth = 0.5;

        for (let i = 0; i < particleCount; i++) {
          const p1 = particles[i];
          const cellX = Math.floor(p1.x / cellSize);
          const cellY = Math.floor(p1.y / cellSize);

          // Check only adjacent cells
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              const cell = `${cellX + dx},${cellY + dy}`;
              const cellParticles = grid.get(cell);
              
              if (cellParticles) {
                for (const j of cellParticles) {
                  if (j <= i) continue;

                  const p2 = particles[j];
                  const dx = p1.x - p2.x;
                  const dy = p1.y - p2.y;
                  const distSq = dx * dx + dy * dy;

                  if (distSq < CONNECTION_DISTANCE_SQ) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                  }
                }
              }
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

    // Cleanup
    return () => {
      window.removeEventListener("resize", debouncedResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      isRunningRef.current = false;
      
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
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
