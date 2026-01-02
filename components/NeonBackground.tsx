"use client";

import { useEffect, useMemo, useState } from "react";

type Particle = {
  left: string;
  top: string;
  size: number;
  d: number;
  delay: number;
  opacity: number;
};

function prand(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export default function NeonBackground() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 18 }).map((_, i) => {
      const a = prand(i + 1);
      const b = prand(i + 33);
      const c = prand(i + 77);
      const size = 1 + Math.floor(prand(i + 101) * 2); // 1..2
      return {
        left: `${a * 100}%`,
        top: `${b * 100}%`,
        size,
        d: 4 + c * 5,
        delay: prand(i + 141) * 3,
        opacity: 0.12 + prand(i + 171) * 0.25,
      };
    });
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-zinc-950" />

      {/* orbs (CSS animation, blur diturunin biar paint ringan) */}
      <div
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-[80px] will-change-transform"
        style={{
          background: "rgba(168,85,247,0.20)",
          animation: reduce ? "none" : "orbA 20s ease-in-out infinite",
          transform: "translate3d(0,0,0)",
        }}
      />
      <div
        className="absolute top-12 -right-56 h-[640px] w-[640px] rounded-full blur-[90px] will-change-transform"
        style={{
          background: "rgba(59,130,246,0.20)",
          animation: reduce ? "none" : "orbB 24s ease-in-out infinite",
          transform: "translate3d(0,0,0)",
        }}
      />
      <div
        className="absolute -bottom-60 left-1/3 h-[700px] w-[700px] rounded-full blur-[95px] will-change-transform"
        style={{
          background: "rgba(34,211,238,0.14)",
          animation: reduce ? "none" : "orbC 22s ease-in-out infinite",
          transform: "translate3d(0,0,0)",
        }}
      />

      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:84px_84px]" />

      {/* scanlines (hapus blur biar repaint lebih ringan) */}
      <div className="absolute inset-0 opacity-[0.07] [background:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.08),rgba(255,255,255,0.08)_1px,transparent_1px,transparent_6px)]" />
      <div className="absolute inset-0">
        <div
          className="absolute -top-1/2 left-0 right-0 h-1/2 bg-gradient-to-b from-cyan-400/0 via-cyan-400/12 to-cyan-400/0"
          style={{ animation: reduce ? "none" : "scan 6s ease-in-out infinite" }}
        />
      </div>

      {/* particles (CSS animation, 0 Framer) */}
      {!reduce &&
        particles.map((p, i) => (
          <span
            key={`p-${i}`}
            className="absolute rounded-full will-change-transform"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: "rgba(255,255,255,0.7)",
              opacity: p.opacity,
              animation: `float ${p.d}s ease-in-out ${p.delay}s infinite`,
              transform: "translate3d(0,0,0)",
            }}
          />
        ))}

      {/* vignette */}
      <div className="absolute inset-0 [background:radial-gradient(900px_circle_at_50%_10%,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="absolute inset-0 [background:radial-gradient(1100px_circle_at_50%_120%,rgba(0,0,0,0),rgba(0,0,0,0.55))]" />

      <style jsx>{`
        @keyframes orbA {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          35% {
            transform: translate3d(100px, 60px, 0) scale(1.1);
          }
          70% {
            transform: translate3d(-60px, 130px, 0) scale(0.96);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        @keyframes orbB {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          35% {
            transform: translate3d(-95px, 85px, 0) scale(0.95);
          }
          70% {
            transform: translate3d(40px, -45px, 0) scale(1.08);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        @keyframes orbC {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          35% {
            transform: translate3d(75px, -70px, 0) scale(1.06);
          }
          70% {
            transform: translate3d(-110px, 35px, 0) scale(0.97);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        @keyframes scan {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          50% {
            transform: translate3d(0, 220%, 0);
            opacity: 1;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translate3d(0, 260%, 0);
            opacity: 0;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.7;
          }
          50% {
            transform: translate3d(0, -22px, 0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
