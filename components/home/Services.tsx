import Link from "next/link";
import { services, topServiceHrefs } from "@/content/home";
import { Arrow } from "@/components/ui";
import ServiceCard from "@/components/home/ServiceCard";

/** Services (v2, 2026-10-26): the 4 most requested treatments; all 11 are on /services/. */
export default function Services() {
  const top = topServiceHrefs.map((href) => services.find((s) => s.href === href)!);

  return (
    <section id="services" className="scroll-mt-28 bg-white py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <h2 className="max-w-2xl font-display text-5xl font-medium leading-[0.95] text-brown-dark md:text-6xl">
            Explore Our <em className="text-gold">Dental Services in Dubai</em>
          </h2>
          <p className="max-w-sm leading-relaxed">
            From a routine check-up to a complete smile makeover — eleven specialties under one roof. These are the treatments our patients ask for most.
          </p>
        </div>

        {/* phones: swipe sideways · md: 2 columns · lg: 4 columns */}
        <ul className="-mx-5 mt-14 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:auto-rows-fr md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {top.map((s, i) => (
            <li key={s.href} className="w-[78%] shrink-0 snap-start md:w-auto">
              <ServiceCard service={s} number={i + 1} sizes="(min-width: 1024px) 300px, (min-width: 768px) 45vw, 78vw" />
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <Link href="/services/" className="inline-flex min-h-12 items-center gap-3 rounded-full border border-gold px-7 text-sm font-bold text-gold-dark transition hover:bg-gold-soft">
            View all {services.length} treatments <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
