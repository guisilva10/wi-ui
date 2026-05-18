import { Search, Mail } from "lucide-react";
import { DocPage } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { Input } from "@/shared/ui/components/input";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Input" },
];

const PROPS = [
  {
    name: "error",
    type: "boolean",
    default: "false",
    description: "Aplica estilo de erro na borda",
  },
  {
    name: "startIcon",
    type: "React.ReactNode",
    default: "—",
    description: "Ícone exibido à esquerda",
  },
  {
    name: "endIcon",
    type: "React.ReactNode",
    default: "—",
    description: "Ícone exibido à direita",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Desabilita o input",
  },
  {
    name: "placeholder",
    type: "string",
    default: "—",
    description: "Texto placeholder",
  },
  {
    name: "type",
    type: "string",
    default: '"text"',
    description: "Tipo do input HTML",
  },
];

export default function InputPage() {
  return (
    <DocPage
      title="Input"
      description="Campo de texto acessível com suporte a estados de erro, ícones e disabled."
      breadcrumbs={BREADCRUMBS}
    >
      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Default</h2>
        <ComponentPreview code={`<Input placeholder="Nome completo" />`}>
          <div className="w-full max-w-sm">
            <Input placeholder="Nome completo" />
          </div>
        </ComponentPreview>
      </section>

      {/* Com ícones */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Com ícones</h2>
        <ComponentPreview
          code={`<Input startIcon={<Search className="size-4" />} placeholder="Buscar..." />
<Input endIcon={<Mail className="size-4" />} placeholder="Email" type="email" />`}
        >
          <div className="w-full max-w-sm space-y-3">
            <Input
              startIcon={<Search className="size-4" />}
              placeholder="Buscar..."
            />
            <Input
              endIcon={<Mail className="size-4" />}
              placeholder="Email"
              type="email"
            />
          </div>
        </ComponentPreview>
      </section>

      {/* Erro */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">
          Estado de erro
        </h2>
        <ComponentPreview code={`<Input placeholder="Email inválido" error />`}>
          <div className="w-full max-w-sm">
            <Input placeholder="Email inválido" error />
          </div>
        </ComponentPreview>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Desabilitado</h2>
        <ComponentPreview
          code={`<Input placeholder="Não editável" disabled />`}
        >
          <div className="w-full max-w-sm">
            <Input placeholder="Não editável" disabled />
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
