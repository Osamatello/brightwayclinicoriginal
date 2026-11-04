import { l, t } from "@/lib/i18n";
import Link from "next/link";
import ScatteredTeeth from "@/components/page/ScatteredTeeth";
import styles from "./GalleryHero.module.css";

export default function GalleryHero() {
  return (
    <section className={styles.section}>
      <ScatteredTeeth />
      <div className={styles.inner}>
        <nav aria-label={t("Breadcrumb")} className={styles.crumbs}>
          <ol>
            <li>
              <Link href={l("/")}>{t("Home")}</Link>
            </li>
            <li aria-hidden="true" className={styles.chevron}>
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m4.5 2.5 3.500 3.500-3.500 3.500" /></svg>
            </li>
            <li aria-current="page">{t("Smile Gallery")}</li>
          </ol>
        </nav>

        <h1 className={styles.heading}>{t("Before and After")}{" "}<em>{t("Dental Transformations")}</em>
        </h1>
        <p className={styles.topics}>
          <svg aria-hidden="true" viewBox="0 0 48 52" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
            <path d="M24 8c-4-3-9-4-13-1-5 3-6 10-4 16 1 5 3 8 4 13 1 4 2 10 6 10 3 0 3-4 4-8 .6-3 1.500-5 3-5s2.400 2 3 5c1 4 1 8 4 8 4 0 5-6 6-10 1-5 3-8 4-13 2-6 1-13-4-16-4-3-9-2-13 1Z" />
          </svg>{t("Smile Gallery")}</p>
        {/* The old page's own description (its SEO meta description), word for word */}
        <p className={styles.intro}>{t("Showcase stunning smile transformations at Brightway Dental Clinic real before & after results that reflect expert care and beautiful outcomes.")}</p>
      </div>
    </section>
  );
}
