"use client";

import { useI18n } from "@/lib/i18n-client";
import { useState, type ReactNode } from "react";

/**
 * A block that is shortened on phones until the visitor taps "Read more" (the text stays in the page for Google).
 * What is shortened is up to the section's own CSS, keyed on [data-open]; larger screens hide the button and show everything.
 */
export default function ReadMoreArea({ className, buttonClassName, children }: { className?: string; buttonClassName?: string; children: ReactNode }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <div className={className} data-open={open || undefined}>
      {children}
      <button type="button" className={buttonClassName} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {t(open ? "Show less" : "Read more")}
        <svg aria-hidden="true" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
        </svg>
      </button>
    </div>
  );
}
