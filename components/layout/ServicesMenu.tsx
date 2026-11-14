"use client";

import { useI18n } from "@/lib/i18n-client";
import Link from "next/link";
import type { ReactNode } from "react";
import { clinic, serviceGroups } from "@/content/site";
import { services } from "@/content/home";
import styles from "./NavLinks.module.css";

// Small line icons, one per treatment (24 × 24, drawn in the menu's gold)
const tooth = "M8 3.5c-2.6 0-4.2 2.3-3.5 5.3.5 2.3 1.1 4.2 1.4 6.7.3 2.8.8 5 2.1 5 1.3 0 1.5-2.2 1.9-4.2.3-1.4.8-2 2.1-2s1.8.6 2.1 2c.4 2 .6 4.2 1.9 4.2s1.8-2.2 2.1-5c.3-2.5.9-4.4 1.4-6.7.7-3-.9-5.3-3.5-5.3-1.7 0-2.4 1-4 1s-2.3-1-4-1Z";
const ICONS: Record<string, ReactNode> = {
  "/teeth-cleaning-and-gum-treatment/": (
    <>
      <path d={tooth} />
      <path d="M17.5 2.5l1 1.5M20 5.5l1.5-.5M19.5 1.5l.3 1.5" />
    </>
  ),
  "/root-canal-treatment/": (
    <>
      <path d={tooth} />
      <path d="M12 7v9M12 16l-.8 3M12 16l.8 3" />
    </>
  ),
  "/pediatric-dentistry/": (
    <>
      <path d="M8.5 6c-2.2 0-3.5 1.8-3 4.2.4 1.8.9 3.3 1.1 5.3.2 2.2.6 3.9 1.6 3.9s1.2-1.7 1.5-3.3c.2-1.1.6-1.6 1.6-1.6h1.4c1 0 1.4.5 1.6 1.6.3 1.6.5 3.3 1.5 3.3s1.4-1.7 1.6-3.9c.2-2 .7-3.5 1.1-5.3.5-2.4-.8-4.2-3-4.2-1.3 0-1.9.8-3.2.8S9.8 6 8.5 6Z" />
      <path d="M10 10.5h.01M14 10.5h.01M10.3 12.6c1 .8 2.4.8 3.4 0" />
    </>
  ),
  "/veneer-en/": (
    <>
      <path d="M6.5 4h11c1 0 1.6.8 1.5 1.8l-1.2 9.4c-.4 2.9-2.6 4.8-5.8 4.8s-5.4-1.9-5.8-4.8L5 5.8C4.9 4.8 5.5 4 6.5 4Z" />
      <path d="M8.5 8.5c2.3 1 4.7 1 7 0" />
    </>
  ),
  "/teeth-whitening/": (
    <>
      <path d={tooth} />
      <path d="M19 2.5v3M17.5 4h3M3 5.5l1.2 1.2M2.5 10h1.7" />
    </>
  ),
  "/cosmetic-dentistry/": (
    <>
      <path d="M4 10c2.5 5.5 13.5 5.5 16 0" />
      <path d="M4 10c4 2 12 2 16 0" />
      <path d="M12 3.5l.9 2.1 2.1.9-2.1.9L12 9.5l-.9-2.1L9 6.5l2.1-.9Z" />
    </>
  ),
  "/dentalimplants-en/": (
    <>
      <path d="M8.5 3h7v3.5h-7zM9.5 6.5v8.5l2.5 5 2.5-5V6.5" />
      <path d="M9.5 9.5l5 1.5M9.5 12.5l5 1.5" />
    </>
  ),
  "/prosthodontics/": (
    <>
      <path d="M3.5 9.5c0-2.5 1.6-4 3.6-4 1.1 0 1.6.6 2.4.6s1.3-.6 2.5-.6 1.7.6 2.5.6 1.3-.6 2.4-.6c2 0 3.6 1.5 3.6 4v4h-17v-4Z" />
      <path d="M3.5 13.5v3c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2v-3M9 13.5v5M15 13.5v5" />
    </>
  ),
  "/orthodontics-en/": (
    <>
      <path d="M3 9.5h18M3 14.5h18" />
      <rect x="4.5" y="7.5" width="4" height="4" rx="1" />
      <rect x="10" y="7.5" width="4" height="4" rx="1" />
      <rect x="15.5" y="7.5" width="4" height="4" rx="1" />
      <path d="M5.5 14.5v3M12 14.5v3M18.5 14.5v3" />
    </>
  ),
  "/oral-surgery/": (
    <>
      <path d="M4 20 14.5 9.5M14.5 9.5l2.5-2.5 1 1-2.5 2.5M17 7l2.5-2.5a1.4 1.4 0 0 1 2 2L19 9" />
      <path d="M4 20l1.5-4 2.5 2.5Z" />
    </>
  ),
  "/tooth-extraction/": (
    <>
      <path d="M8 7.5c-2.3 0-3.5 2-3 4.6.4 2 .9 3.6 1.2 5.8.2 2 .6 3.6 1.7 3.6 1.1 0 1.3-1.9 1.6-3.6.3-1.2.7-1.8 1.8-1.8h1.4c1.1 0 1.5.6 1.8 1.8.3 1.7.5 3.6 1.6 3.6s1.5-1.6 1.7-3.6c.3-2.2.8-3.8 1.2-5.8.5-2.6-.7-4.6-3-4.6-1.4 0-2 .8-3.5.8S9.4 7.5 8 7.5Z" />
      <path d="M12 1.5v4M10 3.5l2 2 2-2" />
    </>
  ),
};

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
