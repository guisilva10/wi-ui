"use client";

import { DotGrid } from "@/shared/ui/components/dot-grid";

export function DotGridDemo() {
  return (
    <div className="border-border bg-background relative flex h-48 w-full items-center justify-center overflow-hidden rounded-xl border">
      <DotGrid />
      <div className="relative z-10 text-center">
        <p className="text-foreground text-lg font-semibold">
          Background animado
        </p>
        <p className="text-muted-foreground text-sm">
          Grade de pontos com ondas
        </p>
      </div>
    </div>
  );
}
