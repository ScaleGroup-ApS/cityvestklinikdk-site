import type { Route } from "./+types/index";
import { JsonLd } from "~/components/JsonLd";
import { Eyebrow, ButtonLink, Icon } from "~/components/ui";
import { generateMeta, generateJsonLd } from "~/lib/seo";
import { SITE } from "~/lib/site";
import { SERVICES, VALUES, PROCESS, STATS } from "~/lib/content";

const DESCRIPTION =
  "Cityvest Klinik er din private sundhedsklinik i København SV. Speciallæger, korte ventetider og tryg behandling — fra helbredstjek til mindre kirurgi.";

export function meta(_: Route.MetaArgs) {
  return generateMeta({
    title: "Privat sundhedsklinik i København",
    description: DESCRIPTION,
    path: "/",
  });
}

export default function Forside() {
  return (
    <>
      {generateJsonLd({
        name: "Forside",
        description: DESCRIPTION,
        path: "/",
      }).map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-surface-dim"
        style={{ contain: "layout paint" }}
      >
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div
          className="animate-blob pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle,#A7B5D0,transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
          <div className="animate-fade-in-up">
            <span className="sticker sticker-warm mb-6">
              <Icon name="pin" className="h-4 w-4" /> København SV · Willy Brandts Vej
            </span>
            <h1 className="display-xl text-ink">
              Sundhed i trygge hænder —{" "}
              <span className="display-italic text-primary-dark">tæt på dig</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-text-muted">
              Cityvest Klinik er en moderne privatklinik i hjertet af København.
              Vi kombinerer erfarne speciallæger med korte ventetider, så du får
              den rette behandling — hurtigt, personligt og i rolige rammer.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink to="/services" variant="ink">
                Se vores tjenester
              </ButtonLink>
              <ButtonLink href={`tel:${SITE.phoneHref}`} variant="outline">
                Ring {SITE.phone.replace("+45 ", "")}
              </ButtonLink>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-text">
              {[
                "Kort ventetid",
                "Autoriserede speciallæger",
                "Ingen henvisning nødvendig",
              ].map((chip) => (
                <li key={chip} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary-dark">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="card-elevated overflow-hidden rounded-[1.75rem] p-0">
              <img
                src="/images/klinik-forside.jpg"
                alt="Lys og moderne konsultationsrum på Cityvest Klinik i København"
                width={800}
                height={500}
                decoding="async"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="glass-card absolute -bottom-6 -left-6 hidden max-w-[15rem] p-5 sm:block">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-text-on-dark">
                  <Icon name="heart" className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-2xl leading-none text-ink">4,8/5</p>
                  <p className="text-xs text-text-muted">tilfredse patienter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <section className="border-y border-border bg-surface" style={{ contain: "layout paint" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-12 sm:px-8 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <p className="stat-number text-primary-dark">{s.value}</p>
              <p className="mt-1 text-sm text-text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services overview ────────────────────────────────────────────── */}
      <section className="bg-surface py-20 sm:py-28" style={{ contain: "layout paint" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-14 max-w-2xl">
            <Eyebrow>Vores tjenester</Eyebrow>
            <h2 className="display-lg mt-4 text-ink">
              Ét sted til hele din sundhed
            </h2>
            <p className="mt-5 text-lg text-text-muted">
              Fra det forebyggende helbredstjek til mindre kirurgiske indgreb —
              vi samler den behandling, du har brug for, under ét tag.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <article
                key={service.slug}
                className="card-ivory group flex flex-col p-7"
              >
                <span className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-ink text-text-on-dark transition-transform duration-500 group-hover:-translate-y-1">
                  <Icon name={service.icon} className="h-6 w-6" />
                </span>
                <h3 className="font-display text-xl text-ink">{service.title}</h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-text-muted">
                  {service.short}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-12">
            <ButtonLink to="/services" variant="outline">
              Læs mere om alle tjenester
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ── Values / why us ──────────────────────────────────────────────── */}
      <section className="bg-surface-dim py-20 sm:py-28" style={{ contain: "layout paint" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Eyebrow>Hvorfor Cityvest Klinik</Eyebrow>
              <h2 className="display-lg mt-4 text-ink">
                En klinik bygget på{" "}
                <span className="display-italic text-primary-dark">tryghed</span>
              </h2>
              <p className="mt-5 max-w-md text-lg text-text-muted">
                Vi tror på, at god behandling starter med tid, nærvær og
                ærlighed. Derfor har vi skabt en klinik, hvor du bliver set og
                hørt — og hvor du altid ved, hvad næste skridt er.
              </p>
              <div className="mt-8">
                <ButtonLink to="/about" variant="ink">
                  Mød klinikken
                </ButtonLink>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {VALUES.map((value) => (
                <div key={value.title} className="card-elevated p-6">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary-dark">
                    <Icon name={value.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-text-muted">
                    {value.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section className="bg-surface py-20 sm:py-28" style={{ contain: "layout paint" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-14 max-w-2xl">
            <Eyebrow>Sådan foregår det</Eyebrow>
            <h2 className="display-lg mt-4 text-ink">Fra kontakt til opfølgning</h2>
          </div>
          <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step) => (
              <li key={step.n} className="relative">
                <span className="font-display text-5xl font-light text-primary-light">
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
        </div>
      </section>

      {/* ── About teaser ─────────────────────────────────────────────────── */}
      <section className="bg-surface-dim py-20 sm:py-28" style={{ contain: "layout paint" }}>
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <div className="order-2 overflow-hidden rounded-[1.75rem] lg:order-1">
            <img
              src="/images/klinik-interior.jpg"
              alt="Venteområde og reception på Cityvest Klinik"
              width={1024}
              height={768}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <Eyebrow>Om os</Eyebrow>
            <h2 className="display-lg mt-4 text-ink">
              Nær, faglig og altid på din side
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-text-muted">
              Cityvest Klinik drives af {SITE.legalName} og samler et team af
              erfarne speciallæger og sundhedspersonale under ét tag i København
              SV. Vores mål er enkelt: at gøre professionel sundhed
              tilgængelig, tryg og menneskelig.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Autoriserede speciallæger med bred erfaring",
                "Moderne udstyr og sterile behandlingsrum",
                "Central beliggenhed med nem adgang",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-text">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary-dark">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink to="/about" variant="outline">
                Læs vores historie
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────────────────────── */}
      <CtaBand />
    </>
  );
}

export function CtaBand() {
  return (
    <section
      className="relative overflow-hidden bg-surface-dark text-text-on-dark"
      style={{ contain: "layout paint" }}
    >
      <div className="grain grain-dark absolute inset-0" aria-hidden="true" />
      <div
        className="animate-blob-2 pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle,#697DA8,transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <Eyebrow light>Book din tid i dag</Eyebrow>
        <h2 className="display-lg mt-4 text-text-on-dark">
          Klar til at tage hånd om dit helbred?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-text-on-dark-muted">
          Ring til os, eller skriv en mail — så finder vi en tid, der passer dig.
          Vi glæder os til at tage godt imod dig.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href={`tel:${SITE.phoneHref}`} variant="on-dark">
            Ring {SITE.phone.replace("+45 ", "")}
          </ButtonLink>
          <ButtonLink href={`mailto:${SITE.email}`} variant="outline-on-dark">
            Skriv til os
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
