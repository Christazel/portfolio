import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/HeroSection";
import PortfolioNavbar from "@/components/sections/PortfolioNavbar";
import ProjectContactStackSection from "@/components/sections/ProjectContactStackSection";
import SkillsSection from "@/components/sections/SkillsSection";

export default function Page() {
  return (
    <div className="min-h-screen">
      <PortfolioNavbar />

      <main className="container-page">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectContactStackSection />
      </main>

      <Footer />
    </div>
  );
}
