"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

function AnimatedSphere({
  className,
  ...props
}: React.ComponentProps<"canvas">) {
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
    const chars = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";
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
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const radius = Math.min(rect.width, rect.height) * 0.525;
      ctx.font = "12px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const points: { x: number; y: number; z: number; char: string }[] = [];

      for (let phi = 0; phi < Math.PI * 2; phi += 0.15) {
        for (let theta = 0; theta < Math.PI; theta += 0.15) {
          const sx = Math.sin(theta) * Math.cos(phi + time * 0.5);
          const sy = Math.sin(theta) * Math.sin(phi + time * 0.5);
          const sz = Math.cos(theta);
          const rotY = time * 0.3;
          const nx = sx * Math.cos(rotY) - sz * Math.sin(rotY);
          const nz = sx * Math.sin(rotY) + sz * Math.cos(rotY);
          const rotX = time * 0.2;
          const ny = sy * Math.cos(rotX) - nz * Math.sin(rotX);
          const fz = sy * Math.sin(rotX) + nz * Math.cos(rotX);
          const depth = (fz + 1) / 2;
          const charIndex = Math.floor(depth * (chars.length - 1));
          points.push({
            x: centerX + nx * radius,
            y: centerY + ny * radius,
            z: fz,
            char: chars[charIndex],
          });
        }
      }

      points.sort((a, b) => a.z - b.z);
      points.forEach((p) => {
        const alpha = 0.2 + (p.z + 1) * 0.4;
        ctx.fillStyle = `rgba(${inkColor}, ${alpha})`;
        ctx.fillText(p.char, p.x, p.y);
      });
    };

    if (reduced) {
      drawFrame();
      return () => window.removeEventListener("resize", resize);
    }

    const render = () => {
      drawFrame();
      time += 0.02;
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
      data-slot="animated-sphere"
      aria-hidden="true"
      role="presentation"
      className={cn("block h-full w-full", className)}
      {...props}
    />
  );
}

export { AnimatedSphere };
