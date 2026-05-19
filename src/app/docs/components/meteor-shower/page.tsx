import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { MeteorShowerDemo, MeteorShowerCustomDemo } from "./meteor-shower-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Meteor Shower" },
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
    default: "20",
    description: "Numero de meteoros exibidos",
  },
  {
    name: "color",
    type: "string",
    description: "Cor dos meteoros (CSS color). Usa branco por padrao",
  },
];

export default function MeteorShowerPage() {
  return (
    <DocPage
      title="Meteor Shower"
      description="Chuva de meteoros animados que cruzam o container em diagonais. Posicione dentro de um container com overflow hidden. Ideal para hero sections e backgrounds escuros."
      breadcrumbs={BREADCRUMBS}
      badge="Animacao"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="meteor-shower" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { MeteorShower } from "@/components/meteor-shower";

<div className="relative h-[300px] overflow-hidden rounded-lg bg-background">
  <MeteorShower count={20} />
  <div className="absolute inset-0 flex items-center justify-center">
    <p>Conteudo</p>
  </div>
</div>`}
        >
          <MeteorShowerDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="customizado" title="Customizado">
        <p className="text-muted-foreground text-sm">
          Use a prop{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            color
          </code>{" "}
          para alterar a cor dos meteoros.
        </p>
        <ComponentPreview code={`<MeteorShower count={30} color="#a855f7" />`}>
          <MeteorShowerCustomDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
