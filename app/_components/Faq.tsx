"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SplitWords } from "./SplitWords";

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
      className="relative mx-auto mt-24 max-w-6xl px-5 sm:mt-40 sm:px-6"
      aria-label="Häufige Fragen"
    >
      <div className="grid gap-10 sm:gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <div className="md:sticky md:top-32 md:self-start">
          <div className="text-[10px] uppercase tracking-[0.24em] text-ink-mute sm:text-[11px] sm:tracking-[0.26em]">
            Antworten
          </div>
          <h2 className="mt-4 font-display leading-[0.92] tracking-[-0.03em] text-ink md:text-[80px] md:leading-[0.9]"
            style={{ fontSize: "clamp(2.4rem, 9vw, 5rem)" }}>
            <SplitWords text="Alles," />
            <br />
            <SplitWords
              text="was oft gefragt wird."
              stagger={0.05}
              decorate={(w, i) =>
                i === 2 ? <span className="italic text-clay">{w}</span> : w
              }
            />
          </h2>
          <p className="mt-5 max-w-sm text-pretty text-ink-soft sm:mt-6">
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
                  className="group flex w-full items-center justify-between gap-4 py-5 text-left sm:gap-6 sm:py-6 md:py-8"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-xl leading-tight tracking-tight text-ink sm:text-2xl md:text-3xl">
                    {it.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-ink/15 bg-surface/50 text-ink group-hover:bg-ink group-hover:text-surface sm:h-10 sm:w-10"
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
                      <p className="pb-6 pr-4 text-pretty text-sm text-ink-soft sm:pb-8 sm:pr-6 sm:text-base">
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
