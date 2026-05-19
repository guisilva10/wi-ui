"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/ui/components/popover/popover";
import { Button } from "@/shared/ui/components/button/button";

export function PopoverDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Abrir Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Configuracoes</h4>
            <p className="text-muted-foreground text-xs">
              Ajuste as preferencias do componente aqui.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
