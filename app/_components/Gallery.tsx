"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { IMG } from "../_lib/site";

const items = [
  {
    label: "Reibeputz",
    kind: "Oberfläche",
    accent: "material-plaster",
    text: "text-ink",
    image: IMG.galleryA,
  },
  {
    label: "Clipso",
    kind: "Spanndecke",
    accent: "material-lime",
    text: "text-ink",
    image: IMG.galleryB,
  },
  {
    label: "Trockenbau",
    kind: "Innenausbau",
    accent: "material-concrete",
    text: "text-surface",
    image: IMG.galleryC,
  },
  {
    label: "Lasur",
    kind: "Maler",
    accent: "material-clay",
    text: "text-surface",
    image: IMG.galleryD,
  },
  {
    label: "Fassade",
    kind: "Außenputz",
    accent: "material-plaster",
    text: "text-ink",
    image: IMG.galleryE,
  },
  {
    label: "Design-Boden",
    kind: "Belag",
    accent: "material-concrete",
    text: "text-surface",
    image: IMG.galleryF,
  },
];


export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-25%"]);

  return (
    <section
      aria-label="Oberflächen"
      className="relative mt-24 overflow-hidden sm:mt-32"
      ref={ref}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:px-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-ink-mute sm:text-[11px] sm:tracking-[0.26em]">
            Oberflächen
          </div>
          <h3 className="mt-3 font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
            Material, nicht Marketing.
          </h3>
        </div>
        <p className="max-w-sm text-sm text-ink-mute sm:text-right">
          Sechs Oberflächen, mit denen wir am häufigsten arbeiten.
        </p>
      </div>

      <motion.ul
        style={{ x }}
        className="mt-8 flex gap-4 pl-5 will-change-transform sm:mt-10 sm:gap-6 sm:pl-6 md:gap-8 md:pl-12"
      >
        {items.map((it) => (
          <li
            key={it.label}
            className={`group relative h-[46vh] w-[78vw] flex-shrink-0 overflow-hidden rounded-[24px] max-h-[520px] sm:h-[52vh] sm:w-[66vw] sm:rounded-[32px] md:h-[60vh] md:w-[42vw] lg:w-[36vw] ${it.accent} ${it.text}`}
          >
            <Image
              src={it.image}
              alt=""
              fill
              sizes="(max-width: 768px) 70vw, 42vw"
              loading="lazy"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div
              className={`pointer-events-none absolute inset-0 ${
                it.text === "text-ink"
                  ? "bg-gradient-to-t from-white/35 via-white/5 to-transparent"
                  : "bg-gradient-to-t from-black/65 via-black/20 to-transparent"
              }`}
            />
            <div className="pointer-events-none absolute inset-4 ring-1 ring-inset ring-white/15 rounded-[18px] sm:inset-6 sm:rounded-[22px]" />

            <div className="relative flex h-full flex-col justify-between p-5 sm:p-7 md:p-9">
              <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.24em] opacity-85 sm:text-xs sm:tracking-[0.26em]">
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                <span>{it.kind}</span>
              </div>
              <div>
                <h4 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
                  {it.label}
                </h4>
                <div className="mt-2 text-[9px] uppercase tracking-[0.28em] opacity-70 sm:text-[10px] sm:tracking-[0.3em]">
                  GdH Trapp · Bous
                </div>
              </div>
            </div>
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
