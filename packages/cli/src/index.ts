import { defineCommand, runMain } from "citty";

const main = defineCommand({
  meta: {
    name: "wi-ui",
    version: "0.1.0",
    description: "Adicione componentes WI.UI ao seu projeto",
  },
  subCommands: {
    add: () => import("./commands/add").then((m) => m.addCommand),
  },
});

runMain(main);
