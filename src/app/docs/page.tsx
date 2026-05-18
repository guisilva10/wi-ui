"use client";

import { useState } from "react";
import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { cn } from "@/lib/cn";
import { Copy, Check, Terminal, Package } from "lucide-react";
import { SiNextdotjs, SiVite, SiRemix, SiAstro } from "react-icons/si";

const TOC = [
  { id: "o-que-e", label: "O que é WI.UI?", level: 2 },
  { id: "frameworks", label: "Frameworks", level: 2 },
  { id: "instalacao", label: "Instalação", level: 2 },
  { id: "adicionar-componente", label: "Adicionar componente", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
];

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const INIT_COMMANDS: Record<PackageManager, string> = {
  pnpm: "pnpm dlx wi-ui init",
  npm: "npx wi-ui init",
  yarn: "yarn dlx wi-ui init",
  bun: "bunx wi-ui init",
};

const ADD_COMMANDS: Record<PackageManager, string> = {
  pnpm: "pnpm dlx wi-ui add button",
  npm: "npx wi-ui add button",
  yarn: "yarn dlx wi-ui add button",
  bun: "bunx wi-ui add button",
};

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

export default function DocsPage() {
  return (
    <DocPage
      title="Começando"
      description="WI.UI é uma coleção de componentes React copy-paste. Instale via CLI, copie o código e customize como quiser."
      toc={TOC}
    >
      <DocSection id="o-que-e" title="O que é WI.UI?">
        <p className="text-muted-foreground text-sm leading-relaxed">
          WI.UI é inspirado no modelo copy-paste do shadcn/ui. Cada componente é
          independente — você copia o código direto para o seu projeto e tem
          controle total. Sem black-box, sem dependências ocultas.
        </p>
        <ul className="text-muted-foreground list-inside list-disc space-y-1.5 text-sm">
          <li>TypeScript com tipagem completa</li>
          <li>
            Dark mode nativo via classe{" "}
            <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
              .dark
            </code>
          </li>
          <li>Mobile-first e acessível</li>
          <li>Tailwind v4 + design tokens customizáveis</li>
          <li>Componentes Base, FOMO/Conversão e Animação</li>
        </ul>
      </DocSection>

      <DocSection id="frameworks" title="Frameworks">
        <p className="text-muted-foreground mb-4 text-sm">
          WI.UI funciona com qualquer framework React. O CLI detecta
          automaticamente seu setup.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              name: "Next.js",
              desc: "App Router & Pages",
              icon: SiNextdotjs,
            },
            { name: "Vite", desc: "React + Vite", icon: SiVite },
            {
              name: "Remix",
              desc: "Remix / React Router",
              icon: SiRemix,
            },
            { name: "Astro", desc: "Com React islands", icon: SiAstro },
          ].map((fw) => (
            <div
              key={fw.name}
              className="border-border hover:bg-muted/30 flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors"
            >
              <fw.icon className="text-foreground size-8" />
              <div>
                <p className="text-foreground text-sm font-medium">{fw.name}</p>
                <p className="text-muted-foreground text-xs">{fw.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="instalacao" title="Instalação">
        <p className="text-muted-foreground mb-3 text-sm">
          Inicialize o WI.UI no seu projeto. O CLI configura tudo
          automaticamente: cria o arquivo de configuração, instala dependências
          base e prepara a pasta de componentes.
        </p>

        <CommandBlock commands={INIT_COMMANDS} />

        <p className="text-muted-foreground mt-4 text-sm">Isso vai criar:</p>
        <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
          <li>
            <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
              wi-ui.json
            </code>{" "}
            — configuração do projeto
          </li>
          <li>
            <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
              src/lib/cn.ts
            </code>{" "}
            — utilitário de classes
          </li>
          <li>
            <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
              src/components/ui/
            </code>{" "}
            — pasta dos componentes
          </li>
        </ul>
      </DocSection>

      <DocSection id="adicionar-componente" title="Adicionar componente">
        <p className="text-muted-foreground mb-3 text-sm">
          Adicione componentes ao seu projeto com um comando. O CLI copia o
          código e instala dependências automaticamente.
        </p>

        <CommandBlock commands={ADD_COMMANDS} icon={Package} />

        <p className="text-muted-foreground mt-3 text-sm">
          O componente será copiado para{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            src/components/ui/button/
          </code>{" "}
          e suas dependências instaladas.
        </p>
      </DocSection>

      <DocSection id="uso" title="Uso">
        <p className="text-muted-foreground mb-3 text-sm">
          Após adicionar um componente, importe e use normalmente:
        </p>

        <div className="border-border overflow-hidden rounded-xl border">
          <div className="bg-muted/30 px-4 py-3">
            <pre className="text-foreground overflow-x-auto font-mono text-sm">
              <code>{`import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <div className="flex gap-2">
      <Button>Confirmar</Button>
      <Button variant="outline">Cancelar</Button>
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </DocSection>
    </DocPage>
  );
}
