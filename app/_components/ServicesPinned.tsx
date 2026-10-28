"use client";

import { memo } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { SERVICES, type Service } from "../_lib/site";
import { useIsMobile } from "../_lib/useIsMobile";

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
  { col: "md:col-span-7", aspect: "md:aspect-[16/11]", size: "lg" },
  { col: "md:col-span-5", aspect: "md:aspect-[4/5]", size: "md" },
  { col: "md:col-span-5", aspect: "md:aspect-[4/5]", size: "md" },
  { col: "md:col-span-7", aspect: "md:aspect-[16/11]", size: "lg" },
  { col: "md:col-span-6", aspect: "md:aspect-[5/4]", size: "md" },
  { col: "md:col-span-6", aspect: "md:aspect-[5/4]", size: "md" },
];

export function ServicesPinned() {
  const isMobile = useIsMobile();

  return (
    <section
      id="leistungen"
      className="relative mt-20 overflow-hidden sm:mt-32"
      aria-label="Leistungen"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="rule-gold" />
              <span className="eyebrow">Unsere Leistungen</span>
            </div>
            <h2
              className="font-display mt-5 text-anthracite sm:mt-6"
              style={{
                fontSize: "clamp(2rem, 8vw, 3.4rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.012em",
                fontWeight: 400,
              }}
            >
              Gutes Handwerk in jedem Detail.
            </h2>
          </div>
          <p className="max-w-md text-pretty text-[16px] leading-[1.65] text-anthracite-soft sm:text-[17px] md:max-w-sm">
            Von Putz und Trockenbau über Spanndecken und Maler bis zu Böden und
            Gerüst. Sauber geplant und präzise ausgeführt.
          </p>
        </div>
      </div>

      {isMobile ? (
        <ul
          className="no-scrollbar mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-5 pb-3"
          style={{ scrollPaddingLeft: "1.25rem", scrollPaddingRight: "1.25rem" }}
        >
          {SERVICES.map((s, i) => (
            <li
              key={s.slug}
              className={`relative h-[62vh] w-[82vw] max-h-[520px] flex-shrink-0 snap-start overflow-hidden rounded-[18px] ${toneClass[s.tone].bg} ${toneClass[s.tone].text}`}
            >
              <ServiceMobileCard s={s} index={i} />
            </li>
          ))}
          <li aria-hidden className="w-2 flex-shrink-0" />
        </ul>
      ) : (
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-12 gap-6 px-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.slug} s={s} layout={CARDS[i]} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

function ServiceMobileCard({ s, index }: { s: Service; index: number }) {
  return (
    <>
      <Image
        src={s.image}
        alt=""
        fill
        sizes="82vw"
        loading={index < 2 ? "eager" : "lazy"}
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-4 z-30 ring-1 ring-inset ring-white/10 rounded-[14px]" />
    </>
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
      className={`group relative overflow-hidden rounded-[22px] ${layout.col} ${layout.aspect} max-h-[560px] ${tone.text}`}
    >
      <div className={`absolute inset-0 ${tone.bg}`} />
      <Image
        src={s.image}
        alt=""
        fill
        sizes="(max-width: 1200px) 50vw, 40vw"
        loading="lazy"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-5 z-30 ring-1 ring-inset ring-white/10 rounded-[16px]" />
    </motion.article>
  );
});
