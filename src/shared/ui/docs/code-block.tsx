import { highlightCode } from "@/lib/shiki";
import { cn } from "@/lib/cn";

interface CodeBlockProps {
  code: string;
  filename?: string;
  lang?: string;
  className?: string;
}

function detectLang(filename?: string): string {
  if (!filename) return "text";
  const ext = filename.split(".").pop()?.toLowerCase();
  const map: Record<string, string> = {
    ts: "typescript",
    tsx: "tsx",
    js: "javascript",
    jsx: "jsx",
    json: "json",
    css: "css",
    html: "html",
    astro: "html",
    md: "markdown",
    mjs: "javascript",
  };
  return map[ext ?? ""] ?? "text";
}

async function CodeBlock({ code, filename, lang, className }: CodeBlockProps) {
  const resolvedLang = lang ?? detectLang(filename);
  let highlightedHtml: string | null = null;

  try {
    highlightedHtml = await highlightCode(code, resolvedLang);
  } catch {
    // fallback to plain text
  }

  return (
    <div
      className={cn(
        "border-border overflow-hidden rounded-xl border",
        className,
      )}
    >
      {filename && (
        <div className="bg-muted/30 border-border border-b px-4 py-2">
          <span className="text-muted-foreground font-mono text-xs">
            {filename}
          </span>
        </div>
      )}
      <div className="bg-secondary/50 dark:bg-secondary">
        {highlightedHtml ? (
          <div
            className="[scrollbar-width:none] overflow-x-auto p-4 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <pre className="text-foreground/85 overflow-x-auto p-4 font-mono text-sm leading-relaxed">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}

export { CodeBlock, type CodeBlockProps };
