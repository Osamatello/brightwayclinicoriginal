"use client";

import { useI18n } from "@/lib/i18n-client";
import { useEffect, useRef } from "react";

/** Phones (narrow screens) get the vertical cut of the clinic video, wider screens the landscape cut. */
const PHONE = "(max-width: 767px)";

export type HeroVideo = { portrait: string; landscape: string; portraitPoster: string; landscapePoster: string };

/**
 * Full-frame hero background: the clinic video (muted, looping). No pause button (Osama, 2026-11-14);
 * visitors with "reduce motion" switched on keep the still poster.
 * The poster sits underneath as a normal picture (it is the first thing visitors see), the video plays over it.
 */
export default function HeroMedia({ video: clip, alt }: { video: HeroVideo; alt: string }) {
  const { t } = useI18n();
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // respect "reduce motion": stay on the poster
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Start the video only after the page has loaded and the browser is idle: downloading and decoding it
    // together with the page's own files blocked phones for ~3 s (Lighthouse 87 → 60, 2026-11-12). The poster shows meanwhile.
    let cancelled = false;
    const start = () => {
      if (cancelled || !video.current) return;
      video.current.load();
      void video.current.play().catch(() => {});
    };
    const whenIdle = () => ("requestIdleCallback" in window ? window.requestIdleCallback(start, { timeout: 2500 }) : globalThis.setTimeout(start, 1200));
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", whenIdle);
    };
  }, []);

  return (
    <>
      <picture>
        <source media={PHONE} srcSet={clip.portraitPoster} />
        {/* eslint-disable-next-line @next/next/no-img-element -- art-directed poster (two crops), not resizable by next/image */}
        <img src={clip.landscapePoster} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      </picture>
      <video ref={video} preload="none" muted loop playsInline aria-label={t(alt)} className="absolute inset-0 h-full w-full object-cover">
        <source media={PHONE} src={clip.portrait} type="video/mp4" />
        <source src={clip.landscape} type="video/mp4" />
      </video>
    </>
  );
}
