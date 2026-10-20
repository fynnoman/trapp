"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { IMG } from "../_lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function BrandPromise() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section
      id="anspruch"
      ref={ref}
      aria-label="Markenversprechen"
      className="relative mx-auto mt-20 max-w-6xl px-5 sm:mt-32 sm:px-6"
    >
      <div className="grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-20">
        <div>
          <div className="flex items-center gap-3">
            <span className="rule-gold" />
            <span className="eyebrow">Unser Anspruch</span>
          </div>

          <motion.h2
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-display mt-6 text-anthracite"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.012em",
              fontWeight: 400,
            }}
          >
            Handwerk. Qualität. Beständigkeit.
          </motion.h2>

          <div className="measure-prose mt-7 space-y-5 text-pretty text-[17px] leading-[1.7] text-anthracite-soft sm:text-[19px]">
            <p>
              Wir gestalten Räume und Oberflächen mit handwerklicher Präzision,
              hochwertigen Materialien und einem Auge fürs Detail.
            </p>
            <p>
              Unser Anspruch ist nicht nur ein überzeugendes Ergebnis am Tag der
              Fertigstellung, sondern Qualität, die langfristig Bestand hat.
            </p>
          </div>

          <div className="mt-10 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-anthracite-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
            Meisterbetrieb · Saarland
          </div>
        </div>

        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 20 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="relative aspect-[4/5] overflow-hidden rounded-[18px] shadow-[0_30px_80px_-40px_rgba(37,36,33,0.4)] sm:rounded-[22px]"
        >
          <motion.div
            style={reduced ? undefined : { y: imgY, scale: imgScale }}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={IMG.statement}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 44vw"
              loading="lazy"
              className="object-cover object-center"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 z-30 ring-1 ring-inset ring-anthracite/10" />
        </motion.div>
      </div>
    </section>
  );
}
