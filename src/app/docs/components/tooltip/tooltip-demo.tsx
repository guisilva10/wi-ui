"use client";

import { Tooltip } from "@/shared/ui/components/tooltip";

export function TooltipDemo() {
  return (
    <Tooltip content="Adicionar ao projeto">
      <button className="border-border hover:bg-accent inline-flex h-9 items-center rounded-md border px-4 text-sm">
        Hover aqui
      </button>
    </Tooltip>
  );
}
