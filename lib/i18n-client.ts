"use client";

import { usePathname } from "next/navigation";
import { localPath, translate, type Lang } from "./i18n-data";

/** Client components: the language comes from the address, so server and browser agree. */
export function useI18n() {
  const pathname = usePathname();
  const lang: Lang = pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
  return { lang, t: <T,>(value: T): T => translate(lang, value), l: <T,>(value: T): T => localPath(lang, value) };
}
