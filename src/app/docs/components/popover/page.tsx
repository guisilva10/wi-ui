import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { PopoverDemo } from "./popover-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Popover" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "open",
    type: "boolean",
    description: "Controla o estado aberto/fechado (modo controlado)",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Callback disparado quando o estado muda",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Estado inicial quando nao controlado",
  },
  {
    name: "align (PopoverContent)",
    type: '"start" | "center" | "end"',
    default: '"center"',
    description: "Alinhamento horizontal do conteudo em relacao ao trigger",
  },
  {
    name: "sideOffset (PopoverContent)",
    type: "number",
    default: "8",
    description: "Distancia em pixels entre o trigger e o conteudo",
  },
];

export default function PopoverPage() {
  return (
    <DocPage
      title="Popover"
      description="Painel flutuante posicionado ao redor de um elemento trigger. Fecha ao clicar fora ou pressionar Escape. Suporta modo controlado e nao-controlado."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="popover" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Popover, PopoverTrigger, PopoverContent } from "@/components/popover";
import { Button } from "@/components/button";

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Abrir Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="space-y-2">
      <h4 className="font-semibold text-sm">Configuracoes</h4>
      <p className="text-muted-foreground text-xs">
        Ajuste as preferencias aqui.
      </p>
    </div>
  </PopoverContent>
</Popover>`}
        >
          <PopoverDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
