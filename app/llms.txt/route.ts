import { entriesByLang, getByPath, postsEn } from "@/lib/content";
import { clinic } from "@/content/site";
import { googleReviews, services } from "@/content/home";

// /llms.txt (llmstxt.org): a plain-text map of the site for AI assistants (ChatGPT, Perplexity, Claude, Gemini).
// Built only from facts and page texts already on the site, so it stays in step with the pages.
export const dynamic = "force-static";

const url = (path: string) => `${clinic.url}${encodeURI(decodeURI(path))}`;
const line = (title: string, path: string, note?: string) => `- [${title}](${url(path)})${note ? `: ${note}` : ""}`;
const HIDDEN = /transform-your-smile|-typ\/$/;

export function GET() {
  const home = getByPath("/");
  const arServices = entriesByLang("ar").filter((e) => e.kind === "service" && !HIDDEN.test(decodeURI(e.path)));
  const arPosts = entriesByLang("ar").filter((e) => e.kind === "post" && !HIDDEN.test(decodeURI(e.path)));
  const posts = postsEn().filter((p) => !HIDDEN.test(p.path));

  const text = `# ${clinic.name}

> ${home?.seo.description ?? ""}

- Dental clinic in Dubai, United Arab Emirates (Arabic name: عيادة برايت واي لطب الأسنان)
- Address: ${clinic.address}
- Phone: ${clinic.phoneDisplay} (mobile, WhatsApp: ${clinic.whatsapp}) · ${clinic.landlineDisplay} (landline)
- Email: ${clinic.email}
- Opening hours: ${clinic.hours}
- Lead dentist: Dr. Hasan Abdullah Mahdy, cosmetic dentist and oral surgeon (${url("/dr-hasan-a-mahdy/")})
- Google rating: ${googleReviews.rating} from ${googleReviews.count} reviews (${googleReviews.url})
- Languages: English (${clinic.url}/) and Arabic (${clinic.url}/ar/)

## Treatments
${services.map((s) => line(s.title, s.href, s.text)).join("\n")}

## Clinic
${line("About the clinic", "/about/")}
${line("Dr. Hasan A. Mahdy", "/dr-hasan-a-mahdy/")}
${line("Smile Gallery (before and after)", "/smile-gallery/")}
${line("Contact us and booking", "/contact-us/")}
${line("Personalized dental implant cost", "/personalized-dental-implant-cost/")}
${line("Career", "/career/")}

## Articles
${posts.map((p) => line(p.title, p.path, p.seo.description)).join("\n")}

## Arabic treatments (العلاجات)
${arServices.map((e) => line(e.title, e.path)).join("\n")}

## Arabic articles (المقالات)
${arPosts.map((e) => line(e.title, e.path)).join("\n")}
`;
  return new Response(text, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
