/**
 * altcha.$siteId.challenge — same-origin ALTCHA challenge proxy.
 *
 * The self-hosted ALTCHA server (ALTCHA_PUBLIC_BASE_URL, altcha.scaledev.dk)
 * only allows the old staging origin for site `cityvestklinikdk-site`, so the
 * browser widget's cross-origin GET to it returns 403 (no CORS header) and the
 * contact form can never be completed. Until the server's per-site origin
 * allowlist is fixed to include https://cityvestklinik.dk, we route the
 * challenge through our own origin: the browser requests
 * /altcha/<siteId>/challenge (same-origin, no CORS) and the SSR server fetches
 * the real challenge server-to-server — with no Origin header, so the upstream
 * allowlist is not consulted and it returns 200 — then returns it verbatim.
 *
 * Only challenge issuance is proxied. Server-side siteverify is unchanged: it
 * already runs server-to-server over the private ALTCHA_VERIFY_BASE_URL, and
 * both endpoints are the same ALTCHA service sharing one signing key + store,
 * so a challenge issued here verifies normally there.
 *
 * Note: the upstream rate-limits per peer IP; proxied challenges all share this
 * server's egress IP, so the 30/min/peer bucket is shared across visitors. That
 * is ample for a contact form (the per-site cap is 600/min).
 */
import type { Route } from "./+types/altcha.$siteId.challenge";

const SITE_ID = /^[a-zA-Z0-9_-]{1,128}$/;

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function loader({ params }: Route.LoaderArgs) {
  const siteId = params.siteId ?? "";
  const configured = process.env.ALTCHA_SITE_KEY;
  const baseUrl = process.env.ALTCHA_PUBLIC_BASE_URL;

  // Only proxy the single site this app is configured for — never act as an
  // open relay for arbitrary site ids.
  if (!SITE_ID.test(siteId) || !configured || siteId !== configured || !baseUrl) {
    return json({ success: false }, 404);
  }

  let base: URL;
  try {
    base = new URL(baseUrl);
    if (
      !["https:", "http:"].includes(base.protocol) ||
      base.username ||
      base.password ||
      base.search ||
      base.hash
    )
      throw new Error("invalid base");
  } catch {
    return json({ success: false }, 503);
  }

  try {
    // Server-to-server fetch: no Origin header is sent, so the upstream's
    // per-site origin allowlist is bypassed and it issues the challenge.
    const upstream = await fetch(
      `${base.href.replace(/\/$/, "")}/${siteId}/challenge`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
        redirect: "error",
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!upstream.ok) return json({ success: false }, 503);
    const body = await upstream.text();
    if (body.length > 8192) return json({ success: false }, 503);
    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type":
          upstream.headers.get("content-type") ?? "application/json;charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return json({ success: false }, 503);
  }
}
