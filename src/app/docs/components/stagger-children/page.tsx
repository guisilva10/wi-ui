import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { StaggerChildrenDemo } from "./stagger-children-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "StaggerChildren" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "padrao", label: "Padrao", level: 2 },
  { id: "rapido", label: "Rapido", level: 2 },
  { id: "lento", label: "Lento e suave", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "children",
    type: "React.ReactNode",
    description: "Children a serem animados em sequencia (obrigatorio)",
    required: true,
  },
  {
    name: "staggerDelay",
    type: "number",
    default: "0.1",
    description: "Tempo em segundos entre a animacao de cada filho",
  },
  {
    name: "delay",
    type: "number",
    default: "0",
    description: "Delay inicial em segundos antes do primeiro filho animar",
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
    description: "Classes CSS adicionais no container",
  },
];

export default function StaggerChildrenPage() {
  return (
    <DocPage
      title="StaggerChildren"
      description="Container que anima seus filhos em sequencia com delay incremental. Ideal para listas, grids de cards e menus. Respeita prefers-reduced-motion."
      breadcrumbs={BREADCRUMBS}
      badge="Animação"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="stagger-children" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { StaggerChildren } from "@/components/stagger-children";

<StaggerChildren className="space-y-2">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggerChildren>`}
        >
          <StaggerChildrenDemo staggerDelay={0.1} />
        </ComponentPreview>
      </DocSection>

      <DocSection id="padrao" title="Padrao">
        <ComponentPreview
          code={`<StaggerChildren staggerDelay={0.1} className="space-y-2">
  {items.map((item) => (
    <div key={item} className="bg-muted rounded-lg px-4 py-3 text-sm">
      {item}
    </div>
  ))}
</StaggerChildren>`}
        >
          <StaggerChildrenDemo staggerDelay={0.1} />
        </ComponentPreview>
      </DocSection>

      <DocSection id="rapido" title="Rapido">
        <p className="text-muted-foreground text-sm">
          Use{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            staggerDelay=0.05
          </code>{" "}
          para listas longas onde um delay maior ficaria lento demais.
        </p>
        <ComponentPreview
          code={`<StaggerChildren staggerDelay={0.05} className="space-y-2">
  {items.map((item) => (
    <div key={item}>{item}</div>
  ))}
</StaggerChildren>`}
        >
          <StaggerChildrenDemo staggerDelay={0.05} />
        </ComponentPreview>
      </DocSection>

      <DocSection id="lento" title="Lento e suave">
        <p className="text-muted-foreground text-sm">
          Use{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            staggerDelay=0.2
          </code>{" "}
          para hero sections com poucos elementos e animacao mais dramatica.
        </p>
        <ComponentPreview
          code={`<StaggerChildren staggerDelay={0.2} className="space-y-2">
  {items.map((item) => (
    <div key={item}>{item}</div>
  ))}
</StaggerChildren>`}
        >
          <StaggerChildrenDemo staggerDelay={0.2} />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
