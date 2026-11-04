import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import SiteShell, { siteMetadata } from "@/components/layout/SiteShell";

// Declared per language, so English pages never download the Arabic fonts
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata = siteMetadata;

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteShell lang="en" fonts={`${manrope.variable} ${cormorant.variable}`}>{children}</SiteShell>;
}
