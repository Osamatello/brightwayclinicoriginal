"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import "./header-over-hero.css";

/**
 * The <header> element. On the home page (EN + AR) it floats over the hero video and stays see-through
 * until the hero has scrolled away under it, then turns back to the normal cream bar (Osama, 2026-11-12).
 * Every other page keeps the normal sticky cream header. Colours for the see-through state: header-over-hero.css.
 */
export default function HeaderFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const home = pathname === "/" || pathname === "/ar" || pathname === "/ar/";
  const [clear, setClear] = useState(home);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const header = document.querySelector<HTMLElement>("header[data-site-header]");
    if (!home || !hero || !header) {
      setClear(false);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      setClear(hero.getBoundingClientRect().bottom > header.offsetHeight);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [home]);

  return (
    <header data-site-header="" data-home={home || undefined} data-clear={clear || undefined} className="sticky top-0 z-40">
      {children}
    </header>
  );
}
