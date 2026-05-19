import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { AnimatedWaveDemo } from "./animated-wave-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "AnimatedWave" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "className",
    type: "string",
    description: "Classes CSS adicionais no elemento canvas",
  },
];

export default function AnimatedWavePage() {
  return (
    <DocPage
      title="AnimatedWave"
      description="Fundo animado que renderiza caracteres ASCII em ondas sincronizadas via canvas. Adapta-se ao tema (light/dark) e respeita prefers-reduced-motion."
      breadcrumbs={BREADCRUMBS}
      badge="Background"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="animated-wave" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { AnimatedWave } from "@/components/animated-wave";

<div className="relative h-[280px] w-full overflow-hidden rounded-xl">
  <AnimatedWave />
</div>`}
        >
          <AnimatedWaveDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <p className="text-muted-foreground mb-4 text-sm">
          O componente estende todas as props nativas do elemento{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            {"<canvas>"}
          </code>
          .
        </p>
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
