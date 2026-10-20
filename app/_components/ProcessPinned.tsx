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
import { IMG } from "../_lib/site";
import { useIsMobile } from "../_lib/useIsMobile";
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
  const isMobile = useIsMobile();
  if (isMobile) return <ProcessMobile />;
  return <ProcessDesktop />;
}

function Headline({ dark = false }: { dark?: boolean }) {
  const reduced = useReducedMotion();
  const color = dark ? "text-cream" : "text-anthracite";
  const eyebrowColor = dark ? "text-cream/80" : "";
  return (
    <>
      <div className="flex items-center gap-3">
        <span className={`rule-gold ${dark ? "!bg-champagne-soft" : ""}`} />
        <span className={`eyebrow ${eyebrowColor}`}>Unsere Philosophie</span>
      </div>
      <motion.h2
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
        whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className={`font-display mt-6 ${color}`}
        style={{
          fontSize: "clamp(2rem, 5.4vw, 3.4rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.012em",
          fontWeight: 400,
        }}
      >
        Sorgfalt, die man sieht. Qualität, die man spürt.
      </motion.h2>
    </>
  );
}

function ProcessMobile() {
  return (
    <section
      id="handwerk"
      aria-label="Vom Aufmaß zur Übergabe"
      className="relative mx-auto mt-24 max-w-6xl px-5 sm:px-6"
    >
      <Headline />
      <p className="mt-6 max-w-xl text-pretty text-[17px] leading-[1.7] text-anthracite-soft">
        Gutes Handwerk zeigt sich in Übergängen, sauber bearbeiteten
        Oberflächen und Ergebnissen, die bis ins Kleinste durchdacht sind.
      </p>

      <ul className="mt-10 flex flex-col gap-5">
        {stages.map((s, i) => (
          <motion.li
            key={s.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative overflow-hidden rounded-[18px] bg-anthracite text-cream"
          >
            <div className="relative h-[52vh] max-h-[480px] w-full">
              <Image
                src={s.image}
                alt=""
                fill
                sizes="100vw"
                loading={i === 0 ? "eager" : "lazy"}
                className="object-cover object-center"
              />
              <ImagePlaceholder />
              <div className="absolute inset-x-0 bottom-0 z-30 p-5">
                <div className="flex items-center gap-2.5 pb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-cream/85">
                    {s.kicker}
                  </span>
                </div>
                <h3 className="font-display text-3xl text-cream" style={{ lineHeight: 1.1, letterSpacing: "-0.012em", fontWeight: 400 }}>
                  {s.title}
                </h3>
                <p className="mt-3 text-pretty text-[15px] leading-[1.65] text-cream/90">
                  {s.body}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

function ProcessDesktop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    mass: 0.15,
  });

  return (
    <section
      id="handwerk"
      ref={ref}
      className="relative mt-24 sm:mt-32"
      style={{ height: reduced ? "auto" : `${stages.length * 100}vh` }}
      aria-label="Vom Aufmaß zur Übergabe"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-anthracite [contain:paint]">
        {stages.map((s, i) => (
          <StageBackground
            key={s.key}
            index={i}
            total={stages.length}
            image={s.image}
            progress={progress}
          />
        ))}

        {/* ein einziges großes Platzhalter-Label über allen Hintergründen */}
        <ImagePlaceholder />

        {/* top meta row */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between px-8 pt-28 sm:px-12 sm:pt-32">
          <div className="flex items-center gap-3 text-cream/85">
            <span className="rule-gold !bg-champagne-soft" />
            <span className="text-[11px] font-medium uppercase tracking-[0.3em]">
              Unsere Philosophie
            </span>
          </div>
          <CurrentStageLabel progress={progress} stages={stages} />
        </div>

        {/* big fixed heading */}
        <h2 className="pointer-events-none relative z-40 mx-auto max-w-5xl px-6 text-center font-display text-cream drop-shadow-[0_6px_30px_rgba(0,0,0,0.55)]"
          style={{ fontSize: "clamp(2.4rem, 6.6vw, 4.6rem)", lineHeight: 1.1, letterSpacing: "-0.012em", fontWeight: 400 }}>
          Sorgfalt, die man sieht.
          <br />
          Qualität, die man spürt.
        </h2>

        {/* progress rail */}
        <div className="pointer-events-none absolute left-8 top-1/2 z-40 hidden -translate-y-1/2 md:block md:left-12">
          <div className="relative h-56 w-[2px] bg-cream/15">
            <motion.div
              style={{ scaleY: progress }}
              className="absolute inset-x-0 top-0 h-full origin-top bg-champagne"
            />
          </div>
        </div>

        {/* stage panels (crossfade only) */}
        <div className="pointer-events-none absolute inset-0 z-40">
          {stages.map((s, i) => (
            <StagePanel key={s.key} s={s} index={i} total={stages.length} progress={progress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StageBackground({
  index,
  total,
  image,
  progress,
}: {
  index: number;
  total: number;
  image: string;
  progress: MotionValue<number>;
}) {
  const step = 1 / total;
  const start = Math.max(0, index * step - step * 0.3);
  const peakStart = index * step;
  const peakEnd = (index + 1) * step;
  const end = Math.min(1, (index + 1) * step + step * 0.3);

  const opacity = useTransform(progress, [start, peakStart, peakEnd, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, end], [1.08, 1]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 z-10 overflow-hidden">
      <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          loading={index === 0 ? "eager" : "lazy"}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite/85 via-anthracite/45 to-anthracite/55" />
      </motion.div>
    </motion.div>
  );
}

function StagePanel({
  s,
  index,
  total,
  progress,
}: {
  s: (typeof stages)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const step = 1 / total;
  const start = Math.max(0, index * step - step * 0.1);
  const peakStart = index * step + step * 0.1;
  const peakEnd = (index + 1) * step - step * 0.1;
  const end = Math.min(1, (index + 1) * step + step * 0.1);

  const opacity = useTransform(progress, [start, peakStart, peakEnd, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, peakStart], [40, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-auto absolute inset-x-0 bottom-24 flex justify-end px-6 sm:bottom-28 sm:px-12 md:bottom-32 md:px-20"
    >
      <div className="glass-dark w-full max-w-md rounded-[18px] p-6 sm:p-8 md:p-9">
        <div className="flex items-center gap-3 pb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-cream/80">
            {s.kicker}
          </span>
        </div>
        <h3 className="font-display text-cream" style={{ fontSize: "clamp(1.6rem, 2.4vw, 2rem)", lineHeight: 1.15, letterSpacing: "-0.01em", fontWeight: 400 }}>
          {s.title}
        </h3>
        <p className="mt-4 text-pretty text-[15px] leading-[1.7] text-cream/85">{s.body}</p>
      </div>
    </motion.div>
  );
}

function CurrentStageLabel({
  progress,
  stages,
}: {
  progress: MotionValue<number>;
  stages: { title: string }[];
}) {
  const label = useTransform(progress, (v) => {
    const idx = Math.min(stages.length - 1, Math.max(0, Math.floor(v * stages.length)));
    return stages[idx].title.replace(".", "");
  });
  return (
    <div className="pointer-events-none flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-cream/85">
      <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
      <motion.span>{label}</motion.span>
    </div>
  );
}
