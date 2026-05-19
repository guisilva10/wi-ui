import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { SwitchDemo } from "./switch-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Switch" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "checked",
    type: "boolean",
    default: "false",
    description: "Estado do switch",
  },
  {
    name: "onCheckedChange",
    type: "(checked: boolean) => void",
    default: "--",
    description: "Callback quando o estado muda",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Desabilita o switch",
  },
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais",
  },
];

export default function SwitchPage() {
  return (
    <DocPage
      title="Switch"
      description="Toggle switch acessivel com suporte a controlled/uncontrolled."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="switch" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Switch } from "@/components/switch";

const [checked, setChecked] = useState(false);

<Switch checked={checked} onCheckedChange={setChecked} />`}
        >
          <SwitchDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
