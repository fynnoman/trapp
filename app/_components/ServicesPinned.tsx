"use client";

import { memo } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { SERVICES, type Service } from "../_lib/site";
import { SplitWords } from "./SplitWords";

const toneClass: Record<Service["tone"], { bg: string; text: string }> = {
  stone: { bg: "material-plaster", text: "text-ink" },
  ink: { bg: "material-concrete", text: "text-surface" },
  clay: { bg: "material-clay", text: "text-surface" },
};

type CardLayout = {
  col: string;
  aspect: string;
  size: "sm" | "md" | "lg";
};

const CARDS: CardLayout[] = [
  { col: "md:col-span-7", aspect: "aspect-[5/6] md:aspect-[16/11]", size: "lg" },
  { col: "md:col-span-5", aspect: "aspect-[5/6] md:aspect-[4/5]", size: "md" },
  { col: "md:col-span-5", aspect: "aspect-[5/6] md:aspect-[4/5]", size: "md" },
  { col: "md:col-span-7", aspect: "aspect-[5/6] md:aspect-[16/11]", size: "lg" },
  { col: "md:col-span-6", aspect: "aspect-[5/6] md:aspect-[5/4]", size: "md" },
  { col: "md:col-span-6", aspect: "aspect-[5/6] md:aspect-[5/4]", size: "md" },
];

export function ServicesPinned() {
  return (
    <section
      id="leistungen"
      className="relative mx-auto mt-24 max-w-6xl px-5 sm:mt-32 sm:px-6 isolate [content-visibility:auto] [contain-intrinsic-size:100vh]"
      aria-label="Leistungen"
    >
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-ink-mute sm:text-[11px] sm:tracking-[0.26em]">
            Leistungen
          </div>
          <h2 className="mt-4 font-display leading-[0.92] tracking-[-0.03em] text-ink md:text-[96px] md:leading-[0.9]"
            style={{ fontSize: "clamp(2.4rem, 10.5vw, 6rem)" }}>
            <SplitWords text="Ein Haus," />
            <br />
            <SplitWords
              text="sechs Oberflächen."
              stagger={0.05}
              decorate={(w, i) =>
                i === 1 ? <span className="italic text-clay">{w}</span> : w
              }
            />
          </h2>
        </div>
        <p className="max-w-md text-pretty text-sm text-ink-soft md:max-w-xs md:text-base">
          Rohbau, Innenausbau, Oberfläche. Was andere auf drei Firmen
          verteilen, läuft hier über eine Nummer.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 md:mt-14 md:grid-cols-12 md:gap-6">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.slug} s={s} layout={CARDS[i]} index={i} />
        ))}
      </div>
    </section>
  );
}

const ServiceCard = memo(function ServiceCard({
  s,
  layout,
  index,
}: {
  s: Service;
  layout: CardLayout;
  index: number;
}) {
  const tone = toneClass[s.tone];
  const titleSize =
    layout.size === "lg"
      ? "text-4xl md:text-5xl"
      : "text-3xl md:text-4xl";
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % 2) * 0.08,
      }}
      className={`group relative overflow-hidden rounded-[24px] md:rounded-[28px] ${layout.col} ${layout.aspect} max-h-[560px] ${tone.text}`}
    >
      <div className={`absolute inset-0 ${tone.bg}`} />
      <Image
        src={s.image}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        loading="lazy"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div
        className={`pointer-events-none absolute inset-0 ${
          s.tone === "stone"
            ? "bg-gradient-to-t from-white/55 via-white/5 to-transparent"
            : "bg-gradient-to-t from-black/75 via-black/20 to-transparent"
        }`}
      />
      <div className="pointer-events-none absolute inset-4 ring-1 ring-inset ring-white/15 rounded-[18px] md:inset-5 md:rounded-[22px]" />

      <div className="relative flex h-full flex-col justify-between p-5 sm:p-7 md:p-9">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
          <span className="text-[10px] uppercase tracking-[0.22em] opacity-80 sm:text-[11px] sm:tracking-[0.26em]">
            {s.lede}
          </span>
        </div>

        <div>
          <h3
            className={`font-display leading-[0.95] tracking-[-0.025em] ${titleSize}`}
          >
            {s.title}
          </h3>
          {layout.size === "lg" && (
            <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed opacity-90 md:mt-4 md:text-base">
              {s.body}
            </p>
          )}
        </div>
      </div>

    </motion.article>
  );
});
