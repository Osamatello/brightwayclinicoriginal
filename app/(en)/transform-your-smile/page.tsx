import { l, t } from "@/lib/i18n";
import Image from "next/image";
import type { Metadata } from "next";
import { getById, seoMetadata } from "@/lib/content";
import LeadForm from "@/components/page/LeadForm";
import { nameFields } from "@/content/forms";
import { Arrow, GoldButton, OutlineButton } from "@/components/ui";
import { Instagram, Videos } from "@/components/home/Media";
import ScatteredTeeth from "@/components/page/ScatteredTeeth";
import styles from "@/components/landing/Landing.module.css";

const PAGE_ID = 2341;
const OLD_SHARE_IMAGE = "/wp-content/uploads/2024/03/logo-Bright-Way-01.png"; // the old page's og:image

export function generateMetadata(): Metadata {
  const page = getById(PAGE_ID);
  // Hidden for now (Osama, 2026-11-04): no search listing, not in the sitemap (HIDDEN_PATHS in app/sitemap.ts), no links to it.
  if (!page) return { title: "Transform Your Smile for Just $5!", robots: { index: false, follow: false } };
  const seo = seoMetadata(page);
  return { ...seo, robots: { index: false, follow: false }, openGraph: { ...seo.openGraph, images: [OLD_SHARE_IMAGE] } };
}

const Tooth = () => (
  <svg aria-hidden="true" viewBox="0 0 48 52" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
    <path d="M24 8c-4-3-9-4-13-1-5 3-6 10-4 16 1 5 3 8 4 13 1 4 2 10 6 10 3 0 3-4 4-8 .6-3 1.500-5 3-5s2.400 2 3 5c1 4 1 8 4 8 4 0 5-6 6-10 1-5 3-8 4-13 2-6 1-13-4-16-4-3-9-2-13 1Z" />
  </svg>
);

// All text word for word from the old page (ad campaigns and SEO depend on it)
const designs = [
  { title: "Five Customized Smile Designs:", text: "See various transformations tailored to your preferences, crafted by our expert dental team." },
  { title: "Free Consultation:", text: "Enjoy a complimentary session or call with our dental specialists to discuss your preferred smile design and explore the best treatment options." },
];
const whyChoose = [
  { title: "Low-Barrier Entry", text: "With just $5, you can visualize your dream smile without any financial strain." },
  { title: "Multiple Options", text: "Receive five unique design options to find the perfect smile that matches your personality and preferences." },
  { title: "Free Professional Consultation", text: "Our experts will guide you through the designs, ensuring you understand all available treatments and make informed decisions." },
  { title: "Exclusive Incentive", text: "Get a 10% discount on dental implants when you choose to proceed with treatment, making your dream smile even more affordable." },
];
const benefits = [
  { title: "Visualize Your Dream Smile", text: "See the potential of your smile transformation before committing to any treatment." },
  { title: "Make Informed Decisions", text: "Understand different treatment options and choose what's best for you with confidence." },
  { title: "Personalized Care", text: "Each design is tailored to your unique features, ensuring a natural and beautiful result." },
];
const steps = [
  { title: "1. Sign Up", text: "Fill out the form below to begin designing your virtual smile." },
  { title: "2. Pay $5", text: "Complete the payment to access the service." },
  { title: "3. Upload Photos", text: "Upload clear photos of your face from the right and left sides with your mouth open." },
  { title: "4. Receive Designs", text: "Our team will contact you and send your virtual smile designs via WhatsApp or email." },
];

