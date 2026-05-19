import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/shared/ui/components/alert";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Alert" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "destructive", label: "Destructive", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "variant",
    type: '"default" | "destructive"',
    default: '"default"',
    description: "Estilo visual do alerta",
  },
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais",
  },
];

export default function AlertPage() {
  return (
    <DocPage
      title="Alert"
      description="Alerta semantico com titulo e descricao."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="alert" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Alert, AlertTitle, AlertDescription } from "@/components/alert";

<Alert>
  <AlertTitle>Aviso</AlertTitle>
  <AlertDescription>Esta e uma mensagem de alerta.</AlertDescription>
</Alert>`}
        >
          <Alert>
            <AlertTitle>Aviso</AlertTitle>
            <AlertDescription>Esta e uma mensagem de alerta.</AlertDescription>
          </Alert>
        </ComponentPreview>
      </DocSection>

      <DocSection id="destructive" title="Destructive">
        <ComponentPreview
          code={`<Alert variant="destructive">
  <AlertTitle>Erro</AlertTitle>
  <AlertDescription>Algo deu errado.</AlertDescription>
</Alert>`}
        >
          <Alert variant="destructive">
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>Algo deu errado.</AlertDescription>
          </Alert>
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
