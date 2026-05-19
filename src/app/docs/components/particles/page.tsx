import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { ParticlesDemo, ParticlesWithLinesDemo } from "./particles-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Particles" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "com-linhas", label: "Com Linhas", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "quantity",
    type: "number",
    default: "50",
    description: "Quantidade de particulas renderizadas",
  },
  {
    name: "speed",
    type: "number",
    default: "0.5",
    description: "Velocidade de movimento das particulas",
  },
  {
    name: "size",
    type: "number",
    default: "2",
    description: "Tamanho de cada particula em pixels",
  },
  {
    name: "color",
    type: "string",
    description:
      "Cor das particulas (CSS color). Usa a cor primaria por padrao",
  },
  {
    name: "connectDistance",
    type: "number",
    default: "100",
    description: "Distancia maxima para conectar particulas com linhas",
  },
  {
    name: "showLines",
    type: "boolean",
    default: "false",
    description: "Exibe linhas de conexao entre particulas proximas",
  },
];

export default function ParticlesPage() {
  return (
    <DocPage
      title="Particles"
      description="Sistema de particulas animadas renderizado em canvas. Suporta conexao entre particulas, velocidade e cor customizavel. Otimo para backgrounds interativos."
      breadcrumbs={BREADCRUMBS}
      badge="Animacao"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="particles" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Particles } from "@/components/particles";

<div className="relative h-[300px] overflow-hidden rounded-lg">
  <Particles quantity={60} speed={0.5} className="absolute inset-0 h-full w-full" />
</div>`}
        >
          <ParticlesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="com-linhas" title="Com Linhas">
        <p className="text-muted-foreground text-sm">
          Ative{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            showLines
          </code>{" "}
          para conectar particulas proximas com linhas finas.
        </p>
        <ComponentPreview
          code={`<Particles quantity={40} showLines connectDistance={120} className="absolute inset-0 h-full w-full" />`}
        >
          <ParticlesWithLinesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
