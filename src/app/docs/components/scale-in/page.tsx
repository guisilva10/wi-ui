import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import { ScaleInDemo } from "./scale-in-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "ScaleIn" },
];

const TOC = [
  { id: "padrao", label: "Padrao", level: 2 },
  { id: "sutil", label: "Sutil", level: 2 },
  { id: "dramatico", label: "Dramatico", level: 2 },
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
    name: "initialScale",
    type: "number",
    default: "0.9",
    description:
      "Escala inicial (0 a 1). Menor = efeito mais dramatico. Recomendado: 0.8 a 0.95",
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
    default: "0.4",
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

export default function ScaleInPage() {
  return (
    <DocPage
      title="ScaleIn"
      description="Scale entrance animation com spring physics. Escala de initialScale ate 1 com fade in simultaneo. Ideal para cards, modals e popovers."
      breadcrumbs={BREADCRUMBS}
      badge="Animation"
      toc={TOC}
    >
      <DocSection id="padrao" title="Padrao">
        <ComponentPreview
          code={`<ScaleIn>
  <div className="bg-muted rounded-xl p-8">
    Conteudo com scale in
  </div>
</ScaleIn>`}
        >
          <ScaleInDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="sutil" title="Sutil">
        <p className="text-muted-foreground text-sm">
          Scale mais sutil com{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            initialScale=0.95
          </code>
          . Bom para cards em listas.
        </p>
        <ComponentPreview
          code={`<ScaleIn initialScale={0.95} duration={0.3}>
  <div>Entrada sutil, quase imperceptivel</div>
</ScaleIn>`}
        >
          <ScaleInDemo initialScale={0.95} duration={0.3} />
        </ComponentPreview>
      </DocSection>

      <DocSection id="dramatico" title="Dramatico">
        <p className="text-muted-foreground text-sm">
          Efeito mais dramatico com{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            initialScale=0.7
          </code>
          . Bom para modals e overlays.
        </p>
        <ComponentPreview
          code={`<ScaleIn initialScale={0.7} duration={0.5}>
  <div>Entrada dramatica de modal</div>
</ScaleIn>`}
        >
          <ScaleInDemo initialScale={0.7} duration={0.5} />
        </ComponentPreview>
      </DocSection>

      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="scale-in" />
      </DocSection>

      <DocSection id="codigo-fonte" title="Codigo fonte">
        <ComponentSource componentName="scale-in" />
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
