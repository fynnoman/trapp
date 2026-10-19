"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";
import { useRef, type ReactNode } from "react";

type Props = {
  href?: string;
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
} & Omit<HTMLMotionProps<"a">, "ref">;

export function MagneticButton({
  href,
  children,
  className,
  strength = 0.3,
  as = href ? "a" : "button",
  ...rest
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Comp: typeof motion.a = (as === "a" ? motion.a : (motion.button as unknown as typeof motion.a));

  return (
    <Comp
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      {...rest}
    >
      <motion.span
        style={{ x: sx, y: sy }}
        className="pointer-events-none inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </Comp>
  );
}
