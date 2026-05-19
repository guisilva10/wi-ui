"use client";

import { DarkVeil } from "@/shared/ui/components/dark-veil";

interface DarkVeilDemoProps {
  variant?: "default" | "effects";
}

export function DarkVeilDemo({ variant = "default" }: DarkVeilDemoProps) {
  if (variant === "effects") {
    return (
      <div className="relative h-[300px] w-full overflow-hidden rounded-xl">
        <DarkVeil
          hueShift={120}
          scanlineIntensity={0.3}
          noiseIntensity={0.05}
          warpAmount={0.5}
          className="rounded-xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-sm font-medium text-white/80">
            hueShift + scanlines + noise + warp
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-xl">
      <DarkVeil className="rounded-xl" />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-sm font-medium text-white/80">DarkVeil padrao</p>
      </div>
    </div>
  );
}
