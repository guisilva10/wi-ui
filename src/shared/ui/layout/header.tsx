"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun, Menu, X } from "lucide-react";
import { buttonVariants } from "@/shared/ui/components/button/button.variants";
import { SiGithub } from "react-icons/si";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/cn";
import { CardSpotlight } from "../components/card-spotlight";
import { CanvasRevealEffect } from "../components/canvas-reveal-effect";

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
    <header className="bg-background/80 border-border relative sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <CardSpotlight
        overlay={
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={[
              [0, 180, 216],
              [0, 210, 230],
            ]}
            dotSize={3}
          />
        }
      >
        <div className="relative flex h-14 items-center justify-between px-4 lg:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 select-none">
            <Image
              src="/logo.png"
              alt="WI.UI"
              width={28}
              height={28}
              className="size-7"
            />
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
      </CardSpotlight>
    </header>
  );
}

export { Header };
