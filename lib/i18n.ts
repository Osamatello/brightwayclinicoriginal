import { cache } from "react";
import { localPath, translate, type Lang } from "./i18n-data";

// The language of the page being rendered on the server. Each Arabic layout and page calls setLang("ar") first.
const current = cache(() => ({ lang: "en" as Lang }));

export const setLang = (lang: Lang) => {
  current().lang = lang;
};
export const getLang = () => current().lang;

/** Server components: translate a fixed string. */
export const t = <T,>(value: T): T => translate(getLang(), value);
/** Server components: the address of a page in the current language. */
export const l = <T,>(value: T): T => localPath(getLang(), value);
