import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { BlurFadeDemo } from "./blur-fade-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Blur Fade" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "delay",
    type: "number",
    default: "0",
    description: "Atraso em segundos antes de iniciar a animacao",
  },
  {
    name: "duration",
    type: "number",
    default: "0.4",
    description: "Duracao da animacao de entrada em segundos",
  },
  {
    name: "blur",
    type: "string",
    default: '"6px"',
    description: "Intensidade do blur inicial",
  },
  {
    name: "yOffset",
    type: "number",
    default: "6",
    description:
      "Deslocamento vertical inicial em pixels (positivo = de baixo)",
  },
  {
    name: "inView",
    type: "boolean",
    default: "true",
    description:
      "Se verdadeiro, anima apenas quando o elemento entra na viewport",
  },
];

export default function BlurFadePage() {
  return (
    <DocPage
      title="Blur Fade"
      description="Animacao de entrada com blur e fade. O elemento aparece suavemente com desfoque gradual ao entrar na viewport. Ideal para listas, secoes e cards escalonados."
      breadcrumbs={BREADCRUMBS}
      badge="Animacao"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="blur-fade" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { BlurFade } from "@/components/blur-fade";

{items.map((item, i) => (
  <BlurFade key={item} delay={i * 0.1}>
    <div className="rounded-lg border p-4">{item}</div>
  </BlurFade>
))}`}
        >
          <BlurFadeDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
