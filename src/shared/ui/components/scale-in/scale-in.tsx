"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

interface ScaleInProps {
  children: React.ReactNode;
  initialScale?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

function ScaleIn({
  children,
  initialScale = 0.9,
  delay = 0,
  duration = 0.4,
  once = true,
  className,
}: ScaleInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once, margin: "-40px" });

  const initial = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: initialScale };

  const animate = isInView
    ? { opacity: 1, scale: 1 }
    : shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: initialScale };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export { ScaleIn, type ScaleInProps };
