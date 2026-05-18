import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { Button } from "@/shared/ui/components/button";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Button" },
];

const TOC = [
  { id: "variantes", label: "Variantes", level: 2 },
  { id: "tamanhos", label: "Tamanhos", level: 2 },
  { id: "loading", label: "Loading", level: 2 },
  { id: "desabilitado", label: "Desabilitado", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "variant",
    type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"',
    default: '"default"',
    description: "Estilo visual do botao",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "icon"',
    default: '"md"',
    description: "Tamanho do botao",
  },
  {
    name: "isLoading",
    type: "boolean",
    default: "false",
    description: "Exibe spinner e desabilita o botao",
  },
  {
    name: "loadingText",
    type: "string",
    default: "--",
    description: "Texto exibido durante loading",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Desabilita o botao",
  },
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais",
  },
];

export default function ButtonPage() {
  return (
    <DocPage
      title="Button"
      description="Botao acessivel com multiplas variantes, tamanhos e suporte a estado de loading."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      {/* Variantes */}
      <DocSection id="variantes" title="Variantes">
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
      </DocSection>

      {/* Tamanhos */}
      <DocSection id="tamanhos" title="Tamanhos">
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
      </DocSection>

      {/* Loading */}
      <DocSection id="loading" title="Loading">
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
      </DocSection>

      {/* Disabled */}
      <DocSection id="desabilitado" title="Desabilitado">
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
      </DocSection>

      {/* Props */}
      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
