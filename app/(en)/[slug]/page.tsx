import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getByPath, postsEn, seoMetadata, servicesEn } from "@/lib/content";
import { PostPage, ServicePage } from "@/components/page/EntryViews";

// One route for every English service page and blog post: /<slug>/, exactly the old WordPress URLs.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...servicesEn(), ...postsEn()].map((e) => ({ slug: e.slug }));
}

const findEntry = (slug: string) => getByPath(`/${decodeURIComponent(slug)}/`);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const entry = findEntry((await params).slug);
  return entry ? seoMetadata(entry) : {};
}

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const entry = findEntry((await params).slug);
  if (!entry || entry.kind === "page") notFound();
  return entry.kind === "service" ? <ServicePage entry={entry} enPath={entry.path} /> : <PostPage entry={entry} />;
}
