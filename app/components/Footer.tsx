import { Link } from "react-router";
import { Logo } from "~/components/Logo";
import { NAV, SITE, FULL_ADDRESS } from "~/lib/site";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-surface-dark text-text-on-dark"
      style={{ contain: "layout paint" }}
    >
      <div className="grain grain-dark absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo variant="light" />
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-text-on-dark-muted">
              Privat sundhedsklinik i hjertet af København. Tryg behandling,
              korte ventetider og speciallæger, der tager sig tid til dig.
            </p>
            <p className="mt-6 text-sm text-text-on-dark-muted">
              {SITE.legalName} · CVR-registreret klinik
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Sidefod-navigation">
            <h2 className="eyebrow eyebrow-light mb-5">Menu</h2>
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="animated-link text-[0.95rem] text-text-on-dark-muted transition-colors hover:text-text-on-dark"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="eyebrow eyebrow-light mb-5">Kontakt</h2>
            <address className="space-y-3 text-[0.95rem] not-italic text-text-on-dark-muted">
              <p>{FULL_ADDRESS}</p>
              <p>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="animated-link transition-colors hover:text-text-on-dark"
                >
                  {SITE.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="animated-link transition-colors hover:text-text-on-dark"
                >
                  {SITE.email}
                </a>
              </p>
            </address>
            <div className="mt-6 space-y-1 text-sm text-text-on-dark-muted">
              {SITE.openingHours.map((row) => (
                <div key={row.days} className="flex justify-between gap-4">
                  <span>{row.days}</span>
                  <span className="text-text-on-dark">{row.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rule mt-14 opacity-30" />
        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-xs text-text-on-dark-muted sm:flex-row">
          <p>
            © {SITE.copyrightYear} {SITE.legalName}. Alle rettigheder forbeholdes.
          </p>
          <p>
            {SITE.name} · {SITE.address.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
