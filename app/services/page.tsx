import type { Metadata } from "next";
import { services, topServiceHrefs } from "@/content/home";
import { clinic } from "@/content/site";
import { BreadcrumbSchema } from "@/components/page/PageParts";
import ServicesCta from "@/components/services/ServicesCta";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";

// New page (no WordPress original): all 11 treatments. The old /category/portfolio-item-en/ archive 301s here.
export const metadata: Metadata = {
  title: "Dental Services in Dubai | Bright Way Dental Clinic",
  description:
    "Dental implants, veneers, orthodontics, teeth whitening and more — all 11 treatments at Bright Way Dental Clinic in Al Garhoud, Dubai, with digital dentistry and DHA-licensed dentists.",
  alternates: { canonical: "/services/" },
  openGraph: { title: "Dental Services in Dubai | Bright Way Dental Clinic", url: "/services/", images: ["/images/services/approved/dental-implants-real.webp"] },
};

export default function ServicesPage() {
  // most requested first, then the rest in their usual order
  const ordered = [...topServiceHrefs.map((href) => services.find((s) => s.href === href)!), ...services.filter((s) => !topServiceHrefs.includes(s.href))];
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dental services at Bright Way Dental Clinic",
    itemListElement: ordered.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title, url: `${clinic.url}${s.href}` })),
  };

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Services", path: "/services/" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <ServicesHero />

      <ServicesGrid services={ordered} />
      <ServicesCta />
    </>
  );
}
