"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { IMG } from "../_lib/site";
import { ImagePlaceholder } from "./ImagePlaceholder";

const EASE = [0.22, 1, 0.36, 1] as const;

const items = [
  {
    label: "Reibeputz",
    kind: "Oberfläche",
    accent: "material-plaster",
    text: "text-anthracite",
    image: IMG.galleryA,
  },
  {
    label: "Clipso Spanndecke",
    kind: "Decke",
    accent: "material-lime",
    text: "text-anthracite",
    image: IMG.galleryB,
  },
  {
    label: "Trockenbau",
    kind: "Innenausbau",
    accent: "material-concrete",
    text: "text-cream",
    image: IMG.galleryC,
  },
  {
    label: "Lasur",
    kind: "Maler",
    accent: "material-champagne",
    text: "text-cream",
    image: IMG.galleryD,
  },
  {
    label: "Fassade",
    kind: "Außenputz",
    accent: "material-plaster",
    text: "text-anthracite",
    image: IMG.galleryE,
  },
  {
    label: "Designboden",
    kind: "Belag",
    accent: "material-concrete",
    text: "text-cream",
    image: IMG.galleryF,
  },
];

export function Gallery() {
  const reduced = useReducedMotion();

  return (
    <section
      id="projekte"
      aria-label="Projekte und Ergebnisse"
      className="relative mx-auto mt-24 max-w-6xl px-5 sm:mt-32 sm:px-6"
    >
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="rule-gold" />
            <span className="eyebrow">Unsere Arbeit</span>
          </div>
          <h3 className="font-display mt-6 text-anthracite" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.1, letterSpacing: "-0.012em", fontWeight: 400 }}>
            Ergebnisse, die für sich sprechen.
          </h3>
        </div>
        <p className="max-w-sm text-[17px] leading-[1.7] text-anthracite-soft">
          Ein Ausschnitt der Oberflächen und Gewerke, mit denen wir am
          häufigsten arbeiten.
        </p>
      </div>

      <ul className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2 md:gap-7">
        {items.map((it, i) => (
          <motion.li
            key={it.label}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: (i % 2) * 0.08 }}
            className={`group relative overflow-hidden rounded-[18px] aspect-[4/3] ${it.accent} ${it.text} sm:rounded-[22px]`}
          >
            <Image
              src={it.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <ImagePlaceholder />
            <div className="pointer-events-none absolute inset-4 z-30 ring-1 ring-inset ring-white/10 rounded-[14px] sm:inset-6 sm:rounded-[16px]" />

            <div className="relative z-30 flex h-full flex-col justify-between p-5 sm:p-7 md:p-8">
              <div className="flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.3em] opacity-85 sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                <span>{it.kind}</span>
              </div>
              <div>
                <h4 className="font-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.15, letterSpacing: "-0.012em", fontWeight: 400 }}>
                  {it.label}
                </h4>
                <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.3em] opacity-70">
                  GDH · Bous
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
