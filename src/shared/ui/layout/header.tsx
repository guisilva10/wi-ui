"use client";

import { useState } from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X } from "lucide-react";
import { buttonVariants } from "@/shared/ui/components/button/button.variants";
import { SiGithub } from "react-icons/si";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Playground", href: "/playground" },
] as const;

interface HeaderProps {
  extraRight?: React.ReactNode;
}

function Header({ extraRight }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-background/80 border-border sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-foreground text-lg font-bold tracking-tight select-none"
        >
          <span className="text-primary">WI</span>
          <span className="text-muted-foreground">.</span>
          <span>UI</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              {link.label}
            </Link>
          ))}

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

          <button
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"
            }
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </button>

          {extraRight && (
            <>
              <div className="bg-border mx-1 h-4 w-px" />
              {extraRight}
            </>
          )}
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          {extraRight}

          <button
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"
            }
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </button>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            {mobileOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "justify-start",
              )}
            >
              {link.label}
            </Link>
          ))}

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
