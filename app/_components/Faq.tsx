"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const items = [
  {
    q: "Wie läuft eine Anfrage ab?",
    a: "Beschreiben Sie Ihr Vorhaben kurz am Telefon oder per Mail. Bei passenden Projekten folgt ein Termin vor Ort mit Aufmaß und Beratung. Ein Angebot kommt schriftlich, ohne Formular-Umwege.",
  },
  {
    q: "Arbeiten Sie auch an bewohnten Baustellen?",
    a: "Ja. Flächen werden abgedeckt, Staub möglichst gering gehalten, Reihenfolgen so geplant, dass Räume nutzbar bleiben. Nach Feierabend ist die Baustelle besenrein.",
  },
  {
    q: "Welche Region bedienen Sie?",
    a: "Haupteinzugsgebiet ist der Großraum Saarland mit Übergang nach Rheinland-Pfalz. Für größere Projekte oder bekannte Auftraggeber auch darüber hinaus.",
  },
  {
    q: "Übernehmen Sie Teilgewerke oder nur Komplettaufträge?",
    a: "Beides. Einzelne Decken, eine Wand, ein kompletter Innenausbau. Entscheidend ist, dass Zeitplan und Schnittstellen zu anderen Gewerken sauber geklärt sind.",
  },
  {
    q: "Wie laufen Reklamationen oder Nachbesserungen?",
    a: "Direkt und ohne Umweg. Sie rufen die Nummer an, mit der Sie auch die Baustelle beauftragt haben. Nachbesserungen innerhalb der Gewährleistung sind selbstverständlich.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative mx-auto mt-20 max-w-6xl px-5 sm:mt-40 sm:px-6"
      aria-label="Häufige Fragen"
    >
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <div className="md:sticky md:top-32 md:self-start">
          <div className="flex items-center gap-3">
            <span className="rule-gold" />
            <span className="eyebrow">Antworten</span>
          </div>
          <h2 className="font-display mt-6 text-anthracite" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.1, letterSpacing: "-0.012em", fontWeight: 400 }}>
            Was oft gefragt wird.
          </h2>
          <p className="mt-6 max-w-sm text-pretty text-[17px] leading-[1.7] text-anthracite-soft">
            Fehlt etwas? Rufen Sie an. Die wichtigsten Antworten geben wir
            lieber persönlich.
          </p>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between gap-4 py-6 text-left sm:gap-6 sm:py-7 md:py-8"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-anthracite" style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.65rem)", lineHeight: 1.2, letterSpacing: "-0.008em", fontWeight: 400 }}>
                    {it.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-anthracite/15 bg-cream text-anthracite transition-colors group-hover:bg-anthracite group-hover:text-cream group-active:bg-anthracite group-active:text-cream"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-4 text-pretty text-[15px] leading-[1.7] text-anthracite-soft sm:pb-8 sm:pr-6 sm:text-[17px]">
                        {it.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
