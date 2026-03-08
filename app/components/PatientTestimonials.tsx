import { GoogleReviewsSection } from "~/components/GoogleReviewsSection";

interface PatientTestimonialsProps {
  googleReviews?: {
    reviews: { quote: string; name: string; rating: number; date?: string; profilePhotoUrl?: string }[];
    averageRating: number;
    totalReviews: number;
    writeReviewUrl: string;
  } | null;
}

export function PatientTestimonials({ googleReviews }: PatientTestimonialsProps) {
  return (
    <GoogleReviewsSection
      reviews={googleReviews?.reviews}
      averageRating={googleReviews?.averageRating}
      totalReviews={googleReviews?.totalReviews}
      writeReviewUrl={googleReviews?.writeReviewUrl}
    />
  );
}
