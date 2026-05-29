import { aboutText, highlights } from "@/app/data/homeData";
import SectionSurface from "@/components/sections/SectionSurface";

export default function AboutSection() {
  return (
    <SectionSurface id="about" className="about-yoga-section">
      <div className="about-yoga-inner">
        <header className="about-yoga-header">
          <p className="section-kicker">About</p>
          <h2>About Me</h2>
          <p>I don&apos;t just write code. I build products.</p>
        </header>

        <div className="about-yoga-content">
          <p className="about-yoga-copy">{aboutText.en}</p>

          <div className="about-yoga-points">
            <p>What I care about:</p>
            <ul>
              {highlights.map((item) => (
                <li key={item.title}>
                  <span>{item.title}</span>
                  <small>{item.desc}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionSurface>
  );
}
