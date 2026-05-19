"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/components/dialog";

export function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="bg-foreground text-background hover:bg-foreground/90 inline-flex h-9 items-center rounded-md px-4 text-sm font-medium"
      >
        Abrir Dialog
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar acao</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja continuar? Esta acao nao pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <button
              onClick={() => setOpen(false)}
              className="border-border hover:bg-accent inline-flex h-9 items-center rounded-md border px-4 text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={() => setOpen(false)}
              className="bg-foreground text-background hover:bg-foreground/90 inline-flex h-9 items-center rounded-md px-4 text-sm font-medium"
            >
              Confirmar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
