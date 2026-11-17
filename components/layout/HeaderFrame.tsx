"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import "./header-over-hero.css";

/**
 * The <header> element. It is not sticky: it scrolls away with the page (review feedback, 17 Nov 2026).
 * On the home page (EN + AR) it sits see-through over the top of the hero video. Colours for that state: header-over-hero.css.
 */
export default function HeaderFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const home = pathname === "/" || pathname === "/ar" || pathname === "/ar/";
  return (
    <header data-site-header="" data-home={home || undefined} data-clear={home || undefined} className="relative z-40">
      {children}
    </header>
  );
}
