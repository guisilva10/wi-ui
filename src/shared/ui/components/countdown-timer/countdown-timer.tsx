"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const countdownVariants = cva(
  "inline-flex items-center gap-1 font-mono font-bold tabular-nums",
  {
    variants: {
      variant: {
        default: "text-foreground",
        urgent: "text-destructive animate-pulse",
        minimal: "text-muted-foreground text-sm",
      },
      size: {
        sm: "text-lg",
        md: "text-2xl",
        lg: "text-4xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof countdownVariants> {
  targetDate: Date | string;
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  expiredText?: string;
  onExpire?: () => void;
}

function getTimeLeft(targetDate: Date | string): TimeLeft {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

interface DigitProps {
  value: string;
  label: string;
  isUrgent: boolean;
  isMinimal: boolean;
}

function Digit({ value, label, isUrgent, isMinimal }: DigitProps) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className={cn(
          "relative overflow-hidden rounded-md px-2 py-1 text-center",
          isUrgent
            ? "bg-destructive/10 text-destructive"
            : isMinimal
              ? "text-muted-foreground"
              : "bg-muted text-foreground",
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="block"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      {!isMinimal && (
        <span
          className={cn(
            "text-xs font-normal tracking-wider uppercase",
            isUrgent ? "text-destructive/70" : "text-muted-foreground",
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}

function Separator({ isUrgent }: { isUrgent: boolean }) {
  return (
    <span
      className={cn(
        "mb-4 self-start pt-1 font-bold",
        isUrgent ? "text-destructive" : "text-muted-foreground",
      )}
    >
      :
    </span>
  );
}

function CountdownTimer({
  targetDate,
  variant,
  size,
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  expiredText = "Oferta encerrada",
  onExpire,
  className,
  ...props
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(targetDate),
  );
  const [expired, setExpired] = useState(false);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  });

  const totalSeconds =
    timeLeft.days * 86400 +
    timeLeft.hours * 3600 +
    timeLeft.minutes * 60 +
    timeLeft.seconds;
  const isUrgent =
    variant === "urgent" || (totalSeconds > 0 && totalSeconds <= 3600);
  const isMinimal = variant === "minimal";

  useEffect(() => {
    const tick = () => {
      const tl = getTimeLeft(targetDate);
      const total =
        tl.days * 86400 + tl.hours * 3600 + tl.minutes * 60 + tl.seconds;
      setTimeLeft(tl);
      if (total === 0) {
        setExpired(true);
        onExpireRef.current?.();
      }
    };

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (expired) {
    return (
      <div
        className={cn("text-muted-foreground text-sm font-medium", className)}
        aria-live="polite"
        {...props}
      >
        {expiredText}
      </div>
    );
  }

  const parts: Array<{ key: keyof TimeLeft; label: string; show: boolean }> = [
    { key: "days", label: "dias", show: showDays },
    { key: "hours", label: "horas", show: showHours },
    { key: "minutes", label: "min", show: showMinutes },
    { key: "seconds", label: "seg", show: showSeconds },
  ];

  const visibleParts = parts.filter((p) => p.show);

  return (
    <div
      role="timer"
      aria-label="Tempo restante"
      aria-live="polite"
      className={cn(
        countdownVariants({ variant: isUrgent ? "urgent" : variant, size }),
        "flex items-end gap-2",
        className,
      )}
      {...props}
    >
      {visibleParts.map((part, i) => (
        <span key={part.key} className="flex items-end gap-2">
          <Digit
            value={pad(timeLeft[part.key])}
            label={part.label}
            isUrgent={isUrgent}
            isMinimal={isMinimal}
          />
          {i < visibleParts.length - 1 && <Separator isUrgent={isUrgent} />}
        </span>
      ))}
    </div>
  );
}

export { CountdownTimer, type CountdownTimerProps };
