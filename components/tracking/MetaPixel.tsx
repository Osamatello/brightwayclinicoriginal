"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Same Meta Pixel as the old site (Header Footer Code Manager snippets 1 + 2, backup 2026-10-23).
export const META_PIXEL_ID = "1528730534678426";
// Fires only on the real domain, so preview / localhost visits never reach the clinic's ad data.
const LIVE_HOST = "brightway.clinic";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const snippet = `if(location.hostname==="${LIVE_HOST}"){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');}`;

/** Loads the pixel once (PageView) and sends a PageView on every client-side page change, like the old full page loads did. */
export default function MetaPixel() {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false; // the first PageView is sent by the snippet itself
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);
  return <Script id="meta-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: snippet }} />;
}

/** Conversion events for a page (old site: Lead + CompleteRegistration on the landing-page thank-you pages). */
export function PixelEvents({ events }: { events: string[] }) {
  useEffect(() => {
    let tries = 0;
    // the pixel snippet loads after hydration, so wait for it (it never loads off the live domain)
    const timer = setInterval(() => {
      if (window.fbq) events.forEach((e) => window.fbq?.("track", e));
      if (window.fbq || ++tries > 25) clearInterval(timer);
    }, 200);
    return () => clearInterval(timer);
  }, [events]);
  return null;
}
