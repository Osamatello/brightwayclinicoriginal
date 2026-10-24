import Image from "next/image";
import { digitalBenefits, digitalFeatures } from "@/content/home";
import { Eyebrow, Heading } from "@/components/ui";

export default function Digital() {
  return (
    <section className="bg-cream px-5 py-24">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.25fr_1fr]">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-brown p-10 text-white md:p-14">
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-gold/30" />
          <div aria-hidden="true" className="absolute -right-10 -top-10 h-72 w-72 rounded-full border border-gold/20" />
          <div className="relative space-y-6">
            <Eyebrow light>Digital Dentistry</Eyebrow>
            <Heading lead="Smarter, Faster," accent="More Accurate in Dubai." light />
            <p className="max-w-xl leading-relaxed text-white/70">
              We are proud of specializing in digital dentistry where the traditional methods will be converted to faster and more comfortable procedures.
            </p>
            <ul className="grid gap-3 pt-2 sm:grid-cols-2">
              {digitalFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm font-semibold">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid grid-rows-[1fr_auto] gap-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="relative min-h-64 overflow-hidden rounded-[2rem]">
              <Image src="/images/digital-photo.jpg" alt="Dentist using digital dental technology in Dubai" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative min-h-64 overflow-hidden rounded-[2rem] bg-white">
              <Image src="/images/digital-equip.png" alt="Digital dental equipment" fill sizes="25vw" className="object-cover" />
            </div>
          </div>
          <div className="bg-gold-gradient rounded-[2rem] p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Benefits of digital dentistry in Dubai</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {digitalBenefits.map((b) => (
                <span key={b} className="font-display text-2xl font-semibold italic">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
