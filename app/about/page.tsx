import type { Metadata } from "next";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceEducationSection from "@/components/sections/ExperienceEducationSection";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Yohan Christazel Jeffry — a Freelance Full Stack Web Developer and Informatics graduate from Yogyakarta, Indonesia.",
  openGraph: {
    title: "About | Yohan Christazel Jeffry",
    description:
      "Learn about Yohan Christazel Jeffry — a Freelance Full Stack Web Developer and Informatics graduate from Yogyakarta, Indonesia.",
    url: "https://christazel.vercel.app/about",
    siteName: "Yohan Christazel Jeffry Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://christazel.vercel.app/asset/profile_800.webp",
        width: 800,
        height: 800,
        alt: "Yohan Christazel Jeffry portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Yohan Christazel Jeffry",
    description:
      "Learn about Yohan Christazel Jeffry — a Freelance Full Stack Web Developer and Informatics graduate from Yogyakarta, Indonesia.",
    images: ["https://christazel.vercel.app/asset/profile_800.webp"],
  },
  alternates: {
    canonical: "https://christazel.vercel.app/about",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 bg-white dark:bg-black text-neutral-900 dark:text-neutral-100">
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
