import fsExtra from "fs-extra";
import { join, basename, dirname } from "pathe";

const { readFile, outputFile, pathExists } = fsExtra;
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function getSourceRoot(): string {
  // tsup gera tudo em dist/ flat (sem subpastas)
  // __dirname é packages/cli/dist/
  // Sobe: dist → packages/cli → packages → repo root → src
  return join(__dirname, "..", "..", "..", "src");
}

export async function copyComponentFiles(
  sourceFiles: string[],
  targetDir: string,
  componentName: string,
  cnImport: string = "../../lib/cn",
): Promise<string[]> {
  const sourceRoot = getSourceRoot();
  const createdFiles: string[] = [];

  for (const relPath of sourceFiles) {
    const sourcePath = join(sourceRoot, relPath.replace(/^src\//, ""));
    const fileName = basename(relPath);

    // Skip cn.ts — já existe no libDir
    if (fileName === "cn.ts") continue;

    const destPath = join(targetDir, fileName);

    if (!(await pathExists(sourcePath))) {
      continue;
    }

    let content = await readFile(sourcePath, "utf-8");
    content = rewriteImports(content, componentName, cnImport);

    await outputFile(destPath, content, "utf-8");
    createdFiles.push(destPath);
  }

  return createdFiles;
}

function rewriteImports(
  content: string,
  componentName: string,
  cnImport: string,
): string {
  return content
    .replace(/@\/lib\/cn/g, cnImport)
    .replace(
      new RegExp(`@/shared/ui/components/(${componentName})`, "g"),
      `./$1`,
    )
    .replace(/@\/shared\/ui\/components\/(\w[\w-]*)/g, "./$1");
}

export async function createCnUtil(targetDir: string): Promise<string> {
  const cnPath = join(targetDir, "cn.ts");

  if (await pathExists(cnPath)) return cnPath;

  const content = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

  await outputFile(cnPath, content, "utf-8");
  return cnPath;
}
