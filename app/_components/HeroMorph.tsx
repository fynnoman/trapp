"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { IMG, SITE } from "../_lib/site";
import { MagneticButton } from "./MagneticButton";
import { ImagePlaceholder } from "./ImagePlaceholder";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroMorph() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative isolate overflow-hidden bg-cream"
      aria-label="Startansicht"
    >
      {/* dezenter Wärme-Wash */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_80%_10%,rgba(180,154,114,0.14),transparent_60%),radial-gradient(60%_50%_at_10%_110%,rgba(217,205,189,0.4),transparent_60%)]" />

      <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl flex-col px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:grid lg:min-h-[92vh] lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:pt-36 lg:pb-24">
        {/* LEFT: editorial copy */}
        <div className="relative flex max-w-[640px] flex-col">
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-anthracite-mute"
          >
            <span className="rule-gold" />
            <span>GDH · Stuckateurmeisterbetrieb</span>
          </motion.div>

          <motion.h1
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
            className="font-display mt-8 text-anthracite"
            style={{
              fontSize: "clamp(2.4rem, 7.8vw, 4.6rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.015em",
              fontWeight: 400,
            }}
          >
            Qualität,
            <br />
            die bleibt.
          </motion.h1>

          <motion.p
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.35 }}
            className="mt-8 max-w-xl text-pretty text-[17px] leading-[1.65] text-anthracite-soft sm:text-[19px]"
          >
            Handwerkliche Präzision, saubere Ausführung und fachkundige Beratung
            für Ihr Zuhause.
          </motion.p>

          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <MagneticButton
              href="#leistungen"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-anthracite px-6 py-3.5 text-[14px] font-medium tracking-[0.02em] text-cream transition-transform hover:scale-[1.015] sm:px-7"
            >
              Leistungen entdecken
              <Arrow />
            </MagneticButton>
            <MagneticButton
              href="#kontakt"
              strength={0.2}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-anthracite/15 bg-transparent px-6 py-3.5 text-[14px] font-medium tracking-[0.02em] text-anthracite transition-colors hover:bg-anthracite/5 sm:px-7"
            >
              Projekt anfragen
              <Arrow />
            </MagneticButton>
          </motion.div>

          {/* dezente Fußnote: Wertetrio */}
          <motion.ul
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
            className="mt-14 grid grid-cols-3 gap-6 border-t border-line pt-7"
          >
            {SITE.pillars.map((p) => (
              <li key={p} className="flex flex-col gap-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-anthracite-mute">
                  Anspruch
                </span>
                <span className="font-display text-xl text-anthracite">{p}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* RIGHT: editorial image */}
        <div className="relative mt-14 lg:mt-0">
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.98 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px] shadow-[0_30px_80px_-40px_rgba(37,36,33,0.4)] sm:rounded-[22px] lg:aspect-[3/4]"
          >
            <Image
              src={IMG.hero}
              alt="Handwerkliche Oberfläche aus dem Stuckateurmeisterbetrieb GDH"
              fill
              priority
              quality={92}
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover object-center"
            />
            <ImagePlaceholder />
            <div className="pointer-events-none absolute inset-0 z-30 ring-1 ring-inset ring-anthracite/10" />

            {/* zarte Bildunterschrift */}
            <div className="absolute bottom-5 left-5 right-5 z-30 flex items-end justify-between gap-4 text-cream sm:bottom-7 sm:left-7 sm:right-7">
              <div>
                <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-cream/80">
                  Handwerk
                </div>
                <div className="mt-1 font-display text-xl sm:text-2xl">
                  Stuckateurmeister
                </div>
              </div>
              <span className="rule-gold !w-10" />
            </div>
          </motion.div>

          {/* floating detail accent */}
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.5 }}
            className="pointer-events-none absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-full border border-anthracite/10 bg-cream/90 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.26em] text-anthracite shadow-[0_12px_40px_-18px_rgba(37,36,33,0.35)] sm:-bottom-8 sm:-left-8 lg:flex"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
            Meisterbetrieb · Bous
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
