/**
 * About clinic: Klinikken, Læge, Vision – structured cards + image.
 * Uses same images as specialklinikdk-site (no placeholder text).
 */
import { motion } from "framer-motion";
import { useState } from "react";

const BLOCKS = [
  {
    id: "klinikken",
    title: "Klinikken",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    text: "Klinikken har kun åbent bestemte dage og henvendelse i klinikken kan ikke ske uden forudgående booking eller aftale. Kirurgisk klinik Brabrand ligger i City Vest i Brabrand ved Aarhus.",
  },
  {
    id: "laege",
    title: "Læge",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    text: "Vi er autoriserede speciallæger med mange års erfaring med omskæring af spæd- og drengebørn. Vi følger Styrelsen for Patientsikkerheds Vejledning om ikke-terapeutisk omskæring af drenge.",
  },
  {
    id: "vision",
    title: "Vision",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    text: "Vores mantra er at yde den mest kvalitetssikre behandling, og at forældre skal føle sig 100% trygge ved at lade deres søn omskære hos os. Vi gør meget ud af at informere forældre mest muligt før, under og efter indgrebet. Derfor oplever vi en høj tilfredshed, et godt rygte og at forældre vælger os igen og anbefaler os til andre.",
  },
];

/** Same image as specialklinikdk-site (child with OK gesture). Copy from that repo into public/images. */
const CHILD_IMAGE = "/images/pexels-daniel-frank-305565%20(2).jpg";

export function AboutClinicSection() {
  const [imageError, setImageError] = useState(false);
  return (
    <section className="section-block bg-surface-dim/50">
      <div className="section-inner">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header text-center mb-10 md:mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Om klinikken
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-secondary" style={{ fontFamily: "var(--font-heading)" }}>
            Kirurgisk Klinik Brabrand
          </h2>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            {BLOCKS.map((block, i) => (
              <motion.article
                key={block.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -30px 0px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card p-5 md:p-6 rounded-xl flex gap-4 md:gap-5"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-primary bg-primary/10">
                  {block.icon}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-secondary mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    {block.title}
                  </h3>
                  <p className="text-text-muted text-sm md:text-base leading-relaxed">
                    {block.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative lg:sticky lg:top-24"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/5] max-h-[420px] bg-primary/5">
              {!imageError ? (
                <img
                  src={CHILD_IMAGE}
                  alt=""
                  className="w-full h-full object-cover object-top"
                  onError={() => setImageError(true)}
                />
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
