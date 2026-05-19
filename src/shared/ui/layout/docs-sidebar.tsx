"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
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
    section: "Frameworks",
    defaultOpen: true,
    links: [
      { label: "Next.js", href: "/docs/frameworks/nextjs", isNew: false },
      { label: "Vite", href: "/docs/frameworks/vite", isNew: false },
      { label: "Remix", href: "/docs/frameworks/remix", isNew: false },
      { label: "Astro", href: "/docs/frameworks/astro", isNew: false },
    ],
  },
  {
    section: "Componentes Base",
    defaultOpen: true,
    links: [
      { label: "Accordion", href: "/docs/components/accordion", isNew: false },
      { label: "Alert", href: "/docs/components/alert", isNew: false },
      { label: "Avatar", href: "/docs/components/avatar" },
      { label: "Badge", href: "/docs/components/badge" },
      {
        label: "Breadcrumb",
        href: "/docs/components/breadcrumb",
        isNew: false,
      },
      { label: "Button", href: "/docs/components/button" },
      { label: "Card", href: "/docs/components/card" },
      { label: "Checkbox", href: "/docs/components/checkbox", isNew: false },
      { label: "Command", href: "/docs/components/command", isNew: false },
      { label: "Dialog", href: "/docs/components/dialog", isNew: false },
      {
        label: "DropdownMenu",
        href: "/docs/components/dropdown-menu",
        isNew: false,
      },
      { label: "Input", href: "/docs/components/input" },
      { label: "Label", href: "/docs/components/label", isNew: false },
      { label: "Popover", href: "/docs/components/popover", isNew: false },
      { label: "Progress", href: "/docs/components/progress", isNew: false },
      {
        label: "ScrollArea",
        href: "/docs/components/scroll-area",
        isNew: false,
      },
      { label: "Select", href: "/docs/components/select", isNew: false },
      { label: "Separator", href: "/docs/components/separator" },
      { label: "Sheet", href: "/docs/components/sheet", isNew: false },
      { label: "Skeleton", href: "/docs/components/skeleton", isNew: false },
      { label: "Spinner", href: "/docs/components/spinner" },
      { label: "Switch", href: "/docs/components/switch", isNew: false },
      { label: "Table", href: "/docs/components/table", isNew: false },
      { label: "Tabs", href: "/docs/components/tabs", isNew: false },
      { label: "Textarea", href: "/docs/components/textarea" },
      { label: "Toast", href: "/docs/components/toast", isNew: false },
      { label: "Tooltip", href: "/docs/components/tooltip", isNew: false },
    ],
  },
  {
    section: "FOMO & Conversao",
    defaultOpen: true,
    links: [
      { label: "CountdownTimer", href: "/docs/components/countdown-timer" },
      { label: "PricingCard", href: "/docs/components/pricing-card" },
      { label: "ScarcityBadge", href: "/docs/components/scarcity-badge" },
      { label: "SocialProof", href: "/docs/components/social-proof" },
      {
        label: "TestimonialCarousel",
        href: "/docs/components/testimonial-carousel",
      },
      { label: "UrgencyBanner", href: "/docs/components/urgency-banner" },
      { label: "VisitorCounter", href: "/docs/components/visitor-counter" },
    ],
  },
  {
    section: "Animacao",
    defaultOpen: true,
    links: [
      {
        label: "ArcTimeline",
        href: "/docs/components/arc-timeline",
        isNew: false,
      },
      { label: "BentoGrid", href: "/docs/components/bento-grid", isNew: false },
      { label: "BlurFade", href: "/docs/components/blur-fade", isNew: false },
      {
        label: "BorderBeam",
        href: "/docs/components/border-beam",
        isNew: false,
      },
      {
        label: "CanvasRevealEffect",
        href: "/docs/components/canvas-reveal-effect",
        isNew: false,
      },
      {
        label: "CardSpotlight",
        href: "/docs/components/card-spotlight",
        isNew: false,
      },
      { label: "Confetti", href: "/docs/components/confetti", isNew: false },
      { label: "FadeIn", href: "/docs/components/fade-in", isNew: false },
      { label: "Marquee", href: "/docs/components/marquee", isNew: false },
      {
        label: "NumberTicker",
        href: "/docs/components/number-ticker",
        isNew: false,
      },
      { label: "Particles", href: "/docs/components/particles", isNew: false },
      { label: "RetroGrid", href: "/docs/components/retro-grid", isNew: false },
      { label: "Ripple", href: "/docs/components/ripple", isNew: false },
      { label: "ScaleIn", href: "/docs/components/scale-in", isNew: false },
      {
        label: "ShineBorder",
        href: "/docs/components/shine-border",
        isNew: false,
      },
      { label: "SlideIn", href: "/docs/components/slide-in", isNew: false },
      {
        label: "SparkleButton",
        href: "/docs/components/sparkle-button",
        isNew: false,
      },
      {
        label: "StaggerChildren",
        href: "/docs/components/stagger-children",
        isNew: false,
      },
      {
        label: "TextReveal",
        href: "/docs/components/text-reveal",
        isNew: false,
      },
      {
        label: "TypingAnimation",
        href: "/docs/components/typing-animation",
        isNew: false,
      },
    ],
  },
  {
    section: "Backgrounds",
    defaultOpen: true,
    links: [
      {
        label: "AnimatedSphere",
        href: "/docs/components/animated-sphere",
        isNew: false,
      },
      {
        label: "AnimatedWave",
        href: "/docs/components/animated-wave",
        isNew: false,
      },
      { label: "DarkVeil", href: "/docs/components/dark-veil", isNew: false },
      { label: "DotGrid", href: "/docs/components/dot-grid", isNew: false },
      { label: "Grainient", href: "/docs/components/grainient", isNew: false },
      { label: "LightRays", href: "/docs/components/light-rays", isNew: false },
    ],
  },
  {
    section: "Blocos",
    defaultOpen: true,
    links: [
      {
        label: "CTASection",
        href: "/docs/components/cta-section",
        isNew: false,
      },
      {
        label: "FAQSection",
        href: "/docs/components/faq-section",
        isNew: false,
      },
      {
        label: "FeaturesGrid",
        href: "/docs/components/features-grid",
        isNew: false,
      },
      {
        label: "HeroSection",
        href: "/docs/components/hero-section",
        isNew: false,
      },
      {
        label: "PricingSection",
        href: "/docs/components/pricing-section",
        isNew: false,
      },
      {
        label: "TestimonialsSection",
        href: "/docs/components/testimonials-section",
        isNew: false,
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
  const [showBottom, setShowBottom] = useState(true);

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

      <div
        className={cn(
          "from-background pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-24 bg-linear-to-t to-transparent transition-opacity duration-200",
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
      <div className="border-border/50 bg-background/80 sticky top-14 z-30 flex items-center border-b px-4 py-2 backdrop-blur-md lg:hidden">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Fechar sidebar" : "Abrir sidebar"}
          className="bg-muted/50 hover:bg-muted text-foreground flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors"
        >
          {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          <span>Componentes</span>
          <ChevronDown
            className={cn(
              "text-muted-foreground size-3.5 transition-transform",
              mobileOpen && "rotate-180",
            )}
          />
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
          "bg-background border-border/50 fixed top-0 left-0 z-50 h-full w-[85vw] max-w-72 overflow-y-auto border-r p-5 shadow-xl transition-transform duration-300 ease-out lg:hidden",
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
