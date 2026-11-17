import { setLang } from "@/lib/i18n";
import type { Metadata } from "next";
import NotFound from "@/app/(en)/not-found";
import { SHARE_IMAGES } from "@/lib/content";

export const metadata: Metadata = { title: "الصفحة غير موجودة | عيادة برايت واي لطب الأسنان في دبي", robots: { index: false, follow: true }, openGraph: { images: SHARE_IMAGES } };

export default function ArabicNotFound() {
  setLang("ar");
  return <NotFound />;
}
