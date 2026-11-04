import Image from "next/image";
import Link from "next/link";
import ScatteredTeeth from "@/components/page/ScatteredTeeth";
import styles from "./TreatmentHero.module.css";

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
      <ScatteredTeeth />
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
