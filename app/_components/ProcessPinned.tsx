"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { IMG } from "../_lib/site";
import { ImagePlaceholder } from "./ImagePlaceholder";

const EASE = [0.22, 1, 0.36, 1] as const;

const stages = [
  {
    key: "vorlauf",
    kicker: "Aufmaß · Beratung",
    title: "Vorlauf.",
    body:
      "Vor Ort messen, Untergrund prüfen, Mengen rechnen. Wer sauber beginnt, verliert weniger Zeit auf der Baustelle und braucht später nichts nachzubessern.",
    image: IMG.processVorlauf,
  },
  {
    key: "ausfuehrung",
    kicker: "Baustelle · Handwerk",
    title: "Ausführung.",
    body:
      "Material und Werkzeug vorbereitet, Flächen abgedeckt, Nachbarn informiert. Jedes Gewerk mit dem Rhythmus, den es verlangt. Keine Hektik, kein Pfusch.",
    image: IMG.processAusfuehrung,
  },
  {
    key: "uebergabe",
    kicker: "Qualität · Nachsorge",
    title: "Übergabe.",
    body:
      "Besenrein, Dokumentation vollständig, Restmaterial beschriftet. Pflegehinweise mündlich und schriftlich. Erreichbar auch nach dem letzten Rechnungstag.",
    image: IMG.processUebergabe,
  },
];

export function ProcessPinned() {
  const reduced = useReducedMotion();

  return (
    <section
      id="handwerk"
      aria-label="Vom Aufmaß zur Übergabe"
      className="relative mx-auto mt-24 max-w-6xl px-5 sm:mt-32 sm:px-6"
    >
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="rule-gold" />
            <span className="eyebrow">Unsere Philosophie</span>
          </div>
          <motion.h2
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-display mt-6 text-anthracite"
            style={{
              fontSize: "clamp(2rem, 5.4vw, 3.4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.012em",
              fontWeight: 400,
            }}
          >
            Sorgfalt, die man sieht. Qualität, die man spürt.
          </motion.h2>
        </div>
        <p className="max-w-md text-pretty text-[17px] leading-[1.7] text-anthracite-soft md:max-w-sm">
          Gutes Handwerk zeigt sich in Übergängen, sauber bearbeiteten
          Oberflächen und Ergebnissen, die bis ins Kleinste durchdacht sind.
        </p>
      </div>

      <ul className="mt-14 flex flex-col gap-6 sm:mt-16 sm:gap-8">
        {stages.map((s, i) => (
          <motion.li
            key={s.key}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className={`grid gap-6 md:grid-cols-2 md:gap-10 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-anthracite sm:rounded-[22px]">
              <Image
                src={s.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading={i === 0 ? "eager" : "lazy"}
                className="object-cover object-center"
              />
              <ImagePlaceholder />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <span className="rule-gold" />
                <span className="eyebrow">{s.kicker}</span>
              </div>
              <h3 className="font-display mt-5 text-anthracite" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.15, letterSpacing: "-0.01em", fontWeight: 400 }}>
                {s.title}
              </h3>
              <p className="measure-prose mt-5 text-pretty text-[17px] leading-[1.7] text-anthracite-soft">
                {s.body}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
