import Image from "next/image";
import type { ReactNode } from "react";
import { aboutDifference, aboutIntro, aboutProcess, aboutWhy } from "@/content/about";
import styles from "./AboutStory.module.css";

const whyIcons: ReactNode[] = [
  <g key="team"><circle cx="11" cy="10" r="4" /><circle cx="22" cy="11.5" r="3.2" /><path d="M3.5 26c.8-5 3.8-7.5 7.5-7.5s6.7 2.5 7.5 7.5" /><path d="M18.5 19.5c1-.6 2.2-1 3.5-1 3 0 5.4 2 6 6" /></g>,
  <g key="tech"><rect x="4" y="5" width="24" height="16" rx="2" /><path d="M12 27h8M16 21v6" /><path d="M13.4 10.4c-.7-1.7.3-3 1.7-3 .7 0 1 .5 1.4.5s.7-.5 1.4-.5c1.4 0 2.4 1.3 1.7 3l-.7 3.2-.4 2.6c-.2 1-1.1 1-1.3 0l-.4-2h-.6l-.4 2c-.2 1-1.1 1-1.3 0l-.4-2.6Z" /></g>,
  <g key="care"><path d="M16 27s-10.5-6.3-10.5-13.4A5.8 5.8 0 0 1 16 10.3a5.8 5.8 0 0 1 10.5 3.3C26.5 20.7 16 27 16 27Z" /><path d="M11.5 16.5h3l1.5-3 2 6 1.5-3h3" /></g>,
  <g key="all"><rect x="4.5" y="4.5" width="9.5" height="9.5" rx="2" /><rect x="18" y="4.5" width="9.5" height="9.5" rx="2" /><rect x="4.5" y="18" width="9.5" height="9.5" rx="2" /><path d="M22.75 18.5v8.5M18.5 22.75H27" /></g>,
];

/** About page article: intro, why choose us, our process (4 services with photos), closing statement. Text is word for word. */
export default function AboutStory() {
  return (
    <>
      <section className={styles.why}>
        <div className={styles.inner}>
          <div className={styles.intro}>
            <p className={styles.introText}>{aboutIntro.text}</p>
          </div>

          <h2 className={styles.heading}>{aboutWhy.title}</h2>
          <ul className={styles.whyList}>
            {aboutWhy.items.map((item, i) => (
              <li key={item.title} className={styles.whyItem}>
                <span className={styles.whyIcon}>
                  <svg aria-hidden="true" focusable="false" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    {whyIcons[i]}
                  </svg>
                </span>
                <h3 className={styles.whyTitle}>{item.title}</h3>
                <p className={styles.whyText}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.process}>
        <div className={styles.inner}>
          <header className={styles.processHeader}>
            <h2 className={styles.heading}>{aboutProcess.title}</h2>
          </header>
          <ul className={styles.cards}>
            {aboutProcess.items.map((item) => (
              <li key={item.title} className={styles.card}>
                <div className={styles.cardImage}>
                  <Image src={item.img} alt="" fill sizes="(min-width: 1100px) 300px, (min-width: 640px) 45vw, 100vw" className={styles.cardPhoto} />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.difference}>
        <div className={styles.differenceInner}>
          <h3 className={styles.differenceTitle}>{aboutDifference.title}</h3>
          <p className={styles.differenceText}>{aboutDifference.text}</p>
        </div>
      </section>
    </>
  );
}
