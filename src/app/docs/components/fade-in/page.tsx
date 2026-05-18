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
  { id: "padrao", label: "Padrao (up)", level: 2 },
  { id: "direcoes", label: "Direcoes", level: 2 },
  { id: "sem-direcao", label: "Sem direcao", level: 2 },
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "codigo-fonte", label: "Codigo fonte", level: 2 },
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
      <DocSection id="padrao" title="Padrao (up)">
        <ComponentPreview
          code={`<FadeIn direction="up">
  <div className="bg-muted rounded-xl p-8 text-center">
    Conteudo animado
  </div>
</FadeIn>`}
        >
          <FadeInDemo direction="up" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="direcoes" title="Direcoes">
        <p className="text-muted-foreground text-sm">
          Use{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            direction
          </code>{" "}
          para controlar de onde o elemento entra na tela.
        </p>
        <ComponentPreview
          code={`<FadeIn direction="left">
  <p>Entra da esquerda</p>
</FadeIn>

<FadeIn direction="right" delay={0.1}>
  <p>Entra da direita</p>
</FadeIn>

<FadeIn direction="down" delay={0.2}>
  <p>Entra de cima</p>
</FadeIn>`}
        >
          <FadeInDemo direction="left" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="sem-direcao" title="Sem direcao">
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

      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="fade-in" />
      </DocSection>

      <DocSection id="codigo-fonte" title="Codigo fonte">
        <ComponentSource componentName="fade-in" />
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
