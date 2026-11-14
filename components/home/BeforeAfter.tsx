"use client";

import { useI18n } from "@/lib/i18n-client";
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
  const { t } = useI18n();
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
      <figure dir="ltr" className={styles.photos}>
        <div className={styles.layer}>
          <Image src={smile.after} alt={t(smile.afterAlt)} fill sizes={sizes} className={styles.photo} />
        </div>
        <div ref={beforeLayer} className={styles.layer} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={smile.before} alt={t(smile.beforeAlt)} fill sizes={sizes} className={styles.photo} />
        </div>
        <div className={styles.labels} aria-hidden="true"><span>{t("Before")}</span><span>{t("After")}</span></div>
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
          aria-label={`${t("Compare before and after, smile transformation")} ${number}`}
          aria-valuetext={`${position}% ${t("before")}, ${100 - position}% ${t("after")}`}
        />
      </figure>
    </li>
  );
}

/** Before/after gallery: framed cards whose lines move by themselves. `page` = the Smile Gallery page's version: no header, bigger cards. */
/**
 * Phones, home page only (2026-11-14, after Osama's reference): the section pins under the header and scrolling down
 * slides the cases sideways, "before" above "after", until the last one is shown; then the page carries on.
 * Larger screens, the Smile Gallery page and "reduce motion" keep the cards with the drag handle (CSS hides one or the other).
 */
function PhoneStrip() {
  const { t } = useI18n();
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const box = wrap.current;
    const pin = stage.current;
    const row = track.current;
    if (!box || !pin || !row) return;
    const mq = window.matchMedia("(max-width: 767px) and (prefers-reduced-motion: no-preference)");
    const rtl = document.documentElement.dir === "rtl";
    let distance = 0;
    let frame = 0;
    let width = 0;

    const measure = () => {
      distance = Math.max(0, row.scrollWidth - row.clientWidth);
      // one pixel of scrolling down moves the cards one pixel sideways. The height is set against the *small* screen height
      // (svh), which does not change while the phone's address bar slides in and out, so nothing below jumps when it does.
      box.style.height = `calc(100svh - 73px + ${distance}px)`;
      draw();
    };
    // phones fire "resize" whenever the address bar shows or hides: only re-measure when the width really changed (rotation)
    const onResize = () => {
      if (window.innerWidth === width) return draw();
      width = window.innerWidth;
      measure();
    };
    const draw = () => {
      frame = 0;
      const top = parseFloat(getComputedStyle(pin).top) || 0;
      const p = Math.min(1, Math.max(0, (top - box.getBoundingClientRect().top) / Math.max(1, box.offsetHeight - pin.offsetHeight)));
      row.style.transform = `translate3d(${(rtl ? 1 : -1) * p * distance}px, 0, 0)`;
      setActive(Math.round(p * (smileCases.length - 1)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (!mq.matches) {
        box.style.height = "";
        return;
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      width = window.innerWidth;
      measure();
    };
    mq.addEventListener("change", sync);
    sync();
    // the cases further along the strip would only load when they slide in (empty for a moment on a fast scroll):
    // load all of them once the section is about a screen away
    const near = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        row.querySelectorAll("img").forEach((img) => (img.loading = "eager"));
        near.disconnect();
      },
      { rootMargin: "100% 0px" },
    );
    near.observe(box);
    // pictures arriving can change nothing in size (fixed 4:3 boxes), but fonts can move the header: measure once more after load
    window.addEventListener("load", measure, { once: true });
    return () => {
      cancelAnimationFrame(frame);
      near.disconnect();
      mq.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", measure);
    };
  }, []);

  return (
    <div ref={wrap} className={styles.strip}>
      <div ref={stage} className={styles.stripStage}>
        <h2 className={styles.stripHeading}>{t("Before and After")}{" "}
          <span>{t("Dental Transformations")}</span>
        </h2>
        <ul ref={track} className={styles.stripTrack}>
          {smileCases.map((smile, i) => (
            <li key={smile.after} className={styles.stripCard}>
              <figure className={styles.stripPhoto}>
                <Image src={smile.before} alt={t(smile.beforeAlt)} fill sizes="80vw" className={styles.photo} />
                <figcaption>{t("Before")}</figcaption>
              </figure>
              <figure className={styles.stripPhoto}>
                <Image src={smile.after} alt={t(smile.afterAlt)} fill sizes="80vw" className={styles.photo} />
                <figcaption>{t("After")}</figcaption>
              </figure>
              <p className={styles.stripNumber}>{String(i + 1).padStart(2, "0")}</p>
            </li>
          ))}
        </ul>
        <div className={styles.stripDots} aria-hidden="true">
          {smileCases.map((smile, i) => (
            <span key={smile.after} data-on={i === active ? "1" : undefined} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter({ page = false }: { page?: boolean }) {
  const { t } = useI18n();
  return (
    <section id="gallery" className={`${styles.section} ${page ? styles.page : ""}`} aria-labelledby={page ? undefined : "gallery-heading"} aria-label={page ? t("Smile transformations") : undefined}>
      <div className={styles.inner}>
        {!page && (
          <header className={styles.header}>
            <h2 id="gallery-heading" className={styles.heading}>{t("Before and After")}{" "}
              <span>{t("Dental Transformations")}</span>
            </h2>
            <p className={styles.intro}>{t("Real smiles from our patients. Drag the handle on any photo to see the transformation.")}</p>
          </header>
        )}

        {!page && <PhoneStrip />}
        <ul className={styles.grid}>
          {smileCases.map((smile, index) => (
            <SmileCard key={smile.after} smile={smile} number={index + 1} page={page} />
          ))}
        </ul>
      </div>
    </section>
  );
}
