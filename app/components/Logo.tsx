import { Link } from "react-router";
import { SITE } from "~/lib/site";

/**
 * Cityvest Klinik wordmark — inline SVG mark + typographic name.
 * `variant` switches colours for light vs. dark backgrounds.
 */
export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const wordColor = variant === "light" ? "#F6F4EE" : "var(--color-ink)";
  const markBg = variant === "light" ? "#F6F4EE" : "var(--color-ink)";
  const pulse = variant === "light" ? "#0B1020" : "#A7B5D0";

  return (
    <Link
      to="/"
      className="inline-flex items-center gap-3"
      aria-label={`${SITE.name} — til forsiden`}
    >
      <span
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: markBg }}
        aria-hidden="true"
      >
        <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
          <path
            d="M6 22 h6 l3 -10 5 20 3 -10 h6"
            stroke={pulse}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className="font-display text-xl font-normal tracking-tight"
          style={{ color: wordColor }}
        >
          Cityvest
        </span>
        <span
          className="text-[0.68rem] font-semibold uppercase tracking-[0.28em]"
          style={{ color: "var(--color-primary)" }}
        >
          Klinik
        </span>
      </span>
    </Link>
  );
}
