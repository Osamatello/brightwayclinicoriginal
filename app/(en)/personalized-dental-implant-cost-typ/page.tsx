import { t } from "@/lib/i18n";
import type { Metadata } from "next";
import { getById, seoMetadata } from "@/lib/content";
import ThankYou from "@/components/page/ThankYou";

const PAGE_ID = 2684;

export function generateMetadata(): Metadata {
  const page = getById(PAGE_ID);
  return page ? seoMetadata(page) : { title: "Thank you" };
}

export default function ImplantCostThankYou() {
  return (
    <ThankYou message={t("We’re thrilled that you’ve taken the first step towards Get Your Personalized Dental Implant Cost Estimate – Instantly and for Free!")} />
  );
}
