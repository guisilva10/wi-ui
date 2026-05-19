"use client";

import { CanvasRevealEffect } from "@/shared/ui/components/canvas-reveal-effect";

function HeroCanvasBg() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-30 dark:opacity-50">
      <CanvasRevealEffect
        animationSpeed={1.5}
        colors={[
          [0, 180, 216],
          [0, 210, 230],
        ]}
        dotSize={2}
        opacities={[0.1, 0.1, 0.15, 0.15, 0.2, 0.2, 0.25, 0.25, 0.3, 0.3]}
      />
    </div>
  );
}

export { HeroCanvasBg };
