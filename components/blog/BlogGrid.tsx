import { l, t } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { formatDate, type Entry } from "@/lib/content";
import { Arrow } from "@/components/ui";
import styles from "./BlogGrid.module.css";

/** Even grid of article cards: "All articles" on the blog page, or `keepReading` (cream band) under a post. */
export default function BlogGrid({ posts, keepReading = false }: { posts: Entry[]; keepReading?: boolean }) {
  return (
    <section className={`${styles.section} ${keepReading ? styles.keepReading : ""}`}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          {t(keepReading ? "Keep" : "All")} <em>{t(keepReading ? "reading" : "articles")}</em>
        </h2>
        <div className={styles.grid}>
          {posts.map((post, i) => (
            <Link key={post.id} href={l(post.path)} className={styles.card}>
              <div className={styles.photo}>
                {post.featured && (
                  <Image src={post.featured} alt={t(post.title)} fill priority={!keepReading && i < 3} sizes="(min-width: 1100px) 400px, (min-width: 640px) 50vw, 100vw" className={styles.img} />
                )}
              </div>
              <div className={styles.text}>
                <time dateTime={post.date} className={styles.date}>{formatDate(post.date)}</time>
                <h3 className={styles.title}>{t(post.title)}</h3>
                <p className={styles.excerpt}>{post.seo.description || post.excerpt}</p>
                <span className={styles.read}>{t("Read article")}{" "}<Arrow />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
