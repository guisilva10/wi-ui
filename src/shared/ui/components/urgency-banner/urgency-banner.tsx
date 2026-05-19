"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const urgencyBannerVariants = cva(
  "w-full px-4 py-2.5 text-sm font-medium",
  {
    variants: {
      variant: {
        info: "bg-muted text-foreground border-b border-border",
        warning:
          "bg-amber-50 text-amber-900 border-b border-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-800",
        critical:
          "bg-destructive text-destructive-foreground border-b border-destructive/80",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  },
);

interface UrgencyBannerCta {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface UrgencyBannerProps extends VariantProps<
  typeof urgencyBannerVariants
> {
  message: string;
  targetDate?: Date | string;
  dismissable?: boolean;
  cta?: UrgencyBannerCta;
  sticky?: boolean;
  className?: string;
  id?: string;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetDate: Date | string): TimeLeft {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function UrgencyBanner({
  message,
  targetDate,
  variant = "warning",
  dismissable = true,
  cta,
  sticky = true,
  className,
  id,
}: UrgencyBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    targetDate ? getTimeLeft(targetDate) : null,
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!targetDate) return;

    intervalRef.current = setInterval(() => {
      const tl = getTimeLeft(targetDate);
      setTimeLeft(tl);
      const total = tl.hours * 3600 + tl.minutes * 60 + tl.seconds;
      if (total === 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [targetDate]);

  const countdownText = timeLeft
    ? `${pad(timeLeft.hours)}:${pad(timeLeft.minutes)}:${pad(timeLeft.seconds)}`
    : null;

  const fullMessage = countdownText
    ? message.replace("{countdown}", countdownText)
    : message;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          role="banner"
          aria-live="polite"
          id={id}
          className={cn(
            urgencyBannerVariants({ variant }),
            sticky && "sticky top-0 z-50",
            className,
          )}
        >
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-2">
            <div className="flex flex-1 flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
              <span>{fullMessage}</span>
              {countdownText && !message.includes("{countdown}") && (
                <span className="font-mono font-bold">{countdownText}</span>
              )}
              {cta &&
                (cta.href ? (
                  <a
                    href={cta.href}
                    className="ml-2 underline underline-offset-2 hover:no-underline"
                  >
                    {cta.label}
                  </a>
                ) : (
                  <button
                    onClick={cta.onClick}
                    className="ml-2 underline underline-offset-2 hover:no-underline"
                  >
                    {cta.label}
                  </button>
                ))}
            </div>
            {dismissable && (
              <button
                onClick={() => setDismissed(true)}
                aria-label="Fechar aviso"
                className="shrink-0 rounded-full p-0.5 opacity-70 transition-opacity hover:opacity-100"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { UrgencyBanner, type UrgencyBannerProps, type UrgencyBannerCta };
