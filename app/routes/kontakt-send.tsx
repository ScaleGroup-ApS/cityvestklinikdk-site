import { CONTACT_SPAM_ERROR, verifyContactSubmission } from '~/lib/contact-spam.server';
import { data, Link, redirect, useActionData } from "react-router";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { SubpageHero } from "~/components/shared/SubpageHero";
import { ContentSection } from "~/components/shared/ContentSection";
import { submitContactForm } from "~/lib/crm.server";
import type { Route } from "./+types/kontakt-send";

export function meta() {
  return [
    { title: "Kontakt Kirurgisk klinik Brabrand" },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

// Action-only route (#kontakt-form): the contact form on /kontakt posts here
// via useFetcher. On success the action redirects to the /tak-for-din-besked
// confirmation page — the fetcher follows the redirect (JS) and a full POST
// navigation follows it too (no-JS), so both land on the same thank-you page.
// Errors return inline data instead, which the fetcher renders on the contact
// page (JS) or the component below renders (no-JS) — progressive enhancement.
const CONFIRMATION_PATH = "/tak-for-din-besked";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  // Honeypot: real visitors never fill this (it's visually hidden). A filled
  // value means a bot filled every field blindly — silently pretend success
  // (same redirect as a real submission) rather than surfacing an error that
  // would teach it to adapt.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return redirect(CONFIRMATION_PATH);
  }

  const name = String(formData.get("fulde_navn") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("telefon") ?? "").trim();
  const topic = String(formData.get("emne") ?? "").trim();
  const message = String(formData.get("besked") ?? "").trim();

  if (!name || !email) {
    return data({ ok: false, error: "Udfyld venligst navn og email." }, { status: 400 });
  }

  // The topic <select> is optional and not part of the CRM contract, so fold it
  // into the free-text message the clinic receives rather than dropping it.
  const composedMessage =
    [topic ? `Emne: ${topic}` : null, message || null].filter(Boolean).join("\n\n") || undefined;

  if (!(await verifyContactSubmission(formData))) {
    return data({ ok: false, error: CONTACT_SPAM_ERROR }, { status: 422 });
  }

  let res: Response;
  try {
    res = await submitContactForm({
      name,
      email,
      phone: phone || undefined,
      message: composedMessage,
      sourceUrl: request.headers.get("referer") ?? undefined,
    });
  } catch (error) {
    console.error("kontakt-send: failed to reach CRM", error);
    return data({ ok: false, error: "Beskeden kunne ikke sendes. Prøv igen." }, { status: 502 });
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`kontakt-send: CRM rejected submission (${res.status})`, body);
    return data({ ok: false, error: "Beskeden kunne ikke sendes. Prøv igen." }, { status: 502 });
  }

  return redirect(CONFIRMATION_PATH);
}

// No-JS fallback page: only rendered on a full POST navigation that returns an
// error (JS disabled). A successful submission redirects to /tak-for-din-besked
// instead, so this component never shows a success state. With JS, the fetcher
// on /kontakt handles errors inline.
export default function KontaktSend() {
  const result = useActionData<typeof action>();
  const siteName = "Kirurgisk klinik Brabrand";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />

      <main className="flex-1">
        <SubpageHero
          eyebrow="Kontakt"
          headline="Beskeden kunne ikke sendes."
          body={
            (result && "error" in result ? result.error : undefined) ??
            "Der opstod en fejl. Prøv venligst igen."
          }
        />

        <ContentSection bg="white" narrow>
          <Link
            to="/kontakt"
            className="animated-link text-[color:var(--color-ink)] font-medium text-[15px]"
          >
            Tilbage til kontakt
          </Link>
        </ContentSection>
      </main>

      <Footer siteName={siteName} />
    </div>
  );
}
