import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { CommandDemo } from "./command-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Command" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "subcomponentes", label: "Subcomponentes", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "Command",
    type: "div",
    description: "Container raiz com contexto de busca e navegacao por teclado",
  },
  {
    name: "CommandInput",
    type: "input",
    description: "Campo de busca que filtra os itens automaticamente",
  },
  {
    name: "CommandList",
    type: "div",
    description: "Container scrollavel para os grupos e itens",
  },
  {
    name: "CommandEmpty",
    type: "div",
    description: "Exibido quando nenhum item corresponde a busca",
  },
  {
    name: "CommandGroup",
    type: "div",
    description: "Agrupa itens relacionados com um titulo opcional",
  },
  {
    name: "CommandItem",
    type: "div",
    description: "Item clicavel e navegavel por teclado",
  },
  {
    name: "CommandSeparator",
    type: "div",
    description: "Linha divisoria entre grupos",
  },
  {
    name: "CommandShortcut",
    type: "span",
    description: "Atalho de teclado exibido a direita do item",
  },
  {
    name: "CommandDialog",
    type: "dialog",
    description: "Versao modal do Command, abre em overlay centralizado",
  },
];

export default function CommandPage() {
  return (
    <DocPage
      title="Command"
      description="Paleta de comandos com busca em tempo real e navegacao por teclado. Suporta grupos, atalhos e estado vazio customizavel. Pode ser usado inline ou como dialog."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="command" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/command";

<Command className="w-80 rounded-xl border shadow-sm">
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
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Acoes">
      <CommandItem>
        <span>Novo arquivo</span>
        <CommandShortcut>⌘N</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
        >
          <CommandDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="subcomponentes" title="Subcomponentes">
        <p className="text-muted-foreground text-sm">
          Todos os subcomponentes sao exportados individualmente e compostos
          livremente. Use{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            CommandDialog
          </code>{" "}
          para abrir como modal com overlay.
        </p>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
