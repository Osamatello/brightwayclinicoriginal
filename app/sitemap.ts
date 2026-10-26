import type { MetadataRoute } from "next";
import { entriesByLang } from "@/lib/content";

const SITE = "https://brightway.clinic";

// Same URLs as the old Yoast sitemaps (plan Phase 4 SEO). Old /sitemap_index.xml etc. 301 here (middleware).
// TODO(Arabic): add entriesByLang("ar") once the /ar/ pages are built.
// Pages that are new on this site (no WordPress entry)
const NEW_PAGES = [{ path: "/services/", lastModified: "2026-10-26" }];

export default function sitemap(): MetadataRoute.Sitemap {
  const old = entriesByLang("en")
    .filter((e) => e.seo.robots?.index !== "noindex")
    .map((e) => ({
      url: `${SITE}${e.path}`,
      lastModified: e.modified || e.date,
      priority: e.path === "/" ? 1 : e.kind === "post" ? 0.6 : 0.8,
    }));
  return [...old, ...NEW_PAGES.map((p) => ({ url: `${SITE}${p.path}`, lastModified: p.lastModified, priority: 0.9 }))];
}
