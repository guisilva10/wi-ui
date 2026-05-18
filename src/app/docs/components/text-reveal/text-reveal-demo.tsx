"use client";

import { useState } from "react";
import { TextReveal } from "@/shared/ui/components/text-reveal";
import type { TextRevealBy } from "@/shared/ui/components/text-reveal";

interface TextRevealDemoProps {
  by?: TextRevealBy;
  text?: string;
}

export function TextRevealDemo({
  by = "word",
  text = "Componentes animados para interfaces modernas",
}: TextRevealDemoProps) {
  const [key, setKey] = useState(0);

  return (
    <div className="space-y-4">
      <div className="rounded-xl p-8 text-center">
        <h2 className="text-foreground text-xl leading-tight font-bold">
          <TextReveal key={key} text={text} by={by} once={false} />
        </h2>
      </div>
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
