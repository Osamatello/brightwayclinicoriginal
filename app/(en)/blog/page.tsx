import type { Metadata } from "next";
import { getById, postsEn, seoMetadata } from "@/lib/content";
import { BreadcrumbSchema } from "@/components/page/PageParts";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import Cta from "@/components/home/Cta";

const BLOG_PAGE_ID = 3246; // the old /blog/ page — keeps its SEO title and description

export function generateMetadata(): Metadata {
  const page = getById(BLOG_PAGE_ID);
  return page ? seoMetadata(page) : { title: "Blog" };
}

export default function BlogPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Blog", path: "/blog/" }]} />
      <BlogHero />
      <BlogGrid posts={postsEn()} />
      <Cta aligned />
    </>
  );
}
