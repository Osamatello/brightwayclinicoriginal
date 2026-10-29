import Image from "next/image";
import Link from "next/link";
import styles from "./TreatmentHero.module.css";

const TOOTH = "M7.5 3.5c-2.2 0-3.6 2-3 4.6.5 2.2 1 4 1.3 6.3.3 2.6.7 5.6 2 5.6 1.2 0 1.4-2.6 1.8-4.6.3-1.4.8-2 2.4-2s2.1.6 2.4 2c.4 2 .6 4.6 1.8 4.6 1.3 0 1.7-3 2-5.6.3-2.3.8-4.1 1.3-6.3.6-2.6-.8-4.6-3-4.6-1.8 0-2.6 1-4.5 1s-2.7-1-4.5-1Z";

// Faint tooth outlines scattered over the whole title area: left/top in %, size in px, tilt in degrees
const scattered = [
  { x: 3, y: 12, s: 46, r: -14 }, { x: 14, y: 78, s: 30, r: 10 }, { x: 24, y: 6, s: 24, r: 18 },
  { x: 33, y: 86, s: 52, r: -8 }, { x: 44, y: 16, s: 34, r: 24 }, { x: 52, y: 62, s: 26, r: -20 },
  { x: 57, y: 4, s: 40, r: -6 }, { x: 62, y: 90, s: 30, r: 14 }, { x: 89, y: 8, s: 34, r: 12 },
  { x: 94, y: 46, s: 48, r: -16 }, { x: 88, y: 84, s: 28, r: 22 }, { x: 8, y: 46, s: 22, r: 30 },
];

/** Treatment page title area ("dental lightbox"): the treatment's 4:5 photo pinned in a glowing film viewer, text on the left,
 *  faint tooth outlines scattered across the background. */
export default function TreatmentHero({ title, intro, image }: { title: string; intro?: string; image: string }) {
  const chevron = (
    <li aria-hidden="true" className={styles.chevron}>
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m4.5 2.5 3.5 3.5-3.5 3.5" /></svg>
    </li>
  );

  return (
    <section className={styles.section}>
      {scattered.map((t, i) => (
        <svg
          key={i}
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          className={styles.scatter}
          style={{ left: `${t.x}%`, top: `${t.y}%`, width: t.s, height: t.s, rotate: `${t.r}deg` }}
        >
          <path d={TOOTH} />
        </svg>
      ))}
      <div className={styles.inner}>
        <div className={styles.copyCol}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <ol>
              <li><Link href="/">Home</Link></li>
              {chevron}
              <li><Link href="/services/">Services</Link></li>
              {chevron}
              <li aria-current="page">{title}</li>
            </ol>
          </nav>
          <p className={styles.eyebrow}>Our services</p>
          <h1 className={styles.heading}>{title}</h1>
          {intro && <p className={styles.intro}>{intro}</p>}
        </div>

        <div className={styles.viewer}>
          <span className={styles.clip} aria-hidden="true" />
          <span className={styles.clip} aria-hidden="true" />
          <div className={styles.film}>
            <Image src={image} alt={`${title} at Bright Way Dental Clinic, Dubai`} fill priority sizes="(min-width: 900px) 360px, 90vw" className={styles.photo} />
          </div>
        </div>
      </div>
    </section>
  );
}
