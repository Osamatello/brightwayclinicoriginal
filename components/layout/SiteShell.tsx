import type { Metadata } from "next";
import { Fragment, type ComponentType, type ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MetaPixel from "@/components/tracking/MetaPixel";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CookieNotice from "@/components/layout/CookieNotice";
import { l, setLang, t } from "@/lib/i18n";
import { SiteSchema } from "@/lib/schema";
import type { Lang } from "@/lib/i18n-data";
import "@/app/globals.css";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://brightway.clinic"),
  // Search Console ownership (brightwayclinic2021@gmail.com, HTML-tag method, added to the old site 2026-10-26):
  // must stay on the new site or the property loses verification after launch
  verification: { google: "0sqU7n0kCs14QnVNRL9Dzqzcz-JGZmFSA461wxluc5U" },
};

/** The page frame for one language: `<html>`, header, footer and everything around the page. */
export default function SiteShell({
  lang,
  fonts,
  dictionary: Dictionary = Fragment,
  children,
}: {
  lang: Lang;
  fonts: string;
  /** Arabic layout only: gives client components the dictionary (see ArabicDictionary) */
  dictionary?: ComponentType<{ children: ReactNode }>;
  children: ReactNode;
}) {
  setLang(lang);
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className={fonts}>
      <head>
        {/* here, not in metadata: each page's own `alternates` (canonical) would replace it */}
        <link rel="alternate" type="application/rss+xml" title={t("Bright Way Dental Clinic Blog")} href={l("/feed/")} />
        {/* the heading font's regular Arabic file only (the hero heading); bold and Latin load when used */}
        {/* low priority since the hero video (2026-11-12): the poster picture is now the largest paint and must not wait behind this font; the heading shows in the fallback font until it arrives (font-display: swap) */}
        {lang === "ar" && <link rel="preload" href="/fonts/amiri-400-arabic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" fetchPriority="low" />}
      </head>
      <body className="antialiased">
        <SiteSchema />
        <Dictionary>
          <Header />
          <main>{children}</main>
          <Footer />
          <MetaPixel />
          <SmoothScroll />
          <CookieNotice />
        </Dictionary>
      </body>
    </html>
  );
}
