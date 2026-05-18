import { defineCommand, runMain } from "citty";

const main = defineCommand({
  meta: {
    name: "wi-ui",
    version: "0.1.0",
    description: "Adicione componentes WI.UI ao seu projeto",
  },
  subCommands: {
    init: () => import("./commands/init.js").then((m) => m.initCommand),
    add: () => import("./commands/add.js").then((m) => m.addCommand),
    list: () => import("./commands/list.js").then((m) => m.listCommand),
  },
});

runMain(main);
