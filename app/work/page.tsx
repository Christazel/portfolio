import type { Metadata } from "next";
import ProjectGrid from "@/components/sections/ProjectGrid";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "My Work",
  description:
    "A collection of works and projects built by Yohan Christazel Jeffry — Rooma Ceritarasa, Sistem Magang, and more.",
  openGraph: {
    title: "My Work | Yohan Christazel Jeffry",
    description:
      "A collection of works and projects built by Yohan Christazel Jeffry — Rooma Ceritarasa, Sistem Magang, and more.",
    url: "https://christazel.vercel.app/work",
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
    title: "My Work | Yohan Christazel Jeffry",
    description:
      "A collection of works and projects built by Yohan Christazel Jeffry — Rooma Ceritarasa, Sistem Magang, and more.",
    images: ["https://christazel.vercel.app/asset/profile_800.webp"],
  },
  alternates: {
    canonical: "https://christazel.vercel.app/work",
  },
};

export default function WorkPage() {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 bg-white dark:bg-black text-neutral-900 dark:text-neutral-100">
      <main className="flex-1">
        <div className="page-content pt-28 md:pt-32">
          <ProjectGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}
