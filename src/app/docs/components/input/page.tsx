import { Search, Mail } from "lucide-react";
import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import { Input } from "@/shared/ui/components/input";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Input" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "default", label: "Default", level: 2 },
  { id: "com-icone-esquerda", label: "Com icone a esquerda", level: 2 },
  { id: "com-icone-direita", label: "Com icone a direita", level: 2 },
  { id: "estado-erro", label: "Estado de erro", level: 2 },
  { id: "desabilitado", label: "Desabilitado", level: 2 },
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "codigo-fonte", label: "Codigo fonte", level: 2 },
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
    name: "startIcon",
    type: "React.ReactNode",
    default: "--",
    description: "Icone exibido a esquerda",
  },
  {
    name: "endIcon",
    type: "React.ReactNode",
    default: "--",
    description: "Icone exibido a direita",
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
    default: "--",
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
      description="Campo de texto acessivel com suporte a estados de erro, icones e disabled."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="input" />
        <ComponentSource componentName="input" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Input } from "@/components/input";

<Input placeholder="Nome completo" />`}
        >
          <div className="w-full max-w-sm">
            <Input placeholder="Nome completo" />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="default" title="Default">
        <ComponentPreview code={`<Input placeholder="Nome completo" />`}>
          <div className="w-full max-w-sm">
            <Input placeholder="Nome completo" />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="com-icone-esquerda" title="Com icone a esquerda">
        <ComponentPreview
          code={`<Input startIcon={<Search className="size-4" />} placeholder="Buscar..." />`}
        >
          <div className="w-full max-w-sm">
            <Input
              startIcon={<Search className="size-4" />}
              placeholder="Buscar..."
            />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="com-icone-direita" title="Com icone a direita">
        <ComponentPreview
          code={`<Input endIcon={<Mail className="size-4" />} placeholder="Email" type="email" />`}
        >
          <div className="w-full max-w-sm">
            <Input
              endIcon={<Mail className="size-4" />}
              placeholder="Email"
              type="email"
            />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="estado-erro" title="Estado de erro">
        <ComponentPreview code={`<Input placeholder="Email invalido" error />`}>
          <div className="w-full max-w-sm">
            <Input placeholder="Email invalido" error />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="desabilitado" title="Desabilitado">
        <ComponentPreview
          code={`<Input placeholder="Nao editavel" disabled />`}
        >
          <div className="w-full max-w-sm">
            <Input placeholder="Nao editavel" disabled />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="input" />
      </DocSection>

      <DocSection id="codigo-fonte" title="Codigo fonte">
        <ComponentSource componentName="input" />
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
