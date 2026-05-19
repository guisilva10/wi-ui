"use client";

import { SparkleButton } from "@/shared/ui/components/sparkle-button";

export function SparkleButtonDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <SparkleButton size="lg">Garantir minha vaga</SparkleButton>
      <SparkleButton size="md">Comecar agora</SparkleButton>
      <SparkleButton size="sm">Saiba mais</SparkleButton>
    </div>
  );
}
