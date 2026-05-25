"use client";

import { useState } from "react";
import { Copy, Check, Code2 } from "lucide-react";
import { cn } from "@/lib/cn";

interface ComponentPreviewClientProps {
  children: React.ReactNode;
  code: string;
  highlightedHtml: string;
  className?: string;
}

function ComponentPreviewClient({
  children,
  code,
  highlightedHtml,
  className,
}: ComponentPreviewClientProps) {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className={cn(
        "border-border overflow-hidden rounded-xl border",
        className,
      )}
    >
      <div
        className={cn(
          "bg-background flex min-h-[200px] items-center justify-center p-4 sm:p-10",
          "[background-image:radial-gradient(oklch(0.5_0_0/0.15)_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(oklch(0.5_0_0/0.07)_1px,transparent_1px)]",
          "[background-size:16px_16px]",
        )}
      >
        <div className="flex w-full items-center justify-center">
          {children}
        </div>
      </div>

      <div className="border-border flex items-center justify-between border-t px-4 py-2">
        <button
          onClick={() => setShowCode((v) => !v)}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            showCode
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Code2 className="size-3.5" aria-hidden="true" />
          {showCode ? "Ocultar código" : "Ver código"}
        </button>

        <button
          onClick={handleCopy}
          aria-label={copied ? "Copiado!" : "Copiar código"}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all",
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
              <span className="hidden sm:inline">Copiar</span>
            </>
          )}
        </button>
      </div>

      {showCode && (
        <div className="border-border bg-secondary/50 dark:bg-secondary border-t">
          <div
            className="[scrollbar-width:none] overflow-x-auto p-5 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </div>
      )}
    </div>
  );
}

export { ComponentPreviewClient, type ComponentPreviewClientProps };
