import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { GrainientDemo, GrainientColorsDemo } from "./grainient-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Grainient" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "cores-customizadas", label: "Cores Customizadas", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "color1",
    type: "string",
    default: '"#FF9FFC"',
    description: "Primeira cor do gradiente (hex)",
  },
  {
    name: "color2",
    type: "string",
    default: '"#5227FF"',
    description: "Segunda cor do gradiente (hex)",
  },
  {
    name: "color3",
    type: "string",
    default: '"#B497CF"',
    description: "Terceira cor do gradiente (hex)",
  },
  {
    name: "timeSpeed",
    type: "number",
    default: "0.25",
    description: "Velocidade geral da animacao",
  },
  {
    name: "colorBalance",
    type: "number",
    default: "0.0",
    description: "Balanco de distribuicao entre as cores",
  },
  {
    name: "warpStrength",
    type: "number",
    default: "1.0",
    description: "Intensidade do efeito de distorcao",
  },
  {
    name: "warpFrequency",
    type: "number",
    default: "5.0",
    description: "Frequencia das ondas de distorcao",
  },
  {
    name: "warpSpeed",
    type: "number",
    default: "2.0",
    description: "Velocidade de animacao da distorcao",
  },
  {
    name: "warpAmplitude",
    type: "number",
    default: "50.0",
    description: "Amplitude das ondas de distorcao",
  },
  {
    name: "blendAngle",
    type: "number",
    default: "0.0",
    description: "Angulo de mistura entre as camadas de cor (graus)",
  },
  {
    name: "blendSoftness",
    type: "number",
    default: "0.05",
    description: "Suavidade da transicao entre camadas",
  },
  {
    name: "rotationAmount",
    type: "number",
    default: "500.0",
    description: "Quantidade de rotacao aplicada pelo noise",
  },
  {
    name: "noiseScale",
    type: "number",
    default: "2.0",
    description: "Escala do noise de rotacao",
  },
  {
    name: "grainAmount",
    type: "number",
    default: "0.1",
    description: "Intensidade do efeito de grao (film grain)",
  },
  {
    name: "grainScale",
    type: "number",
    default: "2.0",
    description: "Escala do grao",
  },
  {
    name: "grainAnimated",
    type: "boolean",
    default: "false",
    description: "Anima o grao ao longo do tempo",
  },
  {
    name: "contrast",
    type: "number",
    default: "1.5",
    description: "Contraste final da imagem",
  },
  {
    name: "gamma",
    type: "number",
    default: "1.0",
    description: "Correcao de gamma",
  },
  {
    name: "saturation",
    type: "number",
    default: "1.0",
    description: "Saturacao das cores (0 = escala de cinza, 1 = original)",
  },
  {
    name: "centerX",
    type: "number",
    default: "0.0",
    description: "Deslocamento horizontal do centro",
  },
  {
    name: "centerY",
    type: "number",
    default: "0.0",
    description: "Deslocamento vertical do centro",
  },
  {
    name: "zoom",
    type: "number",
    default: "0.9",
    description: "Nivel de zoom do gradiente",
  },
  {
    name: "className",
    type: "string",
    description: "Classes CSS adicionais no container",
  },
];

export default function GrainientPage() {
  return (
    <DocPage
      title="Grainient"
      description="Fundo com gradiente animado e efeito de grao (film grain) renderizado via WebGL (OGL). Altamente customizavel com controles de cor, distorcao, noise e pos-processamento."
      breadcrumbs={BREADCRUMBS}
      badge="Background"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="grainient" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Grainient } from "@/components/grainient";

<div className="relative h-[300px] w-full overflow-hidden rounded-xl">
  <Grainient />
</div>`}
        >
          <GrainientDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="cores-customizadas" title="Cores Customizadas">
        <p className="text-muted-foreground mb-4 text-sm">
          Passe valores hex para{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            color1
          </code>
          ,{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            color2
          </code>{" "}
          e{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            color3
          </code>{" "}
          para personalizar a paleta do gradiente.
        </p>
        <ComponentPreview
          code={`<div className="relative h-[300px] w-full overflow-hidden rounded-xl">
  <Grainient
    color1="#00FF87"
    color2="#60EFFF"
    color3="#001529"
  />
</div>`}
        >
          <GrainientColorsDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
