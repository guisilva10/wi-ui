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

interface SearchItem {
  name: string;
  href: string;
  category: string;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Base: <Layers className="size-3.5" />,
  FOMO: <Zap className="size-3.5" />,
  Animação: <Wand2 className="size-3.5" />,
  Backgrounds: <Image className="size-3.5" />,
  Blocos: <Layout className="size-3.5" />,
  Páginas: <FileText className="size-3.5" />,
};

const SEARCH_ITEMS: SearchItem[] = [
  { name: "Accordion", href: "/docs/components/accordion", category: "Base" },
  { name: "Alert", href: "/docs/components/alert", category: "Base" },
  { name: "Avatar", href: "/docs/components/avatar", category: "Base" },
  { name: "Badge", href: "/docs/components/badge", category: "Base" },
  { name: "Breadcrumb", href: "/docs/components/breadcrumb", category: "Base" },
  { name: "Button", href: "/docs/components/button", category: "Base" },
  { name: "Card", href: "/docs/components/card", category: "Base" },
  { name: "Checkbox", href: "/docs/components/checkbox", category: "Base" },
  { name: "Command", href: "/docs/components/command", category: "Base" },
  { name: "Dialog", href: "/docs/components/dialog", category: "Base" },
  {
    name: "DropdownMenu",
    href: "/docs/components/dropdown-menu",
    category: "Base",
  },
  { name: "Input", href: "/docs/components/input", category: "Base" },
  { name: "Label", href: "/docs/components/label", category: "Base" },
  { name: "Popover", href: "/docs/components/popover", category: "Base" },
  { name: "Progress", href: "/docs/components/progress", category: "Base" },
  {
    name: "ScrollArea",
    href: "/docs/components/scroll-area",
    category: "Base",
  },
  { name: "Select", href: "/docs/components/select", category: "Base" },
  { name: "Separator", href: "/docs/components/separator", category: "Base" },
  { name: "Sheet", href: "/docs/components/sheet", category: "Base" },
  { name: "Skeleton", href: "/docs/components/skeleton", category: "Base" },
  { name: "Spinner", href: "/docs/components/spinner", category: "Base" },
  { name: "Switch", href: "/docs/components/switch", category: "Base" },
  { name: "Table", href: "/docs/components/table", category: "Base" },
  { name: "Tabs", href: "/docs/components/tabs", category: "Base" },
  { name: "Textarea", href: "/docs/components/textarea", category: "Base" },
  { name: "Toast", href: "/docs/components/toast", category: "Base" },
  { name: "Tooltip", href: "/docs/components/tooltip", category: "Base" },
  {
    name: "CountdownTimer",
    href: "/docs/components/countdown-timer",
    category: "FOMO",
  },
  {
    name: "PricingCard",
    href: "/docs/components/pricing-card",
    category: "FOMO",
  },
  {
    name: "ScarcityBadge",
    href: "/docs/components/scarcity-badge",
    category: "FOMO",
  },
  {
    name: "SocialProof",
    href: "/docs/components/social-proof",
    category: "FOMO",
  },
  {
    name: "TestimonialCarousel",
    href: "/docs/components/testimonial-carousel",
    category: "FOMO",
  },
  {
    name: "UrgencyBanner",
    href: "/docs/components/urgency-banner",
    category: "FOMO",
  },
  {
    name: "VisitorCounter",
    href: "/docs/components/visitor-counter",
    category: "FOMO",
  },
  {
    name: "ArcTimeline",
    href: "/docs/components/arc-timeline",
    category: "Animação",
  },
  {
    name: "BentoGrid",
    href: "/docs/components/bento-grid",
    category: "Animação",
  },
  {
    name: "BlurFade",
    href: "/docs/components/blur-fade",
    category: "Animação",
  },
  {
    name: "BorderBeam",
    href: "/docs/components/border-beam",
    category: "Animação",
  },
  {
    name: "CanvasRevealEffect",
    href: "/docs/components/canvas-reveal-effect",
    category: "Animação",
  },
  {
    name: "CardSpotlight",
    href: "/docs/components/card-spotlight",
    category: "Animação",
  },
  { name: "Confetti", href: "/docs/components/confetti", category: "Animação" },
  { name: "FadeIn", href: "/docs/components/fade-in", category: "Animação" },
  { name: "Marquee", href: "/docs/components/marquee", category: "Animação" },
  {
    name: "NumberTicker",
    href: "/docs/components/number-ticker",
    category: "Animação",
  },
  {
    name: "Particles",
    href: "/docs/components/particles",
    category: "Animação",
  },
  {
    name: "RetroGrid",
    href: "/docs/components/retro-grid",
    category: "Animação",
  },
  { name: "Ripple", href: "/docs/components/ripple", category: "Animação" },
  { name: "ScaleIn", href: "/docs/components/scale-in", category: "Animação" },
  {
    name: "ShineBorder",
    href: "/docs/components/shine-border",
    category: "Animação",
  },
  { name: "SlideIn", href: "/docs/components/slide-in", category: "Animação" },
  {
    name: "SparkleButton",
    href: "/docs/components/sparkle-button",
    category: "Animação",
  },
  {
    name: "StaggerChildren",
    href: "/docs/components/stagger-children",
    category: "Animação",
  },
  {
    name: "TextReveal",
    href: "/docs/components/text-reveal",
    category: "Animação",
  },
  {
    name: "TypingAnimation",
    href: "/docs/components/typing-animation",
    category: "Animação",
  },
  {
    name: "AnimatedSphere",
    href: "/docs/components/animated-sphere",
    category: "Backgrounds",
  },
  {
    name: "AnimatedWave",
    href: "/docs/components/animated-wave",
    category: "Backgrounds",
  },
  {
    name: "DarkVeil",
    href: "/docs/components/dark-veil",
    category: "Backgrounds",
  },
  {
    name: "DotGrid",
    href: "/docs/components/dot-grid",
    category: "Backgrounds",
  },
  {
    name: "Grainient",
    href: "/docs/components/grainient",
    category: "Backgrounds",
  },
  {
    name: "LightRays",
    href: "/docs/components/light-rays",
    category: "Backgrounds",
  },
  {
    name: "CTASection",
    href: "/docs/components/cta-section",
    category: "Blocos",
  },
  {
    name: "FAQSection",
    href: "/docs/components/faq-section",
    category: "Blocos",
  },
  {
    name: "FeaturesGrid",
    href: "/docs/components/features-grid",
    category: "Blocos",
  },
  {
    name: "HeroSection",
    href: "/docs/components/hero-section",
    category: "Blocos",
  },
  {
    name: "PricingSection",
    href: "/docs/components/pricing-section",
    category: "Blocos",
  },
  {
    name: "TestimonialsSection",
    href: "/docs/components/testimonials-section",
    category: "Blocos",
  },
  { name: "Primeiros Passos", href: "/docs", category: "Páginas" },
  { name: "Playground", href: "/playground", category: "Páginas" },
];

const RECENT_SUGGESTIONS: SearchItem[] = [
  { name: "Button", href: "/docs/components/button", category: "Base" },
  { name: "Card", href: "/docs/components/card", category: "Base" },
  {
    name: "SparkleButton",
    href: "/docs/components/sparkle-button",
    category: "Animação",
  },
  {
    name: "HeroSection",
    href: "/docs/components/hero-section",
    category: "Blocos",
  },
  {
    name: "CountdownTimer",
    href: "/docs/components/countdown-timer",
    category: "FOMO",
  },
];

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
