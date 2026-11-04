import { t } from "@/lib/i18n";
import type { Metadata } from "next";
import { getById, seoMetadata } from "@/lib/content";
import ThankYou from "@/components/page/ThankYou";

const PAGE_ID = 2468;

export function generateMetadata(): Metadata {
  const page = getById(PAGE_ID);
  // Hidden with /transform-your-smile/ (Osama, 2026-11-04)
  return { ...(page ? seoMetadata(page) : { title: "Thank you" }), robots: { index: false, follow: false } };
}

export default function TransformYourSmileThankYou() {
  return (
    <ThankYou message={t("We’re thrilled that you’ve taken the first step towards transforming your smile with our Virtual Smile Design service.")} />
  );
}
