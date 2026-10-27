import Image from "next/image";
import { careFocus, offerPoints } from "@/content/home";
import { Arrow, Check, GoldButton } from "@/components/ui";
import styles from "./CareAndOffer.module.css";

function ToothCheck({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8.6 9.5C7 5.6 9.2 2.5 12.6 2.5c1.7 0 2.3 1.3 3.4 1.3s1.7-1.3 3.4-1.3c3.4 0 5.6 3.1 4 7l-1.7 8.4-1 8.7c-.3 2.4-2.8 2.4-3.1 0L16.7 20h-1.4l-.9 6.6c-.3 2.4-2.8 2.4-3.1 0l-1-8.7Z" />
      <path d="m12.6 10.2 2.4 2.4 4.4-4.6" />
    </svg>
  );
}

export default function CareAndOffer() {
  return (
    <section aria-labelledby="care-heading" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.care}>
          <div className={styles.patient}>
            <Image
              src="/images/lp-happy-client.jpg"
              alt="Smiling patient checking his new smile in a tooth-shaped mirror at Bright Way Dental Clinic"
              width={1400}
              height={1128}
              sizes="(min-width: 960px) 46vw, 100vw"
              className={styles.patientPhoto}
            />
          </div>

          <div className={styles.careText}>
            <h2 id="care-heading" className={styles.heading}>
              You feel more than a patient at Bright Way, <span>you are family.</span>
            </h2>
            <p className={styles.lede}>We know that when we go to the dentist this can be a stressor. That&apos;s why our team focuses on:</p>
            <ul className={styles.focus}>
              {careFocus.map((item) => (
                <li key={item}>
                  <ToothCheck className={styles.tooth} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <article aria-labelledby="offer-heading" className={styles.offer}>
          <div className={styles.offerTitle}>
            <p className={styles.label}>Special Offer</p>
            <h2 id="offer-heading" className={styles.offerHeading}>
              Exclusive Dental Implant Offer at <span>Bright Way</span>
            </h2>
            <p className={styles.save}>Save 10%</p>
          </div>

          <ul className={styles.points}>
            {offerPoints.map((point) => (
              <li key={point}>
                <Check className={styles.check} />
                {point}
              </li>
            ))}
          </ul>

          <GoldButton href="/contact-us/" className={styles.cta}>
            Get the offer <Arrow />
          </GoldButton>
        </article>
      </div>
    </section>
  );
}
