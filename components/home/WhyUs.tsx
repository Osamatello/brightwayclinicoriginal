import Image from "next/image";
import { whyPoints } from "@/content/home";
import { Eyebrow, Heading } from "@/components/ui";

export default function WhyUs() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-lg">
          <div aria-hidden="true" className="arch absolute inset-0 translate-x-5 translate-y-5 bg-gold-soft" />
          <div className="arch relative aspect-[4/5] overflow-hidden bg-cream">
            <Image src="/images/why-denture.png" alt="Dentist holding a denture model at Bright Way Dental Clinic" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="bg-gold-gradient absolute -right-4 top-16 rounded-2xl px-6 py-5 text-white shadow-xl">
            <p className="font-display text-4xl font-semibold leading-none">DHA</p>
            <p className="text-xs">Licensed dentists</p>
          </div>
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <Eyebrow>Why choose us</Eyebrow>
            <Heading lead="What Makes" accent="Bright Way Dental Clinic a Good Choice?" />
          </div>
          <ol className="grid gap-x-8 sm:grid-cols-2">
            {whyPoints.map((point, i) => (
              <li key={point} className="flex gap-4 border-t border-line py-5">
                <span className="font-display text-3xl font-semibold leading-none text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-semibold leading-snug text-brown-dark">{point}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
