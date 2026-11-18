"use client";

import { useI18n } from "@/lib/i18n-client";
import { useRef, useState, type ReactNode } from "react";
import styles from "./TreatmentBody.module.css";

/**
 * Treatment pages show the first part of the long article, then "Read more" (review feedback, 18 Nov 2026: too much text).
 * The whole text stays in the page, so Google still reads every word; closing it again scrolls back to the article's top.
 */
export default function ArticleFold({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const toggle = () => {
    if (open) {
      const top = box.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) window.scrollBy({ top: top - 24 });
    }
    setOpen(!open);
  };
  return (
    <div ref={box} className={styles.fold} data-open={open || undefined}>
      <div className={styles.foldBody}>{children}</div>
      <button type="button" className={styles.foldButton} aria-expanded={open} onClick={toggle}>
        {t(open ? "Show less" : "Read more")}
        <svg aria-hidden="true" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
        </svg>
      </button>
    </div>
  );
}
