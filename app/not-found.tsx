import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/content/home";
import { clinic } from "@/content/site";
import { Arrow, GoldButton, OutlineButton, WhatsAppIcon } from "@/components/ui";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

/** Custom 404 — any URL that is not a page and not in the redirect / 410 map (middleware.ts). */
export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-cream px-5 py-24 md:py-32">
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
      <div className="relative mx-auto max-w-3xl space-y-8 text-center">
        <p className="font-display text-[7rem] font-semibold italic leading-none text-gold md:text-[10rem]">404</p>
        <h1 className="text-4xl font-extrabold leading-tight text-brown-dark md:text-5xl">
          This page has <span className="font-display italic text-gold">moved or no longer exists</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg leading-relaxed">
          The link may be old or mistyped. Find the treatment you are looking for below, or talk to our team — we are happy to help.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <GoldButton href="/">Back to the homepage</GoldButton>
          <OutlineButton href={clinic.whatsapp}>
            <WhatsAppIcon /> WhatsApp us
          </OutlineButton>
        </div>
        <ul className="grid gap-3 pt-6 text-left sm:grid-cols-2">
          {services.slice(0, 6).map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="flex items-center justify-between gap-3 rounded-2xl bg-white px-5 py-4 font-bold text-brown-dark transition hover:text-gold-dark">
                {s.title} <Arrow className="h-4 w-4 shrink-0 text-gold-dark" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
