import type { Metadata } from "next";
import { getById, seoMetadata } from "@/lib/content";
import ThankYou from "@/components/page/ThankYou";

const PAGE_ID = 2468;

export function generateMetadata(): Metadata {
  const page = getById(PAGE_ID);
  return page ? seoMetadata(page) : { title: "Thank you" };
}

export default function TransformYourSmileThankYou() {
  return (
    <ThankYou message="We're thrilled that you've taken the first step towards transforming your smile with our Virtual Smile Design service. Our team will send your personalized smile designs shortly." />
  );
}
