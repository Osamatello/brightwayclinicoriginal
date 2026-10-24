import Image from "next/image";
import type { Metadata } from "next";
import { getById, seoMetadata } from "@/lib/content";
import LeadForm from "@/components/page/LeadForm";
import { nameFields } from "@/content/forms";
import { Check, Eyebrow, Heading } from "@/components/ui";
import { Videos } from "@/components/home/Media";

const PAGE_ID = 2341;

export function generateMetadata(): Metadata {
  const page = getById(PAGE_ID);
  return page ? seoMetadata(page) : { title: "Transform Your Smile for Just $5!" };
}

const whyChoose = [
  { title: "Low-Barrier Entry", text: "With just $5, you can visualize your dream smile without any financial strain." },
  { title: "Multiple Options", text: "Receive five unique design options to find the perfect smile that matches your personality and preferences." },
  { title: "Free Professional Consultation", text: "Our experts will guide you through the designs, ensuring you understand all available treatments and make informed decisions." },
  { title: "Exclusive Incentive", text: "Get a 10% discount on dental implants when you choose to proceed with treatment, making your dream smile even more affordable." },
];

const benefits = [
  { title: "Visualize Your Dream Smile", text: "See the potential of your smile transformation before committing to any treatment." },
  { title: "Make Informed Decisions", text: "Understand different treatment options and choose what's best for you with confidence." },
  { title: "Personalized Care", text: "Each design is tailored to your unique features, ensuring a natural and beautiful result." },
];

const steps = [
  { title: "Sign Up", text: "Fill out the form to begin designing your virtual smile." },
  { title: "Pay $5", text: "Complete the payment to access the service." },
  { title: "Upload Photos", text: "Upload clear photos of your face from the right and left sides with your mouth open." },
  { title: "Receive Designs", text: "Our team will contact you and send your virtual smile designs via WhatsApp or email." },
];

const form = (
  <LeadForm
    title="Sign Up Now"
    subtitle="Start your journey to a brighter smile — five virtual smile designs for only $5."
    fields={nameFields}
    submitLabel="Get my 5 smile designs"
    thankYouPath="/transform-your-smile-typ/"
  />
);

export default function TransformYourSmilePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brown text-white">
        <div aria-hidden="true" className="absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-gold/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-light">Bright Way Dental Clinic</p>
            <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
              Transform Your Smile for <span className="font-display italic text-gold-light">Just $5!</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/80">
              Everyone deserves a smile they&apos;re proud of — that&apos;s why we&apos;re offering an incredible deal that combines affordability, personalization and expert consultation.
            </p>
            <ul className="space-y-3">
              {["Virtual Smile Design — 5 options for only $5", "Five customized smile designs crafted by our expert team", "Free consultation with our dental specialists"].map((t) => (
                <li key={t} className="flex items-center gap-3 font-semibold">
                  <span className="bg-gold-gradient flex h-7 w-7 shrink-0 items-center justify-center rounded-full"><Check className="h-4 w-4" /></span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="arch relative hidden aspect-[16/10] max-w-md overflow-hidden lg:block">
              <Image src="/images/lp-happy-client.jpg" alt="Happy client smiling at Bright Way Dental Clinic" fill priority sizes="30vw" className="object-cover" />
            </div>
          </div>
          {form}
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-5">
          <div className="max-w-2xl space-y-4">
            <Eyebrow>Why choose Bright Way?</Eyebrow>
            <Heading lead="Your dream smile," accent="without the risk" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((w, i) => (
              <article key={w.title} className="rounded-[2rem] bg-white p-8">
                <span className="font-display text-5xl font-semibold text-gold-soft">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-extrabold text-brown-dark">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{w.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <Eyebrow>Benefits of our Virtual Smile Design</Eyebrow>
              <Heading lead="See it" accent="before you commit" />
            </div>
            <ul className="space-y-5">
              {benefits.map((b) => (
                <li key={b.title} className="flex gap-4 border-t border-line pt-5">
                  <span className="bg-gold-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"><Check /></span>
                  <div>
                    <p className="font-extrabold text-brown-dark">{b.title}</p>
                    <p className="text-sm leading-relaxed">{b.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gold-gradient space-y-4 rounded-[2.25rem] p-10 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">Limited time offer</p>
            <p className="font-display text-6xl font-semibold">10% discount</p>
            <p className="leading-relaxed text-white/90">
              The 10% discount on dental implants is available for a limited time only. We have a limited number of slots available for this special offer — don&apos;t miss out on the chance to transform your smile at an unbeatable price.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-5">
          <Heading lead="How to" accent="Get Started" />
          <ol className="grid gap-5 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="relative rounded-[2rem] bg-white p-8">
                <span className="bg-gold-gradient flex h-12 w-12 items-center justify-center rounded-full font-extrabold text-white">{i + 1}</span>
                <h3 className="mt-5 text-lg font-extrabold text-brown-dark">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mx-auto max-w-xl">{form}</div>
        </div>
      </section>
      <Videos />
    </>
  );
}
