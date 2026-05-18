"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type SlideInDirection = "left" | "right" | "top" | "bottom";

interface SlideInProps {
  children: React.ReactNode;
  direction?: SlideInDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
}

function getOffset(
  direction: SlideInDirection,
  distance: number,
): { x: number; y: number } {
  switch (direction) {
    case "left":
      return { x: -distance, y: 0 };
    case "right":
      return { x: distance, y: 0 };
    case "top":
      return { x: 0, y: -distance };
    case "bottom":
      return { x: 0, y: distance };
  }
}

function SlideIn({
  children,
  direction = "left",
  delay = 0,
  duration = 0.5,
  distance = 40,
  once = true,
  className,
}: SlideInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once, margin: "-40px" });

  const offset = getOffset(direction, distance);

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
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export { SlideIn, type SlideInProps, type SlideInDirection };
