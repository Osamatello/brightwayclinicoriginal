import Image from "next/image";
import { faqs } from "@/content/home";
import { clinic } from "@/content/site";
import { GoldButton } from "@/components/ui";
import styles from "./Faq.module.css";

const HOME_PHOTO = { src: "/images/faq-dentist-explaining.webp", alt: "Dentist explaining a treatment to a patient using a dental model" };

export default function Faq({ photo = HOME_PHOTO, items = faqs }: { photo?: { src: string; alt: string }; items?: { q: string; a: string }[] }) {
  return (
    <section id="faq" aria-labelledby="faq-heading" className={styles.section}>
      <div className={styles.inner}>
        {/* Left: heading, photo filling the column, call line. Right: questions. */}
        <div className={styles.side}>
          <h2 id="faq-heading" className={styles.heading}>
            Frequently Asked <span>Questions</span>
          </h2>
          <div className={styles.photoFrame}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1280px) 500px, (min-width: 900px) 40vw, (min-width: 568px) 520px, calc(100vw - 48px)"
              className={styles.photo}
            />
          </div>
          <div className={styles.still}>
            <span>Still have a question?</span>
            <GoldButton href={`tel:${clinic.phone}`}>Call {clinic.phoneDisplay}</GoldButton>
          </div>
        </div>

        {/* Opening one question closes the others. */}
        <div className={styles.list}>
          {items.map((f) => (
            <details key={f.q} name="faq" className={styles.item}>
              <summary className={styles.question}>
                <span>{f.q}</span>
                <span aria-hidden="true" className={styles.toggle} />
              </summary>
              <p className={styles.answer}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
