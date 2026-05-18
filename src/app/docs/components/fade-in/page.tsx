import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import { FadeInDemo } from "./fade-in-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "FadeIn" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "up", label: "Up (padrao)", level: 2 },
  { id: "down", label: "Down", level: 2 },
  { id: "left", label: "Left", level: 2 },
  { id: "right", label: "Right", level: 2 },
  { id: "none", label: "None (sem movimento)", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "children",
    type: "React.ReactNode",
    description: "Conteudo a ser animado (obrigatorio)",
    required: true,
  },
  {
    name: "direction",
    type: '"up" | "down" | "left" | "right" | "none"',
    default: '"up"',
    description: "Direcao do movimento durante a entrada",
  },
  {
    name: "delay",
    type: "number",
    default: "0",
    description: "Delay em segundos antes de iniciar a animacao",
  },
  {
    name: "duration",
    type: "number",
    default: "0.5",
    description: "Duracao da animacao em segundos",
  },
  {
    name: "once",
    type: "boolean",
    default: "true",
    description: "Anima apenas na primeira vez que entra no viewport",
  },
  {
    name: "className",
    type: "string",
    description: "Classes CSS adicionais no wrapper",
  },
];

export default function FadeInPage() {
  return (
    <DocPage
      title="FadeIn"
      description="Wrapper que anima a entrada de qualquer elemento com fade. Trigger via IntersectionObserver ao entrar no viewport. Respeita prefers-reduced-motion."
      breadcrumbs={BREADCRUMBS}
      badge="Animation"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="fade-in" />
        <ComponentSource componentName="fade-in" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { FadeIn } from "@/components/fade-in";

<FadeIn>
  <div>Conteudo animado</div>
</FadeIn>`}
        >
          <FadeInDemo direction="up" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="up" title="Up (padrao)">
        <ComponentPreview
          code={`<FadeIn direction="up">
  <div>Entra de baixo para cima</div>
</FadeIn>`}
        >
          <FadeInDemo direction="up" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="down" title="Down">
        <ComponentPreview
          code={`<FadeIn direction="down">
  <div>Entra de cima para baixo</div>
</FadeIn>`}
        >
          <FadeInDemo direction="down" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="left" title="Left">
        <ComponentPreview
          code={`<FadeIn direction="left">
  <div>Entra da esquerda</div>
</FadeIn>`}
        >
          <FadeInDemo direction="left" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="right" title="Right">
        <ComponentPreview
          code={`<FadeIn direction="right">
  <div>Entra da direita</div>
</FadeIn>`}
        >
          <FadeInDemo direction="right" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="none" title="None (sem movimento)">
        <p className="text-muted-foreground text-sm">
          Use{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            direction=&quot;none&quot;
          </code>{" "}
          para apenas fade sem movimento.
        </p>
        <ComponentPreview
          code={`<FadeIn direction="none" duration={0.8}>
  <div>Apenas fade, sem movimento</div>
</FadeIn>`}
        >
          <FadeInDemo direction="none" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
