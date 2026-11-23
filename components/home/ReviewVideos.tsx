"use client";

import { useRef, useState } from "react";
import styles from "./Testimonials.module.css";

/** Patient video reviews: one plays at a time; the gold play button starts it with sound. */
export default function ReviewVideos({ label, playLabel }: { label: string; playLabel: string }) {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playing, setPlaying] = useState<number | null>(null);
  const clips = [1, 2, 3, 4, 5];

  const play = (i: number) => {
    refs.current.forEach((v, j) => { if (v && j !== i) v.pause(); });
    refs.current[i]?.play();
  };

  return (
    <div className={styles.videos} aria-label={label} role="group">
      {clips.map((n, i) => (
        <div key={n} className={styles.video} data-playing={playing === i || undefined}>
          <video
            ref={(el) => { refs.current[i] = el; }}
            src={`/videos/reviews/client-${n}.mp4`}
            poster={`/videos/reviews/client-${n}.webp`}
            preload="none"
            playsInline
            controls={playing === i}
            onPlay={() => { refs.current.forEach((v, j) => { if (v && j !== i) v.pause(); }); setPlaying(i); }}
            onPause={() => setPlaying((p) => (p === i ? null : p))}
            onEnded={() => setPlaying((p) => (p === i ? null : p))}
          />
          {playing !== i && (
            <button type="button" className={styles.play} onClick={() => play(i)} aria-label={`${playLabel} ${n}`}>
              <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
