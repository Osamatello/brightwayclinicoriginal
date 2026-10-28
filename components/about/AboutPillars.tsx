import { aboutCards } from "@/content/home";
import { pillarIcons } from "@/components/home/AboutInsurance";
import styles from "./AboutPillars.module.css";

/** About page: the three pillars as white cards that float up over the bottom of the hero photo. */
export default function AboutPillars() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {aboutCards.map((card, i) => (
          <article key={card.title} className={styles.card}>
            <span className={styles.icon}>
              <svg aria-hidden="true" focusable="false" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                {pillarIcons[i]}
              </svg>
            </span>
            <h2 className={styles.title}>{card.title}</h2>
            <p className={styles.text}>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
