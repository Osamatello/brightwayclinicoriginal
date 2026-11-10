import { l, t } from "@/lib/i18n";
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
          <h2 className={styles.heading}>{t("Explore other")}{" "}<span>{t("dental services")}</span>
          </h2>
          <Link href={l("/services/")} className={styles.all}>{t("View all")}{" "}{t(total)}{" "}{t("treatments")}{" "}<Arrow />
          </Link>
        </div>

        <ul className={styles.grid}>
          {services.map((s) => (
            <li key={s.href}>
              <Link href={l(s.href)} className={styles.tile}>
                {/* the treatment name is the label right below, so the picture itself stays silent for screen readers */}
                <Image src={s.img} alt="" fill sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 80vw" className={styles.photo} />
                <span className={styles.label}>
                  <span className={styles.title}>{t(s.title)}</span>
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
