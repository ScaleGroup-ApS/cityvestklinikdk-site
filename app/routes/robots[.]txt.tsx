/**
 * robots[.]txt route — served at /robots.txt
 *
 * Allows all crawlers, points to the sitemap.
 */
import type { Route } from "./+types/robots[.]txt";

export function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;

  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    `# LLM-friendly summary: ${siteUrl}/llms.txt`,
  ].join("\n");

  return new Response(robotsTxt, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
