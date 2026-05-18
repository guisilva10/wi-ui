import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { Textarea } from "@/shared/ui/components/textarea";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Textarea" },
];

const TOC = [
  { id: "default", label: "Default", level: 2 },
  { id: "estado-erro", label: "Estado de erro", level: 2 },
  { id: "desabilitado", label: "Desabilitado", level: 2 },
  { id: "opcoes-resize", label: "Opcoes de resize", level: 2 },
  { id: "props", label: "Props", level: 2 },
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
    default: "--",
    description: "Numero de linhas visiveis",
  },
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais",
  },
];

export default function TextareaPage() {
  return (
    <DocPage
      title="Textarea"
      description="Area de texto com suporte a estados de erro, resize customizado e disabled."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="default" title="Default">
        <ComponentPreview
          code={`<Textarea placeholder="Escreva sua mensagem..." rows={4} />`}
        >
          <div className="w-full max-w-sm">
            <Textarea placeholder="Escreva sua mensagem..." rows={4} />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="estado-erro" title="Estado de erro">
        <ComponentPreview
          code={`<Textarea placeholder="Campo obrigatorio" error rows={3} />`}
        >
          <div className="w-full max-w-sm">
            <Textarea placeholder="Campo obrigatorio" error rows={3} />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="desabilitado" title="Desabilitado">
        <ComponentPreview
          code={`<Textarea placeholder="Nao editavel" disabled rows={3} />`}
        >
          <div className="w-full max-w-sm">
            <Textarea placeholder="Nao editavel" disabled rows={3} />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="opcoes-resize" title="Opcoes de resize">
        <ComponentPreview
          code={`<Textarea placeholder='resize="none"' resize="none" rows={2} />
<Textarea placeholder='resize="vertical" (padrao)' resize="vertical" rows={2} />
<Textarea placeholder='resize="both"' resize="both" rows={2} />`}
        >
          <div className="w-full max-w-sm space-y-3">
            <Textarea placeholder='resize="none"' resize="none" rows={2} />
            <Textarea
              placeholder='resize="vertical" (padrao)'
              resize="vertical"
              rows={2}
            />
            <Textarea placeholder='resize="both"' resize="both" rows={2} />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
