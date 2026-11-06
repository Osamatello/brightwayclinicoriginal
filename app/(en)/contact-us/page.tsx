import type { Metadata } from "next";
import { getById, seoMetadata } from "@/lib/content";
import { contactFaqs } from "@/content/contact";
import { ldText } from "@/lib/schema";
import { BreadcrumbSchema } from "@/components/page/PageParts";
import ContactHero from "@/components/contact/ContactHero";
import Contact from "@/components/home/Contact";
import Faq from "@/components/home/Faq";

const CONTACT_ID = 622;
const OLD_SHARE_IMAGE = "/images/share-default.jpg"; // clinic photo for link previews (the old page used the wide logo, which crops badly)

export function generateMetadata(): Metadata {
  const page = getById(CONTACT_ID);
  if (!page) return { title: "Contact us" };
  const seo = seoMetadata(page);
  return { ...seo, openGraph: { ...seo.openGraph, images: [OLD_SHARE_IMAGE] } };
}

export default function ContactPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: contactFaqs.map((f) => ({ "@type": "Question", name: ldText(f.q), acceptedAnswer: { "@type": "Answer", text: ldText(f.a) } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[{ name: "Contact us", path: "/contact-us/" }]} />
      <ContactHero />
      <Contact page />
      {/* free Pexels 12635375 */}
      <Faq items={contactFaqs} photo={{ src: "/images/contact/faq-consultation.webp", alt: "Dentist talking with a patient before her treatment in a modern dental clinic" }} />
    </>
  );
}
