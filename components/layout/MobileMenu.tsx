"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { clinic, nav } from "@/content/site";
import { Arrow, GoldButton, WhatsAppIcon } from "@/components/ui";

const iconButton = "flex h-11 w-11 items-center justify-center rounded-full";

/** Below xl (1280px): call button + menu button that opens the full menu under the header. */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden"; // page behind the menu must not scroll
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // any link in the panel closes it (also same-page links like /#services)
  const closeOnLink = (e: MouseEvent) => (e.target as HTMLElement).closest("a") && setOpen(false);

  return (
    <div className="flex items-center gap-2 xl:hidden">
      <a href={`tel:${clinic.phone}`} aria-label={`Call ${clinic.phoneDisplay}`} className={`${iconButton} border border-line text-gold-dark`}>
        <PhoneIcon />
      </a>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className={`${iconButton} bg-gold-gradient text-white shadow-[0_10px_30px_-12px_rgba(125,97,32,0.8)]`}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open && (
        <div
          id="mobile-menu"
          onClick={closeOnLink}
          className="absolute inset-x-0 top-full h-[calc(100dvh-73px)] overflow-y-auto border-t border-line bg-cream px-5 pb-12 pt-2 md:h-[calc(100dvh-81px)] lg:h-[calc(100dvh-117px)]"
        >
          <nav aria-label="Main" className="flex flex-col">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center justify-between border-b border-line py-4 text-lg font-bold text-brown-dark">
                {item.label} <Arrow className="h-4 w-4 text-gold-dark" />
              </Link>
            ))}
            <Link href="/ar/" lang="ar" dir="rtl" className="border-b border-line py-4 text-lg font-bold text-gold-dark">
              العربية
            </Link>
          </nav>
          <GoldButton href="/contact-us/" className="mt-6 w-full">
            Book an Appointment
          </GoldButton>
          <div className="mt-8 space-y-2 text-sm text-ink">
            <a href={`tel:${clinic.phone}`} className="block font-bold text-brown-dark">{clinic.phoneDisplay}</a>
            <a href={`tel:${clinic.landline}`} className="block font-bold text-brown-dark">{clinic.landlineDisplay}</a>
            <p>{clinic.hours}</p>
            <p>{clinic.address}</p>
            <a href={clinic.whatsapp} className="inline-flex items-center gap-2 pt-2 font-bold text-gold-dark">
              <WhatsAppIcon /> WhatsApp us
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
