"use client";

import { useState } from "react";
import {
  Inbox,
  Send,
  FileText,
  Trash2,
  Archive,
  AlertTriangle,
  Star,
  Tag,
  ShoppingCart,
  Megaphone,
  RefreshCw,
  Users,
  Reply,
  MoreHorizontal,
  Search,
  Pencil,
} from "lucide-react";
import { Badge } from "@/shared/ui/components/badge";
import { Button } from "@/shared/ui/components/button";
import { Input } from "@/shared/ui/components/input";

interface Email {
  id: number;
  from: string;
  subject: string;
  preview: string;
  time: string;
  read: boolean;
  tags: string[];
  body: string;
}

const emails: Email[] = [
  {
    id: 1,
    from: "Guilherme Silva",
    subject: "Reunião de alinhamento — Sprint 12",
    preview:
      "Olá time, vamos alinhar os objetivos da próxima sprint. Preciso que todos confirmem...",
    time: "09:41",
    read: false,
    tags: ["trabalho"],
    body: "Olá time,\n\nVamos alinhar os objetivos da próxima sprint. Preciso que todos confirmem presença na reunião de amanhã às 14h.\n\nPauta:\n- Review Sprint 11\n- Planning Sprint 12\n- Demos do produto\n\nFavor confirmar até hoje às 18h.\n\nAbraços,\nGuilherme",
  },
  {
    id: 2,
    from: "GitHub",
    subject: "PR #47 foi mergeado — feat/dashboard",
    preview:
      "guisilva10 mergeou o Pull Request #47 feat/dashboard na branch main...",
    time: "08:22",
    read: false,
    tags: ["updates"],
    body: "guisilva10 mergeou o Pull Request #47 feat/dashboard na branch main.\n\n3 arquivos modificados, +247 −12 linhas.\n\nVer detalhes no GitHub →",
  },
  {
    id: 3,
    from: "Stripe",
    subject: "Novo pagamento recebido: R$ 497,00",
    preview:
      "Um pagamento foi processado com sucesso. Cliente: João Pereira — Plano Pro...",
    time: "Ontem",
    read: true,
    tags: ["compras"],
    body: "Um pagamento foi processado com sucesso.\n\nCliente: João Pereira\nPlano: Pro Anual\nValor: R$ 497,00\nStatus: Pago ✓\n\nAcesse o dashboard Stripe para mais detalhes.",
  },
  {
    id: 4,
    from: "Vercel",
    subject: "Deploy concluído — wi-ui.vercel.app",
    preview:
      "Seu projeto foi deployado com sucesso. Branch: main — Build: 2m 14s...",
    time: "Ontem",
    read: true,
    tags: ["updates"],
    body: "Seu projeto wi-ui foi deployado com sucesso.\n\nBranch: main\nBuild time: 2m 14s\nURL: https://wi-ui.vercel.app\n\nVer logs completos →",
  },
  {
    id: 5,
    from: "Ana Lima",
    subject: "Feedback do design — Playground",
    preview:
      "Adorei a nova tela do playground! Algumas sugestões: o painel lateral poderia...",
    time: "Seg",
    read: true,
    tags: ["trabalho"],
    body: "Oi!\n\nAdorei a nova tela do playground! Ficou muito mais intuitivo.\n\nAlgumas sugestões:\n1. O painel lateral poderia ter mais espaço nos sliders\n2. Seria legal ter um botão de compartilhar tema\n3. Preview mobile seria incrível\n\nNo geral, ficou ótimo!\n\nAna",
  },
  {
    id: 6,
    from: "Product Hunt",
    subject: "WI.UI está em alta hoje",
    preview:
      "Seu produto recebeu 47 upvotes nas últimas 24 horas. Compartilhe com...",
    time: "Dom",
    read: true,
    tags: ["promoções"],
    body: "WI.UI está em alta no Product Hunt!\n\nSeu produto recebeu 47 upvotes nas últimas 24 horas.\n\nCompartilhe com sua comunidade para aumentar a visibilidade.\n\nVer página →",
  },
];

const sidebarNav = [
  { icon: Inbox, label: "Entrada", count: 128 },
  { icon: FileText, label: "Rascunhos", count: 9 },
  { icon: Send, label: "Enviados" },
  { icon: AlertTriangle, label: "Spam", count: 23 },
  { icon: Trash2, label: "Lixeira" },
  { icon: Archive, label: "Arquivo" },
];

