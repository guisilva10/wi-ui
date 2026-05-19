import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { Spinner } from "@/shared/ui/components/spinner";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Spinner" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "sm", label: "Pequeno", level: 2 },
  { id: "md", label: "Médio", level: 2 },
  { id: "lg", label: "Grande", level: 2 },
  { id: "xl", label: "Extra Grande", level: 2 },
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
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="spinner" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Spinner } from "@/components/spinner";

<Spinner />`}
        >
          <Spinner />
        </ComponentPreview>
      </DocSection>

      <DocSection id="sm" title="Pequeno">
        <ComponentPreview code={`<Spinner size="sm" />`}>
          <Spinner size="sm" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="md" title="Médio">
        <ComponentPreview code={`<Spinner size="md" />`}>
          <Spinner size="md" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="lg" title="Grande">
        <ComponentPreview code={`<Spinner size="lg" />`}>
          <Spinner size="lg" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="xl" title="Extra Grande">
        <ComponentPreview code={`<Spinner size="xl" />`}>
          <Spinner size="xl" />
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
