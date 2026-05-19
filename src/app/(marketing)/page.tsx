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
        <h1 className="text-foreground mb-6 text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
          WI.<span style={{ color: PRIMARY }}>UI</span>
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
            style={{ backgroundColor: PRIMARY }}
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

        <div className="border-border mt-10 flex items-center gap-2 rounded-lg border border-dashed px-4 py-2.5 font-mono text-sm">
          <span className="text-muted-foreground">$</span>
          <span className="text-foreground">npx wi-ui add button</span>
          <Copy className="text-muted-foreground/50 hover:text-foreground ml-2 size-3.5 cursor-pointer" />
        </div>
      </section>
    </div>
  );
}
