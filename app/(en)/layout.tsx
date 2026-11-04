import type { ReactNode } from "react";
import SiteShell, { siteMetadata } from "@/components/layout/SiteShell";

export const metadata = siteMetadata;

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
