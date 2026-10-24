import Image from "next/image";
import { faqs } from "@/content/home";
import { clinic } from "@/content/site";
import { Eyebrow, GoldButton, Heading } from "@/components/ui";

export default function Faq() {
  return (
    <section id="faq" className="bg-cream py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6 lg:sticky lg:top-36 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <Heading lead="Frequently Asked" accent="Questions" />
          <div className="relative overflow-hidden rounded-[2rem]">
            <Image src="/images/bg-woman.jpg" alt="Patient receiving dental treatment at Bright Way" width={640} height={520} className="aspect-[4/3.3] w-full object-cover" />
            <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-5">
              <span className="font-extrabold text-brown-dark">Still have a question?</span>
              <GoldButton href={`tel:${clinic.phone}`}>Call {clinic.phoneDisplay}</GoldButton>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={f.q} className="group rounded-2xl border border-line bg-white px-6 py-5 open:shadow-[0_12px_40px_-24px_rgba(110,82,25,0.35)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                <span className="flex gap-4">
                  <span className="font-display text-xl italic text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg font-extrabold text-brown-dark">{f.q}</span>
                </span>
                <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-soft text-xl text-gold-dark transition group-open:rotate-45 group-open:bg-gold group-open:text-white">
                  +
                </span>
              </summary>
              <p className="mt-4 pl-10 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
