import { GoogleReviewsSection } from "~/components/GoogleReviewsSection";

interface TestimonialsProps {
  googleReviews?: {
    reviews: { quote: string; name: string; rating: number; date?: string; profilePhotoUrl?: string }[];
    averageRating: number;
    totalReviews: number;
    writeReviewUrl: string;
  } | null;
}

export function Testimonials({ googleReviews }: TestimonialsProps) {
  return (
    <GoogleReviewsSection
      reviews={googleReviews?.reviews}
      averageRating={googleReviews?.averageRating}
      totalReviews={googleReviews?.totalReviews}
      writeReviewUrl={googleReviews?.writeReviewUrl}
    />
  );
}
