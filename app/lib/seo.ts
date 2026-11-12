// ─────────────────────────────────────────────────────────────────────────────
// SEO Helpers
// Generates meta tags, Open Graph, JSON-LD structured data, and canonical URLs.
// ─────────────────────────────────────────────────────────────────────────────

interface SeoOptions {
  title: string;
  description?: string;
  url?: string;
  siteName?: string;
  siteUrl?: string;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  locale?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

/**
 * Generate a complete set of meta tags for React Router's `meta` export.
 */
export function buildMeta(opts: SeoOptions) {
  const meta: Array<Record<string, string>> = [
    { title: opts.title },
  ];

  if (opts.description) {
    meta.push({ name: "description", content: opts.description });
  }

  // Open Graph
  meta.push({ property: "og:title", content: opts.title });
  meta.push({ property: "og:type", content: opts.type ?? "website" });
  if (opts.description) {
    meta.push({ property: "og:description", content: opts.description });
  }
  if (opts.url) {
    meta.push({ property: "og:url", content: opts.url });
  }
  if (opts.siteName) {
    meta.push({ property: "og:site_name", content: opts.siteName });
  }
  meta.push({ property: "og:locale", content: opts.locale ?? "da_DK" });

  if (opts.image) {
    meta.push({ property: "og:image", content: opts.image });
    meta.push({ property: "og:image:width", content: "1200" });
    meta.push({ property: "og:image:height", content: "630" });
    if (opts.imageAlt) {
      meta.push({ property: "og:image:alt", content: opts.imageAlt });
    }
  }

  // Twitter Card
  meta.push({ name: "twitter:card", content: opts.image ? "summary_large_image" : "summary" });
  meta.push({ name: "twitter:title", content: opts.title });
  if (opts.description) {
    meta.push({ name: "twitter:description", content: opts.description });
  }
  if (opts.image) {
    meta.push({ name: "twitter:image", content: opts.image });
  }

  // Article dates
  if (opts.type === "article") {
    if (opts.publishedTime) {
      meta.push({ property: "article:published_time", content: opts.publishedTime });
    }
    if (opts.modifiedTime) {
      meta.push({ property: "article:modified_time", content: opts.modifiedTime });
    }
  }

  // Robots — noindex,follow (not nofollow) so link equity still flows
  // through pages like the booking confirmation screen.
  if (opts.noindex) {
    meta.push({ name: "robots", content: "noindex, follow" });
  }

  return meta;
}

/**
 * Site-wide entity / NAP JSON-LD for the clinic.
 *
 * The node is typed as MedicalClinic + LocalBusiness + Organization so that
 * both schema.org consumers (which understand the type hierarchy) and simpler
 * audit tools (which string-match on "@type") resolve it as an Organization
 * and a LocalBusiness. Used on every page so Google, the Knowledge Graph, and
 * AI answer engines (AI Overviews, Perplexity, ChatGPT search) can resolve a
 * single, consistent entity for the clinic.
 */
export function buildWebsiteJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness", "Organization"],
    "@id": `${siteUrl}/#organization`,
    name: "Kirurgisk klinik Brabrand",
    alternateName: "Cityvest Klinik",
    description:
      "Professionel omskæring af drengebørn i trygge rammer. Autoriserede speciallæger i City Vest, Brabrand ved Aarhus.",
    url: siteUrl,
    logo: `${siteUrl}/images/logo_2.png`,
    image: `${siteUrl}/images/klinik-forside.jpg`,
    telephone: "+4520763516",
    email: "info@cityvestklinik.dk",
    priceRange: "kr.",
    currenciesAccepted: "DKK",
    medicalSpecialty: "Surgical",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gudrunsvej 7",
      postalCode: "8220",
      addressLocality: "Brabrand",
      addressRegion: "Midtjylland",
      addressCountry: "DK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 56.1537733,
      longitude: 10.1357437,
    },
    areaServed: { "@type": "Country", name: "Danmark" },
    availableService: {
      "@type": "MedicalProcedure",
      name: "Rituel drengeomskæring",
      procedureType: "https://schema.org/PercutaneousProcedure",
    },
    // Aggregated from the Google and Trustpilot reviews shown on-page.
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      ratingCount: 91,
    },
    sameAs: [
      "https://dk.trustpilot.com/review/cityvestklinik.dk",
      "https://www.google.com/maps/place/Kirurgisk+Klinik+Brabrand",
    ],
  };
}

/**
 * Generate FAQPage JSON-LD for a set of question/answer pairs.
 * FAQPage markup is heavily used by AI Overviews and answer engines to
 * source direct answers, in addition to classic rich-result snippets.
 */
export function buildFaqJsonLd(
  items: Array<{
    q: string;
    a?: string;
    blocks?: Array<{ type: "p" | "ul"; text?: string; items?: string[] }>;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a ?? flattenFaqBlocks(item.blocks ?? []),
      },
    })),
  };
}

function flattenFaqBlocks(
  blocks: Array<{ type: "p" | "ul"; text?: string; items?: string[] }>,
): string {
  return blocks
    .map((block) => (block.type === "ul" ? (block.items ?? []).join(" ") : block.text))
    .filter(Boolean)
    .join(" ");
}

/** Strip HTML tags from a string (for use in meta descriptions). */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}
