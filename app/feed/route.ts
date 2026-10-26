import { postsEn } from "@/lib/content";
import { clinic } from "@/content/site";

// RSS feed at the old WordPress address /feed/ (latest blog posts). TODO(Arabic): /ar/feed/ once the Arabic posts exist.
export const dynamic = "force-static";

const xml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const posts = postsEn().sort((a, b) => b.date.localeCompare(a.date));
  const items = posts
    .map(
      (p) => `    <item>
      <title>${xml(p.title)}</title>
      <link>${clinic.url}${p.path}</link>
      <guid isPermaLink="true">${clinic.url}${p.path}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${xml(p.seo.description || p.excerpt)}</description>
    </item>`,
    )
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(clinic.name)} Blog</title>
    <link>${clinic.url}/blog/</link>
    <atom:link href="${clinic.url}/feed/" rel="self" type="application/rss+xml" />
    <description>Dental tips and digital dentistry insights from ${xml(clinic.name)} in Dubai.</description>
    <language>en</language>
    <lastBuildDate>${new Date(posts[0]?.modified || posts[0]?.date || Date.now()).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(body, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
