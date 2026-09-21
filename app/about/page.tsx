import type { Metadata } from "next";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceEducationSection from "@/components/sections/ExperienceEducationSection";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Yohan Christazel Jeffry — an Informatics student and Fullstack Developer from Yogyakarta, Indonesia.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-neutral-100">
      <main className="flex-1">
        <div className="page-content pt-28 md:pt-32">
          <AboutSection />
          <SkillsSection />
          <ExperienceEducationSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
