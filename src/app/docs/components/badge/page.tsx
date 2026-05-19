import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { Badge } from "@/shared/ui/components/badge";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Badge" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "secondary", label: "Secondary", level: 2 },
  { id: "outline", label: "Outline", level: 2 },
  { id: "destructive", label: "Destructive", level: 2 },
  { id: "success", label: "Success", level: 2 },
  { id: "warning", label: "Warning", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "variant",
    type: '"default" | "secondary" | "outline" | "destructive" | "success" | "warning"',
    default: '"default"',
    description: "Estilo visual do badge",
  },
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais",
  },
];

export default function BadgePage() {
  return (
    <DocPage
      title="Badge"
      description="Elemento inline para labels, status e categorias. Multiplas variantes semanticas."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="badge" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Badge } from "@/components/badge";

<Badge>Badge</Badge>`}
        >
          <Badge>Badge</Badge>
        </ComponentPreview>
      </DocSection>

      <DocSection id="secondary" title="Secondary">
        <ComponentPreview code={`<Badge variant="secondary">Secondary</Badge>`}>
          <Badge variant="secondary">Secondary</Badge>
        </ComponentPreview>
      </DocSection>

      <DocSection id="outline" title="Outline">
        <ComponentPreview code={`<Badge variant="outline">Outline</Badge>`}>
          <Badge variant="outline">Outline</Badge>
        </ComponentPreview>
      </DocSection>

      <DocSection id="destructive" title="Destructive">
        <ComponentPreview
          code={`<Badge variant="destructive">Destructive</Badge>`}
        >
          <Badge variant="destructive">Destructive</Badge>
        </ComponentPreview>
      </DocSection>

      <DocSection id="success" title="Success">
        <ComponentPreview code={`<Badge variant="success">Success</Badge>`}>
          <Badge variant="success">Success</Badge>
        </ComponentPreview>
      </DocSection>

      <DocSection id="warning" title="Warning">
        <ComponentPreview code={`<Badge variant="warning">Warning</Badge>`}>
          <Badge variant="warning">Warning</Badge>
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
