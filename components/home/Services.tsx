import Image from "next/image";
import Link from "next/link";
import { services } from "@/content/home";
import { Arrow, Eyebrow, Heading } from "@/components/ui";

export default function Services() {
  const [featured, ...rest] = services;
  return (
    <section id="services" className="bg-cream py-24">
      <div className="mx-auto max-w-7xl space-y-12 px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <Eyebrow>Top Services</Eyebrow>
            <Heading lead="Explore Our" accent="Dental Services in Dubai" />
          </div>
          <p className="max-w-sm leading-relaxed">From a routine check-up to a complete smile makeover — eleven specialties under one roof.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Link
            href={featured.href}
            className="group relative overflow-hidden rounded-[2rem] bg-brown text-white md:col-span-2 md:row-span-2"
          >
            <Image src={featured.img} alt={`${featured.title} in Dubai`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-60 transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-brown via-brown/50 to-transparent" />
            <div className="relative flex h-full min-h-[420px] flex-col justify-end gap-4 p-8 md:p-10">
              <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-gold-dark">Signature · Save 10%</span>
              <h3 className="font-display text-5xl font-semibold leading-none">{featured.title}</h3>
              <p className="max-w-md text-white/80">{featured.text}</p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-gold-light">
                Discover implants <Arrow />
              </span>
            </div>
          </Link>

          {rest.map((s, i) => (
            <Link
              key={s.href}
              href={s.href}
              // featured card fills 4 cells + 10 cards; the last two go wide so the 4-column grid ends on a full row
              className={`group flex overflow-hidden rounded-[1.75rem] bg-white shadow-[0_12px_40px_-24px_rgba(110,82,25,0.35)] transition hover:-translate-y-1 ${
                i >= rest.length - 2 ? "flex-col lg:col-span-2 lg:flex-row" : "flex-col"
              }`}
            >
              <div className={`relative overflow-hidden bg-gold-soft ${i >= rest.length - 2 ? "aspect-[16/11] lg:aspect-auto lg:w-1/2" : "aspect-[16/11]"}`}>
                <Image src={s.img} alt={`${s.title} at Bright Way Dental Clinic`} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
                <span className="absolute left-4 top-4 font-display text-lg italic text-white drop-shadow">{String(i + 2).padStart(2, "0")}</span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6">
                <h3 className="text-lg font-extrabold leading-snug text-brown-dark">{s.title}</h3>
                <p className="flex-1 text-sm leading-relaxed">{s.text}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-gold-dark transition group-hover:gap-3">
                  Read more <Arrow />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
