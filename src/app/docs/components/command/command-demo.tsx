"use client";

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/shared/ui/components/command/command";

export function CommandDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <Command className="border-border w-80 rounded-xl border shadow-sm">
        <CommandInput placeholder="Buscar comando..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          <CommandGroup heading="Sugestoes">
            <CommandItem>
              <span>Calendario</span>
            </CommandItem>
            <CommandItem>
              <span>Busca</span>
              <CommandShortcut>⌘K</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Configuracoes</span>
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Acoes">
            <CommandItem>
              <span>Novo arquivo</span>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Salvar</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
