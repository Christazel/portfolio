"use client";

import { useState } from "react";
import { aboutText, highlights } from "@/app/data/homeData";
import PortfolioPill from "@/components/sections/PortfolioPill";
import SectionSurface from "@/components/sections/SectionSurface";

export default function AboutSection() {
  const [aboutLang, setAboutLang] = useState<"id" | "en">("id");

  return (
    <SectionSurface id="about">
      <div className="p-8 md:p-12 xl:p-16">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="section-kicker">About</p>
            <h2 className="section-title">A quick intro</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAboutLang("id")}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                aboutLang === "id"
                  ? "border-zinc-600 bg-zinc-800 text-zinc-100"
                  : "border-zinc-700 text-zinc-400 hover:text-white"
              }`}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setAboutLang("en")}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                aboutLang === "en"
                  ? "border-zinc-600 bg-zinc-800 text-zinc-100"
                  : "border-zinc-700 text-zinc-400 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            <div>
              <p className="text-justify text-lg leading-relaxed text-zinc-300 md:text-xl">
                {aboutLang === "id" ? aboutText.id : aboutText.en}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <PortfolioPill>UTY • Informatics</PortfolioPill>
                <PortfolioPill>Team Collaboration</PortfolioPill>
              </div>
            </div>

            <div className="grid gap-3">
              {highlights.map((item) => (
                <div key={item.title} className="stat-card">
                  <p className="text-sm font-medium text-zinc-100">{item.title}</p>
                  <p className="mt-1 text-xs text-zinc-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionSurface>
  );
}
