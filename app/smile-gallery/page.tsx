import Image from "next/image";
import type { Metadata } from "next";
import { getById, seoMetadata } from "@/lib/content";
import { BreadcrumbSchema, PageHero } from "@/components/page/PageParts";
import BeforeAfter from "@/components/home/BeforeAfter";
import CareAndOffer from "@/components/home/CareAndOffer";
import Cta from "@/components/home/Cta";
import { Eyebrow, Heading } from "@/components/ui";

const GALLERY_ID = 617;

export function generateMetadata(): Metadata {
  const page = getById(GALLERY_ID);
  return page ? seoMetadata(page) : { title: "Smile Gallery" };
}

// Treatments shown on the current site's "Our Latest Smile Makeovers" strip
const makeovers = [
  { title: "Immediate Implant", text: "Quick replacement with implants during tooth extraction for minimal downtime.", img: "/images/smile-immediate-implant.jpg" },
  { title: "Invisalign", text: "Clear, custom aligners for discreet teeth straightening without traditional braces.", img: "/images/smile-invisalign.jpg" },
  { title: "Veneers", text: "Custom-ceramic covers for fixing discoloration, chips, or misalignment, enhancing smiles.", img: "/images/smile-veneers.jpg" },
  { title: "Teeth Whitening", text: "Safe, effective brightening of your natural tooth color for a radiant smile.", img: "/images/smile-whitening.jpg" },
  { title: "Crown and Bridges", text: "Prosthetic solutions to restore or replace damaged and missing teeth, ensuring a functional and aesthetic smile.", img: "/images/smile-crown-bridges.jpg" },
];

export default function SmileGalleryPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Smile Gallery", path: "/smile-gallery/" }]} />
      <PageHero
        eyebrow="Smile Gallery"
        title="Our Latest Smile Makeovers"
        intro="Real transformations from Bright Way Dental Clinic in Dubai — drag each photo to compare the smile before and after treatment."
        crumbs={[{ label: "Smile Gallery" }]}
      />
      <BeforeAfter />
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-5">
          <div className="max-w-2xl space-y-4">
            <Eyebrow>Explore top dental treatments</Eyebrow>
            <Heading lead="The treatments behind" accent="every new smile" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {makeovers.map((m) => (
              <article key={m.title} className="group rounded-[1.75rem] bg-white p-6 text-center shadow-[0_12px_40px_-24px_rgba(110,82,25,0.35)]">
                <div className="arch relative mx-auto aspect-square w-full max-w-[180px] overflow-hidden bg-gold-soft">
                  <Image src={m.img} alt={`${m.title} treatment illustration`} fill sizes="200px" className="object-contain p-4 transition duration-500 group-hover:scale-110" />
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-brown-dark">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{m.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CareAndOffer />
      <Cta />
    </>
  );
}
