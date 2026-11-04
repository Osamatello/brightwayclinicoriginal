import { t } from "@/lib/i18n";
import type { FormField as Field } from "@/content/forms";
import LeadFormShell from "./LeadFormShell";

const input = "min-h-12 w-full rounded-xl border border-line bg-cream px-4 py-3 text-brown-dark outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";

/** Lead form used by the landing pages and the career page. Sending is handled by LeadFormShell. */
export default function LeadForm({
  title,
  subtitle,
  fields,
  submitLabel,
  thankYouPath,
}: {
  title?: string;
  subtitle?: string;
  fields: Field[];
  submitLabel: string;
  thankYouPath?: string;
}) {
  return (
    <LeadFormShell thankYouPath={thankYouPath} className="space-y-4 rounded-[2.25rem] bg-white p-8 text-start shadow-[0_24px_60px_-30px_rgba(110,82,25,0.5)] md:p-10">
      {title && <h2 className="text-2xl font-extrabold text-brown-dark md:text-3xl">{t(title)}</h2>}
      {subtitle && <p className="text-sm text-ink">{t(subtitle)}</p>}
      {fields.map((f) => (
        <label key={f.name} className="block space-y-2 text-sm font-bold text-brown-dark">
          {t(f.label)}
          {f.textarea ? (
            <textarea name={f.name} rows={4} required={f.required} className={input} />
          ) : (
            <input name={f.name} type={f.type ?? "text"} autoComplete={f.autoComplete} required={f.required} className={input} />
          )}
        </label>
      ))}
      <button type="submit" className="bg-gold-gradient min-h-13 w-full rounded-full py-4 font-bold text-white transition hover:brightness-110">
        {t(submitLabel)}
      </button>
    </LeadFormShell>
  );
}
