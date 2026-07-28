import type { Route } from "./+types/services";
import { JsonLd } from "~/components/JsonLd";
import { Eyebrow, ButtonLink, Icon } from "~/components/ui";
import { generateMeta, generateJsonLd, absoluteUrl } from "~/lib/seo";
import { SITE } from "~/lib/site";
import { SERVICES, PROCESS } from "~/lib/content";
import { CtaBand } from "./index";

const DESCRIPTION =
  "Cityvest Kliniks tjenester: helbredsundersøgelser, speciallægekonsultationer, mindre kirurgi, blodprøver, vaccination og erhvervssundhed i København.";

export function meta(_: Route.MetaArgs) {
  return generateMeta({
    title: "Tjenester",
    description: DESCRIPTION,
    path: "/services",
  });
}

/** ItemList schema of the clinic's services for richer results. */
function servicesItemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Tjenester hos Cityvest Klinik",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "MedicalProcedure",
        name: s.title,
        description: s.short,
        url: `${absoluteUrl("/services")}#${s.slug}`,
      },
    })),
  };
}

export default function Tjenester() {
  return (
    <>
      {generateJsonLd({
        name: "Tjenester",
        description: DESCRIPTION,
        path: "/services",
        breadcrumbs: [
          { name: "Forside", path: "/" },
          { name: "Tjenester", path: "/services" },
        ],
      }).map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
      <JsonLd data={servicesItemListJsonLd()} />

      {/* ── Subpage hero ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-surface-dim"
        style={{ contain: "layout paint" }}
      >
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div
          className="animate-blob-3 pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle,#A7B5D0,transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <nav aria-label="Brødkrumme" className="mb-6 text-sm text-text-muted">
            <ol className="flex items-center gap-2">
              <li>
                <a href="/" className="animated-link hover:text-ink">Forside</a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink">Tjenester</li>
            </ol>
          </nav>
          <div className="max-w-3xl animate-fade-in-up">
            <Eyebrow>Vores tjenester</Eyebrow>
            <h1 className="display-xl mt-4 text-ink">
              Behandlinger, der{" "}
              <span className="display-italic text-primary-dark">passer til dig</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
              Cityvest Klinik tilbyder et bredt udvalg af undersøgelser og
              behandlinger — udført af erfarne speciallæger i trygge, moderne
              rammer. Herunder finder du en oversigt over, hvad vi kan hjælpe
              dig med.
            </p>
          </div>
        </div>
      </section>

      {/* ── Quick nav chips ──────────────────────────────────────────────── */}
      <section className="border-y border-border bg-surface" style={{ contain: "layout paint" }}>
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-5 py-6 sm:px-8">
          {SERVICES.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="sticker">
              <Icon name={s.icon} className="h-4 w-4 text-primary-dark" />
              {s.title.split(" ")[0]}
            </a>
          ))}
        </div>
      </section>

      {/* ── Detailed services ────────────────────────────────────────────── */}
      <section className="bg-surface py-20 sm:py-24" style={{ contain: "layout paint" }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:px-8">
          {SERVICES.map((service, i) => (
            <article
              key={service.slug}
              id={service.slug}
              className="card-elevated grid scroll-mt-28 gap-8 p-8 sm:p-10 lg:grid-cols-[auto_1fr]"
            >
              <div className="flex items-start gap-5 lg:flex-col lg:items-start">
                <span className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-ink text-text-on-dark">
                  <Icon name={service.icon} className="h-7 w-7" />
                </span>
                <span className="font-display text-4xl font-light text-primary-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h2 className="font-display text-2xl text-ink sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-muted">
                  {service.long}
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[0.95rem] text-text">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/15 text-primary-dark">
                        <Icon name="check" className="h-3.5 w-3.5" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section className="bg-surface-dim py-20 sm:py-28" style={{ contain: "layout paint" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-14 max-w-2xl">
            <Eyebrow>Sådan foregår et forløb</Eyebrow>
            <h2 className="display-lg mt-4 text-ink">Enkelt og trygt fra start</h2>
          </div>
          <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step) => (
              <li key={step.n} className="card-ivory p-7">
                <span className="font-display text-4xl font-light text-primary-dark">
                  {step.n}
                </span>
                <h3 className="mt-3 font-heading text-lg font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-text-muted">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href={`tel:${SITE.phoneHref}`} variant="ink">
              Ring {SITE.phone.replace("+45 ", "")}
            </ButtonLink>
            <ButtonLink to="/about" variant="outline">
              Læs om klinikken
            </ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
