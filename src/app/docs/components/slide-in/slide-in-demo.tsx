"use client";

import { useState } from "react";
import { SlideIn } from "@/shared/ui/components/slide-in";
import type { SlideInDirection } from "@/shared/ui/components/slide-in";

interface SlideInDemoProps {
  direction?: SlideInDirection;
  distance?: number;
}

export function SlideInDemo({
  direction = "left",
  distance = 40,
}: SlideInDemoProps) {
  const [key, setKey] = useState(0);

  return (
    <div className="space-y-4">
      <SlideIn key={key} direction={direction} distance={distance} once={false}>
        <div className="bg-muted rounded-xl p-8 text-center">
          <p className="text-foreground text-sm font-medium">
            Slide from {direction} ({distance}px)
          </p>
        </div>
      </SlideIn>
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
