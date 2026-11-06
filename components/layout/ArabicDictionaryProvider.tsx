"use client";

import type { ReactNode } from "react";
import strings from "@/content/ar/strings.json";
import { I18nProvider } from "@/lib/i18n-client";

// Loaded through ArabicDictionary (next/dynamic), so the dictionary is its own script file that only Arabic pages load
// (cached by the browser across pages); English pages never render it, so they never download it.
export default function ArabicDictionaryProvider({ children }: { children: ReactNode }) {
  return <I18nProvider dict={strings as Record<string, string>}>{children}</I18nProvider>;
}
