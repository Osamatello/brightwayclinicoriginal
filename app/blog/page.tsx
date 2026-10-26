import type { Metadata } from "next";
import { getById, postsEn, seoMetadata } from "@/lib/content";
import { BreadcrumbSchema, PageHero } from "@/components/page/PageParts";
import PostCard from "@/components/page/PostCard";
import { Eyebrow, Heading } from "@/components/ui";
import Cta from "@/components/home/Cta";

const BLOG_PAGE_ID = 3246; // the old /blog/ page — keeps its SEO title and description

export function generateMetadata(): Metadata {
  const page = getById(BLOG_PAGE_ID);
  return page ? seoMetadata(page) : { title: "Blog" };
}

export default function BlogPage() {
  const [latest, ...rest] = postsEn();
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Blog", path: "/blog/" }]} />
      <PageHero
        eyebrow="Dental tips & digital dentistry insights"
        title="Bright Way Clinic Blog"
        intro="Advice from Dr. Hasan Mahdy and the Bright Way team — implants, veneers, aligners, children's dental care and the latest in digital dentistry."
        crumbs={[{ label: "Blog" }]}
      />
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl space-y-14 px-5">
          {latest && (
            <div className="space-y-6">
              <Eyebrow>Latest article</Eyebrow>
              <div className="grid gap-6 md:grid-cols-2">
                <PostCard post={latest} large />
              </div>
            </div>
          )}
          <div className="space-y-8">
            <Heading lead="All" accent="articles" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
