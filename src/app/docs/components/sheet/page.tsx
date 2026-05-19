import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { SheetDemo } from "./sheet-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Sheet" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "open",
    type: "boolean",
    default: "false",
    description: "Controla visibilidade",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: "--",
    description: "Callback ao abrir/fechar",
  },
  {
    name: "side",
    type: '"top" | "bottom" | "left" | "right"',
    default: '"right"',
    description: "Lado de onde aparece",
  },
];

export default function SheetPage() {
  return (
    <DocPage
      title="Sheet"
      description="Painel lateral com variantes de posicao e overlay."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="sheet" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/sheet";

const [open, setOpen] = useState(false);

<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Titulo</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`}
        >
          <SheetDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
