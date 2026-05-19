"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

interface DotGridProps extends React.ComponentProps<"canvas"> {
  gap?: number;
  dotRadius?: number;
  waveSpeed?: number;
  waveCenter?: { x: number; y: number };
}

function DotGrid({
  className,
  gap = 32,
  dotRadius = 1,
  waveSpeed = 0.008,
  waveCenter = { x: 0.65, y: 0.4 },
  ...props
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let time = 0;
    let animId: number;

    const getColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark ? "180, 200, 255" : "30, 64, 175";
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const color = getColor();
      const isDark = document.documentElement.classList.contains("dark");
      const baseAlpha = isDark ? 0.12 : 0.1;
      const waveAlpha = isDark ? 0.25 : 0.18;
      time += waveSpeed;

      for (let x = gap; x < rect.width; x += gap) {
        for (let y = gap; y < rect.height; y += gap) {
          const dist = Math.sqrt(
            (x - rect.width * waveCenter.x) ** 2 +
              (y - rect.height * waveCenter.y) ** 2,
          );
          const wave = Math.sin(dist * 0.012 - time * 2) * 0.5 + 0.5;
          const alpha = baseAlpha + wave * waveAlpha;
          const r = dotRadius + wave * 0.6;

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${alpha})`;
          ctx.fill();
        }
      }

      if (!reduced) animId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [gap, dotRadius, waveSpeed, waveCenter]);

  return (
    <canvas
      ref={canvasRef}
      data-slot="dot-grid"
      aria-hidden="true"
      role="presentation"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className,
      )}
      {...props}
    />
  );
}

export { DotGrid, type DotGridProps };
