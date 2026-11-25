"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Testimonials.module.css";

/**
 * Patient video reviews, Instagram style: every clip loops silently while it is on screen.
 * Tapping a clip restarts it from the beginning with sound (and silences the others);
 * tapping it again, or reaching the end, puts it back to the silent loop.
 */
export default function ReviewVideos({ label, playLabel }: { label: string; playLabel: string }) {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const [sound, setSound] = useState<number | null>(null);
  const clips = [1, 2, 3, 4, 5];

  // Play silently only while visible, so off-screen clips don't use data or battery.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) v.play().catch(() => {});
        else if (v.muted) v.pause();
      }),
      { threshold: 0.4 },
    );
    refs.current.forEach((v) => v && io.observe(v));
    return () => io.disconnect();
  }, []);

  const toSilent = (v: HTMLVideoElement) => { v.muted = true; v.loop = true; };

  const tap = (i: number) => {
    const v = refs.current[i];
    if (!v) return;
    if (sound === i) { toSilent(v); setSound(null); return; }
    refs.current.forEach((o, j) => { if (o && j !== i) toSilent(o); });
    v.loop = false;
    v.currentTime = 0;
    v.muted = false;
    v.play().catch(() => {});
    setSound(i);
  };

  return (
    <div className={styles.videos} aria-label={label} role="group">
      {clips.map((n, i) => (
        <div key={n} className={styles.video} data-sound={sound === i || undefined}>
          <video
            ref={(el) => { refs.current[i] = el; }}
            src={`/videos/reviews/client-${n}.mp4`}
            poster={`/videos/reviews/client-${n}.webp`}
            preload="metadata"
            muted
            loop
            playsInline
            onEnded={(e) => { toSilent(e.currentTarget); e.currentTarget.play().catch(() => {}); setSound((s) => (s === i ? null : s)); }}
          />
          <button type="button" className={styles.play} onClick={() => tap(i)} aria-label={`${playLabel} ${n}`} aria-pressed={sound === i}>
            {sound !== i && (
              <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
            )}
            <span className={styles.mute} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14">
                <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
                {sound === i
                  ? <path d="M15.5 9a4.5 4.5 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  : <path d="M15.5 9.5l5 5m0-5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
              </svg>
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}
