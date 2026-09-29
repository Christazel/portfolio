// Bento-style tech stack section matching udindwy.vercel.app/about
import ScrollReveal from "@/components/animations/ScrollReveal";

const techGroups = [
  {
    title: "Programming Languages",
    items: ["JavaScript", "TypeScript", "PHP", "Python", "HTML / CSS"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["Next.js", "React", "Tailwind CSS", "Express", "Node.js", "Flutter"],
  },
  {
    title: "Tools & Databases",
    items: ["Git", "GitHub", "MySQL", "MongoDB", "Postman", "Vercel", "Figma"],
  },
  {
    title: "AI-Assisted Tools",
    items: ["ChatGPT", "Gemini", "Claude", "Cursor", "Antigravity IDE"],
  },
];

export default function SkillsSection() {
  return (
    <section className="skills-new-section">
      <div className="skills-new-inner">
        <ScrollReveal delay={0} duration={0.7} distance={24}>
          <h3 className="skills-new-heading">Tech Stack &amp; Tools</h3>
        </ScrollReveal>

        <div className="skills-new-grid">
          {techGroups.map((group, i) => (
            <ScrollReveal key={group.title} delay={i * 0.1} duration={0.7} distance={30}>
              <div className="skills-new-card">
                <h4 className="skills-new-card-title">{group.title}</h4>
                <div className="skills-new-chips">
                  {group.items.map((item) => (
                    <span key={item} className="skills-new-chip" tabIndex={0}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

