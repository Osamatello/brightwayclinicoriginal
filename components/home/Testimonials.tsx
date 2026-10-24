"use client";

import Image from "next/image";
import { useState } from "react";
import { testimonials } from "@/content/home";
import { Eyebrow, Heading } from "@/components/ui";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const go = (step: number) => setI((i + step + testimonials.length) % testimonials.length);

  return (
    <section className="relative overflow-hidden bg-brown py-24 text-white">
      <span aria-hidden="true" className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 font-display text-[28rem] leading-none text-white/5">
        &ldquo;
      </span>
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative mx-auto w-full max-w-md">
          <div className="arch relative aspect-[4/5] overflow-hidden">
            <Image src="/images/cta-dr.jpeg" alt="Dr. Hasan A. Mahdy with a patient at Bright Way Dental Clinic" fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 right-0 rounded-2xl bg-white px-6 py-4 text-brown-dark shadow-xl">
            <p className="text-lg tracking-widest text-gold" aria-label="5 out of 5 stars">★★★★★</p>
            <p className="text-xs font-semibold">Hear from our satisfied clients</p>
          </div>
        </div>
        <div className="space-y-8">
          <Eyebrow light>Our Testimonials</Eyebrow>
          <Heading lead="The Honest" accent="Patient Testimonials" light />
          <blockquote className="min-h-48 font-display text-3xl font-medium italic leading-snug md:text-4xl" aria-live="polite">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <p className="text-lg font-extrabold text-gold-light">— {t.name}</p>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 hover:bg-white/10">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5"><path d="M15 6l-6 6 6 6" /></svg>
              </button>
              {testimonials.map((_, n) => (
                <span key={n} aria-hidden="true" className={`h-2 rounded-full transition-all ${n === i ? "w-8 bg-gold" : "w-2 bg-white/25"}`} />
              ))}
              <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="bg-gold-gradient flex h-12 w-12 items-center justify-center rounded-full">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5"><path d="M9 6l6 6-6 6" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
