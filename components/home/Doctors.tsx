import Image from "next/image";
import Link from "next/link";
import { doctors } from "@/content/home";
import { Arrow, Eyebrow, Heading } from "@/components/ui";

export default function Doctors() {
  return (
    <section id="doctors" className="bg-cream py-24">
      <div className="mx-auto max-w-7xl space-y-14 px-5">
        <div className="mx-auto max-w-3xl space-y-4 text-center [&>p]:justify-center">
          <Eyebrow>Discover our best dentists in Dubai</Eyebrow>
          <Heading lead="Our Specialized Doctors at" accent="Bright Way Dental Clinic" />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {doctors.map((d, i) => (
            <article key={d.name} className={`group text-center ${i === 1 ? "md:translate-y-10" : ""}`}>
              <div className="arch relative mx-auto aspect-[4/5] max-w-sm overflow-hidden bg-gold-soft">
                <Image src={d.img} alt={d.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-top transition duration-700 group-hover:scale-105" />
                <span className="bg-gold-gradient absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">{d.tag}</span>
              </div>
              <h3 className="mt-6 text-2xl font-extrabold text-brown-dark">{d.name}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed">{d.role}</p>
              {d.href && (
                <Link href={d.href} className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-gold-dark">
                  Read more <Arrow />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
