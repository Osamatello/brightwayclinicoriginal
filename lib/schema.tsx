import { clinic } from "@/content/site";
import { googleReviews, services } from "@/content/home";
import { getLang, l, t } from "@/lib/i18n";

// Structured data (schema.org JSON-LD) for Google. The clinic is a schema.org `Dentist` (a dental practice); "DentalClinic", used by the old site, is not a schema.org type.
// Every page carries the clinic and the website (site-wide graph); pages add their own parts and point to the clinic by its @id.

export const CLINIC_ID = `${clinic.url}/#clinic`;
export const WEBSITE_ID = `${clinic.url}/#website`;
/** Dr. Hasan's Person node lives on his page; the clinic points to it as its dentist. */
export const DOCTOR_ID = `${clinic.url}/dr-hasan-a-mahdy/#person`;

/** Text for structured data in the page's language, without the invisible direction marks used on screen. */
export const ldText = (value: string) => t(value).replace(/[\u2066-\u2069\u200e\u200f]/g, "");

/** Full address of a page in the page's language. */
export const ldUrl = (path: string) => `${clinic.url}${encodeURI(decodeURI(l(path)))}`;

const DIRECTION_MARKS = /[⁦-⁩‎‏]/g;
const ENTITIES: Record<string, string> = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };
const plain = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, code: string) =>
      code[0] === "#" ? String.fromCodePoint(parseInt(code.slice(code[1] === "x" ? 2 : 1), code[1] === "x" ? 16 : 10)) : ENTITIES[code.toLowerCase()] ?? m,
    )
    .replace(DIRECTION_MARKS, "")
    .replace(/\s+/g, " ")
    .trim();

/**
 * FAQPage data from an article's own question headings ("What Are Dental Implants?", "ما هو فينير الأسنان؟") and the text under each,
 * so answer engines can quote them. Uses only text already on the page; null when the article has no question headings.
 */
export function faqFromHtml(html: string) {
  const parts = html.split(/(<h[2-4][^>]*>[\s\S]*?<\/h[2-4]>)/i);
  const qa: { "@type": "Question"; name: string; acceptedAnswer: { "@type": "Answer"; text: string } }[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    const question = plain(parts[i]).replace(/^[^\p{L}\p{N}]+/u, "").replace(/\s+([?؟])$/, "$1");
    const answer = plain(parts[i + 1] ?? "");
    const callToAction = /^(are you )?ready\b|^هل (أنت|انت) (مستعد|جاهز)/i.test(question); // "Ready to restore your smile?" is a booking prompt, not a question
    if (/[?؟]$/.test(question) && !callToAction && answer.length >= 40) qa.push({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } });
  }
  return qa.length ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: qa } : null;
}

export function JsonLd({ data }: { data: object }) {
  // "<" escaped so text inside the data can never close the script tag
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** The clinic: name, phone and hours as on its Google Business Profile (checked 2026-11-06); address in the clinic's own wording, same as shown on the site (Osama, 2026-11-06). */
export function SiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Dentist",
        "@id": CLINIC_ID,
        name: clinic.name,
        alternateName: "عيادة برايت واي لطب الأسنان",
        url: `${clinic.url}/`,
        logo: `${clinic.url}/images/logo.png`,
        image: [`${clinic.url}/images/hero-bg.jpg`, `${clinic.url}/images/logo.png`],
        telephone: clinic.phone,
        email: clinic.email,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Al Garhoud, Ithraa Tower, Office 802",
          addressLocality: "Dubai",
          addressRegion: "Dubai",
          addressCountry: "AE",
        },
        geo: { "@type": "GeoCoordinates", latitude: clinic.geo.lat, longitude: clinic.geo.lng },
        hasMap: googleReviews.url,
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], opens: "11:00", closes: "20:00" },
        ],
        sameAs: Object.values(clinic.social),
        medicalSpecialty: "https://schema.org/Dentistry",
        areaServed: { "@type": "City", name: "Dubai" },
        contactPoint: { "@type": "ContactPoint", contactType: "customer service", telephone: clinic.phone, email: clinic.email, availableLanguage: ["English", "Arabic"] },
        employee: { "@id": DOCTOR_ID },
        // the treatments the site offers, by their page names, so answer engines can match "who does X in Dubai"
        knowsAbout: services.map((s) => ldText(s.title)),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: ldText("Services"),
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "MedicalProcedure", name: ldText(s.title), url: ldUrl(s.href) },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: clinic.name,
        url: `${clinic.url}/`,
        inLanguage: getLang() === "ar" ? "ar" : "en",
        publisher: { "@id": CLINIC_ID },
      },
    ],
  };
  return <JsonLd data={data} />;
}
