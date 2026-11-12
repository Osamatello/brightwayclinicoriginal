import map from "@/content/redirects.json";
import { arPathOf } from "@/lib/i18n-data";

// Links inside the old WordPress articles (Osama's OK, 2026-11-12). No words are added or changed:
// 1. links to old addresses (/home/, /portfolio-item-en/…, /blog-ar/…) point straight to the new page instead of going through a redirect
// 2. the first mention of a treatment or topic in an article's text links to its page (once per page linked, at most 6 per article)

const redirects = map.redirects as Record<string, string>;
// same old permalink bases the middleware redirects
const WP_BASES: [string, string][] = [
  ["/portfolio-item-en/", "/"],
  ["/blog-en/", "/"],
  ["/portfolio-item/", "/ar/"],
  ["/blog-ar/", "/ar/"],
];
const href = (path: string) => encodeURI(decodeURI(path));

function newAddress(oldPath: string): string | undefined {
  let p = oldPath;
  try {
    p = decodeURI(oldPath);
  } catch {}
  const bare = p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  if (bare === "/home") return "/";
  if (redirects[bare]) return redirects[bare];
  for (const [base, to] of WP_BASES) {
    if (p.startsWith(base) && p.length > base.length) {
      const moved = `${to}${p.slice(base.length)}`;
      return newAddress(moved.endsWith("/") ? moved : `${moved}/`) ?? href(moved.endsWith("/") ? moved : `${moved}/`);
    }
  }
  return undefined;
}

/** 1. Old internal links → their new address (same link text). */
function directLinks(html: string) {
  return html.replace(/href="(?:https?:\/\/(?:www\.)?brightway\.clinic)?(\/[^"#?]*)([^"]*)"/g, (whole, path: string, rest: string) => {
    const to = newAddress(path);
    return to ? `href="${to}${rest}"` : whole;
  });
}

