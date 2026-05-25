import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import consola from "consola";

const CSS_SEARCH_PATHS: Record<string, string[]> = {
  nextjs: [
    "src/app/globals.css",
    "app/globals.css",
    "src/globals.css",
    "src/index.css",
  ],
  remix: ["app/root.css", "app/globals.css", "src/index.css"],
  vite: ["src/index.css", "src/globals.css"],
  other: ["src/index.css", "src/globals.css", "globals.css"],
};

const CSS_DEFAULT_PATH: Record<string, string> = {
  nextjs: "src/app/globals.css",
  remix: "app/root.css",
  vite: "src/index.css",
  other: "src/index.css",
};

export function detectCssFile(framework: string, cwd: string): string {
  const searchPaths = CSS_SEARCH_PATHS[framework] ?? CSS_SEARCH_PATHS.other;

  for (const cssPath of searchPaths) {
    if (existsSync(join(cwd, cssPath))) {
      return cssPath;
    }
  }

  return CSS_DEFAULT_PATH[framework] ?? CSS_DEFAULT_PATH.other;
}

export function injectTheme(
  cssPath: string,
  themeCSS: string,
  cwd: string,
): void {
  const fullPath = join(cwd, cssPath);
  const dir = dirname(fullPath);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  if (existsSync(fullPath)) {
    const existing = readFileSync(fullPath, "utf-8");
    if (existing.trim().length > 0) {
      const backupPath = `${fullPath}.bak`;
      writeFileSync(backupPath, existing, "utf-8");
      consola.warn(`Backup do CSS original salvo em: ${cssPath}.bak`);
    }
  }

  writeFileSync(fullPath, themeCSS, "utf-8");
}
