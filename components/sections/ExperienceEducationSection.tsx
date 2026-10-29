// Experience & Education timeline section
import ScrollReveal from "@/components/animations/ScrollReveal";

const experiences = [
  {
    title: "Fullstack Web Developer",
    company: "RuangCode · Freelance",
    period: "April 2025 – Present · Remote",
  },
  {
    title: "Fullstack Web Developer",
    company: "Rooma CeritaRasa · Freelance",
    period: "April 2026 – August 2026 · Remote",
  },
  {
    title: "Web Developer",
    company: "VERDEX · Freelance",
    period: "September 2023 – January 2026 · Yogyakarta, Indonesia",
  },
  {
    title: "IT Support",
    company: "PT. DAP Beton · Intern",
    period: "June 2025 – August 2025 · Remote",
  },
];

const education = [
  {
    title: "Bachelor of Informatics",
    institution: "Universitas Teknologi Yogyakarta",
    period: "September 2022 – April 2026",
  },
  {
    title: "Coding Camp 2025",
    institution: "DBS Foundation & Dicoding",
    period: "February 2025 - July 2025 · Specializing in Front-End and Back End Developer",
  },
];

function TimelineItem({
  title,
  sub,
  period,
  delay = 0,
}: {
  title: string;
  sub: string;
  period: string;
  delay?: number;
}) {
  return (
    <ScrollReveal delay={delay} duration={0.75} distance={24}>
      <div className="timeline-item">
        <div className="timeline-dot" aria-hidden="true" />
        <h3 className="timeline-title">{title}</h3>
        <p className="timeline-sub">{sub}</p>
        <p className="timeline-period">{period}</p>
      </div>
    </ScrollReveal>
  );
}

export default function ExperienceEducationSection() {
  return (
    <section className="exp-edu-section">
      <div className="exp-edu-inner">
        <div className="exp-edu-grid">
          {/* Work Experience */}
          <div className="exp-edu-col">
            <ScrollReveal delay={0} duration={0.75} distance={24}>
              <h2 className="exp-edu-col-heading">Work Experience</h2>
            </ScrollReveal>
            <div className="timeline-rail">
              {experiences.map((exp, i) => (
                <TimelineItem
                  key={exp.title + exp.company}
                  title={exp.title}
                  sub={exp.company}
                  period={exp.period}
                  delay={0.06 + i * 0.08}
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="exp-edu-col">
            <ScrollReveal delay={0.04} duration={0.75} distance={24}>
              <h2 className="exp-edu-col-heading">Education</h2>
            </ScrollReveal>
            <div className="timeline-rail">
              {education.map((edu, i) => (
                <TimelineItem
                  key={edu.title + edu.institution}
                  title={edu.title}
                  sub={edu.institution}
                  period={edu.period}
                  delay={0.15 + i * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
