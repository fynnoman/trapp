"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { IMG } from "../_lib/site";
import { useIsMobile } from "../_lib/useIsMobile";

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

function CardInner({ it, eager = false }: { it: (typeof items)[number]; eager?: boolean }) {
  return (
    <>
      <Image
        src={it.image}
        alt=""
        fill
        sizes="(max-width: 768px) 85vw, 42vw"
        loading={eager ? "eager" : "lazy"}
        priority={eager}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-4 z-30 ring-1 ring-inset ring-white/10 rounded-[14px] sm:inset-6 sm:rounded-[16px]" />
    </>
  );
}

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-32%"]);

  return (
    <section
      id="projekte"
      aria-label="Projekte und Ergebnisse"
      className="relative mt-20 overflow-hidden sm:mt-32"
      ref={ref}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:px-6">
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

      {isMobile ? (
        <ul
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-5 pb-3"
          style={{ scrollPaddingLeft: "1.25rem", scrollPaddingRight: "1.25rem" }}
        >
          {items.map((it, i) => (
            <li
              key={it.label}
              className={`group relative h-[52vh] w-[82vw] flex-shrink-0 snap-start overflow-hidden rounded-[18px] max-h-[520px] ${it.accent} ${it.text}`}
            >
              <CardInner it={it} eager={i === 0} />
            </li>
          ))}
          <li aria-hidden className="w-2 flex-shrink-0" />
        </ul>
      ) : (
        <motion.ul
          style={{ x }}
          className="mt-12 flex gap-6 pl-6 will-change-transform md:gap-8 md:pl-12"
        >
          {items.map((it, i) => (
            <li
              key={it.label}
              className={`group relative h-[52vh] w-[66vw] flex-shrink-0 overflow-hidden rounded-[22px] max-h-[520px] md:h-[60vh] md:w-[42vw] lg:w-[36vw] ${it.accent} ${it.text}`}
            >
              <CardInner it={it} eager={i === 0} />
            </li>
          ))}
        </motion.ul>
      )}
    </section>
  );
}
