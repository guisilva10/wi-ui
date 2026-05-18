import { DocPage } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { PricingCard } from "@/shared/ui/components/pricing-card";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "PricingCard" },
];

const PROPS = [
  {
    name: "title",
    type: "string",
    default: "—",
    description: "Nome do plano",
  },
  {
    name: "description",
    type: "string",
    default: "—",
    description: "Descrição curta do plano",
  },
  {
    name: "price",
    type: "string",
    default: "—",
    description: "Preço atual (ex: R$ 97)",
  },
  {
    name: "originalPrice",
    type: "string",
    default: "—",
    description: "Preço original riscado. Calcula o desconto automaticamente",
  },
  {
    name: "period",
    type: "string",
    default: '"/mês"',
    description: "Período de cobrança",
  },
  {
    name: "features",
    type: "(string | PricingFeature)[]",
    default: "—",
    description:
      "Lista de features. String = incluído. PricingFeature = controla included",
  },
  {
    name: "badge",
    type: "string",
    default: "—",
    description: "Texto do badge no topo do card (ex: Mais Popular)",
  },
  {
    name: "highlighted",
    type: "boolean",
    default: "false",
    description: "Destaca o card com borda primária e scale",
  },
  {
    name: "cta",
    type: "PricingCardCta",
    default: "—",
    description: "{ label, onClick?, href? }",
  },
];

const FEATURES_BASICO = [
  "Até 5 projetos",
  "1 GB de armazenamento",
  { text: "Domínio customizado", included: false },
  { text: "Suporte prioritário", included: false },
];

const FEATURES_PRO = [
  "Projetos ilimitados",
  "50 GB de armazenamento",
  "Domínio customizado",
  "Suporte prioritário 24h",
  "Analytics avançado",
];

export default function PricingCardPage() {
  return (
    <DocPage
      title="PricingCard"
      description="Card de preço com ancoragem psicológica (preço riscado + desconto automático), badge de destaque e lista de features."
      breadcrumbs={BREADCRUMBS}
    >
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Básico</h2>
        <ComponentPreview
          code={`<PricingCard
  title="Básico"
  price="R$ 29"
  period="/mês"
  features={["Até 5 projetos", "1 GB de armazenamento"]}
  cta={{ label: "Começar grátis" }}
/>`}
        >
          <div className="w-full max-w-xs">
            <PricingCard
              title="Básico"
              description="Para quem está começando"
              price="R$ 29"
              period="/mês"
              features={FEATURES_BASICO}
              cta={{ label: "Começar grátis" }}
            />
          </div>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">
          Destacado com ancoragem
        </h2>
        <p className="text-muted-foreground text-sm">
          O desconto percentual é calculado automaticamente a partir dos valores
          de{" "}
          <code className="bg-muted rounded px-1 font-mono text-xs">price</code>{" "}
          e{" "}
          <code className="bg-muted rounded px-1 font-mono text-xs">
            originalPrice
          </code>
          .
        </p>
        <ComponentPreview
          code={`<PricingCard
  title="Pro"
  price="R$ 97"
  originalPrice="R$ 197"
  period="/mês"
  badge="Mais Popular"
  highlighted
  features={["Projetos ilimitados", "50 GB"]}
  cta={{ label: "Assinar agora" }}
/>`}
        >
          <div className="w-full max-w-xs pt-4">
            <PricingCard
              title="Pro"
              description="Para times que precisam escalar"
              price="R$ 97"
              originalPrice="R$ 197"
              period="/mês"
              badge="Mais Popular"
              highlighted
              features={FEATURES_PRO}
              cta={{ label: "Assinar agora" }}
            />
          </div>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Props</h2>
        <PropsTable props={PROPS} />
      </section>
    </DocPage>
  );
}
