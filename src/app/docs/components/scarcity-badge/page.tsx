import { DocPage } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { ScarcityBadge } from "@/shared/ui/components/scarcity-badge";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "ScarcityBadge" },
];

const PROPS = [
  {
    name: "total",
    type: "number",
    default: "—",
    description: "Total de vagas/unidades disponíveis",
  },
  {
    name: "remaining",
    type: "number",
    default: "—",
    description: "Vagas/unidades restantes",
  },
  {
    name: "variant",
    type: '"default" | "critical" | "soldout"',
    default: "auto",
    description:
      "Força variante visual. Por padrão é automático: critical quando ≤ 20%, soldout quando 0",
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
    description: "Texto customizado. Por padrão gera automaticamente",
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
      description="Badge de escassez com barra de progresso. Muda automaticamente para vermelho quando ≤ 20% disponível. Poderoso para criar urgência real."
      breadcrumbs={BREADCRUMBS}
    >
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">
          Default (bastante disponível)
        </h2>
        <ComponentPreview code={`<ScarcityBadge total={100} remaining={60} />`}>
          <ScarcityBadge total={100} remaining={60} />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">
          Critical (≤ 20%)
        </h2>
        <p className="text-muted-foreground text-sm">
          Ativa automaticamente quando restam 20% ou menos.
        </p>
        <ComponentPreview code={`<ScarcityBadge total={100} remaining={8} />`}>
          <ScarcityBadge total={100} remaining={8} />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Esgotado</h2>
        <ComponentPreview code={`<ScarcityBadge total={100} remaining={0} />`}>
          <ScarcityBadge total={100} remaining={0} />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Sem barra</h2>
        <ComponentPreview
          code={`<ScarcityBadge total={50} remaining={3} showBar={false} />`}
        >
          <ScarcityBadge total={50} remaining={3} showBar={false} />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Props</h2>
        <PropsTable props={PROPS} />
      </section>
    </DocPage>
  );
}
