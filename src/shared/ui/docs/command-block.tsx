"use client";

import { useState } from "react";
import { Copy, Check, Terminal, Package } from "lucide-react";
import { cn } from "@/lib/cn";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const ICONS = {
  terminal: Terminal,
  package: Package,
} as const;

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
  icon = "terminal",
}: {
  commands: Record<PackageManager, string>;
  icon?: keyof typeof ICONS;
}) {
  const Icon = ICONS[icon];
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

      <div className="flex items-center gap-3 overflow-x-auto px-4 py-3">
        <Icon className="text-muted-foreground size-4 shrink-0" />
        <code className="text-foreground flex-1 font-mono text-xs whitespace-nowrap sm:text-sm">
          {command}
        </code>
        <CopyButton text={command} />
      </div>
    </div>
  );
}

export { CommandBlock, CopyButton, type PackageManager };
