import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/control-8faz", "/api/"],
    },
    sitemap: "https://hunterx.site/sitemap.xml",
  };
}
