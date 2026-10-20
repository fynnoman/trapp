"use client";

import { memo } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { SERVICES, type Service } from "../_lib/site";
import { ImagePlaceholder } from "./ImagePlaceholder";

const toneClass: Record<Service["tone"], { bg: string; text: string }> = {
  stone: { bg: "material-plaster", text: "text-anthracite" },
  ink: { bg: "material-concrete", text: "text-cream" },
  clay: { bg: "material-champagne", text: "text-cream" },
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
      className="relative mx-auto mt-24 max-w-6xl px-5 sm:mt-32 sm:px-6"
      aria-label="Leistungen"
    >
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="rule-gold" />
            <span className="eyebrow">Unsere Leistungen</span>
          </div>
          <h2
            className="font-display mt-6 text-anthracite"
            style={{
              fontSize: "clamp(2rem, 5.4vw, 3.4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.012em",
              fontWeight: 400,
            }}
          >
            Gutes Handwerk in jedem Detail.
          </h2>
        </div>
        <p className="max-w-md text-pretty text-[17px] leading-[1.7] text-anthracite-soft md:max-w-sm">
          Von Putz und Trockenbau über Spanndecken und Maler bis zu Böden und
          Gerüst. Sauber geplant und präzise ausgeführt.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:gap-5 md:mt-16 md:grid-cols-12 md:gap-6">
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
    layout.size === "lg" ? "text-3xl md:text-[2.4rem]" : "text-2xl md:text-3xl";
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % 2) * 0.08,
      }}
      className={`group relative overflow-hidden rounded-[18px] md:rounded-[22px] ${layout.col} ${layout.aspect} max-h-[560px] ${tone.text}`}
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
      <ImagePlaceholder />
      <div className="pointer-events-none absolute inset-4 z-30 ring-1 ring-inset ring-white/10 rounded-[14px] md:inset-5 md:rounded-[16px]" />

      <div className="relative z-30 flex h-full flex-col justify-between p-5 sm:p-7 md:p-9">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] opacity-85 sm:text-[11px]">
            {s.lede}
          </span>
        </div>

        <div>
          <h3
            className={`font-display ${titleSize}`}
            style={{ lineHeight: 1.12, letterSpacing: "-0.012em", fontWeight: 400 }}
          >
            {s.title}
          </h3>
          {layout.size === "lg" && (
            <p className="measure-prose mt-4 text-pretty text-sm leading-relaxed opacity-90 md:text-base">
              {s.body}
            </p>
          )}
          <Link
            href="#kontakt"
            className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.26em] opacity-80 transition-opacity hover:opacity-100"
          >
            Beratung anfragen
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
});
