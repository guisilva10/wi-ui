"use client";

import { useState } from "react";
import { ScaleIn } from "@/shared/ui/components/scale-in";

interface ScaleInDemoProps {
  initialScale?: number;
  duration?: number;
}

export function ScaleInDemo({
  initialScale = 0.9,
  duration = 0.4,
}: ScaleInDemoProps) {
  const [key, setKey] = useState(0);

  return (
    <div className="space-y-4">
      <ScaleIn
        key={key}
        initialScale={initialScale}
        duration={duration}
        once={false}
      >
        <div className="bg-muted rounded-xl p-8 text-center">
          <p className="text-foreground text-sm font-medium">
            Scale de {initialScale} → 1
          </p>
        </div>
      </ScaleIn>
      <div className="flex justify-center">
        <button
          onClick={() => setKey((k) => k + 1)}
          className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
        >
          Replay
        </button>
      </div>
    </div>
  );
}
