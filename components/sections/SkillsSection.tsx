import type { ComponentType } from "react";
import { skills } from "@/app/data/homeData";
import SectionSurface from "@/components/sections/SectionSurface";

type SkillChipProps = {
  label: string;
  Icon: ComponentType<{ className?: string }>;
};

function SkillChip({ label, Icon }: SkillChipProps) {
  return (
    <span className="skill-logo">
      <Icon className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
      <span>{label}</span>
    </span>
  );
}

export default function SkillsSection() {
  return (
    <SectionSurface id="skills" className="skills-section-card">
      <div className="overflow-hidden py-14 md:py-20">
        <div className="container-page text-center">
          <p className="text-lg font-medium text-zinc-500 md:text-xl">Tools and technologies I work with</p>
        </div>

        <div className="skill-slider" aria-label="Skills slider">
          <div className="skill-track">
            {[0, 1].map((sequence) => (
              <div key={sequence} className="skill-sequence" aria-hidden={sequence === 1}>
                {skills.map(({ label, Icon }) => (
                  <SkillChip key={`${label}-${sequence}`} label={label} Icon={Icon} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionSurface>
  );
}
