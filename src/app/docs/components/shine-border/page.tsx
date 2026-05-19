import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import {
  ShineBorderDemo,
  ShineBorderMulticolorDemo,
} from "./shine-border-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Shine Border" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "multicolor", label: "Multicolor", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "borderWidth",
    type: "number",
    default: "1",
    description: "Espessura da borda em pixels",
  },
  {
    name: "duration",
    type: "number",
    default: "8",
    description: "Duracao de uma volta completa do brilho em segundos",
  },
  {
    name: "color",
    type: "string | string[]",
    default: '"oklch(0.8234 0.1927 206.47)"',
    description: "Cor ou array de cores para o gradiente de brilho",
  },
];

export default function ShineBorderPage() {
  return (
    <DocPage
      title="Shine Border"
      description="Wrapper com borda que exibe um brilho rotativo em loop. Suporta multiplas cores em gradiente. Ideal para cards premium e elementos de destaque."
      breadcrumbs={BREADCRUMBS}
      badge="Animacao"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="shine-border" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { ShineBorder } from "@/components/shine-border";

<ShineBorder borderWidth={1} duration={8}>
  <div className="p-8">
    <h3>Shine Border</h3>
  </div>
</ShineBorder>`}
        >
          <ShineBorderDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="multicolor" title="Multicolor">
        <p className="text-muted-foreground text-sm">
          Passe um array para{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            color
          </code>{" "}
          para criar um gradiente multicolorido.
        </p>
        <ComponentPreview
          code={`<ShineBorder color={["oklch(0.8234 0.1927 206.47)", "#f43f5e", "#a855f7"]}>
  <div className="p-8">Multicolor</div>
</ShineBorder>`}
        >
          <ShineBorderMulticolorDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
