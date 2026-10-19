"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { IMG, SITE } from "../_lib/site";
import { SplitWords } from "./SplitWords";
import { MagneticButton } from "./MagneticButton";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress: sectionProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // light parallax, transforms only
  const stripY = useTransform(sectionProgress, [0, 1], [-40, 40]);
  const portraitY = useTransform(sectionProgress, [0, 1], [40, -40]);

  return (
    <section
      id="betrieb"
      ref={ref}
      className="relative mt-24 overflow-hidden sm:mt-40 [content-visibility:auto] [contain-intrinsic-size:100vh]"
    >
      {/* ambient drift text in bg */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-16 overflow-hidden whitespace-nowrap text-center font-display leading-none tracking-[-0.04em] text-ink/[0.05] will-change-transform sm:top-24 md:text-[220px]"
        style={{
          ...(reduced ? {} : { y: stripY }),
          fontSize: "clamp(5rem, 18vw, 13.75rem)",
        }}
      >
        BOUS · SAARLAND · 66359
      </motion.div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 sm:gap-14 sm:px-6 md:grid-cols-[1.05fr_1fr] md:gap-20">
        <div className="order-1 md:order-1">
          <div className="text-[10px] uppercase tracking-[0.24em] text-ink-mute sm:text-[11px] sm:tracking-[0.26em]">
            Betrieb
          </div>

          <h2 className="mt-4 font-display leading-[0.92] tracking-[-0.03em] text-ink md:text-[88px] md:leading-[0.9]"
            style={{ fontSize: "clamp(2.4rem, 10vw, 5.5rem)" }}>
            <SplitWords text="Ein Meister," />
            <br />
            <SplitWords text="ein eingespieltes Team." stagger={0.05} />
          </h2>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-ink-soft sm:mt-10 sm:space-y-5 sm:text-lg">
            <p className="text-pretty">
              GdH wird persönlich geführt von {SITE.inhaber}. Keine
              Zwischenschicht, keine wechselnden Ansprechpartner. Wer anruft,
              spricht mit dem, der am Ende auf der Baustelle steht.
            </p>
            <p className="text-pretty">
              Für größere Aufträge wird mit einem festen Kreis an Kolleginnen
              und Kollegen gearbeitet, die seit Jahren mit demselben Anspruch
              arbeiten wie wir.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-5 border-t border-line pt-8 sm:mt-12 sm:gap-6 sm:pt-10 md:grid-cols-3">
            <Fact k="Sitz" v={`${SITE.city}, Saarland`} />
            <Fact k="Form" v="Einzelunternehmen" />
            <Fact k="Handwerk" v="Stuckateur · Maler" />
            <Fact k="Kundenstruktur" v="Überwiegend privat" />
            <Fact k="Vergabe" v="Nach Empfehlung" />
            <Fact k="Baustellen" v="Saar · Rheinland-Pfalz" />
          </div>

          <div className="mt-8 sm:mt-10">
            <MagneticButton
              href="#kontakt"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm text-surface sm:w-auto"
            >
              Mit {SITE.inhaber.split(" ")[0]} sprechen
              <Arrow />
            </MagneticButton>
          </div>
        </div>

        {/* portrait panel */}
        <div className="order-2 md:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] w-full will-change-transform sm:aspect-[3/4]"
          >
            <motion.div
              style={reduced ? undefined : { y: portraitY }}
              className="absolute inset-0 overflow-hidden rounded-[28px] will-change-transform sm:rounded-[36px]"
            >
              <Image
                src={IMG.aboutPortrait}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-clay/20" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/40 rounded-[28px] sm:rounded-[36px]" />
            </motion.div>

            {/* floating card */}
            <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-4 sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-ink-mute sm:tracking-[0.26em]">
                    Inhaber
                  </div>
                  <div className="mt-1 truncate font-display text-lg text-ink sm:text-xl">
                    {SITE.inhaber}
                  </div>
                </div>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-[11px] text-surface hover:bg-clay sm:px-4 sm:text-xs"
                >
                  Direkt sprechen
                </a>
              </div>
            </div>

            {/* side meta label */}
            <div className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 rotate-90 whitespace-nowrap text-[10px] uppercase tracking-[0.4em] text-ink-mute md:block">
              Stuckateurmeister · Bous
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.26em] text-ink-mute/80">
        {k}
      </div>
      <div className="mt-1.5 text-sm text-ink">{v}</div>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
