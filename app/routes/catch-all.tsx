/**
 * Splat route — catches every unmatched path.
 * 1. Normalizes trailing slashes to the canonical non-slash form.
 * 2. Otherwise 404s (handled by the root ErrorBoundary).
 */
import { redirect } from "react-router";
import type { Route } from "./+types/catch-all";

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const raw = url.pathname;
  const clean = raw.replace(/\/+$/, "") || "/";

  if (raw !== clean) {
    throw redirect(clean + url.search, 301);
  }

  throw new Response("Not Found", { status: 404 });
}

export default function CatchAll() {
  return null;
}
