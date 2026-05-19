import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { TabsDemo } from "./tabs-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Tabs" },
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
    default: "--",
    description: "Valor inicial da tab ativa",
  },
  {
    name: "value",
    type: "string",
    default: "--",
    description: "Valor controlado da tab ativa",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    default: "--",
    description: "Callback quando a tab muda",
  },
];

export default function TabsPage() {
  return (
    <DocPage
      title="Tabs"
      description="Tabs compostas com Context puro. Controlled e uncontrolled."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="tabs" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs";

<Tabs defaultValue="conta">
  <TabsList>
    <TabsTrigger value="conta">Conta</TabsTrigger>
    <TabsTrigger value="senha">Senha</TabsTrigger>
  </TabsList>
  <TabsContent value="conta">
    <p>Configuracoes da conta.</p>
  </TabsContent>
  <TabsContent value="senha">
    <p>Altere sua senha.</p>
  </TabsContent>
</Tabs>`}
        >
          <TabsDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
