import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import RecentNotesSection from "@/components/sections/RecentNotesSection";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Yohan Christazel Jeffry — available for freelance projects, internships, and collaborations.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-neutral-100">
      <main className="flex-1">
        <div className="page-content pt-28 md:pt-32">
          <ContactSection />
          <RecentNotesSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
