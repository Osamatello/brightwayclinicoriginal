import { t, h1Part } from "@/lib/i18n";
import Image from "next/image";
import type { Metadata } from "next";
import { getById, seoMetadata } from "@/lib/content";
import LeadForm from "@/components/page/LeadForm";
import { nameFields } from "@/content/forms";
import { Arrow, GoldButton } from "@/components/ui";
import { Instagram, Videos } from "@/components/home/Media";
import ScatteredTeeth from "@/components/page/ScatteredTeeth";
import styles from "@/components/landing/Landing.module.css";

const PAGE_ID = 2652;
const OLD_SHARE_IMAGE = "/images/share-default.jpg"; // clinic photo for link previews (the old page used the wide logo, which crops badly)

export function generateMetadata(): Metadata {
  const page = getById(PAGE_ID);
  if (!page) return { title: "Personalized Dental Implant Cost" };
  const seo = seoMetadata(page);
  return { ...seo, openGraph: { ...seo.openGraph, images: [OLD_SHARE_IMAGE] } };
}

// All text and pictures from the old page (ad campaigns and SEO depend on them)
const reasons = [
  { title: "Regain your natural smile and confidence.", img: "/wp-content/uploads/2024/10/4-1.png" },
  { title: "Enjoy your favorite foods without worry.", img: "/wp-content/uploads/2024/10/5.png" },
  { title: "Experience long-lasting, durable solutions.", img: "/wp-content/uploads/2024/10/1.png" },
  { title: "Prevent bone loss and maintain facial structure.", img: "/wp-content/uploads/2024/10/3.png" },
];

export default function ImplantCostPage() {
  return (
    <>
      <section className={styles.hero}>
        <ScatteredTeeth />
        <div className={styles.heroInner}>
          <div>
            <p className={styles.brand}>{t("Bright Way Dental Clinic")}</p>
            <h1 className={`${styles.heading} ${styles.headingSmaller}`}>{h1Part(0, "Get Your Personalized")}{" "}<em>{h1Part(1, "Dental Implant Cost")}</em>{" "}{h1Part(2, "Estimate – Instantly and for Free!")}</h1>
            <p className={styles.intro}>{t("Wondering how much it will cost to restore your smile? Find out now by entering a few simple details – no commitments, just clarity.")}</p>
            <div className={styles.actions}>
              <GoldButton href="#estimate">{t("Get Your Free Estimate Now")}{" "}<Arrow /></GoldButton>
            </div>
          </div>
          <div className={styles.frame}>
            <Image src="/wp-content/uploads/2024/03/Untitled-1.png" alt={t("Exclusive Dental Implant Offer: Bright Way Dental Clinic, Dubai.")} width={512} height={512} priority sizes="(min-width: 900px) 500px, 100vw" className={styles.frameImg} />
          </div>
        </div>
      </section>

      <section id="estimate" className={styles.formBand}>
        <div className={styles.formInner}>
          <div>
            <p className={styles.formLead}>{t("Dental implants are a great investment in your smile, but costs can vary.")}</p>
            <p className={styles.sub}>{t("Enter your details below for a quick and clear cost estimate – no obligations.")}</p>
          </div>
          <LeadForm
            fields={[...nameFields, { name: "missing", label: "How many teeth do you want to replace?" }]}
            submitLabel={t("Discover Your Implant Cost Now!")}
            thankYouPath="/personalized-dental-implant-cost-typ/"
          />
        </div>
      </section>

      <section className={`${styles.band} ${styles.bandCream}`}>
        <div className={styles.inner}>
          <h2 className={`${styles.title} ${styles.titleCentered}`}>{t("Why Choose")}{" "}<em>{t("Dental Implants?")}</em>
          </h2>
          <ul className={`${styles.cards} ${styles.four}`}>
            {reasons.map((r) => (
              <li key={r.title} className={styles.card}>
                <div className={styles.cardPicture}>
                  <Image src={r.img} alt={t(r.title)} fill sizes="(min-width: 1024px) 240px, (min-width: 540px) 45vw, 90vw" />
                </div>
                <h3 className={styles.cardTitle}>{t(r.title)}</h3>
              </li>
            ))}
          </ul>
          <div className={`${styles.actions} ${styles.actionsCentered}`}>
            <GoldButton href="#estimate">{t("Check Your Implant Cost Now!")}{" "}<Arrow /></GoldButton>
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <div className={`${styles.inner} ${styles.split}`}>
          <div>
            <h2 className={styles.title}>{t("Take the first step towards")}{" "}<em>{t("your dream smile today.")}</em>
            </h2>
            <p className={styles.sub}>{t("It’s quick, easy, and completely free to find out how much it will cost you to smile with confidence again.")}</p>
            <div className={styles.actions}>
              <GoldButton href="#estimate">{t("Discover Your Implant Cost Now!")}{" "}<Arrow /></GoldButton>
            </div>
          </div>
          <div className={styles.frame}>
            <Image src="/wp-content/uploads/2024/10/6.png" alt={t("Dental implant treatment at Bright Way Dental Clinic")} width={720} height={399} sizes="(min-width: 900px) 560px, 100vw" className={styles.frameImg} />
          </div>
        </div>
      </section>

      <Instagram />
      <Videos />
    </>
  );
}
