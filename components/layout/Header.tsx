import Image from "next/image";
import Link from "next/link";
import { clinic } from "@/content/site";
import { postsEn, servicesEn } from "@/lib/content";
import { GoldButton } from "@/components/ui";
import MobileMenu from "@/components/layout/MobileMenu";
import NavLinks from "@/components/layout/NavLinks";

export default function Header() {
  const sections = {
    "/about/": ["/dr-hasan-a-mahdy/", "/career/"],
    "/services/": servicesEn().map((e) => e.path),
    "/blog/": postsEn().map((e) => e.path),
  };
  // Filled in here on the server, so the article list isn't added to the menu's browser code twice
  const lists = { "/blog/": postsEn().map((e) => ({ label: e.title, href: e.path })) };
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
      <div className="relative border-b border-line bg-cream">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <Link href="/" aria-label={clinic.name}>
            {/* logo-trimmed.png = logo.png without its empty margin, so the mark itself shows larger */}
            <Image src="/images/logo-trimmed.png" alt={clinic.name} width={2636} height={774} priority sizes="200px" className="h-12 w-auto md:h-14" />
          </Link>
          <NavLinks sections={sections} lists={lists} />
          <div className="hidden items-center gap-4 whitespace-nowrap xl:flex">
            <Link href="/ar/" lang="ar" className="text-sm font-bold text-gold-dark hover:text-brown-dark">
              العربية
            </Link>
            <GoldButton href="/contact-us/">Book an Appointment</GoldButton>
          </div>
          <MobileMenu sections={sections} lists={lists} />
        </div>
      </div>
    </header>
  );
}
