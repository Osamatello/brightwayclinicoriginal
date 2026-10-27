import Image from "next/image";
import { aboutCards, insurers } from "@/content/home";
import { clinic } from "@/content/site";
import { Heading } from "@/components/ui";
import styles from "./About.module.css";

const pillarIcons = [
  <g key="mission"><circle cx="16" cy="16" r="12.5" /><path d="m20.5 11.5-3 6.5-6.5 3 3-6.5Z" /><circle cx="16" cy="16" r="1" /></g>,
  <g key="vision"><path d="M3 16s4.8-8 13-8 13 8 13 8-4.8 8-13 8S3 16 3 16Z" /><circle cx="16" cy="16" r="4.2" /><path d="M16 4V2M8 6 7 4.5M24 6l1-1.5" /></g>,
  <g key="approach"><path d="M12.4 6.4c-.9-2.3.4-4.1 2.3-4.1 1 0 1.3.7 1.9.7s.9-.7 1.9-.7c1.9 0 3.2 1.8 2.3 4.1l-.9 4.4-.6 4.3c-.2 1.2-1.5 1.2-1.7 0l-.5-3.2h-.8l-.5 3.2c-.2 1.2-1.5 1.2-1.7 0l-.6-4.3Z" /><path d="M3 24.5h4.5c2.5 0 4-1.5 6.5-1.5h5a1.8 1.8 0 0 1 0 3.6h-5" /><path d="M3 29h10l11-4.6a2 2 0 0 0-1.6-3.6L19 22" /></g>,
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className={styles.section}>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 400 480" className={styles.watermark}>
        <path d="M95 150C80 90 120 55 160 70c20 8 30 18 40 18s20-10 40-18c40-15 80 20 65 80-7 35-15 60-20 90-7 50-13 100-23 155-6 33-34 35-38 3l-10-78c-3-24-25-24-28 0l-10 78c-4 32-32 30-38-3-10-55-16-105-23-155-5-30-13-55-20-90Z" />
      </svg>

      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id="about-heading" className={styles.heading}>
            Your Trusted <span>Dental Clinic in Dubai</span>
          </h2>
          <p className={styles.copy}>
            Need to find a reliable dental practice in Dubai around me? Looking for a dental clinic Dubai near me that is close enough and has the best technology and soft, close-knit treatment? Welcome to Bright Way Dental Clinic, where patient comfort and digital dentistry come together.
          </p>
          <p className={styles.copy}>
            Our highly skilled team, led by the best dentists in Dubai, ensures that every patient receives personalized care in a comfortable and modern environment. As a top dental clinic in Dubai, we specialize in cosmetic dentistry, teeth cleaning, teeth whitening, orthodontics, dental implants, and more.
          </p>

          <ul className={styles.visit}>
            <li>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19.5 10c0 6-7.5 12-7.5 12S4.5 16 4.5 10a7.5 7.5 0 1 1 15 0Z" /><circle cx="12" cy="10" r="2.6" /></svg>
              <span>{clinic.address}</span>
            </li>
            <li>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 2" /></svg>
              <span>{clinic.hours}</span>
            </li>
          </ul>
        </div>

        <div className={styles.pillars}>
          <p className={styles.discover}>Discover the best dental clinic in Dubai</p>
          <ul>
            {aboutCards.map((card, i) => (
              <li key={card.title} className={styles.pillar}>
                <span className={styles.pillarIcon}>
                  <svg aria-hidden="true" focusable="false" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    {pillarIcons[i]}
                  </svg>
                </span>
                <div>
                  <h3 className={styles.pillarTitle}>{card.title}</h3>
                  <p className={styles.pillarText}>{card.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Insurance() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl space-y-10 px-5 text-center">
        <div className="mx-auto max-w-2xl space-y-4">
          <Heading lead="Insurance" accent="Companies" />
          <p>At Bright Way Dental Clinic, we simplify your access to exceptional dental care by accepting a wide range of insurance companies.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {insurers.map((src) => (
            <div key={src} className="flex h-24 items-center justify-center rounded-2xl border border-line bg-cream p-4 grayscale transition hover:grayscale-0">
              <Image src={src} alt="Accepted insurance company" width={160} height={80} className="max-h-16 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
