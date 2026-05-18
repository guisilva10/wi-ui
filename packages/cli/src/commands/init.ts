import { defineCommand } from "citty";
import consola from "consola";
import { join } from "pathe";
import fsExtra from "fs-extra";

const { pathExists, outputFile } = fsExtra;
import {
  loadConfig,
  saveConfig,
  getDefaultConfig,
  type WiUiConfig,
} from "../utils/config.js";
import {
  detectFramework,
  detectPackageManager,
  detectTypeScript,
  detectTailwind,
} from "../utils/detect.js";
import { installPackages } from "../utils/installer.js";
import { createCnUtil } from "../utils/files.js";

export const initCommand = defineCommand({
  meta: {
    name: "init",
    description: "Inicializa o WI.UI no projeto atual",
  },
  args: {
    cwd: {
      type: "string",
      description: "Diretório do projeto (padrão: cwd)",
      default: process.cwd(),
    },
    yes: {
      type: "boolean",
      alias: "y",
      description: "Aceitar configurações padrão sem confirmação",
      default: false,
    },
    componentsDir: {
      type: "string",
      description: "Pasta destino dos componentes",
      default: "",
    },
  },
  async run({ args }) {
    const cwd = args.cwd ?? process.cwd();

    consola.start("Inicializando WI.UI...");

    const existing = await loadConfig(cwd);
    if (existing) {
      consola.warn("wi-ui.json já existe neste projeto.");
      consola.info("Use `wi-ui add <component>` para adicionar componentes.");
      return;
    }

    const [framework, pm, typescript, tailwind] = await Promise.all([
      detectFramework(cwd),
      detectPackageManager(cwd),
      detectTypeScript(cwd),
      detectTailwind(cwd),
    ]);

    consola.info(`Framework detectado: ${framework}`);
    consola.info(`Package manager: ${pm}`);
    consola.info(`TypeScript: ${typescript ? "sim" : "não"}`);
    consola.info(`Tailwind CSS: ${tailwind ? "sim" : "não"}`);

    if (!tailwind) {
      consola.warn(
        "Tailwind CSS não detectado. Os componentes WI.UI requerem Tailwind.",
      );
    }

    const defaultConfig = getDefaultConfig();
    const componentsDir =
      args.componentsDir || resolveDefaultComponentsDir(framework, typescript);

    const config: WiUiConfig = {
      ...defaultConfig,
      framework,
      typescript,
      tailwind,
      componentsDir,
    };

    await saveConfig(cwd, config);
    consola.success(`wi-ui.json criado em ${join(cwd, "wi-ui.json")}`);

    // Cria a pasta destino dos componentes
    const fullComponentsDir = join(cwd, componentsDir);
    await outputFile(join(fullComponentsDir, ".gitkeep"), "");
    consola.success(`Pasta criada: ${componentsDir}`);

    // Cria cn.ts utilitário
    const cnPath = await createCnUtil(fullComponentsDir);
    consola.success(`Utilitário criado: ${cnPath.replace(cwd + "/", "")}`);

    // Instala dependências base
    const baseDeps = ["clsx", "tailwind-merge"];
    const missingDeps = await filterMissingDeps(cwd, baseDeps);

    if (missingDeps.length > 0) {
      await installPackages(cwd, pm, missingDeps);
    } else {
      consola.info("Dependências base já instaladas.");
    }

    consola.box(
      [
        "WI.UI inicializado com sucesso!",
        "",
        `Componentes serão adicionados em: ${config.componentsDir}`,
        "",
        "Próximos passos:",
        "  wi-ui list          — listar componentes disponíveis",
        "  wi-ui add button    — adicionar o Button",
        "  wi-ui add card      — adicionar o Card",
      ].join("\n"),
    );
  },
});

function resolveDefaultComponentsDir(
  framework: WiUiConfig["framework"],
  typescript: boolean,
): string {
  const ext = typescript ? "ts" : "js";
  void ext;

  switch (framework) {
    case "nextjs":
    case "remix":
      return "src/components/ui";
    case "vite":
      return "src/components/ui";
    default:
      return "components/ui";
  }
}

async function filterMissingDeps(
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
