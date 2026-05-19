"use client";

import { Grainient } from "@/shared/ui/components/grainient";

export function GrainientDemo() {
  return (
    <div className="border-border relative h-[300px] w-full overflow-hidden rounded-xl border">
      <Grainient />
    </div>
  );
}

export function GrainientColorsDemo() {
  return (
    <div className="border-border relative h-[300px] w-full overflow-hidden rounded-xl border">
      <Grainient color1="#00FF87" color2="#60EFFF" color3="#001529" />
    </div>
  );
}
