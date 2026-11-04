"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

/** Smooth mouse-wheel scrolling on every page (Lenis, same as the reference site). Off for visitors who ask for reduced motion. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.065, wheelMultiplier: 0.9, anchors: { offset: -120 } });
    return () => lenis.destroy();
  }, []);
  return null;
}
