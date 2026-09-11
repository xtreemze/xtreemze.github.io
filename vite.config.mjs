import { copyFile, mkdir, readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const root = process.cwd();
const outDir = resolve(root, "dist");

async function htmlInputs() {
  const projectFiles = (await readdir(resolve(root, "projects")))
    .filter((file) => file.endsWith(".html"))
    .sort();

  return Object.fromEntries([
    ["index", resolve(root, "index.html")],
    ["experience", resolve(root, "experience.html")],
    ...projectFiles.map((file) => [
      `projects/${file.slice(0, -5)}`,
      resolve(root, "projects", file),
    ]),
  ]);
}

function accessibilityInvariants() {
  return {
    name: "portfolio-accessibility-invariants",
    enforce: "pre",
    transformIndexHtml(html) {
      let output = html;

      if (!output.includes('class="skip-link"')) {
        output = output.replace(
          "<body>",
          '<body>\n  <a class="skip-link" href="#main">Skip to content</a>',
        );
      }

      if (!/<main[^>]*\bid="main"/.test(output)) {
        output = output.replace(/<main\b/, '<main id="main"');
      }

      if (!output.includes('name="color-scheme"')) {
        output = output.replace(
          "</head>",
          '  <meta name="color-scheme" content="dark">\n</head>',
        );
      }

      return output;
    },
  };
}

function publicationArtifacts() {
  return {
    name: "portfolio-publication-artifacts",
    async writeBundle() {
      await mkdir(outDir, { recursive: true });
      await copyFile(resolve(root, "favicon.ico"), resolve(outDir, "favicon.ico"));
      await writeFile(resolve(outDir, ".nojekyll"), "", "utf8");
      await writeFile(
        resolve(outDir, "robots.txt"),
        "User-agent: *\nAllow: /\nSitemap: https://xtreemze.github.io/sitemap.xml\n",
        "utf8",
      );

      const projectFiles = (await readdir(resolve(root, "projects")))
        .filter((file) => file.endsWith(".html"))
        .sort();
      const urls = [
        "https://xtreemze.github.io/",
        "https://xtreemze.github.io/experience.html",
        ...projectFiles.map((file) => `https://xtreemze.github.io/projects/${file}`),
      ];
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
        .map((url) => `  <url><loc>${url}</loc></url>`)
        .join("\n")}\n</urlset>\n`;
      await writeFile(resolve(outDir, "sitemap.xml"), sitemap, "utf8");
    },
  };
}

export default defineConfig(async () => ({
  appType: "mpa",
  publicDir: false,
  plugins: [accessibilityInvariants(), publicationArtifacts()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2022",
    sourcemap: false,
    rollupOptions: {
      input: await htmlInputs(),
    },
  },
}));
