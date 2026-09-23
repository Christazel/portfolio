import type { Metadata } from "next";
import ProjectGrid from "@/components/sections/ProjectGrid";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "My Work",
  description:
    "A collection of works and projects built by Yohan Christazel Jeffry — Rooma Ceritarasa, Sistem Magang, and more.",
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
