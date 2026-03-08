// app/components/home/ServicesSection.tsx
import { motion } from "framer-motion";
import { Link } from "react-router";

const SERVICES = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Om omskæring",
    description:
      "Læs om proceduren, sikkerheden og vores tilgang til rituel omskæring af drengebørn.",
    href: "/omskaering",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Forberedelse før indgrebet",
    description:
      "En praktisk guide til, hvad I skal være opmærksomme på inden jeres aftale i klinikken.",
    href: "/forberedelse-inden-omskaering",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Klassisk metode",
    description:
      "Vi anvender som udgangspunkt klassisk metode til børn over et år.",
    href: "/omskaering-med-klassisk-metode",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Ringmetoden",
    description:
      "Vi anvender ofte ringmetoden til børn under et år og rådgiver om det rette valg.",
    href: "/omskaering-med-ringmetoden",
  },
];

export function ServicesSection() {
  return (
    <section className="section-block relative overflow-hidden">
      {/* Subtle gradient background (primary tint) */}
      <div className="absolute inset-0 bg-surface" aria-hidden />
      <div
        className="absolute top-[10%] left-[5%] w-72 md:w-96 h-72 md:h-96 rounded-full animate-blob opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(105,125,168,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-[10%] right-[5%] w-64 md:w-80 h-64 md:h-80 rounded-full animate-blob-2 opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(105,125,168,0.1) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="section-inner relative">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header max-w-2xl mb-10 md:mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Operationsteknik
          </p>
          <h2 className="font-heading text-2xl md:text-4xl font-medium text-secondary leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
            Metoder med fokus på{" "}
            <span className="gradient-text">tryghed og kvalitet</span>
          </h2>
        </motion.header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -30px 0px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link to={service.href} className="block h-full group">
                <div className="glass-card card-hover p-5 md:p-6 h-full rounded-xl transition-shadow duration-300 group-hover:shadow-[0_12px_40px_rgba(105,125,168,0.15)]">
                  <div className="text-primary mb-4">{service.icon}</div>
                  <h3 className="font-heading text-lg md:text-xl font-semibold text-secondary mb-2 leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                    {service.title}
                  </h3>
                  <p className="text-text-muted text-sm md:text-base leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold">
                    Læs mere
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
