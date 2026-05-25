"use client";

import type { ReactNode } from "react";
import { motion, type MotionValue, useTransform } from "framer-motion";

export type StackingCardItem = {
  title: string;
  description: string;
  image?: string;
  accentColor: string;
  footer?: string;
};

type StackCardProps = {
  card: StackingCardItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  children?: ReactNode;
  variant?: "dark" | "light";
};

export default function StackCard({ card, index, total, progress, children, variant = "dark" }: StackCardProps) {
  const segment = 1 / total;
  const start = index * segment;
  const arrive = Math.max(start - segment * 0.45, 0);
  const leave = Math.min(start + segment * 1.15, 1);
  const targetScale = 1 - (total - index) * 0.008;

  // Each card rises into place, then gently scales down as the next card takes over.
  const y = useTransform(progress, [arrive, start], index === 0 ? [0, 0] : [112, 0]);
  const scale = useTransform(progress, [start, leave], [1, index === total - 1 ? 1 : targetScale]);
  const opacity = useTransform(progress, [arrive, start], index === 0 ? [1, 1] : [0.35, 1]);
  const imageY = useTransform(progress, [arrive, leave], [18, -18]);

  return (
    <div
      className="stack-card-shell sticky top-24 flex min-h-screen items-start justify-center pt-8 md:pt-12"
      style={{ zIndex: index + 1 }}
    >
      <motion.article
        className="stack-card-article group relative w-full max-w-7xl overflow-hidden rounded-3xl border shadow-xl will-change-transform"
        style={{
          y,
          scale,
          opacity,
          borderColor: variant === "light" ? "rgba(9,9,11,0.14)" : "rgba(244,244,245,0.18)",
          boxShadow:
            variant === "light"
              ? "0 28px 80px rgba(24,24,27,0.16)"
              : "0 28px 80px rgba(0,0,0,0.42), 0 0 34px rgba(244,244,245,0.08)",
          transformOrigin: "top center",
          backfaceVisibility: "hidden",
        }}
      >
        <div
          className={`stack-card-inner relative min-h-[34rem] overflow-hidden rounded-[calc(1.5rem-1px)] md:min-h-[38rem] ${
            variant === "light" ? "bg-zinc-100/96 text-zinc-950" : "bg-[#171717] text-zinc-50"
          }`}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                variant === "light"
                  ? "radial-gradient(circle at 18% 16%, rgba(9,9,11,0.08), transparent 26rem)"
                  : "radial-gradient(circle at 18% 16%, rgba(244,244,245,0.08), transparent 26rem)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.12),transparent_28%,rgba(255,255,255,0.04)_70%,transparent)] opacity-60" />

          <div className="stack-card-content relative grid min-h-[34rem] gap-8 p-7 md:min-h-[38rem] md:grid-cols-[0.9fr_1.1fr] md:p-10 lg:p-14">
            <div className="flex flex-col justify-between">
              <div>
                <h3
                  className={`stack-card-title max-w-2xl text-4xl font-semibold leading-[0.98] md:text-6xl ${
                    variant === "light" ? "text-zinc-950" : "text-zinc-50"
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`mt-6 max-w-xl text-base leading-relaxed md:text-lg ${
                    variant === "light" ? "text-zinc-600" : "text-zinc-400"
                  }`}
                >
                  {card.description}
                </p>
              </div>

              <div className={`stack-card-footer mt-10 flex items-center gap-3 text-sm ${variant === "light" ? "text-zinc-500" : "text-zinc-500"}`}>
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-100" />
                <span>{card.footer ?? "Scroll to stack the next card"}</span>
              </div>
            </div>

            {children ? (
              <div
                className={`stack-card-panel relative min-h-[22rem] overflow-hidden rounded-3xl border p-5 shadow-xl md:min-h-full md:p-7 ${
                  variant === "light" ? "border-zinc-950/10 bg-white" : "border-white/10 bg-[#1f1f1f]"
                }`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-60"
                  style={{
                    background:
                      variant === "light"
                        ? "radial-gradient(circle at 70% 10%, rgba(9,9,11,0.06), transparent 24rem)"
                        : "radial-gradient(circle at 70% 10%, rgba(244,244,245,0.06), transparent 24rem)",
                  }}
                />
                <div className="relative z-10">{children}</div>
              </div>
            ) : (
              <div className="stack-card-panel relative min-h-[22rem] overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 shadow-xl md:min-h-full">
                {card.image && (
                  <motion.img
                    src={card.image}
                    alt=""
                    className="h-full w-full scale-110 object-cover opacity-80 grayscale transition duration-700 group-hover:scale-[1.14] group-hover:opacity-100 group-hover:grayscale-0"
                    style={{ y: imageY }}
                    draggable={false}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-white/5" />
                <div
                  className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-black/35 p-4 text-sm text-zinc-300 backdrop-blur-md"
                  style={{ boxShadow: `0 0 34px ${card.accentColor}1f` }}
                >
                  Smooth sticky overlap, glass detail, and subtle image parallax.
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
}
