import { defineCommand } from "citty";

export const addCommand = defineCommand({
  meta: {
    name: "add",
    description: "Adiciona um componente ao projeto",
  },
  args: {
    component: {
      type: "positional",
      description: "Nome do componente",
      required: true,
    },
  },
  run({ args }) {
    console.log(`Adicionando componente: ${args.component}`);
  },
});
