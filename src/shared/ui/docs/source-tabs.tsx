"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface SourceFile {
  filename: string;
  content: string;
  path: string;
}

interface SourceTabsProps {
  files: SourceFile[];
  className?: string;
}

function SourceTabs({ files, className }: SourceTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentFile = files[activeTab];

  async function handleCopy() {
    if (!currentFile) return;
    await navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (files.length === 0) return null;

  return (
    <div
      className={cn(
        "border-border/60 overflow-hidden rounded-xl border",
        className,
      )}
    >
      {/* Tab bar */}
      <div className="border-border/40 bg-muted/30 flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-1 overflow-x-auto">
          {files.map((file, index) => (
            <button
              key={file.path}
              onClick={() => setActiveTab(index)}
              className={cn(
                "shrink-0 rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors",
                activeTab === index
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {file.filename}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          aria-label={copied ? "Copiado!" : "Copiar codigo fonte"}
          className={cn(
            "ml-2 flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all",
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

      {/* Code area */}
      <div className="bg-[oklch(0.16_0_0)] dark:bg-[oklch(0.12_0_0)]">
        <pre className="[scrollbar-width:none] overflow-x-auto p-5 text-[13px] leading-relaxed [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <code className="font-mono text-[oklch(0.85_0_0)]">
            {currentFile?.content ?? ""}
          </code>
        </pre>
      </div>
    </div>
  );
}

export { SourceTabs, type SourceTabsProps, type SourceFile };
