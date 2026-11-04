import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ComponentType } from "react";
import { entriesByLang, getByPath, languageLinks, seoMetadata } from "@/lib/content";
import { setLang, t } from "@/lib/i18n";
import { arPathOf, enPathOf } from "@/lib/i18n-data";
import { PostPage, ServicePage } from "@/components/page/EntryViews";
import About from "@/app/(en)/about/page";
import Blog from "@/app/(en)/blog/page";
import Career from "@/app/(en)/career/page";
import Contact from "@/app/(en)/contact-us/page";
import Doctor from "@/app/(en)/dr-hasan-a-mahdy/page";
import ImplantCost from "@/app/(en)/personalized-dental-implant-cost/page";
import ImplantCostThanks from "@/app/(en)/personalized-dental-implant-cost-typ/page";
import Privacy from "@/app/(en)/privacy-policy/page";
import Services from "@/app/(en)/services/page";
import Gallery from "@/app/(en)/smile-gallery/page";
import TransformSmile from "@/app/(en)/transform-your-smile/page";
import TransformSmileThanks from "@/app/(en)/transform-your-smile-typ/page";

// One route for every Arabic page: the old Arabic addresses, plus the pages new to Arabic.
export const dynamicParams = false;

const PAGES: Record<string, ComponentType> = {
  "/about/": About,
  "/blog/": Blog,
  "/career/": Career,
  "/contact-us/": Contact,
  "/dr-hasan-a-mahdy/": Doctor,
  "/personalized-dental-implant-cost/": ImplantCost,
  "/personalized-dental-implant-cost-typ/": ImplantCostThanks,
  "/privacy-policy/": Privacy,
  "/services/": Services,
  "/smile-gallery/": Gallery,
  "/transform-your-smile/": TransformSmile,
  "/transform-your-smile-typ/": TransformSmileThanks,
};

// Pages that exist only in the new design, so they have no old Arabic entry
const NEW_PAGE_SEO: Record<string, { title: string; description: string }> = {
  "/services/": { title: "Dental Services in Dubai | Bright Way Dental Clinic", description: "Dental implants, veneers, orthodontics, teeth whitening and more — all 11 treatments at Bright Way Dental Clinic in Al Garhoud, Dubai, with digital dentistry and DHA-licensed dentists." },
  "/privacy-policy/": { title: "Privacy Policy", description: "This policy explains how" },
};

const HIDDEN = new Set(["/transform-your-smile/", "/transform-your-smile-typ/"]);

const pathOf = (slug: string) => `/ar/${decodeURIComponent(slug)}/`;

export function generateStaticParams() {
  const fromEntries = entriesByLang("ar").filter((e) => e.path !== "/ar/").map((e) => e.path);
  const extra = Object.keys(PAGES).map((en) => arPathOf(en)).filter((p): p is string => !!p);
  return [...new Set([...fromEntries, ...extra])].map((p) => ({ slug: p.split("/").filter(Boolean).pop()! }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  setLang("ar");
  const path = pathOf((await params).slug);
  const en = enPathOf(path);
  const robots = en && HIDDEN.has(en) ? { index: false, follow: false } : undefined;
  const seo = en ? NEW_PAGE_SEO[en] : undefined;
  if (seo) {
    return { title: t(seo.title), description: t(seo.description), alternates: { canonical: encodeURI(path), languages: languageLinks(path) }, robots, openGraph: { title: t(seo.title), url: encodeURI(path), images: ["/images/logo.png"], locale: "ar_AE" } };
  }
  const entry = getByPath(path);
  if (!entry) return {};
  const meta = seoMetadata(entry);
  return robots ? { ...meta, robots } : meta;
}

export default async function ArabicEntry({ params }: { params: Promise<{ slug: string }> }) {
  setLang("ar");
  const path = pathOf((await params).slug);
  const en = enPathOf(path);
  const Page = en ? PAGES[en] : undefined;
  if (Page) return <Page />;
  const entry = getByPath(path);
  if (!entry || entry.kind === "page") notFound();
  if (entry.kind === "service" && en) return <ServicePage entry={entry} enPath={en} />;
  return <PostPage entry={entry} />;
}
