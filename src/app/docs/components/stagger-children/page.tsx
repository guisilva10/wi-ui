import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import { StaggerChildrenDemo } from "./stagger-children-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "StaggerChildren" },
];

const TOC = [
  { id: "padrao", label: "Padrao", level: 2 },
  { id: "rapido", label: "Rapido", level: 2 },
  { id: "lento", label: "Lento e suave", level: 2 },
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "codigo-fonte", label: "Codigo fonte", level: 2 },
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
      badge="Animation"
      toc={TOC}
    >
      <DocSection id="padrao" title="Padrao">
        <ComponentPreview
          code={`const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

<StaggerChildren className="space-y-2">
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

      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="stagger-children" />
      </DocSection>

      <DocSection id="codigo-fonte" title="Codigo fonte">
        <ComponentSource componentName="stagger-children" />
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
