import type { ReactNode } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";

type SectionSurfaceProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  reveal?: boolean;
};

export default function SectionSurface({ children, id, className = "", delay = 0, reveal = true }: SectionSurfaceProps) {
  const surface = <div className="section-card-surface">{children}</div>;

  return (
    <section id={id} className={`scroll-card-section ${className}`}>
      {reveal ? (
        <ScrollReveal delay={delay} duration={0.72} distance={70} scale={0.965} threshold={0.18}>
          {surface}
        </ScrollReveal>
      ) : (
        surface
      )}
    </section>
  );
}
