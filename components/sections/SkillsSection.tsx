import type { IconType } from "react-icons";
import { skills } from "@/app/data/skillsData";
import SectionSurface from "@/components/sections/SectionSurface";

type SkillChipProps = {
  label: string;
  Icon: IconType;
};

function SkillChip({ label, Icon }: SkillChipProps) {
  return (
    <span className="skill-logo">
      <Icon className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" aria-hidden={true} focusable="false" />
      <span>{label}</span>
    </span>
  );
}

export default function SkillsSection() {
  return (
    <SectionSurface id="skills" className="skills-section-card">
      <div className="mt-10 w-full overflow-hidden">
        <div className="container-page text-center">
          <p className="mb-6 text-center text-sm text-zinc-500">
            Tools and technologies I work with
          </p>
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
