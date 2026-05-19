import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { SelectDemo } from "./select-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Select" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "defaultValue",
    type: "string",
    default: '""',
    description: "Valor inicial",
  },
  {
    name: "value",
    type: "string",
    default: "--",
    description: "Valor controlado",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    default: "--",
    description: "Callback ao selecionar",
  },
  {
    name: "placeholder",
    type: "string",
    default: '"Selecione..."',
    description: "Texto placeholder do trigger",
  },
];

export default function SelectPage() {
  return (
    <DocPage
      title="Select"
      description="Select customizado com dropdown e check no item selecionado."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="select" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/select";

<Select>
  <SelectTrigger placeholder="Selecione..." />
  <SelectContent>
    <SelectItem value="next">Next.js</SelectItem>
    <SelectItem value="remix">Remix</SelectItem>
  </SelectContent>
</Select>`}
        >
          <SelectDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
