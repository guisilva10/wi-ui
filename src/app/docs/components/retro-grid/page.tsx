import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { RetroGridDemo, RetroGridCustomDemo } from "./retro-grid-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Retro Grid" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "customizado", label: "Customizado", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "angle",
    type: "number",
    default: "65",
    description: "Angulo da perspectiva em graus",
  },
  {
    name: "cellSize",
    type: "number",
    default: "60",
    description: "Tamanho de cada celula do grid em pixels",
  },
  {
    name: "opacity",
    type: "number",
    default: "0.5",
    description: "Opacidade do grid (0-1)",
  },
  {
    name: "color",
    type: "string",
    description:
      "Cor das linhas do grid (CSS color). Usa a cor primaria por padrao",
  },
];

export default function RetroGridPage() {
  return (
    <DocPage
      title="Retro Grid"
      description="Grid perspectivado estilo retro/synthwave que preenche o background. Posicione dentro de um container com overflow hidden. Perfeito para hero sections e fondos de estilo retro."
      breadcrumbs={BREADCRUMBS}
      badge="Animacao"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="retro-grid" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { RetroGrid } from "@/components/retro-grid";

<div className="relative h-[300px] overflow-hidden rounded-lg bg-background">
  <RetroGrid />
  <div className="absolute inset-0 flex items-center justify-center">
    <p>Conteudo</p>
  </div>
</div>`}
        >
          <RetroGridDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="customizado" title="Customizado">
        <p className="text-muted-foreground text-sm">
          Ajuste o angulo e a cor para criar estilos diferentes.
        </p>
        <ComponentPreview
          code={`<RetroGrid angle={55} cellSize={50} color="#a855f7" opacity={0.4} />`}
        >
          <RetroGridCustomDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
