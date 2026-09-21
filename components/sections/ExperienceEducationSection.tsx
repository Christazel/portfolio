// Experience & Education timeline section — 2-col layout matching udindwy.vercel.app/about
const experiences = [
  {
    title: "Fullstack Web Developer",
    company: "Rooma Ceritarasa · Freelance",
    period: "2025 · Yogyakarta, Indonesia",
  },
  {
    title: "Fullstack Web Developer",
    company: "Sistem Informasi Magang · Freelance",
    period: "2025 · Remote",
  },
  {
    title: "Member & Committee",
    company: "HMIF UTY · Campus Organization",
    period: "2022 – Present · Yogyakarta, Indonesia",
  },
];

const education = [
  {
    title: "Bachelor of Informatics",
    institution: "Universitas Teknologi Yogyakarta",
    period: "Sep 2022 – Present",
  },
  {
    title: "Coding Camp 2025",
    institution: "DBS Foundation · Graduate",
    period: "2025 · Fullstack Track",
  },
];

function TimelineItem({
  title,
  sub,
  period,
}: {
  title: string;
  sub: string;
  period: string;
}) {
  return (
    <div className="timeline-item">
      <div className="timeline-dot" aria-hidden="true" />
      <h4 className="timeline-title">{title}</h4>
      <p className="timeline-sub">{sub}</p>
      <p className="timeline-period">{period}</p>
    </div>
  );
}

export default function ExperienceEducationSection() {
  return (
    <section className="exp-edu-section">
      <div className="exp-edu-inner">
        <div className="exp-edu-grid">
          {/* Work Experience */}
          <div className="exp-edu-col">
            <h3 className="exp-edu-col-heading">Work Experience</h3>
            <div className="timeline-rail">
              {experiences.map((exp) => (
                <TimelineItem
                  key={exp.title + exp.company}
                  title={exp.title}
                  sub={exp.company}
                  period={exp.period}
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="exp-edu-col">
            <h3 className="exp-edu-col-heading">Education</h3>
            <div className="timeline-rail">
              {education.map((edu) => (
                <TimelineItem
                  key={edu.title + edu.institution}
                  title={edu.title}
                  sub={edu.institution}
                  period={edu.period}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
