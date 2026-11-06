import { AR_PATHS } from "@/content/ar/paths";

export type Lang = "en" | "ar";

const toEn = Object.fromEntries(Object.entries(AR_PATHS).map(([en, ar]) => [ar, en]));

// Phone numbers, emails and @handles read left to right inside Arabic text
const LTR_RUN = /(?<![:"'=\/\w\u2066])(\+971[-\s\d]*\d|[\w.+-]*@[\w.-]*\w)/g;
export const isolateLtr = (text: string) => text.replace(LTR_RUN, "\u2066$1\u2069");
/** The same for an article's HTML: text only, never inside a tag. */
export const isolateLtrHtml = (html: string) => html.split(/(<[^>]+>)/).map((part, i) => (i % 2 ? part : isolateLtr(part))).join("");

export type Dictionary = Record<string, string>;

/** Arabic for a fixed English string (dict = null on English pages); anything without a translation (or not a string) passes through. */
export function translate<T>(dict: Dictionary | null, value: T): T {
  if (!dict || typeof value !== "string") return value;
  return isolateLtr(dict[value.trim()] ?? value) as T;
}

/** The same page's address in the given language. Phone, mail and outside links pass through. */
export function localPath<T>(lang: Lang, value: T): T {
  if (lang !== "ar" || typeof value !== "string" || !value.startsWith("/") || value.startsWith("/ar/")) return value;
  const [path, hash] = value.split("#");
  return `${AR_PATHS[path] ?? (path === "/" ? "/ar/" : `/ar${path}`)}${hash ? `#${hash}` : ""}` as T;
}

/** The matching page in the other language, or the other language's home page. */
export function otherLanguagePath(pathname: string) {
  const p = decodeURI(pathname.endsWith("/") ? pathname : `${pathname}/`);
  if (p === "/ar/") return "/";
  if (p.startsWith("/ar/")) return toEn[p] ?? "/";
  return p === "/" ? "/ar/" : (AR_PATHS[p] ?? "/ar/");
}

export const enPathOf = (arPath: string): string | undefined => toEn[decodeURI(arPath)];
export const arPathOf = (enPath: string): string | undefined => (enPath === "/" ? "/ar/" : AR_PATHS[enPath]);
