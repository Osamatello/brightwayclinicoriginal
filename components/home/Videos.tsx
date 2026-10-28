"use client";

import { useState } from "react";
import Image from "next/image";
import { videos } from "@/content/home";
import { clinic } from "@/content/site";
import { Arrow, GoldButton, PlayIcon } from "@/components/ui";
import styles from "./Videos.module.css";

/**
 * Dr. Hasan's YouTube videos: one on the stage, the rest in a playlist.
 * The video plays on the page, but the YouTube player (youtube-nocookie) only loads after the visitor presses play.
 */
export default function Videos() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const v = videos[active];
  const thumb = (id: string) => `/images/videos/${id}.webp`;

  return (
    <section id="videos" aria-labelledby="videos-heading" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="videos-heading" className={styles.heading}>
            Watch &amp; learn about <span>your treatment</span>
          </h2>
          <GoldButton href={clinic.social.youtube}>
            Subscribe <Arrow />
          </GoldButton>
        </header>

        <div className={styles.layout}>
          <div className={styles.feature}>
            <div className={styles.stage}>
              <Image key={`bg-${v.id}`} src={thumb(v.id)} alt="" fill sizes="(min-width: 900px) 60vw, 100vw" className={styles.ambient} />
              <span key={`screen-${v.id}`} className={styles.screen}>
                {playing ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&playsinline=1`}
                    title={v.title}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    className={styles.player}
                  />
                ) : (
                  <button type="button" onClick={() => setPlaying(true)} className={styles.cover} aria-label={`Play: ${v.title}`}>
                    <Image src={thumb(v.id)} alt={v.title} fill sizes="(min-width: 900px) 640px, 92vw" className={styles.screenImg} />
                    <span className={styles.play}><PlayIcon className={styles.playIcon} /></span>
                  </button>
                )}
              </span>
            </div>
            <div className={styles.caption}>
              <span className={styles.lang}>{v.lang}</span>
              <p className={styles.title}>{v.title}</p>
            </div>
          </div>

          {/* Playlist scrolls inside the column so it never grows taller than the stage */}
          <div className={styles.listWrap}>
            <ul className={styles.list}>
              {videos.map((item, i) => (
                <li key={item.id}>
                  <button type="button" aria-pressed={i === active} onClick={() => setActive(i)} className={styles.row}>
                    <span className={styles.thumb}>
                      <Image src={thumb(item.id)} alt="" fill sizes="(min-width: 900px) 112px, 60vw" className={styles.thumbImg} />
                      <PlayIcon className={styles.thumbPlay} />
                    </span>
                    <span className={styles.rowText}>
                      <span className={styles.rowTitle}>{item.title}</span>
                      <span className={styles.lang}>{item.lang}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
