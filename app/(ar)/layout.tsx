import type { ReactNode } from "react";
import { Amiri, Cairo } from "next/font/google";
import SiteShell, { siteMetadata } from "@/components/layout/SiteShell";

// Cairo for text, Amiri for headings. Declared per language, so Arabic pages never download the English fonts
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });
// not preloaded: it is a heavy font and only headings use it, so it must not hold up the first paint
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-amiri", display: "swap", preload: false });

export const metadata = siteMetadata;

export default function ArabicLayout({ children }: { children: ReactNode }) {
  return <SiteShell lang="ar" fonts={`${cairo.variable} ${amiri.variable}`}>{children}</SiteShell>;
}
