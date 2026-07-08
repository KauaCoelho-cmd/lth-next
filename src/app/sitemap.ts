import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hunterx.site";

  return [
    {
      url: base,
      lastModified: new Date("2026-07-08"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/download`,
      lastModified: new Date("2026-07-08"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/fases`,
      lastModified: new Date("2026-07-08"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/privacidade`,
      lastModified: new Date("2026-07-08"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${base}/sitescope`,
      lastModified: new Date("2026-07-08"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
