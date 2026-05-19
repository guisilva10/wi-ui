"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { cn } from "@/lib/cn";

interface InstallCommandProps {
  componentName: string;
  className?: string;
}

function InstallCommand({ componentName, className }: InstallCommandProps) {
  const [copied, setCopied] = useState(false);
  const command = `npx @wi-ui/cli add ${componentName}`;

  async function handleCopy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className={cn(
        "border-border/60 bg-muted/20 flex items-center justify-between gap-3 rounded-xl border px-4 py-3",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Terminal
          className="text-muted-foreground size-4 shrink-0"
          aria-hidden="true"
        />
        <code className="text-foreground truncate font-mono text-sm">
          {command}
        </code>
      </div>
      <button
        onClick={handleCopy}
        aria-label={copied ? "Copiado!" : "Copiar comando"}
        className={cn(
          "flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all",
          copied
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {copied ? (
          <>
            <Check className="size-3.5" aria-hidden="true" />
            <span>Copiado!</span>
          </>
        ) : (
          <>
            <Copy className="size-3.5" aria-hidden="true" />
            <span>Copiar</span>
          </>
        )}
      </button>
    </div>
  );
}

export { InstallCommand, type InstallCommandProps };
