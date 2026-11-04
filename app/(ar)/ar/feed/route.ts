import { entriesByLang } from "@/lib/content";
import { clinic } from "@/content/site";

// RSS feed of the Arabic blog posts at the old WordPress address /ar/feed/
export const dynamic = "force-static";

const xml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const posts = entriesByLang("ar").filter((e) => e.kind === "post");
  const items = posts
    .map((p) => {
      const url = `${clinic.url}${encodeURI(p.path)}`;
      return `    <item>
      <title>${xml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${xml(p.seo.description || p.excerpt)}</description>
    </item>`;
    })
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>مدونة عيادة برايت واي لطب الأسنان</title>
    <link>${clinic.url}${encodeURI("/ar/المدونة/")}</link>
    <atom:link href="${clinic.url}/ar/feed/" rel="self" type="application/rss+xml" />
    <description>نصائح العناية بالأسنان وأحدث ما في طب الأسنان الرقمي من عيادة برايت واي لطب الأسنان في دبي.</description>
    <language>ar</language>
    <lastBuildDate>${new Date(posts[0]?.modified || posts[0]?.date || Date.now()).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(body, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
