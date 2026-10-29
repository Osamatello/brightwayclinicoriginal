import { clinic } from "@/content/site";
import { Arrow, GoldButton } from "@/components/ui";
import styles from "./AboutCta.module.css";

// One path draws both the photo window and its gold outline, so they always line up.
const TOOTH =
  "M200 40C150 40 120 10 80 18 30 28 10 80 18 140c8 60 34 100 46 160 12 60 20 120 48 140 28 18 44-10 50-48 6-42 14-76 38-76s32 34 38 76c6 38 22 66 50 48 28-20 36-80 48-140 12-60 38-100 46-160 8-60-12-112-62-122-40-8-70 22-120 22Z";

export default function AboutCta() {
  return (
    <section aria-labelledby="about-cta-heading" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.tooth}>
          <svg role="img" aria-label="Smiling patient in the dental chair at Bright Way Dental Clinic" viewBox="0 0 400 460" className={styles.art}>
            <defs>
              <clipPath id="about-cta-tooth">
                <path d={TOOTH} />
              </clipPath>
              <linearGradient id="about-cta-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f1d68e" />
                <stop offset=".45" stopColor="#a77d2a" />
                <stop offset=".75" stopColor="#e8c77a" />
                <stop offset="1" stopColor="#8a6a24" />
              </linearGradient>
            </defs>
            <g clipPath="url(#about-cta-tooth)">
              <image href="/images/about/cta-patient-chair.webp" width="400" height="460" preserveAspectRatio="xMidYMid slice" className={styles.photo} />
            </g>
            <path d={TOOTH} fill="none" stroke="url(#about-cta-gold)" strokeWidth="4" />
          </svg>
        </div>

        <div className={styles.panel}>
          <h2 id="about-cta-heading" className={styles.heading}>
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
      </div>
    </section>
  );
}
