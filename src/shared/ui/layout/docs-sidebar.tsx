"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/shared/ui/components/button/button.variants";
import { cn } from "@/lib/cn";

const SIDEBAR_ITEMS = [
  {
    section: "Início",
    links: [{ label: "Getting Started", href: "/docs" }],
  },
  {
    section: "Componentes",
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
] as const;

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      {SIDEBAR_ITEMS.map(({ section, links }) => (
        <div key={section}>
          <p className="text-muted-foreground mb-2 px-2 text-xs font-semibold tracking-wider uppercase">
            {section}
          </p>
          <ul className="space-y-0.5">
            {links.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onLinkClick}
                    className={cn(
                      "block rounded-md px-2 py-1.5 text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function DocsSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle bar */}
      <div className="border-border bg-background flex items-center border-b px-4 py-2 lg:hidden">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Fechar sidebar" : "Abrir sidebar"}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "gap-2",
          )}
        >
          {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          <span className="text-sm">Menu</span>
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="bg-background/80 fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "border-border bg-background fixed top-0 left-0 z-50 h-full w-64 overflow-y-auto border-r p-6 transition-transform lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="font-bold">WI.UI</span>
          <button
            onClick={() => setMobileOpen(false)}
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            <X className="size-4" />
          </button>
        </div>
        <SidebarContent onLinkClick={() => setMobileOpen(false)} />
      </aside>

      {/* Desktop sidebar — sticky, sempre visível abaixo do header (h-14 = 3.5rem) */}
      <aside className="border-border bg-background hidden w-56 shrink-0 border-r lg:block">
        <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-6">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
}

export { DocsSidebar };
