import { clinic } from "@/content/site";
import { googleReviews } from "@/content/home";
import { getLang, l, t } from "@/lib/i18n";

// Structured data (schema.org JSON-LD) for Google. Every page carries the clinic and the website (site-wide graph);
// pages add their own parts and point to the clinic by its @id.

export const CLINIC_ID = `${clinic.url}/#clinic`;
export const WEBSITE_ID = `${clinic.url}/#website`;

/** Text for structured data in the page's language, without the invisible direction marks used on screen. */
export const ldText = (value: string) => t(value).replace(/[⁦-⁩‎‏]/g, "");

/** Full address of a page in the page's language. */
export const ldUrl = (path: string) => `${clinic.url}${encodeURI(decodeURI(l(path)))}`;

export function JsonLd({ data }: { data: object }) {
  // "<" escaped so text inside the data can never close the script tag
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** The clinic exactly as on its Google Business Profile (name, address, phone, hours checked 2026-11-06). */
export function SiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DentalClinic",
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
          streetAddress: "Sheikh Rashid Road 13, Ithra Tower, 8 Floor, Office 802",
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
