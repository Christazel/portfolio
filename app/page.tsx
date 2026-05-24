import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import PortfolioNavbar from "@/components/sections/PortfolioNavbar";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";

export default function Page() {
  return (
    <div className="min-h-screen">
      <PortfolioNavbar />

      <main className="container-page">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />

        <div className="h-12" />
      </main>
    </div>
  );
}
