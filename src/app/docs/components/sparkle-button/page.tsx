import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { SparkleButtonDemo } from "./sparkle-button-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "SparkleButton" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "children",
    type: "React.ReactNode",
    description: "Conteudo do botao (obrigatorio)",
    required: true,
  },
  {
    name: "className",
    type: "string",
    description: "Classes CSS adicionais para customizar aparencia",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Desativa o botao e reduz opacidade para 50%",
  },
  {
    name: "...props",
    type: 'React.ComponentProps<"button">',
    description: "Todos os atributos nativos do elemento button",
  },
];

export default function SparkleButtonPage() {
  return (
    <DocPage
      title="SparkleButton"
      description="Botao com particulas animadas e borda rotativa ao hover. Efeito sparkle via CSS puro — sem dependencias externas. Ideal para CTAs de alta conversao."
      breadcrumbs={BREADCRUMBS}
      badge="Animacao"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="sparkle-button" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { SparkleButton } from "@/components/sparkle-button";

<SparkleButton>Comecar Agora</SparkleButton>`}
        >
          <SparkleButtonDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
