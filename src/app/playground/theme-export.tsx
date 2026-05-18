"use client";

import { useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/shared/ui/components/button/button.variants";

interface ThemeExportProps {
  css: string;
  onClose: () => void;
}

function ThemeExport({ css, onClose }: ThemeExportProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Exportar tema CSS"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div className="bg-card border-border relative z-10 w-full max-w-2xl rounded-xl border shadow-2xl">
        {/* Header */}
        <div className="border-border flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-foreground text-sm font-semibold">
              Exportar Tema CSS
            </h2>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Cole no seu{" "}
              <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">
                globals.css
              </code>{" "}
              substituindo as variáveis existentes
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        {/* Code block */}
        <div className="relative">
          <pre className="bg-muted/50 max-h-96 scrollbar-thin overflow-auto p-5 font-mono text-xs leading-relaxed">
            <code className="text-foreground whitespace-pre">{css}</code>
          </pre>

          {/* Copy button overlay */}
          <button
            onClick={handleCopy}
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "absolute top-3 right-3 gap-1.5",
            )}
          >
            {copied ? (
              <>
                <Check className="size-3 text-emerald-500" aria-hidden />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="size-3" aria-hidden />
                Copiar
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="border-border border-t px-5 py-3">
          <p className="text-muted-foreground text-xs">
            Dica: use{" "}
            <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">
              @theme inline
            </code>{" "}
            no Tailwind v4 para mapear as variáveis CSS para as classes
            utilitárias.
          </p>
        </div>
      </div>
    </div>
  );
}

export { ThemeExport };
