import { t } from "@/lib/i18n";
import type { CSSProperties } from "react";
import { instagramPosts } from "@/content/home";
import { clinic } from "@/content/site";
import { Arrow } from "@/components/ui";
import ig from "./Instagram.module.css";
import ReelsAutoplay from "./ReelsAutoplay";

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r=".6" fill="currentColor" />
    </svg>
  );
}

function ReelGlyph({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M3 8.5h18M9 3l2.5 5.5M14.5 3 17 8.5" />
      <path d="M10.2 12.2v4.6l4-2.3z" fill="currentColor" />
    </svg>
  );
}

export function Instagram() {
  return (
    <section id="instagram" aria-labelledby="instagram-heading" className={ig.section}>
      <div className={ig.inner}>
        <header className={ig.header}>
          <h2 id="instagram-heading" className={ig.heading}>{t("Follow Us on")}{" "}<span>{t("Instagram")}</span>
          </h2>
          <a href={clinic.social.instagram} className={ig.handle}>
            <span className={ig.ring}><InstagramGlyph className={ig.ringIcon} /></span>{t("@dr.hasanmahdy")}{" "}<Arrow />
          </a>
        </header>
        {/* Real reels fanned like a hand of cards, all playing silently while on screen; each opens its own reel */}
        <ReelsAutoplay dir="ltr" className={ig.deck}>
          {instagramPosts.map((p, i) => {
            const offset = i - (instagramPosts.length - 1) / 2; // -3 … 3
            const style = { "--o": offset, "--abs": Math.abs(offset) } as CSSProperties;
            return (
              <a key={p.code} href={p.href} target="_blank" rel="noopener noreferrer" aria-label={t("Dr. Hasan Mahdy reel on Instagram")} className={ig.card} style={style}>
                <span className={ig.frame}>
                  <video src={p.video} poster={p.poster} muted loop playsInline preload="none" aria-hidden="true" className={ig.photo} />
                  <ReelGlyph className={ig.reelBadge} />
                </span>
              </a>
            );
          })}
        </ReelsAutoplay>
      </div>
    </section>
  );
}

/** Dr. Hasan's YouTube Shorts (client component: the playlist swaps the video on the stage). */
export { default as Videos } from "./Videos";
