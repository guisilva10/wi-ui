"use client";

import { useState } from "react";
import { CanvasRevealEffect } from "@/shared/ui/components/canvas-reveal-effect";

interface CanvasRevealEffectDemoProps {
  colors?: [number, number, number][];
  animationSpeed?: number;
  dotSize?: number;
  opacities?: number[];
}

export function CanvasRevealEffectDemo({
  colors,
  animationSpeed,
  dotSize,
  opacities,
}: CanvasRevealEffectDemoProps) {
  const [key, setKey] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-black">
        <CanvasRevealEffect
          key={key}
          colors={colors}
          animationSpeed={animationSpeed}
          dotSize={dotSize}
          opacities={opacities}
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => setKey((k) => k + 1)}
          className="bg-foreground text-background rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
        >
          Replay
        </button>
      </div>
    </div>
  );
}
