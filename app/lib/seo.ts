// ─────────────────────────────────────────────────────────────────────────────
// SEO helpers — meta tags, Open Graph, Twitter cards, canonical links and
// JSON-LD structured data. All pages consume these for consistent SEO.
// ─────────────────────────────────────────────────────────────────────────────
import { SITE, FULL_ADDRESS } from "./site";

export interface MetaOptions {
  /** Page name, e.g. "Om os". Combined into "<name> | ABB Medical Aps". */
  title: string;
  description: string;
  /** Absolute or root-relative path for this page, e.g. "/about". */
  path: string;
  type?: "website" | "article";
  image?: string;
  noindex?: boolean;
}

/** Absolute URL from a root-relative path. */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE.url}${path === "/" ? "" : path}`;
}

/**
 * generateMeta — returns a complete React Router `meta` descriptor array:
 * title, description, canonical <link>, Open Graph and Twitter Card tags.
 */
export function generateMeta(opts: MetaOptions) {
  const url = absoluteUrl(opts.path);
  const image = absoluteUrl(opts.image ?? SITE.ogImage);
  const fullTitle = `${opts.title} | ${SITE.brand}`;

  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: opts.description },
    // Canonical link (React Router renders link descriptors via <Meta />)
    { tagName: "link", rel: "canonical", href: url },

    // Open Graph
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: opts.description },
    { property: "og:type", content: opts.type ?? "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE.name },
    { property: "og:locale", content: SITE.locale },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: opts.description },
    { name: "twitter:image", content: image },
  ];

  if (opts.noindex) {
    meta.push({ name: "robots", content: "noindex, follow" });
  }

  return meta;
}

// ── JSON-LD structured data ────────────────────────────────────────────────

const CONTACT_POINT = {
  "@type": "ContactPoint",
  telephone: SITE.phoneHref,
  email: SITE.email,
  contactType: "customer service",
  areaServed: "DK",
  availableLanguage: ["Danish", "English"],
};

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: SITE.address.street,
  postalCode: SITE.address.postalCode,
  addressLocality: SITE.address.city,
  addressCountry: SITE.address.country,
};

/** Organization schema — site-wide legal entity. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: absoluteUrl("/images/logo.svg"),
    email: SITE.email,
    telephone: SITE.phoneHref,
    contactPoint: CONTACT_POINT,
    address: POSTAL_ADDRESS,
  };
}

/** LocalBusiness / MedicalClinic schema — physical clinic + NAP data. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE.url}/#clinic`,
    name: SITE.name,
    legalName: SITE.legalName,
    description: `${SITE.name} er en privat sundhedsklinik på ${FULL_ADDRESS}. Vi tilbyder helbredsundersøgelser, speciallægekonsultationer, mindre kirurgiske indgreb og vaccination.`,
    url: SITE.url,
    logo: absoluteUrl("/images/logo.svg"),
    image: absoluteUrl(SITE.ogImage),
    telephone: SITE.phoneHref,
    email: SITE.email,
    priceRange: "$$",
    currenciesAccepted: "DKK",
    address: POSTAL_ADDRESS,
    areaServed: { "@type": "City", name: "København" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "08:00",
        closes: "15:00",
      },
    ],
    contactPoint: CONTACT_POINT,
  };
}

/** WebPage schema for an individual page. */
export function webPageJsonLd(opts: { name: string; description: string; path: string }) {
  const url = absoluteUrl(opts.path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: opts.name,
    description: opts.description,
    url,
    isPartOf: { "@id": `${SITE.url}/#organization` },
    about: { "@id": `${SITE.url}/#clinic` },
    inLanguage: "da-DK",
  };
}

/** BreadcrumbList schema for subpages. */
export function breadcrumbJsonLd(trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * generateJsonLd — convenience aggregator returning an array of schema.org
 * objects for a given page (WebPage + optional breadcrumbs). Site-wide
 * Organization/LocalBusiness schema lives in the root layout.
 */
export function generateJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  breadcrumbs?: Array<{ name: string; path: string }>;
}) {
  const graph: Array<Record<string, unknown>> = [webPageJsonLd(opts)];
  if (opts.breadcrumbs && opts.breadcrumbs.length > 0) {
    graph.push(breadcrumbJsonLd(opts.breadcrumbs));
  }
  return graph;
}
