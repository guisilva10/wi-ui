"use client";

import { Globe } from "@/shared/ui/components/globe/globe";

export function GlobeDemo() {
  return (
    <div className="bg-background relative h-[300px] w-full overflow-hidden rounded-lg border">
      <Globe className="absolute inset-0 h-full w-full" />
    </div>
  );
}

export function GlobeWireframeDemo() {
  return (
    <div className="bg-background relative h-[300px] w-full overflow-hidden rounded-lg border">
      <Globe
        wireColor="#a855f7"
        speed={0.8}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
