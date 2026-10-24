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
    <ThankYou message="We're thrilled that you've taken the first step towards getting your personalized dental implant cost estimate — instantly and for free. Our team will send your estimate shortly." />
  );
}
