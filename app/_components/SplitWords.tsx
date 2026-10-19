"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { memo, type ReactNode } from "react";

type Props = {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  trigger?: "mount" | "inView";
  decorate?: (word: string, i: number) => ReactNode;
};

function SplitWordsImpl({
  text,
  className,
  wordClassName,
  as = "span",
  delay = 0,
  stagger = 0.06,
  trigger = "inView",
  decorate,
}: Props) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  const word: Variants = {
    hidden: reduced
      ? { opacity: 0 }
      : { y: "110%", opacity: 0 },
    visible: reduced
      ? { opacity: 1 }
      : {
          y: 0,
          opacity: 1,
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
        },
  };

  const Comp = motion[as] as typeof motion.span;
  const viewportConfig =
    trigger === "inView"
      ? { once: true, margin: "-15% 0px -15% 0px" }
      : undefined;

  return (
    <Comp
      initial="hidden"
      {...(trigger === "mount"
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: viewportConfig })}
      variants={container}
      className={className}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className={`inline-block overflow-hidden align-bottom ${wordClassName ?? ""}`}
          style={{ paddingBottom: "0.08em" }}
        >
          <motion.span variants={word} className="inline-block will-change-transform">
            {decorate ? decorate(w, i) : w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

export const SplitWords = memo(SplitWordsImpl);
