"use client";

import { createContext, createElement, useContext, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { localPath, translate, type Dictionary, type Lang } from "./i18n-data";

// The Arabic dictionary reaches the browser only on Arabic pages (passed in by SiteShell), so English visitors never download it.
const DictionaryContext = createContext<Dictionary | null>(null);

export function I18nProvider({ dict, children }: { dict: Dictionary | null; children: ReactNode }) {
  return createElement(DictionaryContext.Provider, { value: dict }, children);
}

/** Client components: the language comes from the address, so server and browser agree. */
export function useI18n() {
  const pathname = usePathname();
  const dict = useContext(DictionaryContext);
  const lang: Lang = pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
  const active = lang === "ar" ? dict : null;
  return { lang, t: <T,>(value: T): T => translate(active, value), l: <T,>(value: T): T => localPath(lang, value) };
}
