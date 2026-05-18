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

const PRIMARY = "oklch(0.8234 0.1927 206.47)";
const PRIMARY_SUBTLE = "oklch(0.8234 0.1927 206.47 / 0.1)";
const PRIMARY_BORDER = "oklch(0.8234 0.1927 206.47 / 0.15)";
const PRIMARY_ICON_BG = "oklch(0.8234 0.1927 206.47 / 0.12)";
const PRIMARY_BADGE_BORDER = "oklch(0.8234 0.1927 206.47 / 0.4)";
const PRIMARY_BADGE_BG = "oklch(0.8234 0.1927 206.47 / 0.08)";
const PRIMARY_RADIAL_HERO =
  "radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.8234 0.1927 206.47 / 0.15), transparent)";
const PRIMARY_RADIAL_FEATURES =
  "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.8234 0.1927 206.47 / 0.07), transparent)";
const PRIMARY_RADIAL_CTA =
  "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.8234 0.1927 206.47 / 0.1), transparent)";

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
          <CardDescription>
            Componente flex&iacute;vel e acess&iacute;vel
          </CardDescription>
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
      "Copie e cole no seu projeto. Sem instala&ccedil;&atilde;o, sem magia negra.",
  },
  {
    icon: Code,
    title: "TypeScript",
    description:
      "Tipagem completa de f&aacute;brica. Autocomplete e seguran&ccedil;a total.",
  },
  {
    icon: Moon,
    title: "Dark mode",
    description:
      "Suporte dark mode nativo. Toggle sem flash, persiste prefer&ecirc;ncia.",
  },
  {
    icon: Accessibility,
    title: "Acess&iacute;vel",
    description:
      "Componentes acess&iacute;veis por padr&atilde;o. ARIA, teclado, foco corretos.",
  },
] as const;

const STATS = [
  { value: "8+", label: "Componentes" },
  { value: "100%", label: "TypeScript" },
  { value: "0", label: "Depend&ecirc;ncias extras" },
  { value: "MIT", label: "Licen&ccedil;a" },
] as const;

export default function LandingPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: PRIMARY_RADIAL_HERO }}
        />

        <div className="mb-8 flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
            style={{
              borderColor: PRIMARY_BADGE_BORDER,
              color: PRIMARY,
              background: PRIMARY_BADGE_BG,
            }}
          >
            <Zap className="size-3" />
            Open Source &mdash; v0.1.0
          </span>
        </div>

        <h1 className="text-foreground mb-6 text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
          WI<span style={{ color: PRIMARY }}>.</span>UI
        </h1>

        <p className="text-muted-foreground mx-auto mb-4 max-w-lg text-lg leading-relaxed sm:text-xl">
          Componentes React bonitos, acess&iacute;veis e prontos para
          produ&ccedil;&atilde;o.
        </p>
        <p className="text-muted-foreground/70 mx-auto mb-10 max-w-md text-base">
          Copie, cole e customize &mdash; sem depend&ecirc;ncias extras, sem
          opinionismo.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/docs"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "gap-2 font-semibold shadow-lg transition-all hover:shadow-xl",
            )}
          >
            Come&ccedil;ar agora
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

        <div className="mt-10 flex items-center gap-2 rounded-lg border border-dashed px-4 py-2.5 font-mono text-sm">
          <span className="text-muted-foreground">$</span>
          <span className="text-foreground">npx wi-ui add button</span>
          <Copy className="text-muted-foreground/50 hover:text-foreground ml-2 size-3.5 cursor-pointer" />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y" style={{ borderColor: PRIMARY_BORDER }}>
        <div className="mx-auto max-w-4xl px-4 py-10">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p
                  className="text-3xl font-extrabold"
                  style={{ color: PRIMARY }}
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
            style={{ color: PRIMARY, background: PRIMARY_SUBTLE }}
          >
            Componentes
          </span>
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
            Tudo que voc&ecirc; precisa,{" "}
            <span style={{ color: PRIMARY }}>pronto para usar</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-md text-base">
            Cada componente &eacute; independente, acess&iacute;vel e
            f&aacute;cil de customizar. Copie o c&oacute;digo e fa&ccedil;a seu.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPONENT_SHOWCASE.map(({ label, href, preview }) => (
            <Link key={label} href={href} className="group block">
              <Card className="h-full transition-all duration-200 group-hover:-translate-y-0.5 hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold">
                      {label}
                    </CardTitle>
                    <ArrowRight
                      className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                      style={{ color: PRIMARY }}
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

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="mb-14 text-center">
          <span
            className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase"
            style={{ color: PRIMARY, background: PRIMARY_SUBTLE }}
          >
            Por que WI.UI?
          </span>
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
            Feito para desenvolvedores{" "}
            <span style={{ color: PRIMARY }}>que entregam</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-md text-base">
            Sem magia negra, sem lock-in. Componentes que voc&ecirc; entende e
            controla completamente.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="group relative overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: PRIMARY_RADIAL_FEATURES }}
              />
              <CardHeader className="relative">
                <div
                  className="mb-4 flex size-11 items-center justify-center rounded-xl"
                  style={{ background: PRIMARY_ICON_BG }}
                >
                  <Icon className="size-5" style={{ color: PRIMARY }} />
                </div>
                <CardTitle className="text-base font-semibold">
                  {title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden py-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: PRIMARY_RADIAL_CTA }}
        />
        <div className="relative mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
            Pronto para come&ccedil;ar?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Configure em minutos. Componentes que escalam com seu projeto.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/docs"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "gap-2 font-semibold shadow-lg",
              )}
            >
              Ver a documenta&ccedil;&atilde;o
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
              Star no GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
