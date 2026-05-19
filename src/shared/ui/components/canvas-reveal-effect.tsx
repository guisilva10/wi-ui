"use client";

import { cn } from "@/lib/cn";
import { useEffect, useRef } from "react";

interface CanvasRevealEffectProps {
  animationSpeed?: number;
  containerClassName?: string;
  colors?: [number, number, number][];
  dotSize?: number;
  opacities?: number[];
}

function CanvasRevealEffect({
  animationSpeed = 3,
  containerClassName,
  colors = [[0, 255, 255]],
  dotSize = 3,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
}: CanvasRevealEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const resizeCanvas = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resizeCanvas();

    const startTime = Date.now();

    function draw() {
      if (!ctx || !canvas) return;

      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed * animationSpeed * 0.3, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.floor(canvas.width / (dotSize * 3));
      const rows = Math.floor(canvas.height / (dotSize * 3));

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSize * 3 + dotSize;
          const y = j * dotSize * 3 + dotSize;

          const distFromCenter = Math.sqrt(
            Math.pow((x - canvas.width / 2) / canvas.width, 2) +
              Math.pow((y - canvas.height / 2) / canvas.height, 2),
          );

          const revealProgress = Math.max(0, progress - distFromCenter * 0.5);
          if (revealProgress <= 0) continue;

          const randomSeed = (i * 7 + j * 13) % opacities.length;
          const opacity = opacities[randomSeed] * revealProgress;
          const color = colors[(i + j) % colors.length];

          ctx.beginPath();
          ctx.arc(x, y, dotSize * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`;
          ctx.fill();
        }
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(draw);
      }
    }

    animationRef.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(animationRef.current);
      ro.disconnect();
    };
  }, [animationSpeed, colors, dotSize, opacities]);

  return (
    <div className={cn("h-full w-full", containerClassName)}>
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
}

export { CanvasRevealEffect };
