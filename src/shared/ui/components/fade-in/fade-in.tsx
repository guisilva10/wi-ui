"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type FadeInDirection = "up" | "down" | "left" | "right" | "none";

interface FadeInProps {
  children: React.ReactNode;
  direction?: FadeInDirection;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

const DIRECTION_OFFSET: Record<FadeInDirection, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  className,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once, margin: "-40px" });

  const offset = DIRECTION_OFFSET[direction];

  const initial = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, x: offset.x, y: offset.y };

  const animate = isInView
    ? { opacity: 1, x: 0, y: 0 }
    : shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, x: offset.x, y: offset.y };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export { FadeIn, type FadeInProps, type FadeInDirection };
