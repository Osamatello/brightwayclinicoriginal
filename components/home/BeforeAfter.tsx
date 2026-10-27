"use client";

import Image from "next/image";
import { useState, type PointerEvent } from "react";
import { smileCases, type SmileCase } from "@/content/home";
import { Arrow } from "@/components/ui";
import styles from "./BeforeAfter.module.css";

function Comparison({ smile }: { smile: SmileCase }) {
  const [position, setPosition] = useState(50);
  const hasPhotos = Boolean(smile.before && smile.after);

  function moveDivider(event: PointerEvent<HTMLInputElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition(Math.round(Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100))));
  }

  return (
    <figure className={styles.comparison} aria-labelledby="gallery-case-title">
      <div className={styles.stage}>
        {hasPhotos ? (
          <>
            <Image src={smile.after!} alt={smile.label + " — after treatment"} fill sizes="(min-width: 1280px) 840px, (min-width: 900px) 65vw, 100vw" className={styles.patientPhoto} />
            <div className={styles.beforeLayer} style={{ clipPath: "inset(0 " + (100 - position) + "% 0 0)" }}>
              <Image src={smile.before!} alt={smile.label + " — before treatment"} fill sizes="(min-width: 1280px) 840px, (min-width: 900px) 65vw, 100vw" className={styles.patientPhoto} />
            </div>
            <div className={styles.photoLabels} aria-hidden="true"><span>Before</span><span>After</span></div>
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
              aria-label={"Compare before and after: " + smile.label}
              aria-valuetext={position + "% before, " + (100 - position) + "% after"}
              aria-describedby="gallery-comparison-hint"
            />
            <div className={styles.divider} style={{ left: position + "%" }} aria-hidden="true">
              <span className={styles.handle}>
                <svg viewBox="0 0 28 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 5-5 5 5 5M19 5l5 5-5 5M14 3v14" />
                </svg>
              </span>
            </div>
          </>
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.illustrationLabel}>Treatment Illustration</span>
            <div className={styles.orbit} aria-hidden="true" />
            <div className={styles.artwork}>
              <Image src={smile.illustration} alt={smile.label + " treatment illustration"} fill sizes="(min-width: 540px) 300px, 220px" className={styles.illustration} />
            </div>
            <p className={styles.pending}>Before &amp; after photographs coming soon</p>
          </div>
        )}
      </div>
      <figcaption className={styles.caption}>
        <h3 id="gallery-case-title">{smile.label}</h3>
        <p id="gallery-comparison-hint">{hasPhotos ? "Slide to reveal the difference" : "A space for our patients’ smile stories"}</p>
      </figcaption>
    </figure>
  );
}

export default function BeforeAfter() {
  const [selected, setSelected] = useState(0);
  const smile = smileCases[selected];

  return (
    <section id="gallery" className={styles.section} aria-labelledby="gallery-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Smile Gallery</p>
          <h2 id="gallery-heading" className={styles.heading}>
            Before and After{" "}
            <span>Dental Transformations</span>
          </h2>
        </header>
        <div className={styles.layout}>
          <div className={styles.selection}>
            <p className={styles.menuLabel}>Explore By Treatment</p>
            <div className={styles.choices} role="group" aria-label="Choose a smile treatment">
              {smileCases.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  className={styles.choice}
                  aria-pressed={index === selected}
                  aria-controls="gallery-comparison"
                  onClick={() => setSelected(index)}
                >
                  <span>{item.label}</span>
                  <Arrow className={styles.choiceArrow} />
                </button>
              ))}
            </div>
            <p className={styles.menuNote}>Every smile is personal.<br />Explore the possibilities.</p>
          </div>
          <div id="gallery-comparison" className={styles.viewer}>
            <Comparison key={smile.label} smile={smile} />
            <span className={styles.srOnly} role="status">{smile.label + " selected"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
