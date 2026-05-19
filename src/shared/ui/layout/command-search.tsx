"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  startTransition,
} from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

interface SearchItem {
  name: string;
  href: string;
  category: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  // Base
  { name: "Button", href: "/docs/components/button", category: "Base" },
  { name: "Badge", href: "/docs/components/badge", category: "Base" },
  { name: "Card", href: "/docs/components/card", category: "Base" },
  { name: "Input", href: "/docs/components/input", category: "Base" },
  { name: "Textarea", href: "/docs/components/textarea", category: "Base" },
  { name: "Avatar", href: "/docs/components/avatar", category: "Base" },
  { name: "Separator", href: "/docs/components/separator", category: "Base" },
  { name: "Spinner", href: "/docs/components/spinner", category: "Base" },
  // FOMO
  {
    name: "CountdownTimer",
    href: "/docs/components/countdown-timer",
    category: "FOMO",
  },
  {
    name: "SocialProof",
    href: "/docs/components/social-proof",
    category: "FOMO",
  },
  {
    name: "ScarcityBadge",
    href: "/docs/components/scarcity-badge",
    category: "FOMO",
  },
  {
    name: "TestimonialCarousel",
    href: "/docs/components/testimonial-carousel",
    category: "FOMO",
  },
  {
    name: "PricingCard",
    href: "/docs/components/pricing-card",
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
  // Animação
  { name: "FadeIn", href: "/docs/components/fade-in", category: "Animação" },
  { name: "SlideIn", href: "/docs/components/slide-in", category: "Animação" },
  { name: "ScaleIn", href: "/docs/components/scale-in", category: "Animação" },
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
    name: "CardSpotlight",
    href: "/docs/components/card-spotlight",
    category: "Animação",
  },
  {
    name: "CanvasRevealEffect",
    href: "/docs/components/canvas-reveal-effect",
    category: "Animação",
  },
  // Blocos
  {
    name: "HeroSection",
    href: "/docs/components/hero-section",
    category: "Blocos",
  },
  {
    name: "FeaturesGrid",
    href: "/docs/components/features-grid",
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
  {
    name: "CtaSection",
    href: "/docs/components/cta-section",
    category: "Blocos",
  },
  {
    name: "FaqSection",
    href: "/docs/components/faq-section",
    category: "Blocos",
  },
  // Páginas
  { name: "Começando", href: "/docs", category: "Páginas" },
  { name: "Playground", href: "/playground", category: "Páginas" },
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
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? SEARCH_ITEMS.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      )
    : SEARCH_ITEMS;

  const grouped = groupByCategory(filtered);
  const flatFiltered = filtered;

  const openDialog = useCallback(() => {
    setOpen(true);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      closeDialog();
      router.push(href);
    },
    [closeDialog, router],
  );

  // Global keyboard shortcut
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

  // Autofocus input when dialog opens
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Prevent body scroll when dialog is open
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

  // Keyboard navigation inside dialog
  function handleDialogKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      closeDialog();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatFiltered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const item = flatFiltered[activeIndex];
      if (item) navigate(item.href);
    }
  }

  // Reset active index when query changes
  useEffect(() => {
    startTransition(() => {
      setActiveIndex(0);
    });
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const active = listRef.current.querySelector("[data-active=true]");
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  return (
    <>
      {/* Trigger button — desktop */}
      <button
        onClick={openDialog}
        aria-label="Buscar componentes (Ctrl+K)"
        className="border-border bg-muted/50 text-muted-foreground hover:bg-muted hidden items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition-colors md:flex"
      >
        <Search className="size-3.5 shrink-0" />
        <span>Buscar...</span>
        <kbd className="bg-background border-border pointer-events-none rounded border px-1.5 py-0.5 font-mono text-[10px] font-medium">
          ⌘K
        </kbd>
      </button>

      {/* Trigger icon — mobile */}
      <button
        onClick={openDialog}
        aria-label="Buscar componentes"
        className="text-muted-foreground hover:text-foreground flex size-8 items-center justify-center rounded-md transition-colors md:hidden"
      >
        <Search className="size-4" />
      </button>

      {/* Dialog */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={closeDialog}
          aria-hidden="true"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Buscar componentes"
            className="bg-background border-border fixed top-[20%] left-1/2 z-50 w-full max-w-md -translate-x-1/2 rounded-xl border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleDialogKeyDown}
          >
            {/* Input */}
            <div className="border-border flex items-center gap-3 border-b px-4 py-3">
              <Search className="text-muted-foreground size-4 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar componentes..."
                className="text-foreground placeholder:text-muted-foreground flex-1 bg-transparent text-sm outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                  aria-label="Limpar busca"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[320px] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="text-muted-foreground px-4 py-6 text-center text-sm">
                  Nenhum componente encontrado.
                </p>
              ) : (
                Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    <p className="text-muted-foreground/60 px-4 py-1.5 text-[10px] font-semibold tracking-widest uppercase">
                      {category}
                    </p>
                    {items.map((item) => {
                      const globalIndex = flatFiltered.indexOf(item);
                      const isActive = globalIndex === activeIndex;
                      return (
                        <button
                          key={item.href}
                          data-active={isActive}
                          onClick={() => navigate(item.href)}
                          onMouseEnter={() => setActiveIndex(globalIndex)}
                          className={cn(
                            "flex w-full items-center justify-between px-4 py-2 text-sm transition-colors",
                            isActive
                              ? "bg-muted/60 text-foreground"
                              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                          )}
                        >
                          <span>{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-border text-muted-foreground/60 flex items-center gap-3 border-t px-4 py-2 text-[11px]">
              <span>
                <kbd className="font-mono">↑↓</kbd> navegar
              </span>
              <span>
                <kbd className="font-mono">↵</kbd> abrir
              </span>
              <span>
                <kbd className="font-mono">Esc</kbd> fechar
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { CommandSearch };
