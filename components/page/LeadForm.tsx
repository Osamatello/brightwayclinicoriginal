"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import type { FormField as Field } from "@/content/forms";

const input = "min-h-12 w-full rounded-xl border border-line bg-cream px-4 py-3 text-brown-dark outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";

/**
 * Lead form used by the landing pages and the career page.
 * Where submissions go is still open (plan D4) — for now submit only moves to the thank-you page
 * and nothing is sent or stored. Personal data is never put in the URL.
 */
export default function LeadForm({
  title,
  subtitle,
  fields,
  submitLabel,
  thankYouPath,
}: {
  title: string;
  subtitle?: string;
  fields: Field[];
  submitLabel: string;
  thankYouPath?: string;
}) {
  const router = useRouter();
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO(D4): send the form data to the chosen destination before redirecting
    if (thankYouPath) router.push(thankYouPath);
  }
  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-[2.25rem] bg-white p-8 text-left shadow-[0_24px_60px_-30px_rgba(110,82,25,0.5)] md:p-10">
      <h2 className="text-2xl font-extrabold text-brown-dark md:text-3xl">{title}</h2>
      {subtitle && <p className="text-sm text-ink">{subtitle}</p>}
      {fields.map((f) => (
        <label key={f.name} className="block space-y-2 text-sm font-bold text-brown-dark">
          {f.label}
          {f.textarea ? (
            <textarea name={f.name} rows={4} required={f.required} className={input} />
          ) : (
            <input name={f.name} type={f.type ?? "text"} autoComplete={f.autoComplete} required={f.required} className={input} />
          )}
        </label>
      ))}
      <button type="submit" className="bg-gold-gradient min-h-13 w-full rounded-full py-4 font-bold text-white transition hover:brightness-110">
        {submitLabel}
      </button>
    </form>
  );
}
