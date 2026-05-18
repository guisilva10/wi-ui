import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { Spinner } from "@/shared/ui/components/spinner";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Spinner" },
];

const TOC = [
  { id: "tamanhos", label: "Tamanhos", level: 2 },
  { id: "label-customizado", label: "Com label customizado", level: 2 },
  { id: "cor-customizada", label: "Cor customizada", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Tamanho do spinner",
  },
  {
    name: "label",
    type: "string",
    default: '"Carregando..."',
    description: "Texto acessivel para leitores de tela (aria-label)",
  },
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais",
  },
];

export default function SpinnerPage() {
  return (
    <DocPage
      title="Spinner"
      description="Indicador de carregamento animado. Semantico e acessivel com aria-label."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="tamanhos" title="Tamanhos">
        <ComponentPreview
          code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`}
        >
          <div className="flex items-center gap-6">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="label-customizado" title="Com label customizado">
        <ComponentPreview
          code={`<Spinner label="Enviando dados..." />
<Spinner label="Autenticando..." size="lg" />`}
        >
          <div className="flex items-center gap-6">
            <Spinner label="Enviando dados..." />
            <Spinner label="Autenticando..." size="lg" />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="cor-customizada" title="Cor customizada">
        <ComponentPreview
          code={`<Spinner className="text-blue-500" />
<Spinner className="text-green-500" />
<Spinner className="text-red-500" />`}
        >
          <div className="flex items-center gap-6">
            <Spinner className="text-blue-500" />
            <Spinner className="text-green-500" />
            <Spinner className="text-red-500" />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
