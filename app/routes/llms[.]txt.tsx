/**
 * llms[.]txt route — served at /llms.txt
 *
 * Markdown primer for AI crawlers / answer engines (ChatGPT, Perplexity,
 * Claude, Gemini, AI Overviews). Follows the llms.txt convention:
 * H1 name, a blockquote summary, then curated links with short descriptions.
 * Keep in sync with app/routes.ts and the sitemap.
 */
import { getSiteUrl } from "~/lib/seo";
import type { Route } from "./+types/llms[.]txt";

export function loader({ request }: Route.LoaderArgs) {
  const siteUrl = getSiteUrl(request);

  const body = `# Kirurgisk klinik Brabrand (Cityvest Klinik)

> Autoriseret lægeklinik der udfører professionel, rituel omskæring af drengebørn i trygge rammer. Klinikken ligger i City Vest, Brabrand ved Aarhus, drives af autoriserede speciallæger og har desuden en afdeling i Taastrup. Klinikken er godkendt af Styrelsen for Patientsikkerhed og er dækket af lovpligtig patientforsikring.

## Om klinikken
- Etableret i 1995, beliggende Gudrunsvej 7, 8220 Brabrand (City Vest), Aarhus.
- Udfører rituel omskæring med både ringmetoden (Circumplast®) og klassisk metode, med fuld lokalbedøvelse.
- Vurdering: 4,9/5 på Google (44 anmeldelser) og 4,8/5 på Trustpilot (47 anmeldelser).
- Kontakt: telefon +45 20 76 35 16, e-mail info@cityvestklinik.dk.

## Vigtige sider
- [Forside](${siteUrl}/): Overblik over klinikken og professionel omskæring af drengebørn.
- [Om omskæring](${siteUrl}/om-omskaering): Hvad omskæring er, og hvordan proceduren foregår.
- [Omskæring med ringmetoden](${siteUrl}/omskaering-med-ringmetoden): Circumplast®-metoden trin for trin.
- [Omskæring ved klassisk metode](${siteUrl}/omskaering-ved-klassisk-metode): Den klassiske kirurgiske metode.
- [Forberedelse inden omskæring](${siteUrl}/forberedelse-foer-indgrebet): Sådan forbereder I jer før og efter indgrebet.
- [Priser](${siteUrl}/priser): Priser for omskæring.
- [Om os](${siteUrl}/om-os): Klinikkens læger, historie og vision.
- [FAQ](${siteUrl}/faq): Ofte stillede spørgsmål og svar om omskæring.
- [Find os](${siteUrl}/find-os): Adresse, kort og rutevejledning.
- [Kontakt](${siteUrl}/kontakt): Kontaktformular og kontaktoplysninger.
- [Book tid](${siteUrl}/booking): Book en tid til omskæring.

## Kontakt
- Telefon: +45 20 76 35 16
- E-mail: info@cityvestklinik.dk
- Adresse: Gudrunsvej 7, 8220 Brabrand, Aarhus, Danmark
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
