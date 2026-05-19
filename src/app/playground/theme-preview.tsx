"use client";

import { cn } from "@/lib/cn";
import { Button } from "@/shared/ui/components/button";
import { Badge } from "@/shared/ui/components/badge";
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
import { Search, Mail } from "lucide-react";

interface ThemePreviewProps {
  cssVariables: Record<string, string>;
  isDark: boolean;
  className?: string;
}

function PreviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
        {title}
      </p>
      {children}
    </div>
  );
}

function ThemePreview({ cssVariables, isDark, className }: ThemePreviewProps) {
  return (
    <div
      className={cn(
        "border-border overflow-hidden rounded-xl border",
        isDark ? "dark" : "",
        className,
      )}
      style={cssVariables as React.CSSProperties}
    >
      {/* Inner wrapper com background do tema */}
      <div className="bg-background text-foreground min-h-full p-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Botões */}
          <PreviewSection title="Botões">
            <div className="flex flex-wrap gap-2">
              <Button variant="default" size="sm">
                Primário
              </Button>
              <Button variant="secondary" size="sm">
                Secondary
              </Button>
              <Button variant="outline" size="sm">
                Outline
              </Button>
              <Button variant="ghost" size="sm">
                Ghost
              </Button>
              <Button variant="destructive" size="sm">
                Destructive
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="default" size="md">
                Default
              </Button>
              <Button variant="default" disabled size="md">
                Desabilitado
              </Button>
            </div>
          </PreviewSection>

          {/* Badges */}
          <PreviewSection title="Badges">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </PreviewSection>

          {/* Campos */}
          <PreviewSection title="Campos">
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
          </PreviewSection>

          {/* Card */}
          <PreviewSection title="Card">
            <Card>
              <CardHeader>
                <CardTitle>Título do Card</CardTitle>
                <CardDescription>
                  Descrição breve com informações contextuais.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Conteúdo principal com informações relevantes.
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button size="sm" variant="default">
                  Confirmar
                </Button>
                <Button size="sm" variant="outline">
                  Cancelar
                </Button>
              </CardFooter>
            </Card>
          </PreviewSection>

          {/* Separador */}
          <PreviewSection title="Separador">
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm">Conteúdo acima</p>
              <Separator />
              <p className="text-muted-foreground text-sm">Conteúdo abaixo</p>
            </div>
          </PreviewSection>

          {/* Textarea */}
          <PreviewSection title="Textarea">
            <textarea
              placeholder="Escreva uma mensagem..."
              className="border-input bg-background text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 text-sm"
              rows={3}
            />
          </PreviewSection>
        </div>
      </div>
    </div>
  );
}

export { ThemePreview };
