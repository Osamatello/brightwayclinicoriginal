import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui";
import styles from "./MoreTreatments.module.css";

type Service = { title: string; img: string; href: string };

/** "More treatments": tall 4:5 photo tiles with the title over a soft fade at the bottom. */
export default function MoreTreatments({ services, total }: { services: Service[]; total: number }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            Explore other <span>dental services</span>
          </h2>
          <Link href="/services/" className={styles.all}>
            View all {total} treatments <Arrow />
          </Link>
        </div>

        <ul className={styles.grid}>
          {services.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className={styles.tile}>
                <Image src={s.img} alt={s.title} fill sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 80vw" className={styles.photo} />
                <span className={styles.label}>
                  <span className={styles.title}>{s.title}</span>
                  <span className={styles.arrow} aria-hidden="true"><Arrow /></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
