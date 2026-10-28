import Image from "next/image";
import { digitalBenefits, digitalFeatures } from "@/content/home";
import styles from "./Digital.module.css";

const featureIcons = [
  <g key="scanner"><path d="M9 27 19.5 9.5a3 3 0 0 1 5.2 3L14.2 30" /><path d="M24 4.5l1.5-2M28 7.5l2-1M26.5 5.8l2.5-2.3" /></g>,
  <g key="smile"><path d="M5 13c3 8 19 8 22 0" /><path d="M5 13c5 3 17 3 22 0" /><path d="M16 4v24M10.5 6v20M21.5 6v20" strokeDasharray="1.5 2.5" /></g>,
  <g key="crown"><path d="M8 12c-1.5-4 .5-7.5 4-7.5 1.8 0 2.4 1.5 4 1.5s2.2-1.5 4-1.5c3.5 0 5.5 3.5 4 7.5l-1.5 6H9.5L8 12Z" /><path d="M10 23a6 6 0 0 0 12 0" /><path d="M22 23h3M16 23v-2" /></g>,
  <g key="implant"><path d="M12 4h8v4h-8zM13 8v15l3 5 3-5V8" /><path d="M13 12l6 2M13 16l6 2M13 20l6 2" /><path d="M4 16h4M24 16h4" /></g>,
  <g key="xray"><rect x="4" y="4" width="24" height="24" rx="2" /><path d="M11 11c-1-2.5.5-4.5 2.5-4.5 1 0 1.5 1 2.5 1s1.5-1 2.5-1c2 0 3.5 2 2.5 4.5l-1.2 5-.8 7c-.2 1.5-1.8 1.5-2-.2L16.5 18h-1l-.5 4.8c-.2 1.7-1.8 1.7-2 .2l-.8-7L11 11Z" /></g>,
  <g key="plan"><circle cx="7" cy="25" r="2.5" /><circle cx="16" cy="11" r="2.5" /><circle cx="25" cy="21" r="2.5" /><path d="M8.5 23 14.6 13.2M17.8 12.8l5.6 6.4" /><path d="M23 4l2 2 4-4" /></g>,
  <g key="ai"><rect x="8" y="8" width="16" height="16" rx="3" /><path d="M12 4v4M16 4v4M20 4v4M12 24v4M16 24v4M20 24v4M4 12h4M4 16h4M4 20h4M24 12h4M24 16h4M24 20h4" /><path d="M16 11.5l1.3 3.2 3.2 1.3-3.2 1.3-1.3 3.2-1.3-3.2-3.2-1.3 3.2-1.3z" /></g>,
];


export default function Digital() {
  return (
    <section id="digital-dentistry" aria-labelledby="digital-heading" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id="digital-heading" className={styles.heading}>
            Smarter, Faster, <span>More Accurate in Dubai.</span>
          </h2>
          <p className={styles.lede}>
            We are proud of specializing in digital dentistry where the traditional methods will be converted to faster and more comfortable procedures.
          </p>

          <ul className={styles.features}>
            {digitalFeatures.map((feature, i) => (
              <li key={feature} className={styles.feature}>
                <svg aria-hidden="true" focusable="false" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                  {featureIcons[i]}
                </svg>
                <span>{feature.replace(/\.$/, "")}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Real digital dentistry: a smile designed on screen, in a gold frame, benefits on a glass panel */}
        <figure className={styles.stage}>
          <Image
            src="/images/digital-smile-design.webp"
            alt="Dentist designing a new smile on a computer with digital dentistry software"
            fill
            sizes="(min-width: 960px) 46vw, (min-width: 640px) 600px, 100vw"
            className={styles.photo}
          />
          <figcaption className={styles.benefits}>
            <p className={styles.benefitsLabel}>Benefits of digital dentistry in Dubai</p>
            <ul>
              {digitalBenefits.map((benefit) => (
                <li key={benefit}>
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
