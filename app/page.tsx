import HeroSection from "@/components/sections/HeroSection";
import PortfolioNavbar from "@/components/sections/PortfolioNavbar";
import dynamic from "next/dynamic";

const AboutSection = dynamic(() => import("@/components/sections/AboutSection"));
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"));
const ProjectContactStackSection = dynamic(
  () => import("@/components/sections/ProjectContactStackSection")
);
const RecentNotesSection = dynamic(() => import("@/components/sections/RecentNotesSection"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <PortfolioNavbar />

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
