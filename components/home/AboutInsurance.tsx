import Image from "next/image";
import { aboutCards, insurers } from "@/content/home";
import { Eyebrow, Heading } from "@/components/ui";

export function About() {
  return (
    <section id="about" className="bg-cream py-24">
      <div className="mx-auto max-w-7xl space-y-14 px-5">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <Eyebrow>Contact Bright Way Dental Clinic</Eyebrow>
            <Heading lead="Your Trusted" accent="Dental Clinic in Dubai" />
          </div>
          <div className="space-y-4 leading-relaxed">
            <p>
              Need to find a reliable dental practice in Dubai around me? Looking for a dental clinic Dubai near me that is close enough and has the best technology and soft, close-knit treatment? Welcome to Bright Way Dental Clinic, where patient comfort and digital dentistry come together.
            </p>
            <p>
              Our highly skilled team, led by the best dentists in Dubai, ensures that every patient receives personalized care in a comfortable and modern environment. As a top dental clinic in Dubai, we specialize in cosmetic dentistry, teeth cleaning, teeth whitening, orthodontics, dental implants, and more.
            </p>
          </div>
        </div>
        <div>
          <div className="mb-6 space-y-3">
            <Eyebrow>About Us</Eyebrow>
            <p className="text-2xl font-extrabold text-brown-dark">Discover the best dental clinic in Dubai</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {aboutCards.map((c, i) => (
              <article
                key={c.title}
                className={`relative overflow-hidden rounded-[2rem] p-9 ${i === 1 ? "bg-brown text-white/75" : "bg-white shadow-[0_12px_40px_-24px_rgba(110,82,25,0.35)]"}`}
              >
                <span className={`font-display text-7xl font-semibold leading-none ${i === 1 ? "text-gold/40" : "text-gold-soft"}`}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={`mt-4 text-2xl font-extrabold ${i === 1 ? "text-white" : "text-brown-dark"}`}>{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed">{c.text}</p>
                <span aria-hidden="true" className="bg-gold-gradient absolute inset-x-0 top-0 h-1" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Insurance() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl space-y-10 px-5 text-center">
        <div className="mx-auto max-w-2xl space-y-4">
          <Heading lead="Insurance" accent="Companies" />
          <p>At Bright Way Dental Clinic, we simplify your access to exceptional dental care by accepting a wide range of insurance companies.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {insurers.map((src) => (
            <div key={src} className="flex h-24 items-center justify-center rounded-2xl border border-line bg-cream p-4 grayscale transition hover:grayscale-0">
              <Image src={src} alt="Accepted insurance company" width={160} height={80} className="max-h-16 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
