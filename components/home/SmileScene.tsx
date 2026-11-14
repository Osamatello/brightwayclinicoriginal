"use client";

import { useI18n } from "@/lib/i18n-client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { services } from "@/content/home";
import { Arrow } from "@/components/ui";
import styles from "./SmileScene.module.css";

// The three scroll stops, each with its own picture
const STOPS = [
  { picture: "/images/home-scene/stop-1.webp", hrefs: ["/dentalimplants-en/", "/oral-surgery/", "/prosthodontics/"] },
  { picture: "/images/home-scene/stop-2.webp", hrefs: ["/veneer-en/", "/teeth-whitening/", "/cosmetic-dentistry/", "/orthodontics-en/"] },
  { picture: "/images/home-scene/stop-3.webp", hrefs: ["/teeth-cleaning-and-gum-treatment/", "/root-canal-treatment/", "/tooth-extraction/", "/pediatric-dentistry/"] },
].map((stop) => ({ picture: stop.picture, items: stop.hrefs.map((href) => services.find((s) => s.href === href)!) }));

const INTRO = "From a routine check-up to a complete smile makeover — eleven specialties under one roof. These are the treatments our patients ask for most.";

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const between = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

/**
 * Homepage services: the section pins, the intro's words sharpen, then three stops fade through the treatments.
 * Large screens: picture beside the text · phones and tablets (since 2026-11-14): picture above the text.
 * "Reduce motion" shows the normal Services section instead (this one stays hidden).
 */
export default function SmileScene() {
  const { l, t } = useI18n();
  const scene = useRef<HTMLElement>(null);

  // Show one of the three stop pictures
  const showPhoto = (src: string) => {
    scene.current?.querySelectorAll<HTMLElement>("[data-photo]").forEach((el) => {
      el.dataset.on = el.dataset.photo === src ? "1" : "0";
    });
  };

  useEffect(() => {
    const root = scene.current;
    if (!root) return;
    const q = <T extends Element>(s: string) => [...root.querySelectorAll<T>(s)];
    const stage = q<HTMLElement>("[data-stage]")[0];
    const intro = q<HTMLElement>("[data-intro]")[0];
    const treatments = q<HTMLElement>("[data-treatments]")[0];
    const bar = q<HTMLElement>("[data-bar]")[0];
    const photos = q<HTMLElement>("[data-photo]");
    const panels = q<HTMLElement>("[data-panel]");
    const words = q<HTMLElement>("[data-word]");

    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const wide = window.matchMedia("(min-width: 1024px)");
    let geo = { h: 0, stuckAt: 0 };
    let lastP = -1;
    let active = -1;
    let frame = 0;

    function measure() {
      geo = { h: stage.getBoundingClientRect().height, stuckAt: parseFloat(getComputedStyle(stage).top) || 0 };
      lastP = -1;
      draw();
    }

    function setStop(i: number) {
      if (i === active) return;
      active = i;
      panels.forEach((el, n) => (el.dataset.on = n === i ? "1" : "0"));
      showPhoto(STOPS[i].picture);
    }

    function draw() {
      frame = 0;
      const r = root!.getBoundingClientRect();
      const p = clamp((geo.stuckAt - r.top) / Math.max(1, r.height - geo.h));
      // nothing to redraw while the scroll hasn't changed the scene
      if (p === lastP) return;
      lastP = p;
      // b = intro's words sharpen · c = the three stops
      const b = between(p, 0, 0.14);
      const c = between(p, 0.27, 0.985);

      const out = between(p, 0.2, 0.235);
      intro.style.opacity = String(1 - out);
      intro.style.visibility = out >= 1 ? "hidden" : "visible";
      const inn = between(p, 0.24, 0.275);
      treatments.style.opacity = String(inn);
      treatments.style.visibility = inn > 0 ? "visible" : "hidden";
      bar.style.scale = `${c} 1`;

      // blur is the costliest effect here: only touch the words while they can actually change
      if (out < 1) {
        words.forEach((w, i) => {
          const start = (i / words.length) * 0.6;
          const on = between(b, start, start + 0.4);
          w.style.opacity = String(0.08 + on * 0.92);
          w.style.filter = on >= 1 || on <= 0 ? "" : `blur(${(1 - on) * 5}px)`;
        });
      }
      setStop(Math.min(STOPS.length - 1, Math.floor(c * STOPS.length)));
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    function sync() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (!mq.matches) return;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", measure);
      // large screens: load all three pictures now, so none is still blank when it fades in
      // (phones keep them lazy: they load together as the section comes near, without slowing the first screen)
      if (wide.matches) photos.forEach((el) => {
        const img = el.querySelector("img");
        if (img) img.loading = "eager";
      });
      measure();
    }

    mq.addEventListener("change", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      mq.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section ref={scene} id="services" className={styles.scene}>
      <div data-stage className={styles.stage}>
        <div className={styles.layout}>
          <div aria-hidden="true" className={styles.picture}>
            {STOPS.map((stop) => stop.picture).map((src) => (
              <div key={src} data-photo={src} data-on={src === STOPS[0].picture ? "1" : "0"} className={styles.photo}>
                {/* the three stop pictures are served exactly as supplied, without the optimizer's recompression */}
                <Image src={src} alt="" fill sizes="640px" unoptimized={src.startsWith("/images/home-scene/")} />
              </div>
            ))}
          </div>

          <div className={styles.copy}>
            <div data-intro className={styles.intro}>
              <h2 className={styles.heading}>{t("Explore Our")}{" "}<em>{t("Dental Services in Dubai")}</em>
              </h2>
              <p className={styles.lead}>
                {t(INTRO).split(" ").map((word, i) => (
                  <span key={i} data-word>
                    {word}{" "}
                  </span>
                ))}
              </p>
            </div>

            <div data-treatments className={styles.treatments}>
              <div className={styles.panels}>
                {STOPS.map((stop, i) => (
                  <ul
                    key={stop.picture}
                    data-panel
                    data-on={i === 0 ? "1" : "0"}
                    className={styles.panel}
                  >
                    {stop.items.map((s) => (
                      <li key={s.href}>
                        <Link href={l(s.href)} className={styles.row}>
                          {t(s.title)} <Arrow />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
              <div className={styles.track}>
                <span data-bar className={styles.bar} />
              </div>
              <Link href={l("/services/")} className={styles.all}>{t("View all")}{" "}{t(services.length)}{" "}{t("treatments")}{" "}<Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
