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

/**
 * Aggregate shown in the header — matches the live Google Business profile for
 * Kirurgisk klinik Brabrand (4.9 / 5 · 44 anmeldelser).
 * Source: Google search / Business profile for cityvestklinik.
 */
export const GOOGLE_REVIEWS_META = {
  averageRating: 4.9,
  totalReviews: 44,
  writeReviewUrl: "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID",
};

/**
 * Verbatim Google reviews from the Google Business profile for Kirurgisk klinik
 * Brabrand (Google Maps). Emojis removed for clean display; wording unchanged.
 * To switch to live auto-updating reviews, set GOOGLE_PLACE_ID /
 * GOOGLE_PLACES_API_KEY and wire getGoogleReviews() from ~/lib/google-places.ts.
 */
export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    quote:
      "Han har været utrolig dygtig og meget tålmodig. Han tog sig altid tid til at forklare os som forældre trin for trin, hvad der skulle ske, så vi følte os trygge hele vejen. Efter vi kom hjem, har vores søn heldigvis ikke haft smerter. Vi er meget taknemmelige for hans indsats og omsorg.",
    name: "Nesrine B",
    rating: 5,
    date: "mar. 2026",
  },
  {
    quote:
      "Stor anbefaling! Vi har været meget glade og tilfredse med hele forløbet. Jeg var meget bekymret og nervøs, men alt gik heldigvis godt. Vi er glade for, klinikken/lægen har været så hurtige til at besvare vores spørgsmål.",
    name: "Anne Bordbar",
    rating: 5,
    date: "maj 2026",
  },
  {
    quote:
      "Vi har haft en rigtig god oplevelse i forbindelse med vores søns omskæring. Lægen var meget dygtig og professionel, og vi fik god og tryg rådgivning både før og efter indgrebet. Vi følte os trygge hele vejen igennem og kan varmt anbefale stedet.",
    name: "Erkan Hadzic",
    rating: 5,
    date: "nov. 2025",
  },
  {
    quote:
      "Rigtig god oplevelse. Blev mødt af professionelle, som havde styr på det hele, og man får en god vejledning til både før og efter indgrebet.",
    name: "Fero Jan",
    rating: 5,
    date: "maj 2026",
  },
  {
    quote:
      "Helt fantastisk oplevelse, rigtig dygtig læge samt sygeplejerske. Vi fik et papir med, som fortæller os, hvad vi skal gøre fremover ift. vores søn samt hans omskæring. Jeg vil helt klart anbefale denne klinik.",
    name: "Mahmoud Ramadan",
    rating: 5,
    date: "nov. 2025",
  },
  {
    quote:
      "Det var en rigtig god oplevelse, han havde styr på det hele. Og han var tålmodig. Han var god til at guide, og der var ingen bekymringer.",
    name: "Samia Sid",
    rating: 5,
    date: "aug. 2026",
  },
];
