import fsExtra from "fs-extra";
import { join } from "pathe";
import { type RemoteComponentFile } from "./remote-registry.js";

const { outputFile } = fsExtra;

export async function writeRemoteComponentFiles(
  files: RemoteComponentFile[],
  targetDir: string,
  componentName: string,
): Promise<string[]> {
  const createdFiles: string[] = [];

  for (const file of files) {
    const destPath = join(targetDir, componentName, file.name);
    await outputFile(destPath, file.content, "utf-8");
    createdFiles.push(destPath);
  }

  return createdFiles;
}
