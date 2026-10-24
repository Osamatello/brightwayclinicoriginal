import Image from "next/image";
import { instagramTiles, videos } from "@/content/home";
import { clinic } from "@/content/site";
import { Arrow, Eyebrow, Heading, PlayIcon } from "@/components/ui";

export function Instagram() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl space-y-8 px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Heading lead="Follow on" accent="Instagram" />
          <a href={clinic.social.instagram} className="inline-flex items-center gap-2 font-bold text-gold-dark">
            @dr.hasanmahdy <Arrow />
          </a>
        </div>
        {/* TODO: replace with the live Instagram feed once access is set up */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {instagramTiles.map((src) => (
            <a key={src} href={clinic.social.instagram} className="group relative aspect-square overflow-hidden rounded-2xl bg-gold-soft">
              <Image src={src} alt="Bright Way Dental Clinic on Instagram" fill sizes="(min-width: 1024px) 16vw, 50vw" className="object-cover transition duration-500 group-hover:scale-110" />
              <span className="absolute inset-0 bg-brown/0 transition group-hover:bg-brown/30" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Dr. Hasan's YouTube videos — thumbnails link out, so no heavy YouTube player loads with the page. */
export function Videos() {
  return (
    <section id="videos" className="bg-brown py-24 text-white">
      <div className="mx-auto max-w-7xl space-y-12 px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <Eyebrow light>Dr. Hasan Mahdy YouTube Channel</Eyebrow>
            <Heading lead="Watch & learn about" accent="your treatment" light />
          </div>
          <a href={clinic.social.youtube} className="bg-gold-gradient inline-flex min-h-12 items-center gap-2 rounded-full px-7 text-sm font-bold">
            Subscribe <Arrow />
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, i) => (
            <a key={v.id} href={`https://www.youtube.com/watch?v=${v.id}`} className={`group block space-y-4 ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}>
              <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-brown-soft">
                <Image src={`/images/yt-${v.id}.jpg`} alt={v.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-brown/70 to-transparent" />
                <span className={`bg-gold-gradient absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-2xl transition group-hover:scale-110 ${i === 0 ? "h-20 w-20" : "h-14 w-14"}`}>
                  <PlayIcon className={i === 0 ? "h-8 w-8" : "h-6 w-6"} />
                </span>
                <span className="absolute left-4 top-4 rounded-full bg-brown/80 px-3 py-1 text-xs font-semibold text-gold-light">{v.lang}</span>
              </div>
              <p className={`font-bold leading-snug ${i === 0 ? "text-2xl" : "text-base"}`}>{v.title}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