// English page → words already in the articles that name it (longest first). Treatments come first, then the articles and pages
// that cover one topic in depth; each page's Arabic twin gets the Arabic words.
const TARGETS: { en: string; words: string[]; arWords: string[] }[] = [
  // treatments
  { en: "/dentalimplants-en/", words: ["digital dental implants", "dental implants", "dental implant"], arWords: ["زراعة الأسنان", "زراعة الاسنان", "زرعات الأسنان"] },
  { en: "/veneer-en/", words: ["dental veneers", "porcelain veneers", "composite veneers", "veneers"], arWords: ["فينير الأسنان", "فينير الاسنان", "قشور البورسلين", "الفينير"] },
  { en: "/teeth-whitening/", words: ["professional teeth whitening", "teeth whitening", "tooth whitening"], arWords: ["تبييض الأسنان", "تبييض الاسنان"] },
  { en: "/root-canal-treatment/", words: ["root canal treatment", "root canal therapy", "endodontic treatment", "root canal"], arWords: ["علاج قناة الجذر", "علاج الجذور", "المعالجة اللبية", "العلاج اللبي"] },
  { en: "/orthodontics-en/", words: ["orthodontic treatment", "orthodontics", "braces"], arWords: ["تقويم الأسنان", "تقويم الاسنان"] },
  { en: "/teeth-cleaning-and-gum-treatment/", words: ["teeth cleaning", "gum treatment", "gum disease", "scaling and polishing"], arWords: ["تنظيف الأسنان", "تنظيف الاسنان", "علاج اللثة", "أمراض اللثة"] },
  { en: "/tooth-extraction/", words: ["tooth extraction", "teeth extraction", "tooth removal"], arWords: ["قلع الأسنان", "خلع الأسنان", "قلع الضرس", "خلع الضرس"] },
  { en: "/oral-surgery/", words: ["oral surgery", "wisdom teeth", "wisdom tooth"], arWords: ["جراحة الفم", "الجراحة الفموية", "ضرس العقل", "أضراس العقل"] },
  { en: "/cosmetic-dentistry/", words: ["cosmetic dentistry", "smile makeover"], arWords: ["طب الأسنان التجميلي", "تجميل الأسنان"] },
  { en: "/pediatric-dentistry/", words: ["pediatric dentistry", "pediatric dentist", "children’s teeth", "children's teeth"], arWords: ["طب أسنان الأطفال", "أسنان الأطفال"] },
  { en: "/prosthodontics/", words: ["prosthodontics", "dental crowns", "dental bridges", "crowns and bridges"], arWords: ["التعويضات السنية", "تركيبات الأسنان", "التيجان والجسور"] },
  // articles and pages on one topic
  { en: "/dr-hasan-a-mahdy/", words: ["Dr. Hasan Abdullah Mahdy", "Dr. Hasan A. Mahdy", "Dr. Hasan"], arWords: ["د. حسن عبدالله مهدي", "د. حسن مهدي", "الدكتور حسن"] },
  { en: "/smile-gallery/", words: ["before and after"], arWords: ["قبل وبعد"] },
  { en: "/how-digital-smile-design-can-transform-your-smile/", words: ["digital smile design"], arWords: ["تصميم الابتسامة الرقمي", "التصميم الرقمي للابتسامة"] },
  { en: "/understanding-the-use-of-porcelain-veneers-to-achieve-a-hollywood-smile/", words: ["Hollywood smile"], arWords: ["ابتسامة هوليود", "ابتسامة هوليوود"] },
  { en: "/metal-braces-or-clear-aligners-which-is-best-for-your-needs/", words: ["clear aligners", "Invisalign"], arWords: ["التقويم الشفاف", "المصففات الشفافة", "إنفزلاين", "انفزلاين"] },
  { en: "/taking-care-clear-aligners-practical-steps/", words: ["aligner care", "caring for your aligners", "clean your aligners"], arWords: ["العناية بالتقويم الشفاف", "تنظيف التقويم الشفاف"] },
  { en: "/can-smokers-get-dental-implants-learn-about-the-impact-of-smoking-on-implant-success-rate/", words: ["smokers", "smoking"], arWords: ["المدخنين", "التدخين"] },
  { en: "/dental-implants-and-dentures-which-option-is-right-for-you/", words: ["dentures"], arWords: ["أطقم الأسنان", "طقم الأسنان"] },
  { en: "/how-can-you-tell-if-that-tooth-pain-is-a-cavity/", words: ["tooth decay", "cavities", "cavity"], arWords: ["تسوس الأسنان", "التسوس"] },
  { en: "/temporomandibular-joint-tmj-pain-causes-symptoms-and-treatment/", words: ["temporomandibular joint", "TMJ", "jaw pain"], arWords: ["المفصل الفكي الصدغي", "الفك الصدغي", "ألم الفك"] },
  { en: "/how-to-brush-your-toddlers-teeth-the-right-way/", words: ["toddlers", "toddler"], arWords: ["أسنان طفلك"] },
  { en: "/best-dental-implant-materials-quality/", words: ["titanium", "zirconia"], arWords: ["التيتانيوم", "الزركونيا"] },
  { en: "/3d-printed-dental-implantsrevolutionizing-dental-care/", words: ["3D printing", "3D-printed", "3D printed"], arWords: ["الطباعة ثلاثية الأبعاد"] },
  { en: "/advancements-in-ai-driven-diagnostics-transforming-dental-care/", words: ["artificial intelligence", "AI-driven", "AI diagnostics"], arWords: ["الذكاء الاصطناعي"] },
  { en: "/maintaining-your-dental-implants-tips-for-long-term-success/", words: ["implant care", "caring for your implants", "maintain your implants"], arWords: ["العناية بزراعة الأسنان", "العناية بالزرعات"] },
  { en: "/what-colour-lipstick-makes-your-teeth-look-whiter/", words: ["lipstick"], arWords: ["أحمر الشفاه"] },
];
const MAX_PER_ARTICLE = 6;
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const wordsRe = (words: string[], lang: "en" | "ar") =>
  // English: whole words, any case · Arabic: not glued to another Arabic letter (و / ب / ال prefixes are left alone)
  new RegExp(lang === "ar" ? `(?<![\\u0600-\\u06FF])(${words.map(escape).join("|")})(?![\\u0600-\\u06FF])` : `\\b(${words.map(escape).join("|")})\\b`, lang === "ar" ? "" : "i");

