"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Moon, Sun, Menu, X } from "lucide-react";
import { buttonVariants } from "@/shared/ui/components/button";
import { SiGithub } from "react-icons/si";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/cn";
import { CommandSearch } from "./command-search";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      className="border-border bg-muted/50 relative flex h-7 w-14 items-center rounded-full border p-0.5 transition-colors"
    >
      <span
        className={cn(
          "bg-background absolute size-6 rounded-full shadow-sm transition-transform duration-200",
          isDark ? "translate-x-[26px]" : "translate-x-0",
        )}
      />
      <Sun
        className={cn(
          "relative z-10 ml-[3px] size-3.5 transition-colors",
          isDark ? "text-muted-foreground/50" : "text-foreground",
        )}
      />
      <Moon
        className={cn(
          "relative z-10 ml-[11px] size-3.5 transition-colors",
          isDark ? "text-foreground" : "text-muted-foreground/50",
        )}
      />
    </button>
  );
}

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Playground", href: "/playground" },
] as const;

interface HeaderProps {
  extraRight?: React.ReactNode;
}

function Header({ extraRight }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-background/80 border-border sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="relative flex h-14 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 select-none">
          <Image
            src="/logo.png"
            alt="WI.UI"
            width={24}
            height={24}
            className="size-6 rounded-md"
          />
          <span className="text-foreground text-sm font-bold tracking-tight">
            WI.UI
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "link", size: "sm" }),
                  isActive
                    ? "text-accent-link font-medium"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="bg-border mx-1 h-4 w-px" />

          <CommandSearch />

          <div className="bg-border mx-1 h-4 w-px" />

          <a
            href="https://github.com/guisilva10/wi-ui"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "gap-1.5",
            )}
          >
            <SiGithub className="size-4" />
            <span className="sr-only sm:not-sr-only">GitHub</span>
          </a>

          <ThemeSwitcher />

          {extraRight && (
            <>
              <div className="bg-border mx-1 h-4 w-px" />
              {extraRight}
            </>
          )}
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-0.5 md:hidden">
          <CommandSearch />

          {extraRight}

          <ThemeSwitcher />

          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            className="text-muted-foreground hover:text-foreground flex size-10 items-center justify-center rounded-md transition-colors"
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "border-border/50 bg-background border-b px-4 pb-4 md:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-1 pt-2">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "justify-start",
                  isActive
                    ? "text-accent-link font-medium"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <a
            href="https://github.com/guisilva10/wi-ui"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "justify-start gap-1.5",
            )}
          >
            <SiGithub className="size-4" />
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

export { Header };
