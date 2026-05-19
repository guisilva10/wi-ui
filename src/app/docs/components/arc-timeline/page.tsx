import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { ArcTimelineDemo } from "./arc-timeline-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "ArcTimeline" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "data",
    type: "ArcTimelineItem[]",
    description: "Array de grupos de eventos da timeline (obrigatorio)",
    required: true,
  },
  {
    name: "arcConfig",
    type: "ArcTimelineConfig",
    description:
      "Configuracoes geometricas do arco (circleWidth, angleBetweenMinorSteps, lineCountFillBetweenSteps, boundaryPlaceholderLinesCount)",
  },
  {
    name: "defaultActiveStep",
    type: "{ time?: string; stepIndex?: number }",
    description:
      "Passo ativo ao montar o componente. Padrao: primeiro passo do primeiro grupo",
  },
  {
    name: "className",
    type: "string",
    description: "Classes CSS adicionais no container",
  },
];

const ARC_TIMELINE_ITEM_PROPS = [
  {
    name: "time",
    type: "React.ReactNode",
    description: "Rotulo do grupo (ex: ano, mes, fase)",
    required: true,
  },
  {
    name: "steps",
    type: "ArcTimelineStep[]",
    description: "Passos dentro do grupo",
    required: true,
  },
];

const ARC_TIMELINE_STEP_PROPS = [
  {
    name: "icon",
    type: "React.ReactNode",
    description: "Icone ou elemento exibido no marcador do passo",
    required: true,
  },
  {
    name: "content",
    type: "React.ReactNode",
    description: "Conteudo descritivo exibido ao ativar o passo",
    required: true,
  },
];

export default function ArcTimelinePage() {
  return (
    <DocPage
      title="ArcTimeline"
      description="Timeline circular interativa onde os passos sao dispostos em arco. Clique em qualquer marcador para navegar entre os eventos. Animacao de transicao suave via CSS."
      breadcrumbs={BREADCRUMBS}
      badge="Animacao"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="arc-timeline" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { ArcTimeline } from "@/components/arc-timeline";
import type { ArcTimelineItem } from "@/components/arc-timeline";

const data: ArcTimelineItem[] = [
  {
    time: "2022",
    steps: [
      { icon: <span>🚀</span>, content: "Fundacao da empresa" },
      { icon: <span>👥</span>, content: "Primeiros colaboradores" },
      { icon: <span>📦</span>, content: "Lancamento do beta" },
    ],
  },
  {
    time: "2023",
    steps: [
      { icon: <span>📈</span>, content: "Crescimento de 300%" },
      { icon: <span>🏆</span>, content: "Premio de melhor startup" },
      { icon: <span>🌎</span>, content: "Expansao internacional" },
    ],
  },
  {
    time: "2024",
    steps: [
      { icon: <span>💡</span>, content: "Lancamento da versao 2.0" },
      { icon: <span>🤝</span>, content: "Parceria estrategica" },
    ],
  },
];

<ArcTimeline data={data} />`}
        >
          <ArcTimelineDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <p className="text-muted-foreground mb-2 text-sm font-medium">
          ArcTimeline
        </p>
        <PropsTable props={PROPS} />

        <p className="text-muted-foreground mt-8 mb-2 text-sm font-medium">
          ArcTimelineItem
        </p>
        <PropsTable props={ARC_TIMELINE_ITEM_PROPS} />

        <p className="text-muted-foreground mt-8 mb-2 text-sm font-medium">
          ArcTimelineStep
        </p>
        <PropsTable props={ARC_TIMELINE_STEP_PROPS} />
      </DocSection>
    </DocPage>
  );
}
