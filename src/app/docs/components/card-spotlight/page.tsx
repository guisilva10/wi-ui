import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import { CardSpotlightDemo } from "./card-spotlight-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "CardSpotlight" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "basico", label: "Basico", level: 2 },
  { id: "com-canvas", label: "Com CanvasRevealEffect", level: 2 },
  { id: "cor-customizada", label: "Cor customizada", level: 2 },
  { id: "raio-maior", label: "Raio maior", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "children",
    type: "React.ReactNode",
    description: "Conteudo interno do card (obrigatorio)",
    required: true,
  },
  {
    name: "radius",
    type: "number",
    default: "350",
    description: "Raio em pixels do gradiente spotlight que segue o cursor",
  },
  {
    name: "color",
    type: "string",
    default: '"oklch(0.8234 0.1927 206.47 / 0.15)"',
    description:
      "Cor de fundo do spotlight. Aceita qualquer valor CSS de cor valido",
  },
  {
    name: "overlay",
    type: "React.ReactNode",
    description:
      "Conteudo renderizado dentro do spotlight overlay. Use para compor com CanvasRevealEffect ou outro efeito visual",
  },
  {
    name: "className",
    type: "string",
    description:
      "Classes CSS adicionais. Use para definir background, border, padding e tamanho do card",
  },
];

export default function CardSpotlightPage() {
  return (
    <DocPage
      title="CardSpotlight"
      description="Card com efeito spotlight que segue o cursor do mouse. Ao passar o mouse, revela um gradiente radial suave. Compose com CanvasRevealEffect via prop overlay para adicionar particulas."
      breadcrumbs={BREADCRUMBS}
      badge="Animation"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="card-spotlight" />
        <ComponentSource componentName="card-spotlight" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { CardSpotlight } from "@/components/card-spotlight";

<CardSpotlight className="bg-card border rounded-xl p-6">
  <h3>Meu Card</h3>
  <p>Conteudo do card com spotlight ao hover.</p>
</CardSpotlight>`}
        >
          <CardSpotlightDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="basico" title="Basico">
        <p className="text-muted-foreground text-sm">
          O spotlight segue o cursor com um gradiente radial e partículas
          animadas. O conteudo interno deve ter{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            relative z-10
          </code>{" "}
          para ficar acima do efeito.
        </p>
        <ComponentPreview
          code={`<CardSpotlight className="bg-card border border-border rounded-xl p-6 w-80">
  <div className="relative z-10">
    <h3 className="font-semibold">Feature Destaque</h3>
    <p className="text-muted-foreground text-sm mt-1">
      Descricao da feature com spotlight ao hover.
    </p>
  </div>
</CardSpotlight>`}
        >
          <CardSpotlightDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="com-canvas" title="Com CanvasRevealEffect">
        <p className="text-muted-foreground text-sm">
          Combine com{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            CanvasRevealEffect
          </code>{" "}
          via prop{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            overlay
          </code>{" "}
          para adicionar particulas animadas ao spotlight.
        </p>
        <ComponentPreview
          code={`import { CardSpotlight } from "@/components/card-spotlight";
import { CanvasRevealEffect } from "@/components/canvas-reveal-effect";

<CardSpotlight
  className="bg-card border border-border rounded-xl p-6 w-80"
  overlay={
    <CanvasRevealEffect
      animationSpeed={5}
      containerClassName="bg-transparent absolute inset-0 pointer-events-none"
      colors={[[0, 180, 216], [0, 210, 230]]}
      dotSize={3}
    />
  }
>
  <div className="relative z-10">
    <h3 className="font-semibold">Spotlight + Particulas</h3>
    <p className="text-muted-foreground text-sm mt-1">
      Composicao com CanvasRevealEffect via overlay.
    </p>
  </div>
</CardSpotlight>`}
        >
          <CardSpotlightDemo withCanvas />
        </ComponentPreview>
      </DocSection>

      <DocSection id="cor-customizada" title="Cor customizada">
        <p className="text-muted-foreground text-sm">
          Use a prop{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            color
          </code>{" "}
          para customizar a cor do spotlight. Aceita qualquer valor CSS de cor,
          incluindo rgba e oklch com transparencia.
        </p>
        <ComponentPreview
          code={`<CardSpotlight
  color="oklch(0.7 0.2 30 / 0.2)"
  className="bg-card border border-border rounded-xl p-6 w-80"
>
  <div className="relative z-10">
    <h3 className="font-semibold">Spotlight Laranja</h3>
    <p className="text-muted-foreground text-sm mt-1">
      Cor do spotlight customizada via prop color.
    </p>
  </div>
</CardSpotlight>`}
        >
          <CardSpotlightDemo color="oklch(0.7 0.2 30 / 0.2)" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="raio-maior" title="Raio maior">
        <p className="text-muted-foreground text-sm">
          Aumente o{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            radius
          </code>{" "}
          para um spotlight mais amplo. Util para cards maiores onde o gradiente
          padrao de 350px ficaria pequeno.
        </p>
        <ComponentPreview
          code={`<CardSpotlight
  radius={500}
  className="bg-card border border-border rounded-xl p-6 w-full max-w-lg"
>
  <div className="relative z-10">
    <h3 className="font-semibold">Raio Expandido</h3>
    <p className="text-muted-foreground text-sm mt-1">
      Spotlight com raio de 500px — ideal para cards maiores.
    </p>
  </div>
</CardSpotlight>`}
        >
          <CardSpotlightDemo radius={500} />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
