import type { MetadataRoute } from "next";
import { entriesByLang, languageLinks } from "@/lib/content";
import { arPathOf } from "@/lib/i18n-data";

const SITE = "https://brightway.clinic";

// Same URLs as the old Yoast sitemaps (plan Phase 4 SEO), English and Arabic. Old /sitemap_index.xml etc. 301 here (middleware).
// Pages that are new on this site (no WordPress entry)
const NEW_PAGES = [
  { path: "/services/", lastModified: "2026-10-26" },
  { path: "/privacy-policy/", lastModified: "2026-11-04" },
];
// Pages kept on the site but hidden for now (Osama, 2026-11-04); they also carry a noindex tag
const HIDDEN_PATHS = new Set(["/transform-your-smile/", "/transform-your-smile-typ/"]);
const hiddenAr = new Set([...HIDDEN_PATHS].map((p) => arPathOf(p)));

// English ↔ Arabic pairs in the sitemap too (same pairs as the pages' hreflang tags)
function alternates(path: string) {
  const links = languageLinks(path);
  return links ? { languages: Object.fromEntries(Object.entries(links).map(([lang, href]) => [lang, `${SITE}${href.startsWith("/ar/") ? href : encodeURI(href)}`])) } : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = (lang: "en" | "ar") =>
    entriesByLang(lang)
      .filter((e) => e.seo.robots?.index !== "noindex" && !HIDDEN_PATHS.has(e.path) && !hiddenAr.has(e.path))
      .map((e) => ({
        url: `${SITE}${encodeURI(e.path)}`,
        lastModified: e.modified || e.date,
        priority: e.path === "/" || e.path === "/ar/" ? 1 : e.kind === "post" ? 0.6 : 0.8,
        alternates: alternates(e.path),
      }));
  const extra = NEW_PAGES.flatMap((p) => {
    const ar = arPathOf(p.path);
    return [p.path, ...(ar ? [ar] : [])].map((path) => ({ url: `${SITE}${encodeURI(path)}`, lastModified: p.lastModified, priority: 0.9, alternates: alternates(path) }));
  });
  return [...pages("en"), ...pages("ar"), ...extra];
}
