import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MetaPixel from "@/components/tracking/MetaPixel";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brightway.clinic"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}>
      <head>
        {/* here, not in metadata: each page's own `alternates` (canonical) would replace it */}
        <link rel="alternate" type="application/rss+xml" title="Bright Way Dental Clinic Blog" href="/feed/" />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <MetaPixel />
      </body>
    </html>
  );
}