export default function TransformYourSmilePage() {
  return (
    <>
      <section className={styles.hero}>
        <ScatteredTeeth />
        <div className={styles.heroInner}>
          <div>
            <p className={styles.brand}>{t("Bright Way Dental Clinic")}</p>
            <h1 className={styles.heading}>{t("Transform Your Smile for")}{" "}<em>{t("Just $5!")}</em>
            </h1>
            <p className={styles.intro}>{t("Everyone deserves a smile they're proud of, that’s why we're offering an incredible deal that combines")}</p>
            <ul className={styles.words}>
              <li><Tooth />{" "}{t("Affordability")}</li>
              <li><Tooth />{" "}{t("Personalization")}</li>
              <li><Tooth />{" "}{t("Expert Consultation.")}</li>
            </ul>
            <div className={styles.actions}>
              <GoldButton href="#signup">{t("Get 5 Virtual Smile Design")}{" "}<Arrow /></GoldButton>
              <OutlineButton href={l("/contact-us/")}>{t("Get In Touch")}</OutlineButton>
            </div>
          </div>
          <div className={styles.frame}>
            <Image src="/wp-content/uploads/2024/07/close-up-happy-client-dental-clinic-2.jpg" alt={t("Happy client looking at his new smile in a mirror at Bright Way Dental Clinic")} width={1400} height={1128} priority sizes="(min-width: 900px) 500px, 100vw" className={styles.frameImg} />
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.inner}>
          <h2 className={`${styles.title} ${styles.titleCentered}`}>{t("Virtual Smile Design (5 Options)")}{" "}<em>{t("for Only $5")}</em>
          </h2>
          <ul className={`${styles.cards} ${styles.two}`}>
            {designs.map((d) => (
              <li key={d.title} className={styles.card}>
                <span className={styles.cardIcon}><Tooth /></span>
                <h3 className={styles.cardTitle}>{t(d.title)}</h3>
                <p className={styles.cardText}>{t(d.text)}</p>
              </li>
            ))}
          </ul>
          <div className={`${styles.actions} ${styles.actionsCentered}`}>
            <GoldButton href="#signup">{t("Get 5 Virtual Smile Design")}{" "}<Arrow /></GoldButton>
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.bandCream}`}>
        <div className={styles.inner}>
          <h2 className={`${styles.title} ${styles.titleCentered}`}>{t("Why Choose")}{" "}<em>{t("Bright Way Dental Clinic?")}</em>
          </h2>
          <ul className={`${styles.cards} ${styles.four}`}>
            {whyChoose.map((w) => (
              <li key={w.title} className={styles.card}>
                <span className={styles.cardIcon}><Tooth /></span>
                <h3 className={styles.cardTitle}>{t(w.title)}</h3>
                <p className={styles.cardText}>{t(w.text)}</p>
              </li>
            ))}
          </ul>
          <div className={`${styles.actions} ${styles.actionsCentered}`}>
            <GoldButton href="#signup">{t("Transform Your Smile Today!")}{" "}<Arrow /></GoldButton>
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <div className={`${styles.inner} ${styles.split}`}>
          <div>
            <h2 className={styles.title}>{t("Benefits of Our")}{" "}<em>{t("Virtual Smile Design")}</em>
            </h2>
            <ul className={styles.benefits}>
              {benefits.map((b) => (
                <li key={b.title} className={styles.benefit}>
                  <Tooth />
                  <div>
                    <h3 className={styles.benefitTitle}>{t(b.title)}</h3>
                    <p className={styles.benefitText}>{t(b.text)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.actions}>
              <GoldButton href="#signup">{t("Get 5 Virtual Smile Design")}{" "}<Arrow /></GoldButton>
            </div>
          </div>
          <div className={styles.offer}>
            <p className={styles.save}>{t("10% discount")}</p>
            <h2 className={styles.offerTitle}>{t("Limited Time Offer")}</h2>
            <p className={styles.offerText}>{t("The 10% discount on dental implants is available for a limited time only. Secure your spot now to take advantage of this exclusive deal.")}</p>
            <p className={styles.offerText}>{t("We have a limited number of slots available for this special offer. Don’t miss out on the chance to transform your smile at an unbeatable price.")}</p>
            <div className={`${styles.actions} ${styles.actionsCentered}`}>
              <GoldButton href="#signup">{t("Act Now!")}{" "}<Arrow /></GoldButton>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.bandCream}`}>
        <div className={styles.inner}>
          <h2 className={`${styles.title} ${styles.titleCentered}`}>{t("How to")}{" "}<em>{t("Get Started")}</em>
          </h2>
          <ol className={`${styles.cards} ${styles.four}`}>
            {steps.map((s) => (
              <li key={s.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{t(s.title)}</h3>
                <p className={styles.cardText}>{t(s.text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="signup" className={styles.formBand}>
        <div className={styles.formInner}>
          <p className={styles.formLead}>{t("Ready to see your perfect smile? Don’t wait – Sign Up Now and start your journey to a brighter smile!")}</p>
          <LeadForm fields={nameFields} submitLabel={t("Sign Up Now")} thankYouPath="/transform-your-smile-typ/" />
        </div>
      </section>

      <Instagram />
      <Videos />
    </>
  );
}
