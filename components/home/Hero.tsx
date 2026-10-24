import Image from "next/image";
import { clinic } from "@/content/site";
import { GoldButton, OutlineButton, PlayIcon, WhatsAppIcon } from "@/components/ui";

const marquee = ["Dental Implants", "Veneers", "Hollywood Smile", "Invisalign", "Teeth Whitening", "Digital Smile Design", "Same-day Crowns", "Pediatric Dentistry"];

/** Hero: text on the side, video on the other. The video file is not ready yet — `videoSrc` stays empty until the client sends it. */
export default function Hero({ videoSrc }: { videoSrc?: string }) {
  return (
    <section className="relative overflow-hidden bg-brown text-white">
      <div aria-hidden="true" className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-gold/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-end gap-14 px-5 pt-16 lg:grid-cols-[1fr_1.15fr]">
        <div className="space-y-7 pb-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-light">Good Health Begins With Dental Health</p>
          <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
            <span className="font-display font-semibold italic text-gold-light">Bright Way</span> Dental Clinic in Dubai
          </h1>
          <p className="text-lg font-semibold text-white/90">Your Reliable Digital Dentistry in Dubai and Modern comforting smiles.</p>
          <p className="max-w-xl leading-relaxed text-white/70">
            Specializing in both aesthetic and health-focused treatments, our clinic combines expert care with advanced technology for unmatched dental excellence.
          </p>
          <div className="flex flex-wrap gap-3">
            <GoldButton href="/contact-us/">Get Dental Consultation</GoldButton>
            <OutlineButton href={clinic.whatsapp} light>
              <WhatsAppIcon /> Get In Touch
            </OutlineButton>
          </div>
          <dl className="grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {[
              ["2013", "Serving Dubai since"],
              ["30+", "Years of Dr. Hasan's experience"],
              ["DHA", "Licensed dentists"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-4xl font-semibold text-gold-light">{value}</dd>
                <dd className="text-xs text-white/60">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="arch absolute -left-4 -top-4 bottom-0 right-4 border border-gold/50" />
          <div className="arch relative aspect-[4/4.5] overflow-hidden bg-brown-soft">
            {videoSrc ? (
              <video src={videoSrc} className="h-full w-full object-cover" autoPlay muted loop playsInline />
            ) : (
              <>
                <Image src="/images/bg-clinic.jpg" alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-30" priority />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <span className="bg-gold-gradient flex h-24 w-24 items-center justify-center rounded-full text-white ring-[14px] ring-gold/20">
                    <PlayIcon className="h-9 w-9" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-light">Clinic video — coming soon</span>
                </div>
              </>
            )}
          </div>
          <div className="absolute -left-6 bottom-10 flex items-center gap-3 rounded-2xl bg-white p-4 pr-6 text-brown-dark shadow-2xl">
            <Image src="/images/dr-hasan.jpg" alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover object-top" />
            <div>
              <p className="text-sm font-extrabold">Same-day crowns</p>
              <p className="text-xs text-ink">CAD/CAM digital dentistry</p>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="bg-gold-gradient overflow-hidden py-4">
        <div className="animate-marquee flex w-max gap-14 whitespace-nowrap font-display text-2xl font-semibold italic text-white">
          {[...marquee, ...marquee].map((item, i) => (
            <span key={i}>{item} ✦</span>
          ))}
        </div>
      </div>
    </section>
  );
}
