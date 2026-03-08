/**
 * Google reviews for Kirurgisk klinik Brabrand.
 * Replace with actual reviews from your Google Business profile.
 */
export interface GoogleReview {
  quote: string;
  name: string;
  rating: number;
  date?: string;
  profilePhotoUrl?: string;
}

/** Shown in the header (e.g. 4.9 | 31 anmeldelser). Update to match your Google Business. */
export const GOOGLE_REVIEWS_META = {
  averageRating: 4.9,
  totalReviews: 31,
  writeReviewUrl: "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID",
};

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    quote:
      "Vi følte os trygge fra første kontakt. Informationen før og efter indgrebet var tydelig, og personalet var meget imødekommende. Kan varmt anbefales!",
    name: "Maria K.",
    rating: 5,
    date: "for 2 uger siden",
  },
  {
    quote:
      "Hele forløbet var professionelt og roligt. Vi fik klare råd om smertelindring og hvad vi skulle være opmærksomme på derhjemme. Meget tilfredse.",
    name: "Anders P.",
    rating: 5,
    date: "for 1 måned siden",
  },
  {
    quote:
      "Booking og kommunikation fungerede virkelig godt. Klinikken svarede hurtigt på vores spørgsmål, og vi følte os i sikre hænder. Tak!",
    name: "Louise M.",
    rating: 5,
    date: "for 2 måneder siden",
  },
  {
    quote:
      "Utrolig professionel og venlig behandling. Vores søn havde det godt under hele forløbet. Vi er meget taknemmelige og anbefaler klinikken.",
    name: "Thomas H.",
    rating: 5,
    date: "for 3 måneder siden",
  },
];
