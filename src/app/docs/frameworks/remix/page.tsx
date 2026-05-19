"use client";

import { useState } from "react";
import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { cn } from "@/lib/cn";
import { Copy, Check, Terminal, Package } from "lucide-react";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Frameworks" },
  { label: "Remix" },
];

const TOC = [
  { id: "pre-requisitos", label: "Pre-requisitos", level: 2 },
  { id: "via-cli", label: "Via CLI", level: 2 },
  { id: "instalacao-manual", label: "Instalacao manual", level: 2 },
  { id: "configuracao", label: "Configuracao", level: 2 },
  { id: "adicionar-componente", label: "Adicionar componente", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "estrutura", label: "Estrutura", level: 2 },
];

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copiado!" : "Copiar comando"}
      className="text-muted-foreground hover:text-foreground shrink-0 transition-colors"
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-500" />
      ) : (
        <Copy className="size-3.5" />
      )}
    </button>
  );
}

function CommandBlock({
  commands,
  icon: Icon = Terminal,
}: {
  commands: Record<PackageManager, string>;
  icon?: typeof Terminal;
}) {
  const [pm, setPm] = useState<PackageManager>("pnpm");
  const command = commands[pm];

  return (
    <div className="border-border overflow-hidden rounded-xl border">
      <div className="bg-muted/30 border-border flex items-center gap-px border-b px-1 py-1">
        {(["pnpm", "npm", "yarn", "bun"] as const).map((manager) => (
          <button
            key={manager}
            onClick={() => setPm(manager)}
            className={cn(
              "rounded-md px-3 py-1 text-xs font-medium transition-colors",
              pm === manager
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {manager}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 px-4 py-3">
        <Icon className="text-muted-foreground size-4 shrink-0" />
        <code className="text-foreground flex-1 font-mono text-sm">
          {command}
        </code>
        <CopyButton text={command} />
      </div>
    </div>
  );
}

function CodeBlock({ code, filename }: { code: string; filename?: string }) {
  return (
    <div className="border-border overflow-hidden rounded-xl border">
      {filename && (
        <div className="bg-muted/30 border-border border-b px-4 py-2">
          <span className="text-muted-foreground font-mono text-xs">
            {filename}
          </span>
        </div>
      )}
      <div className="bg-muted/10 px-4 py-3">
        <pre className="text-foreground overflow-x-auto font-mono text-sm leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export default function RemixPage() {
  return (
    <DocPage
      title="Remix"
      description="Como instalar e configurar WI.UI em um projeto Remix com Tailwind v4."
      breadcrumbs={BREADCRUMBS}
      badge="Framework"
      toc={TOC}
    >
      <DocSection id="pre-requisitos" title="Pre-requisitos">
        <ul className="text-muted-foreground list-inside list-disc space-y-1.5 text-sm">
          <li>Remix 2+ ou React Router 7</li>
          <li>React 18+ ou 19</li>
          <li>Tailwind CSS v4</li>
          <li>TypeScript (recomendado)</li>
        </ul>

        <p className="text-muted-foreground mt-3 text-sm">
          Se ainda nao tem um projeto:
        </p>

        <CommandBlock
          commands={{
            pnpm: "pnpm create remix@latest meu-projeto",
            npm: "npx create-remix@latest meu-projeto",
            yarn: "yarn create remix meu-projeto",
            bun: "bunx create-remix@latest meu-projeto",
          }}
        />
      </DocSection>

      <DocSection id="via-cli" title="Via CLI (recomendado)">
        <p className="text-muted-foreground mb-3 text-sm">
          O CLI detecta Remix automaticamente.
        </p>

        <CommandBlock
          commands={{
            pnpm: "pnpm dlx @wi-ui/cli init",
            npm: "npx @wi-ui/cli init",
            yarn: "yarn dlx @wi-ui/cli init",
            bun: "bunx @wi-ui/cli init",
          }}
        />
      </DocSection>

      <DocSection id="instalacao-manual" title="Instalacao manual">
        <h3 className="text-foreground mt-2 mb-2 text-sm font-semibold">
          1. Instalar dependencias
        </h3>
        <CommandBlock
          commands={{
            pnpm: "pnpm add clsx tailwind-merge",
            npm: "npm install clsx tailwind-merge",
            yarn: "yarn add clsx tailwind-merge",
            bun: "bun add clsx tailwind-merge",
          }}
          icon={Package}
        />

        <h3 className="text-foreground mt-6 mb-2 text-sm font-semibold">
          2. Criar utilitario cn()
        </h3>
        <CodeBlock
          filename="app/lib/cn.ts"
          code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
        />

        <h3 className="text-foreground mt-6 mb-2 text-sm font-semibold">
          3. Configurar path alias
        </h3>
        <CodeBlock
          filename="tsconfig.json"
          code={`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./app/*"]
    }
  }
}`}
        />

        <h3 className="text-foreground mt-6 mb-2 text-sm font-semibold">
          4. Criar pasta de componentes
        </h3>
        <CodeBlock code={`mkdir -p app/components/ui`} />
      </DocSection>

      <DocSection id="configuracao" title="Configuracao">
        <CodeBlock
          filename="wi-ui.json"
          code={`{
  "framework": "remix",
  "componentsDir": "app/components/ui",
  "libDir": "app/lib",
  "importAlias": "~/"
}`}
        />

        <p className="text-muted-foreground mt-3 text-sm">
          CSS com design tokens:
        </p>

        <CodeBlock
          filename="app/tailwind.css"
          code={`@import "tailwindcss";

@theme {
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.145 0 0);
  --color-muted: oklch(0.97 0 0);
  --color-muted-foreground: oklch(0.556 0 0);
  --color-border: oklch(0.922 0 0);
  --color-primary: oklch(0.8234 0.1927 206.47);
}

.dark {
  --color-background: oklch(0.145 0 0);
  --color-foreground: oklch(0.985 0 0);
  --color-muted: oklch(0.269 0 0);
  --color-muted-foreground: oklch(0.708 0 0);
  --color-border: oklch(0.269 0 0);
}`}
        />

        <p className="text-muted-foreground mt-3 text-sm">
          Importe o CSS no{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            root.tsx
          </code>
          :
        </p>

        <CodeBlock filename="app/root.tsx" code={`import "./tailwind.css";`} />
      </DocSection>

      <DocSection id="adicionar-componente" title="Adicionar componente">
        <CommandBlock
          commands={{
            pnpm: "pnpm dlx @wi-ui/cli add button card",
            npm: "npx @wi-ui/cli add button card",
            yarn: "yarn dlx @wi-ui/cli add button card",
            bun: "bunx @wi-ui/cli add button card",
          }}
          icon={Package}
        />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <CodeBlock
          filename="app/routes/_index.tsx"
          code={`import { Button } from "~/components/ui/button";

export default function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Button>Comecar agora</Button>
    </div>
  );
}`}
        />
      </DocSection>

      <DocSection id="estrutura" title="Estrutura do projeto">
        <CodeBlock
          code={`meu-projeto/
├── app/
│   ├── components/
│   │   └── ui/              # Componentes WI.UI
│   │       ├── button.tsx
│   │       └── ...
│   ├── lib/
│   │   └── cn.ts            # Utilitario de classes
│   ├── routes/
│   │   └── _index.tsx
│   ├── root.tsx
│   └── tailwind.css         # Tailwind + tokens
├── wi-ui.json               # Config WI.UI
└── package.json`}
        />
      </DocSection>
    </DocPage>
  );
}
