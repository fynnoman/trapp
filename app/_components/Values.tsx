"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const values = [
  {
    num: "01",
    title: "Qualität",
    body: "Fachgerechte Ausführung, saubere Arbeit und Sorgfalt bis ins Detail.",
  },
  {
    num: "02",
    title: "Vertrauen",
    body: "Persönliche Beratung, zuverlässige Zusammenarbeit und ein offener Austausch während des gesamten Projekts.",
  },
  {
    num: "03",
    title: "Beständigkeit",
    body: "Wertige Ergebnisse, die heute überzeugen und langfristig bestehen.",
  },
];

export function Values() {
  const reduced = useReducedMotion();

  return (
    <section
      id="werte"
      aria-label="Markenwerte"
      className="relative mx-auto mt-24 max-w-6xl px-5 sm:mt-32 sm:px-6"
    >
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="rule-gold" />
            <span className="eyebrow">Unsere Werte</span>
          </div>
          <motion.h2
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-display mt-6 text-anthracite"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.012em",
              fontWeight: 400,
            }}
          >
            Worauf Sie sich verlassen können.
          </motion.h2>
        </div>
        <p className="max-w-sm text-pretty text-[17px] leading-[1.7] text-anthracite-soft">
          Drei Grundsätze, nach denen jedes Projekt geplant und jede Baustelle
          übergeben wird.
        </p>
      </div>

      <ul className="mt-14 grid gap-10 border-t border-line pt-10 sm:gap-14 md:grid-cols-3 md:gap-16">
        {values.map((v, i) => (
          <motion.li
            key={v.num}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
            className="relative"
          >
            <div className="font-display text-anthracite-mute/40" style={{ fontSize: "clamp(3.4rem, 7vw, 4.6rem)", lineHeight: 1 }}>
              {v.num}
            </div>
            <h3 className="font-display mt-6 text-anthracite" style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.9rem)", lineHeight: 1.2, letterSpacing: "-0.008em" }}>
              {v.title}
            </h3>
            <div className="mt-5 h-px w-10 bg-champagne" />
            <p className="mt-5 text-pretty text-[17px] leading-[1.7] text-anthracite-soft">
              {v.body}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
