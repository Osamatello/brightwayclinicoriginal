import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "@/components/ui";
import styles from "./ServicesGrid.module.css";

type Service = { title: string; text: string; img: string; href: string };

const TOOTH = "M7.5 3.5c-2.2 0-3.6 2-3 4.6.5 2.2 1 4 1.3 6.3.3 2.6.7 5.6 2 5.6 1.2 0 1.4-2.6 1.8-4.6.3-1.4.8-2 2.4-2s2.1.6 2.4 2c.4 2 .6 4.6 1.8 4.6 1.3 0 1.7-3 2-5.6.3-2.3.8-4.1 1.3-6.3.6-2.6-.8-4.6-3-4.6-1.8 0-2.6 1-4.5 1s-2.7-1-4.5-1Z";

// One line icon per treatment (24px grid), keyed by the service page
export const serviceIcons: Record<string, ReactNode> = {
  "/dentalimplants-en/": <><path d="M7 2.5c-2 0-3 1.8-2.5 4 .3 1.4 1 2.5 2 2.5h11c1 0 1.7-1.1 2-2.5.5-2.2-.5-4-2.5-4-1.7 0-2.5.9-5 .9s-3.3-.9-5-.9Z" /><path d="M10 9v10l2 2 2-2V9M9.5 12h5M9.5 14.5h5M10 17h4" /></>,
  "/teeth-cleaning-and-gum-treatment/": <><path d={TOOTH} /><path d="M20.5 1v3.5M18.75 2.75h3.5" /></>,
  "/teeth-whitening/": <><path d={TOOTH} /><path d="M12 .5v1.5M2.5 2.5l1 1M21.5 2.5l-1 1M8.5 8.5c1-.8 2.2-1 3.5-1" /></>,
  "/tooth-extraction/": <><path d={TOOTH} /><path d="M21.5 22v-6M19.5 18l2-2 2 2" /></>,
  "/oral-surgery/": <><path d={TOOTH} /><path d="M1 23l5-5M5 17l2 2" /></>,
  "/root-canal-treatment/": <><path d={TOOTH} /><path d="M10 9.5h4M10.4 13v4.5M13.6 13v4.5" /></>,
  "/veneer-en/": <><path d={TOOTH} /><path d="M6 8.5c2.5 1.5 9.5 1.5 12 0" /></>,
  "/cosmetic-dentistry/": <><path d="M2.5 9.5c4 7 15 7 19 0M2.5 9.5c4 2.5 15 2.5 19 0" /><path d="M8 11.3v2.6M12 11.8v3M16 11.3v2.6" /></>,
  "/pediatric-dentistry/": <><path d={TOOTH} /><path d="M9.6 8.6h.01M14.4 8.6h.01M9.8 10.6c1.2 1 3.2 1 4.4 0" /></>,
  "/orthodontics-en/": <><path d={TOOTH} /><path d="M2 10h20M10 8.5h4v3h-4z" /></>,
  "/prosthodontics/": <><path d="M7 9h10V4.5l-2.5 2L12 3 9.5 6.5 7 4.5Z" /><path d="M8.5 12h7l-1 7c-.2 1.3-1.6 1.3-1.8 0L12 16l-.7 3c-.2 1.3-1.6 1.3-1.8 0Z" /></>,
};

export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section className={styles.section}>
      <ul className={styles.grid}>
        {services.map((s) => (
          <li key={s.href} className={styles.item}>
            <Link href={s.href} className={styles.card}>
              <div className={styles.media}>
                <Image src={s.img} alt={`${s.title} at Bright Way Dental Clinic, Dubai`} fill sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw" className={styles.photo} />
              </div>
              <span className={styles.icon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  {serviceIcons[s.href]}
                </svg>
              </span>
              <div className={styles.body}>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={styles.text}>{s.text}</p>
                <span className={styles.more}>
                  Learn more <Arrow />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
