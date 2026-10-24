import { clinic } from "@/content/site";
import { Eyebrow, Heading } from "@/components/ui";

const field = "min-h-12 w-full rounded-xl border border-line bg-cream px-4 py-3 text-brown-dark outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";

/** Contact section. The form's destination is not decided yet (plan D4) — submit does nothing until it is. */
export default function Contact() {
  const info = [
    { label: "Visit us", value: clinic.address },
    { label: "Opening hours", value: clinic.hours },
    { label: "Call us", value: `${clinic.phoneDisplay} · ${clinic.landlineDisplay}`, href: `tel:${clinic.phone}` },
    { label: "Email", value: clinic.email, href: `mailto:${clinic.email}` },
  ];
  return (
    <section id="contact" className="bg-cream py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="space-y-4">
            <Eyebrow>Contact Us</Eyebrow>
            <Heading lead="Get In Touch" accent="with Our Team" />
            <p className="leading-relaxed">
              Have questions or need to schedule an appointment? Our team is ready to assist with your dental care needs, from general inquiries to booking your next visit.
            </p>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            {info.map((item) => (
              <div key={item.label} className="rounded-2xl border border-line bg-white p-5">
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-gold-dark">{item.label}</dt>
                <dd className="mt-1 font-semibold text-brown-dark">{item.href ? <a href={item.href}>{item.value}</a> : item.value}</dd>
              </div>
            ))}
          </dl>
          <iframe
            title="Bright Way Dental Clinic on Google Maps"
            src={clinic.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full rounded-[2rem] border-0"
          />
        </div>

        <form className="space-y-5 self-start rounded-[2.25rem] bg-white p-8 shadow-[0_24px_60px_-30px_rgba(110,82,25,0.4)] md:p-12" action="#" method="post">
          <h3 className="text-3xl font-extrabold text-brown-dark">
            Book Your <span className="font-display italic text-gold">Appointment Now</span>
          </h3>
          <p className="text-sm">Please fill the form below and our team will contact you as soon as possible.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-bold text-brown-dark">
              First name <input name="fname" autoComplete="given-name" required className={field} />
            </label>
            <label className="space-y-2 text-sm font-bold text-brown-dark">
              Last name <input name="lname" autoComplete="family-name" className={field} />
            </label>
          </div>
          <label className="block space-y-2 text-sm font-bold text-brown-dark">
            Phone <input name="phone" type="tel" autoComplete="tel" required className={field} />
          </label>
          <label className="block space-y-2 text-sm font-bold text-brown-dark">
            Email <input name="email" type="email" autoComplete="email" className={field} />
          </label>
          <label className="block space-y-2 text-sm font-bold text-brown-dark">
            Message <textarea name="message" rows={4} className={field} />
          </label>
          <button type="submit" className="bg-gold-gradient min-h-13 w-full rounded-full py-4 font-bold text-white transition hover:brightness-110">
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
