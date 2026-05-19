import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { CTASection } from "@/shared/ui/components/cta-section";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Blocos" },
  { label: "CTASection" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "default", label: "Default", level: 2 },
  { id: "bordered", label: "Bordered", level: 2 },
  { id: "filled", label: "Filled", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "title",
    type: "string",
    description: "Titulo do CTA",
    required: true,
  },
  {
    name: "ctas",
    type: "CTASectionCta[]",
    default: "[]",
    description:
      "Botoes de acao. { label, href?, onClick?, variant? }. Primeiro e primario por padrao.",
  },
  {
    name: "eyebrow",
    type: "string",
    description: "Texto pequeno em uppercase acima do titulo",
  },
  {
    name: "description",
    type: "string",
    description: "Descricao abaixo do titulo",
  },
  {
    name: "variant",
    type: '"default" | "bordered" | "filled"',
    default: '"default"',
    description:
      "Estilo visual. default: sem container | bordered: com borda | filled: fundo escuro",
  },
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais",
  },
];

export default function CTASectionPage() {
  return (
    <DocPage
      title="CTASection"
      description="Secao call-to-action para o final de landing pages. Tres variantes: default, bordered e filled."
      breadcrumbs={BREADCRUMBS}
      badge="Bloco"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="cta-section" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { CTASection } from "@/components/cta-section";

<CTASection
  title="Pronto pra comecar?"
  description="Comece gratis. Sem cartao de credito."
  ctas={[{ label: "Comecar agora", href: "/docs" }]}
/>`}
        >
          <CTASection
            title="Pronto pra comecar?"
            description="Comece gratis. Sem cartao de credito."
            ctas={[{ label: "Comecar agora", href: "/docs" }]}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="default" title="Default">
        <ComponentPreview
          code={`<CTASection
  variant="default"
  eyebrow="Comece hoje"
  title="Menos boilerplate. Mais produto."
  description="Componentes prontos pra producao. Sem configuracao."
  ctas={[
    { label: "Ver componentes", href: "/docs" },
    { label: "GitHub", href: "#", variant: "outline" },
  ]}
/>`}
        >
          <CTASection
            variant="default"
            eyebrow="Comece hoje"
            title="Menos boilerplate. Mais produto."
            description="Componentes prontos pra producao. Sem configuracao."
            ctas={[
              { label: "Ver componentes", href: "/docs" },
              { label: "GitHub", href: "#", variant: "outline" },
            ]}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="bordered" title="Bordered">
        <ComponentPreview
          code={`<CTASection
  variant="bordered"
  title="Pronto pra escalar?"
  description="Junte-se a times que entregam mais rapido."
  ctas={[
    { label: "Comecar gratis", href: "/docs" },
    { label: "Ver planos", href: "#", variant: "outline" },
  ]}
/>`}
        >
          <CTASection
            variant="bordered"
            title="Pronto pra escalar?"
            description="Junte-se a times que entregam mais rapido."
            ctas={[
              { label: "Comecar gratis", href: "/docs" },
              { label: "Ver planos", href: "#", variant: "outline" },
            ]}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="filled" title="Filled">
        <ComponentPreview
          code={`<CTASection
  variant="filled"
  eyebrow="Oferta limitada"
  title="Comece hoje com 30 dias gratis"
  description="Sem cartao de credito. Cancele quando quiser."
  ctas={[
    { label: "Ativar 30 dias gratis", href: "#" },
    { label: "Ver demo", href: "#", variant: "outline" },
  ]}
/>`}
        >
          <CTASection
            variant="filled"
            eyebrow="Oferta limitada"
            title="Comece hoje com 30 dias gratis"
            description="Sem cartao de credito. Cancele quando quiser."
            ctas={[
              { label: "Ativar 30 dias gratis", href: "#" },
              { label: "Ver demo", href: "#", variant: "outline" },
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
