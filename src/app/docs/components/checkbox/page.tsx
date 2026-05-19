import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { Checkbox } from "@/shared/ui/components/checkbox";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Checkbox" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "com-label", label: "Com Label", level: 2 },
  { id: "disabled", label: "Disabled", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "checked",
    type: "boolean",
    default: "false",
    description: "Estado do checkbox",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Desabilita o checkbox",
  },
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais",
  },
];

export default function CheckboxPage() {
  return (
    <DocPage
      title="Checkbox"
      description="Checkbox nativo estilizado com CSS puro."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="checkbox" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Checkbox } from "@/components/checkbox";

<Checkbox />`}
        >
          <Checkbox />
        </ComponentPreview>
      </DocSection>

      <DocSection id="com-label" title="Com Label">
        <ComponentPreview
          code={`<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <label htmlFor="terms" className="text-sm">Aceitar termos</label>
</div>`}
        >
          <div className="flex items-center gap-2">
            <Checkbox id="terms" defaultChecked />
            <label htmlFor="terms" className="text-sm">
              Aceitar termos
            </label>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="disabled" title="Disabled">
        <ComponentPreview code={`<Checkbox disabled />`}>
          <Checkbox disabled />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
