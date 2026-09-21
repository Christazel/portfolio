import Image from "next/image";
import { aboutText } from "@/app/data/homeData";

export default function AboutSection() {
  return (
    <section className="about-new-section">
      <div className="about-new-inner">
        {/* Header */}
        <div className="about-new-header">
          <h2 className="about-new-heading">About Me</h2>
          <p className="about-new-subheading">
            Fullstack Developer & Informatics Student
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
                height={480}
                className="about-new-avatar"
                sizes="(max-width: 768px) 80vw, 40vw"
              />
            </div>
          </div>

          {/* Description */}
          <div className="about-new-desc">
            <h3 className="about-new-title">
              Full Stack Web Developer &<br />
              Informatics Student.
            </h3>
            <p className="about-new-body">{aboutText.en}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
