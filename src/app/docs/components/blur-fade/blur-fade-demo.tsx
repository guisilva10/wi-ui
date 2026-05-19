"use client";

import { BlurFade } from "@/shared/ui/components/blur-fade/blur-fade";

export function BlurFadeDemo() {
  const items = [
    "Componente 1",
    "Componente 2",
    "Componente 3",
    "Componente 4",
  ];

  return (
    <div className="space-y-3 p-4">
      {items.map((item, i) => (
        <BlurFade key={item} delay={i * 0.1}>
          <div className="bg-muted/40 border-border rounded-lg border p-4">
            <p className="font-medium">{item}</p>
            <p className="text-muted-foreground text-sm">
              Aparece com blur fade com delay escalonado.
            </p>
          </div>
        </BlurFade>
      ))}
    </div>
  );
}
