import { preload } from "react-dom";
import { l, t, h1Part } from "@/lib/i18n";
import { Arrow, GoldButton } from "@/components/ui";
import HeroMedia from "@/components/home/HeroMedia";
import { googleReviews } from "@/content/home";

// Google Business Profile figures live in content/home.ts (shared with the Testimonials section)
const GOOGLE_RATING = googleReviews.rating.toFixed(1);
const GOOGLE_REVIEWS = googleReviews.count;
const GOOGLE_MAPS_URL = googleReviews.url;

/**
 * Hero (v3, 2026-10-26): the clinic video fills the full width of the first screen,
 * one serif headline bottom-left, a trust card bottom-right.
 * The clinic's own video (2026-11-12): 0–21.8 s of the 27 s clip (its end card with contact details is left out, the hero has its own),
 * vertical cut for phones, landscape crop for wider screens, both muted. Source: Osama's "1111 (1).mp4".
 */
const HERO_VIDEO = {
  portrait: "/videos/hero-portrait.mp4",
  landscape: "/videos/hero-landscape.mp4",
  portraitPoster: "/videos/hero-portrait.webp",
  landscapePoster: "/videos/hero-landscape.webp",
};

export default function Hero() {
  // The poster is the biggest thing on the first screen (what PageSpeed times as "largest paint"): ask for the right one
  // straight from the <head>, ahead of fonts and scripts (Arabic home went 89 → 75 without this, 2026-11-12)
  preload(HERO_VIDEO.portraitPoster, { as: "image", type: "image/webp", fetchPriority: "high", media: "(max-width: 767px)" });
  preload(HERO_VIDEO.landscapePoster, { as: "image", type: "image/webp", fetchPriority: "high", media: "(min-width: 768px)" });
  return (
    <section id="hero" className="relative z-10 bg-white">
      <div className="relative isolate flex min-h-[640px] flex-col justify-end overflow-hidden lg:h-svh lg:max-h-[1017px]">
        <div className="pointer-events-none absolute inset-0 bg-brown-dark">
          <HeroMedia video={HERO_VIDEO} alt={t("Dr. Hasan A. Mahdy treating a patient at Bright Way Dental Clinic, Dubai")} />
          {/* legibility: dark bottom-left where the text is, the picture stays clear top-right */}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-5xl px-6 pb-8 pt-40 text-white sm:px-10 sm:pt-56 lg:px-14 lg:pb-18">
          <h1 className="font-display text-[3.25rem] font-medium leading-[0.92] tracking-[-0.01em] sm:text-7xl xl:text-[6.5rem]">{h1Part(0, "Bright Way Dental Clinic")}{" "}<em className="whitespace-nowrap font-normal text-gold-light">{h1Part(1, "in Dubai")}</em>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            <strong className="font-semibold text-white">{t("Your Reliable Digital Dentistry in Dubai and Modern comforting smiles.")}</strong>{" "}{t("Specializing in both aesthetic and health-focused treatments, our clinic combines expert care with advanced technology for unmatched dental excellence.")}</p>
          <GoldButton href={l("/contact-us/")} className="mt-8 px-8">{t("Get Dental Consultation")}{" "}<Arrow />
          </GoldButton>
        </div>

        {/* trust card: under the text on phones, bottom-right of the stage from lg */}
        <div className="relative mx-6 mb-6 grid divide-y divide-line rounded-2xl sm:grid-cols-2 sm:divide-x sm:divide-y-0 bg-white shadow-2xl sm:mx-10 sm:max-w-md lg:absolute lg:bottom-9 lg:end-14 lg:m-0 lg:w-[480px] lg:max-w-none">
          <a href={l(GOOGLE_MAPS_URL)} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-4 sm:p-5">
            <GoogleIcon />
            <div>
              <p className="flex items-center gap-1.5 text-lg font-extrabold leading-none text-brown-dark">
                {t(GOOGLE_RATING)}
                <span aria-hidden="true" className="flex text-gold">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} />
                  ))}
                </span>
              </p>
              <p className="mt-1.5 text-xs text-ink group-hover:text-gold-dark">
                <span className="sr-only">{t("Rated")}{" "}{t(GOOGLE_RATING)}{" "}{t("out of 5 from")}{" "}</span>
                {t(GOOGLE_REVIEWS)}{" "}{t("Google reviews")}</p>
            </div>
          </a>
          <div className="flex items-center gap-3 p-4 sm:p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold-dark">
              <ShieldIcon />
            </span>
            <div>
              <p className="font-extrabold leading-tight text-brown-dark">{t("Modern & safe")}</p>
              <p className="mt-1 text-xs text-ink">{t("Digital dentistry · DHA licensed")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="h-9 w-9 shrink-0">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.8-2.1 5.1-4.4 6.7v5.5h7.1c4.2-3.8 6.6-9.5 6.6-16.2z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.1 15.5 46 24 46z" />
      <path fill="#FBBC05" d="M11.8 28.3c-.4-1.3-.7-2.8-.7-4.3s.3-3 .7-4.3V14H4.5C3 17 2.2 20.4 2.2 24s.8 7 2.3 10l7.3-5.7z" />
      <path fill="#EA4335" d="M24 10.8c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.5 2 8.1 6.9 4.5 14l7.3 5.7c1.7-5.2 6.5-8.9 12.2-8.9z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z" />
      <path d="M8.8 12.2l2.2 2.2 4.2-4.4" />
    </svg>
  );
}
