import type { ReactNode } from "react";
import { Amiri, Cairo } from "next/font/google";
import SiteShell, { siteMetadata } from "@/components/layout/SiteShell";
import ArabicDictionary from "@/components/layout/ArabicDictionary";

// Cairo for text, Amiri for headings. Declared per language, so Arabic pages never download the English fonts
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-amiri", display: "swap" });

export const metadata = siteMetadata;

export default function ArabicLayout({ children }: { children: ReactNode }) {
  return <SiteShell lang="ar" fonts={`${cairo.variable} ${amiri.variable}`} dictionary={ArabicDictionary}>{children}</SiteShell>;
}
