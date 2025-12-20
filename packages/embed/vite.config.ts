import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
// import { analyzer } from "vite-bundle-analyzer";

// https://vite.dev/config/
export default defineConfig({
  base: "https://pagering.gideon.sh/embed",

  build: {
    lib: {
      entry: resolve(__dirname, "src/embed.ts"),
      name: "pagering",
      // the proper extensions will be added
      fileName: "script",
      formats: ["umd"],
    },
  },

  plugins: [
    svelte(),
    tailwindcss(),
    // analyzer({
    //   analyzerPort: 8887,
    // }),
  ],
});
