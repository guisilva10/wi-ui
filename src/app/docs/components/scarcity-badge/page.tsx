import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import { ScarcityBadge } from "@/shared/ui/components/scarcity-badge";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "ScarcityBadge" },
];

const TOC = [
  { id: "default", label: "Default", level: 2 },
  { id: "critical", label: "Critical", level: 2 },
  { id: "esgotado", label: "Esgotado", level: 2 },
  { id: "sem-barra", label: "Sem barra", level: 2 },
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "codigo-fonte", label: "Codigo fonte", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "total",
    type: "number",
    description: "Total de vagas/unidades disponiveis",
    required: true,
  },
  {
    name: "remaining",
    type: "number",
    description: "Vagas/unidades restantes",
    required: true,
  },
  {
    name: "variant",
    type: '"default" | "critical" | "soldout"',
    default: "auto",
    description:
      "Forca variante visual. Por padrao e automatico: critical quando <= 20%, soldout quando 0",
  },
  {
    name: "showBar",
    type: "boolean",
    default: "true",
    description: "Exibe barra de progresso de preenchimento",
  },
  {
    name: "label",
    type: "string",
    default: "auto",
    description: "Texto customizado. Por padrao gera automaticamente",
  },
  {
    name: "soldoutLabel",
    type: "string",
    default: '"Esgotado"',
    description: "Texto quando remaining = 0",
  },
];

export default function ScarcityBadgePage() {
  return (
    <DocPage
      title="ScarcityBadge"
      description="Badge de escassez com barra de progresso. Muda automaticamente para vermelho quando <= 20% disponivel. Poderoso para criar urgencia real."
      breadcrumbs={BREADCRUMBS}
      badge="FOMO"
      toc={TOC}
    >
      <DocSection id="default" title="Default (bastante disponivel)">
        <ComponentPreview code={`<ScarcityBadge total={100} remaining={60} />`}>
          <ScarcityBadge total={100} remaining={60} />
        </ComponentPreview>
      </DocSection>

      <DocSection id="critical" title="Critical (<= 20%)">
        <p className="text-muted-foreground text-sm">
          Ativa automaticamente quando restam 20% ou menos.
        </p>
        <ComponentPreview code={`<ScarcityBadge total={100} remaining={8} />`}>
          <ScarcityBadge total={100} remaining={8} />
        </ComponentPreview>
      </DocSection>

      <DocSection id="esgotado" title="Esgotado">
        <ComponentPreview code={`<ScarcityBadge total={100} remaining={0} />`}>
          <ScarcityBadge total={100} remaining={0} />
        </ComponentPreview>
      </DocSection>

      <DocSection id="sem-barra" title="Sem barra">
        <ComponentPreview
          code={`<ScarcityBadge total={50} remaining={3} showBar={false} />`}
        >
          <ScarcityBadge total={50} remaining={3} showBar={false} />
        </ComponentPreview>
      </DocSection>

      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="scarcity-badge" />
      </DocSection>

      <DocSection id="codigo-fonte" title="Codigo fonte">
        <ComponentSource componentName="scarcity-badge" />
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
