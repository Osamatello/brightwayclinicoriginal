import Image from "next/image";
import Link from "next/link";
import { formatDate, type Entry } from "@/lib/content";
import { Arrow } from "@/components/ui";

export default function PostCard({ post, large = false }: { post: Entry; large?: boolean }) {
  return (
    <Link
      href={post.path}
      className={`group flex overflow-hidden rounded-[1.75rem] bg-white shadow-[0_12px_40px_-24px_rgba(110,82,25,0.35)] transition hover:-translate-y-1 ${large ? "flex-col md:col-span-2 md:flex-row" : "flex-col"}`}
    >
      <div className={`relative overflow-hidden bg-gold-soft ${large ? "aspect-[16/10] md:aspect-auto md:w-3/5" : "aspect-[16/10]"}`}>
        {post.featured && (
          <Image src={post.featured} alt={post.title} fill sizes={large ? "(min-width: 768px) 45vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} className="object-cover transition duration-700 group-hover:scale-105" />
        )}
      </div>
      <div className={`flex flex-1 flex-col gap-3 ${large ? "p-8 md:p-10" : "p-6"}`}>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-dark">{formatDate(post.date)}</p>
        <h3 className={`font-extrabold leading-snug text-brown-dark ${large ? "text-3xl" : "text-lg"}`}>{post.title}</h3>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed">{post.seo.description || post.excerpt}</p>
        <span className="inline-flex items-center gap-2 text-sm font-bold text-brown-dark transition group-hover:gap-3">
          Read article <Arrow />
        </span>
      </div>
    </Link>
  );
}
