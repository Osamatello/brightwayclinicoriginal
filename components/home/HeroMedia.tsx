"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Full-frame hero background: the clinic video (muted, looping) with a pause button,
 * or — until the video file exists — the poster photo with a slow zoom.
 */
export default function HeroMedia({ videoSrc, poster, alt }: { videoSrc?: string; poster: string; alt: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    // respect "reduce motion": start paused, the visitor can still press play
    if (videoSrc && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.current?.pause();
      setPlaying(false);
    }
  }, [videoSrc]);

  if (!videoSrc) {
    return <Image src={poster} alt={alt} fill priority sizes="100vw" className="animate-hero-zoom object-cover object-[35%_center]" />;
  }

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
      <video ref={video} src={videoSrc} poster={poster} autoPlay muted loop playsInline aria-label={alt} className="absolute inset-0 h-full w-full object-cover" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30 md:right-7 md:top-7"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          {playing ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5.5v13l11-6.5z" />}
        </svg>
      </button>
    </>
  );
}
