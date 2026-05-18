import { DocPage } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { Button } from "@/shared/ui/components/button";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Button" },
];

const PROPS = [
  {
    name: "variant",
    type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"',
    default: '"default"',
    description: "Estilo visual do botão",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "icon"',
    default: '"md"',
    description: "Tamanho do botão",
  },
  {
    name: "isLoading",
    type: "boolean",
    default: "false",
    description: "Exibe spinner e desabilita o botão",
  },
  {
    name: "loadingText",
    type: "string",
    default: "—",
    description: "Texto exibido durante loading",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Desabilita o botão",
  },
  {
    name: "className",
    type: "string",
    default: "—",
    description: "Classes CSS adicionais",
  },
];

export default function ButtonPage() {
  return (
    <DocPage
      title="Button"
      description="Botão acessível com múltiplas variantes, tamanhos e suporte a estado de loading."
      breadcrumbs={BREADCRUMBS}
    >
      {/* Variantes */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Variantes</h2>
        <ComponentPreview
          code={`<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}
        >
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        </ComponentPreview>
      </section>

      {/* Tamanhos */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Tamanhos</h2>
        <ComponentPreview
          code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </ComponentPreview>
      </section>

      {/* Loading */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Loading</h2>
        <ComponentPreview
          code={`<Button isLoading loadingText="Salvando...">Salvar</Button>
<Button isLoading variant="outline">Carregando</Button>`}
        >
          <div className="flex gap-3">
            <Button isLoading loadingText="Salvando...">
              Salvar
            </Button>
            <Button isLoading variant="outline">
              Carregando
            </Button>
          </div>
        </ComponentPreview>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Desabilitado</h2>
        <ComponentPreview
          code={`<Button disabled>Desabilitado</Button>
<Button disabled variant="outline">Outline</Button>`}
        >
          <div className="flex gap-3">
            <Button disabled>Desabilitado</Button>
            <Button disabled variant="outline">
              Outline
            </Button>
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
