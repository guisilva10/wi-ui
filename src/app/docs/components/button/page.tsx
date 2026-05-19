import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { Button } from "@/shared/ui/components/button";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Button" },
];

const TOC = [
  { id: "instalacao", label: "Instalação", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "secondary", label: "Secondary", level: 2 },
  { id: "outline", label: "Outline", level: 2 },
  { id: "ghost", label: "Ghost", level: 2 },
  { id: "destructive", label: "Destructive", level: 2 },
  { id: "link", label: "Link", level: 2 },
  { id: "tamanhos", label: "Tamanhos", level: 2 },
  { id: "desabilitado", label: "Desabilitado", level: 2 },
  { id: "com-icone", label: "Com ícone", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "variant",
    type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"',
    default: '"default"',
    description: "Estilo visual do botão",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "icon"',
    default: '"md"',
    description: "Tamanho do botão",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Desabilita o botão",
  },
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais",
  },
];

export default function ButtonPage() {
  return (
    <DocPage
      title="Button"
      description="Botão acessível com múltiplas variantes e tamanhos."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalação">
        <InstallSection componentName="button" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Button } from "@/components/ui/button";

<Button>Clique aqui</Button>`}
        >
          <Button>Clique aqui</Button>
        </ComponentPreview>
      </DocSection>

      <DocSection id="secondary" title="Secondary">
        <ComponentPreview
          code={`<Button variant="secondary">Secondary</Button>`}
        >
          <Button variant="secondary">Secondary</Button>
        </ComponentPreview>
      </DocSection>

      <DocSection id="outline" title="Outline">
        <ComponentPreview code={`<Button variant="outline">Outline</Button>`}>
          <Button variant="outline">Outline</Button>
        </ComponentPreview>
      </DocSection>

      <DocSection id="ghost" title="Ghost">
        <ComponentPreview code={`<Button variant="ghost">Ghost</Button>`}>
          <Button variant="ghost">Ghost</Button>
        </ComponentPreview>
      </DocSection>

      <DocSection id="destructive" title="Destructive">
        <ComponentPreview
          code={`<Button variant="destructive">Destructive</Button>`}
        >
          <Button variant="destructive">Destructive</Button>
        </ComponentPreview>
      </DocSection>

      <DocSection id="link" title="Link">
        <ComponentPreview code={`<Button variant="link">Link</Button>`}>
          <Button variant="link">Link</Button>
        </ComponentPreview>
      </DocSection>

      <DocSection id="tamanhos" title="Tamanhos">
        <ComponentPreview
          code={`<Button size="sm">Pequeno</Button>
<Button size="md">Médio</Button>
<Button size="lg">Grande</Button>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Pequeno</Button>
            <Button size="md">Médio</Button>
            <Button size="lg">Grande</Button>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="desabilitado" title="Desabilitado">
        <ComponentPreview
          code={`<Button disabled>Desabilitado</Button>
<Button disabled variant="outline">Outline</Button>`}
        >
          <div className="flex gap-3">
            <Button disabled>Desabilitado</Button>
            <Button disabled variant="outline">
              Outline
            </Button>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="com-icone" title="Com ícone">
        <ComponentPreview
          code={`import { ArrowRight } from "lucide-react";

<Button>
  Próximo
  <ArrowRight />
</Button>`}
        >
          <Button>
            Próximo
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Button>
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
