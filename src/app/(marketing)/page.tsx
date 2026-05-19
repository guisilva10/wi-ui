import Link from "next/link";
import { Copy, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/shared/ui/components/button";
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
const PRIMARY_BORDER = "oklch(0.8234 0.1927 206.47 / 0.15)";
const PRIMARY_BADGE_BORDER = "oklch(0.8234 0.1927 206.47 / 0.4)";
const PRIMARY_BADGE_BG = "oklch(0.8234 0.1927 206.47 / 0.08)";

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

export default function LandingPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
        <div
          className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium"
          style={{
            borderColor: PRIMARY_BADGE_BORDER,
            backgroundColor: PRIMARY_BADGE_BG,
            color: PRIMARY,
          }}
        >
          <span
            className="size-1.5 rounded-full"
            style={{ backgroundColor: PRIMARY }}
            aria-hidden="true"
          />
          Open Source · Licença MIT
        </div>

        <h1 className="text-foreground mb-6 text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
          WI.<span style={{ color: PRIMARY }}>UI</span>
        </h1>

        <p className="text-muted-foreground mx-auto mb-4 max-w-lg text-lg leading-relaxed sm:text-xl">
          Componentes React bonitos, acessíveis e prontos para produção.
        </p>
        <p className="text-muted-foreground/70 mx-auto mb-10 max-w-md text-base">
          Copie, cole e customize. Sem dependências extras, sem opinionismo.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/docs"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "gap-2 font-semibold shadow-lg transition-all hover:shadow-xl",
            )}
            style={{ backgroundColor: PRIMARY }}
          >
            Começar agora
            <ArrowRight className="size-4" aria-hidden="true" />
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
            <SiGithub className="size-4" aria-hidden="true" />
            Ver no GitHub
          </a>
        </div>

        <div
          className="border-border mt-10 flex items-center gap-2 rounded-lg border border-dashed px-4 py-2.5 font-mono text-sm"
          role="region"
          aria-label="Comando de instalação"
        >
          <span className="text-muted-foreground" aria-hidden="true">
            $
          </span>
          <span className="text-foreground">npx wi-ui add button</span>
          <Copy
            className="text-muted-foreground/50 hover:text-foreground ml-2 size-3.5 cursor-pointer"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Componentes em destaque */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <h2 className="text-foreground mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Componentes prontos
            </h2>
            <p className="text-muted-foreground mx-auto max-w-lg text-base">
              Explore a coleção. Clique para ver documentação e código.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMPONENT_SHOWCASE.map(({ label, href, preview }) => (
              <Link
                key={label}
                href={href}
                className="group border-border/60 hover:border-primary/30 block rounded-xl border p-5 transition-all hover:shadow-sm"
                style={
                  {
                    "--hover-border": PRIMARY_BORDER,
                  } as React.CSSProperties
                }
              >
                <div className="bg-muted/30 mb-4 flex min-h-[80px] items-center justify-center rounded-lg p-4">
                  {preview}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground text-sm font-medium">
                    {label}
                  </span>
                  <ArrowRight
                    className="text-muted-foreground group-hover:text-foreground size-3.5 transition-colors"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/docs"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2",
              )}
            >
              Ver todos os 29+ componentes
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
