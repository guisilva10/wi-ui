"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";
import { Avatar } from "@/shared/ui/components/avatar";

type SocialProofType = "purchase" | "signup" | "viewing";

interface SocialProofData {
  name: string;
  action?: string;
  time?: string;
  avatar?: string;
}

type SocialProofVariant = "compact" | "full" | "minimal";
type SocialProofPosition =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

interface SocialProofProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: SocialProofType;
  data: SocialProofData | SocialProofData[];
  variant?: SocialProofVariant;
  position?: SocialProofPosition;
  autoRotate?: boolean;
  interval?: number;
  fixed?: boolean;
}

const TYPE_DEFAULTS: Record<SocialProofType, string> = {
  purchase: "acabou de comprar",
  signup: "acabou de se cadastrar",
  viewing: "está vendo agora",
};

const POSITION_CLASSES: Record<SocialProofPosition, string> = {
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
};

function SocialProof({
  type = "purchase",
  data,
  variant = "full",
  position = "bottom-left",
  autoRotate = true,
  interval = 4000,
  fixed = true,
  className,
  ...props
}: SocialProofProps) {
  const items = Array.isArray(data) ? data : [data];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!autoRotate || items.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
        setVisible(true);
      }, 300);
    }, interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoRotate, interval, items.length]);

  const current = items[currentIndex];
  if (!current) return null;

  const actionText = current.action ?? TYPE_DEFAULTS[type];

  const containerClass = cn(
    fixed && `fixed z-50 ${POSITION_CLASSES[position]}`,
    "max-w-xs",
    className,
  );

  if (variant === "minimal") {
    return (
      <div className={containerClass} {...props}>
        <AnimatePresence mode="wait">
          {visible && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="bg-muted/80 text-muted-foreground rounded-full px-3 py-1 text-xs backdrop-blur-sm"
            >
              <span className="text-foreground font-medium">
                {current.name}
              </span>{" "}
              {actionText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={containerClass} {...props}>
        <AnimatePresence mode="wait">
          {visible && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card border-border flex items-center gap-2 rounded-lg border px-3 py-2 shadow-sm"
            >
              <span className="text-primary text-base">
                {type === "purchase" ? "🛒" : type === "signup" ? "👋" : "👀"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-foreground truncate text-xs">
                  <span className="font-semibold">{current.name}</span>{" "}
                  {actionText}
                </p>
                {current.time && (
                  <p className="text-muted-foreground text-xs">
                    {current.time}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={containerClass} {...props}>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-card border-border flex items-center gap-3 rounded-xl border p-3 shadow-md"
            role="status"
            aria-live="polite"
          >
            <Avatar src={current.avatar} fallback={current.name} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-foreground text-sm">
                <span className="font-semibold">{current.name}</span>{" "}
                <span className="text-muted-foreground">{actionText}</span>
              </p>
              {current.time && (
                <p className="text-muted-foreground text-xs">{current.time}</p>
              )}
            </div>
            <span aria-hidden className="text-base">
              {type === "purchase" ? "🛒" : type === "signup" ? "👋" : "👀"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export {
  SocialProof,
  type SocialProofProps,
  type SocialProofData,
  type SocialProofType,
  type SocialProofVariant,
  type SocialProofPosition,
};
