import { l, t } from "@/lib/i18n";
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
          alt={t("Dentist preparing a patient for treatment in a bright, modern dental room")}
          fill
          priority
          sizes="100vw"
          className={styles.photo}
        />
        <div className={styles.card}>
          <nav aria-label={t("Breadcrumb")} className={styles.crumbs}>
            <ol>
              <li><Link href={l("/")}>{t("Home")}</Link></li>
              <li aria-current="page">{t("About")}</li>
            </ol>
          </nav>
          <h1 className={styles.title}>{t("About Bright Way Dental Clinic:")}{" "}<span>{t("Dubai’s Premier Dental Care Provider")}</span>
          </h1>
          <p className={styles.intro}>{t("Cutting-edge dental technology and expert care, together since 2013 — enhancing smiles with cosmetic dentistry, implants, teeth cleaning and whitening.")}</p>
          <GoldButton href={l("/contact-us/")}>{t("Book a consultation")}</GoldButton>
        </div>
      </div>
    </section>
  );
}
