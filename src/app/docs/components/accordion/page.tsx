import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { AccordionDemo } from "./accordion-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Accordion" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "type",
    type: '"single" | "multiple"',
    default: '"single"',
    description: "Um ou multiplos itens abertos",
  },
  {
    name: "defaultValue",
    type: "string[]",
    default: "[]",
    description: "Itens abertos por padrao",
  },
  {
    name: "collapsible",
    type: "boolean",
    default: "true",
    description: "Permite fechar todos os itens",
  },
];

export default function AccordionPage() {
  return (
    <DocPage
      title="Accordion"
      description="Accordion com suporte single/multiple e collapsible."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="accordion" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/accordion";

<Accordion type="single" defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger value="item-1">Pergunta</AccordionTrigger>
    <AccordionContent value="item-1">Resposta</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <AccordionDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
