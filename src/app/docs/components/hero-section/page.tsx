import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import { HeroSection } from "@/shared/ui/components/hero-section";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Blocos" },
  { label: "HeroSection" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "simples", label: "Simples", level: 2 },
  { id: "com-badge", label: "Com badge", level: 2 },
  { id: "com-highlight", label: "Com titulo highlight", level: 2 },
  { id: "alinhado-esquerda", label: "Alinhado a esquerda", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "title",
    type: "string",
    description: "Titulo principal da secao hero",
    required: true,
  },
  {
    name: "titleHighlight",
    type: "string",
    description: "Parte do titulo com destaque visual (sublinhado)",
  },
  {
    name: "description",
    type: "string",
    description: "Texto descritivo abaixo do titulo",
    required: true,
  },
  {
    name: "badge",
    type: "string",
    description: "Badge pill acima do titulo",
  },
  {
    name: "eyebrow",
    type: "string",
    description: "Texto pequeno em uppercase acima do titulo",
  },
  {
    name: "ctas",
    type: "HeroSectionCta[]",
    default: "[]",
    description:
      "Array de botoes CTA. O primeiro e primario por padrao. { label, href?, onClick?, variant? }",
  },
  {
    name: "align",
    type: '"left" | "center"',
    default: '"center"',
    description: "Alinhamento do conteudo",
  },
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais",
  },
];

export default function HeroSectionPage() {
  return (
    <DocPage
      title="HeroSection"
      description="Secao hero completa para landing pages com badge, titulo, subtitulo e CTAs. Minimalista e altamente customizavel."
      breadcrumbs={BREADCRUMBS}
      badge="Bloco"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="hero-section" />
        <ComponentSource componentName="hero-section" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { HeroSection } from "@/components/hero-section";

<HeroSection
  title="Construa mais rapido"
  description="Componentes prontos pra producao."
  ctas={[{ label: "Comecar", href: "/docs" }]}
/>`}
        >
          <HeroSection
            title="Construa mais rapido"
            description="Componentes prontos pra producao."
            ctas={[{ label: "Comecar", href: "/docs" }]}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="simples" title="Simples">
        <ComponentPreview
          code={`<HeroSection
  title="O jeito certo de construir UI"
  description="Componentes acessiveis, responsivos e prontos pra copiar."
  ctas={[
    { label: "Ver componentes", href: "/docs" },
    { label: "GitHub", href: "#", variant: "outline" },
  ]}
/>`}
        >
          <HeroSection
            title="O jeito certo de construir UI"
            description="Componentes acessiveis, responsivos e prontos pra copiar."
            ctas={[
              { label: "Ver componentes", href: "/docs" },
              { label: "GitHub", href: "#", variant: "outline" },
            ]}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="com-badge" title="Com badge">
        <ComponentPreview
          code={`<HeroSection
  badge="Novo — versao 2.0 disponivel"
  title="Componentes para times modernos"
  description="Biblioteca open-source com componentes base, FOMO e animacoes."
  ctas={[{ label: "Explorar", href: "/docs" }]}
/>`}
        >
          <HeroSection
            badge="Novo — versao 2.0 disponivel"
            title="Componentes para times modernos"
            description="Biblioteca open-source com componentes base, FOMO e animacoes."
            ctas={[{ label: "Explorar", href: "/docs" }]}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="com-highlight" title="Com titulo highlight">
        <ComponentPreview
          code={`<HeroSection
  eyebrow="Para desenvolvedores"
  title="Construa produtos"
  titleHighlight="que convertem"
  description="Componentes com psicologia de conversao integrada."
  ctas={[
    { label: "Comecar gratis", href: "/docs" },
    { label: "Ver exemplos", href: "#", variant: "outline" },
  ]}
/>`}
        >
          <HeroSection
            eyebrow="Para desenvolvedores"
            title="Construa produtos"
            titleHighlight="que convertem"
            description="Componentes com psicologia de conversao integrada."
            ctas={[
              { label: "Comecar gratis", href: "/docs" },
              { label: "Ver exemplos", href: "#", variant: "outline" },
            ]}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="alinhado-esquerda" title="Alinhado a esquerda">
        <ComponentPreview
          code={`<HeroSection
  align="left"
  badge="Open Source"
  title="Componentes que funcionam"
  description="Sem configuracao, sem lock-in. Copie, cole e customize."
  ctas={[
    { label: "Documentacao", href: "/docs" },
    { label: "GitHub", href: "#", variant: "outline" },
  ]}
/>`}
        >
          <HeroSection
            align="left"
            badge="Open Source"
            title="Componentes que funcionam"
            description="Sem configuracao, sem lock-in. Copie, cole e customize."
            ctas={[
              { label: "Documentacao", href: "/docs" },
              { label: "GitHub", href: "#", variant: "outline" },
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
