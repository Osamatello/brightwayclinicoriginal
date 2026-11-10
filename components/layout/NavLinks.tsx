"use client";

import { useI18n } from "@/lib/i18n-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";
import styles from "./NavLinks.module.css";

/** Pages that count as being inside a menu item, e.g. treatment pages under "Services". */
export type NavSections = Record<string, string[]>;
/** Drop-down lists that come from the server, e.g. every blog article under "Blog". */
export type NavLists = Record<string, { label: string; href: string }[]>;

export function useActiveNav(sections: NavSections) {
  const pathname = usePathname();
  const { l } = useI18n();
  // Arabic addresses arrive percent-encoded; menu items are English paths, compared in the page's language
  const decoded = (() => {
    try {
      return decodeURI(pathname);
    } catch {
      return pathname;
    }
  })();
  const current = decoded.endsWith("/") ? decoded : `${decoded}/`;
  return (href: string) => {
    const local = l(href);
    return current === local || (sections[local]?.includes(current) ?? false);
  };
}

/** Desktop menu; the page you are on is shown in gold with a gold underline. About, Services and Blog drop a list on hover or keyboard focus. */
export default function NavLinks({ sections, lists }: { sections: NavSections; lists: NavLists }) {
  const { l, t } = useI18n();
  const isActive = useActiveNav(sections);
  const pathname = usePathname();
  return (
    <nav aria-label={t("Main")} className="hidden gap-x-6 whitespace-nowrap text-sm font-semibold text-brown-dark xl:flex">
      {nav.map((item) => {
        const active = isActive(item.href);
        const link = (
          <Link
            href={l(item.href)}
            aria-current={active ? "page" : undefined}
            className={`transition hover:text-gold-dark ${active ? "text-gold-dark underline decoration-gold decoration-2 underline-offset-[6px]" : ""}`}
          >
            {t(item.label)}
          </Link>
        );
        const children = item.children ?? lists[item.href];
        if (!children) return <span key={item.href}>{link}</span>;
        const long = children.length > 12; // long lists (blog articles): wider, wrapped titles, scroll inside
        return (
          // key on the path: the list closes after choosing a page, even while the mouse is still over it
          <div key={`${item.href}${pathname}`} className={styles.item}>
            {link}
            <svg aria-hidden="true" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={styles.chevron}>
              <path d="m2.500 4.500 3.500 3.500 3.500-3.500" />
            </svg>
            <div className={styles.dropdown}>
              <ul data-lenis-prevent={long || undefined} className={`${styles.list} ${long ? styles.longList : children.length > 6 ? styles.twoColumns : ""}`}>
                {children.map((child) => (
                  <li key={child.href}>
                    <Link href={l(child.href)}>{t(child.label)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
