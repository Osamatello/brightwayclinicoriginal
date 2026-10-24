import Image from "next/image";
import { clinic } from "@/content/site";
import { GoldButton, OutlineButton } from "@/components/ui";

export default function Cta() {
  return (
    <section className="bg-white px-5 pb-24">
      <div className="bg-gold-gradient relative mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] md:grid-cols-[1.3fr_1fr]">
        <div aria-hidden="true" className="absolute -left-20 -top-20 h-80 w-80 rounded-full border border-white/20" />
        <div className="relative space-y-6 p-10 text-white md:p-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">Book an Appointment</p>
          <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Become The Next <span className="font-display italic">Our Happy Client</span>
          </h2>
          <p className="max-w-md text-white/85">Our best dentists in Dubai are ready to provide you with top-tier care tailored to your needs.</p>
          <div className="flex flex-wrap gap-3">
            <GoldButton href="/contact-us/" className="!bg-none bg-brown">Get Dental Consultation</GoldButton>
            <OutlineButton href={`tel:${clinic.phone}`} light>{clinic.phoneDisplay}</OutlineButton>
          </div>
        </div>
        <div className="relative min-h-80">
          <Image src="/images/cta-dr.jpeg" alt="Dr. Hasan A. Mahdy at Bright Way Dental Clinic" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-top" />
        </div>
      </div>
    </section>
  );
}
