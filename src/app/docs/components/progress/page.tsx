import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { Progress } from "@/shared/ui/components/progress";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Progress" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "valores", label: "Valores", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "value",
    type: "number",
    default: "0",
    description: "Valor atual do progresso",
  },
  {
    name: "max",
    type: "number",
    default: "100",
    description: "Valor maximo",
  },
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais",
  },
];

export default function ProgressPage() {
  return (
    <DocPage
      title="Progress"
      description="Barra de progresso acessivel com aria-valuenow."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="progress" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Progress } from "@/components/progress";

<Progress value={60} />`}
        >
          <Progress value={60} className="w-full max-w-sm" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="valores" title="Valores">
        <ComponentPreview
          code={`<div className="space-y-3 w-full max-w-sm">
  <Progress value={25} />
  <Progress value={50} />
  <Progress value={75} />
  <Progress value={100} />
</div>`}
        >
          <div className="w-full max-w-sm space-y-3">
            <Progress value={25} />
            <Progress value={50} />
            <Progress value={75} />
            <Progress value={100} />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
