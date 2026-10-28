import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { clinic, nav } from "@/content/site";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import styles from "./Footer.module.css";

const icon = (d: ReactNode) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);
const icons = {
  pin: icon(<><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>),
  clock: icon(<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>),
  phone: icon(<path d="M21 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.1 4.2 2 2 0 0 1 3.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />),
};
const socialIcons: Record<string, ReactNode> = {
  facebook: icon(<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" />),
  instagram: icon(<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.3" cy="6.7" r=".6" fill="currentColor" /></>),
  youtube: icon(<><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10.5 9.5 4.5 2.5-4.5 2.5z" fill="currentColor" /></>),
};

/** Site footer on every page: warm off-white, brown text, small gold accents. */
export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <Image src="/images/logo.png" alt={clinic.name} width={2953} height={1135} className={styles.logo} />
            <p className={styles.tagline}>Good health begins with dental health.</p>
            <p className={styles.blurb}>
              Stay connected with Bright Way Dental Clinic through our social media channels for the latest updates, dental tips, and special offers.
            </p>
          </div>

          <nav aria-label="Footer" className={styles.nav}>
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.reach}>
            <ul className={styles.contact}>
              <li>{icons.pin}<span>{clinic.address}</span></li>
              <li>{icons.clock}<span>{clinic.hours}</span></li>
              <li>
                {icons.phone}
                <span className={styles.phones}>
                  <a href={`tel:${clinic.phone}`}>{clinic.phoneDisplay}</a>
                  <a href={`tel:${clinic.landline}`}>{clinic.landlineDisplay}</a>
                </span>
              </li>
            </ul>
            <div className={styles.social}>
              {Object.entries(clinic.social).map(([name, href]) => (
                <a key={name} href={href} className={styles.socialLink}>
                  {socialIcons[name]}
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.bottom}>© {new Date().getFullYear()} {clinic.name}, Dubai</div>
      </footer>
      <FloatingWhatsApp />
    </>
  );
}
