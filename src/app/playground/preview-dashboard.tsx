"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  LineChart,
  FolderOpen,
  Users,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  UserCheck,
  Activity,
  Settings,
  ChevronDown,
  Filter,
  Plus,
} from "lucide-react";
import { Badge } from "@/shared/ui/components/badge";
import { Button } from "@/shared/ui/components/button";

// Area chart SVG fake
function AreaChart({ range }: { range: string }) {
  const datasets: Record<string, number[]> = {
    "3m": [120, 180, 150, 220, 190, 280, 250, 310, 290, 380, 350, 420],
    "30d": [80, 110, 95, 140, 125, 160, 145, 180, 165, 200, 185, 220],
    "7d": [160, 190, 175, 210, 200, 230, 215],
  };

  const data = datasets[range] ?? datasets["3m"];
  const w = 500;
  const h = 160;
  const max = Math.max(...data) * 1.1;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - (v / max) * h,
  }));

  const linePath = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${w} ${h} L 0 ${h} Z`;

  const xLabels =
    range === "3m"
      ? [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez",
        ]
      : range === "30d"
        ? ["1", "4", "7", "10", "13", "16", "19", "22", "25", "28", "30"]
        : ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  return (
    <div className="h-40 w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#areaGrad)" />
        <path
          d={linePath}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <div className="mt-1 flex justify-between px-1">
        {xLabels.map((label) => (
          <span key={label} className="text-muted-foreground text-[10px]">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// Stat card
function StatCard({
  label,
  value,
  delta,
  deltaLabel,
  icon: Icon,
  up,
}: {
  label: string;
  value: string;
  delta: string;
  deltaLabel: string;
  icon: React.ElementType;
  up: boolean;
}) {
  return (
    <div className="bg-card border-border rounded-xl border p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-muted-foreground text-xs font-medium">
          {label}
        </span>
        <Icon className="text-muted-foreground size-4" />
      </div>
      <p className="text-foreground text-2xl font-bold">{value}</p>
      <p className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
        {up ? (
          <TrendingUp className="size-3 text-emerald-500" />
        ) : (
          <TrendingDown className="size-3 text-red-500" />
        )}
        <span className={up ? "text-emerald-500" : "text-red-500"}>
          {delta}
        </span>
        {deltaLabel}
      </p>
    </div>
  );
}

// Table row
function TableRow({
  email,
  status,
  amount,
  date,
}: {
  email: string;
  status: "active" | "pending" | "inactive";
  amount: string;
  date: string;
}) {
  const statusMap = {
    active: { label: "Ativo", variant: "success" as const },
    pending: { label: "Pendente", variant: "secondary" as const },
    inactive: { label: "Inativo", variant: "outline" as const },
  };
  const s = statusMap[status];

  return (
    <div className="border-border grid grid-cols-4 items-center border-b px-4 py-3 last:border-0">
      <span className="text-foreground text-sm">{email}</span>
      <Badge variant={s.variant} className="w-fit text-xs">
        {s.label}
      </Badge>
      <span className="text-foreground text-sm font-medium">{amount}</span>
      <span className="text-muted-foreground text-xs">{date}</span>
    </div>
  );
}

function PreviewDashboard() {
  const [chartRange, setChartRange] = useState("3m");
  const [tableTab, setTableTab] = useState("resumo");

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Activity, label: "Ciclo de Vida", active: false },
    { icon: LineChart, label: "Analytics", active: false },
    { icon: FolderOpen, label: "Projetos", active: false },
    { icon: Users, label: "Time", active: false },
  ];

  const docItems = [
    { icon: FileText, label: "Proposta Q1" },
    { icon: FileText, label: "Roadmap 2025" },
    { icon: FileText, label: "SLA Clientes" },
  ];

  const tableRows = [
    {
      email: "ana@empresa.com",
      status: "active" as const,
      amount: "R$ 1.200,00",
      date: "Jan 15",
    },
    {
      email: "carlos@startup.io",
      status: "pending" as const,
      amount: "R$ 850,00",
      date: "Jan 18",
    },
    {
      email: "maria@corp.com.br",
      status: "active" as const,
      amount: "R$ 3.400,00",
      date: "Jan 20",
    },
    {
      email: "pedro@tech.co",
      status: "inactive" as const,
      amount: "R$ 290,00",
      date: "Jan 22",
    },
    {
      email: "julia@agencia.com",
      status: "active" as const,
      amount: "R$ 670,00",
      date: "Jan 24",
    },
    {
      email: "rafael@fintech.io",
      status: "active" as const,
      amount: "R$ 2.100,00",
      date: "Jan 26",
    },
    {
      email: "camila@saas.com",
      status: "pending" as const,
      amount: "R$ 450,00",
      date: "Jan 28",
    },
    {
      email: "lucas@dev.co",
      status: "inactive" as const,
      amount: "R$ 180,00",
      date: "Jan 30",
    },
  ];

  const tableTabs = ["Resumo", "Desempenho", "Pessoal", "Documentos"];

  return (
    <div className="border-border overflow-hidden rounded-xl border">
      <div className="flex h-[780px]">
        {/* Sidebar */}
        <aside className="border-border bg-card hidden w-44 shrink-0 flex-col border-r lg:flex">
          <div className="border-border border-b px-4 py-3">
            <span className="text-foreground text-sm font-semibold">
              Painel
            </span>
          </div>
          <nav className="flex-1 space-y-0.5 p-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={[
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors",
                  item.active
                    ? "bg-[var(--primary)]/10 font-medium text-[var(--primary)]"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                ].join(" ")}
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="border-border border-t p-2">
            <p className="text-muted-foreground px-3 py-1 text-[10px] font-semibold tracking-wider uppercase">
              Documentos
            </p>
            {docItems.map((doc) => (
              <button
                key={doc.label}
                className="text-muted-foreground hover:bg-accent hover:text-foreground flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs"
              >
                <doc.icon className="size-3.5 shrink-0" />
                <span className="truncate">{doc.label}</span>
              </button>
            ))}
          </div>
          <div className="border-border border-t p-2">
            <button className="text-muted-foreground hover:bg-accent flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs">
              <Settings className="size-4" />
              Configurações
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Topbar */}
          <div className="border-border bg-background flex items-center gap-2 border-b px-4 py-2.5">
            <span className="text-muted-foreground text-xs">Início</span>
            <span className="text-muted-foreground text-xs">/</span>
            <span className="text-foreground text-xs font-medium">
              Dashboard
            </span>
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                Jan 2025
              </Badge>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
              <StatCard
                label="Receita Total"
                value="R$ 45.2k"
                delta="+12,5%"
                deltaLabel="vs. mês ant."
                icon={DollarSign}
                up={true}
              />
              <StatCard
                label="Novos Clientes"
                value="284"
                delta="+8,2%"
                deltaLabel="vs. mês ant."
                icon={UserCheck}
                up={true}
              />
              <StatCard
                label="Contas Ativas"
                value="1.429"
                delta="-2,1%"
                deltaLabel="vs. mês ant."
                icon={Users}
                up={false}
              />
              <StatCard
                label="Crescimento"
                value="18,7%"
                delta="+3,4pp"
                deltaLabel="vs. mês ant."
                icon={TrendingUp}
                up={true}
              />
            </div>

            {/* Chart */}
            <div className="bg-card border-border rounded-xl border p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-foreground text-sm font-semibold">
                    Visitantes Totais
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Visitas únicas por período
                  </p>
                </div>
                <div className="flex gap-1">
                  {[
                    { key: "3m", label: "3 meses" },
                    { key: "30d", label: "30 dias" },
                    { key: "7d", label: "7 dias" },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setChartRange(opt.key)}
                      className={[
                        "rounded-md px-2.5 py-1 text-xs transition-colors",
                        chartRange === opt.key
                          ? "bg-[var(--primary)] font-medium text-[var(--primary-foreground)]"
                          : "text-muted-foreground hover:bg-accent",
                      ].join(" ")}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <AreaChart range={chartRange} />
            </div>

            {/* Table */}
            <div className="bg-card border-border rounded-xl border">
              <div className="border-border flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3">
                <div className="flex gap-1">
                  {tableTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setTableTab(tab.toLowerCase())}
                      className={[
                        "rounded-md px-3 py-1.5 text-xs transition-colors",
                        tableTab === tab.toLowerCase()
                          ? "bg-[var(--primary)]/10 font-medium text-[var(--primary)]"
                          : "text-muted-foreground hover:bg-accent",
                      ].join(" ")}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs"
                  >
                    <Filter className="size-3" />
                    Filtrar
                    <ChevronDown className="size-3" />
                  </Button>
                  <Button
                    size="sm"
                    className="gap-1.5 bg-[var(--primary)] text-xs text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
                  >
                    <Plus className="size-3" />
                    Adicionar
                  </Button>
                </div>
              </div>
              <div className="border-border bg-muted/30 grid grid-cols-4 border-b px-4 py-2">
                <span className="text-muted-foreground text-xs font-medium">
                  Email
                </span>
                <span className="text-muted-foreground text-xs font-medium">
                  Status
                </span>
                <span className="text-muted-foreground text-xs font-medium">
                  Valor
                </span>
                <span className="text-muted-foreground text-xs font-medium">
                  Data
                </span>
              </div>
              {tableRows.map((row) => (
                <TableRow key={row.email} {...row} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PreviewDashboard };
