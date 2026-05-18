import Link from "next/link";
import { Copy, Code, Moon, Accessibility, ArrowRight, Zap } from "lucide-react";
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
import { SiGithub } from "react-icons/si";
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

const STATS = [
  { value: "8+", label: "Componentes" },
  { value: "100%", label: "TypeScript" },
  { value: "0", label: "Dependências extras" },
  { value: "MIT", label: "Licença" },
] as const;

export default function LandingPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
        {/* Background gradient radial com cor primária */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.8234 0.1927 206.47 / 0.15), transparent)",
          }}
        />

        {/* Badge de versão */}
        <div className="mb-8 flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
            style={{
              borderColor: "oklch(0.8234 0.1927 206.47 / 0.4)",
              color: "oklch(0.8234 0.1927 206.47)",
              background: "oklch(0.8234 0.1927 206.47 / 0.08)",
            }}
          >
            <Zap className="size-3" />
            Open Source &mdash; v0.1.0
          </span>
        </div>

        {/* Título principal */}
        <h1 className="text-foreground mb-6 text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
          WI
          <span style={{ color: "oklch(0.8234 0.1927 206.47)" }}>.</span>
          UI
        </h1>

        {/* Subtítulo */}
        <p className="text-muted-foreground mx-auto mb-4 max-w-lg text-lg leading-relaxed sm:text-xl">
          Componentes React bonitos, acessíveis e prontos para produção.
        </p>
        <p className="text-muted-foreground/70 mx-auto mb-10 max-w-md text-base">
          Copie, cole e customize — sem dependências extras, sem opinionismo.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/docs"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "gap-2 font-semibold shadow-lg transition-all hover:shadow-xl",
            )}
          >
            Começar agora
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
            <SiGithub className="size-4" />
            Ver no GitHub
          </a>
        </div>

        {/* Comando de instalação */}
        <div className="mt-10 flex items-center gap-2 rounded-lg border border-dashed px-4 py-2.5 font-mono text-sm">
          <span className="text-muted-foreground">$</span>
          <span className="text-foreground">npx wi-ui add button</span>
          <Copy className="text-muted-foreground/50 hover:text-foreground ml-2 size-3.5 cursor-pointer" />
        </div>
      </section>

      {/* Stats */}
      <section
        className="border-y"
        style={{ borderColor: "oklch(0.8234 0.1927 206.47 / 0.15)" }}
      >
        <div className="mx-auto max-w-4xl px-4 py-10">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p
                  className="text-3xl font-extrabold"
                  style={{ color: "oklch(0.8234 0.1927 206.47)" }}
                >
                  {value}
                </p>
                <p className="text-muted-foreground mt-1 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Componentes showcase */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="mb-14 text-center">
          <span
            className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase"
            style={{
              color: "oklch(0.8234 0.1927 206.47)",
              background: "oklch(0.8234 0.1927 206.47 / 0.1)",
            }}
          >
            Componentes
          </span>
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
            Tudo que você precisa,{" "}
            <span style={{ color: "oklch(0.8234 0.1927 206.47)" }}>
              pronto para usar
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-md text-base">
            Cada componente é independente, acessível e fácil de customizar.
            Copie o código e faça seu.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPONENT_SHOWCASE.map(({ label, href, preview }) => (
            <Link key={label} href={href} className="group block">
              <Card
                className="h-full transition-all duration-200 group-hover:-translate-y-0.5 hover:shadow-lg"
                style={
                  {
                    "--tw-ring-color": "oklch(0.8234 0.1927 206.47 / 0.2)",
                  } as React.CSSProperties
                }
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold">
                      {label}
                    </CardTitle>
                    <ArrowRight
                      className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                      style={{ color: "oklch(0.8234 0.1927 206.47)" }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex min-h-20 items-center">
                  {preview}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/docs"
            className={cn(
              buttonVariants({ variant: "outline", size: "md" }),
              "gap-2",
            )}
          >
            Ver todos os componentes
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <Separator />
    </div>
  );
}
