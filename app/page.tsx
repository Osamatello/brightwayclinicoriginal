import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
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
import { clinic } from "@/content/site";

// Same title / description / canonical as the current homepage (from Yoast)
export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
  alternates: { canonical: "/", languages: { en: "/", ar: "/ar/" } },
  openGraph: { title: homeSeo.title, description: homeSeo.description, url: "/", images: ["/images/logo.png"], type: "website" },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DentalClinic",
      "@id": `${clinic.url}/#clinic`,
      name: clinic.name,
      url: `${clinic.url}/`,
      logo: `${clinic.url}/images/logo.png`,
      image: `${clinic.url}/images/logo.png`,
      telephone: clinic.phone,
      priceRange: "$$",
      address: { "@type": "PostalAddress", streetAddress: "Ithraa Tower, Office 802, Al Garhoud", addressLocality: "Dubai", addressCountry: "AE" },
      geo: { "@type": "GeoCoordinates", latitude: clinic.geo.lat, longitude: clinic.geo.lng },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], opens: "11:00", closes: "20:00" },
      ],
      sameAs: Object.values(clinic.social),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Hero />
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
