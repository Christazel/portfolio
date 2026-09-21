import HeroSection from "@/components/sections/HeroSection";
import Footer from "@/components/sections/Footer";

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

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-neutral-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
