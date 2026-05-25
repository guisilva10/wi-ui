"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  startTransition,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  FileText,
  Zap,
  Layout,
  Image,
  Layers,
  ArrowRight,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { registry } from "@wi-ui/registry";

interface SearchItem {
  name: string;
  href: string;
  category: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  base: "Base",
  fomo: "FOMO",
  animation: "Animação",
  block: "Blocos",
};

function toDisplayName(kebabName: string): string {
  return kebabName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

const REGISTRY_ITEMS: SearchItem[] = registry.map((entry) => ({
  name: toDisplayName(entry.name),
  href: `/docs/components/${entry.name}`,
  category: CATEGORY_LABELS[entry.category] ?? entry.category,
}));

const STATIC_ITEMS: SearchItem[] = [
  { name: "Primeiros Passos", href: "/docs", category: "Páginas" },
  { name: "Playground", href: "/playground", category: "Páginas" },
];

const SEARCH_ITEMS: SearchItem[] = [...REGISTRY_ITEMS, ...STATIC_ITEMS];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Base: <Layers className="size-3.5" />,
  FOMO: <Zap className="size-3.5" />,
  Animação: <Wand2 className="size-3.5" />,
  Blocos: <Layout className="size-3.5" />,
  Páginas: <FileText className="size-3.5" />,
};

const RECENT_SUGGESTION_NAMES = [
  "button",
  "card",
  "sparkle-button",
  "hero-section",
  "countdown-timer",
];

const RECENT_SUGGESTIONS: SearchItem[] = RECENT_SUGGESTION_NAMES.flatMap(
  (name) => REGISTRY_ITEMS.filter((item) => item.href.endsWith(`/${name}`)),
);

function groupByCategory(items: SearchItem[]): Record<string, SearchItem[]> {
  return items.reduce<Record<string, SearchItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
}

function CommandSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const hasQuery = query.trim().length > 0;

  const filtered = hasQuery
    ? SEARCH_ITEMS.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  const displayItems = hasQuery ? filtered : RECENT_SUGGESTIONS;
  const grouped = hasQuery
    ? groupByCategory(filtered)
    : { Sugestões: RECENT_SUGGESTIONS };

  const openDialog = useCallback(() => {
    setOpen(true);
    requestAnimationFrame(() => setVisible(true));
    setQuery("");
    setActiveIndex(0);
  }, []);

  const closeDialog = useCallback(() => {
    setVisible(false);
    const timeout = setTimeout(() => {
      setOpen(false);
      setQuery("");
      setActiveIndex(0);
    }, 150);
    return () => clearTimeout(timeout);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      closeDialog();
      router.push(href);
    },
    [closeDialog, router],
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (open) {
          closeDialog();
        } else {
          openDialog();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, openDialog, closeDialog]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleDialogKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      closeDialog();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, displayItems.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const item = displayItems[activeIndex];
      if (item) navigate(item.href);
    }
  }

  useEffect(() => {
    startTransition(() => {
      setActiveIndex(0);
    });
  }, [query]);

  useEffect(() => {
    if (!listRef.current) return;
    const active = listRef.current.querySelector("[data-active=true]");
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  return (
    <>
      {/* Trigger — desktop */}
      <button
        onClick={openDialog}
        aria-label="Buscar componentes (Ctrl+K)"
        className="border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 hover:text-foreground hidden h-8 w-56 items-center gap-2 rounded-lg border px-3 text-xs transition-all md:flex"
      >
        <Search className="size-3.5 shrink-0 opacity-50" />
        <span className="flex-1 text-left">Buscar componentes...</span>
        <kbd className="bg-background/80 border-border pointer-events-none ml-auto flex h-5 items-center rounded border px-1.5 font-mono text-[10px] font-medium opacity-60">
          ⌘K
        </kbd>
      </button>

      {/* Trigger — mobile */}
      <button
        onClick={openDialog}
        aria-label="Buscar componentes"
        className="text-muted-foreground hover:text-foreground flex size-10 items-center justify-center rounded-md transition-colors md:hidden"
      >
        <Search className="size-4" />
      </button>

      {/* Dialog — portal to body so it escapes header stacking context */}
      {open &&
        createPortal(
          <div
            className={cn(
              "fixed inset-0 z-[100] transition-all duration-150",
              visible
                ? "bg-black/50 backdrop-blur-sm"
                : "bg-black/0 backdrop-blur-none",
            )}
            onClick={() => closeDialog()}
            aria-hidden="true"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Buscar componentes"
              className={cn(
                "bg-background border-border fixed top-[15%] left-1/2 z-[100] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border shadow-2xl transition-all duration-150",
                visible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "-translate-y-2 scale-95 opacity-0",
              )}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={handleDialogKeyDown}
            >
              {/* Search input */}
              <div className="border-border flex items-center gap-3 border-b px-4 py-3">
                <Search className="text-muted-foreground/60 size-4 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Digite para buscar..."
                  className="text-foreground placeholder:text-muted-foreground/50 flex-1 bg-transparent text-sm outline-none"
                />
                {query ? (
                  <button
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                    className="text-muted-foreground hover:text-foreground rounded-md p-0.5 transition-colors"
                    aria-label="Limpar busca"
                  >
                    <X className="size-3.5" />
                  </button>
                ) : (
                  <kbd className="text-muted-foreground/40 flex h-5 items-center rounded border border-transparent px-1 font-mono text-[10px]">
                    ESC
                  </kbd>
                )}
              </div>

              {/* Results */}
              <div
                ref={listRef}
                className="max-h-[50vh] overflow-y-auto overscroll-contain py-1 sm:max-h-[360px]"
              >
                {hasQuery && filtered.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 px-4 py-10">
                    <Search className="text-muted-foreground/30 size-8" />
                    <p className="text-muted-foreground text-sm">
                      Nenhum resultado para &ldquo;{query}&rdquo;
                    </p>
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, items]) => (
                    <div key={category} className="py-1">
                      <p className="text-muted-foreground/50 px-4 py-1.5 text-[10px] font-semibold tracking-widest uppercase">
                        {category}
                      </p>
                      {items.map((item) => {
                        const globalIndex = displayItems.indexOf(item);
                        const isActive = globalIndex === activeIndex;
                        return (
                          <button
                            key={item.href}
                            data-active={isActive}
                            onClick={() => navigate(item.href)}
                            onMouseEnter={() => setActiveIndex(globalIndex)}
                            className={cn(
                              "group flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                              isActive
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            <span
                              className={cn(
                                "flex size-7 shrink-0 items-center justify-center rounded-md border transition-colors",
                                isActive
                                  ? "border-border bg-background text-foreground"
                                  : "bg-muted/50 text-muted-foreground/60 border-transparent",
                              )}
                            >
                              {CATEGORY_ICONS[item.category] ?? (
                                <FileText className="size-3.5" />
                              )}
                            </span>
                            <span className="flex-1 text-left">
                              {item.name}
                            </span>
                            <ArrowRight
                              className={cn(
                                "size-3.5 shrink-0 transition-all",
                                isActive
                                  ? "text-muted-foreground translate-x-0 opacity-100"
                                  : "-translate-x-1 opacity-0",
                              )}
                            />
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="border-border text-muted-foreground/40 flex items-center gap-4 border-t px-4 py-2 text-[11px]">
                <span className="flex items-center gap-1">
                  <kbd className="bg-muted/50 inline-flex h-4 items-center rounded px-1 font-mono text-[10px]">
                    ↑↓
                  </kbd>
                  navegar
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="bg-muted/50 inline-flex h-4 items-center rounded px-1 font-mono text-[10px]">
                    ↵
                  </kbd>
                  abrir
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="bg-muted/50 inline-flex h-4 items-center rounded px-1 font-mono text-[10px]">
                    esc
                  </kbd>
                  fechar
                </span>
                <span className="ml-auto opacity-60">
                  {SEARCH_ITEMS.length} componentes
                </span>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

export { CommandSearch };
