import { build } from "esbuild";

await build({
  bundle: true,
  entryPoints: ["src/kimai-work-card.ts"],
  format: "esm",
  legalComments: "inline",
  outfile: "dist/kimai-work-card.js",
  platform: "browser",
  target: ["es2022"],
});
