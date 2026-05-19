"use client";

import { LightRays } from "@/shared/ui/components/light-rays";
import type { RaysOrigin } from "@/shared/ui/components/light-rays";

interface LightRaysDemoProps {
  raysOrigin?: RaysOrigin;
}

export function LightRaysDemo({
  raysOrigin = "top-center",
}: LightRaysDemoProps) {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-black">
      <LightRays raysOrigin={raysOrigin} raysColor="#ffffff" pulsating />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-sm font-medium text-white/70">
          origin: {raysOrigin}
        </p>
      </div>
    </div>
  );
}
