import { defineCommand } from "citty";
import consola from "consola";
import { join } from "pathe";
import fsExtra from "fs-extra";

const { pathExists } = fsExtra;
import { registry, type RegistryEntry } from "@wi-ui/registry";
import { loadConfig } from "../utils/config.js";
import { DEFAULT_REGISTRY_URL } from "../utils/config.js";
import { detectPackageManager } from "../utils/detect.js";
import { installPackages } from "../utils/installer.js";
import { copyComponentFiles, createCnUtil } from "../utils/files.js";
import {
  fetchRegistryList,
  fetchComponent,
  type RemoteRegistryEntry,
} from "../utils/remote-registry.js";
import { writeRemoteComponentFiles } from "../utils/files-remote.js";
import { computeCnImportPath } from "../utils/import-path.js";

type InstallableEntry = RegistryEntry | RemoteRegistryEntry;

export const addCommand = defineCommand({
  meta: {
    name: "add",
    description: "Adiciona um ou mais componentes ao projeto",
  },
  args: {
    components: {
      type: "positional",
      description: "Nome(s) do(s) componente(s) — ex: button card badge",
      required: false,
    },
    cwd: {
      type: "string",
      description: "Diretório do projeto (padrão: cwd)",
      default: process.cwd(),
    },
    overwrite: {
      type: "boolean",
      alias: "o",
      description: "Sobrescrever arquivos existentes",
      default: false,
    },
    "all-base": {
      type: "boolean",
      description: "Adiciona todos os componentes base",
      default: false,
    },
    "all-fomo": {
      type: "boolean",
      description: "Adiciona todos os componentes FOMO",
      default: false,
    },
    "all-animation": {
      type: "boolean",
      description: "Adiciona todos os componentes de animação",
      default: false,
    },
    "all-block": {
      type: "boolean",
      description: "Adiciona todos os blocos de seção",
      default: false,
    },
    all: {
      type: "boolean",
      description: "Adiciona TODOS os componentes",
      default: false,
    },
  },
  async run({ args }) {
    const cwd = args.cwd ?? process.cwd();

    const componentNames = resolveComponentNames(args);

    const config = await loadConfig(cwd);
    if (!config) {
      consola.error("wi-ui.json não encontrado. Rode `wi-ui init` primeiro.");
      process.exit(1);
    }

    const registryUrl = config.registry ?? DEFAULT_REGISTRY_URL;
    const pm = await detectPackageManager(cwd);
    const targetDir = join(cwd, config.componentsDir);
    const libDir = join(cwd, config.libDir);
    const cnImport = computeCnImportPath(config.componentsDir, config.libDir);

    // Tenta buscar do registry remoto primeiro, fallback para local
    const useRemote = await tryUseRemoteRegistry(registryUrl, componentNames);

    if (useRemote) {
      await addRemote(
        componentNames,
        registryUrl,
        targetDir,
        libDir,
        cnImport,
        cwd,
        pm,
        args.overwrite,
      );
    } else {
      await addLocal(
        componentNames,
        targetDir,
        libDir,
        cnImport,
        cwd,
        pm,
        args.overwrite,
      );
    }
  },
});

type CategoryFlag = "all-base" | "all-fomo" | "all-animation" | "all-block";

const CATEGORY_FLAG_MAP: Record<CategoryFlag, RegistryEntry["category"]> = {
  "all-base": "base",
  "all-fomo": "fomo",
  "all-animation": "animation",
  "all-block": "block",
};

function resolveComponentNames(args: Record<string, unknown>): string[] {
  // --all flag: every component
  if (args.all) {
    const names = registry.map((e) => e.name);
    consola.info(`Adicionando TODOS os ${names.length} componentes...`);
    return names;
  }

  // Category flags: --all-base, --all-fomo, etc.
  const categoryNames: string[] = [];
  for (const [flag, category] of Object.entries(CATEGORY_FLAG_MAP)) {
    if (args[flag]) {
      const entries = registry.filter((e) => e.category === category);
      categoryNames.push(...entries.map((e) => e.name));
    }
  }

  if (categoryNames.length > 0) {
    const unique = [...new Set(categoryNames)];
    consola.info(`Adicionando ${unique.length} componente(s) por categoria...`);
    return unique;
  }

  // Positional: component names
  const positional = String(args.components ?? "")
    .split(/[\s,]+/)
    .filter(Boolean);

  if (positional.length === 0) {
    consola.error(
      "Especifique componente(s) ou use --all-base, --all-fomo, --all-animation, --all-block, --all",
    );
    process.exit(1);
  }

  return positional;
}

