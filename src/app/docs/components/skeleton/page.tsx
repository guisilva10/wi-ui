import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { SkeletonDemo, SkeletonCardDemo } from "./skeleton-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Skeleton" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "card", label: "Skeleton Card", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "className",
    type: "string",
    description:
      "Classes CSS para definir tamanho e forma. Use w-*, h-*, rounded-* para customizar",
  },
];

export default function SkeletonPage() {
  return (
    <DocPage
      title="Skeleton"
      description="Placeholder animado com pulse para indicar carregamento de conteudo. Simples div com animate-pulse. Combine com className para criar formatos customizados."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="skeleton" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Skeleton } from "@/components/skeleton";

<div className="flex items-center gap-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[200px]" />
    <Skeleton className="h-4 w-[160px]" />
  </div>
</div>`}
        >
          <SkeletonDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="card" title="Skeleton Card">
        <p className="text-muted-foreground text-sm">
          Combine multiplos Skeletons para simular layouts complexos como cards
          de conteudo.
        </p>
        <ComponentPreview
          code={`<div className="rounded-xl border p-6 space-y-4">
  <Skeleton className="h-40 w-full rounded-lg" />
  <div className="space-y-2">
    <Skeleton className="h-5 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
</div>`}
        >
          <SkeletonCardDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
