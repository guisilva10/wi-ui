import fsExtra from "fs-extra";
import { join } from "pathe";

const { pathExists, readFile } = fsExtra;
import type { WiUiConfig } from "./config.js";

type Framework = WiUiConfig["framework"];
type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export async function detectFramework(cwd: string): Promise<Framework> {
  const pkgPath = join(cwd, "package.json");
  const exists = await pathExists(pkgPath);
  if (!exists) return "other";

  const raw = await readFile(pkgPath, "utf-8");
  const pkg = JSON.parse(raw) as Record<string, unknown>;
  const deps = {
    ...((pkg.dependencies as Record<string, string>) ?? {}),
    ...((pkg.devDependencies as Record<string, string>) ?? {}),
  };

  if ("next" in deps) return "nextjs";
  if ("@remix-run/react" in deps) return "remix";
  if ("vite" in deps) return "vite";
  return "other";
}

export async function detectPackageManager(
  cwd: string,
): Promise<PackageManager> {
  if (await pathExists(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (await pathExists(join(cwd, "bun.lockb"))) return "bun";
  if (await pathExists(join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

export async function detectTypeScript(cwd: string): Promise<boolean> {
  return pathExists(join(cwd, "tsconfig.json"));
}

export async function detectTailwind(cwd: string): Promise<boolean> {
  const pkgPath = join(cwd, "package.json");
  const exists = await pathExists(pkgPath);
  if (!exists) return false;

  const raw = await readFile(pkgPath, "utf-8");
  const pkg = JSON.parse(raw) as Record<string, unknown>;
  const deps = {
    ...((pkg.dependencies as Record<string, string>) ?? {}),
    ...((pkg.devDependencies as Record<string, string>) ?? {}),
  };

  return "tailwindcss" in deps;
}
