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
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "sm", label: "Small", level: 2 },
  { id: "md", label: "Medium", level: 2 },
  { id: "lg", label: "Large", level: 2 },
  { id: "xl", label: "Extra Large", level: 2 },
  { id: "com-imagem", label: "Com imagem", level: 2 },
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
      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="avatar" />
        <ComponentSource componentName="avatar" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Avatar } from "@/components/avatar";

<Avatar fallback="Joao Silva" />`}
        >
          <Avatar fallback="Joao Silva" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="sm" title="Small">
        <ComponentPreview code={`<Avatar size="sm" fallback="Joao Silva" />`}>
          <Avatar size="sm" fallback="Joao Silva" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="md" title="Medium">
        <ComponentPreview
          code={`<Avatar size="md" fallback="Maria Oliveira" />`}
        >
          <Avatar size="md" fallback="Maria Oliveira" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="lg" title="Large">
        <ComponentPreview code={`<Avatar size="lg" fallback="Pedro Costa" />`}>
          <Avatar size="lg" fallback="Pedro Costa" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="xl" title="Extra Large">
        <ComponentPreview code={`<Avatar size="xl" fallback="Ana Lima" />`}>
          <Avatar size="xl" fallback="Ana Lima" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="com-imagem" title="Com imagem">
        <ComponentPreview
          code={`<Avatar src="https://i.pravatar.cc/80" alt="Usuario" size="lg" />`}
        >
          <Avatar src="https://i.pravatar.cc/80" alt="Usuario" size="lg" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
