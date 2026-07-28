/**
 * Splat route — catches every unmatched path.
 * 1. 301s legacy/renamed URLs (see ~/lib/redirects).
 * 2. Normalizes trailing slashes to the canonical non-slash form, so the
 *    live cityvestklinik.dk URLs (which carry trailing slashes) resolve.
 * 3. Otherwise 404s.
 */
import { redirect } from "react-router";
import type { Route } from "./+types/catch-all";
import { LEGACY_REDIRECTS } from "~/lib/redirects";

// `url` (not `request.url`): React Router 8 passes the raw incoming request
// through untouched, so on a client-side navigation `request.url` still carries
// the framework's `/priser/_.data` suffix and `_routes` params — normalizing
// that would 301 visitors to a literal `.data` path. `url` is the normalized
// application location with those details stripped, trailing slash preserved.
export function loader({ url }: Route.LoaderArgs) {
  const raw = url.pathname;
  const clean = raw.replace(/\/+$/, "") || "/";

  // 1. Legacy / renamed slug → canonical slug (keys have no trailing slash)
  const target = LEGACY_REDIRECTS[clean];
  if (target) {
    throw redirect(target + url.search, 301);
  }

  // 2. Trailing-slash normalization (e.g. /priser/ → /priser)
  if (raw !== clean) {
    throw redirect(clean + url.search, 301);
  }

  throw new Response("Not Found", { status: 404 });
}

export default function CatchAll() {
  return null;
}
