/**
 * /find-os — Location / "Find os" page.
 * Address, map, parking and transport for Kirurgisk klinik Brabrand (City Vest).
 */
import type { Route } from "./+types/find-os";
import { motion } from "framer-motion";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";
import { SubpageHero } from "~/components/shared/SubpageHero";
import { ContentSection } from "~/components/shared/ContentSection";
import { ReviewsSlider } from "~/components/ReviewsSlider";
import { CtaBand } from "~/components/home/CtaBand";
import { buildMeta, buildWebsiteJsonLd } from "~/lib/seo";

const EASE = [0.22, 1, 0.36, 1] as const;
const SITE_NAME = "Kirurgisk klinik Brabrand";

const FACTS: Array<{ label: string; value: string }> = [
  { label: "Adresse", value: "Gudrunsvej 7, 8220 Brabrand" },
  { label: "Område", value: "City Vest · Brabrand ved Aarhus" },
  { label: "Telefon", value: "20 76 35 16" },
  { label: "E-mail", value: "info@cityvestklinik.dk" },
  { label: "Åbningstid", value: "Kun efter aftale — book online" },
];

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = new URL(request.url).origin;
  return { siteUrl };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [{ title: "Find os | Kirurgisk klinik Brabrand" }];
  const { siteUrl } = loaderData;
  return [
    ...buildMeta({
      title: "Find os | Kirurgisk klinik Brabrand",
      description:
        "Find vej til Kirurgisk klinik Brabrand på Gudrunsvej 7 i City Vest, Brabrand ved Aarhus. Se kort, parkering og transportmuligheder.",
      url: `${siteUrl}/find-os`,
      siteName: SITE_NAME,
      siteUrl,
      type: "website",
      locale: "da_DK",
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/find-os` },
  ];
}

export default function FindOs({ loaderData }: Route.ComponentProps) {
  const { siteUrl } = loaderData;

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={SITE_NAME} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteUrl)} />

      <main className="flex-1">
        <SubpageHero
          eyebrow="Find os · City Vest, Brabrand"
          headline={
            <>
              <AnimatedWords as="span" text="Sådan finder" className="block" delay={0.1} />
              <span className="relative inline-block">
                <AnimatedWords
                  as="span"
                  text="I os."
                  className="font-display italic font-light"
                  delay={0.3}
                />
                <HandDrawnUnderline
                  className="absolute left-0 right-0 -bottom-1 w-full h-3"
                  delay={1.1}
                />
              </span>
            </>
          }
          body="Klinikken ligger i City Vest i Brabrand ved Aarhus. Her finder I adresse, kort og praktisk information, så jeres besøg bliver så let som muligt."
        />

        <ContentSection bg="ivory">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Facts */}
            <div className="lg:col-span-4">
              <dl className="space-y-6">
                {FACTS.map((f, i) => (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
                    className="border-b border-[color:var(--color-border)] pb-5"
                  >
                    <dt className="eyebrow mb-2">{f.label}</dt>
                    <dd className="text-[17px] text-[color:var(--color-ink)]">
                      {f.label === "Telefon" ? (
                        <a href="tel:+4520763516" className="animated-link">
                          {f.value}
                        </a>
                      ) : f.label === "E-mail" ? (
                        <a href="mailto:info@cityvestklinik.dk" className="animated-link">
                          {f.value}
                        </a>
                      ) : (
                        f.value
                      )}
                    </dd>
                  </motion.div>
                ))}
              </dl>
              <p className="mt-8 text-[15px] leading-[1.8] text-[color:var(--color-text-muted)]">
                Der er gode parkeringsmuligheder ved City Vest. Kommer I med
                offentlig transport, er der bus- og letbaneforbindelser til
                Brabrand og City Vest.
              </p>
            </div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="lg:col-span-8"
            >
              <div className="card-elevated overflow-hidden">
                <iframe
                  title="Kort over Kirurgisk klinik Brabrand"
                  src="https://maps.google.com/maps?q=Gudrunsvej%207%2C%208220%20Brabrand&z=15&output=embed"
                  width="100%"
                  height="460"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </ContentSection>

        <ReviewsSlider />
        <CtaBand />
      </main>

      <Footer siteName={SITE_NAME} />
    </div>
  );
}
