"use client";

import { useState } from "react";
import {
  TrendingUp,
  Users,
  Target,
  CreditCard,
  UserPlus,
  MessageCircle,
  Activity,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";
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

// Mini bar chart usando divs
function MiniBarChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex h-10 items-end gap-0.5">
      {data.map((val, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm bg-[var(--primary)]/60 transition-all"
          style={{ height: `${(val / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

// Mini line chart SVG
function MiniLineChart() {
  const points = [40, 55, 45, 70, 60, 80, 75, 90, 85, 95];
  const w = 120;
  const h = 40;
  const pts = points
    .map((p, i) => `${(i / (points.length - 1)) * w},${h - (p / 100) * h}`)
    .join(" ");
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="overflow-visible"
    >
      <polyline
        points={pts}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Card: Total Revenue
function CardRevenue() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardDescription>Receita Total</CardDescription>
          <DollarSign className="text-muted-foreground size-4" />
        </div>
        <CardTitle className="text-2xl">R$ 15.231,89</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground flex items-center gap-1 text-xs">
          <TrendingUp className="size-3 text-emerald-500" />
          <span className="text-emerald-500">+20,1%</span> em relação ao mês
          anterior
        </p>
        <div className="mt-3">
          <MiniLineChart />
        </div>
      </CardContent>
    </Card>
  );
}

// Card: Subscriptions
function CardSubscriptions() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardDescription>Assinaturas</CardDescription>
          <Users className="text-muted-foreground size-4" />
        </div>
        <CardTitle className="text-2xl">+2.350</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground flex items-center gap-1 text-xs">
          <TrendingUp className="size-3 text-emerald-500" />
          <span className="text-emerald-500">+180,1%</span> em relação ao mês
          anterior
        </p>
        <div className="mt-3">
          <MiniBarChart data={[30, 45, 40, 60, 55, 70, 65]} />
        </div>
      </CardContent>
    </Card>
  );
}

// Card: Calendário
function CardCalendar() {
  const [selected, setSelected] = useState(14);
  const today = 14;
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const firstDay = 3; // quarta-feira

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Janeiro 2025</CardTitle>
          <div className="flex gap-1">
            <button className="text-muted-foreground hover:text-foreground p-1">
              <ChevronLeft className="size-4" />
            </button>
            <button className="text-muted-foreground hover:text-foreground p-1">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-0.5 text-center">
          {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
            <div
              key={i}
              className="text-muted-foreground py-1 text-xs font-medium"
            >
              {d}
            </div>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelected(day)}
              className={[
                "rounded-md py-1 text-xs transition-colors",
                selected === day
                  ? "bg-[var(--primary)] font-semibold text-[var(--primary-foreground)]"
                  : today === day
                    ? "font-semibold text-[var(--primary)]"
                    : "text-foreground hover:bg-accent",
              ].join(" ")}
            >
              {day}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Card: Meta / Goal
function CardGoal() {
  const [calories, setCalories] = useState(350);
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const values = [280, 320, 350, 290, 410, 370, 350];
  const max = 500;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm">Definir Meta</CardTitle>
            <CardDescription className="text-xs">
              Calorias por dia
            </CardDescription>
          </div>
          <Target className="text-muted-foreground size-4" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCalories((c) => Math.max(100, c - 10))}
            className="border-input flex size-8 items-center justify-center rounded-full border"
          >
            <Minus className="size-4" />
          </button>
          <div className="text-center">
            <span className="text-foreground text-3xl font-bold">
              {calories}
            </span>
            <p className="text-muted-foreground text-xs">cal/dia</p>
          </div>
          <button
            onClick={() => setCalories((c) => Math.min(1000, c + 10))}
            className="border-input flex size-8 items-center justify-center rounded-full border"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <div className="flex items-end justify-between gap-1">
          {days.map((d, i) => (
            <div key={d} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-sm"
                style={{
                  height: `${(values[i] / max) * 40}px`,
                  backgroundColor: i === 6 ? "var(--primary)" : "var(--muted)",
                }}
              />
              <span className="text-muted-foreground text-[10px]">{d}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          size="sm"
          className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
        >
          Salvar Meta
        </Button>
      </CardFooter>
    </Card>
  );
}

// Card: Pagamento / Upgrade
function CardPayment() {
  const [plan, setPlan] = useState("pro");

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Atualizar Plano</CardTitle>
        <CardDescription>
          Escolha seu plano e método de pagamento.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {["starter", "pro", "enterprise"].map((p) => (
            <button
              key={p}
              onClick={() => setPlan(p)}
              className={[
                "rounded-md border px-2 py-1.5 text-xs font-medium capitalize transition-colors",
                plan === p
                  ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                  : "border-border text-muted-foreground hover:bg-accent",
              ].join(" ")}
            >
              {p === "starter" ? "Básico" : p === "pro" ? "Pro" : "Plus"}
            </button>
          ))}
        </div>
        <Input placeholder="Nome no cartão" />
        <Input placeholder="Email" type="email" />
        <Input placeholder="0000 0000 0000 0000" />
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="MM/AA" />
          <Input placeholder="CVV" />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          size="sm"
          className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
        >
          <CreditCard className="mr-2 size-4" />
          Assinar Agora
        </Button>
      </CardFooter>
    </Card>
  );
}

// Card: Criar Conta
function CardCreateAccount() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Criar Conta</CardTitle>
        <CardDescription>Comece gratuitamente hoje.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <button className="border-border hover:bg-accent flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium transition-colors">
            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </button>
          <button className="border-border hover:bg-accent flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium transition-colors">
            <svg className="size-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Separator className="flex-1" />
          <span className="text-muted-foreground text-xs">ou</span>
          <Separator className="flex-1" />
        </div>
        <Input placeholder="Email" type="email" />
        <Input placeholder="Senha" type="password" />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          size="sm"
          className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
        >
          <UserPlus className="mr-2 size-4" />
          Criar Conta Grátis
        </Button>
        <p className="text-muted-foreground text-xs">
          Já tem conta?{" "}
          <span className="cursor-pointer text-[var(--primary)] hover:underline">
            Entrar
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}

// Card: Chat
function CardChat() {
  const messages = [
    {
      id: 1,
      from: "Ana",
      text: "Olá! Tudo bem com o projeto?",
      mine: false,
      time: "09:41",
    },
    {
      id: 2,
      from: "Eu",
      text: "Tudo ótimo! Quase finalizando a Sprint.",
      mine: true,
      time: "09:42",
    },
    {
      id: 3,
      from: "Ana",
      text: "Ótimo! Me manda o link do PR quando terminar.",
      mine: false,
      time: "09:43",
    },
    {
      id: 4,
      from: "Eu",
      text: "Claro, já estou abrindo agora.",
      mine: true,
      time: "09:44",
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-bold text-[var(--primary-foreground)]">
            A
          </div>
          <div>
            <CardTitle className="text-sm">Ana Lima</CardTitle>
            <CardDescription className="flex items-center gap-1 text-xs">
              <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
              Online agora
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex-1 space-y-2 pt-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={[
              "flex",
              msg.mine ? "justify-end" : "justify-start",
            ].join(" ")}
          >
            <div
              className={[
                "max-w-[80%] rounded-xl px-3 py-1.5",
                msg.mine
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "bg-muted text-foreground",
              ].join(" ")}
            >
              <p className="text-xs">{msg.text}</p>
              <p
                className={[
                  "mt-0.5 text-right text-[10px]",
                  msg.mine
                    ? "text-[var(--primary-foreground)]/70"
                    : "text-muted-foreground",
                ].join(" ")}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="gap-2 pt-2">
        <Input placeholder="Escrever mensagem..." className="flex-1" />
        <Button
          size="sm"
          className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
        >
          <MessageCircle className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

// Card: Exercícios
function CardExercise() {
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const values = [45, 72, 38, 65, 80, 55, 90];
  const max = 100;
  const total = values.reduce((a, b) => a + b, 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm">Minutos Ativos</CardTitle>
            <CardDescription className="text-xs">Semana atual</CardDescription>
          </div>
          <Activity className="text-muted-foreground size-4" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <span className="text-foreground text-3xl font-bold">{total}</span>
          <span className="text-muted-foreground ml-1 text-sm">min</span>
        </div>
        <div className="flex items-end justify-between gap-1">
          {days.map((d, i) => (
            <div key={d} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-sm transition-all"
                style={{
                  height: `${(values[i] / max) * 48}px`,
                  backgroundColor:
                    i === 6
                      ? "var(--primary)"
                      : i === 4
                        ? "var(--primary)"
                        : "var(--muted)",
                }}
              />
              <span className="text-muted-foreground text-[10px]">{d}</span>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground text-xs">
          <span className="font-medium text-emerald-500">+12%</span> em relação
          à semana passada
        </p>
      </CardContent>
    </Card>
  );
}

// Card: Pagamentos (tabela)
function CardPayments() {
  const rows = [
    { status: "Pago", email: "ana@email.com", amount: "R$ 250,00" },
    { status: "Pendente", email: "carlos@email.com", amount: "R$ 150,00" },
    { status: "Pago", email: "maria@email.com", amount: "R$ 490,00" },
    { status: "Falhou", email: "joao@email.com", amount: "R$ 80,00" },
  ];

  const statusColor: Record<string, string> = {
    Pago: "success",
    Pendente: "secondary",
    Falhou: "destructive",
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Pagamentos Recentes</CardTitle>
        <CardDescription>Últimas transações do mês.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          <div className="grid grid-cols-3 pb-2">
            <span className="text-muted-foreground text-xs font-medium">
              Status
            </span>
            <span className="text-muted-foreground text-xs font-medium">
              Email
            </span>
            <span className="text-muted-foreground text-right text-xs font-medium">
              Valor
            </span>
          </div>
          <Separator />
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-3 items-center py-2">
              <Badge
                variant={
                  statusColor[row.status] as
                    | "success"
                    | "secondary"
                    | "destructive"
                }
                className="w-fit text-[10px]"
              >
                {row.status}
              </Badge>
              <span className="text-foreground truncate pr-2 text-xs">
                {row.email}
              </span>
              <span className="text-foreground text-right text-xs font-medium">
                {row.amount}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PreviewCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <CardRevenue />
      <CardSubscriptions />
      <CardCalendar />
      <CardGoal />
      <CardPayment />
      <CardCreateAccount />
      <CardChat />
      <CardExercise />
      <CardPayments />
    </div>
  );
}

export { PreviewCards };
