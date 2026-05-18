import Link from "next/link";
import { Copy, Code, Moon, Accessibility, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/shared/ui/components/button/button.variants";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Avatar,
  Separator,
  Spinner,
} from "@/shared/ui/components";
import { GithubIcon } from "@/shared/ui/icons/github-icon";
import { cn } from "@/lib/cn";

const COMPONENT_SHOWCASE = [
  {
    label: "Button",
    href: "/docs/components/button",
    preview: (
      <div className="flex flex-wrap gap-2">
        <Button variant="default" size="sm">
          Default
        </Button>
        <Button variant="outline" size="sm">
          Outline
        </Button>
        <Button variant="ghost" size="sm">
          Ghost
        </Button>
      </div>
    ),
  },
  {
    label: "Badge",
    href: "/docs/components/badge",
    preview: (
      <div className="flex flex-wrap gap-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
    ),
  },
  {
    label: "Avatar",
    href: "/docs/components/avatar",
    preview: (
      <div className="flex items-end gap-3">
        <Avatar size="sm" fallback="Wi UI" />
        <Avatar size="md" fallback="Gui Silva" />
        <Avatar size="lg" fallback="WI" />
      </div>
    ),
  },
  {
    label: "Spinner",
    href: "/docs/components/spinner",
    preview: (
      <div className="flex items-center gap-4">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>
    ),
  },
  {
    label: "Card",
    href: "/docs/components/card",
    preview: (
      <Card className="w-full max-w-xs">
        <CardHeader>
          <CardTitle>WI.UI Card</CardTitle>
          <CardDescription>Componente flexível e acessível</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary">Open Source</Badge>
        </CardContent>
      </Card>
    ),
  },
  {
    label: "Separator",
    href: "/docs/components/separator",
    preview: (
      <div className="w-full space-y-3">
        <p className="text-muted-foreground text-sm">Acima</p>
        <Separator />
        <p className="text-muted-foreground text-sm">Abaixo</p>
      </div>
    ),
  },
] as const;

const FEATURES = [
  {
    icon: Copy,
    title: "Copy-paste",
    description:
      "Copie e cole no seu projeto. Sem instalação, sem magia negra.",
  },
  {
    icon: Code,
    title: "TypeScript",
    description: "Tipagem completa de fábrica. Autocomplete e segurança total.",
  },
  {
    icon: Moon,
    title: "Dark mode",
    description:
      "Suporte dark mode nativo. Toggle sem flash, persiste preferência.",
  },
  {
    icon: Accessibility,
    title: "Acessível",
    description:
      "Componentes acessíveis por padrão. ARIA, teclado, foco corretos.",
  },
] as const;

export default function LandingPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-4 py-24 text-center">
        <div className="from-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-b to-transparent" />

        <Badge variant="secondary" className="mb-6">
          Open Source &mdash; v0.1.0
        </Badge>

        <h1 className="text-foreground mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          WI.UI
        </h1>

        <p className="text-muted-foreground mx-auto mb-10 max-w-xl text-lg sm:text-xl">
          Componentes React bonitos, acessíveis e prontos para produção. Copie,
          cole e customize — sem dependências extras.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/docs"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "gap-2",
            )}
          >
            Começar
            <ArrowRight className="size-4" />
          </Link>

          <a
            href="https://github.com/guisilva10/wi-ui"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2",
            )}
          >
            <GithubIcon className="size-4" />
            GitHub
          </a>
        </div>
      </section>

      <Separator />

      {/* Componentes showcase */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-3 text-3xl font-bold sm:text-4xl">
            Componentes
          </h2>
          <p className="text-muted-foreground mx-auto max-w-md">
            Cada componente é independente, acessível e fácil de customizar.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPONENT_SHOWCASE.map(({ label, href, preview }) => (
            <Link key={label} href={href} className="group block">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{label}</CardTitle>
                </CardHeader>
                <CardContent className="flex min-h-20 items-center">
                  {preview}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Separator />

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-3 text-3xl font-bold sm:text-4xl">
            Por que WI.UI?
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <div className="bg-primary/10 mb-3 flex size-10 items-center justify-center rounded-lg">
                  <Icon className="text-primary size-5" />
                </div>
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription className="text-sm">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
