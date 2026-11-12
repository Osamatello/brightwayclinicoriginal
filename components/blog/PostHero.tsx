import { l, t } from "@/lib/i18n";
import Link from "next/link";
import ScatteredTeeth from "@/components/page/ScatteredTeeth";
import styles from "./PostHero.module.css";

/** Blog post title area: same light look as the blog list, left edge lined up with the article below. */
export default function PostHero({ title, meta, reviewedBy = true }: { title: string; meta: string; reviewedBy?: boolean }) {
  const chevron = (
    <li aria-hidden="true" className={styles.chevron}>
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m4.5 2.5 3.500 3.500-3.500 3.500" /></svg>
    </li>
  );

  return (
    <section className={styles.section}>
      <ScatteredTeeth />
      <div className={styles.inner}>
        <nav aria-label={t("Breadcrumb")} className={styles.crumbs}>
          <ol>
            <li><Link href={l("/")}>{t("Home")}</Link></li>
            {chevron}
            <li><Link href={l("/blog/")}>{t("Blog")}</Link></li>
            {chevron}
            <li aria-current="page">{t(title)}</li>
          </ol>
        </nav>

        <h1 className={styles.heading}>{t(title)}</h1>
        <p className={styles.meta}>
          <svg aria-hidden="true" viewBox="0 0 48 52" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
            <path d="M24 8c-4-3-9-4-13-1-5 3-6 10-4 16 1 5 3 8 4 13 1 4 2 10 6 10 3 0 3-4 4-8 .6-3 1.500-5 3-5s2.400 2 3 5c1 4 1 8 4 8 4 0 5-6 6-10 1-5 3-8 4-13 2-6 1-13-4-16-4-3-9-2-13 1Z" />
          </svg>
          <span>
            {t(meta)}
            {/* medical review line (Osama's OK, 2026-11-12): who stands behind the article's medical content */}
            {reviewedBy && (
              <>
                {" · "}{t("Medically reviewed by")}{" "}<Link href={l("/dr-hasan-a-mahdy/")} className={styles.reviewer}>{t("Dr. Hasan A. Mahdy")}</Link>
              </>
            )}
          </span>
        </p>
      </div>
    </section>
  );
}
