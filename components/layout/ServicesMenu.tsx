"use client";

import { useI18n } from "@/lib/i18n-client";
import Link from "next/link";
import { clinic, serviceGroups } from "@/content/site";
import { services } from "@/content/home";
import styles from "./NavLinks.module.css";

import { ICONS } from "./serviceIcons";

/** Large-screen Services drop-down: five groups with an icon beside each treatment, "All services" and the booking number below. */
export default function ServicesMenu() {
  const { l, t } = useI18n();
  return (
    <div className={styles.mega}>
      <div className={styles.megaGroups}>
        {serviceGroups.map((group) => (
          <div key={group.label}>
            <p className={styles.megaHeading}>{t(group.label)}</p>
            <ul>
              {group.hrefs.map((href) => {
                const service = services.find((s) => s.href === href);
                if (!service) return null;
                return (
                  <li key={href}>
                    <Link href={l(href)} className={styles.megaLink}>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.megaIcon}>
                        {ICONS[href]}
                      </svg>
                      {t(service.title)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.megaFoot}>
        <Link href={l("/services/")} className={styles.megaAll}>
          {t("All services")}{" "}
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
        </Link>
        <a href={`tel:${clinic.phone}`} className={styles.megaBooking}>
          {t("Booking")}{" · "}<strong>{t(clinic.phoneDisplay)}</strong>
        </a>
      </div>
    </div>
  );
}
