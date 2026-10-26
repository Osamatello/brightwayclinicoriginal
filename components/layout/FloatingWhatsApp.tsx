"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { clinic } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui";

/** Floating WhatsApp button. On the homepage it waits until the hero is scrolled past (it would cover the hero's trust card). */
export default function FloatingWhatsApp() {
  const isHome = usePathname() === "/";
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const hidden = isHome && !pastHero;
  return (
    <a
      href={clinic.whatsapp}
      aria-label="Chat on WhatsApp"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={`fixed bottom-5 right-5 z-30 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-bold text-white shadow-xl transition duration-300 hover:scale-105 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      <WhatsAppIcon /> WhatsApp
    </a>
  );
}
