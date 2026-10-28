import type { CSSProperties } from "react";
import Image from "next/image";
import { instagramPosts } from "@/content/home";
import { clinic } from "@/content/site";
import { Arrow, PlayIcon } from "@/components/ui";
import ig from "./Instagram.module.css";

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
          <h2 id="instagram-heading" className={ig.heading}>
            Follow on <span>Instagram</span>
          </h2>
          <a href={clinic.social.instagram} className={ig.handle}>
            <span className={ig.ring}><InstagramGlyph className={ig.ringIcon} /></span>
            @dr.hasanmahdy <Arrow />
          </a>
        </header>
        {/* Real reels fanned like a hand of cards; each opens its own reel */}
        <div className={ig.deck}>
          {instagramPosts.map((p, i) => {
            const offset = i - (instagramPosts.length - 1) / 2; // -3 … 3
            const style = { "--o": offset, "--abs": Math.abs(offset) } as CSSProperties;
            return (
              <a key={p.code} href={p.href} target="_blank" rel="noopener noreferrer" className={ig.card} style={style}>
                <span className={ig.frame}>
                  <Image src={p.src} alt="Dr. Hasan Mahdy reel on Instagram" fill sizes="(min-width: 900px) 230px, 62vw" className={ig.photo} />
                  <ReelGlyph className={ig.reelBadge} />
                  <span className={ig.play}><PlayIcon className={ig.playIcon} /></span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Dr. Hasan's YouTube Shorts (client component: the playlist swaps the video on the stage). */
export { default as Videos } from "./Videos";
