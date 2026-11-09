import type { ReactNode } from "react";
import { Cairo } from "next/font/google";
import SiteShell, { siteMetadata } from "@/components/layout/SiteShell";
import ArabicDictionary from "@/components/layout/ArabicDictionary";

// Cairo for text (declared here, so English pages never download it). Amiri, for headings, is self-hosted: see globals.css
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });

export const metadata = siteMetadata;

export default function ArabicLayout({ children }: { children: ReactNode }) {
  return <SiteShell lang="ar" fonts={cairo.variable} dictionary={ArabicDictionary}>{children}</SiteShell>;
}
