import { l, t } from "@/lib/i18n";
import type { ReactNode } from "react";
import { clinic } from "@/content/site";
import { socialIcons } from "@/components/layout/Footer";
import LeadFormShell from "@/components/page/LeadFormShell";
import styles from "./Contact.module.css";

const icon = (d: ReactNode) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);
const icons = {
  pin: icon(<><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>),
  clock: icon(<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>),
  phone: icon(<path d="M21 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.1 4.2 2 2 0 0 1 3.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />),
  mail: icon(<><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></>),
  user: icon(<><circle cx="12" cy="8" r="3.8" /><path d="M4.5 20.5c1.2-3.8 4-5.6 7.5-5.6s6.3 1.8 7.5 5.6" /></>),
  message: icon(<path d="M20 15.5a2 2 0 0 1-2 2H8l-4 3.5v-15a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z" />),
  arrow: icon(<path d="M5 12h14M13 6l6 6-6 6" />),
};

const TOOTH = "M8.6 9.5C7 5.6 9.2 2.5 12.6 2.5c1.7 0 2.3 1.3 3.4 1.3s1.7-1.3 3.4-1.3c3.4 0 5.6 3.1 4 7l-1.7 8.4-1 8.7c-.3 2.4-2.8 2.4-3.1 0L16.7 20h-1.4l-.9 6.6c-.3 2.4-2.8 2.4-3.1 0l-1-8.7Z";

/**
 * Contact section. The form sends through LeadFormShell.
 * `page` = the Contact page's version, in the old page's order: form and map first, then "Contact Us" with the details and social links.
 */
export default function Contact({ page = false }: { page?: boolean }) {
  // Each line shows on its own row; both phone numbers are tappable
  const info: { label: string; icon: ReactNode; lines: { text: string; href?: string }[] }[] = [
    { label: "Visit us", icon: icons.pin, lines: [{ text: clinic.address }] },
    { label: "Opening hours", icon: icons.clock, lines: [{ text: clinic.hours }] },
    {
      label: "Call us",
      icon: icons.phone,
      lines: [
        { text: clinic.phoneDisplay, href: `tel:${clinic.phone}` },
        { text: clinic.landlineDisplay, href: `tel:${clinic.landline}` },
      ],
    },
    { label: "Email", icon: icons.mail, lines: [{ text: clinic.email, href: `mailto:${clinic.email}` }] },
  ];
  const FormTitle = page ? "h2" : "h3"; // an H2 on the old Contact page

  // Clinic details: one wide strip, four columns
  const details = (
    <dl className={styles.info}>
      {info.map((item) => (
        <div key={item.label} className={styles.infoItem}>
          <span className={styles.infoIcon}>{item.icon}</span>
          <div>
            <dt className={styles.infoLabel}>{t(item.label)}</dt>
            {item.lines.map((line) => (
              <dd key={line.text} className={styles.infoValue}>
                {line.href ? <a href={l(line.href)}>{t(line.text)}</a> : t(line.text)}
              </dd>
            ))}
          </div>
        </div>
      ))}
    </dl>
  );

  return (
    <section id="contact" aria-labelledby="contact-heading" className={`${styles.section} ${page ? styles.page : ""}`}>
      <div className={styles.inner}>
        {!page && (
          <>
            <header className={styles.header}>
              <h2 id="contact-heading" className={styles.heading}>{t("Get In Touch")}{" "}<span>{t("with Our Team")}</span>
              </h2>
              <p className={styles.intro}>{t("Have questions or need to schedule an appointment? Our team is ready to assist with your dental care needs, from general inquiries to booking your next visit.")}</p>
            </header>
            {details}
          </>
        )}

        <div className={styles.layout}>
          {/* Booking card */}
          <LeadFormShell className={styles.form}>
            <svg aria-hidden="true" viewBox="0 0 32 32" className={styles.watermark}><path d={TOOTH} /></svg>
            <FormTitle className={styles.formTitle}>{t("Book Your")}{" "}<span>{t("Appointment Now")}</span>
            </FormTitle>
            <p className={styles.formNote}>{t("Please fill the form below and our team will contact you as soon as possible.")}</p>
            <div className={styles.pair}>
              <label className={styles.field}>
                <span>{icons.user}{t("First name")}</span>
                <input name="fname" autoComplete="given-name" required />
              </label>
              <label className={styles.field}>
                <span>{icons.user}{t("Last name")}</span>
                <input name="lname" autoComplete="family-name" />
              </label>
            </div>
            <div className={styles.pair}>
              <label className={styles.field}>
                <span>{icons.phone}{t(page ? "Phone Number" : "Phone")}</span>
                <input name="phone" type="tel" autoComplete="tel" required />
              </label>
              <label className={styles.field}>
                <span>{icons.mail}{t("Email")}</span>
                <input name="email" type="email" autoComplete="email" />
              </label>
            </div>
            <label className={styles.field}>
              <span>{icons.message}{t("Message")}</span>
              <textarea name="message" rows={2} />
            </label>
            <button type="submit" className={styles.send}>{t("Send")}{" "}<span className={styles.sendArrow}>{icons.arrow}</span>
            </button>
          </LeadFormShell>

          {/* Landscape map in a gold frame */}
          <div className={styles.map}>
            <iframe
              title={t("Bright Way Dental Clinic on Google Maps")}
              src={clinic.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {page && (
          <div className={styles.reach}>
            <h2 id="contact-heading" className={styles.reachHeading}>{t("Contact Us")}</h2>
            {details}
            <p className={styles.stay}>{t("Stay connected with Bright Way Dental Clinic through our social media channels for the latest updates, dental tips, and special offers.")}</p>
            <div className={styles.social}>
              {Object.entries(clinic.social).map(([name, href]) => (
                <a key={name} href={l(href)} className={styles.socialLink}>
                  {socialIcons[name]}
                  {t(name)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
