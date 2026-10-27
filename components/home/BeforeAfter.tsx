"use client";

import Image from "next/image";
import { useState, type PointerEvent } from "react";
import { smileCases, type SmileCase } from "@/content/home";
import styles from "./BeforeAfter.module.css";

const SIZES = "(min-width: 1100px) 400px, (min-width: 540px) 50vw, 100vw";
// Minimum number of cards shown; empty slots wait for the next real before/after pairs.
const GALLERY_SLOTS = 9;

function ComingSoonCard() {
  return (
    <li className={styles.card} aria-hidden="true">
      <div className={`${styles.photos} ${styles.empty}`}>
        <div className={styles.labels}><span>Before</span><span>After</span></div>
        <span className={styles.emptyLine} />
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className={styles.emptyTooth}>
          <path d="M8.6 9.5C7 5.6 9.2 2.5 12.6 2.5c1.7 0 2.3 1.3 3.4 1.3s1.7-1.3 3.4-1.3c3.4 0 5.6 3.1 4 7l-1.7 8.4-1 8.7c-.3 2.4-2.8 2.4-3.1 0L16.7 20h-1.4l-.9 6.6c-.3 2.4-2.8 2.4-3.1 0l-1-8.7Z" />
        </svg>
        <p className={styles.emptyText}>New smile<br />coming soon</p>
      </div>
    </li>
  );
}

function SmileCard({ smile, number }: { smile: SmileCase; number: number }) {
  const [position, setPosition] = useState(50);

  function moveDivider(event: PointerEvent<HTMLInputElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition(Math.round(Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100))));
  }

  return (
    <li className={styles.card}>
      <figure className={styles.photos}>
        <div className={styles.layer}>
          <Image src={smile.after} alt="" aria-hidden="true" fill sizes={SIZES} className={styles.backdrop} />
          <Image src={smile.after} alt={`Smile transformation ${number} — after treatment at Bright Way Dental Clinic`} fill sizes={SIZES} className={styles.photo} />
        </div>
        <div className={styles.layer} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={smile.before} alt="" aria-hidden="true" fill sizes={SIZES} className={styles.backdrop} />
          <Image src={smile.before} alt={`Smile transformation ${number} — before treatment`} fill sizes={SIZES} className={styles.photo} />
        </div>
        <div className={styles.labels} aria-hidden="true"><span>Before</span><span>After</span></div>
        <div className={styles.divider} style={{ left: `${position}%` }} aria-hidden="true">
          <span className={styles.handle}>
            <svg viewBox="0 0 28 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 5-5 5 5 5M19 5l5 5-5 5M14 3v14" />
            </svg>
          </span>
        </div>
        <input
          className={styles.range}
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          onPointerDown={(event) => {
            event.preventDefault();
            event.currentTarget.focus({ preventScroll: true });
            event.currentTarget.setPointerCapture(event.pointerId);
            moveDivider(event);
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) moveDivider(event);
          }}
          onPointerUp={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
          }}
          aria-label={`Compare before and after, smile transformation ${number}`}
          aria-valuetext={`${position}% before, ${100 - position}% after`}
        />
      </figure>
    </li>
  );
}

export default function BeforeAfter() {
  return (
    <section id="gallery" className={styles.section} aria-labelledby="gallery-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="gallery-heading" className={styles.heading}>
            Before and After{" "}
            <span>Dental Transformations</span>
          </h2>
          <p className={styles.intro}>Real smiles from our patients. Drag the handle on any photo to see the transformation.</p>
        </header>

        <ul className={styles.grid}>
          {smileCases.map((smile, index) => (
            <SmileCard key={smile.after} smile={smile} number={index + 1} />
          ))}
          {Array.from({ length: Math.max(0, GALLERY_SLOTS - smileCases.length) }, (_, i) => (
            <ComingSoonCard key={`slot-${i}`} />
          ))}
        </ul>
      </div>
    </section>
  );
}
