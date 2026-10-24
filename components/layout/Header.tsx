import Image from "next/image";
import Link from "next/link";
import { clinic, nav } from "@/content/site";
import { GoldButton } from "@/components/ui";

export default function Header() {
  return (
    <header className="sticky top-0 z-40">
      <div className="bg-brown text-[13px] text-white/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2">
          <div className="flex flex-wrap gap-x-5">
            <a href={`tel:${clinic.phone}`} className="hover:text-gold-light">{clinic.phoneDisplay}</a>
            <a href={`tel:${clinic.landline}`} className="hover:text-gold-light">{clinic.landlineDisplay}</a>
            <span className="hidden sm:inline">{clinic.address}</span>
          </div>
          <span>{clinic.hours}</span>
        </div>
      </div>
      <div className="border-b border-line bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-3">
          <Link href="/" aria-label={clinic.name}>
            <Image src="/images/logo.png" alt={clinic.name} width={2953} height={1135} priority className="h-11 w-auto" />
          </Link>
          <nav aria-label="Main" className="order-3 flex w-full flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-brown-dark lg:order-none lg:w-auto">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-gold-dark">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/ar/" lang="ar" className="text-sm font-bold text-gold-dark hover:text-brown-dark">
              العربية
            </Link>
            <GoldButton href="/contact-us/">Book an Appointment</GoldButton>
          </div>
        </div>
      </div>
    </header>
  );
}
