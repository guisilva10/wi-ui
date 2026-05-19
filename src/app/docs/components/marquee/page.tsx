import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { MarqueeDemo } from "./marquee-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Marquee" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "vertical", label: "Vertical", level: 2 },
  { id: "reverse", label: "Reverse", level: 2 },
  { id: "pause-on-hover", label: "Pause on Hover", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "reverse",
    type: "boolean",
    default: "false",
    description: "Inverte a direcao da animacao",
  },
  {
    name: "pauseOnHover",
    type: "boolean",
    default: "false",
    description: "Pausa a animacao quando o cursor esta sobre o componente",
  },
  {
    name: "vertical",
    type: "boolean",
    default: "false",
    description: "Muda a direcao do scroll para vertical",
  },
  {
    name: "repeat",
    type: "number",
    default: "4",
    description:
      "Numero de vezes que o conteudo e duplicado para preencher o loop",
  },
  {
    name: "className",
    type: "string",
    description: "Classes CSS adicionais no wrapper",
  },
];

export default function MarqueePage() {
  return (
    <DocPage
      title="Marquee"
      description="Scroll infinito de conteudo em loop. Suporta direcao horizontal e vertical, reversao e pausa no hover. Ideal para logos, depoimentos e social proof."
      breadcrumbs={BREADCRUMBS}
      badge="Animação"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="marquee" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Marquee } from "@/components/marquee";

<Marquee>
  <span>Item 1</span>
  <span>Item 2</span>
  <span>Item 3</span>
</Marquee>`}
        >
          <MarqueeDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="vertical" title="Vertical">
        <p className="text-muted-foreground text-sm">
          Use{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            vertical
          </code>{" "}
          para scroll de cima para baixo. Defina uma altura fixa no container.
        </p>
        <ComponentPreview
          code={`<div className="h-48 overflow-hidden">
  <Marquee vertical>
    <span>Item 1</span>
    <span>Item 2</span>
    <span>Item 3</span>
  </Marquee>
</div>`}
        >
          <MarqueeDemo vertical />
        </ComponentPreview>
      </DocSection>

      <DocSection id="reverse" title="Reverse">
        <p className="text-muted-foreground text-sm">
          Use{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            reverse
          </code>{" "}
          para inverter a direcao do scroll.
        </p>
        <ComponentPreview
          code={`<Marquee reverse>
  <span>Item 1</span>
  <span>Item 2</span>
</Marquee>`}
        >
          <MarqueeDemo reverse />
        </ComponentPreview>
      </DocSection>

      <DocSection id="pause-on-hover" title="Pause on Hover">
        <p className="text-muted-foreground text-sm">
          Use{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            pauseOnHover
          </code>{" "}
          para pausar a animacao quando o usuario passa o cursor por cima.
        </p>
        <ComponentPreview
          code={`<Marquee pauseOnHover>
  <span>Item 1</span>
  <span>Item 2</span>
</Marquee>`}
        >
          <MarqueeDemo pauseOnHover />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
