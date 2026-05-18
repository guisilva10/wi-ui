import fsExtra from "fs-extra";
import { join } from "pathe";

const { readFile, writeFile, pathExists } = fsExtra;

export type WiUiConfig = {
  componentsDir: string;
  framework: "nextjs" | "vite" | "remix" | "other";
  typescript: boolean;
  tailwind: boolean;
};

const CONFIG_FILE = "wi-ui.json";

const DEFAULT_CONFIG: WiUiConfig = {
  componentsDir: "src/components/ui",
  framework: "nextjs",
  typescript: true,
  tailwind: true,
};

export async function loadConfig(cwd: string): Promise<WiUiConfig | null> {
  const configPath = join(cwd, CONFIG_FILE);
  const exists = await pathExists(configPath);
  if (!exists) return null;

  const raw = await readFile(configPath, "utf-8");
  return JSON.parse(raw) as WiUiConfig;
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
