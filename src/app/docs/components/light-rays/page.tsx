import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { LightRaysDemo } from "./light-rays-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "LightRays" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "origens", label: "Origens", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "raysOrigin",
    type: '"top-center" | "top-left" | "top-right" | "right" | "left" | "bottom-center" | "bottom-right" | "bottom-left"',
    default: '"top-center"',
    description: "Ponto de origem dos raios de luz",
  },
  {
    name: "raysColor",
    type: "string",
    default: '"#ffffff"',
    description: "Cor dos raios em formato hexadecimal",
  },
  {
    name: "raysSpeed",
    type: "number",
    default: "1",
    description: "Velocidade da animacao dos raios",
  },
  {
    name: "lightSpread",
    type: "number",
    default: "1",
    description: "Abertura do cone de luz (quanto maior, mais aberto)",
  },
  {
    name: "rayLength",
    type: "number",
    default: "2",
    description: "Comprimento dos raios em relacao a largura do container",
  },
  {
    name: "pulsating",
    type: "boolean",
    default: "false",
    description: "Ativa pulsacao ritmica na intensidade dos raios",
  },
  {
    name: "fadeDistance",
    type: "number",
    default: "1.0",
    description: "Distancia de fade dos raios a partir da origem",
  },
  {
    name: "saturation",
    type: "number",
    default: "1.0",
    description:
      "Saturacao da cor dos raios (0 = escala de cinza, 1 = cor plena)",
  },
  {
    name: "followMouse",
    type: "boolean",
    default: "true",
    description: "Os raios acompanham suavemente a posicao do mouse",
  },
  {
    name: "mouseInfluence",
    type: "number",
    default: "0.1",
    description:
      "Intensidade da influencia do mouse na direcao dos raios (0-1)",
  },
  {
    name: "noiseAmount",
    type: "number",
    default: "0.0",
    description: "Quantidade de ruido granular aplicado aos raios",
  },
  {
    name: "distortion",
    type: "number",
    default: "0.0",
    description: "Distorcao ondular nos angulos dos raios",
  },
  {
    name: "className",
    type: "string",
    description: "Classes CSS adicionais no container",
  },
];

export default function LightRaysPage() {
  return (
    <DocPage
      title="LightRays"
      description="Fundo animado com raios de luz renderizados via WebGL (OGL). Suporta multiplas origens, cores customizaveis, pulsacao e interacao com o mouse."
      breadcrumbs={BREADCRUMBS}
      badge="Background"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="light-rays" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { LightRays } from "@/components/light-rays";

<div className="relative h-[300px] bg-black">
  <LightRays raysColor="#ffffff" pulsating />
</div>`}
        >
          <LightRaysDemo raysOrigin="top-center" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="origens" title="Origens">
        <p className="text-muted-foreground mb-4 text-sm">
          Use a prop{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            raysOrigin
          </code>{" "}
          para controlar de onde os raios emergem. O valor padrao e{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            top-center
          </code>
          .
        </p>
        <ComponentPreview
          code={`<div className="relative h-[300px] bg-black">
  <LightRays raysOrigin="bottom-center" raysColor="#ffffff" />
</div>`}
        >
          <LightRaysDemo raysOrigin="bottom-center" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
