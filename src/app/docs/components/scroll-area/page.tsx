import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { ScrollAreaDemo, ScrollAreaHorizontalDemo } from "./scroll-area-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Scroll Area" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "horizontal", label: "Horizontal", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "orientation",
    type: '"vertical" | "horizontal" | "both"',
    default: '"vertical"',
    description: "Direcao do scroll permitido",
  },
  {
    name: "className",
    type: "string",
    description: "Classes CSS para o container. Defina h-* e w-* aqui",
  },
];

export default function ScrollAreaPage() {
  return (
    <DocPage
      title="Scroll Area"
      description="Area scrollavel com scrollbar customizada e esteticamente consistente. Suporta scroll vertical, horizontal ou ambos. Zero dependencias externas."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="scroll-area" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { ScrollArea } from "@/components/scroll-area";

<ScrollArea className="h-64 w-56 rounded-xl border">
  <div className="p-4 space-y-2">
    {items.map((item) => (
      <div key={item} className="rounded-md p-2 text-sm">{item}</div>
    ))}
  </div>
</ScrollArea>`}
        >
          <ScrollAreaDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="horizontal" title="Horizontal">
        <p className="text-muted-foreground text-sm">
          Use{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            orientation=&quot;horizontal&quot;
          </code>{" "}
          para scroll lateral.
        </p>
        <ComponentPreview
          code={`<ScrollArea orientation="horizontal" className="w-72 rounded-xl border">
  <div className="flex gap-3 p-4">
    {items.map((item) => (
      <div key={item} className="shrink-0 rounded-md px-4 py-2 text-sm">{item}</div>
    ))}
  </div>
</ScrollArea>`}
        >
          <ScrollAreaHorizontalDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
