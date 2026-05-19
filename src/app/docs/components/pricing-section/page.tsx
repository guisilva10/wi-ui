import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import { PricingSection } from "@/shared/ui/components/pricing-section";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Blocos" },
  { label: "PricingSection" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "tres-planos", label: "Tres planos", level: 2 },
  { id: "dois-planos", label: "Dois planos", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "title",
    type: "string",
    description: "Titulo da secao de pricing",
    required: true,
  },
  {
    name: "plans",
    type: "PricingSectionPlan[]",
    description:
      "Array de planos. Cada plano tem: name, price, features, cta e opcoes de destaque.",
    required: true,
  },
  {
    name: "eyebrow",
    type: "string",
    description: "Texto pequeno em uppercase acima do titulo",
  },
  {
    name: "description",
    type: "string",
    description: "Descricao abaixo do titulo da secao",
  },
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais",
  },
];

const PLANS_3 = [
  {
    name: "Free",
    description: "Para experimentar",
    price: "R$ 0",
    period: "/mes",
    features: [
      "Ate 3 projetos",
      "1 GB de armazenamento",
      { text: "Dominio customizado", included: false },
      { text: "Suporte prioritario", included: false },
    ],
    cta: { label: "Comecar gratis" },
  },
  {
    name: "Pro",
    description: "Para times que crescem",
    price: "R$ 97",
    originalPrice: "R$ 197",
    period: "/mes",
    badge: "Mais Popular",
    highlighted: true,
    features: [
      "Projetos ilimitados",
      "50 GB de armazenamento",
      "Dominio customizado",
      "Suporte prioritario 24h",
      "Analytics avancado",
    ],
    cta: { label: "Assinar agora" },
  },
  {
    name: "Enterprise",
    description: "Para grandes empresas",
    price: "Custom",
    features: [
      "Tudo do Pro",
      "SLA garantido",
      "Onboarding dedicado",
      "Contrato personalizado",
    ],
    cta: { label: "Falar com vendas" },
  },
];

export default function PricingSectionPage() {
  return (
    <DocPage
      title="PricingSection"
      description="Secao de pricing completa com multiplos planos, ancoragem de preco, badge de destaque e lista de features."
      breadcrumbs={BREADCRUMBS}
      badge="Bloco"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="pricing-section" />
        <ComponentSource componentName="pricing-section" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { PricingSection } from "@/components/pricing-section";

<PricingSection
  title="Planos simples e transparentes"
  plans={[
    {
      name: "Free",
      price: "R$ 0",
      features: ["3 projetos", "1 GB"],
      cta: { label: "Comecar gratis" },
    },
    {
      name: "Pro",
      price: "R$ 97",
      highlighted: true,
      features: ["Ilimitado", "50 GB"],
      cta: { label: "Assinar" },
    },
  ]}
/>`}
        >
          <PricingSection
            title="Planos simples e transparentes"
            plans={[
              {
                name: "Free",
                price: "R$ 0",
                features: ["3 projetos", "1 GB"],
                cta: { label: "Comecar gratis" },
              },
              {
                name: "Pro",
                price: "R$ 97",
                highlighted: true,
                features: ["Ilimitado", "50 GB"],
                cta: { label: "Assinar" },
              },
            ]}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="tres-planos" title="Tres planos">
        <ComponentPreview
          code={`<PricingSection
  eyebrow="Precos"
  title="Plano certo para cada etapa"
  description="Comece de graca, escale quando precisar."
  plans={[...]}
/>`}
        >
          <PricingSection
            eyebrow="Precos"
            title="Plano certo para cada etapa"
            description="Comece de graca, escale quando precisar."
            plans={PLANS_3}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="dois-planos" title="Dois planos">
        <ComponentPreview
          code={`<PricingSection
  title="Simples assim"
  plans={[
    { name: "Starter", price: "R$ 49", ... },
    { name: "Growth", price: "R$ 149", highlighted: true, ... },
  ]}
/>`}
        >
          <PricingSection
            title="Simples assim"
            plans={[
              {
                name: "Starter",
                description: "Para comecar",
                price: "R$ 49",
                period: "/mes",
                features: [
                  "Ate 10 projetos",
                  "5 GB de armazenamento",
                  { text: "API access", included: false },
                ],
                cta: { label: "Escolher Starter" },
              },
              {
                name: "Growth",
                description: "Para escalar",
                price: "R$ 149",
                originalPrice: "R$ 249",
                period: "/mes",
                badge: "Recomendado",
                highlighted: true,
                features: [
                  "Projetos ilimitados",
                  "100 GB de armazenamento",
                  "API access completo",
                  "Suporte prioritario",
                ],
                cta: { label: "Escolher Growth" },
              },
            ]}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
