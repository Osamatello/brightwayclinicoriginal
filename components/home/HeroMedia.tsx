"use client";

import { useI18n } from "@/lib/i18n-client";
import { useEffect, useRef, useState } from "react";

/** Phones (narrow screens) get the vertical cut of the clinic video, wider screens the landscape cut. */
const PHONE = "(max-width: 767px)";

export type HeroVideo = { portrait: string; landscape: string; portraitPoster: string; landscapePoster: string };

/**
 * Full-frame hero background: the clinic video (muted, looping) with a pause button.
 * The poster sits underneath as a normal picture (it is the first thing visitors see), the video plays over it.
 */
export default function HeroMedia({ video: clip, alt }: { video: HeroVideo; alt: string }) {
  const { t } = useI18n();
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    // respect "reduce motion": start paused, the visitor can still press play
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.current?.pause();
      setPlaying(false);
    }
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <picture>
        <source media={PHONE} srcSet={clip.portraitPoster} />
        {/* eslint-disable-next-line @next/next/no-img-element -- art-directed poster (two crops), not resizable by next/image */}
        <img src={clip.landscapePoster} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      </picture>
      <video ref={video} autoPlay muted loop playsInline aria-label={t(alt)} className="absolute inset-0 h-full w-full object-cover">
        <source media={PHONE} src={clip.portrait} type="video/mp4" />
        <source src={clip.landscape} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute end-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30 md:end-7 md:top-7"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          {playing ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5.5v13l11-6.5z" />}
        </svg>
      </button>
    </>
  );
}
