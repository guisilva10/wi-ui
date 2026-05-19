"use client";

import { startTransition, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";

interface ConfettiPiece {
  id: number;
  x: number;
  xEnd: number;
  color: string;
  delay: number;
  rotation: number;
  scale: number;
  duration: number;
  isCircle: boolean;
}

interface ConfettiProps {
  isActive: boolean;
  duration?: number;
  pieceCount?: number;
  colors?: string[];
  onComplete?: () => void;
  className?: string;
}

const DEFAULT_COLORS = [
  "oklch(0.7 0.25 330)",
  "oklch(0.72 0.22 145)",
  "oklch(0.77 0.16 70)",
  "oklch(0.49 0.27 292)",
  "oklch(0.6 0.2 200)",
];

function generatePieces(pieceCount: number, colors: string[]): ConfettiPiece[] {
  return Array.from({ length: pieceCount }, (_, i) => {
    const x = Math.random() * 100;
    return {
      id: i,
      x,
      xEnd: x + (Math.random() - 0.5) * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      duration: 2 + Math.random(),
      isCircle: Math.random() > 0.5,
    };
  });
}

function Confetti({
  isActive,
  duration = 3000,
  pieceCount = 50,
  colors = DEFAULT_COLORS,
  onComplete,
  className,
}: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      startTransition(() => {
        setPieces(generatePieces(pieceCount, colors));
        setIsVisible(true);
      });

      const timer = setTimeout(() => {
        startTransition(() => {
          setIsVisible(false);
        });
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, duration, pieceCount, colors, onComplete]);

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return null;
  }

  if (!isVisible) return null;

  return (
    <div
      data-slot="confetti"
      className={cn(
        "pointer-events-none fixed inset-0 z-50 overflow-hidden",
        className,
      )}
    >
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{
              x: `${piece.x}vw`,
              y: -20,
              rotate: 0,
              scale: piece.scale,
            }}
            animate={{
              y: "110vh",
              rotate: piece.rotation + 720,
              x: `${piece.xEnd}vw`,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: [0.23, 0.98, 0.36, 0.99],
            }}
            style={{
              position: "absolute",
              width: 10,
              height: 10,
              backgroundColor: piece.color,
              borderRadius: piece.isCircle ? "50%" : "2px",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export { Confetti, type ConfettiProps };
