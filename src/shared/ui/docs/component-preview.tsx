"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  className?: string;
}

function ComponentPreview({
  children,
  code,
  className,
}: ComponentPreviewProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className={cn(
        "border-border overflow-hidden rounded-lg border",
        className,
      )}
    >
      {/* Preview area */}
      <div className="bg-muted/20 flex min-h-32 items-center justify-center p-6">
        {children}
      </div>

      {/* Code area */}
      <div className="bg-muted/50 border-border relative border-t">
        <button
          onClick={handleCopy}
          aria-label={copied ? "Copiado!" : "Copiar código"}
          className="border-border hover:bg-muted absolute top-3 right-3 flex items-center gap-1.5 rounded-md border bg-transparent px-2 py-1 text-xs transition-colors"
        >
          {copied ? (
            <>
              <Check className="size-3 text-green-500" />
              <span className="text-green-500">Copiado</span>
            </>
          ) : (
            <>
              <Copy className="size-3" />
              <span>Copiar</span>
            </>
          )}
        </button>

        <pre className="scrollbar-thin overflow-x-auto p-4 pr-20 text-xs leading-relaxed">
          <code className="text-foreground font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
}

export { ComponentPreview, type ComponentPreviewProps };
