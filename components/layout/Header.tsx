import Image from "next/image";
import Link from "next/link";
import { clinic, nav } from "@/content/site";
import { GoldButton } from "@/components/ui";
import MobileMenu from "@/components/layout/MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40">
      {/* top bar from lg up; below that the numbers and hours live in the menu (MobileMenu) */}
      <div className="hidden bg-brown text-[13px] text-white/80 lg:block">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2">
          <div className="flex flex-wrap gap-x-5">
            <a href={`tel:${clinic.phone}`} className="hover:text-gold-light">{clinic.phoneDisplay}</a>
            <a href={`tel:${clinic.landline}`} className="hover:text-gold-light">{clinic.landlineDisplay}</a>
            <span>{clinic.address}</span>
          </div>
          <span>{clinic.hours}</span>
        </div>
      </div>
      <div className="relative border-b border-line bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <Link href="/" aria-label={clinic.name}>
            {/* logo-trimmed.png = logo.png without its empty margin, so the mark itself shows larger */}
            <Image src="/images/logo-trimmed.png" alt={clinic.name} width={2636} height={774} priority sizes="200px" className="h-12 w-auto md:h-14" />
          </Link>
          <nav aria-label="Main" className="hidden gap-x-6 whitespace-nowrap text-sm font-semibold text-brown-dark xl:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-gold-dark">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-4 whitespace-nowrap xl:flex">
            <Link href="/ar/" lang="ar" className="text-sm font-bold text-gold-dark hover:text-brown-dark">
              العربية
            </Link>
            <GoldButton href="/contact-us/">Book an Appointment</GoldButton>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
