import type { Metadata } from "next";
import HomePage from "@/app/(en)/page";
import { getByPath, seoMetadata } from "@/lib/content";
import { setLang, setPage } from "@/lib/i18n";

export function generateMetadata(): Metadata {
  const entry = getByPath("/ar/");
  return entry ? seoMetadata(entry) : {};
}

export default function ArabicHome() {
  setLang("ar");
  setPage("/");
  return <HomePage />;
}
