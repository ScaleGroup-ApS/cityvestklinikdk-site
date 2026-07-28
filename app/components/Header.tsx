import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Logo } from "~/components/Logo";
import { NAV, SITE } from "~/lib/site";

/**
 * Sticky site header with translucent blur, active-aware navigation and a
 * CSS-only reveal on the mobile drawer. Interactive state is a single
 * boolean — no animation libraries.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-surface/85 backdrop-blur-xl"
          : "border-b border-transparent bg-surface/40 backdrop-blur-md"
      }`}
    >
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Hovednavigation"
      >
        <Logo />

        <ul className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `animated-link text-[0.95rem] font-medium transition-colors ${
                    isActive ? "text-primary-dark" : "text-text hover:text-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a href={`tel:${SITE.phoneHref}`} className="btn-ink">
            Ring {SITE.phone.replace("+45 ", "")}
            <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/70 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Luk menu" : "Åbn menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-ink transition-transform duration-300 ${
                open ? "top-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-ink transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-ink transition-transform duration-300 ${
                open ? "top-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-border bg-surface md:hidden ${
          open ? "max-h-[80vh]" : "max-h-0"
        }`}
        style={{ transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1)" }}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-surface-dim text-primary-dark"
                      : "text-text hover:bg-surface-dim"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li className="mt-3">
            <a
              href={`tel:${SITE.phoneHref}`}
              className="btn-ink w-full"
              onClick={() => setOpen(false)}
            >
              Ring {SITE.phone.replace("+45 ", "")}
            </a>
          </li>
          <li className="mt-1">
            <a
              href={`mailto:${SITE.email}`}
              className="btn-outline w-full"
              onClick={() => setOpen(false)}
            >
              Skriv til os
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
