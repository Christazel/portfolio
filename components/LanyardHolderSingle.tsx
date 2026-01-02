"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  imageSrc?: string; // "/asset/profile.jpeg"
  alt?: string;
};

export default function LanyardHolderSingle({
  imageSrc = "/asset/profile_800.webp",
  alt = "Profile photo",
}: Props) {
  const reduce = useReducedMotion();

  return (
    // ✅ padding-top biar strap punya ruang sendiri (jadi tidak naik ke area tombol)
    <div className="relative flex justify-center pt-[190px] md:pt-[200px]">
      {/* ===== STRAP (SINGLE) + BUCKLE + CLIP ===== */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2">
        <div className="relative h-[200px] w-[140px]">
          {/* strap */}
          <div
            className="absolute left-1/2 top-0 h-[150px] w-[18px] -translate-x-1/2 rounded-full
                       border border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.40)]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0 7px, rgba(255,255,255,0.05) 7px 14px), linear-gradient(180deg, rgba(14,165,233,0.22), rgba(2,6,23,0.18))",
            }}
          />

          {/* buckle */}
          <div className="absolute left-1/2 top-[62px] -translate-x-1/2">
            <div className="h-10 w-14 rounded-xl border border-white/10 bg-zinc-950/75 shadow-[0_14px_28px_rgba(0,0,0,0.50)]" />
            <div className="absolute left-1/2 top-1/2 h-4 w-10 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/10 bg-zinc-900/70" />
          </div>

          {/* ring + chain + clip */}
          <div className="absolute left-1/2 top-[118px] -translate-x-1/2 flex flex-col items-center">
            <div className="relative h-6 w-6 rounded-full border border-white/25 bg-zinc-950/35 shadow-[0_0_18px_rgba(34,211,238,0.14)]">
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-950" />
            </div>

            <div className="mt-1 flex flex-col items-center gap-1">
              <div className="h-3 w-3 rounded-full border border-white/20 bg-zinc-950/35" />
              <div className="h-3 w-3 rounded-full border border-white/20 bg-zinc-950/35" />
            </div>

            <div className="relative mt-1 h-8 w-11 rounded-2xl border border-white/18 bg-gradient-to-b from-white/22 to-white/6 shadow-[0_18px_35px_rgba(0,0,0,0.55)]">
              <div className="absolute left-1/2 top-1/2 h-3 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/14 bg-zinc-950/45" />
            </div>
          </div>
        </div>
      </div>

      {/* ===== HOLDER (POUCH) + SWING ===== */}
      <motion.div
        className="relative"
        style={{ transformOrigin: "50% 0%" }}
        animate={
          reduce
            ? undefined
            : {
                rotate: [-3.5, 3.5, -2.5, 2.5, -3.5],
                y: [0, 2, 0, 1, 0],
              }
        }
        transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
        whileHover={reduce ? undefined : { rotate: 0, y: 0 }}
      >
        {/* shadow */}
        <div className="pointer-events-none absolute left-1/2 top-[305px] md:top-[320px] -translate-x-1/2 h-6 w-[210px] md:w-[220px] rounded-full bg-black/45 blur-xl" />

        {/* glow border */}
        <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-purple-500/10 blur-md opacity-60" />

        {/* pouch body */}
        <div
          className="relative rounded-[28px] border border-white/10 bg-[#0b2433]/45 backdrop-blur-md
                     shadow-[0_24px_60px_rgba(0,0,0,0.60)]"
          style={{ width: 230, height: 300 }}
        >
          {/* desktop size */}
          <div className="hidden md:block">
            <div className="absolute inset-0 rounded-[28px]" style={{ width: 250, height: 320 }} />
          </div>

          {/* stitching */}
          <div className="absolute inset-[10px] rounded-[22px] border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />

          {/* zipper strip kanan */}
          <div className="absolute right-3 top-6 h-[232px] md:h-[250px] w-[10px] rounded-full bg-black/25 border border-white/10" />
          <div className="absolute right-2 top-10 h-7 w-5 rounded-xl border border-white/10 bg-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.35)]" />

          {/* window foto */}
          <div className="absolute left-6 top-8 right-10 bottom-10 rounded-[20px] border border-white/12 bg-black/20">
            <div className="absolute inset-2 rounded-[16px] border border-white/10 bg-black/25 overflow-hidden">
              <div className="relative h-full w-full">
                <Image
                  src={imageSrc}
                  alt={alt}
                  fill
                  priority
                  quality={75}
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 260px"
                  className="object-cover object-center"
                />
              </div>

              {/* glossy plastik */}
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    "linear-gradient(115deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.02) 55%, rgba(255,255,255,0.10) 75%, rgba(255,255,255,0.02) 100%)",
                }}
              />
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_-40px_60px_rgba(0,0,0,0.45)]" />
            </div>
          </div>

          {/* bottom lip */}
          <div className="absolute left-0 bottom-0 h-10 w-full rounded-b-[28px] bg-black/15 border-t border-white/10" />
        </div>
      </motion.div>
    </div>
  );
}
