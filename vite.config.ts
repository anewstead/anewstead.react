import { fileURLToPath, URL } from "url";

import react from "@vitejs/plugin-react";
import bundleAnalyzer from "rollup-plugin-bundle-analyzer";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import codegen from "vite-plugin-graphql-codegen";
import { vitePluginGraphqlLoader } from "vite-plugin-graphql-loader";

/**
 * Scss resolver\
 * Alias @ path is not supported by vscode & ext for code completion\
 * Alias works in vite and compiles fine, but is a no go without code completion\
 * Current best option to use absolute path in scss i.e. "/src/..."\
 * This gives vscode code completion, but then need to alias it for vite\
 * "/src/" to "./src/"\
 * We can do this because "/" in scss refer to project root,\
 * And in typescript "/" defaults to HD root, so is never used\
 *
 * Support may be coming for scss paths in 2024:\
 * https://github.com/microsoft/vscode/issues/163967\
 * https://github.com/wkillerud/vscode-scss/issues/41
 */

const viteAlias = (findGlob: string, localPath: string) => {
  return {
    find: findGlob,
    replacement: fileURLToPath(new URL(localPath, import.meta.url)),
  };
};

const resolve = {
  alias: [
    viteAlias("/src/", "./src/"), // this is for scss
    viteAlias("@/", "./src/"),
    viteAlias("@testing/", "./testing/"),
  ],
};

// TODO: check if can be removed
// @alias fix
// issue introduced vite@5.1.2
// https://github.com/vitejs/vite/issues/15901
// https://github.com/vitejs/vite/issues/15858
const server = {
  fs: {
    cachedChecks: false,
  },
};

// UserConfig
const dev = () => {
  return {
    server,
    resolve,
    plugins: [
      react(),
      vitePluginGraphqlLoader(),
      codegen(),
      checker({
        typescript: true,
      }),
    ],
    css: {
      devSourcemap: true,
    },
  };
};

const buildProd = () => {
  return {
    server,
    resolve,
    plugins: [react(), vitePluginGraphqlLoader()],
    css: {
      devSourcemap: false,
    },
  };
};

// same as buildProd but with analyzer
const buildDev = () => {
  const bp = buildProd();
  return {
    ...bp,
    plugins: [...bp.plugins, bundleAnalyzer({})],
  };
};

export default defineConfig(({ command, mode }) => {
  if (command === "serve") {
    return dev();
  }
  if (mode === "development") {
    return buildDev();
  }
  return buildProd();
});
