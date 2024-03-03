import { fileURLToPath, URL } from "url";

import react from "@vitejs/plugin-react";
import bundleAnalyzer from "rollup-plugin-bundle-analyzer";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import codegen from "vite-plugin-graphql-codegen";
import { vitePluginGraphqlLoader } from "vite-plugin-graphql-loader";

/**
 * Notes on scss resolver absolute paths doesnt really need @ alias.\
 * Alias @ path in scss is not supported by vscode for import code completion\
 * Alias @ works in vite dev/build, but is a no go without IDE code completion\
 * Current best option to use absolute path in scss\
 * I.e. start with "/" like "/src/etc/..."\
 * This gives vscode code completion, but then need to alias it for vite\
 * So we do: ViteAlias("/src/", "./src/")\
 * This is fine because "/" in scss refers to project root,\
 * And in typescript "/" is HD root, so never used in scripts anyway\
 *
 * Support for scss @ alias may be coming, ref:\
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

// UserConfig
const dev = () => {
  return {
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
