import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { ToastDemo } from "./toast-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Toast" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "variantes", label: "Variantes", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "title",
    type: "string",
    description: "Titulo principal da notificacao",
  },
  {
    name: "description",
    type: "string",
    description: "Texto descritivo adicional",
  },
  {
    name: "variant",
    type: '"default" | "success" | "error" | "warning"',
    default: '"default"',
    description: "Estilo visual da notificacao",
  },
  {
    name: "duration",
    type: "number",
    default: "4000",
    description:
      "Tempo em milissegundos antes do toast desaparecer automaticamente",
  },
];

export default function ToastPage() {
  return (
    <DocPage
      title="Toast"
      description="Notificacoes temporarias posicionadas no canto da tela. Exporta a funcao toast() para uso imperativo e o componente Toaster para renderizar as notificacoes."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="toast" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <p className="text-muted-foreground text-sm">
          Adicione{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            {"<Toaster />"}
          </code>{" "}
          no layout raiz e use a funcao{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            toast()
          </code>{" "}
          em qualquer lugar da aplicacao.
        </p>
        <ComponentPreview
          code={`import { toast, Toaster } from "@/components/toast";

// No layout raiz:
<Toaster />

// Em qualquer componente:
toast({ title: "Sucesso!", description: "Operacao realizada.", variant: "success" })`}
        >
          <ToastDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="variantes" title="Variantes">
        <p className="text-muted-foreground text-sm">
          Quatro variantes disponveis: <strong>default</strong>,{" "}
          <strong>success</strong>, <strong>error</strong> e{" "}
          <strong>warning</strong>. Clique nos botoes acima para ver cada uma.
        </p>
      </DocSection>

      <DocSection id="props" title="Props — toast()">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
