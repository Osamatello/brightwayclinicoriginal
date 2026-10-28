import Image from "next/image";
import Link from "next/link";
import { GoldButton } from "@/components/ui";
import styles from "./AboutHero.module.css";

/** About page hero: a wide clinic photo with the text on a frosted glass card over its left side. */
export default function AboutHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.frame}>
        <Image
          src="/images/about-hero-clinic.webp"
          alt="Dentist preparing a patient for treatment in a bright, modern dental room"
          fill
          priority
          sizes="100vw"
          className={styles.photo}
        />
        <div className={styles.card}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <ol>
              <li><Link href="/">Home</Link></li>
              <li aria-current="page">About</li>
            </ol>
          </nav>
          <h1 className={styles.title}>
            About Bright Way Dental Clinic: <span>Dubai’s Premier Dental Care Provider</span>
          </h1>
          <p className={styles.intro}>
            Cutting-edge dental technology and expert care, together since 2013 — enhancing smiles with cosmetic dentistry, implants, teeth cleaning and whitening.
          </p>
          <GoldButton href="/contact-us/">Book a consultation</GoldButton>
        </div>
      </div>
    </section>
  );
}
