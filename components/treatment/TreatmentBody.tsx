import { clinic } from "@/content/site";
import { Arrow, GoldButton, WhatsAppIcon } from "@/components/ui";
import type { TreatmentFigure } from "@/content/treatments";
import styles from "./TreatmentBody.module.css";

const escapeAttr = (v: string) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const escapeRegExp = (v: string) => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Drops each extra photo in right after the closing tag of the heading whose text starts with `after`. */
function withFigures(html: string, figures: TreatmentFigure[]) {
  return figures.reduce((out, f) => {
    const heading = new RegExp(`<h([23])>(?:\\s|<b>)*${escapeRegExp(f.after)}[\\s\\S]*?</h\\1>`);
    return out.replace(
      heading,
      (h) => `${h}<figure class="${styles.figure}"><img src="${f.src}" alt="${escapeAttr(f.alt)}" width="1536" height="1024" loading="lazy" decoding="async"></figure>`,
    );
  }, html);
}

/** Treatment page article (WordPress HTML, restyled) with a light, sticky booking card beside it. Text unchanged. */
export default function TreatmentBody({ html, figures = [], hideOldImages = false }: { html: string; figures?: TreatmentFigure[]; hideOldImages?: boolean }) {
  const body = hideOldImages ? html.replace(/<img\b[^>]*>\s*/g, "") : html;
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <article className={styles.article} dangerouslySetInnerHTML={{ __html: withFigures(body, figures) }} />

        <aside className={styles.booking}>
          <p className={styles.bookingTitle}>Book your consultation</p>
          <p className={styles.bookingText}>Our DHA-licensed dentists will examine your case and plan the right treatment for you.</p>
          <GoldButton href="/contact-us/" className="w-full">
            Get Dental Consultation <Arrow />
          </GoldButton>
          <a href={clinic.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.whatsapp}>
            <WhatsAppIcon /> WhatsApp us
          </a>
          <dl className={styles.details}>
            <div>
              <dt>Call</dt>
              <dd><a href={`tel:${clinic.phone}`}>{clinic.phoneDisplay}</a></dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>{clinic.hours}</dd>
            </div>
            <div>
              <dt>Visit</dt>
              <dd>{clinic.address}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
