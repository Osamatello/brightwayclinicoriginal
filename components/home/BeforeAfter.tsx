"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { smileCases, type SmileCase } from "@/content/home";
import styles from "./BeforeAfter.module.css";

const SIZES = "(min-width: 1100px) 400px, (min-width: 540px) 50vw, 100vw";
const PAGE_SIZES = "(min-width: 900px) 680px, 100vw";

// The line's own movement
const SWAY_RANGE = 34; // % either side of the middle
const SWAY_SECONDS = 8; // one full trip left and right
const RESUME_AFTER_MS = 2500; // pause after the visitor lets go

function SmileCard({ smile, number, page }: { smile: SmileCase; number: number; page: boolean }) {
  const [position, setPosition] = useState(50);
  const card = useRef<HTMLLIElement>(null);
  const beforeLayer = useRef<HTMLDivElement>(null);
  const divider = useRef<HTMLDivElement>(null);
  const held = useRef(false); // true while the visitor is moving the line
  const resumeAt = useRef(0);
  const current = useRef(50);
  const gliding = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Every card follows the same clock, so all the lines go right and left together.
    // The line is moved directly so the photos don't re-render every frame.
    let last = 0;
    let frame = 0;

    function tick(now: number) {
      const seconds = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (!held.current && now >= resumeAt.current) {
        const target = 50 + SWAY_RANGE * Math.sin((now / 1000 / SWAY_SECONDS) * 2 * Math.PI);
        // exactly on the shared clock, except for a short glide back into step after a drag
        let next = target;
        if (gliding.current) {
          next = current.current + (target - current.current) * Math.min(1, seconds * 2.5);
          if (Math.abs(target - next) < 0.5) gliding.current = false;
        }
        current.current = next;
        if (beforeLayer.current) beforeLayer.current.style.clipPath = `inset(0 ${100 - next}% 0 0)`;
        if (divider.current) divider.current.style.left = `${next}%`;
      }
      frame = requestAnimationFrame(tick);
    }

    // Only moves while the card is on screen
    const watcher = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry.isIntersecting) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    });
    if (card.current) watcher.observe(card.current);
    return () => {
      watcher.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  function place(next: number) {
    current.current = next;
    gliding.current = true;
    resumeAt.current = performance.now() + RESUME_AFTER_MS;
    setPosition(next);
  }

  function moveDivider(event: PointerEvent<HTMLInputElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    place(Math.round(Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100))));
  }

  const sizes = page ? PAGE_SIZES : SIZES;

  return (
    <li ref={card} className={styles.card}>
      <figure className={styles.photos}>
        <div className={styles.layer}>
          <Image src={smile.after} alt={smile.afterAlt} fill sizes={sizes} className={styles.photo} />
        </div>
        <div ref={beforeLayer} className={styles.layer} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={smile.before} alt={smile.beforeAlt} fill sizes={sizes} className={styles.photo} />
        </div>
        <div className={styles.labels} aria-hidden="true"><span>Before</span><span>After</span></div>
        <div ref={divider} className={styles.divider} style={{ left: `${position}%` }} aria-hidden="true">
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
          onChange={(event) => place(Number(event.target.value))}
          onPointerDown={(event) => {
            event.preventDefault();
            held.current = true;
            event.currentTarget.focus({ preventScroll: true });
            event.currentTarget.setPointerCapture(event.pointerId);
            moveDivider(event);
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) moveDivider(event);
          }}
          onPointerUp={(event) => {
            held.current = false;
            resumeAt.current = performance.now() + RESUME_AFTER_MS;
            if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
          }}
          onPointerCancel={() => {
            held.current = false;
            resumeAt.current = performance.now() + RESUME_AFTER_MS;
          }}
          aria-label={`Compare before and after, smile transformation ${number}`}
          aria-valuetext={`${position}% before, ${100 - position}% after`}
        />
      </figure>
    </li>
  );
}

/** Before/after gallery: framed cards whose lines move by themselves. `page` = the Smile Gallery page's version: no header, bigger cards. */
export default function BeforeAfter({ page = false }: { page?: boolean }) {
  return (
    <section id="gallery" className={`${styles.section} ${page ? styles.page : ""}`} aria-labelledby={page ? undefined : "gallery-heading"} aria-label={page ? "Smile transformations" : undefined}>
      <div className={styles.inner}>
        {!page && (
          <header className={styles.header}>
            <h2 id="gallery-heading" className={styles.heading}>
              Before and After{" "}
              <span>Dental Transformations</span>
            </h2>
            <p className={styles.intro}>Real smiles from our patients. Drag the handle on any photo to see the transformation.</p>
          </header>
        )}

        <ul className={styles.grid}>
          {smileCases.map((smile, index) => (
            <SmileCard key={smile.after} smile={smile} number={index + 1} page={page} />
          ))}
        </ul>
      </div>
    </section>
  );
}
