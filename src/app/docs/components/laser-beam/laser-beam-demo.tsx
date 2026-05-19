"use client";

import { LaserBeam } from "@/shared/ui/components/laser-beam/laser-beam";

export function LaserBeamDemo() {
  return (
    <div className="bg-background relative h-[300px] w-full overflow-hidden rounded-lg border">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Laser Beam Effect</p>
      </div>
      <LaserBeam
        color="oklch(0.8234 0.1927 206.47)"
        duration={2}
        direction="top-to-bottom"
        glow
      />
    </div>
  );
}

export function LaserBeamHorizontalDemo() {
  return (
    <div className="bg-background relative h-[300px] w-full overflow-hidden rounded-lg border">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Horizontal Direction</p>
      </div>
      <LaserBeam
        color="#f43f5e"
        duration={1.5}
        direction="left-to-right"
        thickness={3}
        glow
      />
    </div>
  );
}

export function LaserBeamDiagonalDemo() {
  return (
    <div className="bg-background relative h-[300px] w-full overflow-hidden rounded-lg border">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Diagonal Direction</p>
      </div>
      <LaserBeam
        color="#a855f7"
        duration={3}
        direction="diagonal"
        thickness={2}
        glow
      />
    </div>
  );
}
