import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Button,
  Avatar,
} from "@/shared/ui/components";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Card" },
];

const TOC = [
  { id: "basico", label: "Basico", level: 2 },
  { id: "com-footer", label: "Com Footer e acoes", level: 2 },
  { id: "com-avatar-badge", label: "Com Avatar e Badge", level: 2 },
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "codigo-fonte", label: "Codigo fonte", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais para o Card",
  },
];

export default function CardPage() {
  return (
    <DocPage
      title="Card"
      description="Container de conteudo com borda, fundo e sombra. Composto por Card, CardHeader, CardTitle, CardDescription, CardContent e CardFooter."
      breadcrumbs={BREADCRUMBS}
      badge="Base"
      toc={TOC}
    >
      <DocSection id="basico" title="Basico">
        <ComponentPreview
          code={`<Card>
  <CardHeader>
    <CardTitle>Titulo do Card</CardTitle>
    <CardDescription>Descricao complementar</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Conteudo do card.</p>
  </CardContent>
</Card>`}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Titulo do Card</CardTitle>
              <CardDescription>Descricao complementar</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Conteudo do card.</p>
            </CardContent>
          </Card>
        </ComponentPreview>
      </DocSection>

      <DocSection id="com-footer" title="Com Footer e acoes">
        <ComponentPreview
          code={`<Card>
  <CardHeader>
    <CardTitle>Confirmar acao</CardTitle>
    <CardDescription>Esta acao nao pode ser desfeita.</CardDescription>
  </CardHeader>
  <CardFooter className="gap-2">
    <Button size="sm">Confirmar</Button>
    <Button size="sm" variant="outline">Cancelar</Button>
  </CardFooter>
</Card>`}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Confirmar acao</CardTitle>
              <CardDescription>
                Esta acao nao pode ser desfeita.
              </CardDescription>
            </CardHeader>
            <CardFooter className="gap-2">
              <Button size="sm">Confirmar</Button>
              <Button size="sm" variant="outline">
                Cancelar
              </Button>
            </CardFooter>
          </Card>
        </ComponentPreview>
      </DocSection>

      <DocSection id="com-avatar-badge" title="Com Avatar e Badge">
        <ComponentPreview
          code={`<Card>
  <CardHeader>
    <div className="flex items-center gap-3">
      <Avatar fallback="WI UI" />
      <div>
        <CardTitle>WI.UI Library</CardTitle>
        <CardDescription>v1.0.0</CardDescription>
      </div>
    </div>
  </CardHeader>
  <CardContent className="flex gap-2">
    <Badge variant="success">Estavel</Badge>
    <Badge variant="secondary">Open Source</Badge>
  </CardContent>
</Card>`}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar fallback="WI UI" />
                <div>
                  <CardTitle>WI.UI Library</CardTitle>
                  <CardDescription>v1.0.0</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Badge variant="success">Estavel</Badge>
              <Badge variant="secondary">Open Source</Badge>
            </CardContent>
          </Card>
        </ComponentPreview>
      </DocSection>

      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="card" />
      </DocSection>

      <DocSection id="codigo-fonte" title="Codigo fonte">
        <ComponentSource componentName="card" />
      </DocSection>

      <DocSection id="props" title="Props">
        <p className="text-muted-foreground text-sm">
          Todos os sub-componentes aceitam{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            className
          </code>{" "}
          e as props HTML nativas do elemento correspondente.
        </p>
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
