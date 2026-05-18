import { DocPage } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { Separator } from "@/shared/ui/components/separator";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Separator" },
];

const PROPS = [
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Orientação do separador",
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
    default: "—",
    description: "Classes CSS adicionais",
  },
];

export default function SeparatorPage() {
  return (
    <DocPage
      title="Separator"
      description="Linha divisória horizontal ou vertical para separar seções de conteúdo."
      breadcrumbs={BREADCRUMBS}
    >
      {/* Horizontal */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Horizontal</h2>
        <ComponentPreview
          code={`<div>
  <p>Seção acima</p>
  <Separator className="my-4" />
  <p>Seção abaixo</p>
</div>`}
        >
          <div className="w-full max-w-sm">
            <p className="text-muted-foreground text-sm">Seção acima</p>
            <Separator className="my-4" />
            <p className="text-muted-foreground text-sm">Seção abaixo</p>
          </div>
        </ComponentPreview>
      </section>

      {/* Vertical */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Vertical</h2>
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
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Props</h2>
        <PropsTable props={PROPS} />
      </section>
    </DocPage>
  );
}
