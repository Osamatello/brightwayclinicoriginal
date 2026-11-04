import { setLang } from "@/lib/i18n";
import NotFound from "@/app/(en)/not-found";

export default function ArabicNotFound() {
  setLang("ar");
  return <NotFound />;
}
