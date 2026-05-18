import { Avatar } from "@/shared/ui/components/avatar";
import { Badge } from "@/shared/ui/components/badge";
import { Button } from "@/shared/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/components/card";
import { Input } from "@/shared/ui/components/input";
import { Separator } from "@/shared/ui/components/separator";
import { Spinner } from "@/shared/ui/components/spinner";
import { Textarea } from "@/shared/ui/components/textarea";

export default function Page() {
  return (
    <main className="bg-background min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-12">
        <section className="space-y-2">
          <h1 className="text-foreground text-3xl font-bold">
            WI.UI — Componentes Base
          </h1>
          <p className="text-muted-foreground">
            Story 1.1 — 8 componentes base
          </p>
        </section>

        <Separator />

        {/* Button */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Button</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
            <Button isLoading loadingText="Salvando...">
              Salvar
            </Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <Separator />

        {/* Badge */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Badge</h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
          </div>
        </section>

        <Separator />

        {/* Spinner */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Spinner</h2>
          <div className="flex items-center gap-6">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </div>
        </section>

        <Separator />

        {/* Avatar */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Avatar</h2>
          <div className="flex items-end gap-4">
            <Avatar size="sm" fallback="João Silva" />
            <Avatar size="md" fallback="Maria Oliveira" />
            <Avatar size="lg" alt="Pedro Costa" />
            <Avatar size="xl" src="https://i.pravatar.cc/80" alt="Usuário" />
          </div>
        </section>

        <Separator />

        {/* Input & Textarea */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Input / Textarea</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="Nome completo" />
            <Input placeholder="Email" type="email" error />
            <Input placeholder="Desabilitado" disabled />
          </div>
          <Textarea placeholder="Descrição..." rows={4} />
          <Textarea placeholder="Com erro..." error resize="none" />
        </section>

        <Separator />

        {/* Card */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Card</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Título do Card</CardTitle>
                <CardDescription>
                  Descrição complementar com texto de apoio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Conteúdo do card.
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button size="sm">Confirmar</Button>
                <Button size="sm" variant="outline">
                  Cancelar
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar fallback="Wi UI" />
                  <div>
                    <CardTitle>WI.UI Library</CardTitle>
                    <CardDescription>v1.0.0 — base components</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Badge variant="success">Estável</Badge>
                <Badge variant="secondary">Open Source</Badge>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
