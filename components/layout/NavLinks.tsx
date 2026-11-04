"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";

/** Pages that count as being inside a menu item, e.g. treatment pages under "Services". */
export type NavSections = Record<string, string[]>;

export function useActiveNav(sections: NavSections) {
  const pathname = usePathname();
  const current = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return (href: string) => current === href || (sections[href]?.includes(current) ?? false);
}

/** Desktop menu; the page you are on is shown in gold with a gold underline. */
export default function NavLinks({ sections }: { sections: NavSections }) {
  const isActive = useActiveNav(sections);
  return (
    <nav aria-label="Main" className="hidden gap-x-6 whitespace-nowrap text-sm font-semibold text-brown-dark xl:flex">
      {nav.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`transition hover:text-gold-dark ${active ? "text-gold-dark underline decoration-gold decoration-2 underline-offset-[6px]" : ""}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