const categories = [
  { icon: Users, label: "Social" },
  { icon: RefreshCw, label: "Atualizações" },
  { icon: Users, label: "Fóruns" },
  { icon: ShoppingCart, label: "Compras" },
  { icon: Megaphone, label: "Promoções" },
];

function PreviewMail() {
  const [selected, setSelected] = useState<Email>(emails[0]);
  const [search, setSearch] = useState("");

  const filtered = emails.filter(
    (e) =>
      e.from.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="border-border overflow-hidden rounded-xl border">
      <div className="flex h-[780px]">
        {/* Sidebar de categorias */}
        <aside className="border-border bg-card hidden w-44 shrink-0 flex-col border-r lg:flex">
          <div className="border-border border-b p-3">
            <Button
              size="sm"
              className="w-full gap-1.5 bg-[var(--primary)] text-xs text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
            >
              <Pencil className="size-3" />
              Escrever
            </Button>
          </div>
          <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
            {sidebarNav.map((item) => (
              <button
                key={item.label}
                className={[
                  "flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-xs transition-colors",
                  item.label === "Entrada"
                    ? "bg-[var(--primary)]/10 font-medium text-[var(--primary)]"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                ].join(" ")}
              >
                <span className="flex items-center gap-2">
                  <item.icon className="size-4 shrink-0" />
                  {item.label}
                </span>
                {item.count !== undefined && (
                  <span className="text-muted-foreground text-[10px] font-medium">
                    {item.count}
                  </span>
                )}
              </button>
            ))}

            <div className="mt-3 px-3">
              <p className="text-muted-foreground mb-1 text-[10px] font-semibold tracking-wider uppercase">
                Categorias
              </p>
            </div>
            {categories.map((cat) => (
              <button
                key={cat.label}
                className="text-muted-foreground hover:bg-accent hover:text-foreground flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs"
              >
                <cat.icon className="size-4 shrink-0" />
                {cat.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Lista de emails */}
        <div className="border-border flex w-64 shrink-0 flex-col border-r">
          <div className="border-border border-b p-3">
            <Input
              placeholder="Buscar..."
              startIcon={<Search className="size-3.5" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 text-xs"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map((email) => (
              <button
                key={email.id}
                onClick={() => setSelected(email)}
                className={[
                  "border-border w-full border-b p-3 text-left transition-colors",
                  selected.id === email.id
                    ? "bg-[var(--primary)]/10"
                    : "hover:bg-accent",
                ].join(" ")}
              >
                <div className="mb-0.5 flex items-center justify-between gap-1">
                  <span
                    className={[
                      "truncate text-xs",
                      !email.read
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {email.from}
                  </span>
                  <span className="text-muted-foreground shrink-0 text-[10px]">
                    {email.time}
                  </span>
                </div>
                <p
                  className={[
                    "truncate text-xs",
                    !email.read
                      ? "text-foreground font-medium"
                      : "text-muted-foreground",
                  ].join(" ")}
                >
                  {email.subject}
                </p>
                <p className="text-muted-foreground mt-0.5 truncate text-[11px]">
                  {email.preview}
                </p>
                {email.tags.length > 0 && (
                  <div className="mt-1 flex gap-1">
                    {email.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="px-1.5 py-0 text-[9px]"
                      >
                        <Tag className="mr-0.5 size-2" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Painel de leitura */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="border-border flex items-center justify-between border-b px-4 py-3">
            <div className="min-w-0">
              <p className="text-foreground truncate text-sm font-semibold">
                {selected.subject}
              </p>
              <p className="text-muted-foreground text-xs">
                De: {selected.from} · {selected.time}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button className="text-muted-foreground hover:text-foreground p-1.5">
                <Star className="size-4" />
              </button>
              <button className="text-muted-foreground hover:text-foreground p-1.5">
                <Archive className="size-4" />
              </button>
              <button className="text-muted-foreground hover:text-foreground p-1.5">
                <Trash2 className="size-4" />
              </button>
              <button className="text-muted-foreground hover:text-foreground p-1.5">
                <MoreHorizontal className="size-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4 flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold text-[var(--primary-foreground)]">
                {selected.from.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-foreground text-sm font-medium">
                  {selected.from}
                </p>
                <p className="text-muted-foreground text-xs">
                  Para: eu@email.com · {selected.time}
                </p>
              </div>
            </div>
            <div className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
              {selected.body}
            </div>
          </div>

          <div className="border-border border-t p-3">
            <button className="border-border text-muted-foreground hover:bg-accent hover:text-foreground flex w-full items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors">
              <Reply className="size-4" />
              Responder a {selected.from.split(" ")[0]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PreviewMail };
