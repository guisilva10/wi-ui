import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import { Avatar } from "@/shared/ui/components/avatar";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Avatar" },
];

const TOC = [
  { id: "tamanhos", label: "Tamanhos", level: 2 },
  { id: "com-imagem", label: "Com imagem", level: 2 },
  { id: "fallback-iniciais", label: "Fallback com iniciais", level: 2 },
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "codigo-fonte", label: "Codigo fonte", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "src",
    type: "string",
    default: "--",
    description: "URL da imagem do avatar",
  },
  {
    name: "alt",
    type: "string",
    default: '""',
    description: "Texto alternativo da imagem",
  },
  {
    name: "fallback",
    type: "string",
    default: '""',
    description: "Nome para gerar iniciais quando nao ha imagem",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Tamanho do avatar",
  },
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais",
  },
];

export default function AvatarPage() {
  return (
    <DocPage
      title="Avatar"
      description="Componente de avatar com suporte a imagem, fallback com iniciais e multiplos tamanhos."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="tamanhos" title="Tamanhos">
        <ComponentPreview
          code={`<Avatar size="sm" fallback="Joao Silva" />
<Avatar size="md" fallback="Maria Oliveira" />
<Avatar size="lg" fallback="Pedro Costa" />
<Avatar size="xl" fallback="Ana Lima" />`}
        >
          <div className="flex items-end gap-4">
            <Avatar size="sm" fallback="Joao Silva" />
            <Avatar size="md" fallback="Maria Oliveira" />
            <Avatar size="lg" fallback="Pedro Costa" />
            <Avatar size="xl" fallback="Ana Lima" />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="com-imagem" title="Com imagem">
        <ComponentPreview
          code={`<Avatar src="https://i.pravatar.cc/80" alt="Usuario" size="lg" />`}
        >
          <Avatar src="https://i.pravatar.cc/80" alt="Usuario" size="lg" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="fallback-iniciais" title="Fallback com iniciais">
        <ComponentPreview
          code={`<Avatar fallback="Guilherme Silva" />
<Avatar fallback="WI UI" />
<Avatar fallback="Lorraine Dev" />`}
        >
          <div className="flex gap-3">
            <Avatar fallback="Guilherme Silva" />
            <Avatar fallback="WI UI" />
            <Avatar fallback="Lorraine Dev" />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="avatar" />
      </DocSection>

      <DocSection id="codigo-fonte" title="Codigo fonte">
        <ComponentSource componentName="avatar" />
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
