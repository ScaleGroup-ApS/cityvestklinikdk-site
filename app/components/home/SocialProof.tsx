// app/components/home/SocialProof.tsx
import { motion } from "framer-motion";

const HIGHLIGHTS = [
  {
    title: "Under proceduren",
    text:
      "Forældre kan være til stede under deres babys omskæring eller vente i et andet behageligt rum.",
  },
  {
    title: "Tillid & sikkerhed",
    text:
      "Vores læger og sygeplejersker arbejder med stor erfaring og faglig ekspertise, så barnet er i trygge hænder.",
  },
  {
    title: "Teknisk ekspertise",
    text:
      "Vi har omfattende erfaring med variationer af forhud og penis samt et særligt fokus på nyfødte og spædbørn.",
  },
  {
    title: "Smertelindring",
    text:
      "Vi tager smertelindring alvorligt og tilbyder forskellige muligheder for at minimere smerter og ubehag.",
  },
];

export function SocialProof() {
  return (
    <section className="section-block" style={{ background: "var(--color-surface-dim)" }}>
      <div className="section-inner">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Kirurgisk klinik Brabrand
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-secondary" style={{ fontFamily: "var(--font-heading)" }}>
            Tryghed, erfaring og faglighed
          </h2>
        </motion.header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {HIGHLIGHTS.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass-card card-hover p-5 md:p-6 rounded-xl"
            >
              <h3 className="font-heading text-lg font-semibold text-secondary mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {item.title}
              </h3>
              <p className="text-text-muted text-sm md:text-base leading-relaxed">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
