import { readFileSync } from "fs";
import { join } from "path";
import { registry } from "@/features/registry/domain/registry-data";
import { CollapsibleSource } from "./collapsible-source";

interface ComponentSourceProps {
  componentName: string;
  className?: string;
}

function ComponentSource({ componentName, className }: ComponentSourceProps) {
  const entry = registry.find((r) => r.name === componentName);

  if (!entry) {
    return (
      <div className="border-border/60 bg-muted/20 rounded-xl border px-4 py-6 text-center text-sm text-red-500">
        Componente &quot;{componentName}&quot; nao encontrado no registry.
      </div>
    );
  }

  const root = process.cwd();

  const files = entry.files.map((filePath) => {
    const absolutePath = join(root, filePath);
    let content = "";
    try {
      content = readFileSync(absolutePath, "utf-8");
    } catch {
      content = `// Arquivo nao encontrado: ${filePath}`;
    }

    const filename = filePath.split("/").pop() ?? filePath;
    return { filename, content, path: filePath };
  });

  return <CollapsibleSource files={files} className={className} />;
}

export { ComponentSource, type ComponentSourceProps };
