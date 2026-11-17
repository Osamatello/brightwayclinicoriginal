"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Plays every muted reel loop inside while the row is on screen and pauses them when it leaves.
 * Nothing downloads before the row comes near (videos use preload="none"); reduced-motion visitors keep the posters.
 */
export default function ReelsAutoplay({ className, dir, children }: { className?: string; dir?: "ltr" | "rtl"; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const videos = [...root.querySelectorAll("video")];
    const observer = new IntersectionObserver(
      ([entry]) => {
        for (const v of videos) {
          if (entry.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }
      },
      { rootMargin: "120px 0px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} dir={dir} className={className}>
      {children}
    </div>
  );
}
