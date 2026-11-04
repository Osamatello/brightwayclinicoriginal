import { notFound } from "next/navigation";

// Any unknown address shows the custom 404 page (the site has one root layout per language).
export default function Missing() {
  notFound();
}
