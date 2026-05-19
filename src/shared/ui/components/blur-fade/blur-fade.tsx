"use client";

import { useRef } from "react";
import { useInView, motion } from "motion/react";
import { cn } from "@/lib/cn";

type BlurFadeProps = {
  delay?: number;
  duration?: number;
  blur?: string;
  yOffset?: number;
  inView?: boolean;
  className?: string;
  children?: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
};

function BlurFade({
  delay = 0,
  duration = 0.4,
  blur = "6px",
  yOffset = 6,
  inView = true,
  className,
  children,
  id,
  style,
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const show = !inView || isInView;

  return (
    <motion.div
      ref={ref}
      id={id}
      style={style}
      data-slot="blur-fade"
      initial={{ opacity: 0, filter: `blur(${blur})`, y: yOffset }}
      animate={
        show
          ? { opacity: 1, filter: "blur(0px)", y: 0 }
          : { opacity: 0, filter: `blur(${blur})`, y: yOffset }
      }
      transition={{ delay, duration, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export { BlurFade, type BlurFadeProps };
