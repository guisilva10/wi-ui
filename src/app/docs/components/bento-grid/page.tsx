import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { BentoGridDemo } from "./bento-grid-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Bento Grid" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "props-grid", label: "Props — BentoGrid", level: 2 },
  { id: "props-item", label: "Props — BentoGridItem", level: 2 },
];

const GRID_PROPS = [
  {
    name: "columns",
    type: "2 | 3 | 4",
    default: "3",
    description: "Numero de colunas no grid",
  },
  {
    name: "className",
    type: "string",
    description: "Classes CSS adicionais",
  },
];

const ITEM_PROPS = [
  {
    name: "colSpan",
    type: "1 | 2 | 3",
    default: "1",
    description: "Numero de colunas que o item ocupa",
  },
  {
    name: "rowSpan",
    type: "1 | 2",
    default: "1",
    description: "Numero de linhas que o item ocupa",
  },
  {
    name: "className",
    type: "string",
    description: "Classes CSS adicionais",
  },
];

export default function BentoGridPage() {
  return (
    <DocPage
      title="Bento Grid"
      description="Grid estilo bento box com suporte a items de tamanhos variaveis. Perfeito para features grids, landing pages e dashboards com hierarquia visual clara."
      breadcrumbs={BREADCRUMBS}
      badge="Animacao"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="bento-grid" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { BentoGrid, BentoGridItem } from "@/components/bento-grid";

<BentoGrid columns={3}>
  <BentoGridItem colSpan={2} className="rounded-xl border p-6">
    <h3>Feature Principal</h3>
  </BentoGridItem>
  <BentoGridItem className="rounded-xl border p-6">
    <h3>Item 2</h3>
  </BentoGridItem>
</BentoGrid>`}
        >
          <BentoGridDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props-grid" title="Props — BentoGrid">
        <PropsTable props={GRID_PROPS} />
      </DocSection>

      <DocSection id="props-item" title="Props — BentoGridItem">
        <PropsTable props={ITEM_PROPS} />
      </DocSection>
    </DocPage>
  );
}
