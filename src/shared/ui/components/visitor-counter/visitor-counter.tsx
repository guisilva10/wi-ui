"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";

type VisitorCounterVariant = "dot" | "pulse" | "bar";

interface VisitorCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
  variant?: VisitorCounterVariant;
  label?: string;
  simulateActivity?: boolean;
}

function VisitorCounter({
  count: initialCount,
  variant = "dot",
  label = "pessoas vendo agora",
  simulateActivity = false,
  className,
  ...props
}: VisitorCounterProps) {
  const [count, setCount] = useState(initialCount);
  const [prevCount, setPrevCount] = useState(initialCount);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    startTransition(() => {
      setCount(initialCount);
      setPrevCount(initialCount);
    });
  }, [initialCount]);

  useEffect(() => {
    if (!simulateActivity) return;

    intervalRef.current = setInterval(() => {
      const delta = Math.floor(Math.random() * 7) - 3;
      setCount((prev) => {
        const next = Math.max(1, prev + delta);
        setPrevCount(prev);
        return next;
      });
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [simulateActivity]);

  const isIncreasing = count > prevCount;

  if (variant === "bar") {
    return (
      <div
        role="status"
        aria-label={`${count} ${label}`}
        className={cn(
          "bg-muted flex items-center gap-3 rounded-full px-4 py-2",
          className,
        )}
        {...props}
      >
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <motion.div
              key={i}
              className="w-1.5 rounded-full bg-emerald-500"
              animate={{
                height: [8, 16, 8],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <span className="text-foreground text-sm">
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              initial={{ y: isIncreasing ? -10 : 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: isIncreasing ? 10 : -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-block font-bold"
            >
              {count}
            </motion.span>
          </AnimatePresence>{" "}
          {label}
        </span>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div
        role="status"
        aria-label={`${count} ${label}`}
        className={cn("inline-flex items-center gap-2", className)}
        {...props}
      >
        <span className="relative flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
        </span>
        <span className="text-foreground text-sm">
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              initial={{ y: isIncreasing ? -10 : 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: isIncreasing ? 10 : -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-block font-bold"
            >
              {count}
            </motion.span>
          </AnimatePresence>{" "}
          <span className="text-muted-foreground">{label}</span>
        </span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-label={`${count} ${label}`}
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    >
      <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
      <span className="text-muted-foreground text-sm">
        <AnimatePresence mode="wait">
          <motion.span
            key={count}
            initial={{ y: isIncreasing ? -8 : 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: isIncreasing ? 8 : -8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-foreground inline-block font-semibold"
          >
            {count}
          </motion.span>
        </AnimatePresence>{" "}
        {label}
      </span>
    </div>
  );
}

export { VisitorCounter, type VisitorCounterProps, type VisitorCounterVariant };
