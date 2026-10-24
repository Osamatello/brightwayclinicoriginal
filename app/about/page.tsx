import type { Metadata } from "next";
import { getById, seoMetadata } from "@/lib/content";
import { BreadcrumbSchema, PageHero, Prose } from "@/components/page/PageParts";
import { GoldButton } from "@/components/ui";
import WhyUs from "@/components/home/WhyUs";
import Doctors from "@/components/home/Doctors";
import { Insurance } from "@/components/home/AboutInsurance";
import Cta from "@/components/home/Cta";
import { aboutCards } from "@/content/home";

const ABOUT_ID = 615;

export function generateMetadata(): Metadata {
  const page = getById(ABOUT_ID);
  return page ? seoMetadata(page) : { title: "About" };
}

export default function AboutPage() {
  const page = getById(ABOUT_ID);
  return (
    <>
      <BreadcrumbSchema items={[{ name: "About", path: "/about/" }]} />
      <PageHero
        eyebrow="About us"
        title="About Bright Way Dental Clinic: Dubai's Premier Dental Care Provider"
        intro="Cutting-edge dental technology and expert care, together since 2013 — enhancing smiles with cosmetic dentistry, implants, teeth cleaning and whitening."
        crumbs={[{ label: "About" }]}
        image="/images/cta-dr.jpeg"
        imageAlt="Dr. Hasan A. Mahdy at Bright Way Dental Clinic"
      >
        <GoldButton href="/contact-us/">Book a consultation</GoldButton>
      </PageHero>

      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-3">
          {aboutCards.map((c, i) => (
            <article key={c.title} className={`relative overflow-hidden rounded-[2rem] p-9 ${i === 1 ? "bg-brown text-white/75" : "bg-white"}`}>
              <span aria-hidden="true" className="bg-gold-gradient absolute inset-x-0 top-0 h-1" />
              <span className={`font-display text-7xl font-semibold leading-none ${i === 1 ? "text-gold/40" : "text-gold-soft"}`}>{String(i + 1).padStart(2, "0")}</span>
              <h2 className={`mt-4 text-2xl font-extrabold ${i === 1 ? "text-white" : "text-brown-dark"}`}>{c.title}</h2>
              <p className="mt-3 text-sm leading-relaxed">{c.text}</p>
            </article>
          ))}
        </div>
      </section>

      {page && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-5">
            <Prose html={page.html} />
          </div>
        </section>
      )}
      <WhyUs />
      <Doctors />
      <Insurance />
      <Cta />
    </>
  );
}
