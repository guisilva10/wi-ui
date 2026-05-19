import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { DialogDemo } from "./dialog-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Dialog" },
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
    description: "Controla visibilidade do dialog",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: "--",
    description: "Callback ao abrir/fechar",
  },
];

export default function DialogPage() {
  return (
    <DocPage
      title="Dialog"
      description="Modal dialog com overlay, ESC para fechar e scroll lock."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="dialog" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/dialog";

const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Titulo</DialogTitle>
      <DialogDescription>Descricao</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <button onClick={() => setOpen(false)}>Fechar</button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        >
          <DialogDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
