import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] ${light ? "text-gold-light" : "text-gold-dark"}`}>
      <span className={`h-px w-10 ${light ? "bg-gold-light" : "bg-gold"}`} />
      {children}
    </p>
  );
}

/** Section title: `lead` in brown (or white), `accent` in gold italic display type. */
export function Heading({
  as: Tag = "h2",
  lead,
  accent,
  light = false,
  className = "",
}: {
  as?: "h1" | "h2" | "h3";
  lead: ReactNode;
  accent?: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Tag className={`text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl ${light ? "text-white" : "text-brown-dark"} ${className}`}>
      {lead}
      {accent && (
        <>
          {" "}
          <span className={`font-display text-[1.12em] font-semibold italic ${light ? "text-gold-light" : "text-gold"}`}>{accent}</span>
        </>
      )}
    </Tag>
  );
}

export function GoldButton({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`bg-gold-gradient inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-bold text-white shadow-[0_10px_30px_-10px_rgba(125,97,32,0.8)] transition hover:brightness-110 ${className}`}
    >
      {children}
    </Link>
  );
}

export function OutlineButton({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-7 text-sm font-bold transition ${
        light ? "border-white/30 text-white hover:bg-white/10" : "border-gold text-gold-dark hover:bg-gold-soft"
      }`}
    >
      {children}
    </Link>
  );
}

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Check({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function PlayIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.6-4.2A8.5 8.5 0 1 1 20.5 11.6z" />
      <path d="M9 9.2c.3 2.3 2.3 4.4 4.7 5" />
    </svg>
  );
}
