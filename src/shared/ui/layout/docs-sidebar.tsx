"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface SidebarLink {
  label: string;
  href: string;
  isNew?: boolean;
}

interface SidebarSection {
  section: string;
  links: SidebarLink[];
  defaultOpen?: boolean;
}

const SIDEBAR_ITEMS: SidebarSection[] = [
  {
    section: "Inicio",
    defaultOpen: true,
    links: [{ label: "Primeiros Passos", href: "/docs" }],
  },
  {
    section: "Componentes Base",
    defaultOpen: true,
    links: [
      { label: "Accordion", href: "/docs/components/accordion", isNew: true },
      { label: "Alert", href: "/docs/components/alert", isNew: true },
      { label: "Avatar", href: "/docs/components/avatar" },
      { label: "Badge", href: "/docs/components/badge" },
      { label: "Button", href: "/docs/components/button" },
      { label: "Card", href: "/docs/components/card" },
      { label: "Checkbox", href: "/docs/components/checkbox", isNew: true },
      { label: "Dialog", href: "/docs/components/dialog", isNew: true },
      {
        label: "DropdownMenu",
        href: "/docs/components/dropdown-menu",
        isNew: true,
      },
      { label: "Input", href: "/docs/components/input" },
      { label: "Label", href: "/docs/components/label", isNew: true },
      { label: "Progress", href: "/docs/components/progress", isNew: true },
      { label: "Select", href: "/docs/components/select", isNew: true },
      { label: "Separator", href: "/docs/components/separator" },
      { label: "Sheet", href: "/docs/components/sheet", isNew: true },
      { label: "Spinner", href: "/docs/components/spinner" },
      { label: "Switch", href: "/docs/components/switch", isNew: true },
      { label: "Table", href: "/docs/components/table", isNew: true },
      { label: "Tabs", href: "/docs/components/tabs", isNew: true },
      { label: "Textarea", href: "/docs/components/textarea" },
      { label: "Tooltip", href: "/docs/components/tooltip", isNew: true },
    ],
  },
  {
    section: "FOMO & Conversao",
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
      {
        label: "CardSpotlight",
        href: "/docs/components/card-spotlight",
        isNew: true,
      },
      {
        label: "CanvasRevealEffect",
        href: "/docs/components/canvas-reveal-effect",
        isNew: true,
      },
      {
        label: "Marquee",
        href: "/docs/components/marquee",
        isNew: true,
      },
      {
        label: "NumberTicker",
        href: "/docs/components/number-ticker",
        isNew: true,
      },
      {
        label: "Confetti",
        href: "/docs/components/confetti",
        isNew: true,
      },
      {
        label: "ArcTimeline",
        href: "/docs/components/arc-timeline",
        isNew: true,
      },
      {
        label: "SparkleButton",
        href: "/docs/components/sparkle-button",
        isNew: true,
      },
    ],
  },
  {
    section: "Backgrounds",
    defaultOpen: true,
    links: [
      {
        label: "DotGrid",
        href: "/docs/components/dot-grid",
        isNew: true,
      },
      {
        label: "AnimatedWave",
        href: "/docs/components/animated-wave",
        isNew: true,
      },
      {
        label: "AnimatedSphere",
        href: "/docs/components/animated-sphere",
        isNew: true,
      },
      {
        label: "Grainient",
        href: "/docs/components/grainient",
        isNew: true,
      },
      {
        label: "LightRays",
        href: "/docs/components/light-rays",
        isNew: true,
      },
      {
        label: "DarkVeil",
        href: "/docs/components/dark-veil",
        isNew: true,
      },
    ],
  },
  {
    section: "Blocos",
    defaultOpen: true,
    links: [
      {
        label: "HeroSection",
        href: "/docs/components/hero-section",
        isNew: true,
      },
      {
        label: "FeaturesGrid",
        href: "/docs/components/features-grid",
        isNew: true,
      },
      {
        label: "PricingSection",
        href: "/docs/components/pricing-section",
        isNew: true,
      },
      {
        label: "TestimonialsSection",
        href: "/docs/components/testimonials-section",
        isNew: true,
      },
      {
        label: "CTASection",
        href: "/docs/components/cta-section",
        isNew: true,
      },
      {
        label: "FAQSection",
        href: "/docs/components/faq-section",
        isNew: true,
      },
    ],
  },
];

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
      <div className="text-foreground/80 py-1.5 text-xs font-semibold tracking-wide uppercase">
        {section.section}
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
                    Novo
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

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowTop(el.scrollTop > 8);
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
    <div className="border-border fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-60 border-r">
      <div
        className={cn(
          "from-background pointer-events-none absolute top-0 right-0 left-0 z-10 h-12 bg-linear-to-b to-transparent transition-opacity duration-200",
          showTop ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        ref={scrollRef}
        className="h-full [scrollbar-width:none] overflow-y-auto p-5 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <SidebarContent />
      </div>

      <div className="from-background pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-24 bg-linear-to-t to-transparent" />
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
