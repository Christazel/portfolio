import type { MetadataRoute } from "next";
import { projects } from "@/app/data/homeData";

const siteUrl = "https://christazel.vercel.app";

// Static dates reflecting actual last content update per route (ISO 8601 YYYY-MM-DD).
// This prevents search engines from treating unchanged pages as dynamically modified on every crawl.
const LAST_UPDATED = {
  home: "2026-11-12",
  about: "2026-11-12",
  work: "2026-11-12",
  certificates: "2026-11-12",
  contact: "2026-11-12",
  projects: "2026-11-12",
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
