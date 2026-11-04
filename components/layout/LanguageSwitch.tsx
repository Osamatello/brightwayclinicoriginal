"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { otherLanguagePath } from "@/lib/i18n-data";

/** Goes to the same page in the other language (or that language's home page). */
export default function LanguageSwitch({ className }: { className?: string }) {
  const pathname = usePathname();
  const arabic = pathname === "/ar" || pathname.startsWith("/ar/");
  return (
    <Link href={otherLanguagePath(pathname)} lang={arabic ? "en" : "ar"} dir={arabic ? "ltr" : "rtl"} className={className}>
      {arabic ? "English" : "العربية"}
    </Link>
  );
}
