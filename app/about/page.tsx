import type { Metadata } from "next";
import { getById, seoMetadata } from "@/lib/content";
import { BreadcrumbSchema } from "@/components/page/PageParts";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutGoodChoice from "@/components/about/AboutGoodChoice";
import AboutDoctors from "@/components/about/AboutDoctors";
import AboutInsurance from "@/components/about/AboutInsurance";
import AboutCta from "@/components/about/AboutCta";
import AboutPillars from "@/components/about/AboutPillars";

const ABOUT_ID = 615;

export function generateMetadata(): Metadata {
  const page = getById(ABOUT_ID);
  return page ? seoMetadata(page) : { title: "About" };
}

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "About", path: "/about/" }]} />
      <AboutHero />

      <AboutPillars />

      <AboutStory />
      <AboutGoodChoice />
      <AboutDoctors />
      <AboutInsurance />
      <AboutCta />
    </>
  );
}
