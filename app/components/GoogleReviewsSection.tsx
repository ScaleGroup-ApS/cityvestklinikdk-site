/**
 * Google reviews block – header bar + horizontal review cards (matches reference design).
 * Pass reviews/meta from loader (Google Places API) or leave empty to use static fallback.
 */
import { useRef, useState } from "react";
import {
  GOOGLE_REVIEWS,
  GOOGLE_REVIEWS_META,
  type GoogleReview,
} from "~/lib/google-reviews";

function GoogleLogo() {
  const chars = [
    { letter: "G", color: "#4285F4" },
    { letter: "o", color: "#EA4335" },
    { letter: "o", color: "#FBBC05" },
    { letter: "g", color: "#4285F4" },
    { letter: "l", color: "#34A853" },
    { letter: "e", color: "#EA4335" },
  ];
  return (
    <span className="font-normal text-xl tracking-tight" aria-hidden>
      {chars.map(({ letter, color }, i) => (
        <span key={i} style={{ color }}>
          {letter}
        </span>
      ))}
    </span>
  );
}

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const w = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <div className="flex gap-0.5" aria-hidden>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={w}
          fill={star <= rating ? "#EAB308" : "none"}
          stroke={star <= rating ? "#EAB308" : "#E5E7EB"}
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleGIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M9 1C4.58 1 1 4.58 1 9s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm.9 12.5H8.1v-6.3h1.8v6.3zm0-7.2H8.1V5.3h1.8v1z" fill="#5F6368"/>
    </svg>
  );
}

function Avatar({ name, profilePhotoUrl }: { name: string; profilePhotoUrl?: string }) {
  const initial = name.charAt(0).toUpperCase();
  if (profilePhotoUrl) {
    return (
      <img
        src={profilePhotoUrl}
        alt=""
        className="w-10 h-10 rounded-full object-cover shrink-0"
      />
    );
  }
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
      style={{ background: "#7C3AED" }}
    >
      {initial}
    </div>
  );
}

export interface GoogleReviewsSectionProps {
  reviews?: GoogleReview[] | null;
  averageRating?: number;
  totalReviews?: number;
  writeReviewUrl?: string | null;
}

export function GoogleReviewsSection({
  reviews: reviewsProp,
  averageRating: averageRatingProp,
  totalReviews: totalReviewsProp,
  writeReviewUrl: writeReviewUrlProp,
}: GoogleReviewsSectionProps = {}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const reviews: GoogleReview[] =
    reviewsProp && reviewsProp.length > 0 ? reviewsProp : GOOGLE_REVIEWS;
  const averageRating = averageRatingProp ?? GOOGLE_REVIEWS_META.averageRating;
  const totalReviews = totalReviewsProp ?? GOOGLE_REVIEWS_META.totalReviews;
  const writeReviewUrl = writeReviewUrlProp ?? GOOGLE_REVIEWS_META.writeReviewUrl;

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="section-block bg-white">
      <div className="section-inner">
        {/* Header bar: Google logo + Fremragende + stars + count + button */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 rounded-xl px-5 py-4 mb-8"
          style={{ background: "#F1F3F4" }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <GoogleLogo />
            <span className="font-semibold text-secondary">Fremragende</span>
            <StarRating rating={Math.round(averageRating)} size="md" />
            <span className="text-secondary text-sm md:text-base">
              {averageRating} | {totalReviews} anmeldelser
            </span>
          </div>
          <a
            href={writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-secondary transition-colors hover:bg-gray-200"
            style={{ background: "#E8EAED" }}
          >
            Skriv en anmeldelse
          </a>
        </div>

        {/* Horizontal scrollable cards */}
        <div className="relative flex items-stretch gap-4">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2 -mx-1 scrollbar-hide"
          >
            {reviews.map((review, i) => (
              <article
                key={i}
                className="flex-shrink-0 w-[280px] md:w-[320px] rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex flex-col"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar name={review.name} profilePhotoUrl={review.profilePhotoUrl} />
                    <div className="min-w-0">
                      <p className="font-semibold text-secondary text-sm truncate">
                        {review.name}
                      </p>
                      {review.date && (
                        <p className="text-gray-500 text-xs mt-0.5">{review.date}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-gray-400">
                    <GoogleGIcon />
                  </div>
                </div>
                <div className="mt-2 mb-3">
                  <StarRating rating={review.rating} size="sm" />
                </div>
                <p
                  className={`text-secondary text-sm leading-relaxed flex-1 min-h-[4.5rem] ${
                    expandedId === i ? "" : "line-clamp-4"
                  }`}
                >
                  {review.quote}
                </p>
                <button
                  type="button"
                  onClick={() => setExpandedId(expandedId === i ? null : i)}
                  className="text-left text-sm font-medium mt-2 text-[#1a73e8] hover:underline"
                >
                  {expandedId === i ? "Vis mindre" : "Læs mere"}
                </button>
              </article>
            ))}
          </div>

          {/* Scroll next arrow */}
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Næste anmeldelser"
            className="hidden md:flex flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors self-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
