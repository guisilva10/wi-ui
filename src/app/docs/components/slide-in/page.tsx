import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { SlideInDemo } from "./slide-in-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "SlideIn" },
];

const TOC = [
  { id: "esquerda", label: "Da esquerda", level: 2 },
  { id: "direita", label: "Da direita", level: 2 },
  { id: "distancia", label: "Distancia customizada", level: 2 },
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
    type: '"left" | "right" | "top" | "bottom"',
    default: '"left"',
    description: "Direcao de onde o elemento entra",
  },
  {
    name: "distance",
    type: "number",
    default: "40",
    description: "Distancia em pixels do ponto inicial ao final",
  },
  {
    name: "delay",
    type: "number",
    default: "0",
    description: "Delay em segundos antes de iniciar",
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

export default function SlideInPage() {
  return (
    <DocPage
      title="SlideIn"
      description="Slide entrance animation com direcao customizavel. Combina translate + opacity para uma entrada fluida. Respeita prefers-reduced-motion."
      breadcrumbs={BREADCRUMBS}
      badge="Animation"
      toc={TOC}
    >
      <DocSection id="esquerda" title="Da esquerda">
        <ComponentPreview
          code={`<SlideIn direction="left">
  <div>Entra deslizando da esquerda</div>
</SlideIn>`}
        >
          <SlideInDemo direction="left" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="direita" title="Da direita">
        <ComponentPreview
          code={`<SlideIn direction="right">
  <div>Entra deslizando da direita</div>
</SlideIn>`}
        >
          <SlideInDemo direction="right" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="distancia" title="Distancia customizada">
        <p className="text-muted-foreground text-sm">
          Controle o quanto o elemento se desloca com a prop{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            distance
          </code>
          .
        </p>
        <ComponentPreview
          code={`<SlideIn direction="bottom" distance={80} duration={0.6}>
  <div>Entra de baixo com deslocamento maior</div>
</SlideIn>`}
        >
          <SlideInDemo direction="bottom" distance={80} />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
