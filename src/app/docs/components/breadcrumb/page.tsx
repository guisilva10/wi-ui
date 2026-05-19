import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { BreadcrumbDemo } from "./breadcrumb-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Breadcrumb" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "subcomponentes", label: "Subcomponentes", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "Breadcrumb",
    type: "nav",
    description: "Container raiz (elemento nav com aria-label)",
  },
  {
    name: "BreadcrumbList",
    type: "ol",
    description: "Lista ordenada de itens do breadcrumb",
  },
  {
    name: "BreadcrumbItem",
    type: "li",
    description: "Item individual do breadcrumb",
  },
  {
    name: "BreadcrumbLink",
    type: "a",
    description: "Link clicavel para um nivel anterior",
  },
  {
    name: "BreadcrumbPage",
    type: "span",
    description: "Pagina atual (nao clicavel, aria-current=page)",
  },
  {
    name: "BreadcrumbSeparator",
    type: "li",
    description: "Separador entre itens (exibe / por padrao)",
  },
  {
    name: "BreadcrumbEllipsis",
    type: "span",
    description: "Reticencias para breadcrumbs longos truncados",
  },
];

export default function BreadcrumbPage() {
  return (
    <DocPage
      title="Breadcrumb"
      description="Navegacao hierarquica que indica a localizacao atual dentro da estrutura do site. Acessivel por padrao com aria-label e aria-current."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="breadcrumb" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/breadcrumb";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
        >
          <BreadcrumbDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="subcomponentes" title="Subcomponentes">
        <p className="text-muted-foreground text-sm">
          O componente e composto por partes independentes que podem ser
          combinadas livremente.
        </p>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
