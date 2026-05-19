import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { RippleDemo, RippleCustomDemo } from "./ripple-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Ripple" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "customizado", label: "Customizado", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "count",
    type: "number",
    default: "3",
    description: "Numero de aneis de ripple exibidos simultaneamente",
  },
  {
    name: "color",
    type: "string",
    default: '"oklch(0.8234 0.1927 206.47)"',
    description: "Cor das bordas dos aneis (CSS color)",
  },
  {
    name: "duration",
    type: "number",
    default: "4",
    description: "Duracao de cada ciclo de animacao em segundos",
  },
];

export default function RipplePage() {
  return (
    <DocPage
      title="Ripple"
      description="Aneis concentricos que se expandem em loop, criando efeito de ondas. Ideal para destacar um elemento central ou criar fundos de destaque."
      breadcrumbs={BREADCRUMBS}
      badge="Animacao"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="ripple" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Ripple } from "@/components/ripple";

<div className="relative h-[300px] overflow-hidden rounded-lg">
  <Ripple count={4} duration={4} />
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="font-bold text-lg">Ripple</span>
  </div>
</div>`}
        >
          <RippleDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="customizado" title="Customizado">
        <p className="text-muted-foreground text-sm">
          Use a prop{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            color
          </code>{" "}
          para alterar a cor dos aneis.
        </p>
        <ComponentPreview
          code={`<Ripple color="#f43f5e" count={5} duration={3} />`}
        >
          <RippleCustomDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
