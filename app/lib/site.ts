// ─────────────────────────────────────────────────────────────────────────────
// Central business + site configuration for Cityvest Klinik (ABB Medical ApS).
// Single source of truth for NAP data, navigation and SEO defaults.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  /** Public-facing clinic brand */
  name: "Cityvest Klinik",
  /** Legal entity */
  legalName: "ABB Medical ApS",
  /** Used in <title> suffixes per the SEO brief */
  brand: "ABB Medical Aps",
  tagline: "Din private sundhedsklinik i København",
  url: "https://cityvestklinik.dk",
  locale: "da_DK",
  email: "info@cityvestklinik.dk",
  phone: "+45 20 76 35 16",
  phoneHref: "+4520763516",
  address: {
    street: "Willy Brandts Vej 25, 1. 1.",
    postalCode: "2450",
    city: "København SV",
    country: "DK",
  },
  copyrightYear: 2026,
  /** Default social/OG share image (absolute path resolved against url) */
  ogImage: "/images/klinik-forside.jpg",
  openingHours: [
    { days: "Mandag – torsdag", hours: "08.00 – 17.00" },
    { days: "Fredag", hours: "08.00 – 15.00" },
    { days: "Lørdag – søndag", hours: "Lukket" },
  ],
} as const;

export const NAV: Array<{ label: string; to: string }> = [
  { label: "Forside", to: "/" },
  { label: "Om os", to: "/about" },
  { label: "Tjenester", to: "/services" },
];

/** Full address on a single line (for schema + footer). */
export const FULL_ADDRESS = `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`;
