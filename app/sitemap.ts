import type { MetadataRoute } from "next";
import { projects } from "@/app/data/homeData";

const siteUrl = "https://christazel.vercel.app";

// Use static dates reflecting actual last content update per route.
// Update these dates whenever the corresponding page content changes significantly.
const LAST_UPDATED = {
  home: "2026-11-05",
  about: "2026-11-05",
  work: "2026-11-05",
  certificates: "2026-11-05",
  contact: "2026-11-05",
  projects: "2026-11-05",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: LAST_UPDATED.home,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: LAST_UPDATED.about,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: LAST_UPDATED.work,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/certificates`,
      lastModified: LAST_UPDATED.certificates,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: LAST_UPDATED.contact,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: LAST_UPDATED.projects,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
