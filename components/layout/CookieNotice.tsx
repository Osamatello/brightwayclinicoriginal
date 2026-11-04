"use client";

import { useI18n } from "@/lib/i18n-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./CookieNotice.module.css";

const KEY = "bw-cookie-notice-seen";

/** Tells visitors the site uses cookies; shown until they press OK. Browsers can block storage, so failures only mean it shows again. */
export default function CookieNotice() {
  const { l, t } = useI18n();
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
    <div role="region" aria-label={t("Cookie notice")} className={styles.notice}>
      <p className={styles.text}>{t("We use cookies to measure our advertising.")}{" "}<Link href={l("/privacy-policy/")}>{t("Privacy Policy")}</Link>
      </p>
      <button type="button" className={styles.accept} onClick={dismiss}>{t("OK")}</button>
    </div>
  );
}
