"use client";

import type { ReactNode } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";

type SectionSurfaceProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
};

export default function SectionSurface({ children, id, className = "", delay = 0 }: SectionSurfaceProps) {
  return (
    <section id={id} className={`scroll-card-section ${className}`}>
      <ScrollReveal delay={delay} duration={0.72} distance={70} scale={0.965} threshold={0.18}>
        <div className="section-card-surface">{children}</div>
      </ScrollReveal>
    </section>
  );
}
