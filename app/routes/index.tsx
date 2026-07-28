/**
 * Homepage Route — Kirurgisk klinik Brabrand (Cityvest Klinik).
 */
import type { Route } from "./+types/index";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { HeroSection } from "~/components/home/HeroSection";
import { SocialProof } from "~/components/home/SocialProof";
import { ServicesSection } from "~/components/home/ServicesSection";
import { ProcessTimeline } from "~/components/home/ProcessTimeline";
import { ReviewsSlider } from "~/components/ReviewsSlider";
import { FaqTeaser } from "~/components/home/FaqTeaser";
import { CtaBand } from "~/components/home/CtaBand";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";

const SITE_NAME = "Kirurgisk klinik Brabrand";

// ── Loader ───────────────────────────────────────────────────────────────────

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;
  return { siteUrl };
}

// ── Meta ─────────────────────────────────────────────────────────────────────

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData)
    return [{ title: "Kirurgisk klinik Brabrand | Professionel omskæring" }];

  const { siteUrl } = loaderData;
  const description =
    "Professionel omskæring af drengebørn i trygge rammer. Vi er autoriserede speciallæger med mange års erfaring og ligger i City Vest i Brabrand ved Aarhus.";

  return [
    ...buildMeta({
      title: "Kirurgisk klinik Brabrand | Professionel omskæring",
      description,
      url: siteUrl,
      siteName: SITE_NAME,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: siteUrl },
  ];
}

// ── Component ────────────────────────────────────────────────────────────────

export default function Index({ loaderData }: Route.ComponentProps) {
  const { siteUrl } = loaderData;

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={SITE_NAME} lightBg />

      {/* Structured Data */}
      <JsonLd data={buildWebsiteJsonLd(siteUrl)} />

      <main className="flex-1">
        <HeroSection />
        <SocialProof />
        <ServicesSection />
        <ProcessTimeline />
        <ReviewsSlider />
        <FaqTeaser />
        <CtaBand />
      </main>

      <Footer siteName={SITE_NAME} />
    </div>
  );
}
