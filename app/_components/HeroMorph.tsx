"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { IMG, SITE } from "../_lib/site";
import { MagneticButton } from "./MagneticButton";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { useIsMobile } from "../_lib/useIsMobile";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroMorph() {
  const isMobile = useIsMobile();
  if (isMobile) return <HeroMobile />;
  return <HeroDesktop />;
}

function HeroMobile() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      aria-label="Startansicht"
      className="relative isolate overflow-hidden text-cream"
      style={{ minHeight: "100dvh" }}
    >
      {/* fullscreen background */}
      <motion.div
        style={reduced ? undefined : { y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src={IMG.hero}
          alt="Handwerkliche Oberfläche aus dem Stuckateurmeisterbetrieb GDH"
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <ImagePlaceholder />

      <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-b from-anthracite/50 via-anthracite/40 to-anthracite" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-40 bg-gradient-to-b from-anthracite/70 to-transparent" />

      <motion.div
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
        className="relative z-40 flex flex-col justify-end px-6 pb-10 pt-32 will-change-transform"
        // ensure the inner column fills the viewport
        // so the text sits at the bottom while visible
        // (grid would also work)
      >
        <div className="min-h-[calc(100dvh-10rem)] flex flex-col justify-end">
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.32em] text-cream/85"
          >
            <span className="rule-gold !bg-champagne-soft" />
            <span>GDH · Stuckateurmeisterbetrieb</span>
          </motion.div>

          <motion.h1
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
            className="font-display mt-6 text-cream drop-shadow-[0_6px_30px_rgba(0,0,0,0.5)]"
            style={{
              fontSize: "clamp(2.6rem, 13vw, 4rem)",
              lineHeight: 1.04,
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
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            className="mt-6 max-w-md text-pretty text-[16px] leading-[1.6] text-cream/90"
          >
            Handwerkliche Präzision, saubere Ausführung und fachkundige Beratung
            für Ihr Zuhause.
          </motion.p>

          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            className="mt-8 flex flex-col gap-3"
          >
            <a
              href="#leistungen"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cream px-6 py-4 text-[14px] font-medium tracking-[0.02em] text-anthracite"
            >
              Leistungen entdecken
              <Arrow />
            </a>
            <a
              href="#kontakt"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/30 bg-transparent px-6 py-4 text-[14px] font-medium tracking-[0.02em] text-cream"
            >
              Projekt anfragen
              <Arrow />
            </a>
          </motion.div>

          {/* pillar footer */}
          <motion.ul
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            className="mt-10 grid grid-cols-3 gap-3 border-t border-cream/15 pt-5"
          >
            {SITE.pillars.map((p) => (
              <li key={p} className="flex flex-col items-start gap-1">
                <span className="h-[2px] w-5 bg-champagne" />
                <span className="font-display text-[15px] text-cream" style={{ fontWeight: 400 }}>
                  {p}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </section>
  );
}

function HeroDesktop() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-cream"
      aria-label="Startansicht"
    >
      {/* dezenter Wärme-Wash */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_80%_10%,rgba(180,154,114,0.14),transparent_60%),radial-gradient(60%_50%_at_10%_110%,rgba(217,205,189,0.4),transparent_60%)]" />

      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl grid-cols-[1.05fr_1fr] items-center gap-16 px-8 pb-24 pt-36">
        {/* LEFT: editorial copy */}
        <motion.div
          style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
          className="relative flex max-w-[640px] flex-col will-change-transform"
        >
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
            className="mt-8 max-w-xl text-pretty text-[19px] leading-[1.65] text-anthracite-soft"
          >
            Handwerkliche Präzision, saubere Ausführung und fachkundige Beratung
            für Ihr Zuhause.
          </motion.p>

          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            className="mt-10 flex flex-row items-center gap-4"
          >
            <MagneticButton
              href="#leistungen"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-anthracite px-7 py-3.5 text-[14px] font-medium tracking-[0.02em] text-cream transition-transform hover:scale-[1.015]"
            >
              Leistungen entdecken
              <Arrow />
            </MagneticButton>
            <MagneticButton
              href="#kontakt"
              strength={0.2}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-anthracite/15 bg-transparent px-7 py-3.5 text-[14px] font-medium tracking-[0.02em] text-anthracite transition-colors hover:bg-anthracite/5"
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
        </motion.div>

        {/* RIGHT: editorial image */}
        <div className="relative">
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.98 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
            className="relative aspect-[3/4] w-full overflow-hidden rounded-[22px] shadow-[0_30px_80px_-40px_rgba(37,36,33,0.4)]"
          >
            <motion.div
              style={reduced ? undefined : { y: imgY, scale: imgScale }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={IMG.hero}
                alt="Handwerkliche Oberfläche aus dem Stuckateurmeisterbetrieb GDH"
                fill
                priority
                quality={92}
                sizes="48vw"
                className="object-cover object-center"
              />
            </motion.div>
            <ImagePlaceholder />
            <div className="pointer-events-none absolute inset-0 z-30 ring-1 ring-inset ring-anthracite/10" />

            {/* zarte Bildunterschrift */}
            <div className="absolute bottom-7 left-7 right-7 z-30 flex items-end justify-between gap-4 text-cream">
              <div>
                <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-cream/80">
                  Handwerk
                </div>
                <div className="mt-1 font-display text-2xl">
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
            className="pointer-events-none absolute -bottom-8 -left-8 flex items-center gap-3 rounded-full border border-anthracite/10 bg-cream/90 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.26em] text-anthracite shadow-[0_12px_40px_-18px_rgba(37,36,33,0.35)]"
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
