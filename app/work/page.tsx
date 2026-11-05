import type { Metadata } from "next";
import ProjectGrid from "@/components/sections/ProjectGrid";
import Footer from "@/components/sections/Footer";
import { projects } from "@/app/data/homeData";

const siteUrl = "https://christazel.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Portfolio Projects — Yohan Christazel Jeffry",
  description:
    "A collection of web development projects built by Yohan Christazel Jeffry, Freelance Full Stack Web Developer.",
  url: `${siteUrl}/work`,
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: project.title,
      description: project.desc,
      url: `${siteUrl}/projects/${project.slug}`,
      image: `${siteUrl}${project.image}`,
      creator: {
        "@type": "Person",
        name: "Yohan Christazel Jeffry",
      },
      dateCreated: project.year,
      keywords: project.tech.join(", "),
    },
  })),
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="flex-1">
        <div className="page-content pt-28 md:pt-32">
          <ProjectGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}
