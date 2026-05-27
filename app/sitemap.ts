import type { MetadataRoute } from "next";

const siteUrl = "https://christazel.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [""];

  return [
    ...routes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date("2026-05-27T00:00:00+07:00"),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
  ];
}
