import { t } from "@/lib/i18n";
import Image from "next/image";
import styles from "./GalleryTreatments.module.css";

// Treatment names and text from the old site's homepage strip; the heading is the old Smile Gallery page's line
const makeovers = [
  { title: "Immediate Implant", text: "Quick replacement with implants during tooth extraction for minimal downtime.", img: "/images/smile-immediate-implant.jpg" },
  { title: "Invisalign", text: "Clear, custom aligners for discreet teeth straightening without traditional braces.", img: "/images/smile-invisalign.jpg" },
  { title: "Veneers", text: "Custom-ceramic covers for fixing discoloration, chips, or misalignment, enhancing smiles.", img: "/images/smile-veneers.jpg" },
  { title: "Teeth Whitening", text: "Safe, effective brightening of your natural tooth color for a radiant smile.", img: "/images/smile-whitening.jpg" },
  { title: "Crown and Bridges", text: "Prosthetic solutions to restore or replace damaged and missing teeth, ensuring a functional and aesthetic smile.", img: "/images/smile-crown-bridges.jpg" },
];

export default function GalleryTreatments() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.heading}>{t("Our Latest")}{" "}<em>{t("Smile Makeovers")}</em>
          </h2>
        </header>

        <ul className={styles.list}>
          {makeovers.map((m) => (
            <li key={m.title} className={styles.item}>
              <div className={styles.model}>
                <Image src={m.img} alt={`${t(m.title)} ${t("treatment illustration")}`} fill sizes="(min-width: 640px) 184px, 88px" className={styles.img} />
              </div>
              <div>
                <h3 className={styles.title}>{t(m.title)}</h3>
                <p className={styles.text}>{t(m.text)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
