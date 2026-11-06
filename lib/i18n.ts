import { cache } from "react";
import { localPath, translate, type Lang } from "./i18n-data";
import oldH1s from "@/content/ar/old-h1.json";

// The language of the page being rendered on the server. Each Arabic layout and page calls setLang("ar") first.
const current = cache(() => ({ lang: "en" as Lang, page: "" }));

export const setLang = (lang: Lang) => {
  current().lang = lang;
};
export const getLang = () => current().lang;
/** Arabic pages: the English address of the page being rendered (set by the Arabic routes). */
export const setPage = (enPath: string) => {
  current().page = enPath;
};
/** One part of the page's H1: the old site's Arabic words for that part (kept word for word for SEO), otherwise the translation. */
export const h1Part = <T,>(index: number, value: T): T => {
  const old = getLang() === "ar" ? (oldH1s as Record<string, string[]>)[current().page] : undefined;
  return (old ? (old[index] ?? "") : t(value)) as T;
};

/** Server components: translate a fixed string. */
export const t = <T,>(value: T): T => translate(getLang(), value);
/** Server components: the address of a page in the current language. */
export const l = <T,>(value: T): T => localPath(getLang(), value);
