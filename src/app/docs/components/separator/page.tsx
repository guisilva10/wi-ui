import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { Separator } from "@/shared/ui/components/separator";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Separator" },
];

const TOC = [
  { id: "horizontal", label: "Horizontal", level: 2 },
  { id: "vertical", label: "Vertical", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Orientacao do separador",
  },
  {
    name: "decorative",
    type: "boolean",
    default: "true",
    description:
      "Se true, usa role=none (ornamental). Se false, usa role=separator",
  },
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais",
  },
];

export default function SeparatorPage() {
  return (
    <DocPage
      title="Separator"
      description="Linha divisoria horizontal ou vertical para separar secoes de conteudo."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="horizontal" title="Horizontal">
        <ComponentPreview
          code={`<div>
  <p>Secao acima</p>
  <Separator className="my-4" />
  <p>Secao abaixo</p>
</div>`}
        >
          <div className="w-full max-w-sm">
            <p className="text-muted-foreground text-sm">Secao acima</p>
            <Separator className="my-4" />
            <p className="text-muted-foreground text-sm">Secao abaixo</p>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="vertical" title="Vertical">
        <ComponentPreview
          code={`<div className="flex h-8 items-center gap-4">
  <span>Item A</span>
  <Separator orientation="vertical" />
  <span>Item B</span>
  <Separator orientation="vertical" />
  <span>Item C</span>
</div>`}
        >
          <div className="flex h-8 items-center gap-4">
            <span className="text-muted-foreground text-sm">Item A</span>
            <Separator orientation="vertical" />
            <span className="text-muted-foreground text-sm">Item B</span>
            <Separator orientation="vertical" />
            <span className="text-muted-foreground text-sm">Item C</span>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
