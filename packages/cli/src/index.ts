import { defineCommand, runMain } from "citty";
import { readPackageJSON } from "pkg-types";

const pkg = await readPackageJSON(
  new URL("../package.json", import.meta.url).pathname,
);

const main = defineCommand({
  meta: {
    name: "wi-ui",
    version: pkg.version ?? "0.0.0",
    description: "Adicione componentes WI.UI ao seu projeto",
  },
  subCommands: {
    init: () => import("./commands/init.js").then((m) => m.initCommand),
    add: () => import("./commands/add.js").then((m) => m.addCommand),
    list: () => import("./commands/list.js").then((m) => m.listCommand),
  },
});

runMain(main);
