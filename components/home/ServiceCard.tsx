import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui";

type Service = { title: string; text: string; img: string; href: string };

/** Treatment card (homepage "Services" and the /services/ page). */
export default function ServiceCard({ service: s, number, sizes }: { service: Service; number: number; sizes: string }) {
  return (
    <Link
      href={s.href}
      className="group flex h-full flex-col rounded-[2rem] border border-line bg-white p-2.5 transition duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_30px_60px_-30px_rgba(110,82,25,0.45)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gold-soft">
        <Image src={s.img} alt={`${s.title} at Bright Way Dental Clinic, Dubai`} fill sizes={sizes} className="object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 font-display text-base italic text-gold-dark backdrop-blur">
          {String(number).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <h3 className="text-xl font-extrabold text-brown-dark">{s.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed">{s.text}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold-dark transition-all group-hover:gap-3">
          Learn more <Arrow />
        </span>
      </div>
    </Link>
  );
}
