"use client";

import { Particles } from "@/shared/ui/components/particles/particles";

export function ParticlesDemo() {
  return (
    <div className="bg-background border-border relative h-[300px] w-full overflow-hidden rounded-lg border">
      <Particles
        quantity={60}
        speed={0.5}
        size={2}
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-foreground font-semibold">Particles Effect</p>
      </div>
    </div>
  );
}

export function ParticlesWithLinesDemo() {
  return (
    <div className="bg-background border-border relative h-[300px] w-full overflow-hidden rounded-lg border">
      <Particles
        quantity={40}
        speed={0.3}
        size={2}
        connectDistance={120}
        showLines
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-foreground font-semibold">Com linhas de conexao</p>
      </div>
    </div>
  );
}
