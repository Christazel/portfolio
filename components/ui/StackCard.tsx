"use client";

import type { ReactNode } from "react";
import type { MotionValue } from "framer-motion";
import Image from "next/image";

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
  layout?: "split" | "full";
  panelChrome?: boolean;
  variant?: "dark" | "light";
};

export default function StackCard({
  card,
  index,
  total,
  progress,
  children,
  layout = "split",
  panelChrome = true,
  variant = "dark",
}: StackCardProps) {
  void total;
  void progress;

  const isLight = variant === "light";

  return (
    <div className="stack-card-shell flex items-start justify-center" style={{ zIndex: index + 1 }}>
      <article
        className="stack-card-article group relative w-full max-w-7xl overflow-hidden rounded-3xl border"
        style={{
          borderColor: isLight ? "rgba(9,9,11,0.14)" : "rgba(244,244,245,0.18)",
          boxShadow: isLight ? "0 18px 46px rgba(24,24,27,0.12)" : "0 18px 46px rgba(0,0,0,0.32)",
        }}
      >
        <div
          className={`stack-card-inner relative min-h-[34rem] overflow-hidden rounded-[calc(1.5rem-1px)] md:min-h-[38rem] ${
            isLight ? "bg-zinc-100 text-zinc-950" : "bg-[#171717] text-zinc-50"
          }`}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background: isLight
                ? "radial-gradient(circle at 18% 16%, rgba(9,9,11,0.06), transparent 26rem)"
                : "radial-gradient(circle at 18% 16%, rgba(244,244,245,0.06), transparent 26rem)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_32%,rgba(255,255,255,0.025)_72%,transparent)] opacity-40" />

          {layout === "full" && children ? (
            <div className="stack-card-content stack-card-content-full relative min-h-[34rem] p-7 md:min-h-[38rem] md:p-10 lg:p-14">
              {children}
            </div>
          ) : (
            <div className="stack-card-content relative grid min-h-[34rem] gap-8 p-7 md:min-h-[38rem] md:grid-cols-[0.9fr_1.1fr] md:p-10 lg:p-14">
              <div className="flex flex-col justify-between">
                <div>
                  <h3
                    className={`stack-card-title max-w-2xl text-4xl font-semibold leading-[0.98] md:text-6xl ${
                      isLight ? "text-zinc-950" : "text-zinc-50"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`mt-6 max-w-xl text-base leading-relaxed md:text-lg ${isLight ? "text-zinc-600" : "text-zinc-400"}`}
                  >
                    {card.description}
                  </p>
                </div>

                <div className="stack-card-footer mt-10 flex items-center gap-3 text-sm text-zinc-500">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-100" />
                  <span>{card.footer ?? "Scroll to the next card"}</span>
                </div>
              </div>

              {children ? (
                panelChrome ? (
                  <div
                    className={`stack-card-panel relative min-h-[22rem] overflow-hidden rounded-3xl border p-5 md:min-h-full md:p-7 ${
                      isLight ? "border-zinc-950/10 bg-white" : "border-white/10 bg-[#1f1f1f]"
                    }`}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-45"
                      style={{
                        background: isLight
                          ? "radial-gradient(circle at 70% 10%, rgba(9,9,11,0.05), transparent 24rem)"
                          : "radial-gradient(circle at 70% 10%, rgba(244,244,245,0.05), transparent 24rem)",
                      }}
                    />
                    <div className="relative z-10">{children}</div>
                  </div>
                ) : (
                  <div className="stack-card-panel stack-card-panel-plain relative min-h-[22rem] md:min-h-full">
                    {children}
                  </div>
                )
              ) : (
                <div className="stack-card-panel relative min-h-[22rem] overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 md:min-h-full">
                  {card.image && (
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="scale-110 object-cover opacity-90 grayscale transition duration-700 group-hover:scale-[1.14] group-hover:opacity-100 group-hover:grayscale-0"
                      draggable={false}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-white/5" />
                  <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-black/50 p-4 text-sm text-zinc-300">
                    Clean card section with focused content.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
