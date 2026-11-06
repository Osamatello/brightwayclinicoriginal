import { t } from "@/lib/i18n";
import type { Metadata } from "next";
import { getById, seoMetadata } from "@/lib/content";
import { smileCases } from "@/content/home";
import { clinic } from "@/content/site";
import { CLINIC_ID, ldText, ldUrl } from "@/lib/schema";
import { BreadcrumbSchema } from "@/components/page/PageParts";
import BeforeAfter from "@/components/home/BeforeAfter";
import CareAndOffer from "@/components/home/CareAndOffer";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryTreatments from "@/components/gallery/GalleryTreatments";
import TreatmentCta from "@/components/treatment/TreatmentCta";

const GALLERY_ID = 617;
const OLD_SHARE_IMAGE = "/wp-content/uploads/2024/03/logo-Bright-Way-01.png"; // the old page's og:image

export function generateMetadata(): Metadata {
  const page = getById(GALLERY_ID);
  if (!page) return { title: "Smile Gallery" };
  const seo = seoMetadata(page);
  return { ...seo, openGraph: { ...seo.openGraph, images: [OLD_SHARE_IMAGE] } };
}

export default function SmileGalleryPage() {
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: ldText("Before and After Dental Transformations"),
    url: ldUrl("/smile-gallery/"),
    provider: { "@id": CLINIC_ID },
    image: smileCases.flatMap((c) => [
      { "@type": "ImageObject", contentUrl: `${clinic.url}${c.before}`, description: ldText(c.beforeAlt) },
      { "@type": "ImageObject", contentUrl: `${clinic.url}${c.after}`, description: ldText(c.afterAlt) },
    ]),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }} />
      <BreadcrumbSchema items={[{ name: "Smile Gallery", path: "/smile-gallery/" }]} />
      <GalleryHero />
      <BeforeAfter page />
      <GalleryTreatments />
      <CareAndOffer galleryWording />
      <TreatmentCta copy={t("Our team of experienced dental experts is ready to provide you with top-tier care tailored to your needs.")} />
    </>
  );
}
