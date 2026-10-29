import Image from "next/image";
import { clinic } from "@/content/site";
import { Arrow, GoldButton } from "@/components/ui";
import styles from "./TreatmentCta.module.css";

/** Treatment page CTA: a happy patient photo (free Pexels 8155047) beside the call to action. Text as on the homepage CTA. */
export default function TreatmentCta() {
  return (
    <section aria-labelledby="treatment-cta-heading" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.visual}>
          <div className={styles.frame}>
            <Image
              src="/images/treatments/cta-happy-patient.webp"
              alt="Happy patient smiling after her treatment at Bright Way Dental Clinic"
              fill
              sizes="(min-width: 900px) 420px, 85vw"
              className={styles.photo}
            />
          </div>
        </div>

        <div className={styles.copyCol}>
          <h2 id="treatment-cta-heading" className={styles.heading}>
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
