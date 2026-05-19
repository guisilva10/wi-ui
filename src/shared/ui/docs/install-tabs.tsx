"use client";

import { useState } from "react";
import { Copy, Check, Terminal, FileCode } from "lucide-react";
import { cn } from "@/lib/cn";

type InstallTab = "cli" | "manual";

interface InstallTabsProps {
  command: string;
  sourceFiles: { filename: string; content: string }[];
  className?: string;
}

function InstallTabs({ command, sourceFiles, className }: InstallTabsProps) {
  const [tab, setTab] = useState<InstallTab>("cli");
  const [copied, setCopied] = useState(false);
  const [activeFile, setActiveFile] = useState(0);

  const currentSource = sourceFiles[activeFile];

  async function handleCopy() {
    const text = tab === "cli" ? command : (currentSource?.content ?? "");
    await navigator.clipboard.writeText(text);
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
      <div className="border-border flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTab("cli")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              tab === "cli"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Terminal className="size-3.5" aria-hidden="true" />
            CLI
          </button>
          <button
            onClick={() => setTab("manual")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              tab === "manual"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <FileCode className="size-3.5" aria-hidden="true" />
            Manual
          </button>
        </div>

        <button
          onClick={handleCopy}
          aria-label={copied ? "Copiado!" : "Copiar"}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all",
            copied
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {copied ? (
            <Check className="size-3.5" aria-hidden="true" />
          ) : (
            <Copy className="size-3.5" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">
            {copied ? "Copiado!" : "Copiar"}
          </span>
        </button>
      </div>

      {tab === "cli" && (
        <div className="flex items-center gap-3 px-4 py-3">
          <span className="text-muted-foreground font-mono text-sm">$</span>
          <code className="text-foreground font-mono text-sm">{command}</code>
        </div>
      )}

      {tab === "manual" && (
        <>
          {sourceFiles.length > 1 && (
            <div className="border-border flex items-center gap-1 border-b px-4 py-1.5">
              {sourceFiles.map((file, i) => (
                <button
                  key={file.filename}
                  onClick={() => setActiveFile(i)}
                  className={cn(
                    "rounded-md px-2.5 py-1 font-mono text-xs transition-colors",
                    activeFile === i
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {file.filename}
                </button>
              ))}
            </div>
          )}
          <div className="bg-[oklch(0.16_0_0)] dark:bg-[oklch(0.12_0_0)]">
            <pre className="max-h-[400px] [scrollbar-width:none] overflow-auto p-4 text-[13px] leading-relaxed [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <code className="font-mono text-[oklch(0.85_0_0)]">
                {currentSource?.content ?? ""}
              </code>
            </pre>
          </div>
        </>
      )}
    </div>
  );
}

export { InstallTabs, type InstallTabsProps };
