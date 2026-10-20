"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useIsMobile } from "../_lib/useIsMobile";

export function ScrollProgress() {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  if (isMobile) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[90] h-[2px] origin-left bg-clay"
    />
  );
}
