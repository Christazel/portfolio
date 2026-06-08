import type { MetadataRoute } from "next";

const siteUrl = "https://christazel.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-06-08"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
