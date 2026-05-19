import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import { FAQSection } from "@/shared/ui/components/faq-section";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Blocos" },
  { label: "FAQSection" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "padrao", label: "Padrao", level: 2 },
  { id: "multiplos-abertos", label: "Multiplos abertos", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "title",
    type: "string",
    description: "Titulo da secao de FAQ",
    required: true,
  },
  {
    name: "items",
    type: "FAQItem[]",
    description: "Array de perguntas e respostas. { question, answer }",
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
    name: "allowMultiple",
    type: "boolean",
    default: "false",
    description: "Permite multiplos itens abertos ao mesmo tempo",
  },
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais",
  },
];

const FAQ_ITEMS = [
  {
    question: "O WI.UI e gratuito?",
    answer:
      "Sim, o WI.UI e completamente open-source e gratuito. Voce pode usar em projetos pessoais e comerciais sem restricoes.",
  },
  {
    question: "Preciso instalar alguma dependencia?",
    answer:
      "Cada componente lista suas dependencias na pagina de documentacao. A maioria depende apenas de clsx, tailwind-merge e class-variance-authority.",
  },
  {
    question: "Como funciona o modelo copy-paste?",
    answer:
      "Assim como o shadcn/ui, voce copia o codigo do componente direto pra sua base de codigo. Sem pacote npm, sem atualizacoes forcadas. Voce tem total controle.",
  },
  {
    question: "Funciona com qualquer framework React?",
    answer:
      "Sim. Os componentes sao React puro. Funcionam com Next.js, Remix, Vite e qualquer setup que use React 18+.",
  },
  {
    question: "Posso customizar o design?",
    answer:
      "Totalmente. Os componentes usam CSS variables do Tailwind. Mude as variaveis de cor no seu globals.css e todos os componentes se adaptam automaticamente.",
  },
];

export default function FAQSectionPage() {
  return (
    <DocPage
      title="FAQSection"
      description="Secao FAQ com accordion de perguntas e respostas. Animacao suave de abertura e fechamento. Suporte a modo de multiplos itens abertos."
      breadcrumbs={BREADCRUMBS}
      badge="Block"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="faq-section" />
        <ComponentSource componentName="faq-section" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { FAQSection } from "@/components/faq-section";

<FAQSection
  title="Perguntas frequentes"
  items={[
    {
      question: "E gratuito?",
      answer: "Sim, completamente open-source.",
    },
  ]}
/>`}
        >
          <FAQSection
            title="Perguntas frequentes"
            items={[
              {
                question: "E gratuito?",
                answer: "Sim, completamente open-source.",
              },
            ]}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="padrao" title="Padrao">
        <ComponentPreview
          code={`<FAQSection
  eyebrow="FAQ"
  title="Perguntas frequentes"
  description="Nao encontrou o que procura? Fale com a gente."
  items={[...]}
/>`}
        >
          <FAQSection
            eyebrow="FAQ"
            title="Perguntas frequentes"
            description="Nao encontrou o que procura? Fale com a gente."
            items={FAQ_ITEMS}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="multiplos-abertos" title="Multiplos abertos">
        <p className="text-muted-foreground text-sm">
          Com{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            allowMultiple
          </code>
          , o usuario pode abrir varias perguntas ao mesmo tempo.
        </p>
        <ComponentPreview
          code={`<FAQSection
  title="Perguntas frequentes"
  allowMultiple
  items={[...]}
/>`}
        >
          <FAQSection
            title="Perguntas frequentes"
            allowMultiple
            items={FAQ_ITEMS.slice(0, 3)}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
