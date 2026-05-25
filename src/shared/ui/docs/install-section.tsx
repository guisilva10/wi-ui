import { readFileSync } from "fs";
import { join } from "path";
import { registry } from "@wi-ui/registry";
import { InstallTabs } from "./install-tabs";

interface InstallSectionProps {
  componentName: string;
  className?: string;
}

function InstallSection({ componentName, className }: InstallSectionProps) {
  const entry = registry.find((r) => r.name === componentName);

  if (!entry) {
    return (
      <div className="border-border bg-muted/20 rounded-xl border px-4 py-6 text-center text-sm text-red-500">
        Componente &quot;{componentName}&quot; nao encontrado no registry.
      </div>
    );
  }

  const root = process.cwd();
  const command = `npx @wi-ui/cli add ${componentName}`;

  const sourceFiles = entry.files.map((filePath) => {
    const absolutePath = join(root, filePath);
    let content = "";
    try {
      content = readFileSync(absolutePath, "utf-8");
    } catch {
      content = `// Arquivo nao encontrado: ${filePath}`;
    }

    const filename = filePath.split("/").pop() ?? filePath;
    return { filename, content };
  });

  return (
    <InstallTabs
      command={command}
      sourceFiles={sourceFiles}
      className={className}
    />
  );
}

export { InstallSection, type InstallSectionProps };
