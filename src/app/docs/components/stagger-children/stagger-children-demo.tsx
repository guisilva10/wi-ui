"use client";

import { useState } from "react";
import { StaggerChildren } from "@/shared/ui/components/stagger-children";

const ITEMS = [
  "Primeiro item da lista",
  "Segundo item da lista",
  "Terceiro item da lista",
  "Quarto item da lista",
];

interface StaggerChildrenDemoProps {
  staggerDelay?: number;
}

export function StaggerChildrenDemo({
  staggerDelay = 0.1,
}: StaggerChildrenDemoProps) {
  const [key, setKey] = useState(0);

  return (
    <div className="space-y-4">
      <StaggerChildren
        key={key}
        staggerDelay={staggerDelay}
        once={false}
        className="space-y-2"
      >
        {ITEMS.map((item) => (
          <div key={item} className="bg-muted rounded-lg px-4 py-3 text-sm">
            {item}
          </div>
        ))}
      </StaggerChildren>
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
