import { readFileSync } from "fs";
import { join } from "path";
import { registry } from "@wi-ui/registry";
import { highlightCode } from "@/lib/shiki";
import { CollapsibleSource } from "./collapsible-source";

interface ComponentSourceProps {
  componentName: string;
  className?: string;
}

async function ComponentSource({
  componentName,
  className,
}: ComponentSourceProps) {
  const entry = registry.find((r) => r.name === componentName);

  if (!entry) {
    return (
      <div className="border-border/60 bg-muted/20 rounded-xl border px-4 py-6 text-center text-sm text-red-500">
        Componente &quot;{componentName}&quot; nao encontrado no registry.
      </div>
    );
  }

  const root = process.cwd();

  const files = await Promise.all(
    entry.files.map(async (filePath) => {
      const absolutePath = join(root, filePath);
      let content = "";
      try {
        content = readFileSync(absolutePath, "utf-8");
      } catch {
        content = `// Arquivo nao encontrado: ${filePath}`;
      }

      const filename = filePath.split("/").pop() ?? filePath;
      const lang = filename.endsWith(".css") ? "css" : "tsx";
      let highlightedHtml: string | undefined;
      try {
        highlightedHtml = await highlightCode(content, lang);
      } catch {
        highlightedHtml = undefined;
      }

      return { filename, content, path: filePath, highlightedHtml };
    }),
  );

  return <CollapsibleSource files={files} className={className} />;
}

export { ComponentSource, type ComponentSourceProps };
