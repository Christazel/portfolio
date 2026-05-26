import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/HeroSection";
import PortfolioNavbar from "@/components/sections/PortfolioNavbar";
import ProjectContactStackSection from "@/components/sections/ProjectContactStackSection";
import RecentNotesSection from "@/components/sections/RecentNotesSection";
import SkillsSection from "@/components/sections/SkillsSection";

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
