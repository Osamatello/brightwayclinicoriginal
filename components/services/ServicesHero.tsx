import Image from "next/image";
import Link from "next/link";
import styles from "./ServicesHero.module.css";

// Generated as one set (same clinic, light and colours as the service photos); originals in design/services-hub-candidates/
const photos = [
  { src: "/images/services-hub/hero-consultation.webp", alt: "Dentist talking a patient through her treatment plan in a bright clinic overlooking Dubai", sizes: "(min-width: 900px) 420px, 60vw" },
  { src: "/images/services-hub/hero-scan-a.webp", alt: "Dentist showing a patient a 3D digital scan of her teeth on screen", sizes: "(min-width: 900px) 340px, 45vw" },
  { src: "/images/services-hub/hero-scan-b.webp", alt: "Patient reviewing her digital smile design with the dentist", sizes: "(min-width: 900px) 340px, 45vw" },
];

export default function ServicesHero() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copyCol}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-hidden="true" className={styles.chevron}>
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m4.5 2.5 3.5 3.5-3.5 3.5" /></svg>
              </li>
              <li aria-current="page">Services</li>
            </ol>
          </nav>

          <h1 className={styles.heading}>
            Our Dental Services <em>in Dubai</em>
          </h1>
          <p className={styles.intro}>
            Eleven specialties under one roof in Al Garhoud — from routine cleaning to digital implants and complete smile makeovers, planned with digital dentistry by
            DHA-licensed dentists.
          </p>
        </div>

        {/* Three real clinic moments: one tall photo beside two stacked ones */}
        <div className={styles.mosaic}>
          {photos.map((p, i) => (
            <div key={p.src} className={`${styles.tile} ${styles[`tile${i + 1}`]}`}>
              <Image src={p.src} alt={p.alt} fill priority={i === 0} sizes={p.sizes} className={styles.photo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
