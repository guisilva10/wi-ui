"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

function AnimatedWave({ className, ...props }: React.ComponentProps<"canvas">) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chars = "·∘○◯◌●◉";
    let time = 0;

    const getInk = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark ? "235, 235, 235" : "20, 20, 20";
    };

    let inkColor = getInk();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      inkColor = getInk();
    };

    resize();
    window.addEventListener("resize", resize);

    const drawFrame = () => {
      inkColor = getInk();
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.font = "14px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const cols = Math.floor(rect.width / 20);
      const rows = Math.floor(rect.height / 20);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = (x + 0.5) * (rect.width / cols);
          const py = (y + 0.5) * (rect.height / rows);
          const wave1 =
            Math.sin(x * 0.2 + time * 2) * Math.cos(y * 0.15 + time);
          const wave2 = Math.sin((x + y) * 0.1 + time * 1.5);
          const wave3 = Math.cos(x * 0.1 - y * 0.1 + time * 0.8);
          const combined = (wave1 + wave2 + wave3) / 3;
          const normalized = (combined + 1) / 2;
          const charIndex = Math.floor(normalized * (chars.length - 1));
          const alpha = 0.15 + normalized * 0.5;
          ctx.fillStyle = `rgba(${inkColor}, ${alpha})`;
          ctx.fillText(chars[charIndex], px, py);
        }
      }
    };

    if (reduced) {
      drawFrame();
      return () => window.removeEventListener("resize", resize);
    }

    const render = () => {
      drawFrame();
      time += 0.03;
      frameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-slot="animated-wave"
      aria-hidden="true"
      role="presentation"
      className={cn("block h-full w-full", className)}
      {...props}
    />
  );
}

export { AnimatedWave };
