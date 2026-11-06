import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import SmileScene from "@/components/home/SmileScene";
import WhyUs from "@/components/home/WhyUs";
import Doctors from "@/components/home/Doctors";
import BeforeAfter from "@/components/home/BeforeAfter";
import Digital from "@/components/home/Digital";
import CareAndOffer from "@/components/home/CareAndOffer";
import Testimonials from "@/components/home/Testimonials";
import { About, Insurance } from "@/components/home/AboutInsurance";
import Cta from "@/components/home/Cta";
import Faq from "@/components/home/Faq";
import { Instagram, Videos } from "@/components/home/Media";
import Contact from "@/components/home/Contact";
import { faqs, homeSeo } from "@/content/home";
import { JsonLd, ldText } from "@/lib/schema";

// Same title / description / canonical as the current homepage (from Yoast)
export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
  alternates: { canonical: "/", languages: { en: "/", ar: "/ar/" } },
  openGraph: { title: homeSeo.title, description: homeSeo.description, url: "/", images: ["/images/share-default.jpg"], type: "website", locale: "en_AE" },
};


export default function HomePage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: ldText(f.q), acceptedAnswer: { "@type": "Answer", text: ldText(f.a) } })) }} />
      <Hero />
      <SmileScene />
      <Services />
      <WhyUs />
      <Doctors />
      <BeforeAfter />
      <Digital />
      <CareAndOffer />
      <Testimonials />
      <About />
      <Insurance />
      <Cta />
      <Faq />
      <Instagram />
      <Videos />
      <Contact />
    </>
  );
}
