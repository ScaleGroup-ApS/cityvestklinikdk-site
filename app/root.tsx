import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { ReactNode } from "react";
import type { Route } from "./+types/root";
import { CookieConsent } from "~/components/CookieConsent";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { organizationJsonLd, localBusinessJsonLd } from "~/lib/seo";
import { SITE } from "~/lib/site";
import "./app.css";

const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Public+Sans:ital,wght@0,300..700;1,400&display=swap";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
];

export const meta: Route.MetaFunction = () => [
  { name: "theme-color", content: "#0B1020" },
  { name: "author", content: SITE.legalName },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="da">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* Non-render-blocking Google Fonts: preload → swap to stylesheet on load */}
        <link
          rel="preload"
          as="style"
          href={GOOGLE_FONTS_URL}
          onLoad={(e) => {
            const link = e.currentTarget as HTMLLinkElement;
            link.onload = null;
            link.rel = "stylesheet";
          }}
        />
        <noscript>
          <link rel="stylesheet" href={GOOGLE_FONTS_URL} />
        </noscript>

        {/* Site-wide structured data */}
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={localBusinessJsonLd()} />

        {/* Google Consent Mode v2 default — everything denied until consent */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag("consent", "default", {
                ad_user_data: "denied",
                ad_personalization: "denied",
                ad_storage: "denied",
                analytics_storage: "denied",
                functionality_storage: "denied",
                personalization_storage: "denied",
                security_storage: "granted",
                wait_for_update: 500,
              });
              gtag("set", "ads_data_redaction", true);
              gtag("set", "url_passthrough", true);
            `.replace(/\n\s+/g, " "),
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ES7V2VYL1D" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ES7V2VYL1D');
            `.replace(/\n\s+/g, " "),
          }}
        />
      </head>
      <body className="min-h-screen bg-surface text-text antialiased">
        {children}
        <CookieConsent />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main id="indhold">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Ups!";
  let details = "Der opstod en uventet fejl.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : `Fejl ${error.status}`;
    details =
      error.status === 404
        ? "Vi kunne ikke finde den side, du leder efter."
        : error.statusText || details;
  } else if (error instanceof Error && import.meta.env.DEV) {
    details = error.message;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-dim px-6">
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="eyebrow mb-4">Cityvest Klinik</p>
        <h1 className="font-display mb-3 text-6xl font-light text-ink">{message}</h1>
        <p className="mb-8 text-lg text-text-muted">{details}</p>
        <a href="/" className="btn-ink">
          Tilbage til forsiden
          <span className="btn-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </main>
  );
}
