import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/shared/ui/components/table";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Table" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais",
  },
];

export default function TablePage() {
  return (
    <DocPage
      title="Table"
      description="Tabela estilizada com sub-componentes compostos."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="table" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Valor</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Plano Pro</TableCell>
      <TableCell>Ativo</TableCell>
      <TableCell className="text-right">R$ 99,00</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        >
          <Table>
            <TableCaption>Lista de assinaturas recentes.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Plano Pro</TableCell>
                <TableCell>Ativo</TableCell>
                <TableCell className="text-right">R$ 99,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Plano Starter</TableCell>
                <TableCell>Ativo</TableCell>
                <TableCell className="text-right">R$ 29,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Plano Enterprise</TableCell>
                <TableCell>Pendente</TableCell>
                <TableCell className="text-right">R$ 299,00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
