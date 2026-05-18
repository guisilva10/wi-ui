import { execSync } from "node:child_process";
import consola from "consola";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

function buildInstallCommand(
  pm: PackageManager,
  packages: string[],
  dev = false,
): string {
  const flag = dev ? (pm === "npm" ? "--save-dev" : "-D") : "";
  const pkgs = packages.join(" ");

  switch (pm) {
    case "pnpm":
      return `pnpm add ${flag} ${pkgs}`.trim();
    case "yarn":
      return `yarn add ${flag} ${pkgs}`.trim();
    case "bun":
      return `bun add ${flag} ${pkgs}`.trim();
    default:
      return `npm install ${flag} ${pkgs}`.trim();
  }
}

export async function installPackages(
  cwd: string,
  pm: PackageManager,
  packages: string[],
  dev = false,
): Promise<void> {
  if (packages.length === 0) return;

  const cmd = buildInstallCommand(pm, packages, dev);
  consola.info(`Instalando dependências: ${packages.join(", ")}`);

  try {
    execSync(cmd, { cwd, stdio: "inherit" });
  } catch {
    consola.warn(
      `Falha ao instalar automaticamente. Rode manualmente:\n  ${cmd}`,
    );
  }
}
