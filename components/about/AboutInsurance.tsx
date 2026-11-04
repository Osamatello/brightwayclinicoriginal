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

        {/* Logos on one "coverage card" with a shield-and-check emblem */}
        <div className={styles.card}>
          <span className={styles.emblem} aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 3 6 6.800v7.900c0 6.400 4.200 11.300 10 13.700 5.800-2.400 10-7.300 10-13.700V6.800Z" />
              <path d="m11.200 15.800 3.400 3.400 6.200-6.600" />
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
