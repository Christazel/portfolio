import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import RecentNotesSection from "@/components/sections/RecentNotesSection";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Yohan Christazel Jeffry — available for freelance projects, internships, and collaborations.",
  openGraph: {
    title: "Contact | Yohan Christazel Jeffry",
    description:
      "Get in touch with Yohan Christazel Jeffry — available for freelance projects, internships, and collaborations.",
    url: "https://christazel.vercel.app/contact",
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
    title: "Contact | Yohan Christazel Jeffry",
    description:
      "Get in touch with Yohan Christazel Jeffry — available for freelance projects, internships, and collaborations.",
    images: ["https://christazel.vercel.app/asset/profile_800.webp"],
  },
  alternates: {
    canonical: "https://christazel.vercel.app/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 bg-white dark:bg-black text-neutral-900 dark:text-neutral-100">
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
