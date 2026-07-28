/**
 * robots[.]txt route — served at /robots.txt
 * Allows all crawlers and points to the sitemap on the canonical domain.
 */
import type { Route } from "./+types/robots[.]txt";
import { SITE } from "~/lib/site";

export function loader(_: Route.LoaderArgs) {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${SITE.url}/sitemap.xml`,
  ].join("\n");

  return new Response(robotsTxt, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
