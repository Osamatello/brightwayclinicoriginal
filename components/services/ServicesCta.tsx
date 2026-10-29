import { clinic } from "@/content/site";
import { Arrow, GoldButton } from "@/components/ui";
import styles from "./ServicesCta.module.css";

const TOOTH = "M7.5 3.5c-2.2 0-3.6 2-3 4.6.5 2.2 1 4 1.3 6.3.3 2.6.7 5.6 2 5.6 1.2 0 1.4-2.6 1.8-4.6.3-1.4.8-2 2.4-2s2.1.6 2.4 2c.4 2 .6 4.6 1.8 4.6 1.3 0 1.7-3 2-5.6.3-2.3.8-4.1 1.3-6.3.6-2.6-.8-4.6-3-4.6-1.8 0-2.6 1-4.5 1s-2.7-1-4.5-1Z";

export default function ServicesCta() {
  return (
    <section aria-labelledby="services-cta-heading" className={styles.section}>
      <div className={styles.card}>
        {/* faint gold line drawings: dental mirror, probe and two teeth */}
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className={`${styles.doodle} ${styles.mirror}`}>
          <circle cx="7" cy="7" r="4.5" />
          <path d="M10.2 10.2 21 21" />
        </svg>
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className={`${styles.doodle} ${styles.probe}`}>
          <path d="M3 21 17 7c1-1 1.2-2.6.4-3.6-.6-.8-1.8-.7-2.2.2" />
        </svg>
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className={`${styles.doodle} ${styles.toothLeft}`}>
          <path d={TOOTH} />
        </svg>
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className={`${styles.doodle} ${styles.toothRight}`}>
          <path d={TOOTH} />
        </svg>

        <span className={styles.medallion} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <path d={TOOTH} />
            <path d="M8.5 8.5c1-.8 2.2-1 3.5-1" />
          </svg>
        </span>

        <h2 id="services-cta-heading" className={styles.heading}>
          Become The Next <span>Our Happy Client</span>
        </h2>
        <p className={styles.copy}>Our best dentists in Dubai are ready to provide you with top-tier care tailored to your needs.</p>

        <div className={styles.actions}>
          <GoldButton href="/contact-us/">
            Get Dental Consultation <Arrow />
          </GoldButton>
          <a href={`tel:${clinic.phone}`} className={styles.secondary}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.1 4.2 2 2 0 0 1 3.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></svg>
            {clinic.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
