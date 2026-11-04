"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./CookieNotice.module.css";

const KEY = "bw-cookie-notice-seen";

/** Tells visitors the site uses cookies; shown until they press OK. Browsers can block storage, so failures only mean it shows again. */
export default function CookieNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      setOpen(!window.localStorage.getItem(KEY));
    } catch {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {}
    setOpen(false);
  };

  return (
    <div role="region" aria-label="Cookie notice" className={styles.notice}>
      <p className={styles.text}>
        We use cookies to measure our advertising. <Link href="/privacy-policy/">Privacy Policy</Link>
      </p>
      <button type="button" className={styles.accept} onClick={dismiss}>
        OK
      </button>
    </div>
  );
}
