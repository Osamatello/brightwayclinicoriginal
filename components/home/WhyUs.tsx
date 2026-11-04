import Image from "next/image";
import { whyPoints } from "@/content/home";
import styles from "./WhyUs.module.css";

export const pointIcons = [
  <g key="digital"><rect x="4" y="4" width="24" height="18" rx="2" /><path d="M11 28h10M16 22v6M9 14h4l3-5 3 9 2-4h3" /></g>,
  <g key="dentists"><circle cx="16" cy="9" r="5" /><path d="M6 28v-3a10 10 0 0 1 20 0v3M12 19l4 5 4-5" /></g>,
  <g key="care"><path d="M16 27S4 20 4 11a6 6 0 0 1 12-2 6 6 0 0 1 12 2c0 9-12 16-12 16Z" /><path d="M12 15h8M16 11v8" /></g>,
  <g key="crowns"><path d="M7 13C5 8 7 4 11 4c2 0 3 2 5 2s3-2 5-2c4 0 6 4 4 9l-3 14c-.5 2-3 2-3-1l-1-7c-.3-3-3.7-3-4 0l-1 7c0 3-2.5 3-3 1L7 13ZM7 13h18" /></g>,
  <g key="family"><circle cx="10" cy="9" r="4" /><circle cx="23" cy="12" r="3" /><path d="M3 27v-5a7 7 0 0 1 14 0v5M20 20a6 6 0 0 1 9 5v2" /></g>,
  <g key="location"><path d="M26 13c0 8-10 16-10 16S6 21 6 13a10 10 0 1 1 20 0Z" /><circle cx="16" cy="13" r="3.5" /></g>,
];

export default function WhyUs() {
  return (
    <section id="why-us" aria-labelledby="why-us-heading" className={styles.section}>
      <div aria-hidden="true" className={styles.texture} />
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="why-us-heading" className={styles.heading}>
            What Makes Bright Way Dental Clinic a <span>Good Choice?</span>
          </h2>
        </header>

        <div className={styles.layout}>
          <svg aria-hidden="true" focusable="false" className={styles.thread} viewBox="0 0 1240 720" fill="none">
            <path d="M-80 490C160 720 375 705 550 390S850-120 1140 70s250 470 90 600" />
            <path d="M-80 504C160 734 389 719 564 404S864-106 1154 84s250 470 90 600" />
          </svg>
          <div className={styles.photograph}>
            <div className={styles.photoFrame}>
              <Image
                src="/images/good-choice-happy-child.webp"
                alt="Happy young patient giving a thumbs up with her dentist at the clinic"
                fill
                unoptimized
                className={styles.photo}
              />
            </div>
          </div>

          <ul className={styles.points}>
            {whyPoints.map((point, i) => (
              <li key={point} className={styles.point}>
                <svg aria-hidden="true" focusable="false" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                  {pointIcons[i]}
                </svg>
                <p>{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
