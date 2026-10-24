import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { clinic } from "@/content/site";
import { Eyebrow, GoldButton, OutlineButton, WhatsAppIcon } from "@/components/ui";

type Crumb = { label: string; href?: string };

/** Dark brown banner used at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  imageAlt = "",
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-brown text-white">
      <div aria-hidden="true" className="absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full bg-gold/15 blur-3xl" />
      <div className={`relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:py-20 ${image ? "lg:grid-cols-[1.2fr_0.8fr]" : ""}`}>
        <div className="space-y-6">
          <nav aria-label="Breadcrumb" className="text-xs text-white/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-gold-light">Home</Link></li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {c.href ? <Link href={c.href} className="hover:text-gold-light">{c.label}</Link> : <span className="text-gold-light">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">{title}</h1>
          {intro && <p className="max-w-2xl text-lg leading-relaxed text-white/75">{intro}</p>}
          {children}
        </div>
        {image && (
          <div className="relative mx-auto w-full max-w-md">
            <div aria-hidden="true" className="arch absolute -left-4 -top-4 bottom-0 right-4 border border-gold/50" />
            <div className="arch relative aspect-[4/4.6] overflow-hidden bg-brown-soft">
              <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** Long-form content converted from WordPress, styled in the brand. */
export function Prose({ html, className = "" }: { html: string; className?: string }) {
  return (
    <div
      className={`prose prose-lg max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-brown-dark prose-h2:text-3xl prose-h3:text-2xl prose-p:text-ink prose-li:text-ink prose-strong:text-brown-dark prose-a:font-semibold prose-a:text-gold-dark prose-a:decoration-gold/40 prose-img:rounded-[1.75rem] prose-img:shadow-[0_20px_50px_-30px_rgba(110,82,25,0.5)] prose-li:marker:text-gold prose-th:text-brown-dark ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/** Sticky side card with booking actions — sits next to long content. */
export function BookingCard({ title = "Book your consultation" }: { title?: string }) {
  return (
    <aside className="space-y-5 rounded-[2rem] bg-brown p-8 text-white lg:sticky lg:top-36">
      <p className="font-display text-3xl font-semibold italic text-gold-light">{title}</p>
      <p className="text-sm leading-relaxed text-white/70">Our DHA-licensed dentists will examine your case and plan the right treatment for you.</p>
      <GoldButton href="/contact-us/" className="w-full">Get Dental Consultation</GoldButton>
      <OutlineButton href={clinic.whatsapp} light>
        <WhatsAppIcon /> WhatsApp us
      </OutlineButton>
      <dl className="space-y-3 border-t border-white/10 pt-5 text-sm">
        <div><dt className="text-xs uppercase tracking-[0.2em] text-gold-light">Call</dt><dd><a href={`tel:${clinic.phone}`}>{clinic.phoneDisplay}</a></dd></div>
        <div><dt className="text-xs uppercase tracking-[0.2em] text-gold-light">Hours</dt><dd>{clinic.hours}</dd></div>
        <div><dt className="text-xs uppercase tracking-[0.2em] text-gold-light">Visit</dt><dd>{clinic.address}</dd></div>
      </dl>
    </aside>
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${clinic.url}${it.path}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
