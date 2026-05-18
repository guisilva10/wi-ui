import { DocPage } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
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

const PROPS = [
  {
    name: "className",
    type: "string",
    default: "—",
    description: "Classes CSS adicionais para o Card",
  },
];

export default function CardPage() {
  return (
    <DocPage
      title="Card"
      description="Container de conteúdo com borda, fundo e sombra. Composto por Card, CardHeader, CardTitle, CardDescription, CardContent e CardFooter."
      breadcrumbs={BREADCRUMBS}
    >
      {/* Básico */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Básico</h2>
        <ComponentPreview
          code={`<Card>
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
    <CardDescription>Descrição complementar</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Conteúdo do card.</p>
  </CardContent>
</Card>`}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Título do Card</CardTitle>
              <CardDescription>Descrição complementar</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">Conteúdo do card.</p>
            </CardContent>
          </Card>
        </ComponentPreview>
      </section>

      {/* Com Footer */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">
          Com Footer e ações
        </h2>
        <ComponentPreview
          code={`<Card>
  <CardHeader>
    <CardTitle>Confirmar ação</CardTitle>
    <CardDescription>Esta ação não pode ser desfeita.</CardDescription>
  </CardHeader>
  <CardFooter className="gap-2">
    <Button size="sm">Confirmar</Button>
    <Button size="sm" variant="outline">Cancelar</Button>
  </CardFooter>
</Card>`}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Confirmar ação</CardTitle>
              <CardDescription>
                Esta ação não pode ser desfeita.
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
      </section>

      {/* Com Avatar e Badge */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">
          Com Avatar e Badge
        </h2>
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
    <Badge variant="success">Estável</Badge>
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
              <Badge variant="success">Estável</Badge>
              <Badge variant="secondary">Open Source</Badge>
            </CardContent>
          </Card>
        </ComponentPreview>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Props</h2>
        <p className="text-muted-foreground text-sm">
          Todos os sub-componentes aceitam{" "}
          <code className="bg-muted rounded px-1 text-xs">className</code> e as
          props HTML nativas do elemento correspondente.
        </p>
        <PropsTable props={PROPS} />
      </section>
    </DocPage>
  );
}
