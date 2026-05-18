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
import { Textarea } from "@/shared/ui/components/textarea";
import { Avatar } from "@/shared/ui/components/avatar";
import { PricingCard } from "@/shared/ui/components/pricing-card";
import { ScarcityBadge } from "@/shared/ui/components/scarcity-badge";
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
        "overflow-hidden rounded-xl border",
        isDark ? "dark" : "",
        className,
      )}
      style={cssVariables as React.CSSProperties}
    >
      {/* Inner wrapper com background do tema */}
      <div className="bg-background text-foreground min-h-full space-y-8 p-6">
        {/* Buttons */}
        <PreviewSection title="Buttons">
          <div className="flex flex-wrap gap-2">
            <Button variant="default" size="sm">
              Primary
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
            <Button variant="default" size="lg">
              Large
            </Button>
            <Button variant="default" disabled size="md">
              Disabled
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

        {/* Inputs */}
        <PreviewSection title="Inputs">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input placeholder="Digite algo..." />
            <Input
              placeholder="Com ícone"
              startIcon={<Mail className="size-4" />}
            />
            <Input
              placeholder="Com busca"
              startIcon={<Search className="size-4" />}
            />
            <Input placeholder="Com erro" error />
          </div>
          <Textarea
            placeholder="Escreva uma mensagem..."
            resize="none"
            className="min-h-20"
          />
        </PreviewSection>

        {/* Avatars */}
        <PreviewSection title="Avatars">
          <div className="flex items-center gap-3">
            <Avatar size="sm" fallback="João Silva" />
            <Avatar size="md" fallback="Maria Santos" />
            <Avatar size="lg" fallback="Pedro Lima" />
            <Avatar size="xl" fallback="Ana Costa" />
          </div>
        </PreviewSection>

        {/* Card */}
        <PreviewSection title="Card">
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Título do Card</CardTitle>
              <CardDescription>
                Descrição breve com informações contextuais do card.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Conteúdo principal com informações relevantes para o usuário.
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

        {/* FOMO — ScarcityBadge */}
        <PreviewSection title="Scarcity Badge">
          <div className="max-w-sm space-y-3">
            <ScarcityBadge total={100} remaining={8} showBar />
            <ScarcityBadge total={50} remaining={2} showBar />
          </div>
        </PreviewSection>

        {/* FOMO — PricingCard */}
        <PreviewSection title="Pricing Card">
          <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
            <PricingCard
              title="Starter"
              description="Para projetos pessoais"
              price="R$ 29"
              originalPrice="R$ 59"
              period="/mês"
              badge="Popular"
              features={[
                "10 componentes",
                "Dark mode",
                "TypeScript",
                { text: "Suporte prioritário", included: false },
              ]}
              cta={{ label: "Começar agora" }}
            />
            <PricingCard
              title="Pro"
              description="Para times que entregam"
              price="R$ 79"
              period="/mês"
              highlighted
              badge="Recomendado"
              features={[
                "Componentes ilimitados",
                "Dark mode",
                "TypeScript",
                "Suporte prioritário",
              ]}
              cta={{ label: "Assinar Pro" }}
            />
          </div>
        </PreviewSection>
      </div>
    </div>
  );
}

export { ThemePreview };
