import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import { TextRevealDemo } from "./text-reveal-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "TextReveal" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "por-palavra", label: "Por palavra", level: 2 },
  { id: "por-caractere", label: "Por caractere", level: 2 },
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "codigo-fonte", label: "Codigo fonte", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "text",
    type: "string",
    description: "Texto a ser revelado (obrigatorio)",
    required: true,
  },
  {
    name: "by",
    type: '"word" | "character"',
    default: '"word"',
    description:
      "Unidade de revelacao: palavra a palavra ou caractere a caractere",
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
    description: "Duracao da animacao de cada token em segundos",
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
    description: "Classes CSS adicionais no wrapper span",
  },
];

export default function TextRevealPage() {
  return (
    <DocPage
      title="TextReveal"
      description="Revela texto palavra por palavra ou caractere por caractere com stagger elegante. Ideal para headings de hero sections e chamadas de impacto."
      breadcrumbs={BREADCRUMBS}
      badge="Animation"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="text-reveal" />
        <ComponentSource componentName="text-reveal" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { TextReveal } from "@/components/text-reveal";

<h1>
  <TextReveal text="Titulo animado" by="word" />
</h1>`}
        >
          <TextRevealDemo by="word" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="por-palavra" title="Por palavra">
        <ComponentPreview
          code={`<h1>
  <TextReveal
    text="Componentes animados para interfaces modernas"
    by="word"
  />
</h1>`}
        >
          <TextRevealDemo by="word" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="por-caractere" title="Por caractere">
        <p className="text-muted-foreground text-sm">
          Use{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            by=&quot;character&quot;
          </code>{" "}
          para textos curtos e de alto impacto. Evitar em textos longos (muitos
          elementos DOM).
        </p>
        <ComponentPreview
          code={`<h1>
  <TextReveal
    text="WI.UI Components"
    by="character"
    duration={0.3}
  />
</h1>`}
        >
          <TextRevealDemo by="character" text="WI.UI Components" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="text-reveal" />
      </DocSection>

      <DocSection id="codigo-fonte" title="Codigo fonte">
        <ComponentSource componentName="text-reveal" />
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
