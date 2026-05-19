import fsExtra from "fs-extra";
import { join } from "pathe";
import { type RemoteComponentFile } from "./remote-registry.js";

const { outputFile } = fsExtra;

function rewriteImports(content: string, cnImport: string): string {
  return content
    .replace(/@\/lib\/cn/g, cnImport)
    .replace(/["']\.\.\/cn["']/g, `"${cnImport}"`)
    .replace(/@\/shared\/ui\/components\/([\w-]+)/g, "./$1")
    .replace(/from\s+["']\.\/button\.variants["']/g, `from "./button"`);
}

export async function writeRemoteComponentFiles(
  files: RemoteComponentFile[],
  targetDir: string,
  componentName: string,
  cnImport: string = "../../lib/cn",
): Promise<string[]> {
  const createdFiles: string[] = [];

  for (const file of files) {
    // Skip cn.ts — já existe no libDir
    if (file.name === "cn.ts") continue;

    const destPath = join(targetDir, file.name);
    const content = rewriteImports(file.content, cnImport);
    await outputFile(destPath, content, "utf-8");
    createdFiles.push(destPath);
  }

  return createdFiles;
}
