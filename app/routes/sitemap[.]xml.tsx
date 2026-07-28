/**
 * sitemap[.]xml route — served at /sitemap.xml
 *
 * Static sitemap generated from the app's route table (app/routes.ts).
 * Absolute URLs use the canonical production domain.
 */
import type { Route } from "./+types/sitemap[.]xml";
import { SITE } from "~/lib/site";

/** Public, indexable routes with sitemap priority. Keep in sync with app/routes.ts. */
const ROUTES: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: "", priority: "1.0", changefreq: "weekly" },
  { path: "services", priority: "0.9", changefreq: "monthly" },
  { path: "about", priority: "0.7", changefreq: "monthly" },
];

export function loader(_: Route.LoaderArgs) {
  const lastmod = new Date().toISOString().split("T")[0];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...ROUTES.map((r) => {
      const loc = r.path ? `${SITE.url}/${r.path}` : SITE.url;
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
    }),
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
