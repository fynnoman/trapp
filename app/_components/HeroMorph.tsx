"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { IMG, SITE } from "../_lib/site";
import { SplitWords } from "./SplitWords";
import { MagneticButton } from "./MagneticButton";
import { useIsMobile } from "../_lib/useIsMobile";

export function HeroMorph() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <HeroMobile />;
  }

  return <HeroDesktop />;
}

function HeroMobile() {
  return (
    <>
      <section
        className="relative h-[100dvh] w-full overflow-hidden [contain:paint]"
        aria-label="Startansicht"
      >
        <Image
          src={IMG.hero}
          alt=""
          fill
          priority
          quality={82}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/20 to-ink/80" />

        <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-10 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-surface/85"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            <span className="truncate">Stuckateurmeister · {SITE.city} · Saarland</span>
          </motion.div>

          <h1 className="mt-5 font-display leading-[0.92] tracking-[-0.03em] text-surface"
            style={{ fontSize: "clamp(2.75rem, 13vw, 4.5rem)" }}>
            <SplitWords
              text="Oberflächen,"
              trigger="mount"
              delay={0.1}
              stagger={0.03}
              as="span"
              className="block"
            />
            <span className="relative inline-block">
              <SplitWords
                text="die bleiben."
                trigger="mount"
                delay={0.3}
                stagger={0.03}
                as="span"
                decorate={(w, i) =>
                  i === 1 ? <span className="italic text-ochre">{w}</span> : w
                }
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="mt-5 max-w-md text-pretty text-base leading-relaxed text-surface/90 drop-shadow-[0_1px_8px_rgba(22,19,15,0.5)]"
          >
            Putz, Trockenbau und Spanndecken aus einer Hand. Ein kleiner,
            eingespielter Meisterbetrieb aus Bous, der Baustellen so übergibt,
            wie Sie sie übernehmen würden.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              href="#kontakt"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm text-surface"
            >
              Projekt besprechen
              <Arrow />
            </MagneticButton>
            <MagneticButton
              href="#leistungen"
              strength={0.2}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-surface/25 bg-surface/10 px-5 py-3.5 text-sm text-surface backdrop-blur-sm"
            >
              Leistungen
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-surface" aria-label="Was wir glauben">
        <Image
          src={IMG.hero}
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-center opacity-45"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink/90" />
        <div className="relative px-5 py-20">
          <div className="text-[10px] uppercase tracking-[0.28em] text-surface/80">
            Was wir glauben
          </div>
          <h2 className="mt-5 font-display leading-[0.95] tracking-[-0.03em] text-surface"
            style={{ fontSize: "clamp(2.4rem, 12vw, 4rem)" }}>
            Ordentlich.
            <br />
            <span className="italic text-ochre">Sauber.</span>
            <br />
            Verbindlich.
          </h2>
          <p className="mt-6 max-w-md text-pretty text-sm text-surface/80 sm:text-base">
            Drei Worte, denen jede Baustelle folgt. Keine Prospektsprache, kein
            Zwischenverkäufer, kein Nachjustieren hinter dem Rücken.
          </p>
        </div>
      </section>
    </>
  );
}

