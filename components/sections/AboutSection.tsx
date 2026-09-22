import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="about-new-section">
      <div className="about-new-inner">
        {/* Header */}
        <div className="about-new-header text-center flex flex-col items-center justify-center mx-auto max-w-2xl mb-8">
          <h2 className="about-new-heading text-center">About Me</h2>
          <p className="about-new-subheading text-center max-w-xl mx-auto">
            Fullstack Developer and Informatics Student focused on building high-performance web applications and scalable systems.
          </p>
        </div>

        {/* 2-col: photo + description */}
        <div className="about-new-grid">
          {/* Avatar */}
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

          {/* Description */}
          <div className="about-new-desc">
            <h3 className="about-new-title">
              Full Stack Web Developer &amp;
              <br />
              Informatics Student.
            </h3>
            <div className="about-new-body-paragraphs">
              <p>
                Halo! I'm Yohan, an Informatics student at Universitas Teknologi Yogyakarta and Fullstack Developer, where I work on designing and building modern web applications, interactive user interfaces, and scalable backend workflows.
              </p>
              <p>
                With a strong background in full stack web development and having graduated from Coding Camp 2025 powered by DBS Foundation, I build robust, high-performance applications from frontend to backend while collaborating actively in team and organizational environments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

