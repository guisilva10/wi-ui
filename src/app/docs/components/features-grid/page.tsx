import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import { FeaturesGrid } from "@/shared/ui/components/features-grid";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Blocos" },
  { label: "FeaturesGrid" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "tres-colunas", label: "Tres colunas", level: 2 },
  { id: "duas-colunas", label: "Duas colunas", level: 2 },
  { id: "quatro-colunas", label: "Quatro colunas", level: 2 },
  { id: "sem-icones", label: "Sem icones", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "title",
    type: "string",
    description: "Titulo da secao de features",
    required: true,
  },
  {
    name: "features",
    type: "FeatureItem[]",
    description: "Array de features. { icon?, title, description }",
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
    name: "columns",
    type: "2 | 3 | 4",
    default: "3",
    description: "Numero de colunas no grid (em telas maiores)",
  },
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais",
  },
];

const ICON_CUBE = (
  <svg
    className="size-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
    />
  </svg>
);

const ICON_BOLT = (
  <svg
    className="size-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
    />
  </svg>
);

const ICON_SHIELD = (
  <svg
    className="size-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
    />
  </svg>
);

const FEATURES_BASE = [
  {
    icon: ICON_BOLT,
    title: "Performance",
    description:
      "Componentes otimizados com zero dependencias desnecessarias e bundle minimo.",
  },
  {
    icon: ICON_CUBE,
    title: "Composable",
    description:
      "Construido com primitivos compostos. Use como esta ou customize completamente.",
  },
  {
    icon: ICON_SHIELD,
    title: "Acessivel",
    description:
      "Segue as diretrizes WCAG 2.1. Teclado e leitores de tela suportados.",
  },
];

export default function FeaturesGridPage() {
  return (
    <DocPage
      title="FeaturesGrid"
      description="Grid de features para landing pages. Apresente funcionalidades com icone, titulo e descricao em 2, 3 ou 4 colunas."
      breadcrumbs={BREADCRUMBS}
      badge="Block"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="features-grid" />
        <ComponentSource componentName="features-grid" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { FeaturesGrid } from "@/components/features-grid";

<FeaturesGrid
  title="Por que WI.UI?"
  features={[
    { title: "Performance", description: "Bundle minimo." },
    { title: "Composable", description: "Customize tudo." },
    { title: "Acessivel", description: "WCAG 2.1." },
  ]}
/>`}
        >
          <FeaturesGrid
            title="Por que WI.UI?"
            features={[
              { title: "Performance", description: "Bundle minimo." },
              { title: "Composable", description: "Customize tudo." },
              { title: "Acessivel", description: "WCAG 2.1." },
            ]}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="tres-colunas" title="Tres colunas">
        <ComponentPreview
          code={`<FeaturesGrid
  eyebrow="Por que nos"
  title="Tudo que voce precisa"
  description="Componentes prontos pra producao, sem configuracao."
  columns={3}
  features={[
    { icon: <BoltIcon />, title: "Performance", description: "..." },
    { icon: <CubeIcon />, title: "Composable", description: "..." },
    { icon: <ShieldIcon />, title: "Acessivel", description: "..." },
  ]}
/>`}
        >
          <FeaturesGrid
            eyebrow="Por que nos"
            title="Tudo que voce precisa"
            description="Componentes prontos pra producao, sem configuracao."
            columns={3}
            features={FEATURES_BASE}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="duas-colunas" title="Duas colunas">
        <ComponentPreview
          code={`<FeaturesGrid
  title="Duas colunas"
  columns={2}
  features={[...]}
/>`}
        >
          <FeaturesGrid
            title="Duas colunas"
            columns={2}
            features={[
              ...FEATURES_BASE,
              {
                icon: ICON_BOLT,
                title: "TypeScript",
                description: "100% tipado. Autocomplete em todos os props.",
              },
            ]}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="quatro-colunas" title="Quatro colunas">
        <ComponentPreview
          code={`<FeaturesGrid
  title="Quatro colunas"
  columns={4}
  features={[...]}
/>`}
        >
          <FeaturesGrid
            title="Quatro colunas"
            columns={4}
            features={[
              ...FEATURES_BASE,
              {
                icon: ICON_SHIELD,
                title: "Dark Mode",
                description: "Suporte nativo a dark mode com CSS variables.",
              },
            ]}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="sem-icones" title="Sem icones">
        <ComponentPreview
          code={`<FeaturesGrid
  title="Features em texto"
  features={[
    { title: "Sem config", description: "Copie, cole e use." },
    { title: "Sem lock-in", description: "Voce tem o codigo." },
    { title: "Sem limite", description: "Use onde quiser." },
  ]}
/>`}
        >
          <FeaturesGrid
            title="Features em texto"
            features={[
              { title: "Sem config", description: "Copie, cole e use." },
              { title: "Sem lock-in", description: "Voce tem o codigo." },
              { title: "Sem limite", description: "Use onde quiser." },
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