function HeroDesktop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // clip-path driven morph: image lives as a card at the bottom initially, grows to fullscreen.
  // keeps the headline area free so text stays readable at the top of the hero.
  const insetX = useTransform(scrollYProgress, [0, 0.45], [4, 0]);
  const insetTop = useTransform(scrollYProgress, [0, 0.45], [72, 0]);
  const insetBottom = useTransform(scrollYProgress, [0, 0.45], [4, 0]);
  const radius = useTransform(scrollYProgress, [0, 0.45], [32, 0]);
  const clipPath = useMotionTemplate`inset(${insetTop}% ${insetX}% ${insetBottom}% ${insetX}% round ${radius}px)`;

  // hero text (compositor-friendly: opacity + translate only)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);

  // overlay darken as card fills
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 0.55]);

  // manifest text
  const manifestOpacity = useTransform(scrollYProgress, [0.5, 0.65, 0.95, 1], [0, 1, 1, 1]);
  const manifestY = useTransform(scrollYProgress, [0.5, 0.75], [40, 0]);

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: reduced ? "auto" : "240vh" }}
      aria-label="Startansicht"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden [contain:paint]">
        {/* static ambient wash */}
        <div className="pointer-events-none absolute -inset-x-[20%] -top-40 h-[80vh] bg-[radial-gradient(60%_60%_at_60%_30%,rgba(197,135,58,0.28),transparent_70%)]" />
        <div className="pointer-events-none absolute right-[-10%] top-[20%] h-[380px] w-[380px] rounded-full bg-clay/20 blur-3xl" />

        {/* HERO content */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 z-20 flex flex-col justify-start px-5 pt-24 sm:px-6 md:justify-center md:px-10 md:pt-28 will-change-transform"
        >
          <div className="mx-auto w-full max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-ink-mute sm:text-[11px] sm:tracking-[0.26em]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-clay" />
              <span className="truncate">Stuckateurmeister · {SITE.city} · Saarland</span>
            </motion.div>

            <h1 className="mt-5 font-display leading-[0.9] tracking-[-0.03em] text-ink md:text-[136px] md:leading-[0.86]"
              style={{ fontSize: "clamp(2.75rem, 13vw, 8.5rem)" }}>
              <SplitWords
                text="Oberflächen,"
                trigger="mount"
                delay={0.15}
                stagger={0.04}
                as="span"
                className="block"
              />
              <span className="relative inline-block">
                <SplitWords
                  text="die bleiben."
                  trigger="mount"
                  delay={0.4}
                  stagger={0.04}
                  as="span"
                  decorate={(w, i) =>
                    i === 1 ? <span className="italic text-clay">{w}</span> : w
                  }
                />
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 1.4,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 1.3,
                  }}
                  className="absolute -bottom-1 left-0 h-[6px] w-full origin-left rounded-full bg-ink md:-bottom-2 md:h-[8px]"
                />
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1 }}
              className="mt-8 grid gap-6 md:mt-10 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-10"
            >
              <p className="max-w-xl text-balance text-base leading-relaxed text-surface drop-shadow-[0_1px_12px_rgba(22,19,15,0.5)] sm:text-lg md:text-xl">
                Putz, Trockenbau und Spanndecken aus einer Hand. Ein kleiner,
                eingespielter Meisterbetrieb aus Bous, der Baustellen so
                übergibt, wie Sie sie übernehmen würden.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton
                  href="#kontakt"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm text-surface sm:flex-none sm:px-6"
                >
                  Projekt besprechen
                  <Arrow />
                </MagneticButton>
                <MagneticButton
                  href="#leistungen"
                  strength={0.2}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/15 bg-surface/60 px-5 py-3.5 text-sm text-ink sm:flex-none sm:px-6"
                >
                  Leistungen
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          {/* bottom cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-surface/80 sm:flex md:bottom-10"
          >
            <span>Weiterlesen</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-6 w-[1px] bg-surface/60"
            />
          </motion.div>
        </motion.div>

        {/* MATERIAL layer: fixed 100vw/100vh, only clip-path animates */}
        <motion.div
          style={reduced ? undefined : { clipPath }}
          className="absolute inset-0 z-10 overflow-hidden will-change-[clip-path]"
        >
          <Image
            src={IMG.hero}
            alt=""
            fill
            priority
            quality={92}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* soft top fade so the card edge blends into the hero bg */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-tr from-ink/35 via-ink/5 to-clay/20" />
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-ink/15 via-ink/30 to-ink/70"
          />
        </motion.div>

        {/* MANIFEST overlaid on fullscreen material */}
        <motion.div
          style={{ opacity: manifestOpacity, y: manifestY }}
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-5 sm:px-6 will-change-transform"
        >
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-5 text-[10px] uppercase tracking-[0.28em] text-surface/85 sm:text-[11px] sm:tracking-[0.3em]">
              Was wir glauben
            </div>
            <h2 className="font-display leading-[0.95] tracking-[-0.03em] text-surface md:text-[112px] md:leading-[0.9]"
              style={{ fontSize: "clamp(2.4rem, 11vw, 7rem)" }}>
              <ManifestWord word="Ordentlich." progress={scrollYProgress} start={0.55} end={0.72} />
              <br />
              <ManifestWord word="Sauber." progress={scrollYProgress} start={0.65} end={0.82} italic />
              <br />
              <ManifestWord word="Verbindlich." progress={scrollYProgress} start={0.75} end={0.92} />
            </h2>
            <motion.p
              style={{ opacity: manifestOpacity }}
              className="mx-auto mt-6 max-w-xl text-balance text-sm text-surface/85 sm:mt-8 sm:text-base md:text-lg"
            >
              Drei Worte, denen jede Baustelle folgt. Keine Prospektsprache,
              kein Zwischenverkäufer, kein Nachjustieren hinter dem Rücken.
            </motion.p>
          </div>
        </motion.div>

        {/* vignette ring */}
        <div className="pointer-events-none absolute inset-0 z-40 ring-1 ring-inset ring-white/5" />
      </div>
    </section>
  );
}

function ManifestWord({
  word,
  progress,
  start,
  end,
  italic,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  italic?: boolean;
}) {
  const y = useTransform(progress, [start, end], [40, 0]);
  const opacity = useTransform(progress, [start, (start + end) / 2, end], [0, 1, 1]);
  return (
    <motion.span
      style={{ y, opacity }}
      className={`inline-block ${italic ? "italic text-ochre" : ""}`}
    >
      {word}
    </motion.span>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
