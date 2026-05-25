import fsExtra from "fs-extra";
import { join } from "pathe";
import { consola } from "consola";

const { readFile, writeFile, pathExists } = fsExtra;

export type WiUiConfig = {
  componentsDir: string;
  libDir: string;
  framework: "nextjs" | "vite" | "remix" | "other";
  typescript: boolean;
  tailwind: boolean;
  registry?: string;
};

const CONFIG_FILE = "wi-ui.json";

export const DEFAULT_REGISTRY_URL = "https://wi-ui.vercel.app/api/registry";

const DEFAULT_CONFIG: WiUiConfig = {
  componentsDir: "src/components/ui",
  libDir: "src/lib",
  framework: "nextjs",
  typescript: true,
  tailwind: true,
  registry: DEFAULT_REGISTRY_URL,
};

export async function loadConfig(cwd: string): Promise<WiUiConfig | null> {
  const configPath = join(cwd, CONFIG_FILE);
  const exists = await pathExists(configPath);
  if (!exists) return null;

  const raw = await readFile(configPath, "utf-8");
  try {
    return JSON.parse(raw) as WiUiConfig;
  } catch {
    consola.error("wi-ui.json inválido. Verifique a sintaxe JSON.");
    return null;
  }
}

export async function saveConfig(
  cwd: string,
  config: WiUiConfig,
): Promise<void> {
  const configPath = join(cwd, CONFIG_FILE);
  await writeFile(configPath, JSON.stringify(config, null, 2) + "\n", "utf-8");
}

export function getDefaultConfig(): WiUiConfig {
  return { ...DEFAULT_CONFIG };
}
