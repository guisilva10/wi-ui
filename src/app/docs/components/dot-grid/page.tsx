import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { DotGridDemo } from "./dot-grid-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "DotGrid" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "gap",
    type: "number",
    default: "32",
    description: "Espaco em pixels entre os pontos da grade",
  },
  {
    name: "dotRadius",
    type: "number",
    default: "1",
    description: "Raio base dos pontos em pixels",
  },
  {
    name: "waveSpeed",
    type: "number",
    default: "0.008",
    description:
      "Velocidade da animacao de onda (valores maiores = mais rapido)",
  },
  {
    name: "waveCenter",
    type: "{ x: number; y: number }",
    default: "{ x: 0.65, y: 0.4 }",
    description:
      "Centro da onda em valores relativos (0 a 1) ao tamanho do canvas",
  },
  {
    name: "className",
    type: "string",
    description: "Classes CSS adicionais no elemento canvas",
  },
];

export default function DotGridPage() {
  return (
    <DocPage
      title="DotGrid"
      description="Grade de pontos animada renderizada em canvas. Efeito de onda suave ideal para backgrounds de hero sections e banners. Adapta cores ao dark mode automaticamente."
      breadcrumbs={BREADCRUMBS}
      badge="Background"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="dot-grid" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <p className="text-muted-foreground text-sm">
          Coloque o{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            DotGrid
          </code>{" "}
          dentro de um container com{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            position: relative
          </code>{" "}
          e dimensoes definidas. O canvas ocupa{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            position: absolute; inset: 0
          </code>{" "}
          automaticamente.
        </p>
        <ComponentPreview
          code={`import { DotGrid } from "@/components/dot-grid";

<div className="relative h-48 w-full overflow-hidden rounded-xl">
  <DotGrid />
  <div className="relative z-10 flex h-full items-center justify-center">
    <h2 className="text-2xl font-bold">Conteudo sobre o grid</h2>
  </div>
</div>`}
        >
          <DotGridDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
