import { defineCommand } from "citty";
import consola from "consola";
import { join } from "pathe";
import fsExtra from "fs-extra";

const { pathExists } = fsExtra;
import { registry, type RegistryEntry } from "@wi-ui/registry";
import { loadConfig } from "../utils/config.js";
import { detectPackageManager } from "../utils/detect.js";
import { installPackages } from "../utils/installer.js";
import { copyComponentFiles, createCnUtil } from "../utils/files.js";

export const addCommand = defineCommand({
  meta: {
    name: "add",
    description: "Adiciona um ou mais componentes ao projeto",
  },
  args: {
    components: {
      type: "positional",
      description: "Nome(s) do(s) componente(s) — ex: button card badge",
      required: true,
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
  },
  async run({ args }) {
    const cwd = args.cwd ?? process.cwd();
    const componentNames = String(args.components)
      .split(/[\s,]+/)
      .filter(Boolean);

    const config = await loadConfig(cwd);
    if (!config) {
      consola.error("wi-ui.json não encontrado. Rode `wi-ui init` primeiro.");
      process.exit(1);
    }

    const pm = await detectPackageManager(cwd);
    const targetDir = join(cwd, config.componentsDir);

    // Resolve o grafo de dependências entre componentes
    const toInstall = resolveComponentDeps(componentNames, registry);

    if (toInstall.length === 0) {
      consola.error(
        `Componente(s) não encontrado(s): ${componentNames.join(", ")}`,
      );
      consola.info("Use `wi-ui list` para ver os componentes disponíveis.");
      process.exit(1);
    }

    // Separa novos de já existentes
    const { toAdd, skipped } = await partitionExisting(
      toInstall,
      targetDir,
      args.overwrite,
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

    // Garante cn.ts no targetDir
    const cnPath = await createCnUtil(targetDir);
    const cnRelative = cnPath.replace(cwd + "/", "");
    if (cnRelative !== cnPath) {
      consola.info(`cn.ts garantido em: ${cnRelative}`);
    }

    const allCreatedFiles: string[] = [];
    const allDeps = new Set<string>();

    for (const entry of toAdd) {
      consola.start(`Adicionando ${entry.name}...`);

      const createdFiles = await copyComponentFiles(
        entry.files,
        targetDir,
        entry.name,
      );

      allCreatedFiles.push(...createdFiles);
      entry.dependencies?.forEach((dep) => allDeps.add(dep));

      consola.success(`${entry.name} adicionado`);
    }

    // Instala dependências npm coletadas
    const missingDeps = await filterMissingPackages(cwd, Array.from(allDeps));

    if (missingDeps.length > 0) {
      await installPackages(cwd, pm, missingDeps);
    }

    // Resumo final
    const relativeFiles = allCreatedFiles.map((f) =>
      f.replace(cwd + "/", "").replace(cwd.replace(/\\/g, "/") + "/", ""),
    );

    consola.box(
      [
        `${toAdd.length} componente(s) adicionado(s) com sucesso!`,
        "",
        "Arquivos criados:",
        ...relativeFiles.map((f) => `  + ${f}`),
        ...(missingDeps.length > 0
          ? ["", `Dependências instaladas: ${missingDeps.join(", ")}`]
          : []),
      ].join("\n"),
    );
  },
});

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

  // Ordena: dependências primeiro (ex: spinner antes de button)
  const order: RegistryEntry[] = [];
  const visited = new Set<string>();

  function visit(name: string): void {
    if (visited.has(name)) return;
    visited.add(name);
    const entry = resolved.get(name);
    if (!entry) return;
    order.push(entry);
  }

  // Adiciona spinner antes de button se button foi solicitado
  // (button depende de spinner via import)
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
  entries: RegistryEntry[],
  targetDir: string,
  overwrite: boolean,
): Promise<{ toAdd: RegistryEntry[]; skipped: RegistryEntry[] }> {
  const toAdd: RegistryEntry[] = [];
  const skipped: RegistryEntry[] = [];

  for (const entry of entries) {
    const componentDir = join(targetDir, entry.name);
    const exists = await pathExists(componentDir);

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
