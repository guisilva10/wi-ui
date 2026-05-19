"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

interface ParticlesProps extends React.ComponentProps<"canvas"> {
  quantity?: number;
  speed?: number;
  color?: string;
  size?: number;
  connectDistance?: number;
  showLines?: boolean;
}

function Particles({
  quantity = 50,
  speed = 0.5,
  color,
  size = 2,
  connectDistance = 100,
  showLines = false,
  className,
  ...props
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animId: number;

    const getColor = () => {
      if (color) return color;
      const isDark = document.documentElement.classList.contains("dark");
      return isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.3)";
    };

    const getLineColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark ? "rgba(255,255,255," : "rgba(0,0,0,";
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();

    const rect = canvas.getBoundingClientRect();

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
    }

    const particles: Particle[] = Array.from({ length: quantity }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
    }));

    const animate = () => {
      const r = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      const c = getColor();
      const lineBase = getLineColor();

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > r.width) p.vx *= -1;
        if (p.y < 0 || p.y > r.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = c;
        ctx.fill();
      }

      if (showLines) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectDistance) {
              const alpha = (1 - dist / connectDistance) * 0.15;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `${lineBase}${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
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
  }, [quantity, speed, color, size, connectDistance, showLines]);

  return (
    <canvas
      ref={canvasRef}
      data-slot="particles"
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

export { Particles, type ParticlesProps };
