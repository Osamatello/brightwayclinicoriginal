import { arPathOf, enPathOf } from "@/lib/i18n-data";
import { articleSources, arabicOnlySources, treatmentAnswers } from "@/content/seo-answers";
import { formatDate, postsEn, readingMinutes, type Entry } from "@/lib/content";
import { services as serviceCards } from "@/content/home";
import { clinic } from "@/content/site";
import { CLINIC_ID, DOCTOR_ID, JsonLd, faqFromHtml } from "@/lib/schema";
import { getLang, l, t } from "@/lib/i18n";
import { BreadcrumbSchema } from "@/components/page/PageParts";
import BlogGrid from "@/components/blog/BlogGrid";
import PostBody from "@/components/blog/PostBody";
import PostHero from "@/components/blog/PostHero";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import TreatmentBody from "@/components/treatment/TreatmentBody";
import MoreTreatments from "@/components/treatment/MoreTreatments";
import TreatmentCta from "@/components/treatment/TreatmentCta";
import { heroImages, hideOldImages, moreTreatments, treatmentFigures } from "@/content/treatments";

/** A treatment page. `enPath` is the English address, which all the page's photos and links are keyed by. */
export function ServicePage({ entry, enPath }: { entry: Entry; enPath: string }) {
  const card = serviceCards.find((s) => s.href === enPath);
  const picked = moreTreatments[enPath]?.map((href) => serviceCards.find((s) => s.href === href)).filter((s) => s !== undefined);
  const others = picked?.length ? picked : serviceCards.filter((s) => s.href !== enPath).slice(0, 4);
  const qa = treatmentAnswers[enPath];
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: entry.title,
    description: entry.seo.description,
    url: `${clinic.url}${encodeURI(entry.path)}`,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbSchema items={[{ name: t("Services"), path: l("/services/") }, { name: entry.title, path: entry.path }]} />
      <FaqSchema html={entry.html} />
      <TreatmentHero title={entry.title} intro={card?.text} image={heroImages[enPath] || card?.img || entry.featured} />
      <TreatmentBody html={entry.html} figures={treatmentFigures[enPath]} hideOldImages={hideOldImages.has(enPath)} answer={qa && (getLang() === "ar" ? qa.ar : qa.en)} sources={qa?.sources} />
      <MoreTreatments services={others} total={serviceCards.length} />
      <TreatmentCta />
    </>
  );
}

export function PostPage({ entry }: { entry: Entry }) {
  const related = postsEn().filter((p) => p.id !== entry.id).slice(0, 3);
  const sources = articleSources[getLang() === "ar" ? (enPathOf(entry.path) ?? "") : entry.path] ?? arabicOnlySources[decodeURI(entry.path)] ?? [];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: entry.title,
    description: entry.seo.description,
    datePublished: entry.date,
    dateModified: entry.modified,
    image: entry.featured ? `${clinic.url}${entry.featured}` : undefined,
    url: `${clinic.url}${encodeURI(entry.path)}`,
    // the page itself, reviewed by Dr. Hasan (shown under the title)
    mainEntityOfPage: { "@type": "WebPage", "@id": `${clinic.url}${encodeURI(entry.path)}`, reviewedBy: { "@id": DOCTOR_ID } },
    inLanguage: getLang(),
    citation: sources.length ? sources.map((s) => s.url) : undefined,
    author: { "@id": CLINIC_ID },
    publisher: { "@id": CLINIC_ID },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbSchema items={[{ name: t("Blog"), path: l("/blog/") }, { name: entry.title, path: entry.path }]} />
      <FaqSchema html={entry.html} />
      <PostHero title={entry.title} meta={`${formatDate(entry.date)} · ${readingMinutes(entry.html)} ${t("min read")}`} />
      <PostBody title={entry.title} html={entry.html} featured={entry.featured} sources={sources} />
      <BlogGrid posts={related} keepReading />
    </>
  );
}

/** FAQ markup from the article's own question headings (nothing is added on screen). */
function FaqSchema({ html }: { html: string }) {
  const faq = faqFromHtml(html);
  return faq ? <JsonLd data={faq} /> : null;
}
