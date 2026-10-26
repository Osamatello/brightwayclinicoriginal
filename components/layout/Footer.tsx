import Image from "next/image";
import Link from "next/link";
import { clinic, nav } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui";

export default function Footer() {
  return (
    <>
      <footer className="bg-brown text-white/70">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-5">
            <span className="inline-block rounded-2xl bg-white px-4 py-3">
              <Image src="/images/logo.png" alt={clinic.name} width={2953} height={1135} className="h-10 w-auto" />
            </span>
            <p className="font-display text-2xl italic text-gold-light">Good health begins with dental health.</p>
            <p className="max-w-sm text-sm leading-relaxed">
              Stay connected with Bright Way Dental Clinic through our social media channels for the latest updates, dental tips, and special offers.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 content-start gap-3 text-sm">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-white hover:text-gold-light">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="space-y-3 text-sm">
            <p>{clinic.address}</p>
            <p>{clinic.hours}</p>
            <p>
              <a href={`tel:${clinic.phone}`} className="text-white hover:text-gold-light">{clinic.phoneDisplay}</a> ·{" "}
              <a href={`tel:${clinic.landline}`} className="text-white hover:text-gold-light">{clinic.landlineDisplay}</a>
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {Object.entries(clinic.social).map(([name, href]) => (
                <a key={name} href={href} className="rounded-full border border-white/15 px-4 py-2 capitalize text-gold-light hover:bg-white/5">
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">© {new Date().getFullYear()} {clinic.name}, Dubai</div>
      </footer>
      <a
        href={clinic.whatsapp}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-30 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-bold text-white shadow-xl transition hover:scale-105"
      >
        <WhatsAppIcon /> WhatsApp
      </a>
    </>
  );
}
