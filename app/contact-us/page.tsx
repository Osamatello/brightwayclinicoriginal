import type { Metadata } from "next";
import { getById, seoMetadata } from "@/lib/content";
import { clinic } from "@/content/site";
import { BreadcrumbSchema, PageHero } from "@/components/page/PageParts";
import { OutlineButton, WhatsAppIcon } from "@/components/ui";
import Contact from "@/components/home/Contact";
import Faq from "@/components/home/Faq";

const CONTACT_ID = 622;

export function generateMetadata(): Metadata {
  const page = getById(CONTACT_ID);
  return page ? seoMetadata(page) : { title: "Contact us" };
}

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Contact us", path: "/contact-us/" }]} />
      <PageHero
        eyebrow="Contact Bright Way Dental Clinic"
        title="Get In Touch with Our Team"
        intro="Have questions or need to schedule an appointment? Our team is ready to assist with your dental care needs, from general inquiries to booking your next visit."
        crumbs={[{ label: "Contact us" }]}
      >
        <div className="flex flex-wrap gap-3">
          <OutlineButton href={`tel:${clinic.phone}`} light>{clinic.phoneDisplay}</OutlineButton>
          <OutlineButton href={clinic.whatsapp} light>
            <WhatsAppIcon /> WhatsApp
          </OutlineButton>
        </div>
      </PageHero>
      <Contact />
      <Faq />
    </>
  );
}
