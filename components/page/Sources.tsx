import { t } from "@/lib/i18n";
import type { Source } from "@/content/seo-answers";
import styles from "./Sources.module.css";

/** "Sources" list under an article or treatment page: official health sites that back up its medical facts (open in a new tab). */
export default function Sources({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;
  return (
    <aside className={styles.sources} aria-labelledby="sources-heading">
      <h2 id="sources-heading" className={styles.heading}>{t("Sources")}</h2>
      <ul>
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener" dir="ltr">{s.name}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** Short direct answer under a treatment page's title. */
export function DirectAnswer({ text }: { text: string }) {
  return <p className={styles.answer}>{text}</p>;
}
