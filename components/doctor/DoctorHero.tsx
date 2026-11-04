import Image from "next/image";
import Link from "next/link";
import { GoldButton } from "@/components/ui";
import ScatteredTeeth from "@/components/page/ScatteredTeeth";
import styles from "./DoctorHero.module.css";

const Tooth = () => (
  <svg aria-hidden="true" viewBox="0 0 48 52" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
    <path d="M24 8c-4-3-9-4-13-1-5 3-6 10-4 16 1 5 3 8 4 13 1 4 2 10 6 10 3 0 3-4 4-8 .6-3 1.500-5 3-5s2.400 2 3 5c1 4 1 8 4 8 4 0 5-6 6-10 1-5 3-8 4-13 2-6 1-13-4-16-4-3-9-2-13 1Z" />
  </svg>
);

/** Dr. Hasan's title area. Text word for word from the old page; the portrait is only 408 px, so it never shows larger. */
export default function DoctorHero() {
  return (
    <section className={styles.section}>
      <ScatteredTeeth />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <ol>
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true" className={styles.chevron}>
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m4.500 2.500 3.500 3.500-3.500 3.500" /></svg>
              </li>
              <li><Link href="/#doctors">Our doctors</Link></li>
              <li aria-hidden="true" className={styles.chevron}>
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m4.500 2.500 3.500 3.500-3.500 3.500" /></svg>
              </li>
              <li aria-current="page">Dr. Hasan A. Mahdy</li>
            </ol>
          </nav>
          <p className={styles.welcome}><Tooth />Welcome to Bright Way Dental Clinic</p>
          <h1 className={styles.heading}>Meet <em>Dr. Hasan Abdullah Mahdy</em></h1>
          <p className={styles.intro}>
            With a passion for transforming smiles and a dedication to excellence, Dr. Hasan Abdullah Mahdy stands at the forefront of cosmetic dentistry, dental implants, and dental surgery. With over
            three decades of experience, Dr. Hasan has honed his skills to provide the highest quality dental care to patients seeking comprehensive treatments and rehabilitation.
          </p>
          <GoldButton href="/contact-us/">Contact Us Today</GoldButton>
        </div>

        <figure className={styles.portrait}>
          <Image
            src="/images/dr-hasan.jpg"
            alt="Dr. Hasan A. Mahdy - Cosmetic Dentist & Oral Surgeon at Bright Way Dental Clinic."
            width={408}
            height={408}
            sizes="(max-width: 480px) calc(100vw - 48px), 408px"
            priority
          />
          <figcaption>
            <blockquote>“Your smile is your signature; let us craft it to perfection.”</blockquote>
            <cite>- Dr. Hasan Mahdy</cite>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
