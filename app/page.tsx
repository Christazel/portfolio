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

      <main className="container-page flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectContactStackSection />
        <RecentNotesSection />
      </main>

      <Footer />
    </div>
  );
}
