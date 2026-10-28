import type { ReactNode } from "react";
import { clinic } from "@/content/site";
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

/** Contact section (also on /contact-us/). The form's destination is not decided yet (plan D4) — submit does nothing until it is. */
export default function Contact() {
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
  return (
    <section id="contact" aria-labelledby="contact-heading" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="contact-heading" className={styles.heading}>
            Get In Touch <span>with Our Team</span>
          </h2>
          <p className={styles.intro}>
            Have questions or need to schedule an appointment? Our team is ready to assist with your dental care needs, from general inquiries to booking your next visit.
          </p>
        </header>

        {/* Clinic details: one wide strip, four columns */}
        <dl className={styles.info}>
          {info.map((item) => (
            <div key={item.label} className={styles.infoItem}>
              <span className={styles.infoIcon}>{item.icon}</span>
              <div>
                <dt className={styles.infoLabel}>{item.label}</dt>
                {item.lines.map((line) => (
                  <dd key={line.text} className={styles.infoValue}>
                    {line.href ? <a href={line.href}>{line.text}</a> : line.text}
                  </dd>
                ))}
              </div>
            </div>
          ))}
        </dl>

        <div className={styles.layout}>
          {/* Booking card */}
          <form className={styles.form} action="#" method="post">
            <svg aria-hidden="true" viewBox="0 0 32 32" className={styles.watermark}><path d={TOOTH} /></svg>
            <h3 className={styles.formTitle}>
              Book Your <span>Appointment Now</span>
            </h3>
            <p className={styles.formNote}>Please fill the form below and our team will contact you as soon as possible.</p>
            <div className={styles.pair}>
              <label className={styles.field}>
                <span>{icons.user}First name</span>
                <input name="fname" autoComplete="given-name" required />
              </label>
              <label className={styles.field}>
                <span>{icons.user}Last name</span>
                <input name="lname" autoComplete="family-name" />
              </label>
            </div>
            <div className={styles.pair}>
              <label className={styles.field}>
                <span>{icons.phone}Phone</span>
                <input name="phone" type="tel" autoComplete="tel" required />
              </label>
              <label className={styles.field}>
                <span>{icons.mail}Email</span>
                <input name="email" type="email" autoComplete="email" />
              </label>
            </div>
            <label className={styles.field}>
              <span>{icons.message}Message</span>
              <textarea name="message" rows={2} />
            </label>
            <button type="submit" className={styles.send}>
              Send <span className={styles.sendArrow}>{icons.arrow}</span>
            </button>
          </form>

          {/* Landscape map in a gold frame */}
          <div className={styles.map}>
            <iframe
              title="Bright Way Dental Clinic on Google Maps"
              src={clinic.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
