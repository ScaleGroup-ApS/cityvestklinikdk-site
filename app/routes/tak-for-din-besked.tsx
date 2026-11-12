import type { Route } from "./+types/tak-for-din-besked";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { JsonLd } from "~/components/JsonLd";
import { SubpageHero } from "~/components/shared/SubpageHero";
import { ContentSection } from "~/components/shared/ContentSection";
import { AnimatedWords } from "~/components/motion/AnimatedWords";
import { HandDrawnUnderline } from "~/components/motion/HandDrawnUnderline";
import { buildMeta, buildWebsiteJsonLd, getSiteUrl } from "~/lib/seo";

const EASE = [0.22, 1, 0.36, 1] as const;

export async function loader({ request }: Route.LoaderArgs) {
  const siteUrl = getSiteUrl(request);
  return { siteUrl };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [{ title: "Tak for din besked | Kirurgisk klinik Brabrand" }];
  const { siteUrl } = loaderData;
  const siteName = "Kirurgisk klinik Brabrand";
  return [
    ...buildMeta({
      title: `Tak for din besked | ${siteName}`,
      description:
        "Tak fordi du har skrevet til Kirurgisk klinik Brabrand. Vi har modtaget din besked og vender tilbage til dig hurtigst muligt.",
      url: `${siteUrl}/tak-for-din-besked`,
      siteName,
      siteUrl,
      type: "website",
      locale: "da_DK",
      noindex: true,
    }),
    { tagName: "link", rel: "canonical", href: `${siteUrl}/tak-for-din-besked` },
  ];
}

export default function TakForDinBesked({ loaderData }: Route.ComponentProps) {
  const { siteUrl } = loaderData;
  const siteName = "Kirurgisk klinik Brabrand";

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteName={siteName} lightBg />
      <JsonLd data={buildWebsiteJsonLd(siteUrl)} />

      <main className="flex-1">
        <SubpageHero
          eyebrow="Kontakt · Bekræftelse"
          headline={
            <>
              <AnimatedWords
                as="span"
                text="Tak for din"
                className="block"
                delay={0.1}
              />
              <span className="relative inline-block">
                <AnimatedWords
                  as="span"
                  text="besked."
                  className="font-display italic font-light"
                  delay={0.25}
                />
                <HandDrawnUnderline
                  className="absolute left-0 right-0 -bottom-1 w-full h-3"
                  delay={1.0}
                />
              </span>
            </>
          }
          body="Vi har modtaget din besked og vender tilbage til dig hurtigst muligt — typisk inden for 24 timer på hverdage. Du er altid velkommen til at kontakte os direkte, hvis du har et akut spørgsmål."
        />

        <ContentSection bg="white" narrow>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
          >
            Mens du venter på svar, finder du måske allerede svaret blandt vores{" "}
            <Link
              to="/faq"
              className="animated-link text-[color:var(--color-ink)] font-medium"
            >
              ofte stillede spørgsmål
            </Link>{" "}
            eller i afsnittet{" "}
            <Link
              to="/forberedelse-foer-indgrebet"
              className="animated-link text-[color:var(--color-ink)] font-medium"
            >
              Forberedelse før omskæring
            </Link>
            .
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="mt-6 text-[17px] leading-[1.8] text-[color:var(--color-text-muted)]"
          >
            Har du brug for at nå os med det samme, kan du kontakte os her:
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.18 }}
            className="mt-6 space-y-3 text-[17px] text-[color:var(--color-ink)]"
          >
            <li className="flex items-center gap-3">
              <span aria-hidden>✉️</span>
              <a
                href="mailto:info@cityvestklinik.dk"
                className="animated-link font-medium"
              >
                info@cityvestklinik.dk
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span aria-hidden>📞</span>
              <a href="tel:+4520763516" className="animated-link font-medium">
                20 76 35 16
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span aria-hidden>📍</span>
              <span>Gudrunsvej 7, 8220 Brabrand</span>
            </li>
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.26 }}
            className="mt-10"
          >
            <Link
              to="/"
              className="animated-link text-[color:var(--color-ink)] font-medium text-[15px]"
            >
              ← Tilbage til forsiden
            </Link>
          </motion.div>
        </ContentSection>
      </main>

      <Footer siteName={siteName} />
    </div>
  );
}
