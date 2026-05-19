import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import { CanvasRevealEffectDemo } from "./canvas-reveal-effect-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "CanvasRevealEffect" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "padrao", label: "Padrao (cyan)", level: 2 },
  { id: "cores-customizadas", label: "Cores customizadas", level: 2 },
  { id: "velocidade", label: "Velocidade", level: 2 },
  { id: "dot-size", label: "Tamanho dos dots", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "animationSpeed",
    type: "number",
    default: "3",
    description:
      "Velocidade da animacao de revelacao. Valores maiores = mais rapido. Recomendado: 1–8",
  },
  {
    name: "colors",
    type: "[number, number, number][]",
    default: "[[0, 255, 255]]",
    description:
      "Array de cores RGB para os dots. Multiplas cores sao distribuidas ciclicamente pela grid",
  },
  {
    name: "dotSize",
    type: "number",
    default: "3",
    description:
      "Tamanho dos dots em pixels. Controla tambem o espacamento entre eles (dotSize * 3)",
  },
  {
    name: "opacities",
    type: "number[]",
    default: "[0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]",
    description:
      "Array de opacidades atribuidas pseudo-aleatoriamente aos dots para variacao visual",
  },
  {
    name: "containerClassName",
    type: "string",
    description:
      "Classes CSS no container div que envolve o canvas. Use para controlar dimensoes e posicionamento",
  },
];

export default function CanvasRevealEffectPage() {
  return (
    <DocPage
      title="CanvasRevealEffect"
      description="Efeito canvas com dots animados que se revelam radialmente a partir do centro. Ideal como background interativo de cards, heroes e secoes de destaque. Sem dependencias externas — puro Canvas API."
      breadcrumbs={BREADCRUMBS}
      badge="Animation"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="canvas-reveal-effect" />
        <ComponentSource componentName="canvas-reveal-effect" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { CanvasRevealEffect } from "@/components/canvas-reveal-effect";

<div className="relative h-48 w-full overflow-hidden rounded-xl bg-black">
  <CanvasRevealEffect />
</div>`}
        >
          <CanvasRevealEffectDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="padrao" title="Padrao (cyan)">
        <p className="text-muted-foreground text-sm">
          Por padrao, o efeito usa dots ciano{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            [0, 255, 255]
          </code>{" "}
          com velocidade 3. O container precisa de{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            overflow-hidden
          </code>{" "}
          e dimensoes definidas.
        </p>
        <ComponentPreview
          code={`<div className="relative h-48 w-full overflow-hidden rounded-xl bg-black">
  <CanvasRevealEffect
    animationSpeed={3}
    colors={[[0, 255, 255]]}
    dotSize={3}
  />
</div>`}
        >
          <CanvasRevealEffectDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="cores-customizadas" title="Cores customizadas">
        <p className="text-muted-foreground text-sm">
          Passe multiplas cores no array{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            colors
          </code>{" "}
          para criar um efeito multicolorido. As cores sao distribuidas
          ciclicamente pelos dots da grid.
        </p>
        <ComponentPreview
          code={`<div className="relative h-48 w-full overflow-hidden rounded-xl bg-black">
  <CanvasRevealEffect
    colors={[
      [255, 100, 50],
      [255, 200, 0],
      [255, 50, 100],
    ]}
    animationSpeed={4}
  />
</div>`}
        >
          <CanvasRevealEffectDemo
            colors={[
              [255, 100, 50],
              [255, 200, 0],
              [255, 50, 100],
            ]}
            animationSpeed={4}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="velocidade" title="Velocidade">
        <p className="text-muted-foreground text-sm">
          Use{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            animationSpeed
          </code>{" "}
          para controlar o ritmo da revelacao. O valor 5 e recomendado para uso
          dentro do{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            CardSpotlight
          </code>
          .
        </p>
        <ComponentPreview
          code={`<div className="relative h-48 w-full overflow-hidden rounded-xl bg-black">
  <CanvasRevealEffect
    animationSpeed={8}
    colors={[[0, 180, 216]]}
  />
</div>`}
        >
          <CanvasRevealEffectDemo animationSpeed={8} colors={[[0, 180, 216]]} />
        </ComponentPreview>
      </DocSection>

      <DocSection id="dot-size" title="Tamanho dos dots">
        <p className="text-muted-foreground text-sm">
          O{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            dotSize
          </code>{" "}
          controla tanto o tamanho dos dots quanto o espacamento entre eles
          (calculado como{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            dotSize * 3
          </code>
          ). Valores maiores criam um padrao mais esparso.
        </p>
        <ComponentPreview
          code={`<div className="relative h-48 w-full overflow-hidden rounded-xl bg-black">
  <CanvasRevealEffect
    dotSize={6}
    colors={[[100, 220, 255]]}
    animationSpeed={4}
  />
</div>`}
        >
          <CanvasRevealEffectDemo
            dotSize={6}
            colors={[[100, 220, 255]]}
            animationSpeed={4}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
