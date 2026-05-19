import { relative, dirname } from "pathe";

/**
 * Calcula o import path do cn.ts relativo ao componentsDir.
 *
 * Ex: componentsDir="src/components/ui", libDir="src/lib"
 *     → "../../lib/cn"
 *
 * Ex: componentsDir="src/app/_components", libDir="src/lib"
 *     → "../../lib/cn"
 *
 * Se ambos estão no mesmo nível de src/, usa @/lib/cn como fallback.
 */
export function computeCnImportPath(
  componentsDir: string,
  libDir: string,
): string {
  // Calcula caminho relativo do componentsDir pro libDir
  const rel = relative(componentsDir, libDir);
  // rel será algo como "../../lib" → queremos "../../lib/cn"
  return `${rel}/cn`;
}
