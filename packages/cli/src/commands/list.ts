import { defineCommand } from "citty";
import consola from "consola";
import { registry } from "@wi-ui/registry";

const CATEGORY_LABELS: Record<string, string> = {
  base: "Base",
  fomo: "FOMO / Conversão",
  animation: "Animação",
  block: "Blocos de Seção",
};

export const listCommand = defineCommand({
  meta: {
    name: "list",
    description: "Lista todos os componentes disponíveis",
  },
  args: {
    category: {
      type: "string",
      alias: "c",
      description: "Filtrar por categoria: base | fomo | animation | block",
      default: "",
    },
  },
  run({ args }) {
    const filterCategory = args.category || "";

    const filtered = filterCategory
      ? registry.filter((e) => e.category === filterCategory)
      : registry;

    if (filtered.length === 0) {
      consola.warn(
        filterCategory
          ? `Nenhum componente na categoria "${filterCategory}".`
          : "Registry vazio.",
      );
      return;
    }

    // Agrupa por categoria
    const grouped = filtered.reduce<Record<string, typeof filtered>>(
      (acc, entry) => {
        const cat = entry.category;
        acc[cat] ??= [];
        acc[cat].push(entry);
        return acc;
      },
      {},
    );

    for (const [category, entries] of Object.entries(grouped)) {
      const label = CATEGORY_LABELS[category] ?? category;
      consola.log(`\n${label} (${entries.length})`);
      consola.log("─".repeat(40));

      for (const entry of entries) {
        const name = entry.name.padEnd(16);
        consola.log(`  ${name} ${entry.description}`);
      }
    }

    const total = filtered.length;
    const totalAll = registry.length;

    consola.log("");
    if (filterCategory) {
      consola.info(`${total} componente(s) na categoria "${filterCategory}"`);
    } else {
      consola.info(`${total} componente(s) disponíveis`);
    }

    if (!filterCategory && totalAll > 0) {
      consola.log("");
      consola.info(
        "Use `wi-ui add <nome>` para adicionar um componente ao seu projeto.",
      );
      consola.info("Exemplo: wi-ui add button");
    }
  },
});
