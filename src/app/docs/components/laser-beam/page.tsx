import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import {
  LaserBeamDemo,
  LaserBeamHorizontalDemo,
  LaserBeamDiagonalDemo,
} from "./laser-beam-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Laser Beam" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "direcoes", label: "Direcoes", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "color",
    type: "string",
    default: '"oklch(0.8234 0.1927 206.47)"',
    description: "Cor do feixe laser (CSS color)",
  },
  {
    name: "duration",
    type: "number",
    default: "2",
    description: "Duracao da animacao em segundos",
  },
  {
    name: "delay",
    type: "number",
    default: "0",
    description: "Atraso inicial da animacao em segundos",
  },
  {
    name: "direction",
    type: '"top-to-bottom" | "left-to-right" | "diagonal"',
    default: '"top-to-bottom"',
    description: "Direcao do movimento do laser",
  },
  {
    name: "thickness",
    type: "number",
    default: "2",
    description: "Espessura do feixe em pixels",
  },
  {
    name: "glow",
    type: "boolean",
    default: "true",
    description: "Adiciona efeito de brilho ao feixe",
  },
];

export default function LaserBeamPage() {
  return (
    <DocPage
      title="Laser Beam"
      description="Feixe de laser animado que atravessa o container. Suporta tres direcoes, cor customizavel e efeito glow. Ideal para backgrounds de hero sections e banners."
      breadcrumbs={BREADCRUMBS}
      badge="Animacao"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="laser-beam" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { LaserBeam } from "@/components/laser-beam";

<div className="relative h-[300px] overflow-hidden rounded-lg">
  <LaserBeam color="oklch(0.8234 0.1927 206.47)" duration={2} glow />
</div>`}
        >
          <LaserBeamDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="direcoes" title="Direcoes">
        <p className="text-muted-foreground text-sm">
          Use a prop{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            direction
          </code>{" "}
          para controlar o sentido do laser.
        </p>
        <ComponentPreview
          code={`<LaserBeam direction="left-to-right" color="#f43f5e" />`}
        >
          <LaserBeamHorizontalDemo />
        </ComponentPreview>
        <ComponentPreview
          code={`<LaserBeam direction="diagonal" color="#a855f7" />`}
        >
          <LaserBeamDiagonalDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
