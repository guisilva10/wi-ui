import { DocPage } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { Textarea } from "@/shared/ui/components/textarea";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Textarea" },
];

const PROPS = [
  {
    name: "error",
    type: "boolean",
    default: "false",
    description: "Aplica estilo de erro na borda",
  },
  {
    name: "resize",
    type: '"none" | "vertical" | "horizontal" | "both"',
    default: '"vertical"',
    description: "Controla o redimensionamento",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Desabilita o textarea",
  },
  {
    name: "rows",
    type: "number",
    default: "—",
    description: "Número de linhas visíveis",
  },
  {
    name: "className",
    type: "string",
    default: "—",
    description: "Classes CSS adicionais",
  },
];

export default function TextareaPage() {
  return (
    <DocPage
      title="Textarea"
      description="Área de texto com suporte a estados de erro, resize customizado e disabled."
      breadcrumbs={BREADCRUMBS}
    >
      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Default</h2>
        <ComponentPreview
          code={`<Textarea placeholder="Escreva sua mensagem..." rows={4} />`}
        >
          <div className="w-full max-w-sm">
            <Textarea placeholder="Escreva sua mensagem..." rows={4} />
          </div>
        </ComponentPreview>
      </section>

      {/* Erro */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">
          Estado de erro
        </h2>
        <ComponentPreview
          code={`<Textarea placeholder="Campo obrigatório" error rows={3} />`}
        >
          <div className="w-full max-w-sm">
            <Textarea placeholder="Campo obrigatório" error rows={3} />
          </div>
        </ComponentPreview>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Desabilitado</h2>
        <ComponentPreview
          code={`<Textarea placeholder="Não editável" disabled rows={3} />`}
        >
          <div className="w-full max-w-sm">
            <Textarea placeholder="Não editável" disabled rows={3} />
          </div>
        </ComponentPreview>
      </section>

      {/* Resize options */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">
          Opções de resize
        </h2>
        <ComponentPreview
          code={`<Textarea placeholder='resize="none"' resize="none" rows={2} />
<Textarea placeholder='resize="vertical" (padrão)' resize="vertical" rows={2} />
<Textarea placeholder='resize="both"' resize="both" rows={2} />`}
        >
          <div className="w-full max-w-sm space-y-3">
            <Textarea placeholder='resize="none"' resize="none" rows={2} />
            <Textarea
              placeholder='resize="vertical" (padrão)'
              resize="vertical"
              rows={2}
            />
            <Textarea placeholder='resize="both"' resize="both" rows={2} />
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