async function tryUseRemoteRegistry(
  registryUrl: string,
  componentNames: string[],
): Promise<boolean> {
  if (registryUrl === DEFAULT_REGISTRY_URL) {
    // Verifica se ao menos 1 componente existe remotamente
    const remoteList = await fetchRegistryList(registryUrl);
    if (!remoteList) return false;

    const remoteNames = new Set(remoteList.map((c) => c.name));
    return componentNames.some((name) => remoteNames.has(name));
  }

  // Registry customizado — sempre tenta remoto
  const remoteList = await fetchRegistryList(registryUrl);
  return remoteList !== null;
}

async function addRemote(
  componentNames: string[],
  registryUrl: string,
  targetDir: string,
  libDir: string,
  cnImport: string,
  cwd: string,
  pm: "pnpm" | "npm" | "yarn" | "bun",
  overwrite: boolean,
): Promise<void> {
  consola.info(`Buscando componentes do registry remoto: ${registryUrl}`);

  const toAdd: RemoteRegistryEntry[] = [];
  const notFound: string[] = [];

  for (const name of componentNames) {
    // Auto-adiciona spinner se button for solicitado
    if (name === "button") {
      const spinner = await fetchComponent(registryUrl, "spinner");
      if (spinner) {
        const exists =
          !overwrite && (await pathExists(join(targetDir, "spinner.tsx")));
        if (!exists) toAdd.push(spinner);
      }
    }

    const entry = await fetchComponent(registryUrl, name);
    if (!entry) {
      notFound.push(name);
    } else {
      const exists =
        !overwrite && (await pathExists(join(targetDir, `${name}.tsx`)));
      if (!exists) toAdd.push(entry);
      else
        consola.warn(`"${name}" já existe. Use --overwrite para substituir.`);
    }
  }

  if (notFound.length > 0) {
    consola.warn(
      `Componente(s) não encontrado(s) no registry remoto: ${notFound.join(", ")}`,
    );
    consola.info("Tentando fallback local...");
    await addLocal(notFound, targetDir, cwd, pm, overwrite);
  }

  if (toAdd.length === 0) {
    consola.info("Nenhum componente novo para adicionar.");
    return;
  }

  await ensureCnUtil(libDir, cwd);

  const allCreatedFiles: string[] = [];
  const allDeps = new Set<string>();

  for (const entry of toAdd) {
    consola.start(`Adicionando ${entry.name} (remoto)...`);

    const remoteData = await fetchComponent(registryUrl, entry.name);
    if (!remoteData) {
      consola.warn(`Falha ao baixar "${entry.name}". Pulando.`);
      continue;
    }

    const createdFiles = await writeRemoteComponentFiles(
      remoteData.files as Array<{
        name: string;
        path: string;
        content: string;
      }>,
      targetDir,
      entry.name,
      cnImport,
    );

    allCreatedFiles.push(...createdFiles);
    entry.dependencies.forEach((dep) => allDeps.add(dep));

    consola.success(`${entry.name} adicionado`);
  }

  await installMissingDeps(cwd, pm, Array.from(allDeps));
  printSummary(toAdd.length, allCreatedFiles, cwd, Array.from(allDeps));
}

