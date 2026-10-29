import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { formatDate, getByPath, postsEn, readingMinutes, seoMetadata, servicesEn, type Entry } from "@/lib/content";
import PostCard from "@/components/page/PostCard";
import { services as serviceCards } from "@/content/home";
import { clinic } from "@/content/site";
import { BookingCard, BreadcrumbSchema, PageHero, Prose } from "@/components/page/PageParts";
import { Heading } from "@/components/ui";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import TreatmentBody from "@/components/treatment/TreatmentBody";
import MoreTreatments from "@/components/treatment/MoreTreatments";
import TreatmentCta from "@/components/treatment/TreatmentCta";
import { heroImages, hideOldImages, moreTreatments, treatmentFigures } from "@/content/treatments";

// One route for every English service page and blog post: /<slug>/ — exactly the old WordPress URLs.
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
  return entry.kind === "service" ? <ServicePage entry={entry} /> : <PostPage entry={entry} />;
}

function ServicePage({ entry }: { entry: Entry }) {
  const card = serviceCards.find((s) => s.href === entry.path);
  const picked = moreTreatments[entry.path]?.map((href) => serviceCards.find((s) => s.href === href)).filter((s) => s !== undefined);
  const others = picked?.length ? picked : serviceCards.filter((s) => s.href !== entry.path).slice(0, 4);
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: entry.title,
    description: entry.seo.description,
    url: `${clinic.url}${entry.path}`,
    provider: { "@id": `${clinic.url}/#clinic` },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbSchema items={[{ name: "Services", path: "/services/" }, { name: entry.title, path: entry.path }]} />
      <TreatmentHero title={entry.title} intro={card?.text} image={heroImages[entry.path] || card?.img || entry.featured} />
      <TreatmentBody html={entry.html} figures={treatmentFigures[entry.path]} hideOldImages={hideOldImages.has(entry.path)} />
      <MoreTreatments services={others} total={serviceCards.length} />
      <TreatmentCta />
    </>
  );
}

function PostPage({ entry }: { entry: Entry }) {
  const related = postsEn().filter((p) => p.id !== entry.id).slice(0, 3);
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: entry.title,
    description: entry.seo.description,
    datePublished: entry.date,
    dateModified: entry.modified,
    image: entry.featured ? `${clinic.url}${entry.featured}` : undefined,
    url: `${clinic.url}${entry.path}`,
    publisher: { "@id": `${clinic.url}/#clinic` },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbSchema items={[{ name: "Blog", path: "/blog/" }, { name: entry.title, path: entry.path }]} />
      <PageHero eyebrow={`${formatDate(entry.date)} · ${readingMinutes(entry.html)} min read`} title={entry.title} crumbs={[{ label: "Blog", href: "/blog/" }, { label: entry.title }]} />
      <article className="bg-cream py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_340px]">
          <div className="space-y-10">
            {entry.featured && !entry.html.includes(entry.featured) && (
              <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem]">
                <Image src={entry.featured} alt={entry.title} fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
              </div>
            )}
            <Prose html={entry.html} />
          </div>
          <BookingCard title="Have a question about your teeth?" />
        </div>
      </article>
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl space-y-10 px-5">
          <Heading lead="Keep" accent="reading" />
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
