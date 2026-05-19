"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/shared/ui/components/sheet";

export function SheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="hover:bg-accent inline-flex h-9 items-center rounded-md border px-4 text-sm"
      >
        Abrir Sheet
      </button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Configuracoes</SheetTitle>
            <SheetDescription>
              Ajuste as preferencias do seu perfil.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <p className="text-sm">Conteudo do painel lateral.</p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
