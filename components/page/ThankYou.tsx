import { clinic } from "@/content/site";
import { Check, GoldButton, OutlineButton, WhatsAppIcon } from "@/components/ui";
import { PixelEvents } from "@/components/tracking/MetaPixel";

const conversionEvents = ["Lead", "CompleteRegistration"];

/** Thank-you page shown after a landing-page form (the "-typ" URLs used by the ad campaigns). */
export default function ThankYou({ message }: { message: string }) {
  return (
    <section className="relative overflow-hidden bg-cream px-5 py-28">
      <PixelEvents events={conversionEvents} />
      <div aria-hidden="true" className="absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
      <div className="relative mx-auto max-w-2xl space-y-7 text-center">
        <span className="bg-gold-gradient mx-auto flex h-20 w-20 items-center justify-center rounded-full text-white ring-[12px] ring-gold/20">
          <Check className="h-9 w-9" />
        </span>
        <h1 className="text-4xl font-extrabold leading-tight text-brown-dark md:text-5xl">
          Thank You for Choosing <span className="font-display italic text-gold">Bright Way Dental Clinic!</span>
        </h1>
        <p className="text-lg leading-relaxed">{message}</p>
        <p className="leading-relaxed">
          Our team will contact you shortly via WhatsApp or email. In the meantime, if you have any questions or need further assistance, feel free to reach out to us.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <OutlineButton href={clinic.whatsapp}>
            <WhatsAppIcon /> WhatsApp us
          </OutlineButton>
          <GoldButton href="/">Back to the website</GoldButton>
        </div>
      </div>
    </section>
  );
}
