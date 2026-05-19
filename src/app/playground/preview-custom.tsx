"use client";

import { Mail, Search } from "lucide-react";
import { Button } from "@/shared/ui/components/button";
import { Badge } from "@/shared/ui/components/badge";
import { Textarea } from "@/shared/ui/components/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/ui/components/card";
import { Input } from "@/shared/ui/components/input";
import { Separator } from "@/shared/ui/components/separator";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-muted-foreground mb-3 text-xs font-medium tracking-wider uppercase">
      {children}
    </p>
  );
}

function PreviewCustom() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Botões */}
      <div>
        <SectionLabel>Botões</SectionLabel>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="default"
            size="sm"
            className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
          >
            Primário
          </Button>
          <Button variant="secondary" size="sm">
            Secundário
          </Button>
          <Button variant="outline" size="sm">
            Outline
          </Button>
          <Button variant="ghost" size="sm">
            Ghost
          </Button>
          <Button variant="destructive" size="sm">
            Destruir
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <Button
            variant="default"
            size="md"
            className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
          >
            Padrão
          </Button>
          <Button
            variant="default"
            disabled
            size="md"
            className="bg-[var(--primary)] text-[var(--primary-foreground)]"
          >
            Desabilitado
          </Button>
        </div>
      </div>

      {/* Badges */}
      <div>
        <SectionLabel>Badges</SectionLabel>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Padrão</Badge>
          <Badge variant="secondary">Secundário</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Sucesso</Badge>
          <Badge variant="destructive">Erro</Badge>
        </div>
      </div>

      {/* Inputs */}
      <div>
        <SectionLabel>Campos</SectionLabel>
        <div className="space-y-3">
          <Input placeholder="Digite algo..." />
          <Input
            placeholder="Com ícone"
            startIcon={<Mail className="size-4" />}
          />
          <Input
            placeholder="Buscar..."
            startIcon={<Search className="size-4" />}
          />
          <Input placeholder="Com erro" error />
        </div>
      </div>

      {/* Card */}
      <div>
        <SectionLabel>Card</SectionLabel>
        <Card>
          <CardHeader>
            <CardTitle>Título do Card</CardTitle>
            <CardDescription>
              Descrição breve com informações contextuais.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Conteúdo principal com informações relevantes para o usuário.
            </p>
          </CardContent>
          <CardFooter className="gap-2">
            <Button
              size="sm"
              variant="default"
              className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
            >
              Confirmar
            </Button>
            <Button size="sm" variant="outline">
              Cancelar
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Separador */}
      <div>
        <SectionLabel>Separador</SectionLabel>
        <div className="space-y-3">
          <p className="text-muted-foreground text-sm">Conteúdo acima</p>
          <Separator />
          <p className="text-muted-foreground text-sm">Conteúdo abaixo</p>
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-muted-foreground text-xs">ou</span>
            <Separator className="flex-1" />
          </div>
        </div>
      </div>

      {/* Textarea */}
      <div>
        <SectionLabel>Textarea</SectionLabel>
        <Textarea
          placeholder="Escreva uma mensagem..."
          rows={4}
          resize="none"
        />
      </div>
    </div>
  );
}

export { PreviewCustom };
