import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import { VisitorCounterDemo } from "./visitor-counter-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "VisitorCounter" },
];

const TOC = [
  { id: "dot", label: "Dot (padrao)", level: 2 },
  { id: "pulse", label: "Pulse", level: 2 },
  { id: "bar", label: "Bar", level: 2 },
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "codigo-fonte", label: "Codigo fonte", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "count",
    type: "number",
    description: "Numero de visitantes atual",
    required: true,
  },
  {
    name: "variant",
    type: '"dot" | "pulse" | "bar"',
    default: '"dot"',
    description: "Estilo do indicador live",
  },
  {
    name: "label",
    type: "string",
    default: '"pessoas vendo agora"',
    description: "Texto apos o contador",
  },
  {
    name: "simulateActivity",
    type: "boolean",
    default: "false",
    description: "Oscila o contador +/-3 a cada 5s para demonstracoes",
  },
];

export default function VisitorCounterPage() {
  return (
    <DocPage
      title="VisitorCounter"
      description='"X pessoas vendo agora" — indicador live compacto e nao-intrusivo. Aumenta pressao social sutil na conversao.'
      breadcrumbs={BREADCRUMBS}
      badge="FOMO"
      toc={TOC}
    >
      <DocSection id="dot" title="Dot (padrao)">
        <ComponentPreview
          code={`<VisitorCounter count={47} variant="dot" simulateActivity />`}
        >
          <VisitorCounterDemo variant="dot" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="pulse" title="Pulse">
        <ComponentPreview
          code={`<VisitorCounter count={47} variant="pulse" simulateActivity />`}
        >
          <VisitorCounterDemo variant="pulse" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="bar" title="Bar">
        <ComponentPreview
          code={`<VisitorCounter count={47} variant="bar" simulateActivity />`}
        >
          <VisitorCounterDemo variant="bar" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="visitor-counter" />
      </DocSection>

      <DocSection id="codigo-fonte" title="Codigo fonte">
        <ComponentSource componentName="visitor-counter" />
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
