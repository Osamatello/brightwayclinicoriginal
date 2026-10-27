import Image from "next/image";
import { googleReviews, testimonials } from "@/content/home";
import { getGoogleReviews, type GoogleReview } from "@/lib/googleReviews";
import { Arrow } from "@/components/ui";
import styles from "./Testimonials.module.css";

type Card = GoogleReview & { source: "google" | "clinic"; photo?: string; lang?: "ar" };

export default async function Testimonials() {
  const live = await getGoogleReviews();
  const rating = live?.rating ?? googleReviews.rating;
  const count = live?.count ?? googleReviews.count;
  // Live Google reviews first (Places API returns up to 5), then the clinic's own testimonials; 6 cards max
  const cards: Card[] = [
    ...(live?.reviews ?? []).map((r): Card => ({ ...r, source: "google" })),
    ...testimonials.map((t): Card => ({ author: t.name, rating: 5, text: t.quote, source: t.source, photo: t.photo, lang: t.lang })),
  ].slice(0, 6);

  return (
    <section aria-labelledby="testimonials-heading" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.top}>
          <h2 id="testimonials-heading" className={styles.heading}>
            The Honest <span>Patient Testimonials</span>
          </h2>

          <div className={styles.score} role="group" aria-label="Google rating">
            <p className={styles.rating}>{rating.toFixed(1)}</p>
            <div className={styles.scoreDetails}>
              <Stars count={5} className={styles.scoreStars} />
              <p className={styles.based}>Based on {count} reviews</p>
              <a href={googleReviews.url} target="_blank" rel="noopener noreferrer" className={styles.allLink}>
                <GoogleIcon /> Read all reviews on Google <Arrow />
              </a>
            </div>
          </div>
        </header>

        <div className={styles.grid}>
          {cards.map((card) => (
            <figure key={card.author + card.text.slice(0, 20)} className={styles.review}>
              <span aria-hidden="true" className={styles.quoteMark}>&ldquo;</span>
              <Stars count={card.rating} className={styles.stars} />
              <blockquote className={styles.text} lang={card.lang} dir={card.lang === "ar" ? "rtl" : undefined}>{card.text}</blockquote>
              <figcaption className={styles.author}>
                {card.photo ? (
                  <Image src={card.photo} alt="" width={104} height={104} className={styles.avatar} />
                ) : (
                  <span aria-hidden="true" className={styles.initial}>{card.author.charAt(0)}</span>
                )}
                <span>
                  {card.authorUrl ? (
                    <a href={card.authorUrl} target="_blank" rel="noopener noreferrer" className={styles.name}>{card.author}</a>
                  ) : (
                    <span className={styles.name}>{card.author}</span>
                  )}
                  <span className={styles.meta}>
                    {card.source === "google" ? <><GoogleIcon small /> Google review{card.when ? ` · ${card.when}` : ""}</> : "Bright Way patient"}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars({ count, className }: { count: number; className: string }) {
  return (
    <span className={className} role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} aria-hidden="true" viewBox="0 0 20 20" fill={i < count ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1">
          <path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z" />
        </svg>
      ))}
    </span>
  );
}

function GoogleIcon({ small = false }: { small?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" width={small ? 13 : 20} height={small ? 13 : 20}>
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.8-2.1 5.1-4.4 6.7v5.5h7.1c4.2-3.8 6.6-9.5 6.6-16.2z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.1 15.5 46 24 46z" />
      <path fill="#FBBC05" d="M11.8 28.3c-.4-1.3-.7-2.8-.7-4.3s.3-3 .7-4.3V14H4.5C3 17 2.2 20.4 2.2 24s.8 7 2.3 10l7.3-5.7z" />
      <path fill="#EA4335" d="M24 10.8c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.5 2 8.1 6.9 4.5 14l7.3 5.7c1.7-5.2 6.5-8.9 12.2-8.9z" />
    </svg>
  );
}
