import HeroSection from "@/components/sections/HeroSection";
import Navbar from "@/components/sections/Navbar";
import dynamic from "next/dynamic";

const AboutSection = dynamic(() => import("@/components/sections/AboutSection"));
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"));
const ProjectContactStackSection = dynamic(
  () => import("@/components/sections/ProjectContactStackSection")
);
const RecentNotesSection = dynamic(() => import("@/components/sections/RecentNotesSection"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yohan Christazel Jeffry",
  url: "https://christazel.vercel.app",
  image: "https://christazel.vercel.app/asset/profile_800.webp",
  jobTitle: "Fullstack Developer",
  sameAs: [
    "https://github.com/Christazel",
    "https://www.linkedin.com/in/yohan-christazel-jeffry",
  ],
  knowsAbout: ["Next.js", "Fullstack Development", "API Development", "UI/UX", "Mobile"],
};

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="portfolio-scroll-stage flex-1">
        <HeroSection />

        <div className="content-cover">
          <div className="container-page">
            <AboutSection />
            <SkillsSection />
            <ProjectContactStackSection />
            <RecentNotesSection />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
