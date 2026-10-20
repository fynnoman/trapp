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

  if (isMobile) {
    return <ProcessMobile />;
  }

  return <ProcessDesktop />;
}

function ProcessMobile() {
  return (
    <section
      id="handwerk"
      className="relative mt-24"
      aria-label="Vom Aufmaß zur Übergabe"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-[10px] uppercase tracking-[0.26em] text-ink-mute">
          Vom Aufmaß zur Übergabe
        </div>
        <h2 className="mt-4 font-display leading-[0.95] tracking-[-0.03em] text-ink"
          style={{ fontSize: "clamp(2.4rem, 11vw, 4rem)" }}>
          Handwerk,
          <br />
          <span className="italic text-clay">kein Verwalten.</span>
        </h2>
      </div>

      <ul className="mt-10 flex flex-col gap-5 px-5">
        {stages.map((s, i) => (
          <motion.li
            key={s.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[24px] bg-ink text-surface"
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
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/35" />
              <div className="pointer-events-none absolute inset-4 ring-1 ring-inset ring-white/10 rounded-[18px]" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center gap-2.5 pb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-ochre" />
                  <span className="text-[10px] uppercase tracking-[0.24em] text-surface/75">
                    {s.kicker}
                  </span>
                </div>
                <h3 className="font-display text-3xl leading-tight tracking-tight text-surface">
                  {s.title}
                </h3>
                <p className="mt-3 text-pretty text-sm text-surface/85">
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
      style={{ height: reduced ? "auto" : `${stages.length * 90}vh` }}
      aria-label="Vom Aufmaß zur Übergabe"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-ink [contain:paint]">
        {/* crossfading backgrounds (opacity only) */}
        {stages.map((s, i) => (
          <StageBackground
            key={s.key}
            index={i}
            total={stages.length}
            image={s.image}
            progress={progress}
          />
        ))}

        {/* top meta row */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 pt-24 sm:px-6 sm:pt-28 md:px-12">
          <span className="text-[10px] uppercase tracking-[0.26em] text-surface/80 sm:text-[11px] sm:tracking-[0.3em]">
            Vom Aufmaß zur Übergabe
          </span>
          <CurrentStageLabel progress={progress} stages={stages} />
        </div>

        {/* big fixed heading */}
        <h2 className="pointer-events-none relative z-20 mx-auto max-w-6xl px-5 text-center font-display leading-[0.95] tracking-[-0.03em] text-surface sm:px-6 md:text-[136px] md:leading-[0.9]"
          style={{ fontSize: "clamp(2.75rem, 12vw, 8.5rem)" }}>
          Handwerk,
          <br />
          <span className="italic text-ochre">kein Verwalten.</span>
        </h2>

        {/* progress rail */}
        <div className="pointer-events-none absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 md:block md:left-12">
          <div className="relative h-56 w-[2px] bg-surface/15">
            <motion.div
              style={{ scaleY: progress }}
              className="absolute inset-x-0 top-0 h-full origin-top bg-ochre"
            />
          </div>
        </div>

        {/* stage panels (crossfade only) */}
        <div className="pointer-events-none absolute inset-0 z-20">
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

  const opacity = useTransform(
    progress,
    [start, peakStart, peakEnd, end],
    [0, 1, 1, 0],
  );

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        loading={index === 0 ? "eager" : "lazy"}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/55" />
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

  const opacity = useTransform(
    progress,
    [start, peakStart, peakEnd, end],
    [0, 1, 1, 0],
  );

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-auto absolute inset-x-0 bottom-6 flex justify-center px-5 sm:bottom-24 sm:px-6 sm:justify-end md:bottom-28 md:px-20"
    >
      <div className="glass-dark w-full max-w-md rounded-2xl p-5 sm:rounded-3xl sm:p-7 md:p-9">
        <div className="flex items-center gap-3 pb-4 sm:pb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-ochre" />
          <span className="text-[10px] uppercase tracking-[0.24em] text-surface/70 sm:tracking-[0.26em]">
            {s.kicker}
          </span>
        </div>
        <h3 className="font-display text-3xl leading-tight tracking-tight text-surface sm:text-4xl">
          {s.title}
        </h3>
        <p className="mt-3 text-pretty text-sm text-surface/80 sm:mt-4 sm:text-base">{s.body}</p>
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
    <div className="pointer-events-none flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-surface/80">
      <span className="h-1.5 w-1.5 rounded-full bg-ochre" />
      <motion.span>{label}</motion.span>
    </div>
  );
}
