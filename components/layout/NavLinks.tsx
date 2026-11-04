"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";
import styles from "./NavLinks.module.css";

/** Pages that count as being inside a menu item, e.g. treatment pages under "Services". */
export type NavSections = Record<string, string[]>;

export function useActiveNav(sections: NavSections) {
  const pathname = usePathname();
  const current = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return (href: string) => current === href || (sections[href]?.includes(current) ?? false);
}

/** Desktop menu; the page you are on is shown in gold with a gold underline. About and Services drop a list on hover or keyboard focus. */
export default function NavLinks({ sections }: { sections: NavSections }) {
  const isActive = useActiveNav(sections);
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="hidden gap-x-6 whitespace-nowrap text-sm font-semibold text-brown-dark xl:flex">
      {nav.map((item) => {
        const active = isActive(item.href);
        const link = (
          <Link
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`transition hover:text-gold-dark ${active ? "text-gold-dark underline decoration-gold decoration-2 underline-offset-[6px]" : ""}`}
          >
            {item.label}
          </Link>
        );
        if (!item.children) return <span key={item.href}>{link}</span>;
        return (
          // key on the path: the list closes after choosing a page, even while the mouse is still over it
          <div key={`${item.href}${pathname}`} className={styles.item}>
            {link}
            <svg aria-hidden="true" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={styles.chevron}>
              <path d="m2.500 4.500 3.500 3.500 3.500-3.500" />
            </svg>
            <div className={styles.dropdown}>
              <ul className={`${styles.list} ${item.children.length > 6 ? styles.twoColumns : ""}`}>
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link href={child.href}>{child.label}</Link>
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
