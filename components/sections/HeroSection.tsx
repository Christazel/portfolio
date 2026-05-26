import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="hero-cover" aria-label="Portfolio introduction">
      <div className="hero-cover-overlay" />

      <div className="hero-cover-inner">
        <div className="hero-portrait-shell">
          <Image
            src="/asset/profile_800.webp"
            alt="Yohan Christazel Jeffry"
            width={480}
            height={480}
            priority
            quality={62}
            sizes="(max-width: 520px) 42vw, (max-width: 980px) 36vw, 24vw"
            className="hero-portrait"
          />
          <div className="hero-portrait-badge" aria-hidden="true">
            YC
          </div>
        </div>

        <div className="hero-copy">
          <p className="hero-kicker">Fullstack Developer</p>

          <h1 className="hero-display">
            Hi, I&apos;m <em>Yohan Christazel Jeffry</em>.
          </h1>

          <p className="hero-lede">
            I build fast web products, reliable APIs, and useful mobile experiences from idea to production.
          </p>

          <p className="hero-tags">Web · Mobile · UI/UX · API</p>

          <div className="hero-actions hero-cover-actions">
            <a className="btn-neon" href="#projects">
              <span className="hero-btn-icon" aria-hidden="true">◎</span>
              <span>View My Work</span>
            </a>
            <a className="btn-neon-ghost" href="#contact">
              <span>Get in Touch</span>
              <span aria-hidden="true">-&gt;</span>
            </a>
          </div>

          <div className="hero-availability">
            <span className="hero-dot" aria-hidden="true" />
            <span>Available for opportunities</span>
          </div>
        </div>
      </div>
    </section>
  );
}
