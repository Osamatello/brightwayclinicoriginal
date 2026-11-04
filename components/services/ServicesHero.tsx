import { l, t } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import ScatteredTeeth from "@/components/page/ScatteredTeeth";
import styles from "./ServicesHero.module.css";

// Free Pexels photos chosen by Osama (5355723, 19976591, 19976568); originals in design/services-title-options/
const photos = [
  { src: "/images/services-hub/hero-dentist-model.webp", alt: "Smiling dentist showing a patient a dental model" },
  { src: "/images/services-hub/hero-treatment-a.webp", alt: "Dentist in a face shield examining a patient in the dental chair" },
  { src: "/images/services-hub/hero-treatment-b.webp", alt: "Dentist treating a patient under the dental light" },
];

export default function ServicesHero() {
  return (
    <section className={styles.section}>
      <ScatteredTeeth />
      <div className={styles.inner}>
        <div className={styles.copyCol}>
          <nav aria-label={t("Breadcrumb")} className={styles.crumbs}>
            <ol>
              <li>
                <Link href={l("/")}>{t("Home")}</Link>
              </li>
              <li aria-hidden="true" className={styles.chevron}>
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m4.5 2.5 3.5 3.5-3.5 3.5" /></svg>
              </li>
              <li aria-current="page">{t("Services")}</li>
            </ol>
          </nav>

          <h1 className={styles.heading}>{t("Our Dental Services")}{" "}<em>{t("in Dubai")}</em>
          </h1>
          <p className={styles.intro}>{t("Eleven specialties under one roof in Al Garhoud — from routine cleaning to digital implants and complete smile makeovers, planned with digital dentistry by DHA-licensed dentists.")}</p>
        </div>

        {/* Three real clinic moments: one tall photo beside two stacked ones */}
        <div className={styles.mosaic}>
          {photos.map((p, i) => (
            <div key={p.src} className={`${styles.tile} ${styles[`tile${i + 1}`]}`}>
              <Image src={p.src} alt={t(p.alt)} fill priority unoptimized className={styles.photo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
