/**
 * Trustpilot reviews for Kirurgisk klinik Brabrand (cityvestklinik.dk).
 * Source: https://dk.trustpilot.com/review/cityvestklinik.dk
 *
 * These are verbatim customer reviews (Danish). Long reviews have been trimmed
 * to a representative excerpt at a natural sentence boundary — no wording is
 * altered. Refresh periodically from the Trustpilot profile.
 */
export interface TrustpilotReview {
  quote: string;
  name: string;
  rating: number;
  date?: string;
}

/** Aggregate shown in the header — matches the live Trustpilot profile. */
export const TRUSTPILOT_META = {
  averageRating: 4.8,
  totalReviews: 47,
  profileUrl: "https://dk.trustpilot.com/review/cityvestklinik.dk",
  writeReviewUrl: "https://dk.trustpilot.com/evaluate/cityvestklinik.dk",
};

export const TRUSTPILOT_REVIEWS: TrustpilotReview[] = [
  {
    quote:
      "Fra første kontakt følte vi os trygge. Lægen fremstod meget renlig, professionel og grundig, og vi blev rigtig godt informeret både før, under og efter behandlingen.",
    name: "Sanida Adilovic",
    rating: 5,
    date: "nov. 2026",
  },
  {
    quote:
      "God information og forberedelse. Derfor god oplevelse både til os og til vores søn.",
    name: "Muthanna",
    rating: 5,
    date: "okt. 2026",
  },
  {
    quote:
      "Vi har to sønner, som begge er omskåret af Amin i kirurgisk klinik. Jeg kan kun give mine varmeste anbefalinger. Man mærker med det samme, at han er en dygtig læge med høj faglighed.",
    name: "Rukiia Duale",
    rating: 5,
    date: "okt. 2026",
  },
  {
    quote:
      "Rigtig god og professionel behandling. Ingen komplikationer. Ringen faldt af efter 14 dage, som vi blev informeret om fra starten. Varmt anbefales.",
    name: "M R",
    rating: 5,
    date: "aug. 2026",
  },
  {
    quote:
      "Jeg er meget tilfreds med behandlingen. 2 gange uden problemer. Jeg kan godt anbefale.",
    name: "Furaha Lweso",
    rating: 5,
    date: "aug. 2026",
  },
  {
    quote:
      "Fantastisk oplevelse fra start til slut. Man føler sig virkelig i trygge hænder, og hele forløbet var professionelt og trygt. Han har udført tre omskæringer i vores familie, og hver gang har resultatet været helt i top.",
    name: "MK",
    rating: 5,
    date: "juli 2026",
  },
  {
    quote:
      "Operationen gik nemt, som planlagt. Amin har udført et pragtfuldt stykke arbejde, og man bliver grundigt informeret med plan både før og efter operationen. Vi er godt tilfredse med resultatet.",
    name: "Yakup Tecer",
    rating: 5,
    date: "juli 2026",
  },
  {
    quote:
      "Det, der især gjorde en stor forskel for os, var den gode opfølgning. Når vi blev usikre eller havde spørgsmål, var lægen Amin altid hurtig til at svare og meget hjælpsom. Slutresultatet er virkelig flot udført.",
    name: "Ahmad Nasser Abdoh",
    rating: 5,
    date: "apr. 2026",
  },
  {
    quote:
      "God og professionel behandling. Vi har fået omskåret begge vores sønner ved kirurgisk klinik i Brabrand. Begge gange har været en god oplevelse. Venlige og god vejledning. Kan kun anbefale stedet!",
    name: "Elisabet",
    rating: 5,
    date: "maj 2026",
  },
  {
    quote:
      "Begge vores sønner er omskåret hos Amin, og vi er yderst tilfredse med hele behandlingen. Man kan godt mærke, man er i trygge hænder hele vejen igennem.",
    name: "Mahnaz Jalili",
    rating: 4,
    date: "jan. 2025",
  },
];
