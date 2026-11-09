import { t } from "@/lib/i18n";
import Image from "next/image";
import { faqs } from "@/content/home";
import { clinic } from "@/content/site";
import { GoldButton } from "@/components/ui";
import styles from "./Faq.module.css";

const HOME_PHOTO = { src: "/images/faq-consultation-screen.webp", alt: "Dentist explaining a digital 3D model of a patient's teeth on screen during a consultation" };

export default function Faq({ photo = HOME_PHOTO, items = faqs }: { photo?: { src: string; alt: string }; items?: { q: string; a: string }[] }) {
  return (
    <section id="faq" aria-labelledby="faq-heading" className={styles.section}>
      <div className={styles.inner}>
        {/* Left: heading, photo filling the column, call line. Right: questions. */}
        <div className={styles.side}>
          <h2 id="faq-heading" className={styles.heading}>{t("Frequently Asked")}{" "}<span>{t("Questions")}</span>
          </h2>
          <div className={styles.photoFrame}>
            <Image
              src={photo.src}
              alt={t(photo.alt)}
              fill
              quality={90}
              sizes="(min-width: 1024px) 540px, 90vw"
              className={styles.photo}
            />
          </div>
          <div className={styles.still}>
            <span>{t("Still have a question?")}</span>
            <GoldButton href={`tel:${clinic.phone}`}>{t("Call")}{" "}{t(clinic.phoneDisplay)}</GoldButton>
          </div>
        </div>

        {/* Opening one question closes the others. */}
        <div className={styles.list}>
          {items.map((f) => (
            <details key={f.q} name="faq" className={styles.item}>
              <summary className={styles.question}>
                <span>{t(f.q)}</span>
                <span aria-hidden="true" className={styles.toggle} />
              </summary>
              <p className={styles.answer}>{t(f.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
