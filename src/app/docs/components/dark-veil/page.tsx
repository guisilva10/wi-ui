import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { DarkVeilDemo } from "./dark-veil-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "DarkVeil" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "com-efeitos", label: "Com Efeitos", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "hueShift",
    type: "number",
    default: "0",
    description:
      "Rotacao de matiz em graus aplicada as cores geradas pela rede neural (0-360)",
  },
  {
    name: "noiseIntensity",
    type: "number",
    default: "0",
    description: "Intensidade do ruido granular sobreposto ao fundo (0.0-1.0)",
  },
  {
    name: "scanlineIntensity",
    type: "number",
    default: "0",
    description:
      "Intensidade do efeito de linhas de varredura (estilo CRT) (0.0-1.0)",
  },
  {
    name: "speed",
    type: "number",
    default: "0.5",
    description: "Velocidade da animacao da rede neural CPPN",
  },
  {
    name: "scanlineFrequency",
    type: "number",
    default: "0",
    description:
      "Frequencia das linhas de varredura quando scanlineIntensity > 0",
  },
  {
    name: "warpAmount",
    type: "number",
    default: "0",
    description:
      "Quantidade de distorcao de dominio aplicada ao padrao (0.0-2.0)",
  },
  {
    name: "resolutionScale",
    type: "number",
    default: "1",
    description:
      "Escala de resolucao do canvas WebGL (0.25-2.0). Valores menores melhoram performance",
  },
  {
    name: "className",
    type: "string",
    description: "Classes CSS adicionais no container",
  },
];

export default function DarkVeilPage() {
  return (
    <DocPage
      title="DarkVeil"
      description="Fundo generativo renderizado via WebGL usando uma rede neural CPPN (Compositional Pattern Producing Network). Produz padroes organicos e fluidos em tempo real."
      breadcrumbs={BREADCRUMBS}
      badge="Background"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="dark-veil" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { DarkVeil } from "@/components/dark-veil";

<div className="relative h-[300px]">
  <DarkVeil />
</div>`}
        >
          <DarkVeilDemo variant="default" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="com-efeitos" title="Com Efeitos">
        <p className="text-muted-foreground mb-4 text-sm">
          Combine{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            hueShift
          </code>
          ,{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            scanlineIntensity
          </code>
          ,{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            noiseIntensity
          </code>{" "}
          e{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            warpAmount
          </code>{" "}
          para criar atmosferas distintas.
        </p>
        <ComponentPreview
          code={`<div className="relative h-[300px]">
  <DarkVeil
    hueShift={120}
    scanlineIntensity={0.3}
    noiseIntensity={0.05}
    warpAmount={0.5}
  />
</div>`}
        >
          <DarkVeilDemo variant="effects" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
