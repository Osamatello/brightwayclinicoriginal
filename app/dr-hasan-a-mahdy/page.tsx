import type { Metadata } from "next";
import { getById, seoMetadata } from "@/lib/content";
import { clinic } from "@/content/site";
import { BreadcrumbSchema } from "@/components/page/PageParts";
import PostBody from "@/components/blog/PostBody";
import DoctorHero from "@/components/doctor/DoctorHero";
import DoctorTeam from "@/components/doctor/DoctorTeam";
import TreatmentCta from "@/components/treatment/TreatmentCta";
import { Videos } from "@/components/home/Media";

const DOCTOR_ID = 2098;

export function generateMetadata(): Metadata {
  const page = getById(DOCTOR_ID);
  return page ? seoMetadata(page) : { title: "Dr. Hasan A. Mahdy" };
}

/**
 * The old page's article only. What comes before it is now in DoctorHero (photo, quote, welcome line, intro);
 * what comes after it is now in DoctorTeam and TreatmentCta (the other two doctors, the call to action).
 */
function articleOnly(html: string) {
  const start = html.indexOf('<img src="/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-08-at-12.35.48');
  const end = html.indexOf('<img src="/wp-content/uploads/2024/03/254_1x.jpg"');
  const article = html.slice(Math.max(0, start), end > 0 ? end : undefined);
  // The photo sits under the first paragraph (Osama, 2026-11-04), not above the first heading
  const photo = article.match(/^<img\b[^>]*>\s*/)?.[0];
  if (!photo) return article;
  return article.slice(photo.length).replace("</p>", `</p>${photo}`);
}

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
      <DoctorHero />
      {page && <PostBody title={page.title} html={articleOnly(page.html)} bookingTitle="Book a consultation with Dr. Hasan" />}
      <DoctorTeam />
      <Videos />
      <TreatmentCta copy="Take the first step towards achieving your dream smile. Schedule your consultation with Dr. Hasan Abdullah Mahdy at Bright Way Dental Clinic in Dubai. We’re here to help you unlock the potential of your smile and enhance your overall dental health and well-being." />
    </>
  );
}
