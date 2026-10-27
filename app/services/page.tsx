import Link from "next/link";
import type { Metadata } from "next";
import { services, topServiceHrefs } from "@/content/home";
import { clinic } from "@/content/site";
import { BreadcrumbSchema } from "@/components/page/PageParts";
import ServiceCard from "@/components/home/ServiceCard";
import Cta from "@/components/home/Cta";

// New page (no WordPress original): all 11 treatments. The old /category/portfolio-item-en/ archive 301s here.
export const metadata: Metadata = {
  title: "Dental Services in Dubai | Bright Way Dental Clinic",
  description:
    "Dental implants, veneers, orthodontics, teeth whitening and more — all 11 treatments at Bright Way Dental Clinic in Al Garhoud, Dubai, with digital dentistry and DHA-licensed dentists.",
  alternates: { canonical: "/services/" },
  openGraph: { title: "Dental Services in Dubai | Bright Way Dental Clinic", url: "/services/", images: ["/images/services/approved/dental-implants.webp"] },
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

      <section className="bg-white pb-24 pt-14 md:pt-20">
        <div className="mx-auto max-w-7xl px-5">
          <nav aria-label="Breadcrumb" className="text-xs text-ink">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-gold-dark">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-bold text-gold-dark">Services</li>
            </ol>
          </nav>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <h1 className="max-w-3xl font-display text-5xl font-medium leading-[0.95] text-brown-dark md:text-7xl">
              Our Dental Services <em className="whitespace-nowrap text-gold">in Dubai</em>
            </h1>
            <p className="max-w-md leading-relaxed">
              Eleven specialties under one roof in Al Garhoud — from routine cleaning to digital implants and complete smile makeovers, planned with digital dentistry by
              DHA-licensed dentists.
            </p>
          </div>

          <ul className="mt-14 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ordered.map((s, i) => (
              <li key={s.href}>
                <ServiceCard service={s} number={i + 1} sizes="(min-width: 1280px) 300px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Cta />
    </>
  );
}
