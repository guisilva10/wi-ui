import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import { PricingCard } from "@/shared/ui/components/pricing-card";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "PricingCard" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "basico", label: "Basico", level: 2 },
  { id: "destacado", label: "Destacado", level: 2 },
  { id: "com-ancoragem", label: "Com ancoragem de preco", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "title",
    type: "string",
    description: "Nome do plano",
    required: true,
  },
  {
    name: "description",
    type: "string",
    description: "Descricao curta do plano",
  },
  {
    name: "price",
    type: "string",
    description: "Preco atual (ex: R$ 97)",
    required: true,
  },
  {
    name: "originalPrice",
    type: "string",
    description: "Preco original riscado. Calcula o desconto automaticamente",
  },
  {
    name: "period",
    type: "string",
    default: '"/mes"',
    description: "Periodo de cobranca",
  },
  {
    name: "features",
    type: "(string | PricingFeature)[]",
    description:
      "Lista de features. String = incluido. PricingFeature = controla included",
    required: true,
  },
  {
    name: "badge",
    type: "string",
    description: "Texto do badge no topo do card (ex: Mais Popular)",
  },
  {
    name: "highlighted",
    type: "boolean",
    default: "false",
    description: "Destaca o card com borda primaria e scale",
  },
  {
    name: "cta",
    type: "PricingCardCta",
    description: "{ label, onClick?, href? }",
    required: true,
  },
];

const FEATURES_BASICO = [
  "Ate 5 projetos",
  "1 GB de armazenamento",
  { text: "Dominio customizado", included: false },
  { text: "Suporte prioritario", included: false },
];

const FEATURES_PRO = [
  "Projetos ilimitados",
  "50 GB de armazenamento",
  "Dominio customizado",
  "Suporte prioritario 24h",
  "Analytics avancado",
];

export default function PricingCardPage() {
  return (
    <DocPage
      title="PricingCard"
      description="Card de preco com ancoragem psicologica (preco riscado + desconto automatico), badge de destaque e lista de features."
      breadcrumbs={BREADCRUMBS}
      badge="FOMO"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="pricing-card" />
        <ComponentSource componentName="pricing-card" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { PricingCard } from "@/components/pricing-card";

<PricingCard
  title="Pro"
  price="R$ 97"
  features={["Feature A", "Feature B"]}
  cta={{ label: "Assinar" }}
/>`}
        >
          <div className="w-full max-w-xs">
            <PricingCard
              title="Pro"
              price="R$ 97"
              features={["Feature A", "Feature B"]}
              cta={{ label: "Assinar" }}
            />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="basico" title="Basico">
        <ComponentPreview
          code={`<PricingCard
  title="Basico"
  description="Para quem esta comecando"
  price="R$ 29"
  period="/mes"
  features={[
    "Ate 5 projetos",
    "1 GB de armazenamento",
    { text: "Dominio customizado", included: false },
    { text: "Suporte prioritario", included: false },
  ]}
  cta={{ label: "Comecar gratis" }}
/>`}
        >
          <div className="w-full max-w-xs">
            <PricingCard
              title="Basico"
              description="Para quem esta comecando"
              price="R$ 29"
              period="/mes"
              features={FEATURES_BASICO}
              cta={{ label: "Comecar gratis" }}
            />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="destacado" title="Destacado">
        <ComponentPreview
          code={`<PricingCard
  title="Pro"
  description="Para times que precisam escalar"
  price="R$ 97"
  period="/mes"
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
              period="/mes"
              badge="Mais Popular"
              highlighted
              features={FEATURES_PRO}
              cta={{ label: "Assinar agora" }}
            />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="com-ancoragem" title="Com ancoragem de preco">
        <p className="text-muted-foreground text-sm">
          O desconto percentual e calculado automaticamente a partir dos valores
          de{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            price
          </code>{" "}
          e{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            originalPrice
          </code>
          .
        </p>
        <ComponentPreview
          code={`<PricingCard
  title="Pro"
  price="R$ 97"
  originalPrice="R$ 197"
  period="/mes"
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
              period="/mes"
              badge="Mais Popular"
              highlighted
              features={FEATURES_PRO}
              cta={{ label: "Assinar agora" }}
            />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
