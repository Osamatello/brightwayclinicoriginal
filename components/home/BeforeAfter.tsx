"use client";

import Image from "next/image";
import { useState } from "react";
import { smileCases } from "@/content/home";
import { Eyebrow, Heading } from "@/components/ui";

type Case = { label: string; before?: string; after?: string };

/** One comparison card: drag (or use arrow keys on) the slider to reveal before / after. */
function CompareCard({ label, before, after, index }: Case & { index: number }) {
  const [pos, setPos] = useState(50);
  return (
    <figure className="space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-gold-soft shadow-[0_20px_50px_-30px_rgba(110,82,25,0.5)]">
        {/* AFTER layer */}
        {after ? (
          <Image src={after} alt={`${label} — after`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#fbf4e4] to-[#ecd9ae]" />
        )}
        <span className="absolute bottom-4 right-4 rounded-full bg-white px-3 py-1 text-[11px] font-extrabold tracking-[0.15em] text-gold-dark">AFTER</span>

        {/* BEFORE layer, clipped to the slider position */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {before ? (
            <Image src={before} alt={`${label} — before`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#d8bf8a] to-[#a8864a]" />
          )}
          <span className="absolute bottom-4 left-4 rounded-full bg-brown px-3 py-1 text-[11px] font-extrabold tracking-[0.15em] text-gold-light">BEFORE</span>
        </div>

        {!before && !after && (
          <span className="pointer-events-none absolute inset-x-0 top-4 text-center text-xs font-semibold text-brown-dark/60">Photo coming soon</span>
        )}

        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }}>
          <span className="bg-gold-gradient absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-lg ring-4 ring-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compare before and after: ${label}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="flex items-baseline justify-between px-1">
        <span className="text-lg font-extrabold text-brown-dark">{label}</span>
        <span className="font-display text-lg italic text-gold">{String(index + 1).padStart(2, "0")}</span>
      </figcaption>
    </figure>
  );
}

export default function BeforeAfter() {
  return (
    <section id="gallery" className="bg-white py-24">
      <div className="mx-auto max-w-7xl space-y-12 px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <Eyebrow>Smile Gallery</Eyebrow>
            <Heading lead="Before and After" accent="Dental Transformations" />
          </div>
          <p className="max-w-sm leading-relaxed">Our latest smile makeovers at Bright Way Dental Clinic. Drag the line on each smile to compare.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {smileCases.map((label, i) => (
            <CompareCard key={label} label={label} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
