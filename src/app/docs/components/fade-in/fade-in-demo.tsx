"use client";

import { useState } from "react";
import { FadeIn } from "@/shared/ui/components/fade-in";
import type { FadeInDirection } from "@/shared/ui/components/fade-in";

interface FadeInDemoProps {
  direction?: FadeInDirection;
}

export function FadeInDemo({ direction = "up" }: FadeInDemoProps) {
  const [key, setKey] = useState(0);

  return (
    <div className="space-y-4">
      <FadeIn key={key} direction={direction} once={false}>
        <div className="bg-muted rounded-xl p-8 text-center">
          <p className="text-foreground text-sm font-medium">
            Conteudo com fade ({direction})
          </p>
        </div>
      </FadeIn>
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
