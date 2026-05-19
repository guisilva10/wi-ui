import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { GlobeDemo, GlobeWireframeDemo } from "./globe-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Globe" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "custom", label: "Custom Color", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "color",
    type: "string",
    description: "Cor principal da superficie do globo (CSS color)",
  },
  {
    name: "wireColor",
    type: "string",
    description: "Cor das linhas de wireframe do globo",
  },
  {
    name: "speed",
    type: "number",
    default: "0.5",
    description: "Velocidade de rotacao do globo",
  },
  {
    name: "size",
    type: "number",
    description:
      "Tamanho do globo (radius). Calculado automaticamente pelo container",
  },
];

export default function GlobePage() {
  return (
    <DocPage
      title="Globe"
      description="Globo 3D interativo renderizado com WebGL via OGL. Rotacao automatica, cor customizavel. Perfeito para dashboards globais e hero sections de produtos SaaS."
      breadcrumbs={BREADCRUMBS}
      badge="Animacao"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="globe" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Globe } from "@/components/globe";

<div className="relative h-[300px] overflow-hidden rounded-lg">
  <Globe className="absolute inset-0 h-full w-full" />
</div>`}
        >
          <GlobeDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="custom" title="Custom Color">
        <p className="text-muted-foreground text-sm">
          Use{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            wireColor
          </code>{" "}
          para customizar a cor das linhas do globo.
        </p>
        <ComponentPreview
          code={`<Globe wireColor="#a855f7" speed={0.8} className="absolute inset-0 h-full w-full" />`}
        >
          <GlobeWireframeDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
