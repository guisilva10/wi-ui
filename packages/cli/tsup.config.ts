import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node18",
  clean: true,
  dts: false,
  noExternal: ["@wi-ui/registry"],
  banner: {
    js: "#!/usr/bin/env node",
  },
});
