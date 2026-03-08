/**
 * Fetch Google Business reviews from the Places API (Place Details).
 * Set GOOGLE_PLACE_ID and GOOGLE_PLACES_API_KEY in your environment.
 *
 * Get your Place ID: https://developers.google.com/maps/documentation/places/web-service/place-id
 * Enable "Places API" in Google Cloud Console and create an API key.
 */

import type { GoogleReview } from "./google-reviews";

const CACHE_MS = 60 * 60 * 1000; // 1 hour
let cached: {
  reviews: GoogleReview[];
  averageRating: number;
  totalReviews: number;
  writeReviewUrl: string;
} | null = null;
let cacheTime = 0;

interface PlaceDetailsReview {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time?: number;
}

interface PlaceDetailsResponse {
  result?: {
    name?: string;
    rating?: number;
    user_ratings_total?: number;
    reviews?: PlaceDetailsReview[];
  };
  status: string;
  error_message?: string;
}

function getPlaceId(): string | undefined {
  return process.env.GOOGLE_PLACE_ID;
}

function getApiKey(): string | undefined {
  return process.env.GOOGLE_PLACES_API_KEY;
}

export async function getGoogleReviews(): Promise<{
  reviews: GoogleReview[];
  averageRating: number;
  totalReviews: number;
  writeReviewUrl: string;
} | null> {
  const placeId = getPlaceId();
  const apiKey = getApiKey();

  if (!placeId || !apiKey) {
    return null;
  }

  if (cached && Date.now() - cacheTime < CACHE_MS) {
    return cached;
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("key", apiKey);
  url.searchParams.set("language", "da");
  url.searchParams.set("fields", "name,rating,user_ratings_total,reviews");

  try {
    const res = await fetch(url.toString());
    const data = (await res.json()) as PlaceDetailsResponse;

    if (data.status !== "OK" || !data.result) {
      return null;
    }

    const result = data.result;
    const rawReviews = result.reviews ?? [];
    const averageRating = result.rating ?? 0;
    const totalReviews = result.user_ratings_total ?? 0;

    const reviews: GoogleReview[] = rawReviews.map((r) => ({
      quote: r.text,
      name: r.author_name,
      rating: r.rating,
      date: r.relative_time_description,
      profilePhotoUrl: r.profile_photo_url,
    }));

    const writeReviewUrl = `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;

    cached = {
      reviews,
      averageRating,
      totalReviews,
      writeReviewUrl,
    };
    cacheTime = Date.now();

    return cached;
  } catch {
    return null;
  }
}
