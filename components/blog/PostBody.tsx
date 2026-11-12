import { t } from "@/lib/i18n";
import Image from "next/image";
import { BookingAside } from "@/components/treatment/TreatmentBody";
import styles from "./PostBody.module.css";
import Sources from "@/components/page/Sources";
import type { Source } from "@/content/seo-answers";

/** Blog post article (WordPress HTML, restyled like the treatment pages) with the light booking card beside it. Text unchanged. */
export default function PostBody({
  title,
  html,
  featured,
  bookingTitle = "Have a question about your teeth?",
  sources = [],
}: {
  title: string;
  html: string;
  featured?: string;
  bookingTitle?: string;
  sources?: Source[];
}) {
  // Some posts open with a copy of the featured photo under another file name: show one, not both
  const opensWithImage = /^\s*(<figure[^>]*>\s*)?<img\b/i.test(html);
  const showFeatured = featured && !opensWithImage && !html.includes(featured);
  // Older posts use small downloaded icons (name_12345.png) above sub-headings: keep them icon-sized
  const body = html.replace(/<img\b(?=[^>]*_\d{5,}\.png)/g, `<img class="${styles.icon}"`);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.main}>
          {showFeatured && (
            <div className={styles.featured}>
              <Image src={featured} alt={t(title)} fill priority sizes="(min-width: 1024px) 720px, 100vw" className={styles.featuredImg} />
            </div>
          )}
          <article className={styles.article} dangerouslySetInnerHTML={{ __html: body }} />
          <Sources sources={sources} />
        </div>
        <BookingAside title={t(bookingTitle)} />
      </div>
    </section>
  );
}
