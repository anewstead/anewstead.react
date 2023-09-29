import react from "@vitejs/plugin-react";
import bundleAnalyzer from "rollup-plugin-bundle-analyzer";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import codegen from "vite-plugin-graphql-codegen";
import graphqlLoader from "vite-plugin-graphql-loader";

const dev = () => {
  return {
    plugins: [
      react(),
      graphqlLoader(),
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
    plugins: [react(), graphqlLoader()],
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
