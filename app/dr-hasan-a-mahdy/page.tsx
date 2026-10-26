import type { Metadata } from "next";
import { getById, seoMetadata } from "@/lib/content";
import { clinic } from "@/content/site";
import { BookingCard, BreadcrumbSchema, PageHero, Prose } from "@/components/page/PageParts";
import { GoldButton } from "@/components/ui";
import Doctors from "@/components/home/Doctors";
import { Videos } from "@/components/home/Media";

const DOCTOR_ID = 2098;

export function generateMetadata(): Metadata {
  const page = getById(DOCTOR_ID);
  return page ? seoMetadata(page) : { title: "Dr. Hasan A. Mahdy" };
}

const facts = [
  ["1990", "Faculty of Dentistry, Damascus University"],
  ["2013", "Founded Bright Way Dental Clinic in Dubai"],
  ["DHA", "Licensed Dental Implant Specialist & General Dentist"],
  ["AACD", "Member, American Academy of Cosmetic Dentistry"],
];

export default function DoctorPage() {
  const page = getById(DOCTOR_ID);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Dr. Hasan Abdullah Mahdy",
    image: `${clinic.url}/images/dr-hasan.jpg`,
    url: `${clinic.url}/dr-hasan-a-mahdy/`,
    medicalSpecialty: ["Cosmetic dentistry", "Dental implants", "Oral surgery"],
    worksFor: { "@id": `${clinic.url}/#clinic` },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbSchema items={[{ name: "Dr. Hasan A. Mahdy", path: "/dr-hasan-a-mahdy/" }]} />
      <PageHero
        eyebrow="Founder · Bright Way Dental Clinic"
        title="Meet Dr. Hasan Abdullah Mahdy"
        intro="“Your smile is your signature; let us craft it to perfection.”"
        crumbs={[{ label: "Our doctors", href: "/#doctors" }, { label: "Dr. Hasan A. Mahdy" }]}
        image="/images/dr-hasan.jpg"
        imageAlt="Dr. Hasan A. Mahdy, cosmetic dentist and implant specialist in Dubai"
      >
        <GoldButton href="/contact-us/">Book with Dr. Hasan</GoldButton>
      </PageHero>

      <section className="bg-white">
        <dl className="mx-auto grid max-w-7xl gap-px overflow-hidden px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(([value, label]) => (
            <div key={label} className="border-l-2 border-gold px-6 py-2">
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-5xl font-semibold text-gold-dark">{value}</dd>
              <dd className="mt-1 text-sm font-semibold text-brown-dark">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {page && (
        <section className="bg-cream py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_340px]">
            <Prose html={page.html} />
            <BookingCard title="Book a consultation with Dr. Hasan" />
          </div>
        </section>
      )}
      <Videos />
      <Doctors />
    </>
  );
}
