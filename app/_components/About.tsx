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
import { MagneticButton } from "./MagneticButton";
import { useIsMobile } from "../_lib/useIsMobile";

const EASE = [0.22, 1, 0.36, 1] as const;

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const skipMotion = reduced || isMobile;

  const { scrollYProgress: sectionProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const portraitY = useTransform(sectionProgress, [0, 1], [30, -30]);

  return (
    <section
      id="betrieb"
      ref={ref}
      className="relative mt-24 overflow-hidden sm:mt-40"
    >
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 sm:gap-16 sm:px-6 md:grid-cols-[1.05fr_1fr] md:gap-20">
        <div className="order-1 md:order-1">
          <div className="flex items-center gap-3">
            <span className="rule-gold" />
            <span className="eyebrow">Über uns</span>
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
            Persönlich. Verlässlich. Meisterhaft.
          </motion.h2>

          <div className="measure-prose mt-8 space-y-5 text-[17px] leading-[1.7] text-anthracite-soft sm:text-[19px]">
            <p className="text-pretty">
              Hinter GDH steht {SITE.inhaber}. Stuckateurmeister, Ansprechpartner
              und Verantwortlicher für jede Baustelle. Wer anruft, spricht mit
              dem, der am Ende auf der Baustelle steht.
            </p>
            <p className="text-pretty">
              Der Betrieb besteht seit {SITE.foundedYear}. {SITE.inhaber} selbst
              ist seit {SITE.masterExperienceSince} im Stuckateur- und
              Malerhandwerk tätig und bringt entsprechende Berufserfahrung in
              jedes Projekt ein.
            </p>
            <p className="text-pretty">
              Für größere Aufträge wird mit einem festen Kreis an Kolleginnen
              und Kollegen gearbeitet, die seit Jahren mit demselben Anspruch
              arbeiten wie wir.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:gap-7 sm:pt-10 md:grid-cols-3">
            <Fact k="Sitz" v={`${SITE.city}, ${SITE.region}`} />
            <Fact k="Gründung" v={`${SITE.foundedYear}`} />
            <Fact k="Erfahrung" v={`seit ${SITE.masterExperienceSince}`} />
            <Fact k="Handwerk" v="Stuckateur · Maler" />
            <Fact k="Kundenstruktur" v="Überwiegend privat" />
            <Fact k="Baustellen" v="Saar · Rheinland-Pfalz" />
          </div>

          <div className="mt-10">
            <MagneticButton
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-anthracite px-6 py-3.5 text-[14px] font-medium tracking-[0.02em] text-cream transition-transform hover:scale-[1.015]"
            >
              Mit {SITE.inhaber.split(" ")[0]} sprechen
              <Arrow />
            </MagneticButton>
          </div>
        </div>

        <div className="order-2 md:order-2">
          <motion.div
            initial={skipMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            whileInView={skipMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: skipMotion ? 0.6 : 1.1, ease: EASE }}
            className="relative aspect-[4/5] w-full sm:aspect-[3/4]"
          >
            <motion.div
              style={skipMotion ? undefined : { y: portraitY }}
              className="absolute inset-0 overflow-hidden rounded-[18px] sm:rounded-[22px]"
            >
              <Image
                src={IMG.aboutPortrait}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-anthracite/55 via-anthracite/0 to-transparent" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-anthracite/10 rounded-[18px] sm:rounded-[22px]" />
            </motion.div>

            {/* floating card */}
            <div className="absolute bottom-5 left-5 right-5 rounded-[14px] border border-anthracite/8 bg-cream/95 px-5 py-4 shadow-[0_18px_48px_-24px_rgba(37,36,33,0.3)] sm:bottom-7 sm:left-7 sm:right-7 sm:px-6 sm:py-5">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-anthracite-mute">
                    Inhaber
                  </div>
                  <div className="font-display mt-1 truncate text-xl text-anthracite sm:text-2xl" style={{ fontWeight: 400 }}>
                    {SITE.inhaber}
                  </div>
                </div>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-anthracite px-4 py-2 text-[11px] font-medium text-cream transition-colors hover:bg-anthracite-soft"
                >
                  Direkt sprechen
                </a>
              </div>
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
      <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-anthracite-mute">
        {k}
      </div>
      <div className="mt-2 text-[15px] text-anthracite">{v}</div>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
