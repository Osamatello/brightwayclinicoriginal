import Image from "next/image";
import { insurers } from "@/content/home";
import { clinic } from "@/content/site";
import { Arrow } from "@/components/ui";
import styles from "./AboutInsurance.module.css";

export default function AboutInsurance() {
  return (
    <section aria-labelledby="about-insurance-heading" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copyCol}>
          <h2 id="about-insurance-heading" className={styles.heading}>
            Insurance <span>Companies</span>
          </h2>
          <p className={styles.copy}>At Bright Way Dental Clinic, we simplify your access to exceptional dental care by accepting a wide range of insurance companies.</p>
          <p className={styles.ask}>
            Not sure if your plan is covered?{" "}
            <a href={clinic.whatsapp} target="_blank" rel="noopener noreferrer">
              Ask us on WhatsApp <Arrow />
            </a>
          </p>
        </div>

        {/* Logos on one "coverage card" with a tooth-and-shield emblem */}
        <div className={styles.card}>
          <span className={styles.emblem} aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 2.5 5 6.5v8.2c0 7 4.6 12.4 11 14.8 6.4-2.4 11-7.8 11-14.8V6.5Z" />
              <path d="M12.6 10.6c-.8-2 .3-3.5 2-3.5.8 0 1.1.6 1.4.6s.6-.6 1.4-.6c1.7 0 2.8 1.5 2 3.5l-.7 3.6-.5 3.4c-.2 1-1.2 1-1.4 0l-.4-2.5h-.8l-.4 2.5c-.2 1-1.2 1-1.4 0l-.5-3.4Z" />
            </svg>
          </span>
          <svg aria-hidden="true" focusable="false" viewBox="0 0 400 480" className={styles.watermark}>
            <path d="M95 150C80 90 120 55 160 70c20 8 30 18 40 18s20-10 40-18c40-15 80 20 65 80-7 35-15 60-20 90-7 50-13 100-23 155-6 33-34 35-38 3l-10-78c-3-24-25-24-28 0l-10 78c-4 32-32 30-38-3-10-55-16-105-23-155-5-30-13-55-20-90Z" />
          </svg>
          <ul className={styles.logos}>
            {insurers.map((insurer) => (
              <li key={insurer.logo} className={styles.logo}>
                <Image src={insurer.logo} alt={`${insurer.name} — insurance accepted at Bright Way Dental Clinic`} width={180} height={90} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
