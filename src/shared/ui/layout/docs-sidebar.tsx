"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/cn";

type CategoryTag = "base" | "fomo" | "animation" | "block";

interface SidebarLink {
  label: string;
  href: string;
  isNew?: boolean;
}

interface SidebarSection {
  section: string;
  tag?: CategoryTag;
  links: SidebarLink[];
  defaultOpen?: boolean;
}

const CATEGORY_STYLES: Record<CategoryTag, { bg: string; text: string }> = {
  base: {
    bg: "bg-primary/10",
    text: "text-primary",
  },
  fomo: {
    bg: "bg-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
  },
  animation: {
    bg: "bg-violet-500/10",
    text: "text-violet-600 dark:text-violet-400",
  },
  block: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
  },
};

const SIDEBAR_ITEMS: SidebarSection[] = [
  {
    section: "Inicio",
    defaultOpen: true,
    links: [{ label: "Getting Started", href: "/docs" }],
  },
  {
    section: "Componentes Base",
    tag: "base",
    defaultOpen: true,
    links: [
      { label: "Button", href: "/docs/components/button" },
      { label: "Input", href: "/docs/components/input" },
      { label: "Card", href: "/docs/components/card" },
      { label: "Badge", href: "/docs/components/badge" },
      { label: "Avatar", href: "/docs/components/avatar" },
      { label: "Separator", href: "/docs/components/separator" },
      { label: "Spinner", href: "/docs/components/spinner" },
      { label: "Textarea", href: "/docs/components/textarea" },
    ],
  },
  {
    section: "FOMO & Conversao",
    tag: "fomo",
    defaultOpen: true,
    links: [
      { label: "CountdownTimer", href: "/docs/components/countdown-timer" },
      { label: "SocialProof", href: "/docs/components/social-proof" },
      { label: "ScarcityBadge", href: "/docs/components/scarcity-badge" },
      {
        label: "TestimonialCarousel",
        href: "/docs/components/testimonial-carousel",
      },
      { label: "PricingCard", href: "/docs/components/pricing-card" },
      { label: "UrgencyBanner", href: "/docs/components/urgency-banner" },
      { label: "VisitorCounter", href: "/docs/components/visitor-counter" },
    ],
  },
  {
    section: "Animacao",
    tag: "animation",
    defaultOpen: true,
    links: [
      { label: "FadeIn", href: "/docs/components/fade-in", isNew: true },
      { label: "SlideIn", href: "/docs/components/slide-in", isNew: true },
      { label: "ScaleIn", href: "/docs/components/scale-in", isNew: true },
      {
        label: "StaggerChildren",
        href: "/docs/components/stagger-children",
        isNew: true,
      },
      {
        label: "TextReveal",
        href: "/docs/components/text-reveal",
        isNew: true,
      },
    ],
  },
];

function CategoryBadge({ tag }: { tag: CategoryTag }) {
  const style = CATEGORY_STYLES[tag];
  const labels: Record<CategoryTag, string> = {
    base: "Base",
    fomo: "FOMO",
    animation: "Motion",
    block: "Block",
  };

  return (
    <span
      className={cn(
        "ml-auto rounded-full px-1.5 py-0.5 text-[10px] leading-none font-medium",
        style.bg,
        style.text,
      )}
    >
      {labels[tag]}
    </span>
  );
}

function SidebarSearch() {
  return (
    <button
      className="border-border bg-muted/50 text-muted-foreground hover:bg-muted flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors"
      aria-label="Buscar componentes"
    >
      <Search className="size-4 shrink-0 opacity-50" />
      <span className="flex-1 text-left">Buscar...</span>
      <kbd className="bg-background border-border pointer-events-none hidden rounded border px-1.5 py-0.5 font-mono text-[10px] font-medium sm:inline-block">
        Ctrl K
      </kbd>
    </button>
  );
}

function SidebarSectionItem({
  section,
  onLinkClick,
}: {
  section: SidebarSection;
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div>
      <div className="text-foreground/80 flex items-center gap-1 py-1.5 text-xs font-semibold tracking-wide uppercase">
        <span>{section.section}</span>
        {section.tag && <CategoryBadge tag={section.tag} />}
      </div>

      <ul className="border-border/50 mt-1 ml-1 space-y-px border-l pl-3">
        {section.links.map(({ label, href, isNew }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onLinkClick}
                className={cn(
                  "relative -ml-px block border-l py-1.5 pl-3 text-[13px] transition-colors",
                  isActive
                    ? "border-primary text-primary font-medium"
                    : "text-muted-foreground hover:border-border hover:text-foreground border-transparent",
                )}
              >
                {label}
                {isNew && (
                  <span className="ml-1.5 inline-flex rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] leading-none font-medium text-emerald-600 dark:text-emerald-400">
                    New
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <nav className="space-y-5">
      {SIDEBAR_ITEMS.map((section) => (
        <SidebarSectionItem
          key={section.section}
          section={section}
          onLinkClick={onLinkClick}
        />
      ))}
    </nav>
  );
}

function DesktopSidebarScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowTop(el.scrollTop > 8);
    setShowBottom(el.scrollTop + el.clientHeight < el.scrollHeight - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      ro.disconnect();
    };
  }, [checkScroll]);

  return (
    <div className="fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-60">
      {/* Top fade */}
      <div
        className={cn(
          "from-background pointer-events-none absolute top-0 right-0 left-0 z-10 h-8 bg-gradient-to-b to-transparent transition-opacity duration-200",
          showTop ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="h-full [scrollbar-width:none] overflow-y-auto p-5 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="mb-5">
          <SidebarSearch />
        </div>
        <SidebarContent />
      </div>

      {/* Bottom fade */}
      <div
        className={cn(
          "from-background pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-20 bg-gradient-to-t to-transparent transition-opacity duration-200",
          showBottom ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}

function DocsSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle bar */}
      <div className="border-border/50 bg-background/80 sticky top-14 z-30 flex items-center gap-2 border-b px-4 py-2 backdrop-blur-md lg:hidden">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Fechar sidebar" : "Abrir sidebar"}
          className="text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors"
        >
          {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          <span>Menu</span>
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "bg-background border-border/50 fixed top-0 left-0 z-50 h-full w-72 overflow-y-auto border-r p-5 shadow-xl transition-transform duration-300 ease-out lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-foreground text-base font-bold tracking-tight"
          >
            WI.UI
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Fechar sidebar"
            className="text-muted-foreground hover:text-foreground rounded-md p-1 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mb-5">
          <SidebarSearch />
        </div>

        <SidebarContent onLinkClick={() => setMobileOpen(false)} />
      </aside>

      {/* Desktop sidebar - fixed, always visible below header */}
      <aside className="hidden w-60 shrink-0 lg:block">
        <DesktopSidebarScroll />
      </aside>
    </>
  );
}

export { DocsSidebar, SIDEBAR_ITEMS, type SidebarLink, type SidebarSection };
