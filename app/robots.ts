import type { MetadataRoute } from "next";

// Same rule as the old site (Disallow /wp-admin/), new sitemap URL.
// Crawling stays allowed on the preview so Google can see the noindex header (next.config.ts).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/wp-admin/" },
    sitemap: "https://brightway.clinic/sitemap.xml",
  };
}
