"use client";

import { useState } from "react";
import { Confetti } from "@/shared/ui/components/confetti";

export function ConfettiDemo() {
  const [active, setActive] = useState(false);

  function handleCelebrate() {
    setActive(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setActive(true);
      });
    });
  }

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <Confetti isActive={active} onComplete={() => setActive(false)} />
      <p className="text-muted-foreground text-sm">
        Clique no botao para disparar o confetti
      </p>
      <button
        onClick={handleCelebrate}
        className="bg-foreground text-background rounded-lg px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
      >
        Celebrar
      </button>
    </div>
  );
}
