import { clinic } from "@/content/site";
import { Check, GoldButton, OutlineButton, WhatsAppIcon } from "@/components/ui";
import { PixelEvents } from "@/components/tracking/MetaPixel";
import ScatteredTeeth from "@/components/page/ScatteredTeeth";
import styles from "./ThankYou.module.css";

const conversionEvents = ["Lead", "CompleteRegistration"];

/** Thank-you page shown after a landing-page form (the "-typ" URLs used by the ad campaigns). Text from the old pages. */
export default function ThankYou({ message }: { message: string }) {
  return (
    <section className={styles.section}>
      <ScatteredTeeth />
      <PixelEvents events={conversionEvents} />
      <div className={styles.card}>
        <span className={styles.check}>
          <Check />
        </span>
        <h1 className={styles.heading}>
          Thank You for Choosing <em>Bright Way Dental Clinic!</em>
        </h1>
        <p className={styles.message}>{message}</p>
        <p className={styles.text}>
          Our team will contact you shortly via WhatsApp or email with your personalized smile designs. In the meantime, if you have any questions or need further assistance, feel free to reach out to us.
        </p>
        <div className={styles.actions}>
          <GoldButton href="/">Back to home page</GoldButton>
          <OutlineButton href={clinic.whatsapp}>
            <WhatsAppIcon /> WhatsApp us
          </OutlineButton>
        </div>
      </div>
    </section>
  );
}
