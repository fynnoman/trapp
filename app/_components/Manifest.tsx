"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { IMG, SITE } from "../_lib/site";
import { useIsMobile } from "../_lib/useIsMobile";
import { ImagePlaceholder } from "./ImagePlaceholder";

const EASE = [0.22, 1, 0.36, 1] as const;

const words = [
  {
    label: "Qualität.",
    body: "Fachgerechte Ausführung, saubere Arbeit und Sorgfalt bis ins Detail.",
  },
  {
    label: "Vertrauen.",
    body: "Persönliche Beratung, zuverlässige Zusammenarbeit und ein offener Austausch.",
  },
  {
    label: "Beständigkeit.",
    body: "Wertige Ergebnisse, die heute überzeugen und langfristig bestehen.",
  },
];

export function Manifest() {
  const isMobile = useIsMobile();
  if (isMobile) return <ManifestMobile />;
  return <ManifestDesktop />;
}

function ManifestMobile() {
  const reduced = useReducedMotion();
  return (
    <section
      id="manifest"
      aria-label="Worauf wir setzen"
      className="relative mt-24 overflow-hidden bg-anthracite text-cream"
    >
      <div className="relative h-[70vh] w-full">
        <Image
          src={IMG.hero}
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-center"
        />
        <ImagePlaceholder />
        <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-t from-anthracite via-anthracite/55 to-anthracite/30" />
        <div className="absolute inset-x-0 bottom-8 z-40 px-5 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="rule-gold !bg-champagne-soft" />
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-cream/85">
              Worauf wir setzen
            </span>
          </div>
          <h2 className="font-display mt-5 text-cream drop-shadow-[0_6px_30px_rgba(0,0,0,0.6)]"
            style={{ fontSize: "clamp(2.2rem, 11vw, 3.6rem)", lineHeight: 1.05, letterSpacing: "-0.012em", fontWeight: 400 }}>
            {SITE.pillars.map((p, i) => (
              <motion.span
                key={p}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.15 }}
                className="block"
              >
                {p}.
              </motion.span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}

function ManifestDesktop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 32,
    mass: 0.15,
  });

  // bg scale over the whole scroll
  const bgScale = useTransform(progress, [0, 1], [1.1, 1]);

  return (
    <section
      ref={ref}
      id="manifest"
      aria-label="Worauf wir setzen"
      className="relative"
      style={{ height: reduced ? "auto" : `${words.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-anthracite text-cream [contain:paint]">
        <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-10 will-change-transform">
          <Image
            src={IMG.hero}
            alt=""
            fill
            sizes="100vw"
            loading="lazy"
            quality={92}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-anthracite/50 via-anthracite/35 to-anthracite/80" />
        </motion.div>

        {/* placeholder badge over the sticky background */}
        <ImagePlaceholder />

        {/* top meta row */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between px-8 pt-28 sm:px-12 sm:pt-32">
          <div className="flex items-center gap-3 text-cream/85">
            <span className="rule-gold !bg-champagne-soft" />
            <span className="text-[11px] font-medium uppercase tracking-[0.3em]">
              Worauf wir setzen
            </span>
          </div>
          <CurrentWord progress={progress} />
        </div>

        {/* big words, one appearing after the other */}
        <div className="relative z-40 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
          <h2
            className="font-display text-cream drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
            style={{
              fontSize: "clamp(2.8rem, 9vw, 7rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.015em",
              fontWeight: 400,
            }}
          >
            {words.map((w, i) => (
              <WordLine key={w.label} word={w.label} index={i} total={words.length} progress={progress} />
            ))}
          </h2>

          <div className="relative mt-10 h-[80px] w-full max-w-xl">
            {words.map((w, i) => (
              <WordBody key={w.label} body={w.body} index={i} total={words.length} progress={progress} />
            ))}
          </div>
        </div>

        {/* progress rail */}
        <div className="pointer-events-none absolute left-8 top-1/2 z-40 hidden -translate-y-1/2 md:block md:left-12">
          <div className="relative h-56 w-[2px] bg-cream/15">
            <motion.div
              style={{ scaleY: progress }}
              className="absolute inset-x-0 top-0 h-full origin-top bg-champagne"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function WordLine({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const step = 1 / total;
  const start = Math.max(0, index * step - step * 0.1);
  const peakStart = index * step + step * 0.15;
  const peakEnd = (index + 1) * step - step * 0.05;
  const end = Math.min(1, (index + 1) * step + step * 0.15);

  const opacity = useTransform(progress, [start, peakStart, peakEnd, end], [0, 1, 1, 0.08]);
  const y = useTransform(progress, [start, peakStart], [60, 0]);

  return (
    <motion.span style={{ opacity, y }} className="block">
      {word}
    </motion.span>
  );
}

function WordBody({
  body,
  index,
  total,
  progress,
}: {
  body: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const step = 1 / total;
  const start = Math.max(0, index * step + step * 0.05);
  const peakStart = index * step + step * 0.25;
  const peakEnd = (index + 1) * step - step * 0.05;
  const end = Math.min(1, (index + 1) * step + step * 0.1);

  const opacity = useTransform(progress, [start, peakStart, peakEnd, end], [0, 1, 1, 0]);

  return (
    <motion.p
      style={{ opacity }}
      className="absolute inset-x-0 top-0 mx-auto text-pretty text-[15px] leading-[1.7] text-cream/85 sm:text-[17px]"
    >
      {body}
    </motion.p>
  );
}

function CurrentWord({ progress }: { progress: MotionValue<number> }) {
  const label = useTransform(progress, (v) => {
    const idx = Math.min(words.length - 1, Math.max(0, Math.floor(v * words.length)));
    return words[idx].label.replace(".", "");
  });
  return (
    <div className="pointer-events-none flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-cream/85">
      <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
      <motion.span>{label}</motion.span>
    </div>
  );
}
