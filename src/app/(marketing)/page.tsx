"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Copy,
  Check,
  Terminal,
  Star,
  Mail,
  Lock,
  Activity,
  TrendingUp,
  Users,
  CreditCard,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Avatar,
  Input,
  Separator,
} from "@/shared/ui/components";
import { cn } from "@/lib/cn";

const TYPING_WORDS = ["copia", "cola", "customiza"];

function TypingEffect() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = TYPING_WORDS[wordIndex] ?? "";
  const displayed = currentWord.slice(0, charIndex);

  useEffect(() => {
    const speed = isDeleting ? 50 : 100;
    const pause = !isDeleting && charIndex === currentWord.length ? 1800 : 0;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex === currentWord.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % TYPING_WORDS.length);
      } else {
        setCharIndex((c) => c + (isDeleting ? -1 : 1));
      }
    }, pause || speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentWord]);

  return (
    <span className="text-foreground">
      {displayed}
      <span className="border-foreground ml-px inline-block w-[2px] animate-pulse border-r-2">
        &nbsp;
      </span>
    </span>
  );
}

function CopyCommand() {
  const [copied, setCopied] = useState(false);
  const command = "npx @wi-ui/cli add button";

  async function handleCopy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="border-border bg-muted/30 hover:bg-muted/50 group inline-flex max-w-full items-center gap-2 overflow-hidden rounded-lg border px-3 py-2.5 font-mono text-xs transition-colors sm:gap-3 sm:px-4 sm:text-sm"
    >
      <Terminal
        className="text-muted-foreground hidden size-4 sm:block"
        aria-hidden="true"
      />
      <span className="text-muted-foreground hidden sm:inline">$</span>
      <span className="text-foreground truncate">{command}</span>
      {copied ? (
        <Check className="size-3.5 text-emerald-500" aria-hidden="true" />
      ) : (
        <Copy
          className="text-muted-foreground/50 group-hover:text-muted-foreground size-3.5 transition-colors"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

function HeroShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Login Form */}
      <Card className="sm:col-span-2 lg:col-span-1">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Criar conta</CardTitle>
          <CardDescription className="text-xs">
            Preencha os campos para começar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-muted-foreground text-xs font-medium">
              Email
            </label>
            <div className="relative">
              <Mail className="text-muted-foreground absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
              <Input
                placeholder="nome@exemplo.com"
                className="h-9 pl-9 text-sm"
                readOnly
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-muted-foreground text-xs font-medium">
              Senha
            </label>
            <div className="relative">
              <Lock className="text-muted-foreground absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
              <Input
                type="password"
                placeholder="••••••••"
                className="h-9 pl-9 text-sm"
                readOnly
              />
            </div>
          </div>
          <Button className="w-full" size="sm">
            Continuar
          </Button>
          <div className="relative py-2">
            <Separator />
            <span className="bg-card text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-[10px]">
              ou continue com
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              Google
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              GitHub
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats + Notifications stack */}
      <div className="flex flex-col gap-4">
        {/* Mini Stats */}
        <Card>
          <CardContent className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-muted-foreground text-xs font-medium">
                Receita mensal
              </span>
              <TrendingUp className="size-3.5 text-emerald-500" />
            </div>
            <p className="text-foreground text-2xl font-bold">R$ 45.231</p>
            <p className="text-muted-foreground mt-1 text-[11px]">
              +20.1% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="flex-1">
          <CardHeader className="p-4 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Notificações</CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                3 novas
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2.5 px-4 pb-4">
            {[
              {
                icon: Activity,
                text: "Deploy concluído com sucesso",
                time: "2min",
              },
              {
                icon: Users,
                text: "5 novos usuários registrados",
                time: "1h",
              },
              {
                icon: Star,
                text: "Nova avaliação 5 estrelas",
                time: "3h",
              },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-3 text-sm">
                <div className="bg-muted mt-0.5 rounded-md p-1.5">
                  <item.icon className="text-muted-foreground size-3" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-xs">
                    {item.text}
                  </p>
                  <p className="text-muted-foreground text-[10px]">
                    {item.time} atrás
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Team + Payment stack */}
      <div className="flex flex-col gap-4">
        {/* Team members */}
        <Card>
          <CardHeader className="p-4 pb-3">
            <CardTitle className="text-sm">Equipe</CardTitle>
            <CardDescription className="text-[11px]">
              Gerencie membros do projeto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 px-4 pb-4">
            {[
              { name: "Ana Silva", role: "Admin", initials: "AS" },
              { name: "Carlos Lima", role: "Editor", initials: "CL" },
              { name: "Julia Santos", role: "Viewer", initials: "JS" },
            ].map((member) => (
              <div
                key={member.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Avatar size="sm" fallback={member.initials} />
                  <div>
                    <p className="text-foreground text-xs font-medium">
                      {member.name}
                    </p>
                    <p className="text-muted-foreground text-[10px]">
                      {member.role}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-[10px]">
                  Editar
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment method */}
        <Card className="flex-1">
          <CardContent className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <CreditCard className="text-muted-foreground size-4" />
              <span className="text-sm font-medium">Pagamento</span>
            </div>
            <div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-foreground flex size-8 items-center justify-center rounded-md">
                  <span className="text-background text-[10px] font-bold">
                    VISA
                  </span>
                </div>
                <div>
                  <p className="text-foreground text-xs font-medium">
                    •••• 4242
                  </p>
                  <p className="text-muted-foreground text-[10px]">
                    Expira 12/28
                  </p>
                </div>
              </div>
              <Badge variant="success" className="text-[10px]">
                Ativo
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-5xl px-4 pt-16 pb-24 sm:pt-24">
        <div className="mb-14 max-w-2xl">
          <h1 className="text-foreground/60 mb-4 text-2xl font-bold tracking-tight sm:text-4xl lg:text-6xl">
            Componentes que você <TypingEffect /> e faz seu.
          </h1>
          <p className="text-muted-foreground mb-8 max-w-lg text-lg leading-relaxed">
            Componentes React acessíveis. Sem dependências ocultas, sem
            black-box. Copy-paste e customize.
          </p>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href="/docs"
              className={cn(
                "bg-foreground text-background hover:bg-foreground/90 inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium transition-colors",
              )}
            >
              Começar
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <CopyCommand />
          </div>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <div className="bg-border/50 h-px flex-1" />
          <span className="text-muted-foreground/50 font-mono text-xs tracking-widest uppercase">
            preview
          </span>
          <div className="bg-border/50 h-px flex-1" />
        </div>

        <HeroShowcase />

        <div className="mt-10 flex justify-end">
          <Link
            href="/docs"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
          >
            Ver documentação
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
