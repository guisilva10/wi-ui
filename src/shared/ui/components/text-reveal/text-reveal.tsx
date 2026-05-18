"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { cn } from "@/lib/cn";

type TextRevealBy = "word" | "character";

interface TextRevealProps {
  text: string;
  by?: TextRevealBy;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

function TextReveal({
  text,
  by = "word",
  delay = 0,
  duration = 0.4,
  once = true,
  className,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once, margin: "-40px" });

  const tokens = by === "word" ? text.split(" ") : text.split("");
  const staggerDelay = by === "word" ? 0.08 : 0.03;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
      },
    },
  };

  const tokenVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: "easeOut" as const },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-label={text}
      className={cn("inline-flex flex-wrap", className)}
    >
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          variants={tokenVariants}
          className={
            by === "word" ? "mr-[0.25em] inline-block" : "inline-block"
          }
          aria-hidden="true"
        >
          {token}
        </motion.span>
      ))}
    </motion.span>
  );
}

export { TextReveal, type TextRevealProps, type TextRevealBy };
