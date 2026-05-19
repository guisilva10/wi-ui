import { readFile } from "node:fs/promises";
import { join, basename } from "node:path";
import { existsSync } from "node:fs";
import { type ComponentFile } from "../domain/component-file";

function getProjectRoot(): string {
  // Em produção (Vercel): process.cwd() é a raiz do projeto
  // Em dev: também é a raiz do projeto (Next.js define cwd como root)
  return process.cwd();
}

function normalizeImports(content: string, componentName: string): string {
  // Mantém @/lib/cn — CLI reescreve pro caminho correto baseado no wi-ui.json
  return content
    .replace(
      new RegExp(`@/shared/ui/components/(${componentName})`, "g"),
      `./$1`,
    )
    .replace(/@\/shared\/ui\/components\/([\w-]+)/g, "./$1");
}

export async function readComponentFiles(
  filePaths: string[],
): Promise<ComponentFile[]> {
  const projectRoot = getProjectRoot();
  const results: ComponentFile[] = [];

  for (const relPath of filePaths) {
    const absolutePath = join(projectRoot, relPath);

    if (!existsSync(absolutePath)) {
      continue;
    }

    const content = await readFile(absolutePath, "utf-8");
    const componentName = relPath.split("/").at(-2) ?? "";
    const normalized = normalizeImports(content, componentName);

    results.push({
      name: basename(relPath),
      path: relPath,
      content: normalized,
    });
  }

  return results;
}
