import { DocPage } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { Badge } from "@/shared/ui/components/badge";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Badge" },
];

const PROPS = [
  {
    name: "variant",
    type: '"default" | "secondary" | "outline" | "destructive" | "success" | "warning"',
    default: '"default"',
    description: "Estilo visual do badge",
  },
  {
    name: "className",
    type: "string",
    default: "—",
    description: "Classes CSS adicionais",
  },
];

export default function BadgePage() {
  return (
    <DocPage
      title="Badge"
      description="Elemento inline para labels, status e categorias. Múltiplas variantes semânticas."
      breadcrumbs={BREADCRUMBS}
    >
      {/* Todas variantes */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Variantes</h2>
        <ComponentPreview
          code={`<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>`}
        >
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
          </div>
        </ComponentPreview>
      </section>

      {/* Uso semântico */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Uso semântico</h2>
        <ComponentPreview
          code={`<Badge variant="success">Ativo</Badge>
<Badge variant="destructive">Inativo</Badge>
<Badge variant="warning">Pendente</Badge>
<Badge variant="secondary">Rascunho</Badge>`}
        >
          <div className="flex flex-wrap gap-3">
            <Badge variant="success">Ativo</Badge>
            <Badge variant="destructive">Inativo</Badge>
            <Badge variant="warning">Pendente</Badge>
            <Badge variant="secondary">Rascunho</Badge>
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
