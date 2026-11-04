import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Amiri, Cairo, Cormorant_Garamond, Manrope } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MetaPixel from "@/components/tracking/MetaPixel";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CookieNotice from "@/components/layout/CookieNotice";
import { l, setLang, t } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n-data";
import "@/app/globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
// Arabic pages: Cairo for text, Amiri for headings
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });
const amiri = Amiri({ subsets: ["arabic", "latin"], weight: ["400", "700"], variable: "--font-amiri", display: "swap" });

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://brightway.clinic"),
  // Search Console ownership (brightwayclinic2021@gmail.com, HTML-tag method, added to the old site 2026-10-26):
  // must stay on the new site or the property loses verification after launch
  verification: { google: "0sqU7n0kCs14QnVNRL9Dzqzcz-JGZmFSA461wxluc5U" },
};

/** The page frame for one language: `<html>`, header, footer and everything around the page. */
export default function SiteShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  setLang(lang);
  const fonts = lang === "ar" ? `${cairo.variable} ${amiri.variable}` : `${manrope.variable} ${cormorant.variable}`;
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className={fonts}>
      <head>
        {/* here, not in metadata: each page's own `alternates` (canonical) would replace it */}
        <link rel="alternate" type="application/rss+xml" title={t("Bright Way Dental Clinic Blog")} href={l("/feed/")} />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <MetaPixel />
        <SmoothScroll />
        <CookieNotice />
      </body>
    </html>
  );
}
