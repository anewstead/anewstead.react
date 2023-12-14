import react from "@vitejs/plugin-react";
import bundleAnalyzer from "rollup-plugin-bundle-analyzer";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import codegen from "vite-plugin-graphql-codegen";
import { vitePluginGraphqlLoader } from "vite-plugin-graphql-loader";

import { muteWarningsPlugin } from "./vite-mute-warnings-plugin";

/**
 * MuteWarningsPlugin / warningsToIgnore\
 *
 * SOURCEMAP_ERROR - noticed storybook build with vite 5 and mui components
 * reporting sourcemap errors possibly due to "use client" flag\
 * See: https://github.com/vitejs/vite/issues/15012
 *
 * TODO: check if resolved with newer releases of vite & plugin-react\
 * Last checked vite 5.0.8
 */
const warningsToIgnore = [
  ["SOURCEMAP_ERROR", "Can't resolve original location of error"],
];

const dev = () => {
  return {
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
    plugins: [
      react(),
      vitePluginGraphqlLoader(),
      muteWarningsPlugin(warningsToIgnore),
    ],
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