/** Wraps the first match of each target (in paragraphs and lists only; never in headings or existing links) in that target's link tag. */
function linkFirstMentions(html: string, targets: { open: string; re: RegExp }[], max: number) {
  const left = targets.map((t) => ({ ...t, used: false }));
  let added = 0;
  let inLink = 0;
  let inHeading = 0;
  let inText = 0;
  return html
    .split(/(<[^>]+>)/)
    .map((part, i) => {
      if (i % 2) {
        const tag = part.match(/^<(\/?)([a-z0-9]+)/i);
        if (tag) {
          const step = tag[1] ? -1 : 1;
          const name = tag[2].toLowerCase();
          if (name === "a") inLink = Math.max(0, inLink + step);
          else if (/^h[1-6]$/.test(name)) inHeading = Math.max(0, inHeading + step);
          else if (name === "p" || name === "li") inText = Math.max(0, inText + step);
        }
        return part;
      }
      if (!inText || inLink || inHeading || added >= max) return part;
      let text = part;
      // the same text with links added here blanked out, so a later word never matches inside one of them
      let free = part;
      for (const t of left) {
        if (added >= max) break;
        if (t.used) continue;
        const m = free.match(t.re);
        if (!m || m.index === undefined) continue;
        const link = `${t.open}${text.slice(m.index, m.index + m[0].length)}</a>`;
        text = `${text.slice(0, m.index)}${link}${text.slice(m.index + m[0].length)}`;
        free = `${free.slice(0, m.index)}${"\u0000".repeat(link.length)}${free.slice(m.index + m[0].length)}`;
        t.used = true; // once per linked page
        added++;
      }
      return text;
    })
    .join("");
}

/** 2. First mention of each treatment or topic → link to its page (never to the page itself, nor to a page the article already links to). */
function treatmentLinks(html: string, lang: "en" | "ar", selfPath: string) {
  const self = decodeURI(selfPath);
  const targets = TARGETS.map((t) => ({ path: lang === "ar" ? arPathOf(t.en) : t.en, words: lang === "ar" ? t.arWords : t.words }))
    .filter((t): t is { path: string; words: string[] } => !!t.path && decodeURI(t.path) !== self)
    .filter((t) => !html.includes(`href="${href(t.path)}"`) && !html.includes(`href="${t.path}"`))
    .map((t) => ({ open: `<a href="${href(t.path)}">`, re: wordsRe(t.words, lang) }));
  return linkFirstMentions(html, targets, MAX_PER_ARTICLE);
}

// 3. Official bodies the articles already name → their own site, in a new tab (Osama's OK, 2026-11-12)
const OFFICIAL: { url: string; arUrl: string; words: string[]; arWords: string[] }[] = [
  { url: "https://www.dha.gov.ae/en", arUrl: "https://www.dha.gov.ae/ar", words: ["Dubai Health Authority", "DHA"], arWords: ["هيئة الصحة بدبي"] },
];
function officialLinks(html: string, lang: "en" | "ar") {
  const targets = OFFICIAL.map((o) => ({
    open: `<a href="${lang === "ar" ? o.arUrl : o.url}" target="_blank" rel="noopener">`,
    re: wordsRe(lang === "ar" ? o.arWords : o.words, lang),
  }));
  return linkFirstMentions(html, targets, targets.length);
}

/** All link fixes for one article. */
export function improveLinks(html: string, lang: "en" | "ar", path: string) {
  return officialLinks(treatmentLinks(directLinks(html), lang, path), lang);
}
