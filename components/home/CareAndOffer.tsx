import Image from "next/image";
import { careFocus, offerPoints } from "@/content/home";
import { Check, Eyebrow, GoldButton, Heading } from "@/components/ui";

export default function CareAndOffer() {
  return (
    <section className="bg-cream px-5 pb-24 pt-12">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
        <div className="space-y-7 rounded-[2.25rem] border border-line bg-white p-10 md:p-12">
          <Eyebrow>Patient-First Dental Care</Eyebrow>
          <Heading lead="You feel more than a patient at Bright Way," accent="you are family." className="!text-3xl md:!text-4xl" />
          <p className="leading-relaxed">We know that when we go to the dentist this can be a stressor. That&apos;s why our team focuses on:</p>
          <ul className="grid grid-cols-2 gap-3">
            {careFocus.map((c) => (
              <li key={c} className="flex items-center gap-3 rounded-2xl bg-cream p-4 text-sm font-bold text-brown-dark">
                <span className="bg-gold-gradient flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white">
                  <Check />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-[2.25rem] bg-brown p-10 text-white md:p-12">
          <Image src="/images/x-JfmX1BQ9THHMasc7tUkgybQK2k0.webp" alt="" aria-hidden="true" width={420} height={420} className="absolute -bottom-10 -right-10 w-64 opacity-90 md:w-80" />
          <div className="relative max-w-sm space-y-6">
            <span className="bg-gold-gradient inline-block rounded-full px-4 py-1.5 text-xs font-extrabold tracking-[0.2em]">SPECIAL OFFER</span>
            <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">
              Exclusive Dental Implant Offer at <span className="font-display italic text-gold-light">Bright Way</span>
            </h2>
            <p className="font-display text-6xl font-semibold text-gold-light">Save 10%</p>
            <ul className="space-y-3 text-sm text-white/80">
              {offerPoints.map((p) => (
                <li key={p} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {p}
                </li>
              ))}
            </ul>
            <GoldButton href="/contact-us/">Get the offer</GoldButton>
          </div>
        </div>
      </div>
    </section>
  );
}
