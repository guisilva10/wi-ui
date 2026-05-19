"use client";

import { AnimatedWave } from "@/shared/ui/components/animated-wave";

export function AnimatedWaveDemo() {
  return (
    <div className="bg-background border-border relative h-[280px] w-full overflow-hidden rounded-xl border">
      <AnimatedWave />
    </div>
  );
}
