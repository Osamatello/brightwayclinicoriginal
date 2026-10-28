import Image from "next/image";
import { whyPoints } from "@/content/home";
import { pointIcons } from "@/components/home/WhyUs";
import styles from "./AboutGoodChoice.module.css";

/** About page version of "What Makes Bright Way Dental Clinic a Good Choice?": the six points orbit a 3D tooth. */
export default function AboutGoodChoice() {
  const sides = [whyPoints.slice(0, 3), whyPoints.slice(3)];
  return (
    <section id="why-us" aria-labelledby="good-choice-heading" className={styles.section}>
      <div className={styles.inner}>
        <h2 id="good-choice-heading" className={styles.heading}>
          What Makes Bright Way Dental Clinic a <span>Good Choice?</span>
        </h2>

        <div className={styles.orbit}>
          {sides.map((points, side) => (
            <ul key={side} className={`${styles.column} ${side ? styles.right : styles.left}`}>
              {points.map((point, j) => {
                const i = side * 3 + j;
                return (
                  <li key={point} className={styles.point}>
                    <span className={styles.icon}>
                      <svg aria-hidden="true" focusable="false" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                        {pointIcons[i]}
                      </svg>
                    </span>
                    <p>{point}</p>
                  </li>
                );
              })}
            </ul>
          ))}

          <div className={styles.core}>
            <span aria-hidden="true" className={styles.ringOuter} />
            <span aria-hidden="true" className={styles.ringInner} />
            <Image src="/images/about/good-choice-tooth.webp" alt="" width={800} height={800} sizes="(min-width: 960px) 340px, 240px" className={styles.tooth} />
          </div>
        </div>
      </div>
    </section>
  );
}
