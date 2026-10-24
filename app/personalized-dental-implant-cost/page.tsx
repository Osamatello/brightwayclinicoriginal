import Image from "next/image";
import type { Metadata } from "next";
import { getById, seoMetadata } from "@/lib/content";
import LeadForm from "@/components/page/LeadForm";
import { nameFields } from "@/content/forms";
import { Eyebrow, Heading } from "@/components/ui";
import { Videos } from "@/components/home/Media";

const PAGE_ID = 2652;

export function generateMetadata(): Metadata {
  const page = getById(PAGE_ID);
  return page ? seoMetadata(page) : { title: "Personalized Dental Implant Cost" };
}

const reasons = [
  { title: "Regain your natural smile and confidence.", img: "/wp-content/uploads/2024/10/4-1.png" },
  { title: "Enjoy your favorite foods without worry.", img: "/wp-content/uploads/2024/10/5.png" },
  { title: "Experience long-lasting, durable solutions.", img: "/wp-content/uploads/2024/10/1.png" },
  { title: "Prevent bone loss and maintain facial structure.", img: "/wp-content/uploads/2024/10/3.png" },
];

const form = (
  <LeadForm
    title="Get your free cost estimate"
    subtitle="Enter your details below for a quick and clear cost estimate – no obligations."
    fields={[...nameFields, { name: "missing", label: "How many teeth do you want to replace?" }]}
    submitLabel="Get my implant cost"
    thankYouPath="/personalized-dental-implant-cost-typ/"
  />
);

export default function ImplantCostPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brown text-white">
        <div aria-hidden="true" className="absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full bg-gold/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-light">Bright Way Dental Clinic</p>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Personalized <span className="font-display italic text-gold-light">Dental Implant Cost</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/80">
              Wondering how much it will cost to restore your smile? Find out now by entering a few simple details – no commitments, just clarity.
            </p>
            <p className="max-w-xl leading-relaxed text-white/70">Dental implants are a great investment in your smile, but costs can vary.</p>
            <div className="relative hidden max-w-sm lg:block">
              <Image src="/wp-content/uploads/2024/03/Untitled-1.png" alt="Exclusive Dental Implant Offer: Bright Way Dental Clinic, Dubai." width={480} height={480} className="h-auto w-full" />
            </div>
          </div>
          {form}
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-5">
          <div className="max-w-2xl space-y-4">
            <Eyebrow>Why choose dental implants?</Eyebrow>
            <Heading lead="A smile that" accent="lasts" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <article key={r.title} className="group overflow-hidden rounded-[2rem] bg-white">
                <div className="relative aspect-square overflow-hidden bg-gold-soft">
                  <Image src={r.img} alt={r.title} fill sizes="25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <p className="p-6 text-lg font-extrabold leading-snug text-brown-dark">{r.title}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
          <div className="space-y-5">
            <Heading lead="Take the first step towards" accent="your dream smile today." />
            <p className="text-lg leading-relaxed">It&apos;s quick, easy, and completely free to find out how much it will cost you to smile with confidence again.</p>
            <div className="relative aspect-[4/3] max-w-md overflow-hidden rounded-[2rem]">
              <Image src="/wp-content/uploads/2024/10/6.png" alt="Dental implant treatment at Bright Way Dental Clinic" fill sizes="40vw" className="object-cover" />
            </div>
          </div>
          {form}
        </div>
      </section>
      <Videos />
    </>
  );
}
