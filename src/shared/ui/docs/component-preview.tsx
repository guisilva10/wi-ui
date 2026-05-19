"use client";

import { useState } from "react";
import { Copy, Check, Eye, Code2 } from "lucide-react";
import { cn } from "@/lib/cn";

type PreviewTab = "preview" | "code";

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
  const [activeTab, setActiveTab] = useState<PreviewTab>("preview");

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className={cn(
        "border-border/60 overflow-hidden rounded-xl border",
        className,
      )}
    >
      {/* Tab bar */}
      <div className="border-border/40 bg-muted/30 flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("preview")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              activeTab === "preview"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Eye className="size-3.5" aria-hidden="true" />
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              activeTab === "code"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Code2 className="size-3.5" aria-hidden="true" />
            Code
          </button>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          aria-label={copied ? "Copiado!" : "Copiar codigo"}
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

      {/* Preview area */}
      <div
        className={cn(
          "transition-all duration-200",
          activeTab === "preview" ? "block" : "hidden",
        )}
      >
        <div className="bg-background flex min-h-[140px] items-center justify-center p-8">
          <div className="w-full">{children}</div>
        </div>
      </div>

      {/* Code area */}
      <div
        className={cn(
          "transition-all duration-200",
          activeTab === "code" ? "block" : "hidden",
        )}
      >
        <div className="bg-[oklch(0.16_0_0)] dark:bg-[oklch(0.12_0_0)]">
          <pre className="scrollbar-thin overflow-x-auto p-5 text-[13px] leading-relaxed">
            <code className="font-mono text-[oklch(0.85_0_0)]">{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export { ComponentPreview, type ComponentPreviewProps };
