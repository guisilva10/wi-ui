import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { BorderBeamDemo, BorderBeamCustomDemo } from "./border-beam-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Border Beam" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "customizado", label: "Customizado", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "duration",
    type: "number",
    default: "6",
    description: "Duracao de uma volta completa em segundos",
  },
  {
    name: "size",
    type: "number",
    default: "200",
    description: "Tamanho do feixe de luz em pixels",
  },
  {
    name: "color",
    type: "string",
    default: '"oklch(0.8234 0.1927 206.47)"',
    description: "Cor do feixe de luz (CSS color)",
  },
  {
    name: "delay",
    type: "number",
    default: "0",
    description: "Atraso inicial em segundos",
  },
];

export default function BorderBeamPage() {
  return (
    <DocPage
      title="Border Beam"
      description="Borda animada com feixe de luz que percorre o perimetro do elemento em loop. Posicione dentro de um elemento com position relative. Otimo para cards em destaque."
      breadcrumbs={BREADCRUMBS}
      badge="Animacao"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="border-beam" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { BorderBeam } from "@/components/border-beam";

<div className="relative rounded-xl border border-transparent p-8">
  <BorderBeam duration={6} />
  <h3>Border Beam</h3>
</div>`}
        >
          <BorderBeamDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="customizado" title="Customizado">
        <p className="text-muted-foreground text-sm">
          Customize a cor e velocidade para diferentes estilos visuais.
        </p>
        <ComponentPreview
          code={`<BorderBeam color="#f43f5e" duration={4} />
<BorderBeam color="#a855f7" duration={8} />`}
        >
          <BorderBeamCustomDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
