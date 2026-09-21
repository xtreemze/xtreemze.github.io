import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://xtreemze.github.io",
  output: "static",
  build: {
    format: "preserve",
  },
  integrations: [
    sitemap({
      namespaces: {
        news: false,
        video: false,
      },
    }),
  ],
  vite: {
    build: {
      target: "es2022",
    },
  },
});
