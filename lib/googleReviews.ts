// Live Google reviews via the official Places API (New).
// Needs GOOGLE_PLACES_API_KEY (Vercel env var, server-only). Without it the site shows the clinic's own testimonials.
// Google's terms: show each review with its author's name (linked) and a "Google" attribution, as Testimonials.tsx does.

export type GoogleReview = { author: string; authorUrl?: string; rating: number; text: string; when?: string };
export type GooglePlaceReviews = { rating: number; count: number; reviews: GoogleReview[] };

const QUERY = "Bright Way Dental Clinic Ithra Tower Dubai";

type ApiPlace = {
  rating?: number;
  userRatingCount?: number;
  reviews?: {
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: { displayName?: string; uri?: string };
  }[];
};

export async function getGoogleReviews(): Promise<GooglePlaceReviews | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "places.rating,places.userRatingCount,places.reviews",
      },
      body: JSON.stringify({ textQuery: QUERY, languageCode: "en", maxResultCount: 1 }),
      next: { revalidate: 60 * 60 * 24 }, // refresh once a day
    });
    if (!res.ok) return null;

    const place: ApiPlace | undefined = (await res.json()).places?.[0];
    if (!place?.rating || !place.userRatingCount) return null;

    const reviews = (place.reviews ?? [])
      .filter((r) => r.originalText?.text || r.text?.text)
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Google user",
        authorUrl: r.authorAttribution?.uri,
        rating: r.rating ?? 5,
        text: (r.originalText?.text || r.text?.text || "").trim(),
        when: r.relativePublishTimeDescription,
      }));

    return { rating: place.rating, count: place.userRatingCount, reviews };
  } catch {
    return null;
  }
}
