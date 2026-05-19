import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { TooltipDemo } from "./tooltip-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Tooltip" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "content",
    type: "React.ReactNode",
    default: "--",
    description: "Conteudo do tooltip",
  },
  {
    name: "side",
    type: '"top" | "bottom" | "left" | "right"',
    default: '"top"',
    description: "Posicao do tooltip",
  },
  {
    name: "delayDuration",
    type: "number",
    default: "200",
    description: "Delay em ms antes de exibir",
  },
];

export default function TooltipPage() {
  return (
    <DocPage
      title="Tooltip"
      description="Tooltip leve com posicionamento e delay configuraveis."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="tooltip" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Tooltip } from "@/components/tooltip";

<Tooltip content="Dica util">
  <button>Hover aqui</button>
</Tooltip>`}
        >
          <TooltipDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
