import type { MetadataRoute } from "next";
import { entriesByLang } from "@/lib/content";

const SITE = "https://brightway.clinic";

// Same URLs as the old Yoast sitemaps (plan Phase 4 SEO). Old /sitemap_index.xml etc. 301 here (middleware).
// TODO(Arabic): add entriesByLang("ar") once the /ar/ pages are built.
export default function sitemap(): MetadataRoute.Sitemap {
  return entriesByLang("en")
    .filter((e) => e.seo.robots?.index !== "noindex")
    .map((e) => ({
      url: `${SITE}${e.path}`,
      lastModified: e.modified || e.date,
      priority: e.path === "/" ? 1 : e.kind === "post" ? 0.6 : 0.8,
    }));
}
