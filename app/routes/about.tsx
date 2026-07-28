import type { Route } from "./+types/about";
import { JsonLd } from "~/components/JsonLd";
import { Eyebrow, ButtonLink, Icon } from "~/components/ui";
import { generateMeta, generateJsonLd } from "~/lib/seo";
import { SITE, FULL_ADDRESS } from "~/lib/site";
import { VALUES } from "~/lib/content";
import { CtaBand } from "./index";

const DESCRIPTION =
  "Lær Cityvest Klinik at kende — en privat sundhedsklinik i København SV drevet af ABB Medical ApS med erfarne speciallæger og fokus på tryghed.";

export function meta(_: Route.MetaArgs) {
  return generateMeta({
    title: "Om os",
    description: DESCRIPTION,
    path: "/about",
  });
}

const TEAM = [
  {
    icon: "stethoscope" as const,
    role: "Speciallæger",
    text: "Autoriserede speciallæger inden for kirurgi, dermatologi og almen medicin med mange års klinisk erfaring.",
  },
  {
    icon: "heart" as const,
    role: "Sygeplejersker",
    text: "Erfarne sygeplejersker, der sikrer tryg pleje før, under og efter din behandling.",
  },
  {
    icon: "users" as const,
    role: "Klinikpersonale",
    text: "Et imødekommende team i receptionen, der hjælper dig godt på vej fra første kontakt.",
  },
];

export default function OmOs() {
  return (
    <>
      {generateJsonLd({
        name: "Om os",
        description: DESCRIPTION,
        path: "/about",
        breadcrumbs: [
          { name: "Forside", path: "/" },
          { name: "Om os", path: "/about" },
        ],
      }).map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}

      {/* ── Subpage hero ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-surface-dim"
        style={{ contain: "layout paint" }}
      >
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <nav aria-label="Brødkrumme" className="mb-6 text-sm text-text-muted">
            <ol className="flex items-center gap-2">
              <li>
                <a href="/" className="animated-link hover:text-ink">Forside</a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink">Om os</li>
            </ol>
          </nav>
          <div className="max-w-3xl animate-fade-in-up">
            <Eyebrow>Om Cityvest Klinik</Eyebrow>
            <h1 className="display-xl mt-4 text-ink">
              Sundhed med{" "}
              <span className="display-italic text-primary-dark">hjerte</span> og
              faglighed
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
              Cityvest Klinik blev grundlagt med en klar ambition: at gøre
              professionel, privat sundhed tilgængelig og menneskelig. Vi tror
              på, at den bedste behandling opstår, når faglighed møder nærvær.
            </p>
          </div>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────────────────────── */}
      <section className="bg-surface py-20 sm:py-28" style={{ contain: "layout paint" }}>
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[1.75rem]">
            <img
              src="/images/klinik-interior.jpg"
              alt="Interiør på Cityvest Klinik med lyst venteområde"
              width={1024}
              height={768}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <Eyebrow>Vores historie</Eyebrow>
            <h2 className="display-lg mt-4 text-ink">
              En klinik skabt til mennesker
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-text-muted">
              <p>
                Cityvest Klinik drives af {SITE.legalName} og ligger centralt på{" "}
                {SITE.address.street} i {SITE.address.city}. Her har vi samlet
                erfarne speciallæger og dygtigt sundhedspersonale for at tilbyde
                et bredt udvalg af undersøgelser og behandlinger — uden lang
                ventetid.
              </p>
              <p>
                Vi ved, at det kan være grænseoverskridende at gå til lægen.
                Derfor har vi indrettet klinikken, så du føler dig tryg fra det
                øjeblik, du træder ind ad døren — rolige rammer, tid til samtalen
                og klar besked hele vejen igennem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission / stat callout ───────────────────────────────────────── */}
      <section className="bg-surface-dark py-16 text-text-on-dark sm:py-20" style={{ contain: "layout paint" }}>
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <blockquote className="font-display text-2xl font-light italic leading-relaxed text-text-on-dark sm:text-3xl">
            “God behandling handler lige så meget om at blive lyttet til som om
            at blive undersøgt. Det er kernen i alt, vi gør.”
          </blockquote>
          <p className="mt-6 text-sm uppercase tracking-[0.24em] text-text-on-dark-muted">
            Teamet bag Cityvest Klinik
          </p>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section className="bg-surface py-20 sm:py-28" style={{ contain: "layout paint" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-14 max-w-2xl">
            <Eyebrow>Vores værdier</Eyebrow>
            <h2 className="display-lg mt-4 text-ink">Det, vi står for</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div key={value.title} className="card-ivory p-7">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-text-on-dark">
                  <Icon name={value.icon} className="h-6 w-6" />
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
      </section>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <section className="bg-surface-dim py-20 sm:py-28" style={{ contain: "layout paint" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-14 max-w-2xl">
            <Eyebrow>Vores team</Eyebrow>
            <h2 className="display-lg mt-4 text-ink">
              Erfarne hænder omkring dig
            </h2>
            <p className="mt-5 text-lg text-text-muted">
              Bag Cityvest Klinik står et engageret team, der brænder for at
              tage sig ordentligt af dig — fagligt og menneskeligt.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TEAM.map((member) => (
              <article key={member.role} className="card-elevated p-8">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary-dark">
                  <Icon name={member.icon} className="h-6 w-6" />
                </span>
                <h3 className="font-display text-xl text-ink">{member.role}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-text-muted">
                  {member.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Facility / find us ───────────────────────────────────────────── */}
      <section className="bg-surface py-20 sm:py-28" style={{ contain: "layout paint" }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <Eyebrow>Find os</Eyebrow>
            <h2 className="display-lg mt-4 text-ink">Midt i København SV</h2>
            <p className="mt-5 max-w-md text-lg text-text-muted">
              Klinikken ligger centralt med gode adgangsforhold og offentlig
              transport i nærheden. Du er altid velkommen til at kontakte os,
              hvis du er i tvivl om vejen.
            </p>
            <dl className="mt-8 space-y-5">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-text-on-dark">
                  <Icon name="pin" className="h-5 w-5" />
                </span>
                <div>
                  <dt className="text-sm text-text-muted">Adresse</dt>
                  <dd className="font-medium text-ink">{FULL_ADDRESS}</dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-text-on-dark">
                  <Icon name="phone" className="h-5 w-5" />
                </span>
                <div>
                  <dt className="text-sm text-text-muted">Telefon</dt>
                  <dd className="font-medium text-ink">
                    <a href={`tel:${SITE.phoneHref}`} className="animated-link">
                      {SITE.phone}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-text-on-dark">
                  <Icon name="mail" className="h-5 w-5" />
                </span>
                <div>
                  <dt className="text-sm text-text-muted">E-mail</dt>
                  <dd className="font-medium text-ink">
                    <a href={`mailto:${SITE.email}`} className="animated-link">
                      {SITE.email}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </div>
          <div className="card-ivory p-8">
            <h3 className="font-heading text-lg font-semibold text-ink">
              Åbningstider
            </h3>
            <ul className="mt-5 divide-y divide-border">
              {SITE.openingHours.map((row) => (
                <li
                  key={row.days}
                  className="flex items-center justify-between py-3 text-[0.95rem]"
                >
                  <span className="text-text-muted">{row.days}</span>
                  <span className="font-medium text-ink">{row.hours}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <ButtonLink href={`tel:${SITE.phoneHref}`} variant="ink" className="w-full">
                Book en tid
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