async function addLocal(
  componentNames: string[],
  targetDir: string,
  libDir: string,
  cnImport: string,
  cwd: string,
  pm: "pnpm" | "npm" | "yarn" | "bun",
  overwrite: boolean,
): Promise<void> {
  const toInstall = resolveComponentDeps(componentNames, registry);

  if (toInstall.length === 0) {
    consola.error(
      `Componente(s) não encontrado(s): ${componentNames.join(", ")}`,
    );
    consola.info("Use `wi-ui list` para ver os componentes disponíveis.");
    process.exit(1);
  }

  const { toAdd, skipped } = await partitionExisting(
    toInstall,
    targetDir,
    overwrite,
  );

  if (skipped.length > 0) {
    consola.warn(
      `Já existe(m): ${skipped.map((e) => e.name).join(", ")}. Use --overwrite para substituir.`,
    );
  }

  if (toAdd.length === 0) {
    consola.info("Nenhum componente novo para adicionar.");
    return;
  }

  await ensureCnUtil(libDir, cwd);

  const allCreatedFiles: string[] = [];
  const allDeps = new Set<string>();

  for (const entry of toAdd) {
    consola.start(`Adicionando ${entry.name} (local)...`);

    const createdFiles = await copyComponentFiles(
      entry.files,
      targetDir,
      entry.name,
      cnImport,
    );

    allCreatedFiles.push(...createdFiles);
    entry.dependencies?.forEach((dep) => allDeps.add(dep));

    consola.success(`${entry.name} adicionado`);
  }

  await installMissingDeps(cwd, pm, Array.from(allDeps));
  printSummary(toAdd.length, allCreatedFiles, cwd, Array.from(allDeps));
}

async function ensureCnUtil(libDir: string, cwd: string): Promise<void> {
  const cnPath = await createCnUtil(libDir);
  const cnRelative = cnPath.replace(cwd + "/", "");
  if (cnRelative !== cnPath) {
    consola.info(`cn.ts garantido em: ${cnRelative}`);
  }
}

async function installMissingDeps(
  cwd: string,
  pm: "pnpm" | "npm" | "yarn" | "bun",
  deps: string[],
): Promise<void> {
  const missingDeps = await filterMissingPackages(cwd, deps);
  if (missingDeps.length > 0) {
    await installPackages(cwd, pm, missingDeps);
  }
}

function printSummary(
  count: number,
  createdFiles: string[],
  cwd: string,
  installedDeps: string[],
): void {
  const relativeFiles = createdFiles.map((f) =>
    f.replace(cwd + "/", "").replace(cwd.replace(/\\/g, "/") + "/", ""),
  );

  consola.box(
    [
      `${count} componente(s) adicionado(s) com sucesso!`,
      "",
      "Arquivos criados:",
      ...relativeFiles.map((f) => `  + ${f}`),
      ...(installedDeps.length > 0
        ? ["", `Dependências instaladas: ${installedDeps.join(", ")}`]
        : []),
    ].join("\n"),
  );
}

function resolveComponentDeps(
  names: string[],
  reg: RegistryEntry[],
): RegistryEntry[] {
  const entryMap = new Map(reg.map((e) => [e.name, e]));
  const resolved = new Map<string, RegistryEntry>();

  function resolve(name: string): void {
    if (resolved.has(name)) return;
    const entry = entryMap.get(name);
    if (!entry) return;
    resolved.set(name, entry);
  }

  for (const name of names) {
    resolve(name);
  }

  const order: RegistryEntry[] = [];
  const visited = new Set<string>();

  function visit(name: string): void {
    if (visited.has(name)) return;
    visited.add(name);
    const entry = resolved.get(name);
    if (!entry) return;
    order.push(entry);
  }

  const spinnerNeeded = names.includes("button") && !names.includes("spinner");
  if (spinnerNeeded && entryMap.has("spinner")) {
    resolve("spinner");
    visit("spinner");
  }

  for (const name of names) {
    visit(name);
  }

  return order;
}

async function partitionExisting(
  entries: InstallableEntry[],
  targetDir: string,
  overwrite: boolean,
): Promise<{ toAdd: InstallableEntry[]; skipped: InstallableEntry[] }> {
  const toAdd: InstallableEntry[] = [];
  const skipped: InstallableEntry[] = [];

  for (const entry of entries) {
    const componentFile = join(targetDir, `${entry.name}.tsx`);
    const exists = await pathExists(componentFile);

    if (exists && !overwrite) {
      skipped.push(entry);
    } else {
      toAdd.push(entry);
    }
  }

  return { toAdd, skipped };
}

async function filterMissingPackages(
  cwd: string,
  deps: string[],
): Promise<string[]> {
  const nmPath = join(cwd, "node_modules");
  const exists = await pathExists(nmPath);
  if (!exists) return deps;

  const checks = await Promise.all(
    deps.map(async (dep) => ({
      dep,
      missing: !(await pathExists(join(nmPath, dep))),
    })),
  );

  return checks.filter((c) => c.missing).map((c) => c.dep);
}
