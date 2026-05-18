import { DocPage } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { Spinner } from "@/shared/ui/components/spinner";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Spinner" },
];

const PROPS = [
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Tamanho do spinner",
  },
  {
    name: "label",
    type: "string",
    default: '"Carregando..."',
    description: "Texto acessível para leitores de tela (aria-label)",
  },
  {
    name: "className",
    type: "string",
    default: "—",
    description: "Classes CSS adicionais",
  },
];

export default function SpinnerPage() {
  return (
    <DocPage
      title="Spinner"
      description="Indicador de carregamento animado. Semântico e acessível com aria-label."
      breadcrumbs={BREADCRUMBS}
    >
      {/* Tamanhos */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Tamanhos</h2>
        <ComponentPreview
          code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`}
        >
          <div className="flex items-center gap-6">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </div>
        </ComponentPreview>
      </section>

      {/* Com label customizado */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">
          Com label customizado
        </h2>
        <ComponentPreview
          code={`<Spinner label="Enviando dados..." />
<Spinner label="Autenticando..." size="lg" />`}
        >
          <div className="flex items-center gap-6">
            <Spinner label="Enviando dados..." />
            <Spinner label="Autenticando..." size="lg" />
          </div>
        </ComponentPreview>
      </section>

      {/* Cor via CSS */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">
          Cor customizada
        </h2>
        <ComponentPreview
          code={`<Spinner className="text-blue-500" />
<Spinner className="text-green-500" />
<Spinner className="text-red-500" />`}
        >
          <div className="flex items-center gap-6">
            <Spinner className="text-blue-500" />
            <Spinner className="text-green-500" />
            <Spinner className="text-red-500" />
          </div>
        </ComponentPreview>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Props</h2>
        <PropsTable props={PROPS} />
      </section>
    </DocPage>
  );
}
