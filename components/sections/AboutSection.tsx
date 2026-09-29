import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function AboutSection() {
  return (
    <section className="about-new-section">
      <div className="about-new-inner">
        {/* Header */}
        <ScrollReveal delay={0} duration={0.7} distance={30}>
          <div className="about-new-header text-center flex flex-col items-center justify-center mx-auto max-w-2xl mb-8">
            <h2 className="about-new-heading text-center">About Me</h2>
            <p className="about-new-subheading text-center max-w-xl mx-auto">
              Freelance Full Stack Web Developer and Informatics Graduate focused on building high-performance web applications and scalable systems.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-col: photo + description */}
        <div className="about-new-grid">
          {/* Avatar — slides in from left */}
          <ScrollReveal delay={0.15} duration={0.8} distance={40} direction="right">
            <div className="about-new-avatar-shell group">
              <div className="about-new-avatar-wrapper">
                <Image
                  src="/asset/profile_800.webp"
                  alt="Yohan Christazel Jeffry"
                  width={480}
                  height={600}
                  className="about-new-avatar"
                  sizes="(max-width: 768px) 80vw, 40vw"
                  priority
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Description — slides in from right */}
          <ScrollReveal delay={0.3} duration={0.8} distance={40} direction="left">
            <div className="about-new-desc">
              <h3 className="about-new-title">
                Freelance Full Stack
                <br />
                Web Developer.
              </h3>
              <div className="about-new-body-paragraphs">
                <p>
                  Hello! I&apos;m Yohan, an Informatics graduate from Universitas Teknologi Yogyakarta and a Full Stack Web Developer specializing in building modern web applications, interactive user interfaces, and scalable backend systems.
                </p>
                <p>
                  With a strong background in full stack web development, I have experience designing and developing web-based solutions using modern technologies across frontend and backend environments. I have built applications such as management systems and digital platforms while applying best practices in software development, problem-solving, and collaboration.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

