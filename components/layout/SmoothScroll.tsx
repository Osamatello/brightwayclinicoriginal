"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

/** Smooth mouse-wheel scrolling on every page (Lenis, same as the reference site). Off for visitors who ask for reduced motion. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // started once the page has loaded and the browser is idle, so it never competes with loading the page
    let lenis: Lenis | undefined;
    let idle = 0;
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      lenis = new Lenis({ autoRaf: true, lerp: 0.065, wheelMultiplier: 0.9, anchors: { offset: -120 } });
    };
    const whenIdle = () => {
      idle = "requestIdleCallback" in window ? window.requestIdleCallback(start, { timeout: 1500 }) : globalThis.setTimeout(start, 300) as unknown as number;
    };
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", whenIdle);
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      else globalThis.clearTimeout(idle);
      lenis?.destroy();
    };
  }, []);
  return null;
}
